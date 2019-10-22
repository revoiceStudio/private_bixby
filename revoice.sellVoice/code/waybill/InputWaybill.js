var console = require('console')
module.exports.function = function inputWaybill (deliveryDetailResult,courier) {
  console.log(deliveryDetailResult,courier)
  return {
    deliveryDetailResult:deliveryDetailResult,
    courier:courier
  }
}
