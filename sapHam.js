var io;
var gameSocket;

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGame = function(sio, socket){
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', { message: "You are connected!" });

    // Host Events
    gameSocket.on('hostCreateNewGame', hostCreateNewGame);
    /*gameSocket.on('hostRoomFull', hostPrepareGame);
    gameSocket.on('hostCountdownFinished', hostStartGame);
    gameSocket.on('hostNextRound', hostNextRound);*/

    // Player Events
    gameSocket.on('playerJoinGame', playerJoinGame);
    /*gameSocket.on('playerAnswer', playerAnswer);
    gameSocket.on('playerRestart', playerRestart);*/
}

function hostCreateNewGame() {
    // Create a unique Socket.IO Room
    //const thisGameId = ( Math.random() * 100000 ) | 0;
    const thisGameId = '100';

    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});

    // Join the Room and wait for the players
    this.join(thisGameId.toString());
};


function playerJoinGame(data) {
    // A reference to the player's Socket.IO socket object
    var sock = this;

    // Look up the room ID in the Socket.IO manager object.
    //var room = gameSocket.manager.rooms["/" + data.gameId];

    sock.join('100', () => {
      let rooms = Object.keys(gameSocket.rooms);
        console.log(io.nsps['/'].adapter.rooms['100']);
    });
    //io.sockets.broadcast.emit('playerJoinedRoom', data);
    //console.log(io.sockets.adapter.rooms[100]);

    //console.log(io.nsps['/'].adapter.rooms['100'].length);
    io.sockets.to('100').emit('playerJoinedRoom', data);

   // io.sockets.emit('playerJoinedRoom', data);
    /*if( room != undefined ){
        this.emit('error',{message: "Has problem"} );
    } else {
        // Otherwise, send an error message back to the player.
        this.emit('error',{message: "This room does not exist."} );
    }*/
};
