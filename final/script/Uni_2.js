class Uni {
  constructor(azimuth, zenith, rad, beginRad) {
    //고개를 좌우로 하는 각 (방위각)
    this.azimuth = azimuth;
    this.azimVel = 0;
    this.azimAcc;

    //고개를 위아래로 하는 각 (경사각)
    this.zenith = zenith;
    this.zeniVel = 0;
    this.zeniAcc;

    //반지름 (끝점)
    this.rad = rad;
    //시작점 반지름
    this.beginRad = beginRad;

    this.wrapperRad = 300;
  }

  randomAcc() {
    this.azimAcc = random((-0.15 * TAU) / 30, (0.25 * TAU) / 30);
    this.zeniAcc = random((-0.15 * TAU) / 30, (0.25 * TAU) / 30);
  }

  update() {
    this.azimVel += this.azimAcc;
    this.azimVel = constrain(this.azimVel, (-3 * TAU) / 360, (3 * TAU) / 360);
    this.azimuth += this.azimVel;

    this.zeniVel += this.zeniAcc;
    this.zeniVel = constrain(this.zeniVel, (-3 * TAU) / 360, (3 * TAU) / 360);
    this.zenith += this.zeniVel;
  }

  updateWrapperRad(scaleFixX, scaleFixY) {
    // wrapperRad를 화면 축소 비율에 맞게 조절
    this.wrapperRad = 300 * min(scaleFixX, scaleFixY);
  }

  // Uni 클래스의 display 메서드 수정
  display() {
    const endPoint = this.polarToCartesian(this.rad);
    const beginPoint = this.polarToCartesian(this.beginRad);

    // 원을 감싸는 선 그리기
    stroke('white');
    noFill();
    ellipse(0, 0, this.wrapperRad * 2);

    // 마우스 위치
    const mouseXInUniFrame = mouseX - width / 2;
    const mouseYInUniFrame = mouseY - height / 2;

    // 마우스와의 거리
    const distanceToMouse = dist(
      beginPoint.x,
      beginPoint.y,
      mouseXInUniFrame,
      mouseYInUniFrame
    );

    // 만약 마우스가 Uni 바깥쪽의 원 안에 들어오면 endpoint를 마우스 위치로 몰리도록 함
    if (distanceToMouse < this.wrapperRad) {
      // 같은 분면에 위치한 endpoint 개수 제한
      endPoint.x = mouseXInUniFrame;
      endPoint.y = mouseYInUniFrame;
    }

    beginShape();
    for (let i = 0; i < 100; i++) {
      const t = i / 100;
      const x = lerp(beginPoint.x, endPoint.x, t);
      const y = lerp(beginPoint.y, endPoint.y, t);

      const offsetX = map(noise(t + this.noiseOffsetX), 0, 1, -10, 10);
      const offsetY = map(noise(t + this.noiseOffsetY), 0, 1, -10, 10);

      vertex(x + offsetX, y + offsetY);
    }
    endShape();

    // 등분된 점들
    const divisionPoints = [];
    for (let i = 0; i < 5; i++) {
      const t = i / 5;
      const x = lerp(beginPoint.x, endPoint.x, t);
      const y = lerp(beginPoint.y, endPoint.y, t);

      divisionPoints.push(createVector(x, y));
    }

    fill('red');
    divisionPoints.forEach((point) => {
      point.x += random(-1, 1);
      point.y += random(-1, 1);

      ellipse(point.x, point.y, 5, 5);
    });

    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
  }

  polarToCartesian(rad) {
    const x = rad * cos(this.zenith) * cos(this.azimuth);
    const y = rad * cos(this.zenith) * sin(this.azimuth);
    const z = rad * sin(this.zenith);

    return { x, y, z };
  }
}
