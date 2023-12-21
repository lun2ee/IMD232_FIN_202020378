//By 손우성 교수님과 함께 하는 행복 코딩_1:1미팅
//chat GPT 와의 합작
class Uni {
  constructor(azimuth, zenith, rad, beginRad) {
    this.azimuth = azimuth;
    this.azimVel = 0;
    this.azimAcc;

    this.zenith = zenith;
    this.zeniVel = 0;
    this.zeniAcc;

    this.rad = rad;
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
    this.wrapperRad = 300 * min(scaleFixX, scaleFixY);
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
