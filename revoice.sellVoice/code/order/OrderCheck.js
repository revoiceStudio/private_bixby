var console = require('console')
var http = require('http')
var config = require('config')
var paymentURL = config.get('payment')
var findKey = require('API/FindAPIkey')
var getList = require('common/GetCheckList')
var fail = require('fail')
module.exports.function = function orderCheck ($vivContext) {  
  const findResult = findKey.findAPIkey($vivContext)
  const getListResult = getList.getCheckList(paymentURL, findResult[0].apikey) 
  console.log("신규 주문 조회 결과 : ",getListResult)
  // → 0 : 조회된 결과가 없습니다. 설명 - 조회된 결과값이 없을 경우입니다. 에러가 아닙니다.
  //→ -1 : ex)주문/클레임 조회 오류 MSG : OpenAPI Key 에 해당하는 유저가 없습니다. 비지니스 Error. 예외적으로 발생되는 모든 에러. 메시지는 일정하지 않습니다.
  //→ -3103 : start_dt의 조회 기간의 포멧(&#39;YYYYMMDDHH24:MI&#39;)이 올바르지 않습니다. 설명 - start_dt 조회기간의 데이터 포멧 문제 예)201005041400
  //→ -3104 : end_dt의 조회 기간의 포멧(&#39;YYYYMMDDHH24:MI&#39;)이 올바르지 않습니다. 설명 - end_dt 조회기간의 데이터 포멧 문제 예)201005041400
  //→ -3105 : 최대 조회기간은 일주일 입니다. 설명 - end_dt - start_dt 의 값이 8일 이상일 경우 입니다.
  //→ -1000 : 서버 점검중입니다. 설명 - 매주 금요일 새벽은 정기점검일입니다. 서버 차단이 있을수 있습니다.
  if(getListResult == '0'){
    throw fail.checkedError("신규주문 조회 오류", "orderResultCode",{dialog:"현재 신규 주문이 없네요."});
  }
  if(getListResult == '-1'){
    throw fail.checkedError("신규주문 조회 오류", "orderResultCode",{dialog:"OpenAPI Key 에 해당하는 유저가 없습니다."});
  }
  if(getListResult == '-3103'){
    throw fail.checkedError("신규주문 조회 오류", "orderResultCode",{dialog:"서버가 불안정하네요."});
  }
  if(getListResult == '-3104'){
    throw fail.checkedError("신규주문 조회 오류", "orderResultCode",{dialog:"서버가 불안정하네요."});
  }
  if(getListResult == '-3105'){
    throw fail.checkedError("신규주문 조회 오류", "orderResultCode",{dialog:"최대 조회기간은 일주일 입니다."});
  }
  if(getListResult == '-1000'){
    throw fail.checkedError("신규주문 조회 오류", "orderResultCode",{dialog:"매주 금요일 새벽은 정기점검일입니다. 서버 차단이 있을수 있습니다."});
  }
  return getListResult  
}