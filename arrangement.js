const canvasWidth = 960;
const canvasHeight = 500;

// randomising variables
let curRandomSeed = 0;
let lastSwapTime = 0;
const millisPerSwap = 3999;

// global variables for display
const pixelation = 4; // the size of each pixel relative to a real screen pixel, eg a value of 4 means that each square drawn on the pixel canvas is four pixels wide (not accounting for border)
const type_size = 50;
const bg = '#6a7';
let w;
let h;

// load the text document containg custom characters
function preload () {
  partsStrings = loadStrings('facefeatures.txt');
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

  // the background prior to pixelation is black to improve accuracy of colour
  background(0);
  noStroke();

  // count body parts
  let cbodyL  =   ( split(partsStrings[1],',') ).length;
  let cxtra   =   ( split(partsStrings[2],',') ).length;
  let ceye    =   ( split(partsStrings[3],',') ).length;
  let cmouth  =   ( split(partsStrings[4],',') ).length;
  let cdeco   =   ( split(partsStrings[6],',') ).length;
  // initialise string variable for returned character text
  let kreturn =  '';

  // produce roughly 80 faces and symbols
  for(let i=0; i<80; i++) {
      // random variables
      let bodyL   = int(random(0, cbodyL));
      let x_toggle= random(0,100);
      let xtra    = int(random(1, cxtra));
      let eyeL    = int(random(0, sqrt(ceye))*random(0, sqrt(ceye)));
      let mouth   = int(random(0, cmouth));
      let eye_mirror = random(0, 100);
      let eyeR    = int(random(0, ceye));
      let deco    = int(random(0, cdeco));  // pick a random symbol
      let drawType= random(0, 20);  // draw a face or a random symbol

      // random chance of extra head displaying 
      if(x_toggle<80) {
        xtra = 0;
      }
      // random chance the eyes are asymetrical
      if(eye_mirror<70) {
        eyeR = eyeL;
      }

      if (drawType>11)
      {
            // add a new face to the string of faces and symbols
            kreturn +='   '+kaomoji(bodyL, xtra, eyeL, mouth, eyeR);
      }else
      {
            // add a new symbol to the string of faces and symbols
            kreturn +=' '+symbols(deco);
      }
  }

  // draw the faces and symbols as text
  fill(200);
  textAlign(CENTER);
  textSize(type_size);
  textWrap('WORD');
  text(kreturn, 0, 3, canvasWidth,canvasHeight);

  // pixelate the screen
  loadPixels();   // create an array of pixels from the rendered image
  background(bg); // clear the rendered image

  for (let Px=0; Px < canvasWidth; Px += pixelation) {
    for (let Py=0; Py < canvasHeight; Py += pixelation) {
      let i=(Px+Py*canvasWidth)*2*2;

      if (pixels[i + 0]+pixels[i + 1]+pixels[i + 2]>5){
        fill(20,40);
        square(Px+3, Py+3, pixelation*0.7);        
        fill(20);
        square(Px, Py, pixelation*0.8);
      }
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
