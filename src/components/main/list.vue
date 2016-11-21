<template>
  <div v-scroll = "onScroll" :class="$style.app" >
    <div  v-for = "item in list">
      <img v-bind:src = "item.pic_url" alt="图片">
      <br><br>
    </div>
  </div>
</template>

<script>
  import consts from '../../common/consts' 
  import scrollDirective from '../../directives/scroll'

  export default {
    data() {
      return {
        currentPage:0,
        list:[],
        isScroll:false
      }
    },
    directives: {
      scroll: scrollDirective
    },
  	mounted () {
      this.request()
    },
    methods:{
      loadMoreData(){
          this.list = this.list.concat(consts.MOCK_DATA)
          if(this.isScroll)
            this.isScroll = false
      },
      onScroll(){
        if(this.isScroll){
          return
        }
        
          this.isScroll = true
          this.currentPage += 1
          this.request()
        
      },
      request(){
        // 假装fetching data
        setTimeout(this.loadMoreData, 500)
      }
    }
  }
</script>

<style lang='sass' module>
  html {
    	height: 100%;
  	body {
  		display: flex;
  		justify-content: center;
  		height: 100%;
  		background:pink;
  	}
  }
  .app {
  	color: green;
  	max-width: 600px;
    align-items: flex-start;
  	font-family: Source Sans Pro, Helvetica, sans-serif;
  	text-align: center;
    img{
      width: 80%;
      margin :10px auto;
    }
  }
</style>