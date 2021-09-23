import { debounce } from "../utils/operators.js";
import { criarHtmlCerveja } from "./cerveja-renderer.js";
import { buscarCervejas } from "./cerveja.service.js";

export const recriarCervejasDebounced = debounce(async (pesquisa) => await recriarCervejas(pesquisa), 500);

async function recriarCervejas(pesquisa) {
    const cervejas = await buscarCervejas(pesquisa);
    renderizarCervejas(cervejas);
}

/**
 * @param {Cerveja[]} cervejas 
 */
function renderizarCervejas(cervejas) {
    const content = document.getElementById('cervejas');
    content.innerHTML = ""; // Limpa o html da listagem

    const novoHtml = cervejas
        .map(cerveja => criarHtmlCerveja(cerveja))
        .join(""); // Percorre a listagem de cervejas e mapeia para o html esperado no front-end
    content.innerHTML = novoHtml;
}
