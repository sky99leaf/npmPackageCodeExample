
this project uses the MIT license.  
***"Intended only as learning tool for the author (who is not experienced in this subject) to aid in learning the material here, with no other purpose."***

-------------
## How to use webpack and babel to develop React.js packages and produce a minified bundle.
### Overview:
These instructions show how to 
- combine javascript files including React.js source. 
- rewire imports and includes in files because separate files no longer exist. 
- "transpile" React.js source files (which contain jsx) into plain javascript files before combining into the bundle.  
- Note: *file **code/webpack.config_devServer.js** is extensively documented and supplements this file. It has notes on how to run webpack during development.*  

Two tools which exist in the npmjs world make this happen:  
- **webpack** combines javascript files. It also **resolve**'s imports and exports to account for the fact that separate files no longer exist.  
It also does **tree shaking** to eliminated unused code and other stuff like that.  
It also **minify**'s the file to make it compact. It also partially obfuscates the code.    
- **babel** is called by **webpack** when a jsx file is encountered, such as a React.js source.   
jsx cannot just be added to the bundle because it's not javascript, so **babel** converts it to plain javascript before its added.

**webpack and babel are npm packages**
- They are used here only as command line tools.
- They are not included or used by the package or bundle.js and have nothing to do with it.
- They are invoked on the command line or by a git-bash for windows script, in this demo.
- Typical call from command line or within a script:
  - for webpack:  ``node node_modules/webpack/bin/webpack build -c ./webpack.config_build.js``
    - file **webpack.config_build.js** sets what webpack does and to what files, folders and more.
  - for babel: file **webpack.config_build.js** specifies when and how webpack calls babel. It can be called direclty, but here webpack is doing the call.

### This example has 3 separate applications
- **libraryApp** is for coding a package and then bundling it to a bundle.js file.  
  - Folder **npmdist** is loaded with the js bundle, images, package.json and other assets for a package to be exported via npm.
  - Folder **scripts** has "build" script which calls webpack to build the bundle. 
  - Folder **code** is where modules get coded and tested. The package.json has named scripts to run webpack server in development mode. Its dependencies section doubles for the modules being coded and webpack and babel.
- **clientApp** is for testing the above package. It imports the package via npmjs or by direct local folder access.
- **imageShrinkUsingSharp** is a command line script to shrink jpeg or other image files for publishing.   
It uses the npmjs **sharp** package. See js file for how it's used. It does not go into the npm package.   
### Problems and Fixes  
- **Error: "more than one copy of React may be running"**
  - shows up on React client importing the package. Arises because package's package.json has React stuff in dependencies which conflicts with client's React dependencies.
  - **FIX IT** by using this for the package's package.json (this fix is already there):  
    ```
    "peerDependencies": {
          "qrcode": "^1.5.3",
          "react": "^18.2.0",
          "react-dom": "^18.2.0"
      }
    ```
    Also code is added to file **code/webpack.config_build.js**. See comments there.
  
- **Error still shows when** you import the package locally as ``npm install ../otherproject/dist`` and **still see the error**  
  - **Reason:** in the otherproject, a **node_modules** folder exists in dist folder or **any parent folder**.  
  - **Fix:** that is why node_modules is only in the code folder and scripts have ``NODE_PATH='../code/node_modules'``. This way npmdist has no access to node_modules.  
  

**Sequence of events**
- javascript package to be exported gets coded/developed/tested in **code**.
- scripts get run in **scripts** to:
  - call **webpack** to produce bundle.js and  put into **npmdist**
  - update version number in package.json
  - load **npmdist** with js bundle, images, database and other assets to be published. Copies static files from **copyToNpmdist**
  - call **npm publish** inside npmdist.
- File **webpack.config_devServer.js** is extensively documented and has notes on how to run webpack during development.  
- **Scripts to run:**  
    - ***The following scripts are for the author's use. They have not been extensively tested; inspect before running them*** 
    - **scripts/builddist** script runs webpack with parameters. It also updates the version number of the package and gives useful status messages. 
    - **scripts/publishToNpm** does not do much more than run **npm publish** but it does provide feedback of what was just done.    

**HUH?**
- Refer to **[So what is node\.js and npm packages?](#so-what-is-nodejs-and-npm-packages "explains why this project is here")**   for overview of node.js, its packages feature, and why this example exists. <!-- must leave ? out of the link -->    

--------------------------------
-----------------------------

## So what is nodejs and npm packages?
*[examples not tested recently!]*
Node is an application you install on your pc or others.
To get started, **install node**, copy ```console.log('this is a test')``` into file
**myJavascriptProgram.js** and run ```node myJavascriptProgram.js```

- It features **packages** (aka libraries) you can add to a project to do all sorts of advanced things, including HTTP servers
and frameworks like React.js and other things you dont want to code, especially if you're reading this. Packages are setup by **npm** which is the "node package manager".
### About npm (examples using git-bash shell for windows)
npm gets installed when you install node.js   
- To use packages you need an node project.   
- A minimal node project has a **package.json** file and **node_modules** folder.  
- You create a new npm project by going to an empty project folder and run ```npm init; npm install```. Choose default values at the prompts. It creates a **package.json** file. Edit that file to add 2 lines to the scripts section. Dont forget commas.:  
  ```
   "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "doughnut": "node index.js"
  },
  ```  
  Now edit **index.js** to code an example that shows the date and time : 
  ```
  var dt=new Date()
  console.log('today: ' + dt.toLocaleDateString('en-us') + ', sec: ' + dt.getSeconds())
  ```
  now run ```npm start``` or  ```npm run-script doughnut``` and index.js will run.
- So far npm has done nothing for you. Now code an app that needs it; copy/paste into **testJsonPath.js** The **require** (in React **import**) lines show packages it needs. 

  ```
  // This is file testJsonPath.js It shows how to use packages. 
  // Demonstrates use of jsonpath package to pick tags out of a JSON file.
  // Looks at package.json as an example JSON file because it's already there.
  // reads package.json, parses into JSON, uses jsonpath to get 'version' field from it.
  var jp = require('jsonpath');
  const fs = require('fs');
  var jsonData = JSON.parse(fs.readFileSync('package.json')); 
  jpQueryString='$..version'  // this is jsonpath's query language. It says "start at root '$', go any path '..' and look for 'version'
  console.log('version is: ' + jp.query(jsonData , jpQueryString))
  ```
  Now run ```node testJsonPath.js``` and it should **fail** because packages are missing.  
  Now run below command to install needed packages. 
  ```
  npm install jsonpath
  npm install yargs
  npm install fs
  ```
- above ``npm install`` commands modifiy **package.json** by adding to the **dependencies** section and downloads npm packages into **node_modules**.
- Now run ```node testJsonPath.js``` and it should run.  Try changing version field of package.json to see change.  
  Without use of packages there would have been a lot more complicated code.  
- Above has created a **node_modules** folder which takes of a lot of space. It is expendable and you can remove
it prior to backing up etc.   
If you run ```npm install``` it will get re-created exactly, so you can run node again.  
``npm install`` looks at the **dependencies** section of **package.json** and downloads what's needed to node_modules  
- **why does node_modules take up so much space?** When you 
install a package, it installs other packages as dependencies as listed in its own package.json. And those other packages
have their own dependencies, and on and on.
  - you can view installed packages under node_modules. For each look at its package.json to see its dependencies, which get automatically installed when it does.
 
## Other npm commands ie: login
utility functions relating to login to npmjs and user id:  
reference: 
https://docs.npmjs.com/accessing-npm-using-2fa  
npm login  
npm whoami  

## Editing markdown/Visual studio code notes
Everything was written in Visual Studio Code because it allows simple adjustment of font sizes for editors etc. 

This readme.md file is written in "markdown".  Kind of like HTML but different. Github interprets .md files to produce what you see now.  

In Visual Studio Code, to edit readme.md so that code is on the bottom and preview is on the top:  
 - open .md file in edior, then click on the preview button at upper right. In the preview tab, right-click->split down. Then drag the source tab into the lower pane of the preview window. 
