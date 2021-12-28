import path from 'path';
import { mainLogger } from '../sv_logger';
import { ResourceConfig } from '../../../typings/config';
import { DEFAULT_CONFIG } from './config.utils';
import yaml from 'js-yaml';

const RESOURCE_ROOT_PATH = GetResourcePath(GetCurrentResourceName());
const VALID_CFG_EXTENSIONS = ['.yml', '.yaml', '.json'];

class ConfigProvider {
  private log = mainLogger.child({ module: 'ConfigProvider' });
  private config: ResourceConfig | null = null;

  async startLoading(): Promise<void> {
    let configFileContent: ResourceConfig | null = null;

    for (const ext of VALID_CFG_EXTENSIONS) {
      try {
        const rawFile = LoadResourceFile(
          GetCurrentResourceName(),
          path.join(RESOURCE_ROOT_PATH, `config${ext}`),
        );
        configFileContent = ['.yml', '.yaml'].includes(ext)
          ? yaml.load(rawFile)
          : JSON.parse(rawFile);
        break;
      } catch (e) {
        configFileContent = DEFAULT_CONFIG;
        this.log.error(
          `Failed to load config file: ${e} falling back on default config and convars`,
        );
      }
    }

    if (typeof configFileContent !== 'object') {
      this.log.error('Config file is not a valid JSON or YAML file');
      return;
    }

    const convarConfigVals = this.getConvars();

    this.config = {
      ...DEFAULT_CONFIG,
      ...configFileContent,
      ...convarConfigVals,
    };
  }

  async loadProvider() {
    this.log.info('Loading config provider');
    await this.startLoading();
    this.log.info('Config provider loaded');
  }

  public static async asyncConstructor(): Promise<ConfigProvider> {
    const instance = new ConfigProvider();
    await instance.loadProvider();

    return instance;
  }

  public getConvars(): Partial<ResourceConfig> {
    const convars: Array<keyof ResourceConfig> = [
      'phoneAsItem',
      'general',
      'database',
      'images',
      'twitter',
      'match',
      'debug',
    ];
    const convarsObj: Partial<ResourceConfig> = {};

    for (const convar of convars) {
      const convarValue = GetConvar(`npwd_${convar}`, '');
      const convarType = typeof DEFAULT_CONFIG[convar];

      if (convarValue !== '') {
        const parsedValue = JSON.parse(convarValue);
        const parsedValType = typeof parsedValue;

        if (parsedValType !== convarType) {
          throw new Error(
            `Convar given value was not of the correct type. Got (${parsedValue}), expected (${convarType})`,
          );
        }

        convarsObj[convar] = parsedValue;
      }
    }

    return convarsObj;
  }
}

export default await ConfigProvider.asyncConstructor();
