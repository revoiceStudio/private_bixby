var console = require('console')
var detail = require('common/DetailResult')

module.exports.function = function deliveryNextDetail (deliveryCheckResult, rootIndex, bundleDelivery) {
    const detailResult = detail.detailResult(deliveryCheckResult, rootIndex.trim()) 
  console.log(detailResult)

  return detailResult
  
}