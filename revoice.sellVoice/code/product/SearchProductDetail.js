var console = require('console')
var http = require('http')
var config = require('config')
var searchProductDetailURL = config.get('search.product.detail')
var findKey = require('API/FindAPIkey')

module.exports.function = function searchProductDetail (productNumber,productImage,productPrice, sellState, $vivContext) {
  const findResult = findKey.findAPIkey($vivContext)
  const options = {     
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'apikey': findResult[0].apikey,
      'productNumber': productNumber
    }
  }    
  const detailResult = http.getUrl(searchProductDetailURL, options) 
  console.log(detailResult)

  let product = {} 
  let stockArr = new Array()
  let componentArr = new Array() 

  // 상품
  product['productName'] = detailResult['ns2:prdNm'][0]
  product['productPrice'] = productPrice
  product['productNumber'] = productNumber
  product['productImage'] = productImage
  product['sellState'] = sellState
  
  // 재고
  for(let i=0; i<detailResult['ns2:ProductStock'].length; i++){
    let stock = {}
    stock['addPrice'] = detailResult['ns2:ProductStock'][i]['addPrc'][0] // 옵션 추가 가격
    if(detailResult['ns2:ProductStock'][i]['mixDtlOptNm'] != undefined){
      stock['detailOptionName'] = detailResult['ns2:ProductStock'][i]['mixDtlOptNm'][0] // 상세상품명
    }else{
      stock['detailOptionName'] = 'null'
    }
    stock['stockNumber'] = detailResult['ns2:ProductStock'][i]['prdStckNo'][0] //재고번호
    stock['stockQuantity'] = detailResult['ns2:ProductStock'][i]['stckQty'][0] //재고수량
    stock['stockState'] = detailResult['ns2:ProductStock'][i]['prdStckStatCd'][0] //재고상태 ( 01:사용, 02:품절 )
    stockArr.push(stock)
  }

  // 구성상품
  for(let i=0; i<detailResult['ns2:productComponents'][0]['productComponent'].length; i++){
    let component = {}
    component['componentPrice'] = detailResult['ns2:productComponents'][0]['productComponent'][i]['addCompPrc'][0] //구성상품 추가 가격
    component['componentGroupName'] = detailResult['ns2:productComponents'][0]['productComponent'][i]['addPrdGrpNm'][0] //구성상품 그룹이름
    component['componentName'] = detailResult['ns2:productComponents'][0]['productComponent'][i]['compPrdNm'][0] // 구성상품 이름
    component['componentState'] = detailResult['ns2:productComponents'][0]['productComponent'][i]['addUseYn'][0] // ( Y:사용, N:품절 )
    component['componentQuantity'] = detailResult['ns2:productComponents'][0]['productComponent'][i]['compPrdQty'][0]  // 재고수량
    componentArr.push(component)
  }

  return {
    searchProductResult : product,
    stock : stockArr,
    component : componentArr
  }
}
