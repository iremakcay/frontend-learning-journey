let pupilLeft;
let pupilRight;

function init() {
  pupilLeft = this.document.getElementById("pupil-left");
  pupilRight = this.document.getElementById("pupil-right");
}

function onMouseMove(event) {
  movePupil(event, pupilLeft);
  movePupil(event, pupilRight);
}

function calcAngleDegrees(x, y) {
  return (Math.atan2(y, x) * -180) / Math.PI;
}

function movePupil(event, pupil) {
  var x1 = event.clientX;
  var y1 = event.clientY;

  var pupilCoords = pupil.getBoundingClientRect();
  var x2 = pupilCoords.x;
  var y2 = pupilCoords.y;

  var rateX = x2 / pupilCoords.width;
  var rateY = y2 / pupilCoords.height;

  var pupLeft = (x1 - x2) / (4 * rateX);
  var pupTop = (y1 - y2) / (4 * rateY);
  pupil.style.transform = `translate(${pupLeft}px, ${pupTop}px)`;
}

function movePupilAngular(event, pupil) {
  var x1 = event.clientX;
  var y1 = event.clientY;

  var pupilCoords = pupil.getBoundingClientRect();
  var x2 = pupilCoords.x + pupilCoords.width / 2;
  var y2 = pupilCoords.y + pupilCoords.height / 2;

  var rad = calcAngleDegrees(x2 - x1, y2 - y1);

  var translateYDistance = 20 * Math.sin(rad);
  var translateXDistance = 20 * Math.cos(rad);

  pupil.style.transform = `translate(${translateXDistance}px, ${translateYDistance}px)`;
}

window.onload = init;
window.onMouseMove = onMouseMove;
