import './style.css'
import { playGame } from './draw.js'


document.querySelector('#app').innerHTML = `
<canvas id="dino_canvas" height="100" width="195"></canvas>
<div class="game_box">
    <canvas id="canvas"></canvas>
    <button id="btn">开始游戏</button>
</div>
`

playGame()
// canvasPattern()