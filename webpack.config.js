const path = require('path');
const {TsconfigPathsPlugin}= require('tsconfig-paths-webpack-plugin');
const workspacesRun = require('workspaces-run');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = async () => {

  const makeConfig = (entry, isProduction, plugins) => ({
    entry,
    mode: isProduction ? 'production' : 'development',
    plugins,
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ]
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.tsx', '.ts', '.js']
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';
  const compileTime = new Date().toUTCString();
  const packages = [];
  const result = [];

  await workspacesRun.default(
      {cwd: __dirname, orderByDeps: true}, async (workspace) => {
        if(!workspace.config.private){
          packages.push(workspace);
        }
      }
  );

  packages.forEach((pkg) => {
    const {
      version,
       main,
       module
    } = pkg.config;

    let banner = [
      ``,
      `${pkg.name} - v${version}`,
      `Compiled ${compileTime}`,
    ].join('\n');

    const basePath = path.relative(__dirname, pkg.dir);
    let entry = path.resolve(pkg.dir, 'src/index.ts');

    const plugins = [
        new webpack.BannerPlugin({
          banner
        })
    ];

    result.push({
      ...makeConfig(entry, isProduction, plugins),
      output: {
        filename: main,
        path: path.resolve(__dirname, basePath),
        globalObject: 'globalThis',
        library: {
          name: pkg.name,
          type: 'umd',
        }
      }
    });

    result.push({
      ...makeConfig(entry, isProduction, plugins),
      experiments: {
        outputModule: true,
      },
      output: {
        filename: module,
        path: path.resolve(__dirname, basePath),
        library: {
          type: 'module',
        },
      },
    });
  });

  result.push({
    ...makeConfig(
        path.resolve(__dirname, "bundles/src/index.ts"),
        isProduction,
        [new CleanWebpackPlugin()]
    ),
    experiments: {
      outputModule: true,
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "bundles/dist/es"),
      library: {
        type: 'module',
      }
    },
  });

  result.push({
    ...makeConfig(
        path.resolve(__dirname, "bundles/src/index.ts"),
        isProduction,
        [new CleanWebpackPlugin()]
    ),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "bundles/dist/umd"),
      library: {
        name: 'dot-map-renderer',
        type: 'umd',
      },
      globalObject: 'globalThis',
    },
  })

  return result;
};