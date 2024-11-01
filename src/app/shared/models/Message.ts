export interface Message {
  _id: string;
  type: string;
  text: string;
  typeUser: string;
  user: string;
  errorCode: string | null;
  createdAt: string | null;
  updatedAt: string;
  readAt: string;
}
