var testList = new Array() ;
pic = ["https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201811%2F20181119175540684.jpg",
"https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201811%2F20181119175540684.jpg",
"https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201811%2F20181119175540684.jpg",
"https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201811%2F20181119175540684.jpg"];
         
 
for(var i=0; i<pic.length; i++){
     
    // 객체 생성
    var data = new Object() ;
     
    data.url = pic[i] ;
     
     
    // 리스트에 생성된 객체 삽입
    testList.push(data) ;
}

console.log(testList);

