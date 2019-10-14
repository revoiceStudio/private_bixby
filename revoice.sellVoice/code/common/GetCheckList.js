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
  let checkResultList = new Array() 
  let cnt = 0
  
  if(checkResult==0 || checkResult==-1 || checkResult==-3103 || checkResult==-3104 || checkResult==-3105 || checkResult==-1000){
    return checkResultList
  }else{
    for(let i=0; i<checkResult.length; i++){ 
      console.log(i)
      console.log(checkResult[i])      
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
      // 루트 인덱스
      if(tmp['index']=="1"){
        cnt++
      }
      tmp['rootIndex'] = cnt

      // 고객 메시지 있는 경우
      if(checkResult[i].ordDlvReqCont[0]!=''){        
        tmp['consumerMessage'] = checkResult[i].ordDlvReqCont[0]
      }else{
        tmp['consumerMessage'] = '(문의없음)'
      }

      // 옵션 상품있는 경우
      if(checkResult[i].slctPrdOptNm != ''){
        tmp['option'] = checkResult[i].slctPrdOptNm[0]
      }else{
        tmp['option'] = "(옵션없음)"
      }
      // 추가 구성 상품인 경우
      if(checkResult[i].addPrdNo != '0'){
        tmp['additionalProductStatus'] = true
      }else{
        tmp['additionalProductStatus'] = false
      }
      // 이미지 있는 경우
      if(checkResult[i].image != undefined ){
        tmp['productImage'] = checkResult[i].image[0]
      }else{
        tmp['productImage'] = "images/default/plus.png"
      }
      checkResultList.push(tmp)
    }
    return checkResultList
  }
}
module.exports.getCheckList = getCheckList