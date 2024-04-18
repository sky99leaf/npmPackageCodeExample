
// to setup: install node.js on computer
//           npm init
//           npm install jsonpath
//           npm install yargs
// These 3 lines add entries to package.json and load node_modules with the packages.
// examples:
//  node queryJSON.js --file=package.json --queryStr='$..version'

var jp = require('jsonpath');

// WARNING 'version' and 'verbose' ARE RESERVED BY NODE SO DONT USE AS ARGS !
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const exampleCmd = 'node queryJSON.js --file=package.json --queryStr=\'$..version\' [--showDebug]'
const aboutThis = 'This is a command line wrapper for the npmjs package \"jsonpath\".\nRuns a query on specified JSON file. '
if (Object.keys(argv).length == 2) { 
  console.log(aboutThis + '\nExample line extracts \"version\" tag from \"package.json\":\n     ' + exampleCmd); return }
if (argv.file === undefined || argv.queryStr === undefined) { 
  console.log('input error. Example line:\n     ' + exampleCmd); return; }
// if ((argv.pkgVersion !== undefined) || (argv.name !== undefined))
const fs = require('fs');
var jsonData = JSON.parse(fs.readFileSync(argv.file));
var qryResult = jp.query(jsonData , argv.queryStr)
if (argv.showDebug)
    console.log('filename: \"' + argv.file + '\", \
    query string: \"' + argv.queryStr + '\",\n result: ' + qryResult)
else
    console.log(qryResult[0])
// SAVE without args library:
// if (args.length !== 4) {
//   console.log('use form \" node queryJSON_queryAsArg.js package.json \'$..version\'\"'); return; }
// const fs = require('fs');

// var filepath = args[2] // 'package.json'
// var queryStr = args[3]  // 'version'
// console.log('filepath ' + filepath + ' queryStr: ' + queryStr)

