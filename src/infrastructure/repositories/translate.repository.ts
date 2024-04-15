import i18next from 'i18next';
import { TranslateOptionRepositoryInterface } from '@interfaces/translateOption.repository.interface';
import { TranslateRepositoryInterface } from '@interfaces/translate.repository.interface';
import { readDefaultFilesOfFolderUtil } from '@utils/readDefaultFilesOfFolder.util';
import { TranslateResourceInterface } from '@interfaces/translateResource.interface';
import { ReadDefaultFilesOfFolderMapperFileInterface } from '@interfaces/readDefaultFilesOfFolderMapperFile.interface';

export class TranslateRepository implements TranslateRepositoryInterface {
  constructor(private options: TranslateOptionRepositoryInterface) {}

  public init = async (): Promise<void> => {
    const resources: ReadDefaultFilesOfFolderMapperFileInterface<TranslateResourceInterface>[] = await this.resources();
    const translation = resources.reduce(
      (acc, resource) => ({
        ...acc,
        [resource.file.name.toLowerCase()]: { translation: resource.file.data?.translation },
      }),
      {},
    );

    await i18next.init({
      lng: this.options.language.toLowerCase(),
      resources: { ...translation },
    });
  };

  public resources = async (): Promise<ReadDefaultFilesOfFolderMapperFileInterface<TranslateResourceInterface>[]> =>
    readDefaultFilesOfFolderUtil<TranslateResourceInterface>({
      path: this.options.dirPath,
      mapper: async (filename, data): Promise<TranslateResourceInterface> => {
        const nameSplit: string[] = filename.split('.');
        const extension: string = nameSplit.at(nameSplit.length - 1) ?? '';
        const name: string = nameSplit.filter(($name: string) => $name !== extension).join('.');

        return { filename, name, data, extension };
      },
    });
}
