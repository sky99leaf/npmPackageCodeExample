
import React, { useRef, useEffect } from 'react';
import { HelperB } from './HelperB';
import { DoQRCode } from './DoQRCode'
/* !!!!!!!!!! BEWARE: SNAFU ALERT !!!!!!!!!
    Following import syntax will work fine when tested here but crash
    a client importing a package made using this file.
    import { React, useRef, useEffect } from 'react'; [note that React is inside the {} !! ]
    Client gives this unrelated error: 
         Uncaught TypeError: Cannot read properties of undefined (reading 'createElement')...
  !!!!!!!!!! BEWARE: SNAFU ALERT !!!!!!!!!*/
// import { DoQRCode } from './DoQRCode'
import './helpercss/helper.css'

  function HelperA() {
      var dt=new Date()
      console.log('starting HelperA')
      // fails here on client but not local serve or direct run
      useEffect(() => { 
        console.log('hello from HelperA useEffect')
      }); 
      return(<div className='redcolor'>
        wed pancakes HelperA.js.
        
        <br/>Time now is <b> { dt.toLocaleDateString('en-us') + ', sec: ' + dt.getSeconds() } </b>
        <br/>I also import helperB below:<br/>
        <div style={{ color:'green', border:'3px solid green', width:'fit-content', boxShadow:'10px 5px 5px #444444' }}>
          <HelperB/>
          Now here is import of DoQrCode:<br/>
          <DoQRCode qrmessage='another try' width='66' />
          END of import
          </div></div>)
  }
  export { HelperA } 
