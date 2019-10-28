var console = require('console')
var http = require('http')
var config = require('config')
var updateURL = config.get('update.price')
var findKey = require('API/FindAPIkey')
var fail = require('fail')

module.exports.function = function updatePrice (searchProductResult,updatePrice, $vivContext) {
  const findResult = findKey.findAPIkey($vivContext)
  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey': findResult[0].apikey,
      'productNumber': searchProductResult.productNumber,
      'updatePrice' : updatePrice
    }
  }    
  const updateResult = http.getUrl(updateURL, options) 
  console.log(updateResult)
  // 비즈니스 에러
  if(updateResult['resultCode'][0]=='500'){
    throw fail.checkedError("상품 가격변경 오류", "updateProductResultCode",{dialog:updateResult['message'][0]})
  }
  // 서버 점검
  if(updateResult['resultCode'][0]=='-1000'){
    throw fail.checkedError("상품 가격변경 오류", "updateProductResultCode",{dialog:updateResult['message'][0]})
  }
  return {
    searchProductResult : searchProductResult,
    updatePrice : updatePrice
  }
}
