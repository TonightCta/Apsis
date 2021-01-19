<!-- 头部导航 -->
<template lang="html">
  <div class="headerIndex">
    <p class="loginMes">
      <img :src="require('@/assets/images/user.png')" alt="" class="userIcon">
      <span @click="onLoginLogoutClick">
        <i v-if="account.name">{{account.name}}</i>
        <i v-else class="unLogin">未登录</i>
      </span>
      <img v-if="language == 'zh-CN'" :src="require('@/assets/images/en.png')" alt="" class="langIcon" @click="changeLang">
      <img v-else :src="require('@/assets/images/ch.png')" alt="" class="langIcon" @click="changeLang">
    </p>
    <div class="" style="width:95%;margin:0 auto;display:flex;justify-content:space-between;">
      <img :src="require('@/assets/images/logo.png')" alt="">
      <div class="tabList">
        <!-- <van-tabs v-model="tabActive"
          background="rgba(0,0,0,0)"
          title-active-color="#FFA300"
          color="#FFA300"
          title-inactive-color="white"
          title-class="tabListMes"
          @tabs-default-color="blue"
        >
          <van-tab v-for="(tab,index) in tabList" :key="index" :to="tab.url" :title="tab.title"></van-tab>
        </van-tabs> -->
        <ul>
          <router-link to="/page" :class="{tabActive:tabActive == 0}" tag="li" @click.native="acRoute(0)" >{{$t('header.home')}}</router-link>
          <router-link to="/pools" :class="{tabActive:tabActive == 1}" tag="li" @click.native="acRoute(1)" >{{$t('header.pools')}}</router-link>
          <router-link to="/bonds" :class="{tabActive:tabActive == 2}" tag="li" @click.native="acRoute(2)" >{{$t('header.bonds')}}</router-link>
          <router-link to="/about" :class="{tabActive:tabActive == 3}" tag="li" @click.native="acRoute(3)" >{{$t('header.about')}}</router-link>
        </ul>
      </div>
    </div>
    <!-- <LangBtn/> -->
  </div>
</template>

<script>
import LangBtn from '@/components/langBtn'
import EosTool from '@/utils/eostool'
import {mapState} from 'vuex'
export default {
  name:'Header',
  data(){
    return{
      tabActive:10,//tab选中下标
    }
  },
  created(){
    setTimeout(() => {
      if(this.$route.name == 'Page'){
        this.tabActive = 0;
      }else if(this.$route.name == 'Pools'){
        this.tabActive = 1;
      }else if(this.$route.name == 'Bonds'){
        this.tabActive = 2;
      }else if(this.$route.name == 'About'){
        this.tabActive = 3;
      }
    },300)
    if(!this.account.name){
      this.onLoginLogoutClick()
    }
  },
  computed:{
    ...mapState(['account','language'])
    // tabList(){//tab列表
    //   return [
    //     {
    //       title:this.$t('header.home'),
    //       url:'/page'
    //     },
    //     {
    //       title:this.$t('header.pools'),
    //       url:'/pools'
    //     },
    //     {
    //       title:this.$t('header.bonds'),
    //       url:'/bonds'
    //     },
    //     {
    //       title:this.$t('header.about'),
    //       url:'/about'
    //     }
    //   ]
    // }
  },
  components:{
    LangBtn
  },
  methods:{
    acRoute(va){
      this.tabActive = va;
    },
    async onLoginLogoutClick() {//登录
      if (this.$store.state.account.name) {
        await EosTool.logout();
        this.$store.dispatch('setAccount', {});
      } else {
        const account = await EosTool.login();
        if (account) {
          this.$store.dispatch('setAccount', account || {});
        }
      }
    },
    changeLang(){//切换语言
      const lang = this.$store.state.language == 'en' ? 'zh-CN' : 'en';
      this.$store.dispatch('setLanguage', lang);
      this.$i18n.locale = lang;
    },
  }
}
</script>

<style lang="scss" scoped>
.headerIndex{
  width: 100%;
  margin-top: .1rem;
  height: 2.8rem;
  background: rgba(0,0,0,0);
  .loginMes{
    background: $boxBG;
    width: 100%;
    height: 1.1rem;
    text-align: center;
    font-size: .5rem;
    line-height: 1.1rem;
    position: relative;
    color:white;
    box-sizing: border-box;
    padding-left: .4rem;
    margin-bottom: .2rem;
    span{
      .unLogin{
        font-size: .4rem;
        color:$themeColor;
        text-decoration: underline;
      }
    }
    .userIcon{
      width: .7rem;
      height: .7rem;
      position: absolute;
      left:.5rem;
      top:.2rem;
    }
    .langIcon{
      position: absolute;
      right:.5rem;
      top:.2rem;
      width: .8rem;
      height: .8rem;
    }
  }
  img{
    width: 1.3rem;
    height: 1.3rem;
  }
  .tabList{
    width: 75%;
    height: 1.4rem;
    ul{
      width: 100%;
      display: flex;
      font-size: $titleSize - .05;
      li{
        width: 25%;
        text-align: center;
        line-height: 1.4rem;
        color:white;
        transition: .5s all;
        font-weight: 500;
        cursor:pointer;
      }
    }
  }
}
.tabActive{
  color:$themeColor!important;
}
</style>
