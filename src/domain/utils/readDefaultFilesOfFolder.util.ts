import {Dirent, readdirSync} from 'fs';

export async function readDefaultFilesOfFolderUtil<Class extends Object, ClassOptions>(
    path: string,
    mapper: (Class: new (options?: ClassOptions) => Class) => Promise<Class>,
): Promise<Class[]> {
    const defaultFilePaths: Dirent[] = readdirSync(path, {withFileTypes: true});
    const filenames = defaultFilePaths.filter((dirent) => dirent.isFile()).map((dirent) => dirent.name);
    const list: Class[] = [];

    for (const defaultFilePath of filenames) {
        const {default: SomeDefaultExportedClass} = await import(`${path}/${defaultFilePath}`);

        const item = await mapper(SomeDefaultExportedClass);

        list.push(item);
    }

    return list;
}
