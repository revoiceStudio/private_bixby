var console = require('console')
var http = require('http')
var config = require('config')
var paymentURL = config.get('payment')

module.exports.function = function orderCheck () { 

  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    }
  }  
  let order = http.getUrl(paymentURL, options)    
  let orderList = new Array() 

  for(let i=0; i<order.length; i++){ 
    let tmp = {}
    tmp['productName'] = order[i].prdNm      
    tmp['index'] = order[i].ordPrdSeq
    tmp['bundleDelivery'] = order[i].bndlDlvSeq
    tmp['consumerName'] = order[i].rcvrNm
    tmp['address'] = order[i].rcvrBaseAddr + order[i].rcvrDtlsAddr
    tmp['productPrice'] = order[i].selPrc
    // 옵션 상품있는 경우
    if(order[i].slctPrdOptNm != ''){
      tmp['option'] = order[i].slctPrdOptNm
    }else{
      tmp['option'] = "옵션없음"
    }
    // 추가 구성 상품인 경우
    if(order[i].addPrdNo != '0'){
      tmp['additionalProductStatus'] = true
    }else{
      tmp['additionalProductStatus'] = false
    }
    // 이미지 있는 경우
    if(order[i].image != undefined ){
      tmp['productImage'] = order[i].image
    }else{
      tmp['productImage'] = "images/default/plus.png"
    }
    orderList.push(tmp)
  }

  return orderList
}