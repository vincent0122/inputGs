

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

 setArray2([1,2]);
 sum();
 read();
 console.log(setArray2);
 //console.log(k);

 //console.log(getRecordId.get_arr2());
