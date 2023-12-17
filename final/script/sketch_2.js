const unis = [];

function setup() {
  createCanvas(800, 800);
  var canvas = document.createElement('canvasHere');
  canvas.id = 'canvasHere';

  document.body.appendChild(canvas);

  //방위각에 대한 루프
  for (let azimNum = 1; azimNum < 8; azimNum++) {
    //경사각에 대한 루프
    for (let zeniNum = 1; zeniNum < 8; zeniNum++) {
      //Uni 클래스의 새로운 인스턴스를 생성하고 배열에 추가한다.
      //azimuth 값은 (TAU/16)* azimNum 으로 설정되고,
      //zenith 값은 (TAU/8)*zeniNum 으로 설정된다.
      //나머지 매개 변수는 고정된 값인 300 과 50이다.
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
  // console.log(unis[0]);
}
function windowResized() {
  // 윈도우 크기가 변경되면 캔버스 크기를 조절
  resizeCanvas(windowWidth, windowHeight);
}
