<!-- 关于 -->
<template lang="html">
  <div class="aboutIndex">
    <p class="aboutTitle">{{$t('about.title')}}</p>
    <!-- <p class="title">{{$t('about.intr')}}</p> -->
    <div class="aboutContent" v-html="$t('about.remark')"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.aboutIndex{
  width: 100%;
  color:white;
  .aboutTitle{
    font-size: $titleSize;
    font-weight: 500;
  }
  .aboutContent{
    p{
      font-size: $textSize;
      text-align: left;
      margin-bottom: .3rem;
    }
    .title{
      font-size: $titleSize;
      font-weight: 500;
    }
    ul{
     font-size: $textSize;
     text-align: left;
     li{
       box-sizing: border-box;
       padding-left: .6rem;
       position: relative;
       margin-top: .1rem;
       margin-bottom: .2rem;
       span{
         width: .2rem;
         height: .2rem;
         background: white;
         border-radius: 50%;
         display: inline-block;
         position: absolute;
         left:.1rem;
         top:50%;
         margin-top: -.12rem;
       }
     }
   }
   .strong{
     font-size: $textSize + .05;
     font-weight: 500;
   }
  }
}
</style>
