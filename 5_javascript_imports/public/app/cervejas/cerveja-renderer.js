import { Cerveja } from "./cerveja.model.js";

/**
 * @param {Cerveja} cervejas 
 */
export function criarHtmlCerveja(cerveja) {
    return `
        <div class="card">
            <div class="card__left">
                <h1 class="card__title">${cerveja.nome}</h1>

                <div class="card__tags">
                    <span class="card__tag">${cerveja.tipo}</span>
                    <img class="card__origem" src="${cerveja.origemImg}" title="Origem" alt="Origem">
                </div>
                <div class="card__descricao">
                    ${cerveja.descricao}
                </div>
                <div class="card__info">
                    <span class="card__info--hightlight">IBU: </span> ${cerveja.ibu}
                </div>
                <div class="card__info">
                    <span class="card__info--hightlight">Teor alcoólico: </span> ${cerveja.teorAlcoolico}
                </div>
            </div>
            <div class="card__right">
                <img class="card__imagem" src="${cerveja.img}" title="${cerveja.nome}" alt="${cerveja.nome}">
            </div>
        </div>
    `;
}
