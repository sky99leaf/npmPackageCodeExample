## this folder and any of its ancestors  
## must not contain **node_modules**  
If so, any client doing a **local** npm package import  
will fail with a message on browser console about duplicate copies of React being present.

## folders:  
- npmdist is what gets published for locally imported
- code is code for libary 
- scripts for build and publish of what's in code