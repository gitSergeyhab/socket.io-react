import { useRef,  FormEventHandler } from 'react';
import { toast } from 'react-toastify';
import { ChatButton, ChatInputForm, ChatTextarea } from './chat-input-style';
import socket from '../../socket-io';
import { Data } from '../../types';



type ChatInputProps = {
  roomId: string;
  user: Data;
}

export function ChatInput({roomId, user}: ChatInputProps) {

  const textRef = useRef<null|HTMLTextAreaElement>(null);
  const formRef = useRef<null|HTMLFormElement>(null);

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();

    const value = textRef.current?.value?.trim();
    if (!value) {
      toast.warning('перед отправкой сообщения его придется написать')
      return;
    }
    const data = {socketId: socket.id, userId: user.id, nik: user.name, text: value, roomId}
    socket.emit('message', data)
    formRef.current?.reset()
  }

  return (
    <ChatInputForm ref={formRef} onSubmit={handleSubmit} >
      <ChatTextarea ref={textRef}  required />
      <ChatButton>➤</ChatButton>
    </ChatInputForm>
  )

}
