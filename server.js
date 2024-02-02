const express = require('express');
const app = express();
const http = require('http').Server(app);
const { Server } = require('socket.io');
const cors = require('cors');
const { instrument } = require("@socket.io/admin-ui");

app.use(cors());
let rooms = [
  {
    id: 'test-room-1',
    name: 'Test Room 1',
    members: [],
    attendees: [],
    lastMessage: { username: "Test User 2", message: "Hii", time: 1706767172000 },
    typingUsers: []
  },
  {
    id: 'test-room-2',
    name: 'Test Room 2',
    members: [],
    attendees: [],
    lastMessage: { username: "Test User 2", message: "Hii", time: 1706767172000 },
    typingUsers: []
  },
  {
    id: 'test-room-3',
    name: 'Test Room 3',
    members: [],
    attendees: [],
    lastMessage: { username: "Test User 2", message: "Hii", time: 1706767172000 },
    typingUsers: []
  },
  {
    id: 'test-room-4',
    name: 'Test Room 4',
    members: ['user-b7c2'],
    attendees: [],
    lastMessage: { username: "Test User 2", message: "Hii", time: 1706767172000 },
    typingUsers: []
  },
  {
    id: 'test-room-5',
    name: 'Test Room 5',
    members: [],
    attendees: [],
    lastMessage: { username: "Test User 2", message: "Hii", time: 1706767172000 },
    typingUsers: []
  },
  {
    id: '12',
    name: 'Test Room 6',
    members: ['user-b7c2'],
    attendees: [],
    lastMessage: {
      username: "user-b7c2",
      message: "Hello, Good Morning!",
      time: 1706779110541
    },
    typingUsers: []
  }
];
let messages = [
  {
    roomId: 'test-room-1',
    chat: [
      { username: "Test User 1", message: "hello", time: 1706767172000 },
      { username: "Test User 2", message: "Hii", time: 1706767172000 }
    ]
  },
  {
    roomId: 'test-room-2',
    chat: [
      { username: "Test User 1", message: "hello", time: 1706767172000 },
      { username: "Test User 2", message: "Hii", time: 1706767172000 }
    ]
  },
  {
    roomId: 'test-room-3',
    chat: [
      { username: "Test User 1", message: "hello", time: 1706767172000 },
      { username: "Test User 2", message: "Hii", time: 1706767172000 }
    ]
  },
  {
    roomId: 'test-room-4',
    chat: [
      { username: "Test User 1", message: "hello", time: 1706767172000 },
      { username: "Test User 2", message: "Hii", time: 1706767172000 }
    ]
  },
  {
    roomId: 'test-room-5',
    chat: [
      { username: "Test User 1", message: "hello", time: 1706767172000 },
      { username: "Test User 2", message: "Hii", time: 1706767172000 }
    ]
  },
  {
    roomId: "12",
    chat: [
      {
        username: "user-b7c2",
        message: "wqwe",
        time: 1706777594469
      },
      {
        username: "user-b7c2",
        message: "eqwe",
        time: 1706777595797
      },
      {
        username: "user-b7c2",
        message: "qwe",
        time: 1706777596806
      },
      {
        username: "user-b7c2",
        message: "qweqwe",
        time: 1706777597956
      },
      {
        username: "user-b7c2",
        message: "eqwe",
        time: 1706777598893
      },
      {
        username: "user-da6a",
        message: "weqwe",
        time: 1706777613474
      },
      {
        username: "user-da6a",
        message: "qweqwe",
        time: 1706777614642
      },
      {
        username: "user-da6a",
        message: "qweqwe",
        time: 1706777615569
      },
      {
        username: "user-da6a",
        message: "eqweqw",
        time: 1706777616609
      },
      {
        username: "user-b7c2",
        message: "we",
        time: 1706777765511
      },
      {
        username: "user-b7c2",
        message: "e",
        time: 1706777767022
      },
      {
        username: "user-b7c2",
        message: "wewew",
        time: 1706777769510
      },
      {
        username: "user-b7c2",
        message: "ewe",
        time: 1706777770454
      },
      {
        username: "user-b7c2",
        message: "wewew",
        time: 1706777771494
      },
      {
        username: "user-b7c2",
        message: "wewe",
        time: 1706777772454
      },
      {
        username: "user-b7c2",
        message: "ewe",
        time: 1706777773358
      },
      {
        username: "user-b7c2",
        message: "wewe",
        time: 1706777774342
      },
      {
        username: "user-b7c2",
        message: "wewe",
        time: 1706777775198
      },
      {
        username: "user-b7c2",
        message: "ewe",
        time: 1706777776429
      },
      {
        username: "user-b7c2",
        message: "wewe",
        time: 1706777777414
      },
      {
        username: "user-b7c2",
        message: "wewe",
        time: 1706777778286
      },
      {
        username: "user-b7c2",
        message: "wewe",
        time: 1706777779157
      },
      {
        username: "user-b7c2",
        message: "wew",
        time: 1706777780078
      },
      {
        username: "user-b7c2",
        message: "ewew",
        time: 1706777781006
      },
      {
        username: "user-b7c2",
        message: "wewe",
        time: 1706777781950
      },
      {
        username: "user-b7c2",
        message: "ewew",
        time: 1706777783238
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777783862
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777784541
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777785454
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777786150
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777786742
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777788326
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777789006
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777790582
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777791342
      },
      {
        username: "user-b7c2",
        message: "w",
        time: 1706777792094
      },
      {
        username: "user-b7c2",
        message: "qweqewqeeqweeqweqwe",
        time: 1706778245995
      },
      {
        username: "user-b7c2",
        message: "qweqwe",
        time: 1706778248051
      },
      {
        username: "user-b7c2",
        message: "qweqweqwe",
        time: 1706778251026
      },
      {
        username: "user-11a8",
        message: "qweqweqwe",
        time: 1706778993982
      },
      {
        username: "user-11a8",
        message: "qweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwe",
        time: 1706778999990
      },
      {
        username: "user-b7c2",
        message: "fretert",
        time: 1706779110541
      }
    ]
  }
];

const server = http.listen(3003, () => {
  const { port } = server.address();
  console.log(`Listening on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://chatting-app-next-js.onrender.com", "https://next-js-socket-io-chatting-app.vercel.app"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.on('connection', (socket) => {
  // Handle join room event
  socket.on('joinRoom', (roomId, roomName, username) => {
    if (username) {
      rooms = rooms.map((room) => {
        if (room.id === roomId) {
          if (room.attendees.indexOf(username) <= -1) {
            room.attendees.push(username)
          }
          if (room.members.indexOf(username) <= -1) {
            room.members.push(username)
          }
          return room
        }
        return room
      })
    }
    if (rooms.filter((room) => room.id === roomId).length === 0) {
      rooms.push({
        id: roomId,
        name: roomName,
        members: ['user-b7c2'],
        attendees: [],
        lastMessage: {},
        typingUsers: []
      })
      messages.push({
        roomId,
        chat: []
      })
    }
    socket.join(roomId);
    io.to(roomId).emit('userJoined', 'You have been successfully joined the room', messages, rooms); // Broadcast to everyone in the room
  });

  socket.on('leaveRoom', (roomId, username) => {
    if (username) {
      rooms = rooms.map((room) => {
        if (room.id === roomId) {
          room.attendees.splice(room.attendees.indexOf(username), 1)
          return room
        }
        return room
      })
    }
  });

  socket.on('unsubscribeRoom', (roomId, username) => {
    if (username) {
      rooms = rooms.map((room) => {
        if (room.id === roomId) {
          room.attendees.splice(room.attendees.indexOf(username), 1)
          return room
        }
        return room
      })
    }
    if (username) {
      rooms = rooms.map((room) => {
        if (room.id === roomId) {
          room.members.splice(room.members.indexOf(username), 1)
          return room
        }
        return room
      })
    }
    io.to(roomId).emit('userUnsubscribe', 'You have been successfully leaved the room', rooms);
  });

  socket.on('onTying', (isTyping, roomId, username) => {
    if (username) {
      if (isTyping) {
        rooms = rooms.map((room) => {
          if ((room.id === roomId) && (room.typingUsers.indexOf(username) <= -1)) {
            room.typingUsers.push(username)
            return room
          }
          return room
        })
      } else {
        rooms = rooms.map((room) => {
          if ((room.id === roomId) && (room.typingUsers.indexOf(username) > -1)) {
            room.typingUsers.splice(room.typingUsers.indexOf(username), 1)
            return room
          }
          return room
        })
      }
    }
    io.to(roomId).emit('userTying', rooms);
  });

  // Handle chat message event
  socket.on('chatMessage', ({ roomId, message, username }) => {
    const time = Date.now()
    messages = messages.map((room) => {
      if (room.roomId === roomId) {
        room.chat.push({ username, message, time })
        return room
      }
      return room
    })
    rooms = rooms.map((room) => {
      if (room.id === roomId) {
        room.lastMessage = { username, message, time }
        return room
      }
      return room
    })
    io.to(roomId).emit('message', messages, rooms);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('------ User disconnected ------');
  });
});