import fs from 'fs';
import path from 'path';

export default (status, cb) => {
    let reqPath = path.join(__dirname, `../error/${status}.json`);
    fs.readFile(reqPath , 'utf8', function (err, data) {
        //Handle Error
       if(!err) {
         //Handle Success
         // Parse Data to JSON OR
          var jsonObj = JSON.parse(data)
         //Send back as Response
          cb(null, jsonObj);
        }else {
           //Handle Error
           cb(404)
        }
   });
};
