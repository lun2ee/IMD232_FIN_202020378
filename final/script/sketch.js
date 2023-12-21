//By 손우성 교수님과 함께 하는 행복 코딩_1:1미팅
//chat GPT 와의 합작
//주어진 코드는 p5js 를 사용하여 화면에 여러개의 "Uni" 객체를 랜덤한 방향으로 움직이게 하는 프로그램이다.
//전역 변수 선언
const unis = [];
//setup 함수
function setup() {
  createCanvas(800, 800);
  var canvas = document.createElement('mySketchGoesHere');
  canvas.id = 'mySketchGoesHere';

  document.body.appendChild(canvas);

  //azimNum 과 zeniNum이 각각 1부터 7까지의 값을 가질 때까지 반복
  for (let azimNum = 1; azimNum < 8; azimNum++) {
    for (let zeniNum = 1; zeniNum < 8; zeniNum++) {
      //새로운 Uni 객체를 생성하여 unis 배열에 추가한다.
      //첫번째 매개변수 : azimNum 값을 기반으로 한 각도 설정
      //두번째 매개변수 : zeniNum 값을 기반으로 한 각도 설정
      //세번째 매개변수 : Uni 객체의 크기를 나타내는 값 (300)
      //네번째 매개변수 : Uni 객체내부 선들의 시작 점을 나타내는 값 (20)
      unis.push(new Uni((TAU / 16) * azimNum, (TAU / 10) * zeniNum, 300, 20));
    }
  }

  background('black');
}

function draw() {
  background('black');
  //그림자의 흐릿한 정도를 32로 설정한다.
  drawingContext.shadowBlur = 32;
  //그림자의 색상을 (207,7,99)로 설정한다.
  drawingContext.shadowColor = color(207, 7, 99);
  //캔버스의 중심으로 좌표 원점을 이동한다.
  translate(width / 2, height / 2);
  //선의 색상을 흰색으로 설정한다.
  stroke('white');
  //선의 두께를 1로 설정한다.
  strokeWeight(1);
  //unis 배열의 각 Uni 객체에 대해 다음 작업을 수행한다.
  unis.forEach((eachUni) => {
    //각 Uni 객체의 랜덤한 가속도를 적용한다.
    eachUni.randomAcc();
    //각 Uni 객체의 상태나 위치를 업데이트 한다.
    eachUni.update();
    //각 Uni 갹체를 화면에 표시한다.
    eachUni.display();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
