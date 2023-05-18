// global variables for display
const canvasWidth = 960;
const canvasHeight = 500;
const bg = '#6a7';
const pixelation = 8;

// initialise editor variables
let slider1, slider2, slider3, slider4, slider5, slider6;
let faceSelector;
let faceGuideCheckbox;
let textout = '';

function preload () {
  partsStrings = loadStrings('facefeatures.txt');
}

function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  // count body parts
  let cbody   =   ( split(partsStrings[1],',') ).length;
  let cxtra   =   ( split(partsStrings[2],',') ).length;
  let ceye    =   ( split(partsStrings[3],',') ).length;
  let cmouth  =   ( split(partsStrings[4],',') ).length;
  let cMisc   =   ( split(partsStrings[6],',') ).length;

  // create sliders
  slider1 = createSlider(0, cbody-1,   0);
  slider2 = createSlider(1, cxtra-1,    0);
  slider3 = createSlider(0, ceye-1,    0);
  slider4 = createSlider(0, cmouth-1,   0);
  slider5 = createSlider(0, ceye-1,    0);
  slider6 = createSlider(0, cMisc-1,    0);

  check1 = createCheckbox('', false);
  check2 = createCheckbox('', false);
  faceGuideCheckbox = createCheckbox('', false);
  out_box = createInput('0');

  slider1.parent('slider1Container');
  check1.parent('checkbox1Container');
  slider2.parent('slider2Container');
  slider3.parent('slider3Container');
  slider4.parent('slider4Container');
  check2.parent('checkbox2Container');
  slider5.parent('slider5Container');
  slider6.parent('slider6Container');
  out_box.parent('outputContainer');

  
  faceGuideCheckbox.parent('checkbox3Container');

  faceSelector = createSelect();
  faceSelector.option('Face');
  faceSelector.option('Decal');
  faceSelector.value('Face');
  faceSelector.parent('selector1Container');
}



function draw () {
  // create variables from slider information
  let s1 = slider1.value();
  let s2;
  if (check1.checked()){
    s2 = slider2.value();
  } else{
    s2 = 0;
  }
  let s3 = slider3.value();
  let s4 = slider4.value();
  let s5;
  if (check2.checked()){
    s5 = slider5.value();
  } else {
    s5 = slider3.value();
  }
  let s6 = slider6.value();
  let mode = faceSelector.value();
  let show_face_guide = faceGuideCheckbox.checked();


  // use same size / y_pos for all faces
  let face_size = canvasWidth / 5;
  let face_scale = face_size / 10;
  let face_y = height / 2;
  let face_x = width / 2;

  strokeWeight(0.2);
  background(256);

  push();
  translate(face_x, face_y);
  scale(face_scale);

  push();
  if(show_face_guide) {
    strokeWeight(0.5);
    rectMode(CORNER); 
    noFill()
    stroke(0, 0, 255);
    rect(-10, -10, 20, 20);
    line(  0, -11,  0, -10);
    line(  0,  10,  0, 11);
    line(-11,   0,-10,  0);
    line( 11,   0, 10,  0);
  }

  if (mode == 'Face') {  
    textout = kaomoji(s1,s2,s3,s4,s5);
  } else
  {
    textout = symbols(s6);
  }

  out_box.value(textout);
  fill('BLACK');
  textAlign(CENTER,CENTER);
  textSize(12);
  text(textout, 0, 0);

  // pixelate the canvas
  loadPixels();
  let PixelCanvas = createCanvas(canvasWidth,canvasHeight);
  PixelCanvas.parent('canvasContainer');
  background(bg);

  noStroke();
  for (let Px = 0; Px < width; Px += pixelation) {
    for (let Py = 0; Py < height; Py += pixelation) {
      
      let i = (Px + Py * width) * 4;

      if (pixels[i + 0]*pixels[i + 1]*pixels[i + 2]*pixels[i + 3]<1){
        fill(20,40);
        square(Px+4, Py+4, pixelation*0.7);        
        fill(20);
        square(Px, Py, pixelation*0.8);
      }
    }
  }

  pop();
}

// copy the kaomoji to the clipboard when the copy button is pressed
function CopyPress() {
  navigator.clipboard.writeText(out_box.value());
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
