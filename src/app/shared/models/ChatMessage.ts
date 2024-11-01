import { Message } from "../models/Message";

export interface ChatMessage {
  _id: string;
  type: string;
  client: string;
  message: Message;
  createdAt: string;
}
