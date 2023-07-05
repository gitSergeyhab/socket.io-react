import { useState, useEffect, useRef } from 'react';
import socket from '../../socket-io';
import { ChartLink,  ChatMessageLI, ChatMessageUL, MessageP, TextDiv, UserDateWrapperDiv } from './chat-message-block-style';
import { formatDateFromTimeStamp } from '../../utils/date-utils';
import { Message } from '../../types';


function ChatMessage({message, userId: currentUserId}: {message: Message, userId: string}) {

  const { nik, text, userId, timestamp, isAuto } = message;
  const side = (currentUserId === userId) ? 'end' : 'start';
  const formatDate =  formatDateFromTimeStamp(timestamp);
  const userColor = currentUserId === userId ? 'golden' : '#FFF'

  if (isAuto) {
    return <ChatMessageLI>{formatDate} / {text} </ChatMessageLI>
  }

  const textBlock = (
    <TextDiv color={userColor} side={side}>
      <UserDateWrapperDiv>
        {formatDate}
        <ChartLink color={userColor}  side={side} to={`/users/${userId}`}>{nik}</ChartLink>

      </UserDateWrapperDiv>

      <MessageP>{text} </MessageP>
    </TextDiv>
  );

  return (
    <ChatMessageLI side={side}>
      {textBlock}
    </ChatMessageLI>
  )
}


type ChatMessageBlockProps = {
  color: string,
  roomId: string,
  userId: string
}

export function ChatMessageBlock({color, roomId, userId}: ChatMessageBlockProps) {
  const [messages, setMessages]  = useState<Message[]>([]);
  const ulRef = useRef<HTMLUListElement|null>(null)


  useEffect(() => {
    const ul = ulRef.current;
    const autoScrollDown = () => {
      if(ul) {
        setTimeout(() => {
          ul.scrollTop = ul.scrollHeight;
        }, 100)
      }
    }
    socket.on('response', (message: Message) => {
      setMessages((prev) => [...prev, message] );
      autoScrollDown();
    })

    socket.on('response_all_messages', (allMessages: Message[]) => {
      console.log({allMessages})
      setMessages(allMessages);
      autoScrollDown();
    })
  }, [])


  const messageElements = messages
    .map((item) => <ChatMessage message={item} userId={userId} key={item.messageId} />)

  return (
    <ChatMessageUL color={color} ref={ulRef}>
      {messageElements}
    </ChatMessageUL>
  )
}
