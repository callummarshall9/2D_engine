function drawGUI() {//A function to draw the graphical user interface of the player.
    "use strict";
    drawCompassOutline();//Draw the compass outline.
    if ((compassPoint.x === 0 && compassPoint.y === 0) === false) {//If the player has an compass objective point.
        drawCompassPoint();//Draw a line pointing to the comapss objective point.
        drawDistanceToCompassPoint();//Draw the distance to the compass point.
    }
    drawHealthCompass();//Draw the health compass.
}

function drawLoop() {//A game loop to do all of the drawing.
    "use strict";
    drawingContext.fillStyle = "black";//Set the colour of what to draw to black.
    drawingContext.fillRect(0, 0, 800, 400);//Fill the canvas with black.
    drawPlayers();//Draw all of the players.
    drawGUI();//Draw the GUI.
}