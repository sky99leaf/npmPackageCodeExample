#!/usr/bin/env node

// without above, notepad pops up with this file
// trying to figure out how to make single command line run a package..
// reference: https://github.com/facebook/create-react-app/blob/main/packages/create-react-app/index.js
// on windows when run from npx, this package gets put into:
// C:\Users\zzzzzz\AppData\Local\npm-cache\_npx\random-numbers-here\node_modules\jjjunk-test

var QRCode = require('qrcode')
QRCode.toString('Cheeseburger with fries',{type:'utf8'}, function (err, url) {
  console.log(url)
})

console.log("JJJ demo for running \"npx thispackageName\". \nThis file is sayHello.js")
console.log("also run as \"npx ./<local path to package on filesystem> \
\nwhen run from npmjs, downloads package into local cache at: \
\n'C:\\Users\\zzzzzz\\AppData\\Local\\npm-cache\\_npx\\random-numbers-here\\node_modules\\jjjunk-test'")
console.log("for this to work, put this into package.json: \"bin\": \"sayHello.js\",")
