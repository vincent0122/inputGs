// TODO: Hide API KEYS.
// airtable 에서 record.getId를 살려야 함 Done
// setTimeout을 await async로 바꿔야 함
// pic_input을 update 명령어로 id는 딸 수 있으니까
// 메뉴에 form으로 입력하는 방법 추가

const express = require("express");
const asyncify = require("express-asyncify");
const serverless = require("serverless-http");

const app = asyncify(express());
const apiRouter = express.Router();

const logger = require("morgan");
const bodyParser = require("body-parser");

const Airtable = require("airtable");
const base = new Airtable({apiKey: 'keynCOHYwnnoQZDeB'}).base('apptSTO7G7lbYD7gu');
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

//클로저 함수 시작(for get record Id)
function setArray2(ids) {
  return {
    get_id : function () {
      return ids;
    },
    set_id : function (_ids) {
      ids.push( _ids)   //왜 var로 선언을 하지 않지?
  },
   pass_id : function(){
     var elvis = getRecordId.get_id();
     return elvis
   }
};
}

if (getRecordId.get_id().length <1){
const getRecordId = setArray2([]);
};

//클로저 함수 끝(for get record Id)


apiRouter.post("/air_content_input", (req, res) => {
  
  var buyer = JSON.stringify(req.body.action.detailParams.customer.origin); 
  var buyer = buyer.replace(/\"/g, "");
  
  var content = JSON.stringify(req.body.action.detailParams.contents.origin);  
  var contents = content.replace(/\"/g, "");

  var writer = JSON.stringify(req.body.userRequest.user.id);
  var wri = writer.replace(/\"/g, "");
  var wri = getName(wri);
  var wri = wri[0].name

  base("testing").create({
    날짜: date,
    거래처2: buyer,
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
      console.log(getRecordId.get_id());
      
  });
  
  setTimeout(function(){
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "입력완료(사진첨부를 원하면 '사진첨부'를 클릭하세요~)",
            //text: kk[0]
          },
        },
      ],
    },
  };

  
  res.status(200).send(responseBody);
  },1000);
  
});

apiRouter.post("/air_pic_input", (req, res) => {


  var k = getRecordId.get_id();
  var k2 = k[0];
 
  setTimeout(function(){
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: k2,
          },
        },
      ],
    },
  };
  
  res.status(200).send(responseBody);
},1000);
});

apiRouter.post("/checkId", function (req, res) {
  console.log(req.body);
  var x = JSON.stringify(req.body);

  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: x,
          },
        },
      ],
    },
  };

  res.status(200).send(responseBody);
});

module.exports.handler = serverless(app);
