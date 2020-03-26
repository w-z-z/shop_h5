import
common
from '../common'

/*
 * @Description: 自定义指令
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-02 15:34:42
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-05 11:51:41
 */
// 金钱
let money = (val = 0) => {
  val = val.toString().replace(/\$|\,/g, '')
  if (isNaN(val)) {
    val = '0'
  }
  let sign = (val == (val = Math.abs(val)))
  val = Math.floor(val * 100 + 0.50000000001)
  let cents = val % 100
  val = Math.floor(val / 100).toString()
  if (cents < 10) {
    cents = '0' + cents
  }
  for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3))
  }

  return (((sign) ? '' : '-') + val + '.' + cents)
}
//时间格式化
let FormatDate = (val, type = 'yyyy.MM.dd') => {
  return common.getFormat(type, val * 1000)
}
let orderStatus = val => {
  let obj = {
    1: '待付款',
    2: '已取消',
    3: '待发货',
    4: '已发货',
    5: '已完成',
    6: '待退款',
    7: '已退款'
  }
  return obj[val]
}
export {
  money,
  FormatDate,
  orderStatus,
}