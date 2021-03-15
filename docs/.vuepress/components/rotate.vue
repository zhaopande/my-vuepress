<template>
  <div class="rotate">
    <div class="box">
      <div class="front">front</div>
      <div class="obverse">obverse</div>
    </div>
    <div class="ie-box">
      <div class="front">front ie</div>
      <div class="obverse">obverse ie</div>
    </div>
    <div class="contain">
      <img class="door front" src="./img/doorfront.svg" />
      <img class="door back" src="./img/doorback.svg" />
      <img class="door window" src="./img/doorwindow.svg" />
    </div>
    <div class="box2">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rotate",
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
.rotate {
  // no.1
  .box {
    width: 200px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    animation: rotate_card 6s linear infinite;

    @keyframes rotate_card {
      0% {
        transform: rotateX(0deg);
      }

      10% {
        transform: rotateX(10deg);
      }

      40% {
        transform: rotateX(170deg);
      }

      60% {
        transform: rotateX(180deg);
      }

      90% {
        transform: rotateX(350deg);
      }

      100% {
        transform: rotateX(360deg);
      }
    }

    .front {
      width: 200px;
      background-color: green;
      height: 200px;
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotateX(0deg);
    }

    .obverse {
      width: 200px;
      height: 200px;
      position: absolute;
      background-color: red;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotateX(-180deg);
    }
  }

  .ie-box {
    width: 200px;
    height: 200px;
    position: relative;

    .front {
      width: 200px;
      background-color: green;
      height: 200px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotateY(0deg);
      -webkit-animation: turns 5s linear infinite;
      animation: turns 5s linear infinite;
      z-index: 5;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      /* Chrome 和 Safari */
      -moz-backface-visibility: hidden;
      /* Firefox */
      -ms-backface-visibility: hidden;
      /* Internet Explorer */
    }

    .obverse {
      width: 200px;
      height: 200px;
      position: absolute;
      background-color: #fb9b5f;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotateY(-180deg);
      animation: turnss 5s linear infinite;
      // backface-visibility: hidden;
    }

    @keyframes turnss {
      0% {
        transform: rotateY(-180deg);
      }

      10% {
        transform: rotateY(-170deg);
      }

      40% {
        transform: rotateY(-10deg);
      }

      60% {
        transform: rotateY(0deg);
      }

      90% {
        transform: rotateY(170deg);
      }

      100% {
        transform: rotateY(180deg);
      }
    }

    @keyframes turns {
      0% {
        transform: rotateY(0deg);
      }

      10% {
        transform: rotateY(10deg);
      }

      40% {
        transform: rotateY(170deg);
      }

      60% {
        transform: rotateY(180deg);
      }

      90% {
        transform: rotateY(350deg);
      }

      100% {
        transform: rotateY(360deg);
      }
    }
  }

  .contain {
    position: relative;
    margin: 0 auto;
    width: 150px;
    height: 570px;

    .door {
      position: absolute;
      -webkit-transform: perspective(400px) rotateY(15deg);
      -webkit-transform-origin: right;
      -webkit-animation: open 4s infinite;
      transform: perspective(403px) rotateY(85deg);
      transform-origin: right;
      animation: open 4s infinite;
    }

    .front {
      z-index: 2;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    @keyframes open {
      50% {
        -webkit-transform: perspective(600px) rotateY(-140deg);
      }
    }

    @keyframes open {
      50% {
        transform: perspective(600px) rotateY(-140deg);
      }
    }
  }

  .box2 {
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: row;
    position: relative;
    overflow: hidden;

    .left {
      width: 200px;
      opacity: 0;
      height: 200px;
      background-color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      animation: isDisplayLeft 8S linear infinite;

      @keyframes isDisplayLeft {
        0% {
          opacity: 0;
        }

        5% {
          opacity: 1;
        }

        50% {
          opacity: 1;
        }

        55% {
          opacity: 0;
        }

        100% {
          opacity: 0;
        }
      }
    }

    .right {
      width: 200px;
      height: 200px;
      background-color: #6969ec;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      animation: isDisplayRIght 8S linear infinite;

      @keyframes isDisplayRIght {
        0% {
          opacity: 0;
        }

        45% {
          opacity: 0;
        }

        50% {
          opacity: 1;
        }

        95% {
          opacity: 1;
        }

        100% {
          opacity: 0;
        }
      }
    }
  }
}
</style>