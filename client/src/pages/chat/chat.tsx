import { useState } from "react"
import styled from "styled-components";
import { useGetRoomsQuery, useGetUsersQuery } from "../../store/test-api"
import { Data } from "../../types";
import socket from "../../socket-io";
import { FlexDiv } from "../../components/common/common";
import { SelectGroup } from "../../components/select-group/select-group";
import { ChatMessageBlock } from "../../components/chat-message-block/chat-message-block";
import { ChatInput } from "../../components/chat-input/chat-input";


const ChatSection = styled.section`
  width: 100%;
  background-color: '#28252f';
`


export function Chat() {

  const {data: rooms} = useGetRoomsQuery(null);
  const {data: users} = useGetUsersQuery(null);

  const [user, setUser] = useState<Data|null>(null);
  const [room, setRoom] = useState<Data|null>(null);

  const [inChat, setInChat] = useState(false);

  if (!(rooms && users)) {
    return (
      <h2>Loading...</h2>
    )
  }


  const handleJoinClick = () => {
    socket.emit('join', {user, room});
    setInChat(true)
  }

  const handleLeaveClick = () => {
    socket.emit('leave', {user, room});
    setInChat(false);
    setRoom(null);
    setUser(null)
  }


  const joinBtn = <button type="button" onClick={handleJoinClick} disabled={!user || !room}>Присоединиться к чату</button>
  const leaveBtn = <button type="button" onClick={handleLeaveClick}>Покинуть к чат</button>
  const chatButton = inChat ? leaveBtn : joinBtn;

  const selectorsBlock = inChat ? null :
    <SelectGroup rooms={rooms} user={user} room={room} setRoom={setRoom} setUser={setUser} users={users}/>;

  const chatBlock = (room && user && inChat) ? (
    <ChatSection>
      <ChatMessageBlock color="#111" roomId={room.id} userId={user.id}/>
      <ChatInput roomId={room.id} user={user}/>
    </ChatSection>
  ) : null;

  return (
    <>
      <h3>chat</h3>
      <FlexDiv>
        <div>Чат {room ? room.name : 'не выбран'}</div>
        <div>Юзер {user ? user.name : 'не выбран'}</div>
      </FlexDiv>
      {selectorsBlock}
      {chatButton}
      {chatBlock}
    </>

  )
}
