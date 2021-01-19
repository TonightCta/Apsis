<!-- 债券 -->
<template lang="html">
  <div class="bondsIndedx">
    <!-- 价格信息 -->
    <div class="price">
      <p>APC&nbsp;=&nbsp;$&nbsp;{{apcPrice}}</p>
      <p>APC&nbsp;{{$t('bonds.price')}}</p>
    </div>
    <!-- 可操作数据 -->
    <div class="bondsList">
      <ul>
        <li v-for="(bonds,index) in bondsList" :key="index">
          <p>
            {{bonds.token0}}
            -
            {{bonds.token1}}
          </p>
          <p>
            <span>
              <img :src="bonds.icon" alt="">
              {{bonds.token0}}
            </span>
            <img class="icon" :src="require('@/assets/images/icon4.png')" alt="">
            <span>
              <img :src="bonds.icon2" alt="">
              {{bonds.token1}}
            </span>
          </p>
          <p>
            <button type="button" name="button" @click="operBtn(bonds.token0)">{{bonds.btnText}}</button>
            <br>
            <span v-if="bonds.token0 == 'APC'" style="fontSize:.44rem;">
              剩余可兑换APB:
              <span v-if="parseFloat(APCConvertibleBal) != 0 || parseFloat(APCConvertibleBal) < .1">&nbsp;{{APCConvertibleBal}}</span>
              <span v-else>0.0000&nbsp;APB</span>
            </span>
            <span v-if="bonds.token0 == 'APB'" style="fontSize:.44rem;">
              APB余额:
              <span v-if="parseFloat(apbBalance) != 0">&nbsp;{{apbBalance}}</span>
              <span v-else>0.0000&nbsp;APB</span>
            </span>
            <span class="btnMask" v-if="bonds.maskRef"></span>
          </p>
          <p v-if="bonds.token1 == 'APC'">APC{{$t('bonds.price')}}&nbsp;>&nbsp;$1.05&nbsp;&&nbsp;APB{{$t('public.bal')}}&nbsp;>&nbsp;0</p>
          <p v-else>APC{{$t('bonds.price')}}&nbsp;<&nbsp;$1</p>
        </li>
      </ul>
    </div>
    <!-- 底部说明 -->
    <div class="fooBonds">
      <p>{{$t('pools.fooTitle')}}</p>
      <p>{{$t('pools.fooText')}}</p>
    </div>
    <div class="mask" ref="mask" @click="closePu"></div>
    <!-- APC买入APB -->
    <div class="purchaseBox" ref="purchaseBox" v-if="apcBox">
      <div class="inpBox">
        <p>Purchase</p>
        <p class="bla" @click="purNumAPC = (apcBalance).toFixed(4)">{{(apcBalance).toFixed(4)}}&nbsp;APC</p>
        <p>
          <input type="number" name="" value="" v-model="purNumAPC">
        </p>
        <p>
          <button type="button" name="button" @click="closePu">{{$t('popup.cancel')}}</button>
          <button type="button" name="button" @click="subAPC">{{$t('popup.purchase')}}</button>
        </p>
      </div>
    </div>
    <!-- APB买入APC -->
    <div class="purchaseBox" ref="purchaseBox" v-if="apbBox">
      <div class="inpBox">
        <p>Purchase</p>
        <p class="bla" @click="purNumAPB = (apbBalance).toFixed(4)">{{(apbBalance).toFixed(4)}}&nbsp;APB</p>
        <p>
          <input type="number" name="" value="" v-model="purNumAPB">
        </p>
        <p>
          <button type="button" name="button" @click="closePu">{{$t('popup.cancel')}}</button>
          <button type="button" name="button" @click="subAPB">{{$t('popup.purchase')}}</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import EosTool from '@/utils/eostool'
// import Popup from '@/components/popup'
import {mapState} from 'vuex'
export default {
  name:'Bonds',
  data(){
    return{
      bondsList:[
        {
          token0:'APC',
          token1:'APB',
          icon:require('@/assets/images/apc.png'),
          icon2:require('@/assets/images/apb.png'),
          btnText:'Purchase',
          maskRef:true,
        },
        {
          token0:'APB',
          token1:'APC',
          icon:require('@/assets/images/apb.png'),
          icon2:require('@/assets/images/apc.png'),
          btnText:'Redeem',
          maskRef:true,
        },
      ],
      purNumAPC:0,//操作APC数量
      purNumAPB:0,//操作APB数量
      apcBox:false,//APC买入盒子
      apbBox:false,//APB买入盒子
      apcPrice:0,//apc价格
      apcBalance:0,//APC余额
      apbBalance:0,//APB余额
      APCConvertibleBal:0,//APB可兑换余额
    }
  },
  created(){
    this.getApcPrice()//获取APB价格
    this.getBalance()//获取用户APB/APB余额
    setInterval(() => {
      this.getApcPrice()//获取APB价格
    },1000 * 60 * 60)
  },
  mounted(){

  },
  computed:{
    ...mapState(['account'])
  },
  methods:{
    async getApcPrice(){//获取APB价格
      let APCParams = {
        code:'oracle.hbg',
        scope:37,
        table:'prices',
        json:true,
        limit:500
      };
      const resultAPC = await EosTool.getTableRows(APCParams)
      resultAPC.forEach(e => {
        if(e.seconds == 300){
          this.apcPrice = e.twa_price / 10000
        }
      });
      //查询可兑换APB余额
      const apbAllBal = await EosTool.getCurrencyBalance(
        'apsisnetcoin','apsisnetbank','APB'
      )
      if(apbAllBal != ''){
        this.APCConvertibleBal = apbAllBal
      }else{
        this.APCConvertibleBal = 0;
      }
      if(parseFloat(this.apcPrice) < 1 && parseFloat(this.APCConvertibleBal) > .1){
        this.bondsList[0].maskRef = false;
      };
      if(parseFloat(this.apcPrice) > 1.05){
        this.bondsList[1].maskRef = false;
      }
    },
    operBtn(type){//操作盒子
      this.$refs.mask.style.display = 'block';
      setTimeout(() => {
        this.$refs.mask.style.opacity = '1';
      })
      if( type == 'APC' ){
        this.apcBox = true;
      }else{
        this.apbBox = true;
      }
      setTimeout(() => {
        this.$refs.purchaseBox.style.opacity = '1';
      },100)
    },
    async getBalance(){//获取用户余额
      const account = this.account;
      const APCBal = await EosTool.getCurrencyBalance(
        'apsisnetcoin',account.name,'APC'
      );
      const APBBal = await EosTool.getCurrencyBalance(
        'apsisnetcoin',account.name,'APB'
      );
      if(APCBal == ''){
        this.apcBalance = 0;
      }else{
        this.apcBalance = parseFloat(APCBal)
      }
      if(APBBal == ''){
        this.apbBalance = 0;
      }else{
        this.apbBalance = parseFloat(APBBal)
      }

    },
    closePu(){//关闭操作盒子
      this.$refs.mask.style.opacity = '0';
      setTimeout(() => {
        this.$refs.mask.style.display = 'none';
      },400)
      this.apcBox = false;
      this.apbBox = false;
    },
    async subAPC(){//提交APC买入APB
      const account = this.account;
      if(this.purNumAPC == 0){
        this.$toast(this.$t('toast.message4'))
      }else if(this.purNumAPC > this.apcBalance){
        this.$toast(this.$t('toast.message5'))
      }else{
        this.$toast.loading({
          message:this.$t('toast.message3') + '...',
          forbidClick: true,
          duration:0,
          loadingType: 'spinner',
        });
        let operNum = Number(this.purNumAPC).toFixed(4) + ' APC'
        const actions = [{
          account:'apsisnetcoin',
          name:'transfer',
          authorization:[{
            actor:account.name,
            permission:account.authority || 'active'
          }],
          data:{
            from:account.name,
            to:'apsisnetbank',
            quantity:operNum,
            memo:''
          }
        }];
        let result = await EosTool.transact(actions)
        if (!result.transaction_id) {
          // 错误信息
          const res = EosTool.handleScatterError(result);
          this.$toast(res.type === "lang" ? this.$t(res.text) : res.text);
          return;
        };
        this.getBalance();
        this.closePu()
        this.$toast(this.$t('toast.message2'));
      }
    },
    async subAPB(){//提交APB买入APC
      const account = this.account;
      if(this.purNumAPB == 0){
        this.$toast(this.$t('toast.message4'))
      }else if(this.purNumAPB > this.apbBalance){
        this.$toast(this.$t('toast.message6'))
      }else{
        this.$toast.loading({
          message: this.$t('toast.message3') + '...',
          forbidClick: true,
          duration:0,
          loadingType: 'spinner',
        });
        let operNum = Number(this.purNumAPB).toFixed(4) + ' APB'
        const actions = [{
          account:'apsisnetcoin',
          name:'transfer',
          authorization:[{
            actor:account.name,
            permission:account.authority || 'active'
          }],
          data:{
            from:account.name,
            to:'apsisnetbank',
            quantity:operNum,
            memo:''
          }
        }];
        let result = await EosTool.transact(actions)
        if (!result.transaction_id) {
          // 错误信息
          const res = EosTool.handleScatterError(result);
          this.$toast(res.type === "lang" ? this.$t(res.text) : res.text);
          return;
        };
        this.getBalance()
        this.closePu()
        this.$toast(this.$t('toast.message2'));
      }
    },
  },
  // components:{Popup}
}
</script>

<style lang="scss" scoped>
.bondsIndedx{
  width: 100%;
  color:white;
  .price{
    background: $boxBG;
    border-radius: 15px;
    font-size: $titleSize;
    padding: .4rem 0;
    p{
      color:$titleColor;
    }
    p:first-child{
      color:white;
      font-size: $titleSize + .1;
      font-weight: 500;
      margin-bottom: .1rem;
    }
  }
  .bondsList{
    width: 100%;
    margin-top: .3rem;
    ul{
      li{
        background: $boxBG;
        border-radius: 15px;
        margin-top: .4rem;
        box-sizing: border-box;
        padding-top: .5rem;
        padding-bottom: .3rem;
        p:first-child{
          font-size: $titleSize;
          margin-bottom: .5rem;
        }
        p:nth-child(2){
          width: 85%;
          margin:0 auto;
          display: flex;
          justify-content: space-around;
          position: relative;
          .icon{
            width: 1rem;
            height: 1rem;
            position: absolute;
            top:.3rem;
          }
          span{
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: $titleSize;
            img{
              width: 100%;
              width: 1.6rem;
              border:10px solid white;
              height: 1.6rem;
              border-radius: 50%;
              background: white;
              margin-bottom: .2rem;
            }
          }
        }
        p:nth-child(3){
          margin-top: .5rem;
          text-align: center;
          position: relative;
          .btnMask{
            width: 85%;
            border-radius: 30px;
            height: 1.3rem;
            display: inline-block;
            position: absolute;
            background: rgba(0,0,0,.4);
            left:50%;
            margin-left: -42.5%;
            top:.15rem;
          }
          button{
            width: 85%;
            border-radius: 30px;
            height: 1.3rem;
            font-size: $textSize;
            color:$themeColor;
            background: $btnBG;
          }
        }
        p:last-child{
          font-size: $textSize;
          color:$titleColor;
          margin: .4rem 0;
        }
      }
    }
  }
  .fooBonds{
    text-align: center;
    color:$titleColor;
    font-size: $textSize;
    p:first-child{
      font-size: $titleSize;
      font-weight: 500;
      color:white;
      margin-top: .4rem;
      margin-bottom: .3rem;
    }
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
    opacity: 0;
    transition: .5s all;
    display: none;
  }
  .purchaseBox{
    transition: .5s all;
    z-index: 200;
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
    .inpBox{
      width: 90%;
      height: 5.2rem;
      background: $boxBG;
      position: fixed;
      top:50%;
      margin-top: -2.5rem;
      left:50%;
      margin-left: -45%;
      border-radius: 10px;
      p{
        width: 92%;
        margin:0 auto;
      }
      p:first-child{
        font-size: .5rem;
        text-align: center;
        line-height: 1rem;
      }
      p:nth-child(2){
        font-size: .44rem;
        text-align: right;
        color:$titleColor;
      }
      p:nth-child(3){
        margin-top: .2rem;
        input{
          width: 100%;
          height: 1.2rem;
          border-radius: 10px;
          color:black;
          box-sizing: border-box;
          padding-left: .3rem;
          font-size: .5rem;
        }
      }
      p:last-child{
        width: 100%;
        margin-top:.3rem;
        button{
          width: 45%;
          font-size: .45rem;
          font-weight: 500;
          height: 1.1rem;
          background: $btnBG;
          border-radius: 10px;
        }
        button:first-child{
          color:#b41313;
        }
        button:last-child{
          color:$themeColor;
        }
      }
    }
  }
}
</style>
