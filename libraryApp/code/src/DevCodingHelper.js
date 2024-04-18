import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
  import { HelperA } from './HelperA'
  import { HelperB } from './HelperB'
  import { DoQRCode } from './DoQRCode'
  import './helpercss/helper.css'

  /**** used for developing javascript including React.js code for inclusion in the bundle.js */

  function DivContentToCode() {
    useEffect(() => {  
      // Because this is a React app, this does NOT in run window, it appears in browser console!
      console.log('-----------this is DevCodingHelper.js ')
    }, []); 
    return (<><HelperA /><HelperB /><br/>
            <DoQRCode qrmessage='hat on table' width='66' />
            <HelperB/>
            </>);
  }
  function putStuffToCodeInDiv() {
    const root = ReactDOM.createRoot(document.getElementById('divThatGetsReactContent'));
    root.render(
      <div>
        <DivContentToCode />
      </div>
    );
  }

  export { putStuffToCodeInDiv }
