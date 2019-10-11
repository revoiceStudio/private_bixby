var console = require('console')
var http = require('http')
var config = require('config')
var orderURL = config.get('order')
var findKey = require('API/FindAPIkey')

module.exports.function = function deliveryCheck ($vivContext) {
  const findResult = findKey.findAPIkey($vivContext)
  console.log(findResult)

  if(findResult == null || findResult ==[] || findResult.length==0){
    console.log("apikey 없음")
    return 0
  }

  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey': findResult[0].apikey
    }
  }    
  let order = http.getUrl(orderURL, options)    
  let orderList = new Array() 

  if(order==0 || order==-1 || order==-3103 || order==-3104 || order==-3105 || order==-1000){
    return orderList
  }else{
    for(let i=0; i<order.length; i++){ 
      let tmp = {}
    tmp['productName'] = order[i].prdNm      
      tmp['index'] = order[i].ordPrdSeq
      tmp['bundleDelivery'] = order[i].bndlDlvSeq
      tmp['consumerName'] = order[i].rcvrNm
      tmp['address'] = order[i].rcvrBaseAddr + order[i].rcvrDtlsAddr
      tmp['productPrice'] = order[i].selPrc
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
  
}