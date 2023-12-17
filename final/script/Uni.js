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
