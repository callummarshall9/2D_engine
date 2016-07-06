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
    currentPlayer.x = currentPlayer.x + (currentPlayer.stepSize * Math.cos(currentPlayer.angle));//Add the horizontal component of the speed to the player's X coordinate.
    currentPlayer.y = currentPlayer.y + (currentPlayer.stepSize * Math.sin(currentPlayer.angle));//Add the vertical component of the speed to the player's Y coordinate.
}