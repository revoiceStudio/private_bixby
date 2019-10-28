var console = require('console')
var http = require('http')
var config = require('config')
var inquiryURL = config.get('search.inquiry')
var findKey = require('API/FindAPIkey')
var fail = require('fail')

module.exports.function = function inquiry ($vivContext) {
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
  const inquiryResult = http.getUrl(inquiryURL, options) 
  console.log(inquiryResult)
  // 비즈니스 에러
  if(inquiryResult['ns2:result_code'] == '500'){
    throw fail.checkedError("문의 조회 오류", "inquiryResultCode",{dialog:inquiryResult['ns2:result_message'][0]})
  }
  // 서버 점검 중
  if(inquiryResult['ns2:result_code'] == '-1000'){
    throw fail.checkedError("문의 조회 오류", "inquiryResultCode",{dialog:inquiryResult['ns2:result_message'][0]})
  }
  let inquiry = new Array()
  for(let i=0; i<inquiryResult.length; i++){
    let tmp = {}
    tmp['inquiryContent'] = inquiryResult[i]['brdInfoCont']
    tmp['inquirySubject'] = inquiryResult[i]['brdInfoSbjct']
    tmp['inquiryBuyState'] = inquiryResult[i]['buyYn']
    tmp['inquiryDate'] = inquiryResult[i]['createDt']
    tmp['inquiryConsumerName'] = inquiryResult[i]['memNM']
    tmp['inquiryNumber'] = inquiryResult[i]['brdInfoNo']
    tmp['inquiryProductName'] = inquiryResult[i]['prdNm']    
    tmp['inquiryProductNumber'] = inquiryResult[i]['brdInfoClfNo']
    if(inquiryResult[i]['qnaDtlsCd']=="01"){
      tmp['inquiryCategory'] = "상품"
    }
    if(inquiryResult[i]['qnaDtlsCd']=="02"){
      tmp['inquiryCategory'] = "배송"
    }
    if(inquiryResult[i]['qnaDtlsCd']=="03"){
      tmp['inquiryCategory'] = "반품/환불/취소"
    }
    if(inquiryResult[i]['qnaDtlsCd']=="04"){
      tmp['inquiryCategory'] = "교환/변경"
    }
    if(inquiryResult[i]['qnaDtlsCd']=="05"){
      tmp['inquiryCategory'] = "기타"
    }
    inquiry.push(tmp)
  }

  return inquiry
}
