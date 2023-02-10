import fs from 'fs';

export async function readDefaultFilesOfFolderUtil<T>(path: string): Promise<T[]> {
    const defaultFilePaths: string[] = fs.readdirSync(path);
    const list: T[] = [];

    for (const defaultFilePath of defaultFilePaths) {
        const {default: SomeDefaultExportedClass} = await import(`${path}/${defaultFilePath}`);

        list.push(new SomeDefaultExportedClass());
    }

    return list;
}
