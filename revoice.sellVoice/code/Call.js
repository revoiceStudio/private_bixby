
module.exports.function = function call (checkResult, rootIndex) {

for(let i=0; i<checkResult.length; i++){
  let consumerPhoneNumber = ""
  if(checkResult[i].rootIndex == rootIndex.trim()){
    consumerPhoneNumber = checkResult[i].consumerPhoneNumber.trim()
    break
  }
}
  return {consumerPhoneNumber:consumerPhoneNumber}
}
