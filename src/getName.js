const getName = (wri) => data.filter(el=> el.wri === wri ) //getName[0].name 으로 호출

//user Id changed too after changing bot
const data = [
  {
    "wri": "2c8017c334109ed356f928ecf6ba3ef80683e3634ca15ee80f7fb14c44765c4343", //done
    "name": "임진석"
  },
  {
    "wri": "4ff94bc6b14bce6beb138d113e42ba264f9b0af9b6d2e682c3abfea680c3114b28", //done
    "name": "임진강"
  },
  {
    "wri": "44ad8cc1cfa54644ca2b31d066884fe56e6e7f62e874f88d3d2b9031f286a7404b",
    "name": "나준호"
  },
  {
    "wri": "1cc6ab841b354b4356a798c1dac039642370559fa1bf9e1fc5bdb6fb5a426f8e30", //done 
    "name": "정소영"
  },
  {
    "wri": "7a5c2c1e9bdae217c7bcbc5b084b078326755f8480d80f794fee2631732514e1c0", //done
    "name": "송혜주"
  },
  {
    "wri": "66403b9819685f49eb67931a9d6ac55cde1cd5107fc47c33ee04d3b2ae710348b5",
    "name": "이선화"
  },
  {
    "wri": "13dff337ecad89e0063f29112db84f96b6aac66c710e60f0dd5ad65d9dd36f125b", //done
    "name": "추승혜"
  },
  {
    "wri": "37a3115a6aabf9b5dcbc31a0837be100e909d58d2ad8b0e3d458b2f50b3bdb6778", //done
    "name": "심동현"
  },
  {
    "wri": "00d479d7841aab49cc3f8bba0d4765d336e6981d3f958f953c6c5ef3b879032743", //done
    "name": "임진아"
  },
  {
    "wri": "890246a032fbb1f8f26ff219741332fbbdb1826d84ee28bc599a2a65a57fd7ee34", //done 
    "name": "강대현"
  }
]

//export default getName
module.exports = getName
