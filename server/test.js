var request = require('request');
var fs = require('fs');
var formdata = require('form-data');
file= fs.createReadStream('./uploads/aee11220-717c-11e9-9ace-cf2c6d404934.mkv');
var data = '';
var dataform=new formdata();
dataform.append('test',fs.createReadStream('./uploads/aee11220-717c-11e9-9ace-cf2c6d404934.mkv'),'aee11220-717c-11e9-9ace-cf2c6d404934.mkv')
//file.setEncoding('UTF8');
var req = request.post('http://127.0.0.1/test', function (err, resp, body) {
  if (err) {
    console.log('Error!');
  } else {
    console.log('URL: ' + body);
  }
});
req.setHeader('jobid',1);
req.setHeader('sessionid',2);
var form = req.form();
form.append('File', fs.createReadStream('./uploads/aee11220-717c-11e9-9ace-cf2c6d404934.mkv'), {
  filename: 'aee11220-717c-11e9-9ace-cf2c6d404934.mkv',
  
  //contentType: 'text/plain'
});

