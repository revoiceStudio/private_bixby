var console = require('console')

module.exports.function = function detail (orderCheckResult, index) { 
  let detail = new Array()
  let tmp = {}
  console.log(oauth)
  tmp['additionalProductStatus'] = orderCheckResult['additionalProductStatus'][0]
  tmp['bundleDelivery'] = orderCheckResult['bundleDelivery'][0]
  tmp['index'] = orderCheckResult['index'][0]
  tmp['option'] = orderCheckResult['option'][0]
  tmp['productImage'] = orderCheckResult['productImage'][0]
  tmp['productName'] = orderCheckResult['productName'][0]
  tmp['consumerName'] = orderCheckResult['consumerName'][0]
  tmp['address'] = orderCheckResult['address'][0]
  tmp['productPrice'] = orderCheckResult['productPrice'][0]

  detail.push(tmp)
  console.log(index)
  console.log(detail)
  return detail
}
