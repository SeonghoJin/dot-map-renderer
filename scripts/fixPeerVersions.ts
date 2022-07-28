import util from 'util';
import fs from 'fs';
import path from 'path';
import workspacesRun from 'workspaces-run';
import { Workspace } from 'workspaces-run/dist/types';

interface PackageLike {
  name: string;
  dir: string;
  config: {
    version: string;
    peerDependencies?: Record<string, string>;
  };
}

const writeFile = util.promisify(fs.writeFile);
const writeJson = (file: string, data: unknown) => writeFile(file, `${JSON.stringify(data, null, 2)}\n`);

async function main(): Promise<void> {
  const versions: Record<string, string> = {};
  const packagesWithPeers: PackageLike[] = [];

  await workspacesRun({ cwd: process.cwd() }, async (pkg: Workspace) => {
    versions[pkg.name] = pkg.config.version;

    if (pkg.config.peerDependencies) {
      packagesWithPeers.push(pkg);
    }
  });

  const result = await Promise.allSettled(
    packagesWithPeers.map((pkg) => {
      const json = pkg.config;
      const peers = json.peerDependencies;

      for (const n in peers) {
        if (n in versions) {
          peers[n] = versions[n];
        }
      }

      console.log(`write ${path.join(pkg.dir, 'package.json')} peerDependencies =`, peers);

      return writeJson(path.join(pkg.dir, 'package.json'), json);
    }),
  );

  result.forEach((res) => {
    if (res.status === 'rejected') {
      console.error(res.reason);
    }
  });
}

main();
