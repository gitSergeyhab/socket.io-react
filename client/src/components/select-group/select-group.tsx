import { Dispatch, SetStateAction } from "react";
import { Data } from "../../types";
import { FlexDiv } from "../common/common";
import { Select } from "../select/select";

type SelectGroupProps = {
  rooms: Data[];
  users: Data[];
  user: Data|null;
  room: Data|null;
  setUser: Dispatch<SetStateAction<Data | null>>;
  setRoom: Dispatch<SetStateAction<Data | null>>;
}

export function SelectGroup({rooms, setRoom,setUser, users, room, user}: SelectGroupProps) {
  return (
    <FlexDiv>
      <div>
        <div>Rooms</div>
        <Select options={rooms} selected={room} setOption={setRoom}/>
      </div>

      <div>
        <div>Users</div>
        <Select options={users} selected={user} setOption={setUser}/>
      </div>
    </FlexDiv>
  )
}
