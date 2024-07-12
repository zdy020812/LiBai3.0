<template>
  <div class="wordcloud-3d" id="wordcloud-3d"></div>
</template>

<script>
import * as WordCloud from './WordCloud3D.js';

export default {
  name: 'WordCloud3D',
  data() {
    return {
      num: 0
    }
  },
  methods: {},
  mounted() {
    WordCloud.init();
  },
}
</script>

<style>
:root{
  /* 自定义属性，这几个属性等会是通过js随机生成，通过var函数可对其调用 */
  /* 上外边距 */
  --margin-top: 0;
  /* 左外边距 */
  --margin-left: 0;
  /* 动画时长 */
  --animation-duration: 0s;
  /* 动画延迟时间 */
  --animation-delay: 0s;
}
.wordcloud-3d {
  /* 弹性布局 居中显示 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: linear-gradient(to right, #e6d3ad, #e9d6af,#e7d4ae); */
  /* 溢出隐藏 */
  overflow: hidden;
  /* 设置视距 */
  perspective: 100%;
}

.word-box,
.word-box .word{
  transform-style: preserve-3d;
  position: absolute;
  /* 执行动画：动画名 时长 线性的 无限次播放 */
  animation: rotY 0s linear infinite;
  /* 设置动画时长 */
  animation-duration: var(--animation-duration);
  /* 设置动画延迟 */
  animation-delay: var(--animation-delay);
}
.word-box{
  margin-top: var(--margin-top);
}
.word-box .word{
  margin-left: var(--margin-left);
}
.word-box .word{
  /* 反向动画 */
  animation-direction: reverse;
}

/* 定义动画 */
@keyframes rotY {
  to{
    /* 1turn表示一圈 */
    transform: rotateY(1turn);
  }
}
</style>
