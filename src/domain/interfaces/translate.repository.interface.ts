import { TranslateResourceInterface } from '@interfaces/translateResource.interface';
import { ReadDefaultFilesOfFolderMapperFileInterface } from '@interfaces/readDefaultFilesOfFolderMapperFile.interface';

export interface TranslateRepositoryInterface {
  init(): Promise<void>;

  resources(): Promise<ReadDefaultFilesOfFolderMapperFileInterface<TranslateResourceInterface>[]>;
}
