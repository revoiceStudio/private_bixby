var console = require('console')
var http = require('http')
var config = require('config')
var searchURL = config.get('search.product')
var findKey = require('API/FindAPIkey')

module.exports.function = function searchProduct ($vivContext) {
  const findResult = findKey.findAPIkey($vivContext)
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
  const searchResult = http.getUrl(searchURL, options) 
  console.log(searchResult)

  let product = new Array() 
  
  for(let i=0; i<searchResult.length; i++){
    let tmp = {}
    tmp['productName'] = searchResult[i]['prdNm'][0]
    tmp['productPrice'] = searchResult[i]['selPrc'][0]
    tmp['productNumber'] = searchResult[i]['prdNo'][0]
    // 이미지 있는 경우
    if(searchResult[i].prdImage01 != undefined ){
      tmp['productImage'] = searchResult[i].prdImage01[0]
    }else{
      tmp['productImage'] = "images/default/plus.png"
    }

    product.push(tmp)
  }

  return product
}
