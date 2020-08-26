async function varl(){
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
    };
  
     varl().then(base('dataBase').update(block_Id, {
      
      "Attachments": picList
    }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.get('Name'));
    })); // 이렇게 크면. req가 실행되니까 끝나버림