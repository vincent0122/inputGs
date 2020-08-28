// setTimeout을 await async로 바꿔야 함 
// 월별 실적 조회. 이건 구글시트를 연동해야 되는데

const express = require("express");
const asyncify = require("express-asyncify");
const serverless = require("serverless-http");
require('dotenv').config();

const app = express();
const apiRouter = asyncify(express.Router());

const logger = require("morgan");
const bodyParser = require("body-parser");

const Airtable = require("airtable");
const base = new Airtable({apiKey: process.env.API_KEY}).base('appmdFjy715yHPmNw');
const getName = require('./getName.js')

//미들웨어 함수를 로드하려면 미들웨어 함수를 지정하여 app.use()를 호출하십시오
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
    sort_arr: function () {
      arr.sort();
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
      ids =  _ids;   //왜 var로 선언을 하지 않지?
  },
};
}


const getRecordId = setArray2([]);
const {
  google
} = require('googleapis');

const creden = {
  "installed": {
      "client_id": process.env.CLIENT_ID,
      "project_id": process.env.PROJECT_ID,
      "auth_uri": process.env.AUTH_URI,
      "token_uri": process.env.TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
      "client_secret": process.env.CLIENT_SECRET,
      "redirect_uris": process.env.REDIRECT_URIS
  }
};

const toke = {
"access_token": process.env.ACCESS_TOKEN,
"refresh_token": process.env.REFRESH_TOKEN,
"scope": "https://www.googleapis.com/auth/spreadsheets",
"token_type": "Bearer",
"expiry_date": 1598260908685
};

function authorize(credentials, param2, callback) {
  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  
    oAuth2Client.setCredentials(toke);
    callback(oAuth2Client, param2);
}

function inputCost(auth, _inputData) {
  const sheets = google.sheets({
    version: 'v4',
    auth
  });
  const mySpreadSheetId = '1SXZ9o5ca3B-bsUozboQrFOht8z_oqsX9U_bQTMl9ytQ';
  const sheetName = 'kakaoInput';

  sheets.spreadsheets.values.get({
    spreadsheetId: mySpreadSheetId,
    range: `${sheetName}!A:A`,
  }, (err, res) => {
    if (err)
      return console.log('The API returned an error: ' + err);
    const data = res.data.values;
    let i = data.length;
    console.log(i);

    sheets.spreadsheets.values.update({
      spreadsheetId: mySpreadSheetId,
      range: `${sheetName}!A${i + 1}`,
      valueInputOption: "USER_ENTERED",
      resource: {
        majorDimension: "ROWS",
        values: [
          //[date, wri, amount, content]
          _inputData          
        ]
      }
    }, (err, result) => {
      if (err) {
        // Handle error
        console.log(err);
      }
      else {
        console.log('%d cells updated.', result.updatedCells);
      }
    });


  });
};

//클로저 함수 끝(for get record Id)
apiRouter.post("/gs_cost_input", (req, res) => {
  var amount = JSON.stringify(req.body.action.detailParams.amount.value);
  var amount = amount.replace(/\"/g, "");
  var content = req.body.action.detailParams.naeyong.origin;
  var writer = JSON.stringify(req.body.userRequest.user.id);
  var wri = writer.replace(/\"/g, "");
  var wri = getName(wri);
  var wri = wri[0].name
  const inputData = [date, wri, amount, content];

  
    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            "simpleText": {
              "text": "입력 완료되엇습니다!"
            }
          }
        ]
      }
    };

    setTimeout(function(){
    authorize(creden, inputData, inputCost);
  },2000)

    setTimeout(function(){
    res.status(200).send(responseBody);
    },500);
});

apiRouter.post("/air_content_input", (req, res) => {

  item.ini_arr();
  var buyer = JSON.stringify(req.body.action.detailParams.customer.value); 
  var buyer = buyer.replace(/\"/g, "");
  
  //var info = JSON.stringify(req.body);
  var content =  req.body.action.detailParams.contents.origin;  
  var writer = JSON.stringify(req.body.userRequest.user.id);
  var wri =  writer.replace(/\"/g, "");
  var wri =  getName(wri);
  var wri =  wri[0].name

   base("dataBase").create({
    날짜: date,
    거래처: buyer,
    작성자: wri,
    내용: content 
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
            "title": "AIRTABLE 사진추가 하실래요?        한장씩만 가능!!",
            "description" : "거래처 :" + buyer,
            "thumbnail": {
              "imageUrl": "https://ifh.cc/g/Bo8Ecb.jpg"
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

  
  res.status(200).send(responseBody);  //이게 일찍 끝나서 문제..
},500);
});

apiRouter.post("/air_pic_input", (req, res) => {


  var x = JSON.stringify(req.body);
  var block_Id = getRecordId.get_id();
  //var block_Id = block_Id[0];
  
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

   base('dataBase').update(block_Id, {
    
    "Attachments": picList
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.get('Name'));
  }); // 이렇게 크면. req가 실행되니까 끝나버림
    
  setTimeout(function(){
    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            "basicCard": {
              "title": "AIRTABLE 사진추가 하실래요?        한장씩만 가능!!",
              "thumbnail": {
                "imageUrl": "https://ifh.cc/g/Bo8Ecb.jpg"
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
  
 },500); 
});

apiRouter.post("/list_record", (req, res) => {
  
  var buyer = JSON.stringify(req.body.action.detailParams.customer.value); 
  var buyer = buyer.replace(/\"/g, "");
  listRecord = new Array;
  
  setTimeout(function(){
    base('dataBase').select({
      
      filterByFormula: '{거래처}="' + buyer + "\""
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        
        var aa = record.get("날짜");
        var bb = record.get("내용");
        var cc = record.get("Attachments");
        if (cc != undefined){
        var cc = cc.map(p => p.url);  
        var cc = cc.join(" ");
          }
        else if(cc === undefined){
          var cc = "";
        }
        //item.set_arr(record.get('날짜') +"  " + record.get('내용') + "  " + kk);
        item.set_arr(aa + " " + bb + "  " + cc);
       
      //console.log(result);
      });

      item.sort_arr();
      var result = item.get_arr();
      result3 = result.join(" /////////////////////////////////////////////////////////////////////// ");

        fetchNextPage();
  
  }, function done(err) {
      if (err) { console.error(err); return; }
  });   
},500);  
 
  setTimeout(function(){
    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
            {
                "simpleText": {
                    "text": result3  
                   // "text": "123"
                }
            }
        ]
    }
  }
        
  res.status(200).send(responseBody);
  item.ini_arr();
},1000); 
});

apiRouter.post("/checkId", (req, res) => {

   var x = JSON.stringify(req.body);

   const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: x,  
          }
        }        
       ]
      },
    }
  
  res.status(200).send(responseBody);
});

module.exports.handler = serverless(app);
