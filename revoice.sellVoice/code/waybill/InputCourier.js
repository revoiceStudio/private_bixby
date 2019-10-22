var console = require('console')
var detail = require('common/DetailResult')

module.exports.function = function inputCourier (deliveryCheckResult, rootIndex) {
  const detailResult = detail.detailResult(deliveryCheckResult, rootIndex.trim()) 
  console.log(detailResult)

  return {deliveryDetailResult:detailResult}
}
