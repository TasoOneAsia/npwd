import { ResourceConfig } from '../../../typings/config';

export const DEFAULT_CONFIG: ResourceConfig = {
  phoneAsItem: {
    enabled: false,
    exportResource: 'my-core-resource',
    exportFunction: 'myCheckerFunction',
  },
  general: {
    useResourceIntegration: false,
  },
  database: {
    useIdentifierPrefix: false,
    playerTable: 'users',
    identifierColumn: 'identifier',
    identifierType: 'license',
    profileQueries: true,
    phoneNumberColumn: 'phone_number',
  },
  images: {
    url: 'https://api.imgur.com/3/image',
    type: 'imgur',
    imageEncoding: 'jpg',
    contentType: 'multipart/form-data',
    authorizationPrefix: 'Client-ID',
    useAuthorization: true,
    returnedDataIndexes: ['data', 'link'],
  },
  twitter: {
    showNotifications: true,
    generateProfileNameFromUsers: true,
    allowEditableProfileName: true,
    allowDeleteTweets: true,
    allowReportTweets: true,
    characterLimit: 160,
    newLineLimit: 10,
    enableAvatars: true,
    enableEmojis: true,
    enableImages: true,
    maxImages: 3,
  },
  match: {
    generateProfileNameFromUsers: true,
    allowEditableProfileName: true,
  },
  debug: {
    level: 'info',
    enabled: true,
    sentryEnabled: true,
  },
};
