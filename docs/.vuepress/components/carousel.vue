<template>
  <div class="carousels">
    <div
      class="z-carousel pr"
      :style="windowWidth"
      @mouseover="stopTimedLoop"
      @mouseleave="restartTimedLoop"
    >
      <button class="left-btn pa" @click="move(singleItemWidth, 1,speed)">《</button>
      <button class="right-btn pa" @click="move(singleItemWidth, -1,speed)">》</button>
      <div class="z-carousel-box" ref="zpCarousel" :style="containerStyle">
        <div
          class="z-carousel-item"
          :class="{'carousel-item-active':isActiveLeft(index)}"
          :style="[itemStyle]"
          v-for="(item,index) in dataEndThreeArr"
          :key="getRandom+index*2+1"
          :data-index="imgArr.length-(dataEndThreeArr.length-index-1)"
        >{{item}}</div>

        <div
          class="z-carousel-item"
          :class="{'carousel-item-active':currentIndex==index+1}"
          :style="[itemStyle]"
          v-for="(item,index) in imgArr"
          :key="index*index-3"
          :data-index="index+1"
        >{{item}}</div>
        <div
          class="z-carousel-item"
          :class="{'carousel-item-active':
          (currentIndex==(index+1))}"
          :style="[itemStyle]"
          v-for="(item,index) in dataBeginThreeArr"
          :key="getRandom*index+item+2"
          :data-index="index+1"
        >{{item}}</div>
      </div>
      <div class="carousel-all-dot pa">
        <div
          class="carousel-dot cp"
          :class="{'active-dot':(currentIndex==index+1)}"
          v-for="(item,index) in imgArr.length"
          :key="index"
          @click="jumpDot(index+1)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZpCarousel",
  data() {
    return {
      imgArr: [1, 2, 3, 4, 5, 6, 7, 8,9],
      zpCarousel: null,
      singleItemWidth: 300,
      distance: 0, //动态显示位置
      speed: 5,
      totalLength: 0,
      animateEnd: true, //是否滑动结束
      scale: 0.85, //缩放倍数
      itemDislocationLength: "20%", //
      timedLoop: false, //定时循环
      isTimedLoop: true, //是否开启定时循环
      switchTime: 1000, //切换间隔
      counts: 3, //显示数量
      currentIndex: 1, //当前选中的下标
      initDistance: 0, //起点位置
      isPositive: true //是否正向循环
    };
  },

  computed: {
    containerStyle() {
      //用transform来移动整个图片列表
      return {
        transform: `translateX(${this.distance}px)`,
        width: `${this.singleItemWidth * this.imgArr.length + //总宽度+前后
          this.singleItemWidth * 6}px`
      };
    },

    // 单个样式
    itemStyle() {
      return {
        width: `${this.singleItemWidth}px`,
        transform: `scale(${this.scale})`
      };
    },
    // 窗口大小
    windowWidth() {
      //轮播窗口宽度，要减去两边重合的宽度
      return {
        width: `${this.singleItemWidth * this.counts}px`
      };
    },
    //数据结束后几位(根据要显示的数量)
    dataEndThreeArr() {
      return this.imgArr.slice(this.imgArr.length - this.counts);
    },
    //数据开始前几位(根据要显示的数量)
    dataBeginThreeArr() {
      return this.imgArr.slice(0, this.counts);
    },
    //随机数
    getRandom() {
      return (Math.random() * 100).toFixed(0);
    }
  },
  created() {
    // 获取总长度
    this.totalLength = this.imgArr.length * this.singleItemWidth;
    //显示数量不同，显示初始位置也不痛
    this.initDistance = -this.singleItemWidth * (this.counts > 1 ? 2 : 1);
    // 根据默认显示项初始滑动位置
    this.distance = this.initDistance;
  },
  mounted() {
    this.isTimedLoop ? this.startTimedLoop() : "";
  },
  destroyed() {
    this.timedLoop ? clearInterval(this.timedLoop) : "";
  },
  methods: {
    /**
     * offset:距离
     * direction:左/右
     * speed 速度
     */
    move(offset, direction, speed) {
      if (!this.animateEnd) return;
      this.animateEnd = false;
      // direction === -1 ? this.currentIndex++ : this.currentIndex--;
      // 更新当前项的位置
      direction === -1
        ? (this.currentIndex += offset / this.singleItemWidth)
        : (this.currentIndex -= offset / this.singleItemWidth);
      if (this.currentIndex > this.imgArr.length) this.currentIndex = 1;
      if (this.currentIndex < 1) this.currentIndex = this.imgArr.length;
      // this.distance += offset * direction;
      // if (this.distance < -1500) this.distance = -300;//大于第五张时回到第一张
      // if (this.distance > -300) this.distance = -1500;//滑动距离小于显示第一张时显示最后一张
      const destination = this.distance + offset * direction; //左/右需要滑动到的地方
      this.createAnimate(destination, direction, speed);
    },
    /**
     * des:滑动的位置
     * direction：1右 -1左
     */
    createAnimate(des, direc, speed) {
      if (this.temp) {
        window.clearInterval(this.temp);
        this.temp = null;
      }
      this.temp = window.setInterval(() => {
        if (
          (direc === -1 && des < this.distance) ||
          (direc === 1 && des > this.distance)
        ) {
          this.distance += speed * direc;
        } else {
          this.animateEnd = true;
          window.clearInterval(this.temp);
          this.distance = des;
          //-滑动距离超过最右边就回到最左边位置(当显示3页的时候之所以要多减一页，是因为一页和3页开始显示的位置不同，在-1500的时候选中的是5，
          //如果回到起始位置，选中的依然是5，所以为了衔接多往后显示一页)
          if (
            des <
            -this.totalLength - (this.counts == 3 ? this.singleItemWidth : 0)
          )
            this.distance = this.initDistance;
          if (des > -this.singleItemWidth) this.distance = -this.totalLength; //+滑动距离超过最左边就回到最右边位置
        }
      }, 5);
    },

    // 是否是左边选中
    isActiveLeft: function(index) {
      return (
        this.currentIndex ===
        this.imgArr.length - (this.dataEndThreeArr.length - index - 1)
      );
    },

    // 开始循环
    startTimedLoop: function() {
      this.timedLoop = setInterval(() => {
        this.move(this.singleItemWidth, this.isPositive ? -1 : 1, this.speed);
      }, this.switchTime);
    },
    stopTimedLoop: function() {
      clearInterval(this.timedLoop);
    },
    restartTimedLoop: function() {
      if (this.isTimedLoop) {
        this.startTimedLoop();
      }
    },
    //点击圆点跳转
    jumpDot: function(index) {
      const diff = index - this.currentIndex;
      // if (diff == 0) return;
      const direction = diff > 0 ? -1 : 1;
      const offset = Math.abs(diff) * this.singleItemWidth;
      const jumpSpeed = Math.abs(index - this.currentIndex) * this.speed; //当前项和要跳转项相隔越远速度愉快
      this.move(offset, direction, jumpSpeed);
    }
  }
};
</script>

<style lang="stylus" scoped>
.pr {
  position: relative;
}

.pa {
  position: absolute;
}

.carousels {
  width: 100%;
  height: 200px;

  .z-carousel {
    height: inherit;
    overflow: hidden;
    margin: 0 auto;

    // 按钮
    .left-btn {
      left: 0;
      top: 48%;
      z-index: 1;
    }

    .right-btn {
      right: 0;
      top: 48%;
      z-index: 1;
    }

    .z-carousel-box {
      height: 90%;
      background: #ccc;
      overflow: hidden;
      margin: 0 auto;
      display: flex;

      // transition: all 1s;
      .z-carousel-item {
        height: 100%;
        // width       : 300px;
        background: #afa5a5;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        transition: all 0.8s;
      }

      .carousel-item-active {
        transform: scale(1) !important;
        transition: all 0.6s;
      }
    }

    .carousel-all-dot {
      width: 100%;
      height: 10%;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .carousel-dot {
        margin: 5px;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background: #ccc;
        transition: all 0.6s;

        &:hover {
          background: #000;
        }
      }

      .active-dot {
        background: #000 !important;
        transition: all 0.6s;
      }
    }
  }
}
</style>