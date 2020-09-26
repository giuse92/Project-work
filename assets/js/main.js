import {datiFilm} from './dataApp.js';

//Costruisco Fila Categorie
function costrfilaCtgre() {
    let sezioneElencoCategoria = document.querySelector('section#elenco-per-categoria');

    for (let i = 0; i < datiFilm.length; i++) {

        let divCtgra = document.createElement('div');
        divCtgra.className = "categoria";

        sezioneElencoCategoria.append(divCtgra);
    }

    intCtgre(); //Figli di div.categoria
}

//Interno Div Categorie
function intCtgre() {
    let divCategoriaLista = document.querySelectorAll('div.categoria');
    
    for (let i = 0; i < divCategoriaLista.length; i++) {
        let divCatgra = divCategoriaLista[i];
        
        let nomeCtgra = document.createElement('h2');
        nomeCtgra.className = "nome-categoria";
        nomeCtgra.innerHTML = datiFilm[i].categoria;

        divCatgra.append(nomeCtgra);

        let divFilaOrizz = document.createElement('div');
        divFilaOrizz.classList.add('fila-orizz');
        
        nomeCtgra.after(divFilaOrizz);
    }
}

//Richiamo funzioni
costrfilaCtgre();