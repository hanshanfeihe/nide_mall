function recalc () {
  var h = document.querySelector('html')
  // w代表实际宽度,获取当前屏幕可视区域大小
  var w = document.documentElement.clientWidth
  console.log(w)
  // 来动态设置html根标签的字体大小
  if (w >= 750) {
    h.style.fontSize = '37.5px'
  } else {
    h.style.fontSize = w / 10 + 'px'
  }
}
window.addEventListener('resize', recalc, false)
document.addEventListener('DOMContentLoaded', recalc, false)
