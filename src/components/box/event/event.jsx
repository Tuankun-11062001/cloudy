"use client";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const EventBanner = () => {
  useEffect(() => {
    const eventController = document.querySelector(".home_event");
    const eventOver = eventController.querySelector(".home_event_over");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // canvas size
    const canvasSize = 800;
    const w = (canvas.width = canvasSize);
    const h = (canvas.height = canvasSize);
    const canvasFillColor = "#14141e";
    const canvasStrokeColor = "rgba(211, 211, 211, 0.19)";

    const scoreEl = document.getElementById("score");
    const resetEl = document.getElementById("reset");
    const showGridEl = document.getElementById("show-grid");
    const highScoreEl = document.getElementById("high-score");
    const pauseEl = document.getElementById("pause");
    const playEl = document.getElementById("play");

    let score = 0;

    const setScore = () => {
      scoreEl.innerHTML = `Score 👉 ${score}`;
      if (score >= localStorage.getItem("highScore"))
        localStorage.setItem("highScore", score);
      highScoreEl.innerHTML = `HI SCORE 🚀 ${localStorage.getItem(
        "highScore"
      )}`;
    };

    // frame rate
    const frameRate = 20;

    // grid padding
    const pGrid = 4;
    // grid width
    const grid_line_len = canvasSize - 2 * pGrid;
    //  cell count
    const cellCount = 44;
    // cell size
    const cellSize = grid_line_len / cellCount;

    let gameActive;

    // this will generate random color for head
    const randomColor = () => {
      let color;
      let colorArr = ["#426ff5", "#42f5e3"];
      color = colorArr[Math.floor(Math.random() * 2)];
      return color;
    };

    const head = {
      x: 2,
      y: 1,
      color: randomColor(),
      vX: 0,
      vY: 0,
      draw: () => {
        ctx.fillStyle = head.color;
        ctx.shadowColor = head.color;
        ctx.shadowBlur = 2.5;
        ctx.fillRect(
          head.x * cellSize + pGrid,
          head.y * cellSize + pGrid,
          cellSize,
          cellSize
        );
      },
    };

    let tailLength = 4;
    let snakeParts = [];
    class Tail {
      color = "#42f57e";
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 2.5;
        ctx.fillRect(
          this.x * cellSize + pGrid,
          this.y * cellSize + pGrid,
          cellSize,
          cellSize
        );
      }
    }

    const food = {
      x: 5,
      y: 5,
      color: "#FF3131",
      draw: () => {
        ctx.fillStyle = food.color;
        ctx.shadowColor = food.color;
        ctx.shadowBlur = 5;
        ctx.fillRect(
          food.x * cellSize + pGrid,
          food.y * cellSize + pGrid,
          cellSize,
          cellSize
        );
      },
    };

    // this will set canvas style
    const setCanvas = () => {
      // canvas fill
      ctx.fillStyle = canvasFillColor;
      ctx.fillRect(0, 0, w, h);

      // canvas stroke
      ctx.strokeStyle = canvasStrokeColor;
      ctx.strokeRect(0, 0, w, h);
    };

    //   this will draw the grid
    const drawGrid = () => {
      ctx.beginPath();
      for (let i = 0; i <= grid_line_len; i += cellSize) {
        ctx.moveTo(i + pGrid, pGrid);
        ctx.lineTo(i + pGrid, grid_line_len + pGrid);
      }
      for (let i = 0; i <= grid_line_len; i += cellSize) {
        ctx.moveTo(pGrid, i + pGrid);
        ctx.lineTo(grid_line_len + pGrid, i + pGrid);
      }
      ctx.closePath();
      ctx.strokeStyle = canvasStrokeColor;
      ctx.stroke();
    };

    const drawSnake = () => {
      //loop through our snakeparts array
      snakeParts.forEach((part) => {
        part.draw();
      });

      snakeParts.push(new Tail(head.x, head.y));

      if (snakeParts.length > tailLength) {
        snakeParts.shift(); //remove furthest item from  snake part if we have more than our tail size
      }
      head.color = randomColor();
      head.draw();
    };

    const updateSnakePosition = () => {
      head.x += head.vX;
      head.y += head.vY;
    };

    const changeDir = (e) => {
      let key = e.keyCode;

      if (key == 39) {
        if (head.vX === -1) return;
        head.vX = 1;
        head.vY = 0;
        gameActive = true;
        return;
      }
      if (key == 37) {
        if (head.vX === 1) return;
        head.vX = -1;
        head.vY = 0;
        gameActive = true;
        return;
      }
      if (key == 38) {
        if (head.vY === 1) return;
        head.vX = 0;
        head.vY = -1;
        gameActive = true;
        return;
      }
      if (key == 40) {
        if (head.vY === -1) return;
        head.vX = 0;
        head.vY = 1;
        gameActive = true;
        return;
      }
    };

    const foodCollision = () => {
      let foodCollision = false;
      snakeParts.forEach((part) => {
        if (part.x == food.x && part.y == food.y) {
          foodCollision = true;
        }
      });
      if (foodCollision) {
        food.x = Math.floor(Math.random() * cellCount);
        food.y = Math.floor(Math.random() * cellCount);
        score++;
        tailLength++;
      }
    };

    const isGameOver = () => {
      let gameOver = false;

      snakeParts.forEach((part) => {
        if (part.x == head.x && part.y == head.y) {
          gameOver = true;
        }
      });

      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x > cellCount - 1 ||
        head.y > cellCount - 1
      ) {
        gameOver = true;
      }

      return gameOver;
    };

    addEventListener("keydown", changeDir);

    const PlayButton = (show) => {
      if (!show) {
        playEl.style.display = "none";
      } else {
        playEl.style.display = "block";
      }
    };

    const pauseGame = () => {
      gameActive = false;
      if (!gameActive) {
        pauseEl.removeAttribute("class");
        pauseEl.setAttribute("class", "pause-not-active");
      }
      if (!isGameOver()) PlayButton(true);
    };

    pauseEl.addEventListener("click", pauseGame);

    let showGrid = false;

    // this will initiate all
    const animate = () => {
      setCanvas();
      if (showGrid) drawGrid();
      drawSnake();
      food.draw();
      if (gameActive) {
        PlayButton(false);
        pauseEl.removeAttribute("class");
        pauseEl.setAttribute("class", "pause-active");
        updateSnakePosition();
        if (isGameOver()) {
          showGameOver();
          PlayButton(false);
          return;
        }
      }
      setScore();
      foodCollision();
      setTimeout(animate, 1000 / frameRate);
    };

    const resetGame = () => {
      // Đặt lại các giá trị của trò chơi
      score = 0; // Reset điểm số
      tailLength = 4; // Đặt lại độ dài ban đầu của đuôi rắn
      snakeParts = []; // Xóa các phần của rắn (đuôi)

      // Đặt lại vị trí đầu rắn
      head.x = 2;
      head.y = 1;
      head.vX = 0;
      head.vY = 0;
      head.color = randomColor(); // Random lại màu sắc đầu rắn

      // Đặt lại vị trí thực phẩm
      food.x = 5;
      food.y = 5;

      // Đảm bảo trò chơi không bị dừng lại khi reset
      gameActive = false;

      // Đặt lại UI điểm số và thông tin
      setScore(); // Cập nhật lại điểm số

      // Bắt đầu lại vòng lặp game từ đầu
      animate(); // Gọi lại vòng lặp game

      // Tắt pause nếu có
      pauseEl.removeAttribute("class");
      pauseEl.setAttribute("class", "pause-active");

      // Kích hoạt lại sự kiện di chuyển sau khi reset
      addEventListener("keydown", changeDir);
    };

    resetEl.addEventListener("click", resetGame);

    const toggleGrid = () => {
      if (!showGrid) {
        showGrid = true;
        showGridEl.innerHTML = `Hide Grid`;
        return;
      }
      showGrid = false;
      showGridEl.innerHTML = `Show Grid`;
    };

    showGridEl.addEventListener("click", toggleGrid);
    animate();
  }, []);

  const handleScroll = (e) => {
    const openDataApp = document.querySelector(".home_app");
    const uiComponent = document.getElementById("home_ui");
    openDataApp.classList.add("active");
    uiComponent.scrollIntoView({
      behavior: "smooth",
    });
    e.target.classList.add("fade");
  };

  return (
    <div className="home_event">
      <div className="home_event_game">
        <canvas id="canvas"></canvas>

        <div className="home_event_info">
          <span>Cloudy Game Tet</span>
          <img src="/event_tet.png" />
          <h1>Happy New Year</h1>
          <h2>2025</h2>
          <hr />

          <div className="home_event_info_play">
            <div id="control-keys">
              <div>Trái 👉 ➡️</div>
              <div>Phải 👉 ⬅️</div>
              <div>Lên 👉 ⬆️</div>
              <div>Xuống 👉 ⬇️</div>
            </div>
            <div id="controls">
              <button id="show-grid">Hiện Lưới</button>
              <button id="pause" className="pause-active">
                Dừng
              </button>
              <button id="reset">RESET</button>
            </div>
          </div>
          <div id="high-score"></div>
          <div id="score"></div>
          <p className="scroll_down" onClick={handleScroll}>
            {appSvg.arrowDown}
          </p>
        </div>
        <div id="play">Press control keys to start</div>
      </div>
    </div>
  );
};

export const EventBannerMB = () => {
  const handleScroll = (e) => {
    const openDataApp = document.querySelector(".home_app");
    const uiComponent = document.getElementById("home_ui");
    openDataApp.classList.add("active");
    uiComponent.scrollIntoView({
      behavior: "smooth",
    });
    e.target.classList.add("fade");
  };
  return (
    <div className="home_event_banner_mb">
      <img src="/event_tet.png" />
      <div className="home_event_banner_mb_info">
        <h2>Happy New Year</h2>
        <h3>2025</h3>
        <hr />
        <p className="wish">
          Tết đến xuân về, chúc bạn một năm mới với nhiều niềm vui, hạnh phúc và
          thịnh vượng. Mong bạn luôn gặp may mắn và đạt được mọi ước mơ!
        </p>

        <p className="scroll_down" onClick={handleScroll}>
          {appSvg.arrowDown}
        </p>
      </div>
    </div>
  );
};

export default EventBanner;
