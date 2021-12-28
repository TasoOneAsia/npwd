interface TwitterConfig {
  showNotifications: boolean;
  generateProfileNameFromUsers: boolean;
  allowEditableProfileName: boolean;
  allowDeleteTweets: boolean;
  allowReportTweets: boolean;
  characterLimit: number;
  newLineLimit: number;
  enableAvatars: boolean;
  enableEmojis: boolean;
  enableImages: boolean;
  maxImages: number;
}

interface MatchConfig {
  generateProfileNameFromUsers: boolean;
  allowEditableProfileName: boolean;
}

interface Debug {
  level: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';
  enabled: boolean;
  sentryEnabled: true;
}

interface General {
  useResourceIntegration: boolean;
}

interface DatabaseConfig {
  playerTable: string;
  identifierColumn: string;
  identifierType: string;
  useIdentifierPrefix: boolean;
  profileQueries: boolean;
  phoneNumberColumn: string;
}

interface ImageConfig {
  url: string;
  type: string;
  imageEncoding: 'png' | 'jpg' | 'webp';
  contentType: string;
  authorizationPrefix: string;
  useAuthorization: boolean;
  returnedDataIndexes: Array<any>;
}

interface PhoneAsItemConfig {
  enabled: boolean;
  exportResource: string;
  exportFunction: string;
}

export interface ResourceConfig {
  database: DatabaseConfig;
  phoneAsItem: PhoneAsItemConfig;
  twitter: TwitterConfig;
  match: MatchConfig;
  general: General;
  debug: Debug;
  images: ImageConfig;
}
