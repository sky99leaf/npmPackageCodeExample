
import React, { useRef, useEffect } from 'react';
/* !!!!!!!!!! BEWARE: SNAFU ALERT !!!!!!!!!
    import { React, useRef, useEffect } from 'react';
    USING ABOVE IMPORT LETS THE PACKAGE COMPILE AND PUBLISH TO NPMJS OK
    BUT ON CLIENT IT GIVES BELOW MESSAGE.
    Uncaught TypeError: Cannot read properties of undefined (reading 'createElement')
    at DoQRCode (all.js:3:1)
  !!!!!!!!!! BEWARE: SNAFU ALERT !!!!!!!!!*/

var QRCode = require('qrcode');
// in package.json...   "qrcode": "^1.5.1", ... npm i qrcode

/* expects props: qrmessage, width */
function DoQRCode(props) {
  /* useEffect is a React lifecycle method that fires every time the
     component has finished rendering (when 2nd arg is missing)
     In this case, get the canvas "qrcanvas" and tell the 
     QRCode package from npmjs.com to draw a qrcode into it. 
     This is to test how npmjs package deals with dependencies */
  useEffect(() => { 
    QRCode.toCanvas(qrcanvas.current, props.qrmessage, { width: props.width }, 
    function (error) {
        if (error) console.error('error in QRCode: ' + error); 
    })
  }); 
  var qrcanvas = useRef();

  return(<>This is DoQRCode.js wed <br/>
    <canvas ref={qrcanvas} style={{ width:'200px', height:'200px',
          border:'2px solid blue'}} />
    </> )
}
export { DoQRCode }