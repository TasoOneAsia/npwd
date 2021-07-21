import { Message } from '../../../../../typings/messages';

export const MockMessageData: Message[] = [
  {
    groupId: '2',
    groupDisplay: 'dev-chat',
    isGroupChat: true,
    phoneNumbers: ['444-4444', '111-1134', '111-1111'],
    avatar: null,
    label: null,
    updatedAt: Date.now(),
    unreadCount: 2,
  },
  {
    groupId: '3',
    groupDisplay: 'Chip',
    isGroupChat: false,
    phoneNumbers: ['111-1134', '111-1111'],
    avatar: null,
    label: null,
    updatedAt: Date.now(),
    unreadCount: 0,
  },
  {
    groupId: '4',
    groupDisplay: 'Dick',
    isGroupChat: false,
    phoneNumbers: ['111-1134', '111-2342'],
    avatar: null,
    label: null,
    updatedAt: Date.now(),
    unreadCount: 0,
  },
];
