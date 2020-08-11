// TODO: Hide API KEYS.
// setTimeout을 await async로 바꿔야 함
// 메뉴에 form으로 입력하는 방법 추가
// 카카오톡 사진 파일 자동 크기 줄이기
// 동의어를 입력해도 입력한값이 그대로 들어가네?

const express = require("express");
const asyncify = require("express-asyncify");
const serverless = require("serverless-http");

const app = asyncify(express());
const apiRouter = express.Router();

const logger = require("morgan");
const bodyParser = require("body-parser");

const Airtable = require("airtable");
//const base = new Airtable({apiKey: 'keynCOHYwnnoQZDeB'}).base('appmdFjy715yHPmNw');
const base = new Airtable({apiKey: process.env.API_KEY}).base('appmdFjy715yHPmNw');
const getName = require('./getName.js')

app.use(logger("dev", {}));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/.netlify/functions/api", apiRouter);
var today = new Date();
var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(); 

//클로저 함수 시작
function setArray(arr) {
  return {
    get_arr: function () {
      return arr;
    },
    set_arr: function (_url) {
      arr.push(_url);
    },
    ini_arr: function () {
      arr = [];
    },
  };
}

const item = setArray([]);
//클로저 함수 끝

//클로저 함수 시작(for get record Id) **변수로 바꿔야 함**
function setArray2(ids) {
  return {
    get_id : function () {
      return ids;
    },
    set_id : function (_ids) {
      ids.push( _ids)   //왜 var로 선언을 하지 않지?
  },
   ini_id : function(){
     ids = [];
   }
};
}


const getRecordId = setArray2([]);

//클로저 함수 끝(for get record Id)


apiRouter.post("/air_content_input", (req, res) => {
  
  var buyer = JSON.stringify(req.body.action.detailParams.customer.value); 
  var buyer = buyer.replace(/\"/g, "");
  
  //var info = JSON.stringify(req.body);
  var content = JSON.stringify(req.body.action.detailParams.contents.origin);  
  var contents = content.replace(/\"/g, "");

  var writer = JSON.stringify(req.body.userRequest.user.id);
  var wri = writer.replace(/\"/g, "");
  var wri = getName(wri);
  var wri = wri[0].name

  base("dataBase").create({
    날짜: date,
    거래처: buyer,
    작성자: wri,
    내용: contents
    
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
      console.log(record.getId()); 
      var record_id = record.getId();
      getRecordId.set_id(record_id);
      
  });
  
  setTimeout(function(){
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          "basicCard": {
            "title": "AIRTABLE 사진추가 하실래요?",
            //"description": "사진을 추가하시겠습니까?(사진만 가능해요)",
            "thumbnail": {
              "imageUrl": "https://ifh.cc/g/hltQMO.jpg"
            },
            "buttons": [
              {
                "action": "block",
                "label": "추가하기",
                "blockId": "5f2f475ef8e71a0001de609b"
              },
              {
                "action":  "message",
                "label": "종료하기",
                "messageText": "종료"
              }
            ]
          }
        },
      ],
    },
  };

  
  res.status(200).send(responseBody);
  },1000);
  
});

apiRouter.post("/air_pic_input", (req, res) => {

  var x = JSON.stringify(req.body);
  var block_Id = getRecordId.get_id();
  var block_Id = block_Id[0];
  
   var pic = JSON.stringify(req.body.action.detailParams.pic.origin);
   var pic = pic.replace(/\"/g, "");
   var picList = new Array();
   item.set_arr(pic);
   var pic2 = item.get_arr();

   for(var i=0; i<pic2.length; i++){
      var data = new Object();
      data.url = pic2[i];
      picList.push(data);
   }; 

   setTimeout(function(){
   base('dataBase').update(block_Id, {
    
    "Attachments": picList
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.get('Name'));
  });
},500); // 이렇게 크면. req가 실행되니까 끝나버림
    
  setTimeout(function(){
    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            "basicCard": {
              "title": "AIRTABLE 사진추가 하실래요?",
              "thumbnail": {
                "imageUrl": "https://ifh.cc/g/hltQMO.jpg"
              },
              "buttons": [
                {
                  "action": "block",
                  "label": "추가하기",
                  "blockId": "5f2f475ef8e71a0001de609b"
                },
                {
                  "action":  "message",
                  "label": "종료하기",
                  "messageText": "종료"
                }
              ]
            }
          },
        ],
      },
    };
  
  res.status(200).send(responseBody);
  
 },1000); 
});

module.exports.handler = serverless(app);
