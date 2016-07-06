var canvas,//A variable to hold the canvas.
    drawingContext;//A variable to hold the context of what to draw.

function getCoordinatesOfClick(event) {//A function to get coordinates on the canvas of the where the player has clicked.
    "use strict";
    var rect = canvas.getBoundingClientRect(),//Get the bounding of the canvas client.
        x = event.clientX - rect.left,//Subtract where the client clicked from the left bound of the canvas.
        y = event.clientY - rect.top;//Subtract where the client clicked from the top bound from the top bound of the canvas.
    currentPlayer.angle = findAngleBetweenTwoPoints(x, y);//Set the angle of where the current player is facing to the angle between the click and the player coordinate.
}

function logicLoop() {//A logic loop to do the logic of the game.
    "use strict";
    if (connected) {//If the client is connected to the web socket server.
        updatePlayerInformation();//Update the player object information on the server.
    }
    updateCompass();//Update the compass.
    if (currentPlayer.aiControlled && (compassPoint.x === 0 && compassPoint.y === 0) === false) {//If the current player is AI controlled and they have an objective.
        currentPlayer.angle = findAngleBetweenTwoPoints(compassPoint.x, compassPoint.y);//Set the current player's angle towards the compass.
        movePlayer();//Move the player towards the compass point.
    }
}

function keyDownHandler(event) {//A function designed to handle the key downs.
    "use strict";
    if (event.defaultPrevented) {//If the event was cancelled.
        return;//Return and do nothing
    }
    if (currentPlayer.aiControlled) { currentPlayer.aiControlled = false; }//If the player is AI controlled. Stop the AI control.
    if (event.key === "ArrowLeft") {//If the user pressed the left arrow key.
        currentPlayer.angle = Math.PI;//Set the player to face the left angle.
    } else if (event.key === "ArrowRight") {//If the user pressed the right arrow key.
        currentPlayer.angle = 0;//Set the player to face the right angle.
    } else if (event.key === "ArrowUp") {//If the user pressed the up arrow key.
        currentPlayer.angle = 3 * Math.PI / 2;//Set the user to face upwards.
    } else if (event.key === "ArrowDown") {//If the user pressed the down arrow key.
        currentPlayer.angle = Math.PI / 2;//Set the user to face downwards.
    }
    if (event.key.indexOf("Arrow") !== -1 || event.key.toLowerCase() === "w") {//If the user pressed W  or an arrow.
        movePlayer();//Move the player.
    }
}

function main() {
    "use strict";
    canvas = document.getElementById("gameView");
    drawingContext = canvas.getContext("2d");
    players.push(currentPlayer);
    setInterval(drawLoop, 16);
    setInterval(logicLoop, 32);
    setInterval(updatePlayerInformation, 32);
    document.addEventListener("keydown", keyDownHandler);
    canvas.addEventListener("mousedown", getCoordinatesOfClick);
}