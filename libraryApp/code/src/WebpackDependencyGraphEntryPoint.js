
  import { HelperA } from './HelperA'
  import { HelperB } from './HelperB'
  import { DoQRCode } from './DoQRCode'
  import { putStuffToCodeInDiv } from './DevCodingHelper'
  import './helpercss/helper.css'
/*
  This is the javascript file which goes into file webpack.config.js
  in entry /module.exports/entry: './src/WebpackEntryPoint.js'
  
  // entry means "start dependency graph at this file"
  // builds a dependency graph of the .js/.jsx files based on "include('./xyz.js')" lines. All files in graph
  // get put in the bundle.  It has one or more entry points. Combines all files into one or more bundles. 
  // Graph stops at node_modules (see "exclude") 
*/
  export { DoQRCode, HelperA, HelperB, putStuffToCodeInDiv }
