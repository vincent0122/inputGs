var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keynCOHYwnnoQZDeB'}).base('appmdFjy715yHPmNw');
var content = "5월분 정산\n두번째\n세번째\n";
var contents = content.replace(/\"/g, "");
console.log(contents);

base('dataBase').create({
  "날짜": "2020-05-26",
  "Attachments": [
    {
      "url": "https://dl.airtable.com/.attachments/c152b888eef0328f7b69484961e3c415/2e16c9bb/KakaoTalk_20200527_084727449.png"
    }
  ],
  "작성자": "정소영",
  "내용": contents,
  "거래처2": [
    "recX6t7vRBxTfudq9"
  ],
  "거래처": "정선철"
}, function(err, record) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(record.getId());
});