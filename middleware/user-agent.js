export default function (context) {
    let isMobile = (ua) => {
      return !!ua.match(/AppleWebKit.*Mobile.*/)
    };
    let userAgent = context.req ? context.req.headers['user-agent'] : navigator.userAgent || '',
        isWindowsPhone = /(?:Windows Phone)/.test(userAgent),
        isSymbian = /(?:SymbianOS)/.test(userAgent) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(userAgent),
        isFireFox = /(?:Firefox)/.test(userAgent),
        isChrome = /(?:Chrome|CriOS)/.test(userAgent),
        isTablet = /(?:iPad|PlayBook)/.test(userAgent) || (isAndroid && !/(?:Mobile)/.test(userAgent)) || (isFireFox && /(?:Tablet)/.test(userAgent)),
        isPhone = /(?:iPhone)/.test(userAgent) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    isTablet = /(?:iPad|PlayBook)/.test(userAgent) || (isAndroid && !/(?:Mobile)/.test(userAgent)) || (isFireFox && /(?:Tablet)/.test(userAgent)),
    // return isMobile(userAgent) ? redirect(mobileOrigin + route.fullPath) : redirect(pcOrigin + route.fullPath)
    // 给上下文对象增加 userAgent 属性（增加的属性可在 `asyncData` 和 `fetch` 方法中获取）
    context.isMobile =  isMobile(userAgent) && !isTablet;
  }