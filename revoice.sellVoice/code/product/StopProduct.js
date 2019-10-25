var console = require('console')
var http = require('http')
var config = require('config')
var stopURL = config.get('product.stop')
var findKey = require('API/FindAPIkey')

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
  return searchProductResult
}