import path from 'path';
import transpile from '@rollup/plugin-buble';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import workspacesRun from 'workspaces-run';
import babel from '@rollup/plugin-babel';

async function main()
{
    const plugins = [
        sourcemaps(),
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        commonjs(),
        json(),
        typescript({ tsconfig: './tsconfig.json' }),
        transpile(),
        cleanup(),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env', '@babel/preset-react']
        })
    ];

    const compileTime = new Date().toUTCString();
    const packages = [];
    const results = [];

    await workspacesRun({ cwd: __dirname, orderByDeps: true }, async (pkg) =>
    {
        if (!pkg.config.private)
        {
            packages.push(pkg);
        }
    });

    packages.forEach((pkg) =>
    {
        const {
            version,
            main,
            module,
            dependencies,
            peerDependencies,
        } = pkg.config;

        if (main === undefined || module === undefined)
        {
            return;
        }

        const banner = [
            `/*!`,
            ` * ${pkg.name} - v${version}`,
            ` * Compiled ${compileTime}`,
            ` */`,
        ].join('\n');

        const basePath = path.relative(__dirname, pkg.dir);
        const sourcemap = true;
        const external = Object.keys(dependencies || [])
            .concat(Object.keys(peerDependencies || []));
        const input = (() => {
            if(basePath === 'packages/react'){
                return path.join(basePath, 'src/index.tsx');;
            }

            return path.join(basePath, 'src/index.ts');
        })();

        const freeze = false;

        results.push({
            input,
            output: [
                {
                    banner,
                    file: path.join(basePath, main),
                    format: 'cjs',
                    freeze,
                    sourcemap,
                },
                {
                    banner,
                    file: path.join(basePath, module),
                    format: 'esm',
                    freeze,
                    sourcemap,
                },
            ],
            external,
            plugins,
        });
    });

    return results;
}

export default main();
