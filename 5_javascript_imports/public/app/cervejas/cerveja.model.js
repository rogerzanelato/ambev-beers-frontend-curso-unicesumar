export class Cerveja {
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
