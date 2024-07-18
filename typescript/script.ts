// _____ VARIABLE_______\\

// pour contenir le ID du coin qui va se deplacer
let idCoinToMove : string[3];

// pour type d'un objet qui contient le position du coin qui va se deplacer
interface objetIndex {
    Ligne : number,
    Colonne : number
}

// pour gérer le toure de l'un et l'autre
let toureA : boolean | null = true;

// pour contenier le position du coin qui est en main
let coinCourant : objetIndex = {
    Ligne : -1,
    Colonne : -1
}

// pour gérer les coin qui va se combiner lors d'une attack du fore à la faible
let coinCombinerA : any = [];
let coinCombinerB : any = [];

// pour gérer les cellules qu'un coin peut se deplacer 
let celluleToMove : Array<Array<boolean>> = [
    [false,false,false,false],
    [false,false,false,false],
    [false,false,false,false],
    [false,false,false,false],
]

// pour gérer les attacks , la comparaison du puissance  
let CoinJoueurA : Array<Array<number>>= [
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
let CoinJoueurB : Array<Array<number>>= [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1]
]
// pour gérer les cellules occuper et inoccuper
let celluleOccuped : Array<Array<boolean>> = [
    [true,true,true,true],
    [false,false,false,false],
    [false,false,false,false],
    [true,true,true,true],
]

let celluleToMovePrecedant : Array<Array<boolean>> =  [
    [false,false,false,false],
    [false,false,false,false],
    [false,false,false,false],
    [false,false,false,false],
];
let toutCellule = document.querySelectorAll("td");




// ______ FONCTION _____\\

// mettre en vert tout le cellule où le coin peut aller
let checkToGreenIfAvailableToMove = (plateau : Array<Array<boolean>>,enleverGreen : boolean ) =>{
    let cellule : any;
    for (let ligne = 0;ligne<plateau.length;ligne++){
        for (let colonne = 0;colonne<plateau.length;colonne++){
            cellule = document.getElementById(`cellule-${ligne+1}-${colonne+1}`);
            if (plateau[ligne][colonne]){
                (enleverGreen) ? cellule?.classList.remove('green') : cellule?.classList.add('green');
            } else {
                cellule?.classList.remove("green");
            }
        }
    }
}
// retourne un tableau qui contient tout les positions où un coin peut aller
let lineAndColumnToMove = (ligne : number ,colonne : number ) : Array<objetIndex>  =>{
    let lineANDcolumn : Array<objetIndex> = []; 
     if ((ligne - 1) > 0){
        lineANDcolumn.push({
            Ligne : ligne-1,
            Colonne : colonne
        });
    }
    if ((colonne - 1) > 0){
        lineANDcolumn.push({
            Ligne : ligne,
            Colonne : colonne-1
        });
    }
    if ((colonne - 1)>0 && (ligne - 1) > 0){
        lineANDcolumn.push({
            Ligne : ligne-1,
            Colonne : colonne-1
        });
    }
    if ((ligne + 1) < 5){
        lineANDcolumn.push({
            Ligne : ligne+1,
            Colonne : colonne
        });
    }
    
    if ((colonne + 1) < 5){
        lineANDcolumn.push({
            Ligne : ligne,
            Colonne : colonne+1
        });
    }
    if ((colonne + 1) < 5 && (ligne + 1) < 5){
        lineANDcolumn.push({
            Ligne : ligne+1,
            Colonne : colonne+1
        });
    }
    if ((colonne - 1) > 0 && (ligne + 1) < 5){
        lineANDcolumn.push({
            Ligne : ligne+1,
            Colonne : colonne-1
        });
    }
    if ((colonne + 1) < 5 && (ligne - 1) > 0){
        lineANDcolumn.push({
            Ligne : ligne-1,
            Colonne : colonne+1
        });
    }
    return lineANDcolumn;
}

// vérifier le toure de l'un et l'autre
let allIdA = ["A-1","A-2","A-3","A-4"];
let checkToureA = (idA : string[3]) : any=>{
    for (let i =0;i<allIdA.length;i++){
        if (allIdA[i] == idA){
            return true;
        }
    }
}
let allIdB = ["B-1","B-2","B-3","B-4"];
let checkToureB = (idB : string[3]) : any=>{
    for (let i =0;i<allIdB.length;i++){
        if (allIdB[i] == idB){
            return true;
        }
    }
}
// deplacer le ID qu'on vient de conquerir 
let deplacer = (id : string[3],AtoB : boolean)=>{
    if (AtoB){
        for (let i=0;i<allIdA.length;i++){
            if (allIdA[i] == id){
                allIdB.push(id);
                const nouveauTableau = allIdA.filter(element => element !== id);
                allIdA = [];
                allIdA = nouveauTableau;
                // allIdA.splice(i,(i+1));
                break;
            }
        }
    } else {
        for (let j=0;j<allIdB.length;j++){
            if (allIdB[j] == id){   
                allIdA.push(id);
                const nouveauTableau = allIdB.filter(element => element !== id);
                allIdB = [];
                allIdB = nouveauTableau;
                // allIdB.splice(j,(j+1));
                break;
            }
        }
    }
}

// decter si quelqu'un avait 12 case
let decterGagnant = () : 'A' | 'B' | null =>{
    if (compterCellule('A') == 12){
        toureA = null
        return 'A'
    }
    if (allIdB.length == 0){
        toureA = null
        return 'A'
    }
    if(compterCellule('B') == 12) {
        toureA = null
        return 'B'
    }
    if (allIdA.length == 0){
        toureA = null
        return 'B'
    }
    return null
    
}


let compterCellule = (joueur : 'A' | 'B') : number =>{
    let cpt : number = 0;
    if (joueur = 'A'){
        for( let i=0;i<toutCellule.length;i++){
            if (toutCellule[i].classList.contains('blue')){
                cpt++;
            }
        }
    }
    return cpt;
}

// ______ EVENEMENT _____\\


// un coin est clicker 
let mettreVertToggle : boolean = false;
let mettreVert : boolean = true;
let checkToMove = (coinIdToMove : string[3]) =>{

    if (idCoinToMove == coinIdToMove){
        if (!mettreVertToggle){
            mettreVert = false;
            mettreVertToggle = true;
        }else{
            mettreVert = true;
            mettreVertToggle = false;   
        }
    }else{
        mettreVert = true;
    }

    idCoinToMove = coinIdToMove;
    let coinToMove = document.getElementById(coinIdToMove);
    let classCellule  = coinToMove?.parentElement?.classList[1];
    let ligne : number = 0; let colonne : number = 0;
    if (typeof(classCellule) == 'string')  (ligne = parseInt(classCellule[8])) && (colonne = parseInt(classCellule[10]));

    coinCourant.Ligne = ligne; coinCourant.Colonne = colonne;
    

    celluleToMove.map(valeur => valeur.fill(false))
    
    if (mettreVert){
        for (let i = 0,n = lineAndColumnToMove(ligne,colonne);i<n.length;i++){
            celluleToMove[n[i].Ligne-1][n[i].Colonne-1] = true;
        }
        checkToGreenIfAvailableToMove(celluleToMove,false);
    } else {
        celluleToMove.map(valeur => valeur.fill(false))
        checkToGreenIfAvailableToMove(celluleToMove,false);
    }
    
    
}


let moveAtThis = (idCelluleDestination : string ) =>{
    let celluleDestination = document.getElementById(idCelluleDestination);
    let coin = document.getElementById(idCoinToMove);
    let celluleDepart = coin?.parentElement;
    let ligneDestination : number = 0; let colonneDestination : number = 0;
    let ligneDepart : number = 0; let colonneDepart : number = 0;

    // pour le ligne et colonne du cellule de depart
    if (celluleDepart && (typeof(parseInt(celluleDepart.classList[1][8])) == 'number') && (typeof(parseInt(celluleDepart.classList[1][10])) == 'number') ){
        ligneDepart = parseInt(celluleDepart.classList[1][8]);
        colonneDepart = parseInt(celluleDepart.classList[1][10]);
    }
    // pour le ligne et colonne du cellule d'arriver
    if ( (celluleDestination?.classList[1][8] && typeof( parseInt(celluleDestination?.classList[1][8])) == 'number' ) && (celluleDestination?.classList[1][10] && typeof( parseInt(celluleDestination?.classList[1][10])) == 'number' )){
        ligneDestination = parseInt(celluleDestination?.classList[1][8]);
        colonneDestination = parseInt(celluleDestination?.classList[1][10]);
    }

    // si un coin est clicker
    if (coin && (celluleToMove[ligneDestination-1][colonneDestination-1] == true) ){

        // si toure de A (blue)
        if (checkToureA(idCoinToMove) && toureA){
            
            CoinJoueurA[ligneDestination-1][colonneDestination-1] += CoinJoueurA[ligneDepart-1][colonneDepart-1];
            CoinJoueurA[ligneDepart-1][colonneDepart-1] = 0;    

            celluleOccuped[ligneDepart-1][colonneDepart-1] = false;
            celluleOccuped[ligneDestination-1][colonneDestination-1] = true;

            // si le cellule de destionation avait occupé par un coin
            if (celluleDestination?.children[0] && celluleDepart?.children[0]){
                // tester s'il est est notre advesrsaire
                if (celluleDestination.classList.contains("red")){

                    // tester s'il est faible que nous
                    if ((CoinJoueurB[ligneDestination-1][colonneDestination-1]) < (CoinJoueurA[ligneDestination-1][colonneDestination-1]) ) {

                        // changer le cellule de destination en bleu
                        celluleDestination.classList.remove("red"); celluleDestination.classList.add("blue");
                        // gestion pour le toure
                        deplacer(celluleDestination.children[0].id,false);
                        // augementer notre coin combiner
                        celluleDestination.children[0].classList.remove("B"); celluleDestination.children[0].classList.add("A");

                        // on doit mettre 1 le puissance du coin qu'on va combiner
                        celluleDestination.children[0].textContent = 1+"";
                        coinCombinerA.push(celluleDestination.children[0])

                        // la puissance de notre coin pour le cellule de destination égale ça puissance + de notre - 1 pour le depart
                        CoinJoueurA[ligneDestination-1][colonneDestination-1] += CoinJoueurB[ligneDestination-1][colonneDestination-1] - 1;
                        // et notre adversaire perdre cette puissance
                        CoinJoueurB[ligneDestination-1][colonneDestination-1] = 0;

                        CoinJoueurA[ligneDepart-1][colonneDepart-1] = 1; // mettre 1 pour le depart
                        celluleOccuped[ligneDepart-1][colonneDepart-1] = true; // dit que cette cellule est occupé
                        // mettre un coin dans le cellule de depart
                        celluleDepart.appendChild(coinCombinerA[0]);
                        coinCombinerA.splice(0,1);

                        // modifier la valeur de notre coin pour le destination 
                        if (coin.textContent) coin.textContent = CoinJoueurA[ligneDestination-1][colonneDestination-1]+"";
                        // suprimer le coin dans le cellule de destination
                        let ASuprimer = document.getElementById(celluleDestination.children[0].id)
                        if (ASuprimer){
                            celluleDestination.removeChild( ASuprimer)
                        }
                        celluleDestination.appendChild(coin);
                        celluleToMove.map(valeur => valeur.fill(false));
                        checkToGreenIfAvailableToMove(celluleToMove,false);
                        toureA = false;
                    } else {
                        console.log("Notre adversaire est plus forte que nous ou equivalent");
                        
                    }
                    
                } else {
                    // si non
                    // gerer les coin qui va être combiner
                    coinCombinerA.push(celluleDepart?.children[0]);
                    let coinASuprimer = document.getElementById(celluleDepart?.children[0].id);
                    if (coinASuprimer) celluleDepart.removeChild(coinASuprimer);
                    celluleDestination.children[0].textContent = `${CoinJoueurA[ligneDestination-1][colonneDestination-1] }`;

                    celluleDestination?.classList.remove('red'); celluleDestination?.classList.add('blue');
                    celluleToMove.map(valeur => valeur.fill(false));
                    checkToGreenIfAvailableToMove(celluleToMove,false);
                    toureA = false;
                }
                
            // si non, c'est de notre
            } else {
                // si le cellule de destination n'appartient pas à lui même 
                if (!celluleDestination?.classList.contains("blue") ){
                    // alors, notre coin vas deminuer en puissance à chaque mouvement 
                    if ((CoinJoueurA[ligneDestination-1][colonneDestination-1]) > 1){
                        // mettre un coin à la cellule du depàart
                        CoinJoueurA[ligneDepart-1][colonneDepart-1] = 1; // mettre 1 pour le depart
                        celluleOccuped[ligneDepart-1][colonneDepart-1] = true; // dit que cette cellule est maintenant occupe
                        coinCombinerA[0].textContent = CoinJoueurA[ligneDepart-1][colonneDepart-1]; // appliquer le dans le view
                        celluleDepart?.appendChild(coinCombinerA[0]); // mettre le view maintenant
                        // décrementer puissance du coin maintenant
                        CoinJoueurA[ligneDestination-1][colonneDestination-1] = CoinJoueurA[ligneDestination-1][colonneDestination-1] - 1;
                        // modifier le coin pour la cellule de destination
                        if (coin.textContent) coin.textContent = CoinJoueurA[ligneDestination-1][colonneDestination-1]+"";
                        // enlever le dans le coin combiner
                        coinCombinerA.splice(0,1);
                    }
                     
                }
                
                celluleDestination?.appendChild(coin);
                celluleDestination?.classList.remove('red'); celluleDestination?.classList.add('blue');
                celluleToMove.map(valeur => valeur.fill(false));
                checkToGreenIfAvailableToMove(celluleToMove,false);
                toureA = false;
            }

        // si toure de B (red)
        }else if (checkToureB(idCoinToMove) && !toureA){
            // toure du rouge
            CoinJoueurB[ligneDestination-1][colonneDestination-1] += CoinJoueurB[ligneDepart-1][colonneDepart-1];
            CoinJoueurB[ligneDepart-1][colonneDepart-1] = 0;
    
            celluleOccuped[ligneDepart-1][colonneDepart-1] = false;
            celluleOccuped[ligneDestination-1][colonneDestination-1] = true;


            if (celluleDestination?.children[0] && celluleDepart?.children[0]){

                // tester s'il est est notre advesrsaire
                if (celluleDestination.classList.contains("blue")){

                    // tester s'il est faible que nous
                    if ((CoinJoueurA[ligneDestination-1][colonneDestination-1]) < (CoinJoueurB[ligneDestination-1][colonneDestination-1]) ) {
                        
                        // changer le cellule de destination en rouge
                        celluleDestination.classList.remove("blue"); celluleDestination.classList.add("red");
                        // gestion pour le toure
                        deplacer(celluleDestination.children[0].id,true);
                        // augementer notre coin combiner
                        celluleDestination.children[0].classList.remove("A"); celluleDestination.children[0].classList.add("B");
                        // on doit mettre 1 le puissance du coin qu'on va combiner
                        celluleDestination.children[0].textContent = 1+"";
                        coinCombinerB.push(celluleDestination.children[0])
                        // la puissance de notre coin pour le cellule de destination égale ça puissance + de notre - 1 pour le depart
                        CoinJoueurB[ligneDestination-1][colonneDestination-1] += CoinJoueurA[ligneDestination-1][colonneDestination-1] - 1;
                        // et notre adversaire perdre cette puissance
                        CoinJoueurA[ligneDestination-1][colonneDestination-1] = 0;

                        CoinJoueurB[ligneDepart-1][colonneDepart-1] = 1; // mettre 1 pour le depart
                        celluleOccuped[ligneDepart-1][colonneDepart-1] = true; // dit que cette cellule est occupé
                        // mettre un coin dans le cellule de depart
                        celluleDepart.appendChild(coinCombinerB[0]);
                        coinCombinerB.splice(0,1);

                        // modifier la valeur de notre coin pour le destination 
                        if (coin.textContent) coin.textContent = CoinJoueurB[ligneDestination - 1][colonneDestination - 1] +"";
                        // suprimer le coin dans le cellule de destination
                        let ASuprimer = document.getElementById(celluleDestination.children[0].id)
                        if (ASuprimer){
                            celluleDestination.removeChild( ASuprimer)
                        }
                        celluleDestination.appendChild(coin);
                        celluleToMove.map(valeur => valeur.fill(false));
                        checkToGreenIfAvailableToMove(celluleToMove,false);
                        toureA = true;
                    } else {

                    }
                    
                } else {

                    // gerer les coin qui vient d'être combiner
                    coinCombinerB.push(celluleDepart?.children[0]);
                    let coinASuprimer = document.getElementById(celluleDepart?.children[0].id);
                    if (coinASuprimer) celluleDepart.removeChild(coinASuprimer);
                    celluleDestination.children[0].textContent = `${CoinJoueurB[ligneDestination-1][colonneDestination-1] }`;
                    
                    celluleDestination?.classList.remove('blue'); celluleDestination?.classList.add('red');
                    celluleToMove.map(valeur => valeur.fill(false));
                    checkToGreenIfAvailableToMove(celluleToMove,false);
                    toureA = true;
                }

            } else {
                if (!celluleDestination?.classList.contains("red")){
                    if ((CoinJoueurB[ligneDestination-1][colonneDestination-1]) > 1){
                        // mettre un coin à la cellule du depàart
                        CoinJoueurB[ligneDepart-1][colonneDepart-1] = 1; // mettre 1 pour le depart
                        celluleOccuped[ligneDepart-1][colonneDepart-1] = true; // dit que cette cellule est maintenant occupe
                        coinCombinerB[0].textContent = CoinJoueurB[ligneDepart-1][colonneDepart-1]; // appliquer le dans le view
                        celluleDepart?.appendChild(coinCombinerB[0]); // mettre le view maintenant
                        // décrementer puissance du coin maintenant
                        CoinJoueurB[ligneDestination-1][colonneDestination-1] = CoinJoueurB[ligneDestination-1][colonneDestination-1] - 1;
                        if (coin.textContent) coin.textContent = CoinJoueurB[ligneDestination-1][colonneDestination-1]+"";
                        // enlever le dans le coin combiner
                        coinCombinerB.splice(0,1);
                    }
                }
                celluleDestination?.appendChild(coin);
                celluleDestination?.classList.remove('blue'); celluleDestination?.classList.add('red');
                celluleToMove.map(valeur => valeur.fill(false));
                checkToGreenIfAvailableToMove(celluleToMove,false);
                toureA = true;
            }
        }
        
    }
}
