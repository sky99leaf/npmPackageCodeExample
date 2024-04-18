import  React, { useRef, useEffect, useState } from 'react';
import { HelperA, DoQRCode, HelperB } from 'jjjunk-test'
import jalepenos from 'jjjunk-test/jpegs/farmersmkt/jalepenos.JPG'

function App() {
  return(<>
    {/* < DoQRCode qrmessage='hat and coffee on wood table' /> */}
    < DoImgFromNpmImport preloadImage={jalepenos} imageName='Mona_Lisa204k.jpg' />
    <div className='redcolor'>This ... is app.js from client<br/>
    note that this client does not need to include helper.css<br/>
    seems to be included with the function import from the package<br/>
    look at this in chrome debugger to see where css comes from</div>
    This app uses npm package jjjunk-test<br/>
    below are imported components:<br/>
    <HelperA /><br/>
    <HelperB className='redcolor' />
    </> )
}

function DoImgFromNpmImport(props) {
  var ref_preloadImg = useRef(); var ref_finalImg = useRef();
  const [finalImg_state, setFinalImg_state] = useState(null);
  useEffect(() => { 
      //  Do not use "import('jjjunk-test/jpegs/' + props.imageName)" because it may block
      //  the UI thread while it loads. Instead, use then():
      //  when the image has finished loading, then() calls the anonymous function which takes
      //  moduleA as the imported thing, and sets the image src to the moduleA.default
      //  which is the imported image.
      import('jjjunk-test/jpegs/' + props.imageName).then((moduleA) => { 
          ////  simulate slow load    setTimeout(() => {
          setFinalImg_state(moduleA.default); // this causes a redraw so image will show
          ref_finalImg.current.style.visibility='visible';
          ref_preloadImg.current.style.visibility='hidden'; /* hide the preload but save space for it */
          ////  }, 1000);
      })
  }); // , []); // [] empty: run only once when component mounts like componentDidMount
  
  /* to see loading on slow-mo, on browser debugger to to network and throttle */
  return (<div style={{ display:'grid' }}>
      <img src={finalImg_state} ref={ref_finalImg}
           style={{ visibility:'hidden', gridArea:'1/1', zIndex:'55', width:200, height:'auto' }} alt="alt text"  />
      {/* shows image stand-in during load <img src={props.preloadImage} ref={ref_preloadImg} 
        style={{ gridArea:'1/1', left:'0px', width:250, height:300 }} alt="preload" /> */}
      <div ref={ref_preloadImg} // shows text during load
        style={{ gridArea:'1/1', left:'0px', width:250, height:300, fontSize:'22px',
                 border:'3px solid green' }} >
          <div style={{ position:'relative',top:'50%', left:'50%', marginRight:'-50',
                      transform:'translate(-50%, -50%)', overflowWrap:'break-word'}}>
            Image {props.imageName} is loading...
          </div>
      </div>
    </div>)
}
export default App;

// for loading via URL, not npm package
// if (theImgObj_state == null) {
//   var imgToLoad;
//   imgToLoad = new Image();
//   imgToLoad.src = props.imgSrcUrl; // imgA.style='width:90vmin';
//   // console.log('starting load: ' + props.imgSrcUrl + ' |||||||||||||||||||||||||||||||||||||||||||')
//   imgToLoad.addEventListener("load", (event) => {  
//      setTimeout(() => { // ONLY FOR TESTING TO SIMULATE SLOW LOAD
//         // console.log('image loaded ++++++++++++++++++++++++++++++++++++++++++++++++++')
//         ref_preloadImg.current.style.display='none'; /* hide the preload and .. */
//         // setting state object causes ImgDivWithInfoBtn to reload with new image
//         setTheImgObj_state(imgToLoad) 
//      }, slowTimeDelay)
//   })
//}
