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

function movePlayer() {
    "use strict";
    currentPlayer.x = currentPlayer.x + (currentPlayer.stepSize * Math.cos(currentPlayer.angle));
    currentPlayer.y = currentPlayer.y + (currentPlayer.stepSize * Math.sin(currentPlayer.angle));
}