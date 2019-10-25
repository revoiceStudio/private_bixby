var console = require('console')
var http = require('http')
var config = require('config')
var orderConfirmURL = config.get('order.confirm')
var findKey = require('API/FindAPIkey')
module.exports.function = function deliveryConfirm (orderCheckResult,$vivContext) {
  //orderNumber, index, additionalProductStatus,additionalProduct,deliveryNumber
  const findResult = findKey.findAPIkey($vivContext)

  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey' : findResult[0].apikey,
      'ordNo': "",
      'ordPrdSeq': "",
      'addPrdYn': "",
      'addPrdNo': "",
      'dlvNo': ""
    }
  }     
  
  let deliveryConfirmResult = new Array()
  let orderConfirmResult

  let orderNumberObj = {}
  for(var i=0; i<orderCheckResult.length; i++){
    // 주문 변호 별 배열 추가
    if(orderNumberObj[orderCheckResult[i]['orderNumber'] ]== undefined){
      let arr = new Array()
      arr.push(orderCheckResult[i])
      orderNumberObj[orderCheckResult[i]['orderNumber'] ] = arr
    }else{
      let arr = orderNumberObj[orderCheckResult[i]['orderNumber'] ]
      arr.push(orderCheckResult[i])
    }      
  }
  console.log(orderNumberObj)
  for(var key in orderNumberObj){
    for(var i=0; i<orderNumberObj[key].length; i++){
      // 추가구성삼품이고 추가구성상품번호가 0인경우(메인 상품)  또는 추가구성상품이 아닌 경우의 상품에 대해 각각 발주확인 요청을 보낸다.
      if( (orderNumberObj[key][i]['additionalProduct']=='0' && orderNumberObj[key][i]['additionalProductStatus']=='Y')|| orderNumberObj[key][i]['additionalProductStatus']=='N'){

      // N인 경우만 발송요청으로 변경
      //if(orderNumberObj[key][i]['additionalProductStatus']=='N'){          
        options.query.ordNo = orderNumberObj[key][i]['orderNumber']
        options.query.ordPrdSeq = orderNumberObj[key][i]['index']
        options.query.addPrdYn = orderNumberObj[key][i]['additionalProductStatus']
        options.query.addPrdNo = orderNumberObj[key][i]['additionalProduct']
        options.query.dlvNo = orderNumberObj[key][i]['deliveryNumber']
        orderConfirmResult = http.getUrl(orderConfirmURL, options)
        console.log(orderConfirmResult)      
      }
      let tmp = {}
      tmp['deliveryConfirmErrorCode'] = orderConfirmResult['result_code'][0]
      tmp['deliveryConfirmError'] =  orderConfirmResult['result_text'][0]
      tmp['additionalProductStatus'] = orderNumberObj[key][i]['additionalProductStatus']
      tmp['additionalProduct'] = orderNumberObj[key][i]['additionalProduct']
      tmp['bundleDelivery'] = orderNumberObj[key][i]['bundleDelivery']
      tmp['option'] = orderNumberObj[key][i]['option']
      tmp['productImage'] = orderNumberObj[key][i]['productImage']
      tmp['productName'] = orderNumberObj[key][i]['productName']
      tmp['consumerName'] = orderNumberObj[key][i]['consumerName']
      tmp['address'] = orderNumberObj[key][i]['address']
      tmp['productPrice'] = orderNumberObj[key][i]['productPrice']
      tmp['rootIndex']= orderNumberObj[key][i]['rootIndex']
      tmp['index']= orderNumberObj[key][i]['index']
      tmp['quantity'] = orderNumberObj[key][i]['quantity']
      tmp['optionPrice'] = orderNumberObj[key][i]['optionPrice']
      tmp['payAmount'] = orderNumberObj[key][i]['payAmount']
      tmp['consumerMessage'] = orderNumberObj[key][i]['consumerMessage']
      tmp['orderRootIndex'] = orderNumberObj[key][i]['orderRootIndex']
      deliveryConfirmResult.push(tmp)       
    }
  }  
  console.log(deliveryConfirmResult)
  return deliveryConfirmResult
}