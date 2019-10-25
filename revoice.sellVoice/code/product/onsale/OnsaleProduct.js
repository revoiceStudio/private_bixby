var console = require('console')
var searchProduct = require('product/SearchProduct')

module.exports.function = function onsaleProduct (startIndex, $vivContext) {
  console.log("startIndex : ",startIndex)
  const searchResult = searchProduct.search(103,startIndex,$vivContext) // 103 : 판매중, 104 : 품절, 105 : 전시중지
  return searchResult
}
