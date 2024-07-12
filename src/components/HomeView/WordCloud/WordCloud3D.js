// 生成指定范围随机数（保留小数点后两位）
function randomNum(min,max){
  var num=(Math.random() * (max - min + 1) + min).toFixed(2);
  return num;
}

// 初始函数
export const init = async()=>{
  let words=[],value=[];
  let data = await $.getJSON('词云.json');
  let fontsizemax = -999
  for(let i=0;i<data.length;i++) {
    words.push(data[i].name)
    value.push(data[i].value)
    fontsizemax = Math.max(fontsizemax, data[i].value)
  }
  var container=document.querySelector('.wordcloud-3d');
  var f=document.createDocumentFragment(); //创建文档片段对象
  let i=0;
  words.forEach(w => {
      let word_box=document.createElement('div');
      let word=document.createElement('div');
      word.innerText=w;
      word.classList.add('word');

      // 随机生成色相值（0为红色、120为绿色、240为蓝色、360为红色）
      word.style.color='hsl('+randomNum(0,360)+',100%,65%)';
      // 生成随机大小
      word_box.style.fontSize = value[i]*3+'%';
      word_box.classList.add('word-box');
      // 生成随机数值，并赋值给自定义属性
      word_box.style.setProperty('--margin-top',randomNum(-60,40)+'vh');
      word_box.style.setProperty('--margin-left',randomNum(1,13)+'vw');
      word_box.style.setProperty('--animation-duration',value[i]/3+'s');
      word_box.style.setProperty('--animation-delay',randomNum(-30,0)+'s');
      word_box.appendChild(word);
      f.appendChild(word_box);
      i++;
  })
  if(document.getElementById("wordcloud-3d")) {
    container.appendChild(f);
  }
}