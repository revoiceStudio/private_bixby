var console = require('console')
var http = require('http')
var config = require('config')
var restartURL = config.get('product.restart')
var findKey = require('API/FindAPIkey')
var fail = require('fail') 

module.exports.function = function restartProduct (searchProductResult, $vivContext) {
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
  const restartResult = http.getUrl(restartURL, options) 
  console.log(restartResult)
  // 비즈니스 에러
  if(restartResult['resultCode'][0]=='500'){
    throw fail.checkedError("상품 판매중지 해제처리 오류", "restartProductResultCode",{dialog:restartResult['message'][0]})
  }
  // 서버 점검
  if(restartResult['resultCode'][0]=='-1000'){
    throw fail.checkedError("상품 판매중지 해제처리 오류", "restartProductResultCode",{dialog:restartResult['message'][0]})
  }
  return {searchProductResult:searchProductResult}
}
