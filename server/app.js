import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import ejs from 'ejs'
import {sessionhost} from '../client/src/config'
import {answerhost} from '../client/src/config'
import {jobhost} from '../client/src/config'
import {uploadhost} from '../client/src/config'
import {checkhost} from '../client/src/config'
import {questionhost} from '../client/src/config'


import fetch from 'fetch'
var request = require('request');
var FormData = require('form-data');
const http = require('http');
const https = require('https');
var fs = require('fs');
var uuidv1 = require('uuid/v1');
const multer = require('multer');
var privateKey  = fs.readFileSync('private.key', 'utf8');
var certificate = fs.readFileSync('certificate.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var list_item=[];

let app = express();
const port = 3000;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads');  // 儲存的路徑，備註：需要自己建立
    },
    filename: function (req, file, cb) {
    // 將儲存檔名設定
    cb(null, uuidv1() + '.mkv'); 
    }
    }); 
  
var upload = multer({ storage: storage })
var id;
var len_q;
var count=0;
// view setup
app.set('views', path.join(__dirname, '../client/dist'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(logger('dev')); //命令行里面显示请求
app.use(bodyParser.json()); //解析json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); //解析cookie
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get("/", (req, res) => {
    res.render("index")
})
app.get('/audiovideo', (req, res) => {
    return res.sendFile(path.join(__dirname+'/templates/index.html'));
  });

app.get('/testrecord', (req, res) => {
    return res.sendFile(path.join(__dirname+'/templates/test_record.html'));
    });

app.get('/background', (req, res) => {
    return res.sendFile(path.join(__dirname+'/templates/background_record.html'));
}); 
app.get('/end', (req, res) => {
    return res.sendFile(path.join(__dirname+'/templates/end.html'));
}); 
var data;
app.post('/audiovideo', upload.single('audiovideo'), (req, res) => {
    var file = req.file;
    var interviewid = req.headers['interviewid']
    var itemid = req.headers['itemid']
    
    console.log(file);
    console.log(interviewid)
    console.log(itemid)
    console.log('檔案名稱：%s', file.filename);
    console.log('檔案大小：%s', file.size);
    console.log('檔案路徑：%s', file.path);
    data = {"InterviewID":interviewid};
    var json = JSON.stringify(data);
    var Sessionid=[];
    request.post({
        url:sessionhost,
        headers:{'Content-Type': 'application/json'},
        body:json,
      }, function callback(error,response,body) {
        console.log(JSON.parse(body));
        //console.log(JSON.parse(body)['SessionID'])
        Sessionid.push(JSON.parse(body)['SessionID']);
        console.log(Sessionid);
        data={'SessionID':Sessionid,"ItemID":itemid}
    json = JSON.stringify(data);
    console.log(json);
    var status=[];
    request.post({
        url:answerhost,
        headers:{'Content-Type': 'application/json'},
        body:json,
      }, function callback(error,response,body) {
        console.log(JSON.parse(body));
        status.push(JSON.parse(body)['Status'])
        console.log(status)
    });
    var jobid=[];
    new Promise((resolve) => {
        
        request.post({
            url:jobhost,
            headers:{'Content-Type': 'application/json'},
            
        }, function callback(error,response,body) {
            console.log(JSON.parse(body));
            jobid.push(JSON.parse(body)['JobID']);
            console.log(jobid);
            resolve(data ={"SessionID":Sessionid , "JobID":jobid , "DataSize":file.size});
            json=JSON.stringify(data);
            console.log(json);
            fs.rename(('./uploads/'+file.filename),('./uploads/'+(Sessionid+'.mkv')), function (err) {
                if (err) throw err;
                new Promise((resolve) => {
                    
                    var req = request.post(uploadhost, function (err, resp, body) {
                        if (err) {
                            console.log('Error!');
                        } else {
                            console.log(body);
                            data ={"JobID":jobid}
                            json=JSON.stringify(data);
                            new Promise((resolve) => {
                                request.post({
                                    url:checkhost,
                                    headers:{'Content-Type': 'application/json'},
                                    body:json
                                }, function callback(error,response,body) {
                                    console.log(body);
                                    count+=1;
                                    console.log(count)
                                    });
                                    
                                }).catch(err => {
                                    console.log("error: " + err)
                                })
                        }
                        });
                        req.setHeader('jobid',jobid);
                        req.setHeader('sessionid',Sessionid);
                        req.setHeader('datasize',file.size);
                        var form = req.form();
                        form.append('File', fs.createReadStream(('./uploads/'+Sessionid+'.mkv')), {
                        filename: Sessionid+'.mkv',
                        //contentType: 'text/plain'
                        });
                        
                        
                    }).catch(err => {
                        console.log("error: " + err)
                    })
              });
            
            
                
            
            
        });
    }).catch(err => {
        console.log("error: " + err)
    });
        
    });
    
    
        
    return res.json({ message: "File Upload Sucess" });
});

app.post('/test', upload.single('File'), (req, res) => {
    var file = req.file;
    var header = req.headers.jobid;
    console.log(file);
    console.log(header);
    return res.json({ message: "File Upload Sucess" });
});

app.post('/request_question', (req, res) => {
    
    id = req.body.InterviewID;
    var data = {"InterviewID":id};
    var json = JSON.stringify(data);
    console.log(id);
    request.post({
        url:questionhost,
        headers:{'Content-Type': 'application/json'},
        body:json,
      }, function callback(error,response,body) {
        console.log(JSON.parse(body));
        //len_q = body['QuestionList'].length;
        
      for (var i=0;i<10;i++)
        {
            list_item.push(JSON.parse(body)['QuestionList'][i]['ItemID']);
        }
        console.log(list_item);
        return res.send(body);  
      });
    
    
});


app.post('/checkid', (req, res) => {
    
    id = req.body.InterviewID;
    var data = {"InterviewID":id};
    var json = JSON.stringify(data);
    console.log(id);
    request.post({
        url:questionhost,
        headers:{'Content-Type': 'application/json'},
        body:json,
      }, function callback(error,response,body) {
        console.log(JSON.parse(body));
        
        return res.send(body);  
      });
    
    
});

function post_to_api(){
    var data = {"InterviewID":30};
    var json = JSON.stringify(data);
    request.post({
        url:questionhost,
        headers:{'Content-Type': 'application/json'},
        body:json,
      }, function callback(error,response,body) {
        console.log(JSON.parse(body));
        //console.log(error);
        //list.append(body);
      }); 

    //console.log(list);
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

//httpServer.listen(80, () => {
	//console.log('HTTP Server running on port 80');
//});

httpsServer.listen(8001,'0.0.0.0', () => {
    console.log('HTTPS Server running on port 8001');
    
    //post_to_api();
});

//app.listen(port, () => {
//    console.log("server is running on port 3000");
//});