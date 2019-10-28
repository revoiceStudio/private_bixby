var console = require('console')
var http = require('http')
var config = require('config')
var inquiryAnswerURL = config.get('answer.inquiry')
var findKey = require('API/FindAPIkey')
var fail = require('fail')

module.exports.function = function inquiryAnswer (inquiryResult,inquiryAnswer,$vivContext) {
  const findResult = findKey.findAPIkey($vivContext)
  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey': findResult[0].apikey,
      'inquiryNumber' : inquiryResult.inquiryNumber,
      'inquiryProductNumber' : inquiryResult.inquiryProductNumber,
      'inquiryAnswer' : inquiryAnswer
    }
  }    
  const inquiryAnswerResult = http.getUrl(inquiryAnswerURL, options) 
  console.log(inquiryAnswerResult)
  // 비즈니스 에러
  if(inquiryAnswerResult['resultCode'] == '500'){
    throw fail.checkedError("문의 답변 오류", "inquiryAnswerResultCode",{dialog:inquiryAnswerResult['message'][0]})
  }
  // 서버 점검 중
  if(inquiryAnswerResult['resultCode'] == '-1000'){
    throw fail.checkedError("문의 답변 오류", "inquiryAnswerResultCode",{dialog:inquiryAnswerResult['message'][0]})
  }

  return{
    inquiryAnswerMessage : inquiryAnswerResult['message'][0],
    inquiryAnswer : inquiryAnswer,
    inquiryResult : inquiryResult
  }
}
