// Capturamos a referência no DOM do Input com id: "search-field"
const input = document.getElementById('search-field');

// Delegamos a função handleInputEvent para ser acionada sempre que o usuário digitar alguma coisa no campo de pesquisa 
input.addEventListener('input', function () {
    recriarCervejasDebounced(this.value);
});

// Adicionamos o recriarCervejas no evento de load, para que as cervejas sejam carregadas ao abrir a página
window.addEventListener('load', function() {
    recriarCervejas("");
});

const recriarCervejasDebounced = debounce(async (pesquisa) => await recriarCervejas(pesquisa), 300);
function debounce(func, interval) {
    let timer = null;
  
    return (...args) => {
      clearTimeout(timer);
      return new Promise((resolve) => {
        timer = setTimeout(
          () => resolve(func(...args)),
          interval,
        );
      });
    };
}

async function recriarCervejas(pesquisa) {
    const cervejas = await buscarCervejas(pesquisa);
    renderizarCervejas(cervejas);
}

async function buscarCervejas(pesquisa) {   
    // Montamos a URL do back-end com os parâmetros de filtro à esr enviado por QueryString 
    const api = new URL("https://stormy-coast-26905.herokuapp.com/api/cerveja");
    api.searchParams.set("nome", pesquisa);
    api.searchParams.set("descricao", pesquisa);

    // Efetuamos a requisição por Ajax e aguardamos que ela termine
    const response = await fetch(api.toString())
        .then(response => response.json());
    
    // Mapeamos a response para a classe Cerveja
    return response.map(cervejaResponse => new Cerveja(cervejaResponse));
}

/**
 * @param {Cerveja[]} cervejas 
 */
function renderizarCervejas(cervejas) {
    // Capturamos o elemento do DOM com o id: "cervejas"
    const content = document.getElementById('cervejas');
    // Limpamos o conteúdo do elemento
    content.innerHTML = "";

    // Criamos o conteúdo de forma dinâmica à partir da response do back-end, mapeando os dados para um array de htmls
    // e depois concatenando com string para adicioná-lo ao DOM
    const novoHtml = cervejas
        .map(cerveja => criarHtmlCerveja(cerveja))
        .join("");

    content.innerHTML = novoHtml;
}

/**
 * @param {Cerveja} cerveja 
 */
 function criarHtmlCerveja(cerveja) {
    return `
        <div class="card">
            <div class="card__left">
                <h1 class="card__title">${cerveja.nome}</h1>

                <div class="card__tags">
                    <span class="card__tag">${cerveja.tipo}</span>
                    <img class="card__origem" src="${cerveja.origemImg}" title="Origem">
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
                <img class="card__imagem" src="${cerveja.img}">
            </div>
        </div>
    `;
}

class Cerveja {
    nome = "";
    tipo = "";
    ibu = "";
    img = "";
    origemImg = "";
    descricao = "";
    teorAlcoolico = "";

    constructor(dados) {
        Object.assign(this, dados);
    }
}
