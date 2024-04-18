

// WEBPACK.CONFIG HAS SEVERAL VERSIONS, CONFIGURED BY (UN)COMMENTING VARIOUS LINES. OTHERWISE IDENTICAL.
// NOT ME >>>  file webpack.config_build.js. This version for creating bundle.js for export
// ME >>> webpack.config_devServer.js. This version for running webpack server for development, and for local import of package "npm install ../libproject/npmdist", or run by click on index.html

// Function: pack all js files into a single minified .js file.

// COMMAND LINE EXAMPLES FOR ALL VERSIONS OF THIS FILE
// *** RUN THESE FROM THE "CODE" FOLDER ! ******
// // directs webpack to serve the application for development, with auto build when source is modified:
// ME >>  node node_modules/webpack/bin/webpack serve -c ./webpack.config_devServer.js  
// // directs webpack to BUILD a 'bundle_localdev.js'. Run by click on index.html in
// // dist-webpack folder. NO AUTO-COMPILE, so run every time an edit is done.
// ME >>  node node_modules/webpack/bin/webpack build -c ./webpack.config_devServer.js
// // directs webpack to build the bundle.js (or other name) file out of many source files
// // for publishing/export. Typically called from scripts/builddist. Omits React.js libraries
// // to prevent conflict with client copies.
// NOT ME >> node node_modules/webpack/bin/webpack build -c ./webpack.config_build.js  

// ref: "https://webpack.js.org/configuration/module" used this to try do decipher whats going on here.
const path = require('path');

module.exports = 
{
  // entry means "start dependency graph at this file"
  // starting at value of "entry", builds dependency graph of the .js/.jsx files. Includes all files into
  // bundle. Cascades from one file's import() to what it imports and so on and on.
  entry: './src/WebpackDependencyGraphEntryPoint.js',
  optimization: {
    // NOT ME >>    minimize: true // human readable if minimize if false
    minimize: false
  },
  mode: 'development',  // development or production
  // resolve is a fancy way of saying "look here for files to build graph". Extensions says use .js .jsx 
  resolve: { 
    extensions: ['.js', '.jsx']
  },
  // setup where to put minified output file "the bundle", and any assets like jpegs. 
  output: {
    path: path.resolve(__dirname, '../dist-webpack'), // this just means put file into folder ../dist-webpack
    // NOT ME filename: 'bundle.js', // name of combined file, the "bundle"
    filename: 'bundle_localdev.js',
    // https://webpack.js.org/configuration/output/#outputlibrarytype
    // library type 'window' will not create a bundle file. It's for running as a server, or clicking on index.html.
    // I think it means "make library available via the DOM window object"
    library: { name: 'MyLibrary' , type: 'window' } 
    // type: 'commonjs2' works on client but not local serve or clicking on index.html
    // NOT ME >>  library: { type: 'commonjs2' } 
  },
  // *********************************************************************************************************
  // *** "EXTERNALS" FIXES ERROR ON CLIENT: WHEN REACT CONTROL IMPORTED FROM BUNDLE CALLS useEffect(), GET ***
  // ***  ERROR  MESSAGE ABOUT DUPLICATE COPIES OF REACT. BELOW ENTRY SAYS DONT BUNDLE REACT, JUST USE     ***
  // ***  CLIENT'S COPY OF REACT FOR THE GIVEN LIBRARY/TYPE ENTRIES.                                       ***
  // *** [OK for npmjs publish but not local bundle or wedpack development server]                                                       ***
  // *** https://webpack.js.org/configuration/externals/                                                   ***
  // *** "The externals configuration option provides a way of excluding dependencies from the output      ***
  // *** bundles. Instead, the created bundle relies on that dependency to be present in the consumer's    ***
  // *** (any end-user application) environment. ..."                                                      ***
  // *********************************************************************************************************
  // // NOT ME >>    
  // externals: {        
  //   react: {          
  //       commonjs: 'react',          
  //       commonjs2: 'react',          
  //       amd: 'React',          
  //       root: 'React',      
  //   },      
  //   'react-dom': {          
  //       commonjs: 'react-dom',          
  //       commonjs2: 'react-dom',          
  //       amd: 'ReactDOM',          
  //       root: 'ReactDOM',      
  //   },  
  // },

  // modules appears to be chunks of processing to do. 
  // In this case, there's 1 module which calls babel to convert jsx in React source to plain js
  module: {
    rules: [  // here's the first rule in the array of rules
      { // START of the babel rule
        test: /\.(js|jsx)$/,   // feed files *.js and *.js to babel. ref:https://webpack.js.org/configuration/module/#ruletest
        // not needed... include: [  path.resolve(__dirname, "src/zzz"), path.resolve(__dirname, "src/abc") ],
        exclude: /node_modules/, // dont send these hundreds of files to babel! Client will download these itself upon "npm i"
        use: {  // ref: https://webpack.js.org/configuration/module/#ruleuse
          loader: 'babel-loader', // node_modules/babel-loader/lib runs something here ...?
          // NOTE: options can be left out but you need a .babelrc with same presets.
          //       If you leave out both things, get fail without a description of whats wrong
          options: { "presets": ["@babel/preset-env", "@babel/preset-react"] }
        }, 
      }, // END of babel rule

      {  // this rule includes .css files
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
        ]
      }

    ]
  },
  // devServer does not apply to build
  // webpack includes a server. Run it with: "node node_modules/webpack/bin/webpack serve"
  // https://webpack.js.org/configuration/dev-server/#devserverclient
  devServer: {
    static: path.join(__dirname, '../dist-webpack'),
    compress: true,
    port: 3000, 
    open: false, //true, // Tells dev-server to open the browser
    client: {
      overlay: {
        errors: true,
        // if warnings true, page in browser starts with a warning popup, its just warnings but looks like a crash!
        warnings: false, 
        runtimeErrors: true,
      },
    },
  }
};

