<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-27 14:27:35
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-04 17:39:01
 -->
 <template>
  <div>
    <div v-if="!openAdd&&addressObj"
      class="orderAddress">
      <span class="icon">
        <img :src="addressIcon"
          alt="icon">
      </span>
      <div class="info">
        <div class="nameTel">
          <span class="label">
            {{addressObj.receiver}}
          </span>
          <span class="text">
            {{addressObj.mobile}}
          </span>
        </div>
        <div class="addressInfo">
          <div class="label">
            配送地址：
          </div>
          <div class="text">
            {{addressObj.city}}{{addressObj.province}}{{addressObj.area}}{{addressObj.address}}
          </div>
        </div>
      </div>
    </div>
    <div v-else
      class="addAddress">
      <van-form @submit="onSubmit"
        @failed='failed'
        label-align='left'
        ref="addAddress"
        class="addAddressForm">
        <div class="formItem"
          v-for="(item,index) in baseInfoFromConfig"
          :key="index">
          <van-field v-if="item.type==='input'"
            v-model="baseInfoFrom[index]"
            :name="index"
            :label="baseInfoFromConfig[index].label"
            :placeholder="baseInfoFromConfig[index].placeholder"
            :rules="baseInfoFromConfig[index].rules" />
          <van-field v-if="item.type==='tel'"
            v-model="baseInfoFrom[index]"
            :name="index"
            v-bind='[...item]'
            :label="baseInfoFromConfig[index].label"
            :placeholder="baseInfoFromConfig[index].placeholder"
            :rules="baseInfoFromConfig[index].rules" />
          <van-field v-if="item.type==='select'"
            :name="index"
            :value="baseInfoFrom[index]"
            disabled
            :label="baseInfoFromConfig[index].label"
            :placeholder="baseInfoFromConfig[index].placeholder"
            :rules="baseInfoFromConfig[index].rules"
            @click="showArea = true" />
          <van-popup v-model="showArea"
            position="bottom">
            <van-area :area-list="areaList"
              @confirm="onConfirm"
              @cancel="showArea = false" />
          </van-popup>
        </div>
      </van-form>
    </div>
  </div>

</template>
<script>
import addressIcon from '@images/addressIcon.png'
import { areaList } from '@/utils/selectData.js'
import { validate } from '@/utils/validate'
import { Area, Field, Form, Button, Cell, Popup, Switch } from 'vant'
export default {
  name: 'orderAddress',
  components: {
    [Area.name]: Area,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Switch.name]: Switch,
    [Cell.name]: Cell
  },
  data() {
    return {
      addressIcon,
      showArea: false,
      areaList,
      receive_address_id: '',
      baseInfoFrom: {
        receiver: '',
        mobile: '',
        areaPlace: '',
        address: ''
      },
      baseInfoFromConfig: {
        receiver: {
          label: '收货人',
          type: 'input',
          placeholder: '快递员对您的称呼',
          rules: [
            { message: '收货人不能为空', required: true }
            // { validator: validate.verifyChinsesName, message: '姓名格式错误' }
          ]
        },
        mobile: {
          label: '手机号码',
          type: 'tel',
          placeholder: '方便快递员联系您',
          maxLength: '11',
          rules: [
            { message: '手机号码不能为空', required: true },
            { validator: validate.verifyPhone, message: '手机号码格式错误' }
          ]
        },
        areaPlace: {
          label: '所在地区',
          type: 'select',
          placeholder: '请点击选择',
          rules: [{ message: '请选择所在地区', required: true }]
        },
        address: {
          label: '详细地址',
          type: 'input',
          placeholder: '详细到街道、单元、门牌号 ',
          rules: [{ message: '联系地址不能为空', required: true }]
        }
      },
      otherData: {}
    }
  },
  props: {
    addressObj: {
      type: Object,
      default: null
    },
    openAdd: {
      type: Boolean,
      default: false
    },
    enable: {
      type: Number,
      default: 2
    },
    addressDetail: {
      type: Object
    }
  },
  methods: {
    //验证失败事件
    failed(value) {
      this.$showMsg(value.errors[0].message)
    },
    // 提交表单
    onSubmit(value) {
      let { receiver, mobile, areaPlace, address } = this.baseInfoFrom
      let arr = areaPlace.split('/')
      if (['北京市', '重庆市', '天津市'].includes(arr[0])) {
        arr.unshift(arr[0])
      }
      let params = {
        receiver,
        mobile,
        city: arr[0],
        area: arr[1],
        province: arr[2],
        address,
        enable: this.enable
      }
      let api = 'CreateReceiveAddress'
      if (this.baseInfoFrom.receive_address_id) {
        ;(api = 'UpdateReceiveAddress'),
          (params.receive_address_id = this.baseInfoFrom.receive_address_id)
      }

      this.$api[api](params).then(res => {
        this.$emit('submitSucc', res)
      })
    },
    triggerSubmit() {
      this.$refs['addAddress'].submit()
    },
    //地区
    onConfirm(values) {
      this.baseInfoFrom.areaPlace = [
        ...new Set(values.map(item => item.name))
      ].join('/')
      this.showArea = false
    }
  },
  watch: {
    addressDetail(newVal, oldVal) {
      this.baseInfoFrom = newVal
    }
  }
}
</script>
<style lang="less" scoped>
//有数据的时候展示
.orderAddress {
  .block();
  display: flex;
  .icon {
    width: 25px;
    height: 25px;
    img {
      width: 100%;
      height: 100%;
    }
    margin-right: 20px;
  }
  .info {
    .nameTel,
    .addressInfo {
      display: flex;
      justify-content: flex-start;
      .label {
        width: 140px;
      }
      .text {
        flex: 1;
      }
    }
    .nameTel {
      font-size: 28px;
      font-weight: 500;
      color: @fontColorDark;
      line-height: 30px;
      margin-bottom: 20px;
    }
    .addressInfo {
      font-size: 26px;
      color: @fontColorNormal;
      line-height: 43px;
    }
  }
}
</style>
<style lang="less" >
.addAddress {
  .block(0 31px);
  .addAddressForm {
    .formItem {
      .border();
    }
    .formItem:first-child {
      border-top: none;
    }
    .van-cell {
      font-size: 26px;
      padding: 29px 0;
      .van-field__error-message {
        display: none;
      }
      .van-field__label,
      .van-field__control,
      .van-field__label > span {
        line-height: 40px;
        height: 40px;
        display: inline-block;
      }
    }
  }
}
</style>

