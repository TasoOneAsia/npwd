import { useRecoilState, useSetRecoilState } from 'recoil';
import { messageState, useMessagesValue, useSetMessages } from './state';
import { useNuiEvent, useNuiRequest } from 'fivem-nui-react-lib';
import { IAlert, useSnackbar } from '../../../ui/hooks/useSnackbar';
import { useTranslation } from 'react-i18next';
import { useMessageNotifications } from './useMessageNotifications';
import { useCallback } from 'react';
import { useLocation } from 'react-router';
import { MessageEvents } from '../../../../../typings/messages';
import { TOptionsBase } from 'i18next';

export const useMessagesService = () => {
  const Nui = useNuiRequest();
  const { pathname } = useLocation();
  const [activeMessageGroup, setActiveMessageGroup] = useRecoilState(
    messageState.activeMessageGroup,
  );
  const messages = useMessagesValue();
  const setMessageGroups = useSetRecoilState(messageState.messageGroups);
  const setMessages = useSetMessages();
  const setCreateMessageGroupResult = useSetRecoilState(messageState.createMessageGroupResult);
  const { addAlert } = useSnackbar();
  const { setNotification } = useMessageNotifications();
  const { t } = useTranslation();

  const handleAddAlert = useCallback(
    ({ message, type, options = {} }: IAlert & { options: TOptionsBase }) => {
      addAlert({
        message: t(`${message}`, options),
        type,
      });
    },
    [addAlert, t],
  );

  const handleMessageBroadcast = useCallback(
    ({ groupId, message }) => {
      if (groupId === activeMessageGroup?.groupId) {
        Nui.send(MessageEvents.FETCH_MESSAGES, { groupId: activeMessageGroup.groupId });
        if (pathname.includes('messages/conversations')) {
          // Dont trigger notification if conversation is open.
          return;
        }
      }
      setNotification({ groupId, message });
    },
    [activeMessageGroup, pathname, setNotification, Nui],
  );

  const _setMessageGroups = useCallback(
    (groups) => {
      if (activeMessageGroup && activeMessageGroup.groupId) {
        setActiveMessageGroup(
          (curr) => groups.find((g) => g.groupId === activeMessageGroup.groupId) || curr,
        );
      }
      setMessageGroups(groups);
    },
    [activeMessageGroup, setActiveMessageGroup, setMessageGroups],
  );

  const deleteMessage = useCallback(
    (msgId: number) => {
      setMessages((curMsgs) => {
        const targetIdx = curMsgs.findIndex((msg) => msg.id === msgId);

        if (targetIdx === -1)
          throw new Error(`Message with id ${msgId} was not found in messages for deletion`);

        return curMsgs.slice(targetIdx, 1);
      });
    },
    [setMessages],
  );

  useNuiEvent('MESSAGES', MessageEvents.FETCH_MESSAGE_GROUPS_SUCCESS, _setMessageGroups);
  useNuiEvent('MESSAGES', MessageEvents.FETCH_MESSAGES_SUCCESS, setMessages);
  useNuiEvent('MESSAGES', MessageEvents.CREATE_MESSAGE_GROUP_SUCCESS, setCreateMessageGroupResult);
  useNuiEvent('MESSAGES', MessageEvents.CREATE_MESSAGE_GROUP_FAILED, setCreateMessageGroupResult);
  useNuiEvent('MESSAGES', MessageEvents.CREATE_MESSAGE_BROADCAST, handleMessageBroadcast);
  useNuiEvent('MESSAGES', MessageEvents.ACTION_RESULT, handleAddAlert);
};
