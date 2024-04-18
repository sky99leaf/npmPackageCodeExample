

This project created using ``npx create-react-app my-app``

### How to switch between local filesystem npm package and npmjs package (git-bash for windows)
```
## **** install npm from npmjs ****
# remove old
# npm rm jjjunk-test
# npm i jjjunk-test 

## **** install npm from local folder ****
# remove old
# npm rm jjjunk-test
# npm i '../libraryApp/npmdist'

## **** to update to new published version. ****
# if local filesystem, do nothing otherwise if npmjs:
# npm i jjjunk-test 
# npm update jjjunk-test    # ????

## **** to verify proper version. ****
# grep jjj package.json 

# also use this script
# ./addLocalNpmPkgFromOtherProject 

echo '###########################################################'
echo '### WARNING: IF NODE_MODULES EXIST IN ANY ANCESTOR OF   ###'
echo '### NPMDIST FOLDER, RUNNING "NPM START" WILL MAKE ERROR ###'
echo '### MESSAGE ON CONSOLE ABOUT DUPLICATE REACT INSTALLS!  ###'
echo '###########################################################'
```