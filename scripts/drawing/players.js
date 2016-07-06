function drawPlayers() {//A function to draw all of the players.
    "use strict";
    var i = 0;
    for (i = 0; i < players.length; i = i + 1) {//Go through all of the players.
        drawingContext.fillStyle = players[i].color;//Set the colour of what to draw to the player's colour.
        drawingContext.fillRect(players[i].x, players[i].y, players[i].width, players[i].height);//Draw the player at the X and Y coordinate.
    }
}