function renderMusic() {
  let oAudio = document.getElementById("bg_music");
  // 创建音频上下文对象
  let oCtx = new (window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext)();
  if (!oCtx) {
    alert(
      "您的浏览器不支持audio API，请更换浏览器（chrome、firefox）再尝试，另外本人强烈建议使用谷歌浏览器！"
    );
  }
  // console.log(oCtx);
  // 创建媒体源,除了audio本身可以获取，也可以通过oCtx对象提供的api进行媒体源操作
  let audioSrc = oCtx.createMediaElementSource(oAudio);
  // 创建分析机
  let analyser = oCtx.createAnalyser();
  // 媒体源与分析机连接
  audioSrc.connect(analyser);
  // 输出的目标：将分析机分析出来的处理结果与目标点（耳机/扬声器）连接
  analyser.connect(oCtx.destination);

  // 效果（实现的具体方法）
  // 绘制音频图的条数(fftSize)
  /*
      根据分析音频的数据去获取音频频次界定音频图的高度
      放在与音频频次等长的8位无符号字节数组
      Uint8Array:初始化默认值为1024
    */
  // 利用cancas渐变进行音频绘制

  let canvas = document.getElementsByClassName("musicCanvas");

  for (let i = 0; i < canvas.length; i++) {
    let ctx = canvas[i].getContext("2d");
    canvas[i].width = 280;
    canvas[i].height = 50;
    let oW = canvas[i].width;
    let oH = canvas[i].height;
    let color1 = ctx.createLinearGradient(
      oW / 2,
      oH / 2 - 1,
      oW / 2,
      oH / 2 - 20
    );
    let color2 = ctx.createLinearGradient(
      oW / 2,
      oH / 2 + 1,
      oW / 2,
      oH / 2 + 20
    );
    color1.addColorStop(0, "#0fd850");
    color1.addColorStop(1, "#f9f047");
    color2.addColorStop(0, "#6a11cb");
    color2.addColorStop(1, "#2575fc");
    // 音频图的条数
    let count = 28;
    // 缓冲区:进行数据的缓冲处理，转换成二进制数据

    let bufferLength = analyser.frequencyBinCount;

    let dataArray = new Uint8Array(bufferLength);
    // console.log(dataArray);
    let positionX = oW / (count * 2);
    let barWidth = positionX - 2;
    let barHeight;

    function draw() {
      // 将当前的频率数据复制到传入的无符号字节数组中，做到实时连接
      analyser.getByteFrequencyData(dataArray);
      // console.log(dataArray);
      // 自定义获取数组里边数据的频步
      let step = Math.round(dataArray.length / count);

      ctx.clearRect(0, 0, oW, oH);
      for (var i = 0; i < count; i++) {
        let data = dataArray[step * i];
        let percentV = data / 255;
        barHeight = (percentV * oH) / 2;
        ctx.fillStyle = color1; // 绘制向上的线条
        ctx.fillRect(oW / 2 + i * positionX, oH / 2, barWidth, -barHeight);
        ctx.fillRect(oW / 2 - i * positionX, oH / 2, barWidth, -barHeight);
        ctx.fillStyle = color2; // 绘制向下的线条
        ctx.fillRect(oW / 2 + i * positionX, oH / 2, barWidth, barHeight);
        ctx.fillRect(oW / 2 - i * positionX, oH / 2, barWidth, barHeight);
      }
      window.requestAnimationFrame(draw);
    }
    draw();

    /*
            analyserNode 提供了时时频率以及时间域的分析信息
                允许你获取实时的数据，并进行音频可视化
                analyserNode接口的fftSize属性
                    fftSize:无符号长整型值，用于确定频域的FFT(快速傅里叶变换)
                    ffiSize属性值是从32位到32768范围内的2的非零幂,默认值是2048
          */
  }
}
