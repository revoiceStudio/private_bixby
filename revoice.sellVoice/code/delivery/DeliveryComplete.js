var console = require('console')
var http = require('http')
var config = require('config')
var orderCompleteURL = config.get('order.complete')
var findKey = require('API/FindAPIkey')
var getList = require('common/GetCheckList')
var fail = require('fail')

module.exports.function = function deliveryComplete ($vivContext) {
  const findResult = findKey.findAPIkey($vivContext)
  
  
  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey': findResult[0].apikey
    }
  }    
  const checkResult = http.getUrl(orderCompleteURL, options) 
  console.log(checkResult)

  let checkResultList = new Array()
  console.log("배송완료 조회 결과 : ",checkResult)

  //→ 0 : 조회된 결과가 없습니다. 설명 - 조회된 결과값이 없을 경우입니다. 에러가 아닙니다.
  //→ -1 : ex)주문/클레임 조회 오류 MSG : OpenAPI Key 에 해당하는 유저가 없습니다. 비지니스 Error. 예외적으로 발생되는 모든 에러. 메시지는 일정하지 않습니다.
  //→ -3303 : start_dt의 조회 기간의 포멧(&#39;YYYYMMDDHH24:MI&#39;)이 올바르지 않습니다. 설명 - start_dt 조회기간의 데이터 포멧 문제 예)201005041400
  //→ -3304 : end_dt의 조회 기간의 포멧(&#39;YYYYMMDDHH24:MI&#39;)이 올바르지 않습니다. 설명 - end_dt 조회기간의 데이터 포멧 문제 예)201005041400
  //→ -3305 : 최대 조회기간은 일주일 입니다. 설명 - end_dt - start_dt 의 값이 8일 이상일 경우 입니다.
  //→ -1000 : 서버 점검중입니다. 설명 - 매주 금요일 새벽은 정기점검일입니다. 서버 차단이 있을수 있습니다.  
  if(checkResult == '0'){
    throw fail.checkedError("배송완료 조회 오류", "deliveryResultCode",{dialog:"현재 신규 주문이 없네요."});
  }
  if(checkResult == '-1'){
    throw fail.checkedError("배송완료 조회 오류", "deliveryResultCode",{dialog:"OpenAPI Key 에 해당하는 유저가 없습니다."});
  }
  if(checkResult == '-3903'){
    throw fail.checkedError("배송완료 조회 오류", "deliveryResultCode",{dialog:"서버가 불안정하네요."});
  }
  if(checkResult == '-3904'){
    throw fail.checkedError("배송완료 조회 오류", "deliveryResultCode",{dialog:"서버가 불안정하네요."});
  }
  if(checkResult == '-3905'){
    throw fail.checkedError("배송완료 조회 오류", "deliveryResultCode",{dialog:"최대 조회기간은 일주일 입니다."});
  }
  if(checkResult == '-1000'){
    throw fail.checkedError("배송완료 조회 오류", "deliveryResultCode",{dialog:"매주 금요일 새벽은 정기점검일입니다. 서버 차단이 있을수 있습니다."});
  }

  for(let i=0; i<checkResult.length; i++){
    let tmp = {}
    tmp['productName'] = checkResult[i].prdNm[0]
    tmp['consumerName'] = checkResult[i].rcvrNm[0]
    tmp['address'] = checkResult[i].rcvrBaseAddr[0] + checkResult[i].rcvrDtlsAddr[0]
    tmp['productPrice'] = checkResult[i].selPrc[0]   
    tmp['deliveryNumber'] = checkResult[i].dlvNo[0]
    tmp['consumerPhoneNumber'] = checkResult[i].ordPrtblTel[0]
    tmp['deliveryCompleteDate'] = checkResult[i].dlvEndDt[0]
    
    // 고객 메시지 있는 경우
    if(checkResult[i].ordDlvReqCont[0]!=''){        
      tmp['consumerMessage'] = checkResult[i].ordDlvReqCont[0]
    }else{
      tmp['consumerMessage'] = '(배송메세지 없음)'
    }

    // 옵션 상품있는 경우
    if(checkResult[i].slctPrdOptNm != ''){
      tmp['option'] = checkResult[i].slctPrdOptNm[0]
    }else{
      tmp['option'] = "(옵션없음)"
    }
    
    // 이미지 있는 경우
    if(checkResult[i].image != undefined ){
      tmp['productImage'] = checkResult[i].image[0]
    }else{
      tmp['productImage'] = "images/default/plus.png"
    }

    checkResultList.push(tmp)   
    
  }

  return checkResultList  
}
