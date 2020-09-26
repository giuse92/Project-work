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
    bloccoFilaOrizz();//Blocco figlio di div.fila-orizz
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

//Blocco per fila-orizz Interno Div Categorie
function bloccoFilaOrizz() {
    let divFilaOrizzLista = document.querySelectorAll('#elenco-per-categoria .categoria .fila-orizz');
    
    for (let i = 0; i < divFilaOrizzLista.length; i++) {
        let divFilaOrizz = divFilaOrizzLista[i];
        //let strNomeCtgra = nomeCtgraLista[i].innerHTML;
        let datoFilm = datiFilm[i];
        
        //if (strNomeCtgra === datoFilm.categoria) {
        for (let objMedia of datoFilm.media) {
            let divBlocco = document.createElement('div');
            divBlocco.classList.add('blocco');
            divFilaOrizz.append(divBlocco);

            for (let propMedia in objMedia) {

                if (propMedia === 'percorsoImg') {
                    let percorsoImg = document.createElement('img');
                    percorsoImg.src = objMedia[propMedia];
                    percorsoImg.alt = objMedia.titolo;
                    divBlocco.prepend(percorsoImg);
                } else if (propMedia === 'stelle') {
                    let spanStelle = document.createElement('span');
                    spanStelle.className = "stelle";
                    for (let n = 0; n < objMedia.stelle; n++) {
                        spanStelle.innerHTML += "&#11088;";
                    };
                    divBlocco.prepend(spanStelle);
                } else if (propMedia === 'titolo') {
                    let pTitoloBlocco = document.createElement('p');
                    pTitoloBlocco.className = "titolo-blocco";
                    pTitoloBlocco.innerHTML = objMedia[propMedia];
                    divBlocco.prepend(pTitoloBlocco);
                }
            }
        }
        //}
        
    }
}

//Richiamo funzioni
costrfilaCtgre();