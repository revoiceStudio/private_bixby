var console = require('console')
var http = require('http')
var config = require('config')
var searchURL = config.get('search.product')
var findKey = require('API/FindAPIkey')
var fail = require('fail')

search = function(sellstate, start, $vivContext) {  
  const findResult = findKey.findAPIkey($vivContext)
  // 11번가 default 시작인덱스 1번부터
  if(start==undefined || start==0){start=1}
  // 특정 번호 부터 상품 조회
  else{
    start = parseInt(start)
    // 음수 예외 처리
    if(start <= -1){
      start = 1
    }
  }
  console.log("sellstate, start, end :",sellstate, start, start+49)

  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey': findResult[0].apikey,
      'sellState': sellstate,
      'start' : start,
      'end' : start+49
    }
  }    
  const searchResult = http.getUrl(searchURL, options) 
  console.log(searchResult)
  // 상품이 더 이상 없는경우
  if(searchResult == -1){
    throw fail.checkedError("상품 조회 오류", "productResultCode",{dialog:"상품이 더 이상 없습니다."});
  }

  let product = new Array() 
  
  for(let i=0; i<searchResult.length; i++){
    let tmp = {}
    tmp['productName'] = searchResult[i]['prdNm'][0]
    tmp['productPrice'] = searchResult[i]['selPrc'][0]
    tmp['productNumber'] = searchResult[i]['prdNo'][0]
    tmp['sellState'] = sellstate
    if(sellstate=='103'){ // 판매중
      tmp['onSaleStartIndex'] = start++
    }
    else if(sellstate=='104'){  // 품절
      tmp['soldOutStartIndex'] = start++
    }else if(sellstate=='105'){ // 판매 중지
      tmp['stopDisplayStartIndex'] = start++
    }    
    // 이미지 있는 경우
    if(searchResult[i].prdImage01 != undefined ){
      tmp['productImage'] = searchResult[i].prdImage01[0]
    }else{
      tmp['productImage'] = "images/default/plus.png"
    }
    product.push(tmp)
  }
  console.log("output:",product)
  return product
}
module.exports.search = search