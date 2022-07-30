import {Resolver} from "@parcel/plugin";
import path from "path";
import * as fs from "fs";

export default new Resolver({
    async resolve(metaData) {

        const exp = /.js$/;

        if (metaData.dependency.sourcePath && exp.test(metaData.specifier)) {
            const baseDir = metaData.dependency.sourcePath.replace(/[\w-]+?\.[jt]sx?/, "");
            const relativeTsPath = metaData.specifier.replace(exp, ".ts");
            const absoluteTsPath = path.resolve(baseDir + relativeTsPath);

            const [err, fsStat, tsRealPath]:[Error, fs.Stats, string] = await new Promise(resolve => {
                fs.stat(absoluteTsPath, {}, (err, stats) => {
                    if (err) {
                        fs.stat(absoluteTsPath + "x", {}, (err, stats) => {
                            resolve([err as any, stats, absoluteTsPath + "x"]);
                        })
                    } else {
                        resolve([err as any, stats, absoluteTsPath]);
                    }
                });
            });

            if (fsStat) {
                return {
                    filePath: tsRealPath
                }
            }
        }

        return null;
    }
})