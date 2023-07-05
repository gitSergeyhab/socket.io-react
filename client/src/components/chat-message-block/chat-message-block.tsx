import { useState, useEffect, useRef } from 'react';
import socket from '../../socket-io';
import { ChartLink,  ChatMessageLI, ChatMessageUL, MessageP, TextDiv, UserDateWrapperDiv } from './chat-message-block-style';
import { formatDateFromTimeStamp } from '../../utils/date-utils';
import {  Message } from '../../types';





function ChatMessage({message, userId: currentUserId}: {message: Message, userId: string}) {


  const { nik, text, userId, timestamp, isJoin } = message;
  const side = (currentUserId === userId) ? 'end' : 'start';
  const formatDate =  formatDateFromTimeStamp(timestamp);

  const userColor = currentUserId === userId ? 'golden' : '#FFF'

  if (isJoin) {
    return <ChatMessageLI>{formatDate} / {nik} вошел в чат</ChatMessageLI>
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
    socket.on('response', (message) => {
      console.log({message})
      setMessages((prev) => [...prev, message] );
      const ul = ulRef.current
      if(ul) {
        setTimeout(() => {
          ul.scrollTop = ul.scrollHeight;
        }, 100)

      }

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
