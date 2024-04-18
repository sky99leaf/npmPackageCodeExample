
### bundle.js is put in this folder by webpack   
according to entry in  **webpack.config.js**   
module.exports/output/path entry  
and is served by webpack's server specified in file as  
/devServer  
This server uses index.html in this folder as a starting point.
**index.html in this folder**  is only for running on webpack's devserver. It can also be  
run directly from file manager without a server.  
### this index.html has a different coding because of this
- it has a script tag which directly calls a function in bundle.js, using 2 tags.
- **webpack.config.js**  /module.exports/output/library entry  
```library: { name: 'MyLibrary' , type: 'window' }``` 
makes MyLibrary accessable to a script in HTML via the DOM window object  
- the call is: window.MyLibrary.index3();
