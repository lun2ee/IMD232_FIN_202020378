//선채로 어디를 보는가 하는 각도
let randomAzimuth;
//고개를 알마나 들고 내렸나 하는 각도
let randomZenith;
let rad = 200;

function setup() {
  //   createCanvas(800, 800, WEBGL);
  createCanvas(800, 800);
  background('black');
}

function draw() {
  randomAzimuth = random(TAU);
  randomZenith = random(TAU);
  background('black');
  //   normalMaterial();
  //   translate(width / 2, height / 2);
  //   sphere(rad);
  push();
  let xyz = polarToCartesian(rad, randomAzimuth, randomZenith);
  translate(width / 2 + xyz[0], height / 2 + xyz[1]);
  ellipse(0, 0, 10);
  pop();
}

function polarToCartesian(radius, azimuth, zenith) {
  return [
    radius * sin(zenith) * cos(azimuth),
    radius * sin(zenith) * sin(azimuth),
    radius * cos(zenith),
  ];
}
