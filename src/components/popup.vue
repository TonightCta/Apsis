<!-- 输入弹框 -->
<template lang="html">
  <div class="purchaseBox">
    <div class="mask"></div>
    <div class="inpBox">
      <p>Purchase</p>
      <p class="bla">0.0000&nbsp;APC</p>
      <p>
        <input type="number" name="" value="" v-model="purNum">
      </p>
      <p>
        <button type="button" name="button">{{$t('popup.cancel')}}</button>
        <button type="button" name="button">{{$t('popup.purchase')}}</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name:'Popup',
  data(){
    return{
      purNum:0,//操作数量
    }
  }
}
</script>

<style lang="scss" scoped>
.purchaseBox{
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
  }
  .inpBox{
    width: 90%;
    height: 5.2rem;
    background: $boxBG;
    z-index: 200;
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
        padding-left: .2rem;
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
        color:red;
      }
      button:last-child{
        color:$themeColor;
      }
    }
  }
}
</style>
