var console = require('console')
var http = require('http')
var config = require('config')

getCheckList = function(URL, apikey) { 

  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey': apikey
    }
  }    
  const checkResult = http.getUrl(URL, options) 
  console.log(checkResult)

  let checkResultList = new Array() 
  let orderNumberObj = {}
  if(checkResult=='0' || checkResult=='-1' || checkResult=='-3103' || checkResult=='-3104' || checkResult=='-3105' || checkResult=='-1000'){
     return checkResult
  }
  else{
    for(let i=0; i<checkResult.length; i++){
      let tmp = {}
      tmp['productName'] = checkResult[i].prdNm[0]
      tmp['index'] = checkResult[i].ordPrdSeq[0]
      tmp['bundleDelivery'] = checkResult[i].bndlDlvSeq[0]
      tmp['consumerName'] = checkResult[i].rcvrNm[0]
      tmp['address'] = checkResult[i].rcvrBaseAddr[0] + checkResult[i].rcvrDtlsAddr[0]
      tmp['productPrice'] = checkResult[i].selPrc[0]
      tmp['quantity'] = checkResult[i].ordQty[0]
      tmp['optionPrice'] = checkResult[i].ordOptWonStl[0]
      tmp['payAmount'] = checkResult[i].ordPayAmt[0]
      tmp['orderDate'] = checkResult[i].ordDt[0]
      tmp['orderNumber'] = checkResult[i].ordNo[0]
      tmp['deliveryNumber'] = checkResult[i].dlvNo[0]
      tmp['additionalProduct'] = checkResult[i].addPrdNo[0]
      tmp['additionalProductStatus'] = checkResult[i].addPrdYn[0]
      tmp['consumerPhoneNumber'] = checkResult[i].ordPrtblTel[0]
      // 고객 메시지 있는 경우
      if(checkResult[i].ordDlvReqCont[0]!=''){        
        tmp['consumerMessage'] = checkResult[i].ordDlvReqCont[0]
      }else{
        tmp['consumerMessage'] = '(배송메세지 없음)'
      }

      // 옵션 상품있는 경우
      if(checkResult[i].slctPrdOptNm != ''){
        tmp['option'] = checkResult[i].slctPrdOptNm[0]
      }else{
        tmp['option'] = "(옵션없음)"
      }
      
      // 이미지 있는 경우
      if(checkResult[i].image != undefined ){
        tmp['productImage'] = checkResult[i].image[0]
      }else{
        tmp['productImage'] = "images/default/plus.png"
      }

      // 주문 변호 별 배열 추가
      if(orderNumberObj[tmp['orderNumber'] ]== undefined){
        let arr = new Array()
        arr.push(tmp)
        orderNumberObj[tmp['orderNumber'] ] = arr
      }else{
        let arr = orderNumberObj[tmp['orderNumber'] ]
        arr.push(tmp)
      }      
      
    }

    let cnt = 0  // 루트 인덱스
    for(var key in orderNumberObj){      
      cnt++
      console.log(key)
      for(var i=0; i<orderNumberObj[key].length; i++){
        orderNumberObj[key][i]['rootIndex'] = cnt
        if(i==0){
          orderNumberObj[key][i]['orderRootIndex'] = cnt
        }
        checkResultList.push(orderNumberObj[key][i])
      }
    }
    console.log(checkResultList)
    return checkResultList
  }
}
module.exports.getCheckList = getCheckList