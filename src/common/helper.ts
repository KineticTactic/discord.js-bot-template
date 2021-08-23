import fs from "fs";

export function walk(dir: string) {
    let results: string[] = [];
    let list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + "/" + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else {
            /* Is a file */
            results.push(file);
        }
    });
    return results;
}
