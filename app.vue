<template>
  <div class="stopwatch-container">
    <div class="stopwatch" v-for="(stopwatch, index) in stopwatches" :key="index">
      <div class="stopwatch-display" :class="{ 'stopwatch-display-active': stopwatch.running }">
        {{ formatTime(stopwatch.time) }}
      </div>
      <div class="stopwatch-header">

        <div class="stopwatch-button" @click="toggleTimer(index)">
          <div :class="{ inactive: !stopwatch.running }">
            <img :src="!stopwatch.running ? imgplay : imgpause" :class="{ inactive: !stopwatch.running }">
          </div>
        </div>
        <button class="stopwatch-button" @click="resetTimer(index)">
          <img :src="!stopwatch.running ? imgcube : imgcubeActive" alt=" reset" :class="{ inactive: !stopwatch.running }">
        </button>
      </div>
    </div>
    <button class="add-stopwatch-button" @click="addStopwatch">
      <h1>+</h1>
    </button>
  </div>
</template>

<script setup>
import imgplay from '@/assets/img/play.svg'
import imgpause from '@/assets/img/pause.svg'
import imgcube from '@/assets/img/cube.svg'
import imgcubeActive from '@/assets/img/cubeisActive.svg'
const stopwatches = reactive([{ running: false, time: 0 }]);
const toggleTimer = (index) => {
  stopwatches[index].running = !stopwatches[index].running;
  if (stopwatches[index].running) {
    stopwatches[index].start = Date.now() - stopwatches[index].time;
    requestAnimationFrame(updateTimer);
  }
}

const resetTimer = (index) => {
  stopwatches[index].running = false;
  stopwatches[index].time = 0;
  stopwatches[index].start = Date.now();
}

const updateTimer = () => {
  stopwatches.forEach((stopwatch) => {
    if (stopwatch.running) {
      stopwatch.time = Date.now() - stopwatch.start;
    }
  });
  requestAnimationFrame(updateTimer);
}

const formatTime = (time) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  if (hours > 0) {
    return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
  } else if (minutes > 0) {
    return `${minutes}:${padZero(seconds)}`;
  } else {
    return `${seconds}`;
  }
}

const padZero = (number) => {
  if (number < 10) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}

const addStopwatch = () => {
  stopwatches.push({ running: false, time: 0 });
}
</script>
<style scoped lang = scss>
body {
  background: #E5E5E5
}

.stopwatch-container {
  padding-top: 72px;
  display: grid;
  grid-auto-rows: 120px;
  gap: 40px 0;
  justify-items: center;

  @media screen and (min-width: '1024px') {
    grid-template-columns: repeat(3, 33%);
  }

  @media screen and (min-width: '768px') and (max-width: '1024px') {
    grid-template-columns: repeat(2, 50%);
  }

  @media screen and (max-width: '768px') {
    grid-template-columns: repeat(1, 100%);
  }

  >.stopwatch {
    width: 225px;
    height: 120px;
    background: #696969;

    >div {
      height: 50%;
    }

    >.stopwatch-display {
      font-size: 24px;
      color: #9E9E9E;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    >.stopwatch-display-active {
      color: #fff;
    }

    >.stopwatch-header {
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #9E9E9E;
      align-items: center;

      >.stopwatch-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: filter 500ms;
      }

      >.stopwatch-button:hover {
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.46));
        transition: filter 500ms;
      }
    }
  }

  >.add-stopwatch-button:hover {
    background: #737373;
    transition: background-color 300ms;
  }

  >.add-stopwatch-button {
    width: 225px;
    height: 120px;
    background: #696969;
    color: #9E9E9E;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;
    border: 0;
    transition: background-color 300ms;

    >h1 {
      font-size: 80px;
      font-weight: 200;
    }
  }

}
</style>