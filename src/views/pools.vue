<!-- 矿池 -->
<template lang="html">
  <div class="poolsIndex">
    <!-- 收益信息 -->
    <div class="poolBal">
      <!-- <img :src="require('@/assets/images/doubt.png')" alt=""> -->
      <!-- <p class="balTitle">{{$t('pools.reward')}}></p> -->
      <p>
        <span>{{(Number(this.apcUnClaim) + Number(this.hbgUnClaim)).toFixed(4)}}&nbsp;APC</span>
        <span>
          <button type="button" name="button" @click="claimGet">{{$t('pools.claim')}}</button>
        </span>
      </p>
    </div>
    <!-- 可操作数据列表 -->
    <div class="poolList">
      <ul>
        <li v-for="(pool,index) in poolList" :key="index">
          <p class="coinIcon">
            <span>
              <img :src="pool.icon" alt="">
            </span>
            <span>
              <img :src="pool.icon2" alt="">
            </span>
          </p>
          <p>{{pool.token0}}&nbsp;-&nbsp;{{pool.token1}}</p>
          <p>预估APY:&nbsp;{{pool.apy}}&nbsp;
            <span style="color:red;" v-if="pool.upAPY">(+{{pool.upAPY}}%)</span>
            <span style="color:red;" v-else>(+{{(0).toFixed(2)}}%)</span>
          </p>
          <p>
            {{$t('pools.reward2')}}:{{(pool.reward).toFixed(4)}}&nbsp;APC
          </p>
          <p>
            <button type="button" name="button" @click="make(index)">{{$t('pools.make')}}</button>
            <button type="button" name="button" @click="trade(index)">{{$t('pools.trade')}}</button>
          </p>
          <p>
            {{$t('pools.liquidity')}}:{{pool.stats}} {{pool.token0}}&nbsp;/&nbsp;{{pool.stats2}} {{pool.token1}}
          </p>
        </li>
      </ul>
    </div>
    <!-- 底部说明 -->
    <div class="fooPool">
      <p>{{$t('pools.pick')}}</p>
      <p>{{$t('pools.pickMes')}}</p>
    </div>
  </div>
</template>

<script>
import EosTool from '@/utils/eostool'
import {mapState} from 'vuex'
export default {
  name:'Pools',
  data(){
    return{
      poolList:[
        {
          token0:'APC',
          token1:'USDT',
          apy:'300.59%',
          reward:0,
          icon2:require('@/assets/images/apc.png'),
          icon:require('@/assets/images/usdt.png'),
          stats:0,//apc流通量
          stats2:0,//usdt流通量
        },
        {
          token0:'HBG',
          token1:'EOS',
          apy:'300.59%',
          reward:0,
          icon2:require('@/assets/images/hbg.png'),
          icon:require('@/assets/images/eos.png'),
          stats:0,//hbg流通量
          stats2:0,//eos流通量
        },
      ],
      apcUnClaim:0,//APC未领取数量
      hbgUnClaim:0,//hbg未领取数量
      comList:[],//计算列表
    }
  },
  created(){
    this.getStats();
    this.getClaim()
  },
  mounted(){
    setTimeout(()=>{
      this.comWeight()
    },1000)
  },
  computed:{
    ...mapState(['account'])
  },
  methods:{
    trade(index){//交易
      window.open(`https://hbgswap.com/swap?coin=${this.poolList[index].token0}`)
    },
    make(index){//做市
      window.open(`https://hbgswap.com/pool?coin=${this.poolList[index].token0}`)
    },
    async getStats(){//获取资金池
      const account = this.account;
      // const resultUSDT = await EosTool.getCurrencyStats('tethertether','USDT');
      let HBGParams = {
        code:'hamburgerswp',
        scope:'hamburgerswp',
        table:'pairs',
        upper_bound:2,
        lower_bound:2,
        json:true
      };
      const resultHBG = await EosTool.getTableRows(HBGParams);
      let APCparams = {
        code:'hamburgerswp',
        scope:'hamburgerswp',
        table:'pairs',
        upper_bound:37,
        lower_bound:37,
        json:true
      };
      const resultAPC = await EosTool.getTableRows(APCparams);
      this.comList.push(resultHBG[0],resultAPC[0])
      this.poolList[0].stats = (parseFloat(resultAPC[0].reserve0)).toFixed(4);
      this.poolList[0].stats2 = (parseFloat(resultAPC[0].reserve1)).toFixed(4);
      this.poolList[1].stats = (parseFloat(resultHBG[0].reserve0)).toFixed(4);
      this.poolList[1].stats2 = (parseFloat(resultHBG[0].reserve1)).toFixed(4);
      //EOS五分钟均价
      let paramsTwo = {
        code:'oracle.defi',
        scope:'oracle.defi',
        table:'avgprices',
        json:true
      };
      const result1 = await EosTool.getTableRows(paramsTwo);
      let fiveEOS;//EOS五分钟均价
      if(result1.length > 0){
        result1.forEach((e) => {
          if(e.key == 300){
            fiveEOS = (e.avg_price /10000).toFixed(4);
          }
        });
      }
      //--------->

      //APC - USDT  APY
      const APCBal = await EosTool.getCurrencyBalance(
        'apsisnetcoin','apsisrewards','APC'
      );
      if(APCBal != ''){
        // console.log(APCBal,(parseFloat(APCBal) * 86400 * 365 / 3));
        this.poolList[0].apy = (((parseFloat(APCBal)  * 365 / 14) / this.poolList[0].stats) * 100).toFixed(2) + '%'
      }else{
        this.poolList[0].apy = (0).toFixed(2) + '%'
      };
      //HBG -EOS   APY
      const HBGBal = await EosTool.getCurrencyBalance(
        'apsisnetcoin','apsishbgpool','APC'
      );
      let APCPrice = (this.poolList[0].stats2 / this.poolList[0].stats).toFixed(4);
      //APC - EOS price
      let APCToEOS =  APCPrice/fiveEOS;
      //HBG - EOS price
      let HBGToEOS = (this.poolList[1].stats2 / this.poolList[1].stats).toFixed(4)

      let HBGToAPC = ( HBGToEOS / APCToEOS).toFixed(4);//HBG - APC价格
      if(HBGBal != ''){
        // console.log(HBGBal, APCPrice, APCToEOS, HBGToEOS, HBGToAPC, this.poolList[1].stats);
        // console.log(parseFloat(HBGBal) * 365 / 14, HBGToAPC * this.poolList[1].stats);
        this.poolList[1].apy = (((parseFloat(HBGBal) * 365 / 14) / (HBGToAPC * this.poolList[1].stats)) * 100).toFixed(2) + '%'
      }else{
        this.poolList[1].apy = (0).toFixed(2) + '%'
      };
    },
    async getClaim(){//获取可领取收益
      const account = this.account;
      let params = {
        code:'pools.hbg',
        scope:1,
        upper_bound:account.name,
        lower_bound:account.name,
        table:'miners',
        json:true
      };
      let params2 = {
        code:'pools.hbg',
        scope:2,
        upper_bound:account.name,
        lower_bound:account.name,
        table:'miners',
        json:true
      }
      let poolParams = {
        code:'pools.hbg',
        scope:'pools.hbg',
        table:'pools',
        json:true
      };
      let apcParams = {
        code:'burgertokens',
        scope:'LPAK',
        table:'stat',
        json:true
      };
      let hbgParams = {
        code:'burgertokens',
        scope:'LPB',
        table:'stat',
        json:true
      };
      let accountParams = {
        code:'burgertokens',
        scope:account.name,
        table:'accounts',
        json:true
      };
      const mineResult = await EosTool.getTableRows(params);
      const mineResult2 = await EosTool.getTableRows(params2);
      const minePool = await EosTool.getTableRows(poolParams);
      const apcResult = await EosTool.getTableRows(apcParams)
      const hbgResult = await EosTool.getTableRows(hbgParams)
      const accountLPS = await EosTool.getTableRows(accountParams)
      let mineUnCliamAPC = mineResult[0]? mineResult[0].unclaimed : 0;//已结算未领取数量
      let mineUnCliamHBG = mineResult2[0]? mineResult2[0].unclaimed : 0;//已结算未领取数量
      let mineDebtAPC = mineResult[0]? mineResult[0].debt : 0;//欠债标记数值
      let mineDebtHBG = mineResult2[0]? mineResult2[0].debt : 0;//欠债标记数值
      let apcLP=0;
      let hbgLP=0;
      for(let lp of accountLPS){
        let arr = lp.balance.split(' ')
        if(arr[1] == 'LPAK'){
          apcLP = parseFloat(arr[0])
        }else if(arr[1] == 'LPB'){
          hbgLP = parseFloat(arr[0])
        }
      }
      let rewardApc,  rewardHBG;
      let acc_reward_per_share_apc,  acc_reward_per_share_hbg;
      let pendingAPC,  pendingHBG;
      let nowTime = Math.floor(Date.now() / 1000);
      const APCBal = await EosTool.getCurrencyBalance(
        "apsisnetcoin",minePool[0].balance_account,'APC'
      )
      const HBGBal = await EosTool.getCurrencyBalance(
        "apsisnetcoin",minePool[1].balance_account,'APC'
      )
      for (let row of minePool) {
        if(row.lp_code == 'LPAK'){
          rewardApc =
          (nowTime - row.last_issue_time) * (parseFloat(APCBal) * 10000 / row.divide_seconds);
          acc_reward_per_share_apc =
          parseFloat(row.acc_reward_per_share) + rewardApc * 100000000 / parseFloat(apcResult[0].supply);
          pendingAPC = apcLP * acc_reward_per_share_apc / 100000000 - mineDebtAPC;
        }else if(row.lp_code == 'LPB'){
          rewardHBG =
          (nowTime - row.last_issue_time) * (parseFloat(HBGBal) * 10000 / row.divide_seconds)

          acc_reward_per_share_hbg =
          parseFloat(row.acc_reward_per_share) + rewardHBG * 100000000 / parseFloat(hbgResult[0].supply);

          pendingHBG = hbgLP * acc_reward_per_share_hbg / 100000000 - mineDebtHBG;
        }
      }
      this.apcUnClaim = (parseFloat(mineUnCliamAPC) + pendingAPC / 10000)
      this.hbgUnClaim = (parseFloat(mineUnCliamHBG) + pendingHBG  / 10000)
      this.poolList[0].reward = this.apcUnClaim;
      this.poolList[1].reward = this.hbgUnClaim;
    },
    async claimGet(){//领取收益
      //TODO:
      const account = this.account;
      this.$toast({
        message:this.$t('toast.message1') + '...',
        forbidClick: true,
        duration:0,
        loadingType: 'spinner',
      })
      const actions = [{
        account:'pools.hbg',
        name:'claim',
        authorization:[{
          actor:account.name,
          permission:account.authority || "active"
        }],
        data:{
          owner:account.name,
        }
      }];
      const result = await EosTool.transact(actions)
      if(!result.transaction_id){
        //错误
        const res = EosTool.handleScatterError(result);
        this.$toast(res.type === "lang" ? this.$t(res.text) : res.text);
        return;
      };
      this.getClaim();
      this.$toast(this.$t('toast.message2'))

      //DoNow
      // this.$toast(this.$t('toast.message7'))
    },
    async comWeight(){//计算矿池占比
      const paramsTrademine = {
        code: "hbgtrademine",
        scope: "hbgtrademine",
        table: "pools",
        limit: 300,
        json: true,
      };
      const itemsTrademine = await EosTool.getTableRows(paramsTrademine);
      const paramsTokenpool = {
        code: "hbgtokenpool",
        scope: "hbgtokenpool",
        table: "pools",
        limit: 300,
        json: true,
      };
      const itemsTokenpool = await EosTool.getTableRows(paramsTokenpool);
      let totalWeight = 0;
      for (const row of itemsTokenpool) {
        totalWeight += row.weight;
      }
      this.comList.forEach((e)=>{
        for (const rowTrademine of itemsTrademine) {
          if (rowTrademine.pair_id == e.id) {
            this.$set(e,'weight',parseFloat(parseFloat(rowTrademine.weight).toFixed(2)))
          }else{
            this.$set(e,'weight',0)
          }
        }
        for (const rowTokenpool of itemsTokenpool) {
          if (rowTokenpool.pair_id == e.id) {
            this.$set(e,'weightProportion',rowTokenpool.weight / totalWeight);
          }
        }
      });
      let paramsTwo = {
        code:'oracle.defi',
        scope:'oracle.defi',
        table:'avgprices',
        json:true
      };
      const result1 = await EosTool.getTableRows(paramsTwo);
      this.$set(this.comList[0].token0,'coin','HBG')
      this.$set(this.comList[0].token1,'coin','EOS')
      this.$set(this.comList[1].token0,'coin','APC')
      this.$set(this.comList[1].token1,'coin','USDT')
      let hbgPrice =
        parseFloat(this.comList[0].reserve1) / parseFloat(this.comList[0].reserve0)
      this.comList.forEach((x) => {
        let priceYear = 0.005 * x.weight * hbgPrice * 86400 * 365 / 10;
        let poolEOS = 0;
        if (x.token0.coin == "EOS") {
          poolEOS = parseFloat(x.reserve0) * 2;
        }
        if (x.token1.coin == "EOS") {
          poolEOS = parseFloat(x.reserve1) * 2;
        }
        if (x.token0.coin == "APC" && x.token1.coin == "USDT") {
          // 获取EOS / USDT价格
          let avePrice = 3;
          if(result1.length > 0){
            result1.forEach((e) => {
              if(e.key == 300){
                avePrice = (e.avg_price /10000).toFixed(4);
              }
            });
          }
          let poolUSDT = parseFloat(x.reserve1) * 2
          poolEOS = poolUSDT / avePrice;
        }

        let feeRevenue = parseFloat(
          (priceYear / poolEOS) * 0.55 * 100
        ).toFixed(2);
        feeRevenue = isNaN(feeRevenue)
          ? 0
          : feeRevenue;
        let priceYear2 =
          hbgPrice * x.weightProportion * 0.02 * 86400 * 365;
        let miningRewards = parseFloat(
          (priceYear2 / poolEOS) * 100
        ).toFixed(2);
        this.$set(x,'feeRevenue',Number(feeRevenue).toFixed(2))
        this.$set(x,'miningRewards',Number(miningRewards).toFixed(2))
      });
      this.$set(this.poolList[0],'upAPY',(parseFloat(this.comList[1].feeRevenue) + parseFloat(this.comList[1].miningRewards)/2).toFixed(2))
      this.$set(this.poolList[1],'upAPY',(parseFloat(this.comList[0].feeRevenue) + parseFloat(this.comList[0].miningRewards)/2).toFixed(2))
    }
  }
}
</script>

<style lang="scss" scoped>
.poolsIndex{
  width: 100%;
  .poolBal{
    width: 100%;
    background: $getBoxBG;
    border-radius: 15px;
    position: relative;
    box-sizing: border-box;
    padding: .3rem;
    img{
      width: .4rem;
      height: .4rem;
      position: absolute;
      right:.3rem;
      top:.3rem;
    }
    .balTitle{
      width: 100%;
      text-align: left;
      font-size: $titleSize - .05;
      color:$titleColor;
    }
    p:last-child{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: .3rem;
      span{
        font-size: $titleSize + .1;
        color:white;
        font-weight: 500;
        button{
          font-weight: normal;
          font-size: $textSize;
          padding: .15rem .35rem;
          background: rgba(0,0,0,0);
          border-radius: 30px;
          border:1px solid #FFBD53;
          color:#FFBD53;
          box-sizing: border-box;
        }
      }
    }
  }
  .poolList{
    width: 100%;
    ul{
      width: 100%;
      li{
        width: 100%;
        background: $boxBG;
        border-radius: 15px;
        margin-top: .5rem;
        padding-bottom: .4rem;
        p{
          color:white;
        }
        .coinIcon{
          width: 100%;
          position: relative;
          height: 2rem;
          span{
            width: 1.6rem;
            height: 1.6rem;
            background: white;
            position: absolute;
            border-radius: 50%;
            top:.5rem;
            img{
              width: 1.1rem;
              width: 1.1rem;
              position: absolute;
              top:50%;
              margin-top: -.55rem;
              left:50%;
              margin-left: -.55rem;
            }
          }
          span:first-child{
            left:49%;
          }
          span:last-child{
            right:49%;
          }
        }
        p:nth-child(2),p:nth-child(3),p:nth-child(4){
          font-size: $titleSize;
          margin-top: .3rem;
        }
        p:nth-child(5){
          width: 100%;
          display: flex;
          justify-content: space-around;
          margin-top: .3rem;
          button{
            font-size: $textSize;
            width: 45%;
            border-radius: 30px;
            height: 1.1rem;
            background: $btnBG;
            font-weight: 500px;
          }
          button:first-child{
            color:#0DDD75;
          }
          button:last-child{
            color:#FC3A37;
          }
        }
        p:last-child{
          font-size: $textSize;
          color:$titleColor;
          margin-top: .3rem;
        }
      }
    }
  }
  .fooPool{
    width: 100%;
    text-align: center;
    font-size: $textSize;
    color:white;
    padding-top: .4rem;
    p:last-child{
      margin-top: .3rem;
      color:$titleColor;
    }
  }
}
</style>
