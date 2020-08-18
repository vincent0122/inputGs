var Airtable = require('airtable');
var base = new Airtable({
  apiKey: 'keynCOHYwnnoQZDeB'
}).base('appmdFjy715yHPmNw');


base('dataBase').select({
  filterByFormula: "({거래처} = '정선철')"
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  records.forEach(function (record) {
    console.log('Retrieved', record.get['거래처']);
  });

  fetchNextPage();

}, function done(err) {
  if (err) {
    console.error(err);
    return;
  }
});

/* 
base('Test Space Request 2016').select({
  filterByFormula: "({Requester Name} = 'Mo Biegel')"
}).eachPage(function page(records, fetchNextPage) {
  records.forEach(function (record) {
    console.log('Retrieved ', record.get('Name space'));
    alert('Retrieved ', record.get('Name space'));
  });

  fetchNextPage();
}, function done(error) {
  console.log(error);
}); */