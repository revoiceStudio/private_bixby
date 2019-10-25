var console = require('console')
var http = require('http')
var config = require('config')
var restartURL = config.get('product.restart')
var findKey = require('API/FindAPIkey')

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
  return searchProductResult
}
