var players = [],
    currentPlayer = {
        objectID: Math.random().toString(36),
        objectType: "player",
        name: "",
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        stepSize: 10,
        angle: 0,
        aiControlled: false,
        health: 10,
        maxHealth: 10,
        image: null,
        color: "blue"
    };

function movePlayer() {//A function to move the player.
    "use strict";
    camera.x = currentPlayer.x - 400 - currentPlayer.width;//Set the camera to the centre X of the player
    camera.y = currentPlayer.y - 200 - currentPlayer.height;//Set the camera to the centre Y of the player.
    if (camera.x < 0) { camera.x = 0; }//If it is a negative value then set it to 0.
    if (camera.y < 0) { camera.y = 0; }//If it is a negative value then set it to 0.
    currentPlayer.x = currentPlayer.x + (currentPlayer.stepSize * Math.cos(currentPlayer.angle));//Add the horizontal component of the speed to the player's X coordinate.
    currentPlayer.y = currentPlayer.y + (currentPlayer.stepSize * Math.sin(currentPlayer.angle));//Add the vertical component of the speed to the player's Y coordinate.
}