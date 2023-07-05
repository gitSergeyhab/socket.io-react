export type Data = {id: string; name: string};

export type Message = {
  messageId: string;
  userId: string;
  nik: string;
  text: string;
  timestamp: number;
  isAuto?: boolean
}
