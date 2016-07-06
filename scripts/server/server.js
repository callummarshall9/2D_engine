var webSocketServer = require('websocket').server,
    httpLib = require("http"),
    connectedClients = 0,
    playerData = [],
    serverData = [],
    objects = [];

function createServer() {
    var server = httpLib.createServer(function (request, response) {});
    server.listen(8080, function () {});
    var wsServer = new webSocketServer({httpServer: server});
    wsServer.on('request', handleRequest);
    setInterval(broadcast, 32);
}

function broadcast() {
    if(serverData.length > 0) {
        for(var i = 0; i < serverData.length; i = i + 1) {
            serverData[i].connection.sendUTF(JSON.stringify(playerData));
        }
    }
}

function logClient(connection) {
    var date = new Date();
    console.log(date + "-" + connection.remoteAddresses + " connected");
}

function handleRequest(request) {
    var connection = request.accept(null, request.origin);
    connectedClients = connectedClients + 1;
    logClient(connection);
    connection.on('message', function(message) {
        if (message.type == "utf8") {
            var recievedData = JSON.parse(message.utf8Data),
                i = 0,
                foundPlayer = false;
            if (recievedData.objectType == "player") {
                for (i = 0; i < playerData.length; i = i + 1) {
                    if (playerData[i].objectID == recievedData.objectID) {
                        playerData[i] = recievedData;
                        foundPlayer = true;
                        break;
                    }
                }
                if(!foundPlayer) {
                    console.log(recievedData.objectID + " from " + connection.socket.remoteAddress + " pushed to player data");
                    serverData.push({
                         connection: connection,
                         objectID: recievedData.objectID
                    });
                    playerData.push(recievedData);
                }
            }
        }
    });
    connection.on('close', function (reasonCode, description) {
        var objectID = "";
        var ipAddress = "";
        for (var i = 0; i < serverData.length; i = i + 1) {
            if (serverData[i].connection == connection) {
                objectID = serverData[i].objectID;
                ipAddress = serverData[i].connection.socket.remoteAddress;
                serverData.splice(i,1);
                break;
            }
        }
        for (var i = 0 ; i < playerData.length; i = i + 1) {
            if (playerData[i].objectID == objectID) {
                playerData.splice(i, 1);
                break;
            }
        }
        console.log(objectID + " from " + ipAddress + " left the server for: " + description);
    });
}

function handleConnectionMessage(message) {
    if (message.type == "utf8") {
        var recievedData = JSON.parse(message.utf8Data),
            i = 0,
            foundPlayer = false;
        if (recievedData.objectType == "player") {
            for (i = 0; i < playerData.length; i = i + 1) {
                if (playerData[i].objectID == recievedData.objectID) {
                    playerData[i] = recievedData;
                    foundPlayer = true;
                    break;
                }
            }
            if(!foundPlayer) {
                console.log(recievedData.objectID + " pushed to player data");
                playerData.push(recievedData);
            }
        }
    }
}

createServer();