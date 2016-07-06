var webSocketServer = require('websocket').server,//Import the web socket module
    httpLib = require("http"),//Import the http library
    playerData = [],//A variable to hold the player data
    serverData = [],//A table which effectively holds the connections and player data references
    objects = [];//A list of objects sent from clients.

function createServer() {//A function to begin hosting the server.
    var server = httpLib.createServer(function (request, response) {});//Create a server object
    server.listen(8080, function () {});//Listen on port 8080 at the localhost address.
    var wsServer = new webSocketServer({httpServer: server});//Create a web socket server around the http server.
    wsServer.on('request', handleRequest);//Listen for when a client connects.
    setInterval(broadcast, 32);//Set an interval to broadcast the player information every 32 milliseconds.
}

function broadcast() {//A function to broadcast client information to connected clients.
    if(serverData.length > 0) {//If there are clients connected.
        for(var i = 0; i < serverData.length; i = i + 1) {//Go through the serverData table.
            serverData[i].connection.sendUTF(JSON.stringify(playerData));//Send the client a list of players.
        }
    }
}

function logClient(connection) {//A function to log a new connection.
    var date = new Date();//Create a new instance of the current date.
    console.log(date + "-" + connection.remoteAddresses + " connected to server");//Log in the console that the client connected at the date with the remote IP address.
}

function handleRequest(request) {//A function to handle the request.
    var connection = request.accept(null, request.origin);//Accept the next queue request.
    connection.on('message', function(message) {//Listen for messages on clients and create a event handler to handle when messages are received.
        if (message.type == "utf8") {//If the message type is UTF8 (Text)
            var recievedData = JSON.parse(message.utf8Data),//Parse the JSON text from the client.
                i = 0,//A variable to hold the current index in the list of the players.
                foundPlayer = false;//A variable to hold whether or not a player was found with the same object ID as what was in the player data received.
            if (recievedData.objectType == "player") {//If the data received object data is about a player.
                for (i = 0; i < playerData.length; i = i + 1) {//Go through the players.
                    if (playerData[i].objectID == recievedData.objectID) {//If the player object ID matches the received object ID.
                        playerData[i] = recievedData;//Update the player data.
                        foundPlayer = true;//Set the variable to true indicating that a player was found with the same object ID as what was in the player data received.
                        break;//Break the loop.
                    }
                }
                if(!foundPlayer) {//If there wasn't a player found with the same ID as what was sent in the received data.
                    console.log(recievedData.objectID + " from " + connection.socket.remoteAddress + " pushed to player data");//Player must be new therefore log it in the console.
                    serverData.push({//Push the player and connection information to the serverData table.
                         connection: connection,
                         objectID: recievedData.objectID
                    });
                    playerData.push(recievedData);//Push the received data to the list of players.
                }
            }
        }
    });
    connection.on('close', function (reasonCode, description) {//Listen for when a client disconnects.
        var objectID = "";//Hold the object ID of the connection.
        var ipAddress = "";//Hold the ip address of the connection.
        for (var i = 0; i < serverData.length; i = i + 1) {//Go through the serverData table.
            if (serverData[i].connection == connection) {//If the entry connection matches the connection which left.
                objectID = serverData[i].objectID;//Get the object ID of the associated player with that connection.
                ipAddress = serverData[i].connection.socket.remoteAddress;//Get the IP address of the player with that connection.
                serverData.splice(i,1);//Remove the player from the serverData table.
                break;//Break the loop.
            }
        }
        for (var i = 0 ; i < playerData.length; i = i + 1) {//Go through the list of player data.
            if (playerData[i].objectID == objectID) {//If the player data objectID in the list matches the player's objectID which left.
                playerData.splice(i, 1);//Remove the player data entry from the local database of player data.
                break;//Break the loop.
            }
        }
        console.log(objectID + " from " + ipAddress + " left the server for: " + description);//Log the player leaving the server.
    });
}

createServer();//Start the server when the script is called.