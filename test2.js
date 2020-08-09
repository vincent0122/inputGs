function setArray2(arr2) {
    return {
      get_arr2: function () {
        return arr2;
      },
      set_arr2: function (_id) {
        arr2.push(_id);
    }
  };
  }

  const getRecordId = setArray2([]);

  
 function sum() {
     getRecordId.set_arr2("123");
 };

 function read(){
     var k = getRecordId.get_arr2();
     console.log(k);
 };

 sum();
 sum();
 sum();

 read();
 //console.log(k);

 //console.log(getRecordId.get_arr2());

 base('testing').create({
    "날짜": "2020-08-09",
    "작성자": "임진석",
    "거래처": "호승글로벌",
    "분류": "계약진행(자료송부)",
    "내용": "123\n"
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.getId());
  });