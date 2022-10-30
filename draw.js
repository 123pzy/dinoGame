export function playGame() {
  // 先绘制第一个奔跑的小恐龙：
  const dinoCanvas = document.getElementById("dino_canvas");
  const dinoCtx = dinoCanvas.getContext("2d");
  const img = new Image();
  // 不断绘制新的图片：
  // 重新封装requestAnimationFrame函数：
  function mySetInterval(func, detay) {
    var i = 0;
    requestAnimationFrame(function fn() {
      // 判断现在处于60帧的第几帧，如果是目标帧的话，调用func函数：
      if (i % parseInt(60 / (1000 / detay)) == 0) {
        func();
      }
      i++;
      // 让i值每秒增加60，循环调用func函数：
      requestAnimationFrame(fn);
    });
  }
  var i = 1;
  function fn() {
    img.src = `./img/${i}.png`;
    img.onload = () => {
      ctx.save();
      ctx.globalCompositeOperation = "source-in";
      dinoCtx.drawImage(img, 0, 0, 195, 100);
      ctx.restore();
      ctx.save(); // 保存状态1
      addDino();
    };
    i++;
    if (i === 13) {
      i = 1;
    }
  }
  const dinoMove = setInterval(fn, 70);

  // 绘制小游戏界面：
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  // 设置canvas的宽高：
  canvas.height = window.innerHeight - 150;
  canvas.width = window.innerWidth - 100;
  // 复用小恐龙动画：
  var dinoX = 100;
  var dinoY = 450;
  function addDino() {
    const pat = ctx.createPattern(dinoCanvas, "no-repeat");
    ctx.fillStyle = pat;
    ctx.translate(dinoX, dinoY);
    ctx.fillRect(0, 0, 195, 100);
    ctx.restore(); // 恢复状态1
  }
  // 绘制陆地：
  ctx.moveTo(10, 555);
  ctx.lineTo(window.innerWidth - 110, 555);
  ctx.stroke();
  // 点击canvas停止小恐龙动画：
  window.timer = false;
  canvas.onclick = () => {
    var n = 0;
    var m = 0;
    clearInterval(dinoMove);
    // 关闭timer定时器：
    if (timer) {
      clearInterval(timer);
    }
    mySetInterval(() => {
      ctx.save(); // 保存状态2
      const pat = ctx.createPattern(dinoCanvas, "no-repeat");
      ctx.fillStyle = pat;
      ctx.clearRect(dinoX, dinoY, 195, 100);
      // 控制小恐龙的跳跃范围：
      if (dinoY >= 300 && n == 0) {
        dinoY = dinoY - 5;
      } else {
        if (m == 0) {
          n++;
          dinoY = dinoY + 5;
        }
      }
      // 让小恐龙落地之后继续“向前冲”：
      if (dinoY == 450 && n != 0) {
        if (m != 1) {
          timer = setInterval(fn, 70);
        }
        m = 1;
      }
      ctx.translate(dinoX, dinoY);
      ctx.fillRect(0, 0, 195, 100);
      ctx.restore(); // 恢复状态2
    }, 20);
  };

  // 绘制火苗：
  var fireNum = true; // 控制“开始游戏”按钮只能点击一次
  btn.onclick = function fireMove() {
    if (fireNum) {
      const fireImg = new Image();
      fireImg.src = "./img/fire.png";
      fireImg.onload = () => {
        var x = 0;
        mySetInterval(() => {
          ctx.clearRect(window.innerWidth - 100 - x, 503, 110, 50);
          ctx.drawImage(fireImg, window.innerWidth - 100 - x, 503, 80, 50);
          x += Math.round(Math.random() * 8 + 5);
          if (x >= window.innerWidth + 100) {
            x = 0;
          }
          if (
            window.innerWidth - 100 - x <= dinoX + 115 &&
            window.innerWidth - 100 - x >= dinoX - 10
          ) {
            if (dinoY + 100 >= 503) {
              ctx.clearRect(window.innerWidth - 100 - x, 503, 80, 50); // 清除小火苗
              alert("小恐龙被烫伤了！呜呜呜~~~");
              x = 0;
            }
          }
        }, 20);
      };
    }
    fireNum = false; // 控制“开始游戏”按钮只能点击一次
  };
  // 绘制背景动画：
  // 第一片云：
  var cloudX1 = 0;
  mySetInterval(() => {
    ctx.beginPath();
    ctx.clearRect(420 - cloudX1, 100, 200, 200);
    ctx.arc(
      500 - cloudX1,
      200,
      35,
      [Math.PI / 180] * 18,
      [Math.PI / 180] * 190,
      true
    );
    ctx.arc(
      452 - cloudX1,
      210,
      17,
      [Math.PI / 180] * -40,
      [Math.PI / 180] * 170,
      true
    );
    ctx.arc(
      435 - cloudX1,
      222,
      10,
      [Math.PI / 180] * -90,
      [Math.PI / 180] * 90,
      true
    );
    ctx.arc(
      535 - cloudX1,
      222,
      10,
      [Math.PI / 180] * 90,
      [Math.PI / 180] * -110,
      true
    );
    ctx.stroke();
    cloudX1 += 2;
    if (420 - cloudX1 <= -200) {
      cloudX1 = 520 - window.innerWidth;
    }
  }, 30);
  // 绘制第二片云：
  var cloudX2 = 0;
  mySetInterval(() => {
    ctx.beginPath();
    ctx.clearRect(1120 - cloudX2, 0, 200, 200);
    ctx.arc(
      1200 - cloudX2,
      100,
      35,
      [Math.PI / 180] * 18,
      [Math.PI / 180] * 190,
      true
    );
    ctx.arc(
      1152 - cloudX2,
      110,
      17,
      [Math.PI / 180] * -40,
      [Math.PI / 180] * 170,
      true
    );
    ctx.arc(
      1135 - cloudX2,
      122,
      10,
      [Math.PI / 180] * -90,
      [Math.PI / 180] * 90,
      true
    );
    ctx.arc(
      1235 - cloudX2,
      122,
      10,
      [Math.PI / 180] * 90,
      [Math.PI / 180] * -110,
      true
    );
    ctx.stroke();
    cloudX2 += 2;
    if (1120 - cloudX2 <= -200) {
      cloudX2 = 1220 - window.innerWidth;
    }
  }, 30);
  // 绘制“星星”：
  var starX = 0;
  mySetInterval(() => {
    ctx.beginPath();
    ctx.clearRect(1610 - starX, 190, 30, 20);
    ctx.arc(1620 - starX, 200, 5, 0, Math.PI * 2);
    ctx.stroke();
    starX += 2;
    if (1620 - starX <= -200) {
      starX = 1720 - window.innerWidth;
    }
  }, 30);
  // 游戏规则：
  ctx.fillStyle = "#d35400";
  ctx.font = "20px s";
  ctx.fillText(
    "游戏规则：小恐龙向前方奔跑，点击上方阴影包围的矩形框的任意区域，小恐龙跳起，之后小恐龙自由下落。切记：小恐龙碰到火堆即游戏失败！",
    150,
    canvas.height - 50,
    2000
  );
}
