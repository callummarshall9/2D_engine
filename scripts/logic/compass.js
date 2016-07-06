var angle = (3 * Math.PI / 2),//The angle in which to draw the compass arrow at.
    compassPoint = {//A object to hold details of the compass objective point
        x: 0,//X coordinate of the compass objective point.
        y: 0,//Y coordinate of the compass objective point.
        distance: 0//The distance of the compass objective point.
    };

function findAngleBetweenTwoPoints(x, y) {//Find the angle between two points.
    "use strict";
    var dy = y - currentPlayer.y,//Find the difference in y coordinates.
        dx = x - currentPlayer.x,//Find the difference in x coordinates.
        angle = Math.atan2(dy, dx);//Find the angle between the coordinates.
    return angle;//Return the angle found.
}

function updateCompass() {//A function designed to update the compass.
    "use strict";
    var distance = 0;//A variable to hold the distance to a point.
    if ((compassPoint.x === 0 && compassPoint.y === 0) === false) {//If the compass point isn't set at origin.
        compassPoint.distance = Math.floor(Math.sqrt(Math.pow(currentPlayer.x - compassPoint.x, 2) + Math.pow(currentPlayer.y - compassPoint.y, 2)));//Use the distance formula to calculate distance to the point.
        if (distance <= currentPlayer.stepSize) {//If the distance is less then the player's step size.
            compassPoint.x = 0;//Set the compass point to origin so the compass objective no longer shows on the player's compass.
            compassPoint.y = 0;
        } else {//If the distance is greater than the player's step size.
            angle = findAngleBetweenTwoPoints(compassPoint.x, compassPoint.y);//Find the angle between the compass objective point and the player.
        }
    }
}