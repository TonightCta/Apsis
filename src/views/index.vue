<!-- 首页 -->
<template lang="html">
  <div class="pageIndex">
    <div class="pagePrice">
      <!-- 价格信息 -->
      <ul>
        <li>
          <p>{{$t('page.next')}}</p>
          <p>
            <van-count-down millisecond :time="time * 1000" format="HH:mm:ss:SS" style="color:white;fontSize:.5rem;" />
          </p>
          <p>
            <van-count-down use-slot ref="countDown" :time="time * 1000" @change="onTimeChange">
              <van-progress :show-pivot="false" color="#FFA300" :percentage="percentage" />
            </van-count-down>
          </p>
        </li>
        <li>
          <p>
            APC {{$t('bonds.price')}}<span style="fontSize:.36rem">({{$t('page.fivePrice')}})</span>
          </p>
          <p>
            <span v-if="loadPrice"><van-loading color="#FFA300" /></span>
            <span v-else>{{pageList[0].price}}</span>
          </p>
        </li>
      </ul>
    </div>
    <!-- 基准按钮 -->
    <!-- <p class="reBtn">
      <button type="button" name="button">Rebase</button>
    </p> -->
    <!-- 价格列表 -->
    <div class="pageList">
      <ul>
        <li v-for="(pa,index) in pageList" :key="index">
          <p class="title">{{pa.title}}</p>
          <div class="paMes">
            <div class="paIcon">
              <img :src="pa.icon" alt="">
            </div>
            <div class="numMes">
              <p>
                <span>{{pa.priceTitle}}</span>
                <span>
                  <i v-if="loadPrice"><van-loading color="#FFA300" size="20" /></i>
                  <i v-else>{{pa.price}}</i>
                </span>
              </p>
              <p>
                <span>{{pa.numTitle}}</span>
                <span>
                  <i v-if="loadPrice"><van-loading color="#FFA300" size="20" /></i>
                  <i v-else>{{(pa.num).toFixed(4)}}</i>
                </span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部说明 -->
    <div class="footerText">
      <p>{{$t('page.fooTitle')}}</p>
      <p>{{$t('page.fooText')}}</p>
    </div>
  </div>
</template>

<script>
import EosTool from '@/utils/eostool'
import {mapState} from 'vuex'
export default {
  name:'Page',
  data(){
    return{
      percentage:100, // 进度百分比
    	time:3600 * 8, // 单位秒
      date_h:null,//倒计时小时
      date_m:null,//倒计时分钟
      date_s:null,//倒计时秒
      date_ms:null,//倒计时毫秒
      loadPrice:true,
    }
  },
  computed:{
    ...mapState(['account']),
    pageList(){//币种列表
      return [
        {
          title:'Apsis Cash',
          priceTitle:this.$t('page.priceTitle'),
          numTitle:this.$t('page.numTitle'),
          icon:require('@/assets/images/apc.png'),
          price:'$ 0',
          num:0
        },
        {
          title:'Apsis Share(HBG)',
          priceTitle:this.$t('page.priceTitle'),
          numTitle:this.$t('page.numTitle2'),
          icon:require('@/assets/images/hbg.png'),
          price:'0 EOS',
          num:0
        },
        // {
        //   title:'AP Cash',
        //   priceTitle:this.$t('page.priceTitle'),
        //   numTitle:this.$t('page.numTitle2'),
        //   icon:require('@/assets/images/icon3.png'),
        //   price:7.56,
        //   num:292522.8786
        // },
      ]
    }
  },
  created(){
    this.getPrice();
    let serverTime = Date.now();
    this.time = 3600 * 8 - parseInt(serverTime/1000) % (3600 * 8);
  },
  watch:{
    time(val,oldVal){
      if(val == 0){
        this.time = 3600 * 8;
      }
    }
  },
  methods:{
    onTimeChange (e) {//进度条倒计时
      let { days, hours, minutes, seconds } = e
      // 时间换成成毫秒
      let totalMilliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000
      let percentage = totalMilliseconds / (3600000 * 8) * 100
      this.percentage = percentage
    },
    async getPrice(){//获取价格
      this.loadPrice = true;
      let params = {
        code:'hamburgerswp',
        scope:'hamburgerswp',
        table:'pairs',
        upper_bound:2,
        lower_bound:2,
        json:true,
        limit:500
      };
      let APCParams = {
        code:'oracle.hbg',
        scope:37,
        table:'prices',
        json:true,
        limit:500
      };
      let APCNum = {
        code:'apsisnetcoin',
        scope:'APC',
        table:'stat',
        json:true
      };
      const result = await EosTool.getTableRows(params);
      const resultHBG = await EosTool.getCurrencyStats('hbgdefitoken','HBG');
      const resultAPC = await EosTool.getTableRows(APCParams)
      const resultAPCN = await EosTool.getTableRows(APCNum)
      this.pageList[1].num = parseFloat(resultHBG.HBG.supply)
      this.pageList[1].price = (parseFloat(result[0].reserve1) / parseFloat(result[0].reserve0)).toFixed(4) + ' EOS'
      resultAPC.forEach(e => {
        if(e.seconds == 300){
          this.pageList[0].price = '$ ' + e.twa_price / 10000
        }
      });
      this.pageList[0].num = parseFloat(resultAPCN[0].supply)
      this.loadPrice = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.pageIndex{
  width: 100%;
  .pagePrice{
    width: 100%;
    margin-top: .1rem;
    ul{
      width: 100%;
      height: 100%;
      li{
        width: 100%;
        height: 100%;
        background: $boxBG;
        border-radius: 15px;
        font-size: $titleSize;
        color:white;
        box-sizing: border-box;
        padding-top: .2rem;
        padding-bottom: .3rem;
        margin-bottom: .4rem;
        p:first-child{
          color:$titleColor;
        }
      }
      li:first-child{
        p:last-child{
          width: 80%;
          margin:0 auto;
        }
        p:nth-child(2){
          margin-top: .3rem;
          margin-bottom: .4rem;
        }
      }
      li:last-child{
        p:last-child{
          font-size:  $titleSize + .1;
          font-weight: bold;
          margin-top: .2rem;
        }
      }
    }
  }
  .reBtn{
    width: 100%;
    height: 1.2rem;
    line-height: 0;
    margin-top: .8rem;
    button{
      width: 100%;
      height: 100%;
      font-size: $titleSize + .05;
      color:white;
      border-radius: 30px;
      background: linear-gradient(90deg, #FFBD53 0%, #FFA300 100%);
    }
  }
  .pageList{
    width: 100%;
    color:white;
    .title{
      font-size: $titleSize;
      width: 100%;
      text-align: left;
      margin-top: .2rem;
    }
    .paMes{
      width: 100%;
      background: $boxBG;
      margin-top: .4rem;
      border-radius: 15px;
      // box-sizing: border-box;
      padding-top: .6rem;
      padding-bottom: .5rem;
      .paIcon{
        width: 1.8rem;
        height: 1.8rem;
        background: #1D0900;
        margin:0 auto;
        position: relative;
        border-radius: 50%;
        img{
          position: absolute;
          width: 1.2rem;
          height: 1.2rem;
          left:50%;
          margin-left: -.6rem;
          top:50%;
          margin-top: -.6rem;
        }
      }
    }
    .numMes{
      width: 100%;
      display: flex;
      p{
        width: 50%;
        text-align: center;
        font-size: $titleSize - .05;
        display: flex;
        flex-direction: column;
        margin-top: .6rem;
        span:first-child{
          margin-bottom: .3rem;
          color:$titleColor;
        }
      }
    }
  }
  .footerText{
    width: 100%;
    text-align: center;
    color:white;
    p:first-child{
      font-size: $titleSize + .05;
      line-height: 1.8rem;
    }
    p:last-child{
      font-size: $textSize + .05;
      margin-top: -.1rem;
      color:$titleColor;
    }
  }
}
</style>
