const { JSEncrypt } = process.client ? require('jsencrypt/bin/jsencrypt') : {};
export default {
  encryption: value => {
    if (JSEncrypt) {
      const crypt = new JSEncrypt();
      const rsaPublicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDTgTQ9BltH6I5bVGYMvlKtQgJHv+p6/H5ANZwQP1hKhFbMTWU94GfhWPCfyJpURiF5L//6NOKikQiih0h0cMfJwx3BQZp/pvv2fVqK7ilQtFaGVFlrsQ0b9hTGKxUPtdXrHvdN2ume0Wa+YMG/N5VHijI0phgW6zkwOQtzP5iLLwIDAQAB-----END PUBLIC KEY-----'
      crypt.setPublicKey(rsaPublicKey);
      //return crypt.encrypt(value);
      return value;
    }
   return undefined;
  },
  /**
   * 功能：解析URL参数
   * 参数：需要取得的参数ID
   */
  Client_URL_Request: paras => {
    let url = window.location.hash;
    while (url.indexOf('%') > -1) {
      url = decodeURIComponent(url);
    }
    const paraString = url
      .substring(url.indexOf('?') + 1, url.length)
      .split('&');
    let paraObj = {};
    for (let i = 0; i < paraString.length; i++) {
      let j = paraString[i];
      paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(
        j.indexOf('=') + 1,
        j.length
      );
    }
    let returnValue = paraObj[paras.toLowerCase()];
    return returnValue;
  },
  Server_URL_Request: (req, paras) => {
    let url = req.url;
    while (url.indexOf('%') > -1) {
      url = decodeURIComponent(url);
    }
    const paraString = url
      .substring(url.indexOf('?') + 1, url.length)
      .split('&');
    let paraObj = {};
    for (let i = 0; i < paraString.length; i++) {
      let j = paraString[i];
      paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(
        j.indexOf('=') + 1,
        j.length
      );
    }
    let returnValue = paraObj[paras.toLowerCase()];
    return returnValue;
  }
}
