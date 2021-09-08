(function () {
  let audio = document.getElementById("bg_music");
  let canvas = document.getElementById("musicCanvas");

  let context = canvas.getContext("2d");

  canvas.width = 250;
  canvas.height = 40;

  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;

  //   音频分析器

  let AudCtx = new AudioContext(); //音频内容
  let src = AudCtx.createMediaElementSource(audio);
  let analyser = AudCtx.createAnalyser();

  src.connect(analyser);
  analyser.connect(AudCtx.destination);   
  analyser.fftSize = 32; //快速傅里叶变换, 必须为2的N次方

  let bufferLength = analyser.frequencyBinCount; // = fftSize * 0.5

  //part4: 变量
  let barWidth = WIDTH / bufferLength - 2; //间隔1px
  let barHeight;

  let dataArray = new Uint8Array(bufferLength); //8位无符号定长数组

  function fillRoundRect(
    cxt,
    x,
    y,
    width,
    height,
    radius,
    /*optional*/ fillColor
  ) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) {
      return false;
    }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    cxt.fillStyle = fillColor || "#fff"; //若是给定了值就用给定的值否则给予默认值
    cxt.fill();
    cxt.restore();
  }

  function strokeRoundRect(
    cxt,
    x,
    y,
    width,
    height,
    radius,
    /*optional*/ lineWidth,
    /*optional*/ strokeColor
  ) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) {
      return false;
    }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    // cxt.lineWidth = lineWidth || 0;
    // cxt.strokeStyle = strokeColor || "#000";
    // cxt.stroke();
    cxt.restore();
  }

  function drawRoundRectPath(cxt, width, height, radius) {
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

    //矩形下边线
    cxt.lineTo(radius, height);

    //左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

    //矩形左边线
    cxt.lineTo(0, radius);

    //左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);

    //上边线
    cxt.lineTo(width - radius, 0);

    //右上角圆弧
    cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);

    //右边线
    cxt.lineTo(width, height - radius);
    cxt.closePath();
  }

  function renderFrame() {
     //方法renderFrame托管到定时器，无限循环调度，频率<16.6ms/次

    // context.fillStyle = "#ffffff"; //透明背景
    // context.fillRect(0, 0, WIDTH, HEIGHT); //画布拓展全屏,动态调整

    analyser.getByteFrequencyData(dataArray); //获取当前时刻的音频数据

    //part6: 绘画声压条
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {
      var data = dataArray[i]; //int,0~255

      var percentV = data / 255; //纵向比例
      var percentH = i / bufferLength; //横向比例

      barHeight = HEIGHT * percentV;

      //gbk,0~255
      var r = 255 * percentV; //值越大越红
      var g = 255 * percentH; //越靠右越绿
      var b = 50;

      const pi = Math.PI;

      //   绘制以及填充直角矩形
        context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        context.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        // 绘制圆角矩形
        // strokeRoundRect(
        //   context,
        //   x + 0.5,
        //   HEIGHT - barHeight + 0.5,
        //   barWidth,
        //   barHeight,
        //   1
        // );

        // 填充圆角矩形
        // fillRoundRect(
        //   context,
        //   x + 0.5,
        //   HEIGHT - barHeight + 0.5,
        //   barWidth,
        //   barHeight,
        //   1,
        //   "rgb(" + r + "," + g + "," + b + ")"
        // );

      // 绘制椭圆
        // context.ellipse(
        //   x+barWidth/2,
        //   (HEIGHT - barHeight) / 2,
        //   barWidth / 2,
        //   barHeight / 2,
        //   0,
        //   0,
        //   pi * 2
        // );
        // context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        // context.fill();


    //   context.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    //   context.shadowBlur = 100;
      x += barWidth + 1; //间隔1px

      
    }

    window.requestAnimationFrame(renderFrame);
  }

  renderFrame();
})();
