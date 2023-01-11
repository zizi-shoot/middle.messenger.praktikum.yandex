export type Message = {
  id: MessageID,
  time: MessageTime,
  type: MessageType,
  user_id: UserID,
  content: MessageContent,
};

export type OldMessage = Message & {
  chat_id: ChatID
};
