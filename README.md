# CHIP-8 Emulator

A cross-platform CHIP-8 emulator written in Rust. This project supports running classic CHIP-8 games both as a desktop application and in the browser via WebAssembly.

## Project Structure

- [`chip8_core/`](chip8_core/) — Core CHIP-8 emulation logic as a Rust library.
- [`desktop/`](desktop/) — Desktop GUI application using SDL2.
- [`wasm/`](wasm/) — WebAssembly bindings for running the emulator in the browser.
- [`c8games/`](c8games/) — Collection of CHIP-8 ROMs for testing and playing.

## Getting Started

### Desktop Version

1. **Install Rust**: https://rustup.rs/
2. **Build and Run**:
    ```sh
    cd desktop
    cargo run --release -- ../c8games/PONG
    ```
    Replace `PONG` with any ROM from the [c8games](http://_vscodecontentref_/0) directory.

### WebAssembly Version

1. **Install [`wasm-pack`](https://rustwasm.github.io/wasm-pack/installer/)**
2. **Build**:
    ```sh
    cd wasm
    ./build.sh
    ```
3. **Run locally**:
    ```sh
    cd web
    chmod +x run_local.sh
    ./run_local.sh
    ```
    Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Usage

- **Desktop**: Launch the emulator with the path to a ROM file.
- **Web**: Open the web interface, upload a ROM file, and play directly in your browser.

## Controls

- CHIP-8 keypad is mapped to your keyboard. Refer to the emulator window or documentation for the key mapping.
- Press `Esc` or close the window to exit the desktop emulator.

## Dependencies

- Rust (stable)
- SDL2 (for desktop)
- wasm-bindgen, web-sys (for WebAssembly)

## License

MIT

---

**Sample ROMs included:**  
PONG, TETRIS, INVADERS, MAZE, and more