function drawDistanceToCompassPoint() {//A function to draw the distance to a compass point.
    drawingContext.font = "12px Arial";//Set the font of the text to draw.
    drawingContext.fillStyle = "white";//Set the colour of the text to draw.
    drawingContext.fillText("Distance: " + compassPoint.distance + "m", 10, 150);//Draw the distance to the point at point (10,150).
}

function drawHealthCompass() {//A function designed to draw the health compass.
    "use strict";
    drawingContext.beginPath();//Begin the path to draw.
    drawingContext.strokeStyle = "red";//Set the colour of what to outline.
    drawingContext.arc(75, 75, 40, 0, ((2 * Math.PI) / currentPlayer.maxHealth) * currentPlayer.health);//Draw an arc based on the player's health
    drawingContext.lineWidth = 5;//Set the width of the arc outline to draw.
    drawingContext.stroke();//Draw the arc outline.
}

function drawCompassOutline() {//A function designed to draw the circle outline.
    "use strict";
    drawingContext.beginPath();//Begin the path to draw.
    drawingContext.strokeStyle = "white";//Set the colour of what to draw.
    drawingContext.arc(75, 75, 50, 0, 2 * Math.PI);//Draw an arc.
    drawingContext.lineWidth = 3;//Set the width of the line to draw.
    drawingContext.stroke();//Draw the arc outline.
}

function drawCompassPoint() {//A function to draw the compass line pointing to the objective.
    "use strict";
    drawingContext.strokeStyle = "white";//Set the colour of the line to draw.
    drawingContext.moveTo(75, 75);//Set the centre point of where to draw the line from.
    drawingContext.lineTo(75 + (50 * Math.cos(angle)), 75 + (50 * Math.sin(angle)));//Set a line from the centre point to the centre point + the components of the vector pointing to the anglee.
    drawingContext.stroke();//Draw the line
    drawingContext.moveTo(0, 0);//Move the centre point of where to draw from back to origin.
}