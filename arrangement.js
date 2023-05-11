/*
 * This program draws your arrangement of faces on the canvas.
 */

const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 3000;

// global variables for colors
const bg_color1 = '#6a7';

function preload () {
  partsStrings = loadStrings('facefeatures');
}

function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(random(0, 1000));

  // rotation in degrees
  angleMode(DEGREES);
}

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  lastSwapTime = millis();
}



function mouseClicked() {
  changeRandomSeed();
}

function draw () {
  if(millis() > lastSwapTime + millisPerSwap) {
    changeRandomSeed();
  }

  // reset the random number generator each time draw is called
  randomSeed(curRandomSeed);

  // clear screen
  background(bg_color1);
  noStroke();

  // count body parts
  let cbodyL  =   ( split(partsStrings[1],',') ).length;
  let cxtra   =   ( split(partsStrings[2],',') ).length;
  let ceyeL   =   ( split(partsStrings[3],',') ).length;
  let cmouth  =   ( split(partsStrings[4],',') ).length;
  let ceyeR   =   ( split(partsStrings[5],',') ).length;
  // let cbodyR  =   ( split(partsStrings[6],',') ).length;

  // draw a 7x4 grid of faces
  let w = canvasWidth / 7;
  let h = canvasHeight / 4;
  for(let i=0; i<4; i++) {
    for(let j=0; j<7; j++) {
      let y = h/2 + h*i;
      let x = w/2 + w*j;
     
      // center face
      let bodyL   = int(random(0, cbodyL));
      let xtra    = int(random(0, cxtra));
      let eyeL    = int(random(0, ceyeL));
      let mouth   = int(random(0, cmouth));
      let eyeR    = int(random(0, ceyeR));
      // let bodyL = int(random(0, cbodyL));

      let eye_mirror = random(0, 100);
      if(eye_mirror<80) {
        eyeR = eyeL;
      }

      // let is_cyclops = random(0, 100);

      // if(is_cyclops < 10) {
      //   eye_value = 1;
      //   tilt_value = random(-5, 5);
      //   mouth_value = random(0, 1.7);
      // }

      push();
      translate(x, y);
      scale(w/25, h/25);
        
      kaomoji(bodyL, xtra, eyeL, mouth, eyeR);
      pop();
      
    }
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
