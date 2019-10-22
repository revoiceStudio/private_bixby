var console = require('console')
var detail = require('common/DetailResult')

module.exports.function = function orderDetail (orderCheckResult, rootIndex, bundleDelivery) { 
  const detailResult = detail.detailResult(orderCheckResult, rootIndex.trim()) 
  console.log(detailResult)

  return detailResult
}
