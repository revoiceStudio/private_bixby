var console = require('console')
var http = require('http')
var config = require('config')
var stopURL = config.get('product.stop')
var findKey = require('API/FindAPIkey')
var fail = require('fail')

module.exports.function = function stopProduct (searchProductResult, $vivContext) {
  const findResult = findKey.findAPIkey($vivContext)
  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey': findResult[0].apikey,
      'productNumber': searchProductResult.productNumber
    }
  }    
  const stopResult = http.getUrl(stopURL, options) 
  console.log(stopResult)  
  // 비즈니스 에러
  if(stopResult['resultCode'][0]=='500'){
    throw fail.checkedError("상품 판매중지 해제처리 오류", "stopProductResultCode",{dialog:stopResult['message'][0]})
  }
  // 서버 점검
  if(stopResult['resultCode'][0]=='-1000'){
    throw fail.checkedError("상품 판매중지 해제처리 오류", "stopProductResultCode",{dialog:stopResult['message'][0]})
  }
  return {searchProductResult:searchProductResult}
}