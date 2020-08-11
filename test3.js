/* "Attachments": [
  {
    "url" : pic2[0] 
  },
  {
    "url" : pic2[1] 
  },
  {
    "url" : pic2[2] 
  },
  {
    "url" : pic2[3] 
  },
  {
    "url" : pic2[4] 
  }
] */


var testList = new Array() ;
         
for(var i=0; i<=4; i++){
     
    // 객체 생성
    var data = new Object() ;
    
    data.url = i ;
    data.name = "Tester #" + i ;
     
     
    // 리스트에 생성된 객체 삽입
    testList.push(data) ;
}
 
console.log(testList);
 


