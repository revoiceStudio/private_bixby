var console = require('console')
var http = require('http')
var config = require('config')
var apikeyFindURL = config.get('apikey.find')
var fail = require('fail');

findAPIkey = function($vivContext) {
  let findResult = {}
  var permissions = $vivContext.grantedPermissions;
  if ('user-profile-access' in permissions) {
    console.log("PERMISSION GRANTED");    
  } else {
    console.log("PERMISSION DENIED");
    throw fail.checkedError("개인 정보 활용 동의가 필요합니다. 빅스비 설정의 개인정보 탭에서 개인정보권한을 허용해주세요.", "userIdAccessPermissonDenied");
  }
  console.log("빅스비 콘텍스트", $vivContext)
  console.log("유저 아이디 :",$vivContext.bixbyUserId)
  let options = {
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'id': $vivContext.bixbyUserId
    }
  }
  findResult = http.getUrl(apikeyFindURL, options)   
  if(findResult == null || findResult ==[] || findResult.length==0){
    throw fail.checkedError("API key 없음", "notRegisteredAPIkey");
  }
  console.log("find API key : ", findResult)
  return findResult
}
module.exports.findAPIkey = findAPIkey