import { Settings } from '@/models/Settings';
import { Vibe } from '@/models/Vibe';

export const DefaultVibe: Vibe = {
  id: '',
  text: '',
  emoji: '',
  color: '#000',
  isConfirmable: false,
};

export const DefaultSettings: Settings = {
  isLeftEmojiVisible: true,
  isRightEmojiVisible: false,
  isCustomConnection: false,
};
