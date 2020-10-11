const oHtml = document.getElementsByTagName('html')[0]
const clientWidth = oHtml.clientWidth;

// 320px的屏幕基准像素为10px
if(clientWidth < 1366) {
  oHtml.style.fontSize = 10 * (clientWidth / 320) + "px";
  _isMoblie = true;
} else {
  oHtml.style.fontSize = "10px";
  _isMoblie = false;
}
