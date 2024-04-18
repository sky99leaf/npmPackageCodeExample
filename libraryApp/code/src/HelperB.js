import React, { useRef, useEffect } from 'react';
/* !!!!!!!!!! BEWARE: SNAFU ALERT !!!!!!!!!
    Following import syntax will work fine when tested here but crash
    a client importing a package made using this file.
    import { React, useRef, useEffect } from 'react'; [note that React is inside the {} !! ]
    Client gives this unrelated error: 
         Uncaught TypeError: Cannot read properties of undefined (reading 'createElement')...
  !!!!!!!!!! BEWARE: SNAFU ALERT !!!!!!!!!*/
  /* comments to see if babel removes these from what is published
   * to npm 
   */
  // comments to see if babel removes these from what is published
  // to npm 
  function HelperB() {
      return(<div style={{ width:'fit-content' }}>ikea lunch BBB HelperB from HelperB.js</div>)
  }
  
  export { HelperB }
