var console = require('console')
var http = require('http')
var config = require('config')
var orderConfirmURL = config.get('order.confirm')

module.exports.function = function deliveryConfirm (orderCheckResult) {
  //orderNumber, index, additionalProductStatus,additionalProduct,deliveryNumber

  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'ordNo': orderCheckResult[0]['orderNumber'],
      'ordPrdSeq': apikey,
      'addPrdYn': apikey,
      'addPrdNo': apikey,
      'dlvNo': apikey
    }
  }    
  const checkResult = http.getUrl(URL, options)   

  console.log(orderCheckResult)
  let deliveryConfirmResult = new Array()

  for(var i=0; i<orderCheckResult.length; i++){
    let tmp = {}
    tmp['additionalProductStatus'] = orderCheckResult[i]['additionalProductStatus']
    tmp['bundleDelivery'] = orderCheckResult[i]['bundleDelivery']
    tmp['option'] = orderCheckResult[i]['option']
    tmp['productImage'] = orderCheckResult[i]['productImage']
    tmp['productName'] = orderCheckResult[i]['productName']
    tmp['consumerName'] = orderCheckResult[i]['consumerName']
    tmp['address'] = orderCheckResult[i]['address']
    tmp['productPrice'] = orderCheckResult[i]['productPrice']
    tmp['rootIndex']= orderCheckResult[i]['rootIndex']
    tmp['index']= orderCheckResult[i]['index']
    tmp['quantity'] = orderCheckResult[i]['quantity']
    tmp['optionPrice'] = orderCheckResult[i]['optionPrice']
    tmp['payAmount'] = orderCheckResult[i]['payAmount']
    tmp['consumerMessage'] = orderCheckResult[i]['consumerMessage']
    deliveryConfirmResult.push(tmp)     
  }    

  console.log(deliveryConfirmResult)
  return deliveryConfirmResult
}