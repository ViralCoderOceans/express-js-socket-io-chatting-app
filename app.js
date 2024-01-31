var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const http = require('http');
const socketIo = require('socket.io');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
const io = socketIo(server);

// Store room data
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for creating a new room
  socket.on('createRoom', (roomName) => {
    const room = {
      name: roomName,
      messages: [],
    };
    rooms.set(roomName, room);
    io.emit('roomList', Array.from(rooms.keys()));
  });

  // Listen for joining a room
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    io.to(socket.id).emit('roomData', rooms.get(roomName));
  });

  // Listen for messages
  socket.on('sendMessage', ({ roomName, message }) => {
    const room = rooms.get(roomName);
    if (room) {
      room.messages.push(message);
      io.to(roomName).emit('roomData', room);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = app;
