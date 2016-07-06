function drawPlayers() {
    "use strict";
    var i = 0;
    for (i = 0; i < players.length; i = i + 1) {
        drawingContext.fillStyle = players[i].color;
        drawingContext.fillRect(players[i].x, players[i].y, players[i].width, players[i].height);
    }
}