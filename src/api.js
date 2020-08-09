//TODO: Hide API KEYS.
//

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
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(); //

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


apiRouter.post("/air_content_input", async (req, res) => {
  
  var content = JSON.stringify(req.body.action.detailParams.type01_q01s01.origin); 
  var writer = JSON.stringify(req.body.userRequest.user.id); 
  var info = JSON.stringify(req.body);

  try {
    var pic = JSON.stringify(req.body.action.detailParams.pic.origin);
  } catch (e) {
    var pic = "";
  } finally {
    var pu2 = ['""', '""', '""', '""', '""', '""', '""', '""'];
    var pic2 = pic.replace(/\"/g, "");
    var pic3 = pic2.substring(5, pic2.length - 1);
    var pu = pic3.split(",");

    for (i = 0; i < pu.length; i++) {
      pu2[i] = pu[i];
    }
  }

  var contents = content.replace(/\"/g, "");
  var wri = writer.replace(/\"/g, "");
  var wri = getName(wri);
  var wri = wri[0].name

   await base("총무,수출입").create({
    Attachments: [
      { url: pu2[0] },
      { url: pu2[1] },
      { url: pu2[2] },
      { url: pu2[3] },
      { url: pu2[4] },
    ],
    날짜: date,
    작성자: wri,
    내용: contents,
  });

  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "입력되었습니닷!",
            text: info
          },
        },
      ],
    },
  };

  res.status(200).send(responseBody);
});

apiRouter.post("/air_pic_input", (req, res) => {
  var pic = JSON.stringify(req.body.action.detailParams.file.origin);
  item.set_arr(pic);
  var pic2 = item.get_arr();
  var pic2 = pic2.join(",");

  const responseBody = {
    version: "2.0",
    data: {
      msg: "HI",
      name: "Ryan",
      position: "Senior Managing Director",
    },
    template: {
      outputs: [
        {
          basicCard: {
            title: "AIRTABLE",
            description: "DO AIRTABLE",
            thumbnail: {
              imageUrl:
                "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg",
            },
            profile: {
              imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4BJ9LU4Ikr_EvZLmijfcjzQKMRCJ2bO3A8SVKNuQ78zu2KOqM",
              nickname: "보물상자",
            },
            social: {
              like: 1238,
              comment: 8,
              share: 780,
            },
            buttons: [
              {
                action: "block",
                label: "내용입력하기",
                blockId: "5f1928d4285a140001494e12",
              },
            ],
          },
        },
      ],
    },
  };
  //
  res.status(200).send(responseBody);
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
