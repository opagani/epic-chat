import { useState } from "react";
import {
  Add,
  ExitToApp,
  Home,
  Message,
  PeopleAlt,
  SearchOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import SidebarTab from "./SidebarTab";
import SidebarList from "./SidebarList";
import { useRouter } from "next/router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "src/utils/firebase";

const tabs = [
  {
    id: 1,
    icon: <Home />,
  },
  {
    id: 2,
    icon: <Message />,
  },
  {
    id: 3,
    icon: <PeopleAlt />,
  },
];

export default function Sidebar({ user }) {
  const [menu, setMenu] = useState(1);
  const [isCreatingRoom, setCreatingRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const data = [
    {
      id: 1,
      name: "John Doe",
      photoURL: "",
    },
  ];

  async function createRoom() {
    // console.log(roomName);
    if (roomName?.trim) {
      const roomsRef = collection(db, "rooms");
      const newRoom = await addDoc(roomsRef, {
        name: roomName,
        timestamp: serverTimestamp(),
      });

      // close dialog
      setCreatingRoom(false);
      // remove text from textfield
      setRoomName("");
      // display the rooms tab
      setMenu(2);
      // navigate to that specific room
      router.push(`/?roomId=${newRoom.id}`);
    }
  }

  return (
    <div className='sidebar'>
      {/* Header */}
      <div className='sidebar__header'>
        <div className='sidebar__header--left'>
          <Avatar src={user.photoURL} alt={user.displayName} />
          <h4>{user.displayName}</h4>
        </div>
        <div className='sidebar__header--right'>
          <IconButton onClick={() => auth.signOut()}>
            <ExitToApp />
          </IconButton>
        </div>
      </div>
      {/* Search */}
      <div className='sidebar__search'>
        <form className='sidebar__search--container'>
          <SearchOutlined />
          <input
            type='text'
            id='search'
            placeholder='Search for users of room'
          />
        </form>
      </div>
      {/* Tabs */}
      <div className='sidebar__menu'>
        {tabs.map((tab) => (
          <SidebarTab
            key={tab.id}
            onClick={() => setMenu(tab.id)}
            isActive={menu === tab.id}
          >
            <div className='sidebar__menu--home'>
              {tab.icon}
              <div className='sidebar__menu--line' />
            </div>
          </SidebarTab>
        ))}
      </div>

      {menu === 1 ? (
        <SidebarList title='Chats' data={data} />
      ) : menu === 2 ? (
        <SidebarList title='Rooms' data={data} />
      ) : menu === 3 ? (
        <SidebarList title='Users' data={data} />
      ) : menu === 4 ? (
        <SidebarList title='Search Results' data={data} />
      ) : null}

      {/* Create Room Button */}
      <div className='sidebar__chat--addRoom'>
        <IconButton onClick={() => setCreatingRoom(true)}>
          <Add />
        </IconButton>
      </div>

      {/* Create Room Dialog */}
      <Dialog maxWidth='sm' open={isCreatingRoom}>
        <DialogTitle>Create New Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type the name of your public room. Every user will be able to join
            this room.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='roomName'
            label='Room Name'
            type='text'
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
            fullWidth
            variant='filled'
            style={{ marginTop: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={() => setCreatingRoom(false)}>
            Cancel
          </Button>
          <Button color='success' onClick={createRoom}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
