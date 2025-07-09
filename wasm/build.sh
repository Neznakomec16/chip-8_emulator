wasm-pack build --release --target web --out-dir ../wasm/web/wasm
mv pkg/wasm_bg.wasm web/
mv pkg/wasm.js web/
