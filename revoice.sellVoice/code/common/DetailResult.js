var http = require('http')

detailResult = function(checkResult, rootIndex) { 
  let detail = new Array()
  let totalPrice = 0

  for(var i=0; i<checkResult.length; i++){
    if(checkResult[i]['rootIndex'] == rootIndex){      
        let tmp = {}
        tmp['additionalProductStatus'] = checkResult[i]['additionalProductStatus']
        tmp['additionalProduct'] = checkResult[i]['additionalProduct']
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
        tmp['previousRootIndex'] = parseInt(checkResult[i]['rootIndex']) -1     
        
        totalPrice += parseInt(checkResult[i]['payAmount'])
        detail.push(tmp)           
    }
    if(i == checkResult.length-1){
      detail[0]['totalPrice'] = totalPrice
      if(checkResult[i]['rootIndex'] == parseInt(rootIndex)){
        detail[0]['nextRootIndex'] == 0
      }else{
        detail[0]['nextRootIndex'] = parseInt(rootIndex) +1
      }    
    }
  }    
  
  return detail
}
module.exports.detailResult = detailResult