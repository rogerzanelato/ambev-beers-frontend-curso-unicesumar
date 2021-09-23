import { recriarCervejasDebounced } from "./cervejas/cerveja.controller.js";

const input = document.getElementById("search-field");
input.addEventListener('input', function () {
    recriarCervejasDebounced(this.value);
});

window.addEventListener('load', function () {
    recriarCervejasDebounced('');
});
