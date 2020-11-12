fetch('assets/js/dataApp.json')
//https://raw.githubusercontent.com/giuse92/Project-work/json/assets/js/dataApp.json
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            let elencoCategoria = document.querySelector('#elenco-per-categoria');
            elencoCategoria.innerHTML = "Ops, qualcosa è andato storto...";
            elencoCategoria.setAttribute('style', 'font-size: 25px; color: red; font-weight: 700');
            elencoCategoria.style.textAlign = "center";
            elencoCategoria.style.padding = "15px 5px";
        };
    })
    .then(data => {
        //if (data !== undefined) {
        let datiFilm = data;
        costrfilaCtgre();

        //Costruisco Fila Categorie
        function costrfilaCtgre() {
            let sezioneElencoCategoria = document.querySelector('section#elenco-per-categoria');

            for (let i = 0; i < datiFilm.dettaglio.length; i++) {

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
                nomeCtgra.innerHTML = datiFilm.dettaglio[i].categoria;

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
                let datoFilm = datiFilm.dettaglio[i];

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
                            /*for (let n = 0; n < objMedia.stelle; n++) {
                                spanStelle.innerHTML += "&#11088;";
                            };*/
                            spanStelle.innerHTML = '⭐'.repeat(objMedia.stelle)
                            divBlocco.prepend(spanStelle);
                        } else if (propMedia === 'titolo') {
                            let pTitoloBlocco = document.createElement('p');
                            pTitoloBlocco.className = "titolo-blocco";
                            pTitoloBlocco.innerHTML = objMedia[propMedia];
                            divBlocco.prepend(pTitoloBlocco);
                        }

                        divBlocco.addEventListener('click', dettaglioRec);
                    }
                }
                //}

            }
        }

        //Costruisco pop-up dettaglio recensione
        function dettaglioRec(ev) {
            let menuNav = document.querySelector('nav');
            let recuperaSelector = ev.currentTarget.querySelector('p.titolo-blocco');
            let recuperaTitolo = recuperaSelector.innerHTML;
            let recuperaCtgra = ev.currentTarget.parentElement.previousElementSibling.innerHTML;
            let recuperaSrcImg = ev.currentTarget.querySelector('img').getAttribute('src');
            let sezDettaglio = document.createElement('section');
            sezDettaglio.id = "dettaglio";
            let titoloDettaglio = document.createElement('h1');
            titoloDettaglio.style.backgroundImage = `linear-gradient(to right, rgba(9, 105, 184, 0.6), rgba(3, 37, 65, 0.6)), url('${recuperaSrcImg}')`;
            titoloDettaglio.style.backgroundSize = "cover";
            titoloDettaglio.style.backgroundPosition = "center";
            let descrizioneDettaglio = document.createElement('p');
            let recensioneDettaglio = document.createElement('q');
            recensioneDettaglio.setAttribute('style', 'font-style: italic; font-weight: bold');
            let buttonBackDettaglio = document.createElement('button');
            buttonBackDettaglio.addEventListener('click', rimuoviSezDettaglio);
            buttonBackDettaglio.innerHTML = "BACK";

            sezDettaglio.append(titoloDettaglio, descrizioneDettaglio, recensioneDettaglio, buttonBackDettaglio);
            menuNav.after(sezDettaglio);

            for (let datiObj of datiFilm.dettaglio) {
                if (recuperaCtgra === datiObj.categoria) {
                    for (let dettaglioObj of datiObj.media) {
                        if (recuperaTitolo === dettaglioObj.titolo) {
                            titoloDettaglio.innerHTML = dettaglioObj.titolo;
                            descrizioneDettaglio.innerHTML = dettaglioObj.descrizione;
                            recensioneDettaglio.innerHTML = dettaglioObj.recensione;
                        }
                    }
                }
            };

            clickNoClick("none");

        };

        //Blocco ogni evento mouse sui blocchi in elenco a pop-up attivo 
        //e 
        function clickNoClick(strValue) {
            let divBlocchi = document.querySelectorAll('section div.blocco');

            for (let blocco of divBlocchi) {
                blocco.style.pointerEvents = strValue;
            }
        }

        function rimuoviSezDettaglio(recuperaSez) {
            recuperaSez = document.querySelector('section#dettaglio');
            recuperaSez.remove();
            clickNoClick("auto");
        };
    //}
    })
    .catch(error => console.log("SONO UN ERRORE: ", error))