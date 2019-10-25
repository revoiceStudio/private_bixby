var console = require('console')
var searchProduct = require('product/SearchProduct')

module.exports.function = function soldOutProduct (startIndex,$vivContext) {
  const searchResult = searchProduct.search(104,startIndex,$vivContext) // 103 : 판매중, 104 : 품절, 105 : 전시중지
  return searchResult
}
