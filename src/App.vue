<template>
  <div id="app">
    <Header/>
    <div class="w95">
      <!-- <transition :name="transitionName"> -->
        <!-- <div class="w95"> -->
          <router-view/>
        <!-- </div> -->
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import EosTool from '@/utils/eostool'
export default {
  name: 'App',
  components:{Header},
  data(){
    return{
      transitionName:''
    }
  },
  watch:{
    $route(to,from){
     if(to.meta.index>from.meta.index){
       this.transitionName='slide-left'
     }else{
       this.transitionName='slide-right'
     }
    }
  },
  mounted(){
    this.login()
  },
  methods:{
    // 获取用户信息
    async login() {
      const account = await EosTool.login();
      if (account) {
        this.$store.dispatch('setAccount', account || {});
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
  padding-bottom: .6rem;
  max-width: 750PX;
  margin: 0 auto;
  min-height: 100vh;
  background: #1D0900;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  width: 100%;
  height: 100%;
  will-change: transform;
    transition: all 500ms;
    position: absolute;
  }.slide-right-enter {
   opacity: 0;
   /* transform: translate3d(-100%, 0, 0); */
 }.slide-right-leave-active {
   opacity: 0;
   /* transform: translate3d(100%, 0, 0); */
 }.slide-left-enter {
   opacity: 0;
   /* transform: translate3d(100%, 0, 0); */
 }.slide-left-leave-active {
   opacity: 0;
   /* transform: translate3d(-100%, 0, 0); */
 }
 .w95{
   width: 95%;
   margin:0 auto;
   position: relative;
 }
</style>
