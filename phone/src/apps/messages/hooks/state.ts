import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  CreateMessageGroupResult,
  Message,
  MessageEvents,
  MessageGroup,
} from '../../../../../typings/messages';
import { fetchNui } from '../../../utils/fetchNui';
import { ServerPromiseResp } from '../../../../../typings/common';
import { isEnvBrowser } from '../../../utils/misc';
import { MockMessageData } from '../utils/constants';

export const messageState = {
  messageGroups: atom<MessageGroup[]>({
    key: 'messageGroups',
    default: [],
  }),
  messages: atom<Message[]>({
    key: 'messages',
    default: selector({
      key: 'messagesDefaultState',
      get: async () => {
        try {
          const serverResp = await fetchNui<ServerPromiseResp<Message[]>>(
            MessageEvents.FETCH_MESSAGES,
          );

          return serverResp.data;
        } catch (e) {
          if (isEnvBrowser()) return MockMessageData;
          console.error(`Unable to fetch messages: ${e.message}`);
          return [];
        }
      },
    }),
  }),
  activeMessageGroup: atom<MessageGroup>({
    key: 'activeMessageGroup',
    default: null,
  }),
  showNewMessageGroup: atom<boolean>({
    key: 'showNewMessageGroup',
    default: false,
  }),
  createMessageGroupResult: atom<CreateMessageGroupResult>({
    key: 'createMessageGroupResult',
    default: null,
  }),
  imageModal: atom<boolean>({
    key: 'useImageModal',
    default: false,
  }),
  unreadMessagesCount: atom<number>({
    key: 'unreadMessagesCount',
    default: 0,
  }),
};

export const useMessagesValue = () => useRecoilValue(messageState.messages);
export const useSetMessages = () => useSetRecoilState(messageState.messages);
