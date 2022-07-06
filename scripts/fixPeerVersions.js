"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const workspaces_run_1 = __importDefault(require("workspaces-run"));
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
const writeJson = (file, data) => writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const versions = {};
        const packagesWithPeers = [];
        yield (0, workspaces_run_1.default)({ cwd: process.cwd() }, (pkg) => __awaiter(this, void 0, void 0, function* () {
            versions[pkg.name] = pkg.config.version;
            if (pkg.config.peerDependencies) {
                packagesWithPeers.push(pkg);
            }
        }));
        const result = yield Promise.allSettled(packagesWithPeers.map((pkg) => {
            const json = pkg.config;
            const peers = json.peerDependencies;
            for (const n in peers) {
                if (n in versions) {
                    peers[n] = versions[n];
                }
            }
            return writeJson(path_1.default.join(pkg.dir, 'package.json'), json);
        }));
        result.forEach((res) => {
            if (res.status === 'rejected') {
                console.error(res.reason);
            }
        });
    });
}
main();
//# sourceMappingURL=fixPeerVersions.js.map