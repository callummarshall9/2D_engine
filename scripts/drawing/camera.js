var camera = {
    x: 0,
    y: 0
};

function drawPlayers() {//A function to draw all of the players.
    "use strict";
    var i = 0,//Index of the current index.
        cameraXCoord = 0,//A variable to hold the computed X coordinate.
        cameraYCoord = 0;//A variable to hold the computed Y coordinate.
    for (i = 0; i < players.length; i = i + 1) {//Go through all of the players.
        cameraXCoord = players[i].x - camera.x;//Calculate the camera X coordinate.
        cameraYCoord = players[i].y - camera.y;//Calculate the camera Y coordinate.
        if (cameraXCoord < 0) {//If the camera X value is negative.
            cameraXCoord = 0;//Set it to 0.
        }
        if (cameraYCoord < 0) {//If the camera Y value is negative.
            cameraYCoord = 0;//Set it to 0.
        }
        drawingContext.fillStyle = players[i].color;//Set the colour of what to draw to the player's colour.
        drawingContext.fillRect(cameraXCoord, cameraYCoord, players[i].width, players[i].height);//Draw the player at the X and Y coordinate.
    }
}