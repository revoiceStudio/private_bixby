var console = require('console')
module.exports.function = function findProduct (query, $vivContext) {
  console.log(query)
  return {productName : "hi"}
}
