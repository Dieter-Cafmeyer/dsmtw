const path = require(`path`);
const pluginHandler = require(`./lib/pluginHandler`);

require(`dotenv`).load({
  silent: true
});

const {
  PORT: port
} = process.env;

const Server = require(`hapi`).Server;

const server = new Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, `public`)
      }
    }
  }
});

server.connection({
  port
});

server.register(require(`./modules/`), pluginHandler);
server.register(require(`./routes/`), pluginHandler);

server.start(err => {
  if (err) console.error(err);
  console.log(`Server running at: http://localhost:${port}`);
});

const io = require(`socket.io`)(server.listener);

let users = [];

io.on(`connection`, socket => {
  //let test = localStorage.getItem(`user`, u.socketId);
  const {id: socketId} = socket;
  const username = socket.handshake.query.name;
  const seconds = socket.handshake.query.seconds;

  const user = {
    socketId,
    name: username,
    seconds: seconds
  };

  users.push(user);

  socket.emit(`init`, {users: users, user: user});
  io.emit(`test`);
  socket.broadcast.emit(`join`, user);

  socket.on(`disconnect`, () => {
    const userLeft = users.filter(u => u.socketId !== socketId);
    users = userLeft;
    socket.broadcast.emit(`leave`, socketId);
  });

  socket.on(`userPoints`, data => {
    const userPoint = users.filter(function(u) {
      console.log(data);
      return u.socketId === data.socketId; // Filter out the appropriate one

    })[0];

    if (userPoint) {
      userPoint.seconds = data.seconds;
      const index = users.findIndex(u => u.socketId === userPoint.socketId);
      users.splice(index, 1, userPoint);
      io.emit(`updateUsers`, users);
    } else {
      return;
    }
  });
});


const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
