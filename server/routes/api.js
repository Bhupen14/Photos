const { Console } = require('console');
const express = require('express');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const fs = require('fs');
const { readdirSync } = require('fs');
const path = require('path');
// const send = require('send');
// const directory = 'c:/users/bhupen/desktop/nishi';
var directory = 'D:/';//Bhupen Samsung Camara/Camera';
// const fs = require('fs');


const router = express.Router();

router.get('/', (req, res) => {

    const getFileList = (dirName) => {
        let files = [];
        const items = readdirSync(dirName, { withFileTypes: true });
    
        for (const item of items) {
            if (item.isDirectory()) {
                 files = [...files, ...getFileList(`${dirName}/${item.name}`)];
            } else {
                files.push(`${dirName}/${item.name}`);
            }
            // console.log(files);
        }
    
        return files;
    };
    
    const files = getFileList('d:');
    
    // console.log(files);
    // console.log("test");
    // res.send('From Api Route');
    router.use(express.static(directory))
    res.status(200).send(files);
})

router.get('/myPic', (req, res) => {
    let myList = [];

    fs.readdirSync(directory).forEach(file => {
        // myList.push("http://localhost:3000/api/"+file);
        myList.push("http://192.168.20.138:3000/api/" + file);
        // console.log(file);
    });
    router.use(express.static(directory))
    res.status(200).send(myList);
})



router.get('/myData', (req, res) => {
    console.log("yes");
    directory = 'D:/';
    let fileData = [];
    let dirData = [];

    // use readdir method to read the files of the direcoty 
    fs.readdir(directory, (err, files) => {
        files.forEach(file => {
            // get the details of the file 
            let fileDetails = fs.lstatSync(path.resolve(directory, file));
            // check if the file is directory 
            if (fileDetails.isDirectory()) {
                dirData.push(file);
            //    console.log('Directory: ' + file);
            } else {
                // fileData.push("http://192.168.20.138:3000/api/"+file);
                fileData.push(file);
                // console.log(fileData);
            }
        });
        let source = { "file": fileData.sort(), "folder": dirData.sort(), "path": "http://192.168.1.32:3000/api/" }
        router.use(express.static(directory))
        res.status(200).send(source);//"f":fileData});

    });
})



router.post('/getMyPhotos', (res,req) =>
{
    console.log("testing..");
    console.log(res.body.Path);
})


router.get('/myData1', (req, res) => {

    directory = 'D:';
    let fileData = [];
    let dirData = [];

    fs.readdir(directory, (err, files) => {
        files.forEach(file => {
            let fileDetails = fs.lstatSync(path.resolve(directory, file));

            if (fileDetails.isDirectory()) {
                dirData.push(file);

                // dirData.push("http://192.168.1.32:3000/api/" + file);
            } else {
                fileData.push("http://192.168.1.32:3000/api/" + file);
            }
        })
        console.log(dirData);
        console.log(fileData);
        let source = { "file": fileData, "folder": dirData, "path": "http://192.168.1.32:3000/api/" }
        res.status(200).send(source);//"f":fileData});

    })
    //console.log(fileData);
    //res.status(200).send(fileData);

})




// var fs = require('fs');
// var path = require('path');

// function getFilesFromDir(dir, fileTypes) {
//   var filesToReturn = [];
//   function walkDir(currentPath) {
//     var files = fs.readdirSync(currentPath);
//     for (var i in files) {
//       var curFile = path.join(currentPath, files[i]);      
//       if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
//         filesToReturn.push(curFile.replace(dir, ''));
//       } else if (fs.statSync(curFile).isDirectory()) {
//        walkDir(curFile);
//       }
//     }
//   };
//   walkDir(dir);
//   return filesToReturn; 
// }

// //print the txt files in the current directory
// getFilesFromDir("./", [".txt"]).map(console.log);




















router.get('/test', (req, res) => {

    let fileData = [];
    let dirData = [];

    fs.readdir(directory, (err, files) => {
        files.forEach(file => {
            let fileDetails = fs.lstatSync(path.resolve(directory, file));
            //let fileData=[];
            //let dirData =[];
            if (fileDetails.isDirectory()) {
                //console.log('Directory: ' + file);
                //let fileData = directory + file;
                //console.log(fileData);
                //res.status(200).send({fileData})
                dirData.push(path.resolve(directory) + "/" + file);
            } else {
                //console.log('File: ' + file);
                // res.status(200).send({file})
                fileData.push(path.resolve(directory) + "/" + file);
            }
            //console.log(fileData);
            //res.status(200).send(fileData);
        })
        console.log(fileData);
        res.status(200).send(fileData);

    })
    //console.log(fileData);
    //res.status(200).send(fileData);
})


// // use readdir method to read the files of the direcoty 
// fs.readdir(directory, (err, files) => {
//   files.forEach(file => {
//     // get the details of the file 
//     let fileDetails = fs.lstatSync(path.resolve(directory, file));
//     // check if the file is directory 
//     if (fileDetails.isDirectory()) {
//       console.log('Directory: ' + file);
//     } else {
//       console.log('File: ' + file);
//     }
//   });
// });



// router.post('/login', (req, res) => {
//     res.set('Access-Control-Allow-Origin', '*');
//      fs.exists(usersDB, (exist, err) => {
//         if (exist) {
//             if (err) throw err
//             let userData = '';
//             let data = "";
//             var readerStream = fs.createReadStream(usersDB);
//             readerStream.setEncoding('UTF8');
//             readerStream.on('data', (chunk) => {
//                 data += chunk;
//             });

//             readerStream.on("end", () => {
//                 let userData = JSON.parse(data);
//                 let testdata = (userData["Users"]);

//                 let result = testdata.filter(function (item) {
//                     return item.team === req.body.team && item.password === req.body.password;
//                 });

//                 if (result.length > 0) {
//                     let payload = { subject: req.body.team }
//                     let token = jwt.sign(payload, "key"); 
//                     res.status(200).send({ token });
//                 }
//                 else {
//                     res.status(401).send({"err":"User Not Found"})
//                     console.log("Not exists");
//                 }
//             });
//         }
//     })
// })


module.exports = router

