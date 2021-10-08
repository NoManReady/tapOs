/*2020-11-13 jsdemo 获取互认助手版本号*/
/*2020-12-29 jsdemo 增加4个数字证书接口*/
//url接口地址
var commonUrl="http://127.0.0.1:11200";
var commonUrl2="http://127.0.0.1:61200";

/**
 * 封装ajax 函数
 * @param url  请求地址
 * @param type 请求方法 get||post；
 * @param dataType 接收数据类型
 * @param async 是否异步 true 异步 || false  同步；默认异步
 * @param data 发送数据
 * @param Callback  回调函数(数据,对象)
 */
function ajax(url, data,async,callback) {
    var type =  'post';
    var dataType =  'json';
    var success =  function (res) {
        callback(res);
    };
    var error = function (res) {
        callback(res);
    };
    $.ajax({
        'url': url,
        'data': data,
        'type': type,
        'dataType': dataType,
        'async': async,
        'success': success,
        'error': error,
    });
}
//获取证书列表接口
function RS_GetUserList(){
    var url=commonUrl+"/RS_GetUserList";
    var data="";
    var result;
    ajax(url,data,false,function(res){
        result = res;
    });
    return result;
}
//证书口令验证接口
function RS_CertLogin(containerId,password){
    var url=commonUrl+"/RS_CertLogin";
    var data={
        containerId:containerId,
        password:password,
    }
    var result;
    ajax(url,data,false,function(res) {
        result = res;
    });
    return result;
}
//获取数字证书接口
function RS_GetCertBase64String(certType,containerId){
    var url=commonUrl+"/RS_GetCertBase64String";
    var data={
        certType:certType,
        containerId:containerId
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//.获取证书信息接口
function RS_GetCertInfo(certBase64,type){
    var url=commonUrl+"/RS_GetCertInfo";
    var data={
        certBase64:certBase64,
        type:type
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//.获取设备信息接口
function RS_KeyGetDeviceInfo(containerId,type){
    var url=commonUrl+"/RS_KeyGetDeviceInfo";
    var data={
        containerId:containerId,
        type:type
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取证书用户标识接口
function RS_KeyGetKeySn(containerId){
    var url=commonUrl+"/RS_KeyGetKeySn";
    var data={
        containerId:containerId
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//非对称加密接口
function RS_KeyEncryptData(rsKey,certBase64){
    var url=commonUrl+"/RS_KeyEncryptData";
    var data={
        rsKey:rsKey,
        certBase64:certBase64
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//非对称解密接口
function RS_KeyDecryptData(encRsKey,containerId){
    var url=commonUrl+"/RS_KeyDecryptData";
    var data={
        encRsKey:encRsKey,
        containerId:containerId
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//获取密码重试剩余次数接口
function RS_GetPinRetryCount(containerId){
    var url=commonUrl+"/RS_GetPinRetryCount";
    var data={
        containerId:containerId,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//参数配置接口
function RS_ConfigParameters(cmd,val){
    var url=commonUrl+"/RS_ConfigParameters";
    var data={
        cmd:cmd,
        val:val
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//获取配置参数接口
function RS_GetParameters(cmd){
    var url=commonUrl+"/RS_GetParameters";
    var data={
        cmd:cmd,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//生成二维码图片接口
function RS_GreateQRCode(qrcode,path){
    var url=commonUrl+"/RS_GreateQRCode";
    var data={
        qrcode:qrcode,
        path:path,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取流水号接口
function RS_GetTransid(joinCode){
    var url=commonUrl+"/RS_GetTransid";
    var data={
        joinCode:joinCode,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//对称加密接口
function RS_EncryptFile(souceFilePath,encFilePath){
    var url=commonUrl+"/RS_EncryptFile";
    var data={
        souceFilePath:souceFilePath,
        encFilePath:encFilePath,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//对称解密接口
function RS_DecryptFile(symKey,encFilePath,dncDirectoryPath){
    var url=commonUrl+"/RS_DecryptFile";
    var data={
        symKey:symKey,
        encFilePath:encFilePath,
        dncDirectoryPath:dncDirectoryPath,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//修改证书口令接口
function RS_ChangePassWd(containerId,oldCode,newCode){
    var url=commonUrl+"/RS_ChangePassWd";
    var data={
        containerId:containerId,
        oldCode:oldCode,
        newCode:newCode,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//验证证书有效性接口
function RS_VerifyIdentity(certBase64,authNo){
    var url=commonUrl+"/RS_VerifyIdentity";
    var data={
        certBase64:certBase64,
        authNo:authNo,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//P1签名接口（域签）
function RS_KeyDigitalSignByP1(asn1Msg,containerId){
    var url=commonUrl+"/RS_KeyDigitalSignByP1";
    var data={
        asn1Msg:asn1Msg,
        containerId:containerId,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//P1验签接口（域签）
function RS_VerifyDigitalSignByP1(certBase64,asn1Msg,signdMsg){
    var url=commonUrl+"/RS_VerifyDigitalSignByP1";
    var data={
        certBase64:certBase64,
        asn1Msg:asn1Msg,
        signdMsg:signdMsg,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//P7签名
function RS_KeySignByP7(msg,flag,containerId){
    var url=commonUrl+"/RS_KeySignByP7";
    var data={
        msg:msg,
        flag:flag,
        containerId:containerId
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//P7验签
function RS_VerifySignByP7(msg,signdMsg,flag){
    var url=commonUrl+"/RS_VerifySignByP7";
    var data={
        msg:msg,
        signdMsg:signdMsg,
        flag:flag
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//P1签名接口
function RS_KeySignByP1(containerId,asn1Msg){
    var url=commonUrl+"/RS_KeySignByP1";
    var data={
        containerId:containerId,
        asn1Msg:asn1Msg,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//P1验签接口
function RS_VerifySignByP1(certBase64,msg,signdMsg){
    var url=commonUrl+"/RS_VerifySignByP1";
    var data={
        certBase64:certBase64,
        msg:msg,
        signdMsg:signdMsg,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//数字信封加密接口
function RS_KeyEncryptByDigitalEnvelope(souceFilePath,encFilePath,certBase64){
    var url=commonUrl+"/RS_KeyEncryptByDigitalEnvelope";
    var data={
        souceFilePath:souceFilePath,
        encFilePath:encFilePath,
        certBase64:certBase64,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//数字信封解密接口
function RS_KeyDecryptByDigitalEnvelope(encFilePath,dncDirectoryPath,encRsKeyPath){
    var url=commonUrl+"/RS_KeyDecryptByDigitalEnvelope";
    var data={
        encFilePath:encFilePath,
        dncDirectoryPath:dncDirectoryPath,
        encRsKeyPath:encRsKeyPath,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//登录授权接口
function RS_ConfigParamsByBussSys(cmd,val){
    var url=commonUrl+"/RS_ConfigParamsByBussSys";
    var data={
        cmd:cmd,
        val:val
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//登录授权接口
function RS_CloudLoginAuth(transid){
    var url=commonUrl+"/RS_CloudLoginAuth";
    var data={
        transid:transid,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//用户退出接口
function RS_CloudLogout(userId){
    var url=commonUrl+"/RS_CloudLogout";
    var data={
        userId:userId
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//注销授权接口
function RS_CloudLogoutAuth(token){
    var url=commonUrl+"/RS_CloudLogoutAuth";
    var data={
        token:token
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//签章/撤章授权
function RS_CloudSealAuth(transid){
    var url=commonUrl+"/RS_CloudSealAuth";
    var data={
        transid:transid
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取印章列表数据接口
function RS_CloudGetSealList(token){
    var url=commonUrl+"/RS_CloudGetSealList";
    var data={
        token:token
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}


//获取授权结果接口
function RS_CloudGetAuth(transid){
    var url=commonUrl+"/RS_CloudGetAuth";
    var data={
        transid:transid
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//P7签名接口
function RS_CloudSignByP7(msg,keySn,transid,token){
    var url=commonUrl+"/RS_CloudSignByP7";
    var data={
        msg:msg,
        keySn:keySn,
        transid:transid,
        token:token
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//获取签名结果接口
function RS_CloudGetSignResult(transid){
    var url=commonUrl+"/RS_CloudGetSignResult";
    var data={
        transid:transid
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//加密授权接口
function RS_CloudEncryptAuth(transid){
    var url=commonUrl+"/RS_CloudEncryptAuth";
    var data={
        transid:transid
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//非对称加密数据接口
function RS_CloudEncryptData(symKey,transid,token){
    var url=commonUrl+"/RS_CloudEncryptData";
    var data={
        symKey:symKey,
        transid:transid,
        token:token
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//非对称加密文件接口
function RS_CloudEncryptFile(sourceFilePath,encFilePath,transid,token){
    var url=commonUrl+"/RS_CloudEncryptFile";
    var data={
        sourceFilePath:sourceFilePath,
        encFilePath:encFilePath,
        transid:transid,
        token:token
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//解密授权接口
function RS_CloudDevryptAuth(transid){
    var url=commonUrl+"/RS_CloudDevryptAuth";
    var data={
        transid:transid
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//非对称加密数据接口（base64公钥证书）
function RS_EncryptDataBase64(symKey,certBase64){
    var url=commonUrl+"/RS_EncryptDataBase64";
    var data={
        symKey:symKey,
        certBase64:certBase64
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//非对称加密文件接口（base64公钥证书）
function RS_EncryptFileBase64(sourceFilePath,encFilePath,certBase64){
    var url=commonUrl+"/RS_EncryptFileBase64";
    var data={
        sourceFilePath:sourceFilePath,
        encFilePath:encFilePath,
        certBase64:certBase64
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//非对称解密数据接口
function RS_CloudDevryptData(encSymKey,url,transid,token){
    var devryptDataUrl=commonUrl+"/RS_CloudDevryptData";
    var data={
        encSymKey:encSymKey,
        url:url,
        transid:transid,
        token:token
    };
    var result;
    ajax(devryptDataUrl, data,false,function(res) {
        result = res;
    });
    return result;
}

//非对称解密文件接口
function RS_CloudDevryptFile(encFilePath,dncFilePath,url,transid,token){
    var devryptFileUrl=commonUrl+"/RS_CloudDevryptFile";
    var data={
        encFilePath:encFilePath,
        dncFilePath:dncFilePath,
        url:url,
        transid:transid,
        token:token
    };
    var result;
    ajax(devryptFileUrl, data,false,function(res) {
        result = res;
    });
    return result;
}

//接收对称解密结果接口
function RS_CloudReceiveDevryptResult(transid,token,devResult){
    var url=commonUrl+"/RS_CloudReceiveDevryptResult";
    var data={
        transid:transid,
        token:token,
        devResult:devResult
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//获取企业证书信息接口
function RS_CloudGetCompanyCert(transid,token){
    var url=commonUrl+"/RS_CloudGetCompanyCert";
    var data={
        transid:transid,
        token:token
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取证书授权接口
function RS_CloudGetCertAuth(transid){
    var url=commonUrl+"/RS_CloudGetCertAuth";
    var data={
        transid:transid
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取证书公钥信息接口
function RS_CloudGetCertBase64(transid,token){
    var url=commonUrl+"/RS_CloudGetCertBase64";
    var data={
        transid:transid,
        token:token
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取本机mac地址及其他信息据接口
function RS_HardwareInfo(){
    var url=commonUrl2+"/RS_HardwareInfo";
    var data="";
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//获取版本号
function RS_GetVersion() {
    var url=commonUrl2+"/RS_GetVersion";
    var data="";
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取介质标识
function RS_GetKeyIdent(){
    var url=commonUrl2+"/RS_GetKeyIdent";
    var data="";
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取检测结果
function RS_GetCheckResult(keySn){
    var url=commonUrl2+"/RS_GetCheckResult";
    var data={
        keySn:keySn
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取H5签章服务器地址接口
function RS_GetH5SealUrl(keySn, url){
    var rsurl=commonUrl+"/RS_GetH5SealUrl";
    var data={
        keySn:keySn,
        url:url
    }
    var result;
    ajax(rsurl,data,false,function(res){
        result = res;
    });
    return result;
}
//获取互认助手版本号
function RS_GetHRZSVersion() {
    var url=commonUrl2+"/RS_GetHRZSVersion";
    var data="";
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//数字信封加密数据接口
function RS_KeyEncryptDataByDigitalEnvelope(dataStr,certBase64) {
    var url=commonUrl+"/RS_KeyEncryptDataByDigitalEnvelope";
    var data={
        dataStr:dataStr,
        certBase64:certBase64
    }
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//数字信封解密数据接口
function RS_KeyDecryptDataByDigitalEnvelope(encDataStr,containerId) {
    var url=commonUrl+"/RS_KeyDecryptDataByDigitalEnvelope";
    var data={
        encDataStr:encDataStr,
        containerId:containerId
    }
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//数字信封加密数据接口（云签）
function RS_EncryptDataByDigitalEnvelope(dataStr,certBase64) {
    var url=commonUrl+"/RS_EncryptDataByDigitalEnvelope";
    var data={
        dataStr:dataStr,
        certBase64:certBase64
    }
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//数字信封解密数据接口（云签）
function RS_CloudDecryptDataByDigitalEnvelope(encDataStr,url,transid,token) {
    var url=commonUrl+"/RS_CloudDecryptDataByDigitalEnvelope";
    var data={
        encDataStr:encDataStr,
        url:url,
        transid:transid,
        token:token
    }
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}