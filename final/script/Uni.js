//By 손우성 교수님과 함께 하는 행복 코딩_1:1미팅
//chat GPT 와의 합작
class Uni {
  //생성자 : Uni 객체의 초기 상태와 속성을 설정한다.
  constructor(azimuth, zenith, rad, beginRad) {
    //방위각(고개를 좌우로 돌리는 각)과 관련된 속성 초기화
    this.azimuth = azimuth;
    this.azimVel = 0; //방위각의 변화 속도 초기화
    this.azimAcc; //방위각의 가속도 초기화

    //고도각과 (고개를 위아래로 흔드는 각)과 관련된 속성 초기화
    this.zenith = zenith;
    this.zeniVel = 0; //고도각의 변화 속도 초기화
    this.zeniAcc; //고도각의 가속도 초기화

    //거리와 관련된 속성 초기화
    this.rad = rad; //객체의 현재 거리 (반경) 초기화

    this.beginRad = beginRad; //객체의 시작 거리 (반경) 초기화

    //레퍼러스 반경 ,참조반경 거리 초기화 (객체 주변의 일종의 경계나 영역을 나타내기 위한 값)
    this.wrapperRad = 300;
  }

  //랜덤한 가속도를 서정하는 메서드
  randomAcc() {
    // 방위각의 랜덤한 가속도 설정 (최솟값,최대값)
    // 고도각의 랜덤한 가속도 설정 (최솟값,최대값)
    this.azimAcc = random((-0.15 * TAU) / 30, (0.25 * TAU) / 30);
    this.zeniAcc = random((-0.15 * TAU) / 30, (0.25 * TAU) / 30);
  }

  //Uni 객체의 상태를 업데이트하는 메서드
  update() {
    //가속도 적용 : this.azimVel(현재의 방위각 속도) + this.azimVel -> 속도를 증가시킨다. (방향의 변화율을 증가시키거나 감소시키는데 효과가 있다)
    this.azimVel += this.azimAcc;
    //속도 제한 : constrain 함수는 주어진 값의 범위를 지정된 최솟값과 최댓값 사이로 제한.
    //this.azimVel 의 값은 -3 * TAU / 360 과 3 * TAU / 360 사이의 값으로 유지.
    this.azimVel = constrain(this.azimVel, (-3 * TAU) / 360, (3 * TAU) / 360);
    //방위각 업데이트 : 최종적으로 업데이트 된 속도(this.aziVel)를 현재의 방위각 (this.azimuth)에 더해, 객체의 새로운 방위각을 계산한다.
    //이로써 객체는 그 방향으로 이동하게 된다.
    this.azimuth += this.azimVel;

    //가속도 적용 : this.zeniVel(현재의 고도각 속도)에 this.zeniAcc (고도각 가속도)를 더해 속도를 증가시킨다.
    this.zeniVel += this.zeniAcc;
    //속도제한 : 최솟값은 (-3 * TAU) / 360, 최댓값은 (3 * TAU) / 360
    this.zeniVel = constrain(this.zeniVel, (-3 * TAU) / 360, (3 * TAU) / 360);
    this.zenith += this.zeniVel;
  }

  display() {
    const endPoint = this.polarToCartesian(this.rad);
    const beginPoint = this.polarToCartesian(this.beginRad);

    stroke('white');
    noFill();
    ellipse(0, 0, this.wrapperRad * 2);

    const mouseXInUniFrame = mouseX - width / 2;
    const mouseYInUniFrame = mouseY - height / 2;

    const distanceToMouse = dist(
      beginPoint.x,
      beginPoint.y,
      mouseXInUniFrame,
      mouseYInUniFrame
    );

    if (distanceToMouse < this.wrapperRad) {
      endPoint.x = mouseXInUniFrame;
      endPoint.y = mouseYInUniFrame;
    }

    console.log('begin', beginPoint);
    console.log('end', endPoint);
    line(beginPoint.x, beginPoint.y, endPoint.x, endPoint.y);
    ellipse(beginPoint.x, beginPoint.y, 1);
    ellipse(endPoint.x, endPoint.y, 5);
  }

  polarToCartesian(rad) {
    const x = rad * cos(this.zenith) * cos(this.azimuth);
    const y = rad * cos(this.zenith) * sin(this.azimuth);
    const z = rad * sin(this.zenith);

    return { x, y, z };
  }
}
