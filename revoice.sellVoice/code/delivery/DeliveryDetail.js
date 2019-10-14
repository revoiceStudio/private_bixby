var console = require('console')
var detail = require('common/DetailResult')

module.exports.function = function deliveryDetail (deliveryCheckResult, rootIndex, bundleDelivery) {  
  const detailResult = detail.detailResult(deliveryCheckResult, rootIndex, bundleDelivery) 
  console.log(detailResult)

  return detailResult
}
