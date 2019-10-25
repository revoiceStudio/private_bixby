var console = require('console')
var http = require('http')
var config = require('config')
var updateURL = config.get('update.price')
var findKey = require('API/FindAPIkey')

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
  return {
    searchProductResult : searchProductResult,
    updatePrice : updatePrice
  }
}
