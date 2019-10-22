var console = require('console')
var http = require('http')
var config = require('config')
var apikeyCheckURL = config.get('apikey.check')
var fail = require('fail')
module.exports.function = function checkAPIkey (apikey, $vivContext) { 
  var permissions = $vivContext.grantedPermissions; 
  /*if ('bixby-user-id-access' in permissions) {
    console.log("PERMISSION GRANTED");    
  } else {
    console.log("PERMISSION DENIED");
    throw fail.checkedError("아이디 권한 없음", "userIdAccessPermissonDenied");
  }*/
  let options = {
    'format': 'json',
    'cacheTime': 0,
    'headers': {
      'accept': 'application/json'
    },
    'query':{
      'id': $vivContext.bixbyUserId,
      'apikey':apikey
    }
  }
  
  console.log("API 키 : ", apikey)

  let apikeyCheck = http.getUrl(apikeyCheckURL, options)  
  if(apikeyCheck==-200){ // 존재하지 않는 경우
    return {
      checkAPIkey: 'false'
      }
  }else if(apikeyCheck==200){
    return {
      checkAPIkey: 'true'
      }
  }else if(apikeyCheck==-1){ // 패턴이 맞지 않는 경우
    return {
      checkAPIkey: '-1'
      }
  }
}
