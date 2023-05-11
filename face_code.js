/*
 * This file should contain code that draws your faces.
 *
 * Each function takes parameters and draws a face that is within
 * the bounding box (-10, -10) to (10, 10).
 *
 * These functions are used by your final arrangement of faces as well as the face editor.
 */


/*
 * tilt_value is in degrees
 * eye_value is an integer number of eyes: either 0, 1, 2, or 3
 * mouth_value is how open the mouth is and should generally range from 0.5 to 10
 */

let KbodyL;
let partsBodyL;


function preload () {
  // let partsStrings = loadStrings('facefeatures');
}

function kaomoji(sbL, sx, siL, sm, siR, text_draw, Kfull) {
  partsBodyL  =   split(partsStrings[1],',');
  partsXtra   =   split(partsStrings[2],',');
  partsEyeL   =   split(partsStrings[3],',');
  partsMouth  =   split(partsStrings[4],',');
  partsEyeR   =   split(partsStrings[5],',');
  partsBodyR  =   split(partsStrings[6],',');

  KbodyL  =   partsBodyL[sbL];
  Kxtra   =   partsXtra[sx];
  KeyeL   =   partsEyeL[siL];
  Kmouth  =   partsMouth[sm];
  KeyeR   =   partsEyeR[siR];
  KbodyR  =   partsBodyR[sbL];
  Kfull = (KbodyL + Kxtra + KeyeL + Kmouth + KeyeR + KbodyR) ;

  fill('BLACK');
  textAlign(CENTER,CENTER);
  // textSize(50);

  if(text_draw){
    text(Kfull, 0, 0);
  }

  return(Kfull);
}

function orangeAlienFace(tilt_value, eye_value, mouth_value) {
  const bg_color3 = [71, 222, 219];
  const fg_color3 = [255, 93, 35];

  let headSize = 20
  let eyeSize = 5;
  let centerX = 0;
  let Iy = -4
  let distactBetweenEyes = 5
  let MouthDrop = 7
  
  // rotation in degrees
  angleMode(DEGREES);
  rotate(tilt_value);

 // head
  noStroke();
  fill(fg_color3);
  ellipse(centerX, 0, headSize, headSize);

  // 2 traditonal eyes
  if (eye_value === 1 || eye_value == 3) {
    fill(bg_color3);
    ellipse(centerX, Iy, eyeSize-1,eyeSize);
   
  }
// middle eye
  if (eye_value >= 2) {
    fill(bg_color3);
    ellipse(centerX - distactBetweenEyes, Iy, eyeSize);
    ellipse(centerX + distactBetweenEyes, Iy, eyeSize );
  }

  // mouth
  fill(bg_color3);
  ellipse(centerX, Iy + MouthDrop, distactBetweenEyes, mouth_value);
}


function simplePurpleFace() {
  fill(234, 122, 244);
  noStroke();
  // head
  ellipse(0, 0, 20);
  // eyes
  fill(255, 217, 114);
  ellipse(-3, -3, 3);
  ellipse( 3, -3, 3);
}

/*
 * thinness_value ranges from 0-100 and indicates how thin the face is
 */
function blockyFace(thinness_value) {
  // head
  noStroke();
  fill(134, 19, 136);
  let head_width = map(thinness_value, 0, 100, 8, 20);
  rect(-head_width/2, -9, head_width, 18);
 

  // eyes
  fill(234, 122, 244);
  ellipse(-2, -4, 1);
  ellipse( 2, -4, 1);
}
