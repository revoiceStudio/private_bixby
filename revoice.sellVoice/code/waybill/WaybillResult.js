var console = require('console')
var console = require('console')
var http = require('http')
var config = require('config')
var sendURL = config.get('order.send')
var findKey = require('API/FindAPIkey')
var fail = require('fail')

module.exports.function = function waybill (deliveryCheckResult, deliveryDetailResult,courier,waybillNumber,rootIndex,$vivContext) {
  console.log(deliveryDetailResult,courier,waybillNumber)

  const findResult = findKey.findAPIkey($vivContext) 

  // 현재 쇼핑몰은 11번가로 고정. 
  // 배송방식 : 택배로 고정.
  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey': findResult[0].apikey,
      'shop' : "street11",
      'courier' : courier,
      'waybillNumber': waybillNumber,
      'deliveryNumber': deliveryDetailResult[0].deliveryNumber
    }
  }

  //const sendResult = http.getUrl(sendURL, options) 
  //console.log(sendResult)
  const sendResult = {result_code:[200]}
  if(sendResult.result_code[0] == '-1'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  if(sendResult.result_code[0] == '-3306'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  if(sendResult.result_code[0] == '-3320'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  if(sendResult.result_code[0] == '-3307'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  if(sendResult.result_code[0] == '-3308'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  if(sendResult.result_code[0] == '-3309'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  if(sendResult.result_code[0] == '-3310'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  if(sendResult.result_code[0] == '-3311'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  if(sendResult.result_code[0] == '-3313'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  if(sendResult.result_code[0] == '-1000'){
    throw fail.checkedError("운송장등록 오류", "waybillResultCode",{dialog:sendResult.result_text[0]});
  }
  
  // 운송장 등록이 완료된 상품은 리스트에서 제거한다.
  for(let i=0; i<deliveryCheckResult.length; i++){
    if(deliveryCheckResult[i].rootIndex == rootIndex.trim()){
      deliveryCheckResult.splice(i,1)
      i--
    }
  }
  console.log(deliveryCheckResult)
  return {
    deliveryCheckResult:deliveryCheckResult,
    deliveryDetailResult:deliveryDetailResult,
    courier:courier,
    waybillNumber:waybillNumber
  }
}
