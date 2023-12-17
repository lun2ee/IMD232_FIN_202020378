const unis = [];

function setup() {
  createCanvas(800, 800);
  var canvas = document.createElement('canvasHere');
  canvas.id = 'canvasHere';

  document.body.appendChild(canvas);

  for (let azimNum = 1; azimNum < 8; azimNum++) {
    for (let zeniNum = 1; zeniNum < 8; zeniNum++) {
      unis.push(new Uni((TAU / 16) * azimNum, (TAU / 10) * zeniNum, 300, 20));
    }
  }

  background('black');
}

function draw() {
  background('black');
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = color(207, 7, 99);
  translate(width / 2, height / 2);
  stroke('white');
  strokeWeight(1);
  unis.forEach((eachUni) => {
    eachUni.randomAcc();
    eachUni.update();
    eachUni.display();
  });
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
