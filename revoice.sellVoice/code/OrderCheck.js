var console = require('console')
var http = require('http')

module.exports.function = function orderCheck () {
  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    }
  }    
  const url = "http://15.164.93.96:2023/sellVoice/order_inquire"
  let order = http.getUrl(url, options)    
  let orderList = new Array() 

  for(let i=0; i<order.length; i++){ 
    let tmp = {}
    tmp['productName'] = order[i].prdNm[0]
    tmp['option'] = order[i].slctPrdOptNm
    tmp['index'] = order[i].ordPrdSeq
    // 추가 구성 상품인 경우
    if(order[i].addPrdNo != '0'){
      tmp['additionalProductStatus'] = true
    }else{
      tmp['additionalProductStatus'] = false
    }    
    // 이미지 있는 경우
    if(order[i].image != undefined ){
      tmp['productImage'] = order[i].image[0]
    }else{
      tmp['productImage'] = "images/default/plus.png"
    }
    orderList.push(tmp)
  }

  return orderList
}