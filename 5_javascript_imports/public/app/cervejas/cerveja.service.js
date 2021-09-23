import { Cerveja } from "./cerveja.model.js";

/**
 * @returns {Promise<Cerveja[]>}
 */
export function buscarCervejas(pesquisa) {
    const api = new URL("https://stormy-coast-26905.herokuapp.com/api/cerveja");
    api.searchParams.set("nome", pesquisa);
    api.searchParams.set("descricao", pesquisa);

    return fetch(api.toString())
        .then(response => response.json())
        .then(response => response.map(cerveja => new Cerveja(cerveja)))
}