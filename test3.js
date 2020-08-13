function sending() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var secondSheet = ss.getSheetByName("공장일지");
  var targetSheet = ss.getSheetByName("원료제품누적");
  var half = ss.getSheetByName("기타제품누적");
  var add = ss.getSheetByName("시간외근무누적");
  var etc = ss.getSheetByName("기타활동누적");
  var mac = ss.getSheetByName("기계정비내역");
  var date = secondSheet.getRange("a1").getValue();

  // 원료, 제품 입력  
  for (i = 6; i < 40; i++) {
    var values = secondSheet.getRange(i, 9, 1, 11).getValues();
    if (values[0][0] === "원료" || values[0][0] === "제품") {
      var emp = targetSheet.getRange("B2:B30000").getValues();

      for (row = 0; row < emp.length; row++) { //범위를 정했으니, emp.lengh는 언제나 이다. 그래서 실행됨
        if (!emp[row].join("")) break; //break를 써주는게 포인트였음. !emp[row].join("") 의 의미는 이해못함
      }
      targetSheet.getRange(row + 2, 1).setValue(date);
      targetSheet.getRange(row + 2, 2, 1, 11).setValues(values);

    }
  }


}