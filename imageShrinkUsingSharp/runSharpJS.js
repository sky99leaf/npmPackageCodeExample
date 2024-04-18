/////////// DEMO OF HOW TO USE SHARP FROM NPMJS TO RESIZE A FILE.    ///////////
/////////// DICEY PROBLEMS ARISE DUE TO ASYNCHRONOUS DESIGN OF SHARP ///////////
/////////// BECAUSE ITS DESIGNED FOR CLIENT SIDE AND CANNOT BLOCK UI ///////////

///    Uses node_modules from another folder to save disk. The package.json from that folder
///    assumes  "dependencies": {"sharp": "^0.33.3", "yargs": "^17.7.2"} 
///    require() statements use full path only so intellisense works in visual studio code. 
///    NODE_PATH='../libraryApp/code/node_modules' node runSharpJS.js --imgFile image.jpg
///    is used to run this; full paths in require() not needed to run ok.

const sharp = require('../libraryApp/code/node_modules/sharp');
const yargs = require('../libraryApp/code/node_modules/yargs/yargs')
const { hideBin } = require('../libraryApp/code/node_modules/yargs/helpers')

const ret = doAll()
console.log('alldone ' + ret)
//await ret
// doAll.then(done4 => { console.log('all done ' + done4)})

async function doAll() {
  const argv = yargs(hideBin(process.argv)).argv
  const inputFile = argv.imgFile
  const prefix = inputFile.replace(/\..*/, '')  // 
  console.log(prefix)
  /* example of asynch operation. sharp() returns a promise which gets chained to
     metadata which returns a promise which chains to then. sharps docs show
     example of putting several promises into array and waiting until all are done.   */
  // sharp("Mona_Lisa204k.jpg").metadata().then(summary => 
  //       { summary.icc = "removed because its very very long";
  //         console.log('asynch summary: ' + JSON.stringify(summary, null, 2))})
  /* using await because its a command line utility and blocking is OK, unlike a webpage UI */
  const sharpImg = await sharp(inputFile) 
  var mdata = await sharpImg.metadata(); mdata.icc = "removed because its very very long";
  console.log('original metadata: ' + JSON.stringify(mdata, null, 2))
  //const fileInfo = await sharpImg.toFile('junk')
  //console.log('original file: ' + JSON.stringify(fileInfo, null, 2))
  var sharpInstanceA = await sharpImg.resize({ width: 22 }); 
  // TOFILE() GIVES A PROMISE OF FILE INFO FOR WHAT WAS JUST WRITTEN. SHORT SUMMARY: WIDTH, HEIGHT ETC
  var fpromise = await sharpInstanceA.toFile(newname(prefix, 22))
  console.log('new file info: ' + JSON.stringify(fpromise, null, 2))

  /* asynchronous example using chaining. Put this AFTER previous logs */
  const filepromise = sharpImg.resize({ width: 150 }).toFile(newname(prefix, 150))
  filepromise.then(fileInfo => 
      { console.log('new file info: ' + JSON.stringify(fileInfo, null, 2)) })
  // wait for filepromise to finish before quitting script. Not sure in necessary.
  await filepromise
}
function newname(prefix, width) { return ('mod_' + prefix + '_' + width + 'w.jpg') };

