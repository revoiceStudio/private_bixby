var http = require('http')

detailResult = function(checkResult, rootIndex, bundleDelivery) { 
  let detail = new Array()
  let totalPrice = 0

  for(var i=0; i<checkResult.length; i++){
    if(checkResult[i]['rootIndex'] == rootIndex.trim() ){      
      if(checkResult[i]['bundleDelivery'] == bundleDelivery.trim()){
        let tmp = {}
        tmp['additionalProductStatus'] = checkResult[i]['additionalProductStatus']
        tmp['bundleDelivery'] = checkResult[i]['bundleDelivery']
        tmp['option'] = checkResult[i]['option']
        tmp['productImage'] = checkResult[i]['productImage']
        tmp['productName'] = checkResult[i]['productName']
        tmp['consumerName'] = checkResult[i]['consumerName']
        tmp['address'] = checkResult[i]['address']
        tmp['productPrice'] = checkResult[i]['productPrice']
        tmp['rootIndex']= checkResult[i]['rootIndex']
        tmp['index']= checkResult[i]['index']
        tmp['quantity'] = checkResult[i]['quantity']
        tmp['optionPrice'] = checkResult[i]['optionPrice']
        tmp['payAmount'] = checkResult[i]['payAmount']
        tmp['consumerMessage'] = checkResult[i]['consumerMessage']

        totalPrice += parseInt(checkResult[i]['payAmount'])
        detail.push(tmp)
      }     
    }
    if(i == checkResult.length-1){
      detail[0]['totalPrice'] = totalPrice
    }
  }    
  
  return detail
}
module.exports.detailResult = detailResult