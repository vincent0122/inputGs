var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keynCOHYwnnoQZDeB'}).base('appmdFjy715yHPmNw');

base('dataBase').select({
    // Selecting the first 3 records in Grid view:
    filterByFormula: '{거래처}="한펠"'
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.



    records.forEach(function(record) {
      
      var k = record.get("Attachments");
      if (k != undefined){
      var kk = k.map(p => p.url);
        };
        console.log(record.get('날짜'), record.get('내용'),kk);
    });

    console.log(kk);

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});


