function drawGUI() {//A function to draw the graphical user interface of the player.
    "use strict";
    drawCompassOutline();//Draw the compass outline.
    if ((compassPoint.x === 0 && compassPoint.y === 0) === false) {//If the player has an compass objective point.
        drawCompassPoint();//Draw a line pointing to the comapss objective point.
        drawDistanceToCompassPoint();//Draw the distance to the compass point.
    }
    drawHealthCompass();//Draw the health compass.
}
