import { Dirent, ObjectEncodingOptions, readdirSync } from 'fs';
import { ReadDefaultFilesOfFolderMapperFileInterface } from '@interfaces/readDefaultFilesOfFolderMapperFile.interface';

export type MapperClass<Class, Props> = new (options?: Props) => Class;
export type Mapper<Class, Props> = (name: string, Class: MapperClass<Class, Props>, props?: Props) => Promise<Class>;

export interface ReadDefaultFilesOfFolderUtilOptions<Class, Props> {
  path: string;
  mapper?: Mapper<Class, Props>;
  defaultMapperOption?: Props;
  options?: ObjectEncodingOptions & {
    withFileTypes: true;
  };
}

export async function readDefaultFilesOfFolderUtil<Class extends Object = any, Props extends unknown = unknown>({
  path,
  mapper,
  defaultMapperOption,
  options = { withFileTypes: true },
}: ReadDefaultFilesOfFolderUtilOptions<Class, Props>): Promise<ReadDefaultFilesOfFolderMapperFileInterface<Class>[]> {
  const defaultFilePaths: Dirent[] = readdirSync(path, options);
  const filenames: string[] = defaultFilePaths.filter((dirent) => dirent.isFile()).map((dirent) => dirent.name);
  const list: ReadDefaultFilesOfFolderMapperFileInterface<Class>[] = [];
  const defaultMapper = async (_name: string, Class: new (options?: Props) => Class, props?: Props): Promise<Class> => new Class(props);

  for (const defaultFilePath of filenames) {
    const { default: SomeDefaultExportedClass }: { default: new (options?: Props) => Class } = await import(`${path}/${defaultFilePath}`);

    const instancedClass = await (mapper ? mapper : defaultMapper)(defaultFilePath, SomeDefaultExportedClass, defaultMapperOption);

    list.push({
      name: defaultFilePath,
      file: instancedClass,
    });
  }

  return list;
}
