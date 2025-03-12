import { FirebaseConnection } from "./FirebaseConnection";

export interface Settings {
  isLeftEmojiVisible: boolean,
  isRightEmojiVisible: boolean,
  isCustomConnection: boolean,
  customConnection?: FirebaseConnection,
}