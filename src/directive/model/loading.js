/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-05 13:54:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-06 16:37:10
 */
import loading from '../../assets/img/loading.gif'
export default {
  bind: (el, binding) => {
    // console.log('bind', el, binding)
    // 遮罩层
    const modal = document.createElement('div')
    modal.className = 'modal-loading'
    // 遮罩层动画
    const animation = document.createElement('div')
    animation.className = 'modal-loading-animation'
    let img = document.createElement('img')
    img.setAttribute('src', loading)
    animation.appendChild(img)
    modal.appendChild(animation)
    // 自定义的 loadingElement 属性/其他, 下面钩子函数可以使用;
    el.loadingElement = modal

    const curStyle = window.getComputedStyle(el)
    const position = curStyle.position

    if (position === 'absolute' || position === 'relative') {
      el.style.position = position
    } else {
      el.style.position = 'relative'
    }

    if (binding.value) {
      el.appendChild(modal)
    }
  },
  update: (el, binding) => {
    // console.log('update', el, binding)
    if (binding.value) {
      if (el.loadingElement.parentNode === null) {
        el.appendChild(el.loadingElement)
      }
    } else {
      if (el === el.loadingElement.parentNode) {
        el.removeChild(el.loadingElement)
      }
    }
  },
  unbind: (el) => {
    if (el.loadingElement.parentNode === el) {
      el.removeChild(el.loadingElement)
    }
    el.loadingElement = null
  }
}