/*
 * The code in this file contains two functions.
 *
 * One draws the face entirely out of text and returns it as a string
 * The other does picks random symbols to be placed on the final arrangement to
 * create an eclectic atmosphere.
 */

// Create a face entirely out of text 
/* =Variables=
 * Ib       :   the index for the body part
 * Ix       :   the index for the body part
 * IiL      :   the index for the body part
 * Im       :   the index for the body part
 * IiR      :   the index for the body part
 * KbodyL   :   the string for the left body part
 * K...etc  :   the string for the corresponding part
 * Kfull    :   the full combined string
 */
function kaomoji(Ib, Ix, IiL, Im, IiR, Kfull) {
  // generate arrays containing every character for each face part
  let partsBodyL  =   split(partsStrings[1],',');
  let partsXtra   =   split(partsStrings[2],',');
  let partsEye   =   split(partsStrings[3],',');
  let partsMouth  =   split(partsStrings[4],',');
  let partsBodyR  =   split(partsStrings[5],',');

  // write the corresponding string for that part as a string
  let KbodyL  =   partsBodyL[Ib];
  let Kxtra   =   partsXtra[Ix];
  let KeyeL   =   partsEye[IiL];
  let Kmouth  =   partsMouth[Im];
  let KeyeR   =   partsEye[IiR];
  let KbodyR  =   partsBodyR[Ib];
  // create the full string containing each requested part
  Kfull = (KbodyL + Kxtra + KeyeL + Kmouth + KeyeR + KbodyR) ;

  // return the full string to the function that requested it
  return(Kfull);
}

// Write a string containing a symbol from the face features document
function symbols(deco) {
  partsDeco =   split(partsStrings[6],',');
  return(partsDeco[deco]);
}