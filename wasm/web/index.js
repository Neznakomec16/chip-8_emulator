let currentChip8 = null;

import init, * as wasm from "./wasm/wasm.js"

const WIDTH = 64
const HEIGHT = 32
const SCALE = 15
const TICKS_PER_FRAME = 10
let anim_frame = 0

const canvas = document.getElementById("canvas")
canvas.width = WIDTH * SCALE
canvas.height = HEIGHT * SCALE

const ctx = canvas.getContext("2d")
ctx.fillStyle = "black"
ctx.fillRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE)

const input = document.getElementById("fileinput")
const info = document.getElementById("info");
const resetBtn = document.getElementById("resetbtn");

async function run() {
    await init()
    let chip8 = new wasm.EmuWasm()
    currentChip8 = chip8;
    resetBtn.addEventListener("click", () => {
        if (currentChip8) {
            currentChip8.reset();
            info.textContent = "ROM reset";
        }
    });
    document.addEventListener("keydown", function (evt) { chip8.keypress(evt, true) })
    document.addEventListener("keyup", function (evt) { chip8.keypress(evt, false) })
    input.addEventListener("change", function (evt) {
        // handle file loading
        if (anim_frame != 0) {
            window.cancelAnimationFrame(anim_frame)
        }

        let file = evt.target.files[0]
        if (!file) {
            alert("Failed to read file")
            return
        }
        let fr = new FileReader()
        fr.onload = function (e) {
            let buffer = fr.result
            const rom = new Uint8Array(buffer)
            chip8.reset()
            chip8.load_game(rom)
            info.textContent = `Running ${file.name}`;
            resetBtn.disabled = false;
            mainloop(chip8)
        }
        fr.readAsArrayBuffer(file)
    }, false)
}

function mainloop(chip8) {
    for (let i = 0; i < TICKS_PER_FRAME; i++) {
        chip8.tick()
    }
    chip8.tick_timers()

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, WIDTH * SCALE, HEIGHT * SCALE)

    ctx.fillStyle = "white"
    chip8.draw_screen(SCALE)
    anim_frame = window.requestAnimationFrame(() => { mainloop(chip8) })
}

run().catch(console.error)
