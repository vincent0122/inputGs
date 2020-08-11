function setArray2(ids) {
    return {
      get_id : function () {
        return ids;
      },
      set_id : function (_ids) {
        ids =  _ids;   //왜 var로 선언을 하지 않지?
     }
  };
};
  
  
  
  const getRecordId = setArray2([]);

  getRecordId.set_id("123");
  var l = getRecordId.get_id();
  

  console.log(getRecordId.get_id());
