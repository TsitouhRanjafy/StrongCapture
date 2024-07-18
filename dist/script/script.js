// _____ VARIABLE_______\\
// pour contenir le ID du coin qui va se deplacer
var idCoinToMove;
// pour gérer le toure de l'un et l'autre
var toureA = true;
// pour contenier le position du coin qui est en main
var coinCourant = {
    Ligne: -1,
    Colonne: -1
};
// pour gérer les coin qui va se combiner lors d'une attack du fore à la faible
var coinCombinerA = [];
var coinCombinerB = [];
// pour gérer les cellules qu'un coin peut se deplacer 
var celluleToMove = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
];
// pour gérer les attacks , la comparaison du puissance  
var CoinJoueurA = [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
var CoinJoueurB = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1]
];
// pour gérer les cellules occuper et inoccuper
var celluleOccuped = [
    [true, true, true, true],
    [false, false, false, false],
    [false, false, false, false],
    [true, true, true, true],
];
var celluleToMovePrecedant = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
];
var toutCellule = document.querySelectorAll("td");
// ______ FONCTION _____\\
// mettre en vert tout le cellule où le coin peut aller
var checkToGreenIfAvailableToMove = function (plateau, enleverGreen) {
    var cellule;
    for (var ligne = 0; ligne < plateau.length; ligne++) {
        for (var colonne = 0; colonne < plateau.length; colonne++) {
            cellule = document.getElementById("cellule-".concat(ligne + 1, "-").concat(colonne + 1));
            if (plateau[ligne][colonne]) {
                (enleverGreen) ? cellule === null || cellule === void 0 ? void 0 : cellule.classList.remove('green') : cellule === null || cellule === void 0 ? void 0 : cellule.classList.add('green');
            }
            else {
                cellule === null || cellule === void 0 ? void 0 : cellule.classList.remove("green");
            }
        }
    }
};
// retourne un tableau qui contient tout les positions où un coin peut aller
var lineAndColumnToMove = function (ligne, colonne) {
    var lineANDcolumn = [];
    if ((ligne - 1) > 0) {
        lineANDcolumn.push({
            Ligne: ligne - 1,
            Colonne: colonne
        });
    }
    if ((colonne - 1) > 0) {
        lineANDcolumn.push({
            Ligne: ligne,
            Colonne: colonne - 1
        });
    }
    if ((colonne - 1) > 0 && (ligne - 1) > 0) {
        lineANDcolumn.push({
            Ligne: ligne - 1,
            Colonne: colonne - 1
        });
    }
    if ((ligne + 1) < 5) {
        lineANDcolumn.push({
            Ligne: ligne + 1,
            Colonne: colonne
        });
    }
    if ((colonne + 1) < 5) {
        lineANDcolumn.push({
            Ligne: ligne,
            Colonne: colonne + 1
        });
    }
    if ((colonne + 1) < 5 && (ligne + 1) < 5) {
        lineANDcolumn.push({
            Ligne: ligne + 1,
            Colonne: colonne + 1
        });
    }
    if ((colonne - 1) > 0 && (ligne + 1) < 5) {
        lineANDcolumn.push({
            Ligne: ligne + 1,
            Colonne: colonne - 1
        });
    }
    if ((colonne + 1) < 5 && (ligne - 1) > 0) {
        lineANDcolumn.push({
            Ligne: ligne - 1,
            Colonne: colonne + 1
        });
    }
    return lineANDcolumn;
};
// vérifier le toure de l'un et l'autre
var allIdA = ["A-1", "A-2", "A-3", "A-4"];
var checkToureA = function (idA) {
    for (var i = 0; i < allIdA.length; i++) {
        if (allIdA[i] == idA) {
            return true;
        }
    }
};
var allIdB = ["B-1", "B-2", "B-3", "B-4"];
var checkToureB = function (idB) {
    for (var i = 0; i < allIdB.length; i++) {
        if (allIdB[i] == idB) {
            return true;
        }
    }
};
// deplacer le ID qu'on vient de conquerir 
var deplacer = function (id, AtoB) {
    if (AtoB) {
        for (var i = 0; i < allIdA.length; i++) {
            if (allIdA[i] == id) {
                allIdB.push(id);
                var nouveauTableau = allIdA.filter(function (element) { return element !== id; });
                allIdA = [];
                allIdA = nouveauTableau;
                // allIdA.splice(i,(i+1));
                break;
            }
        }
    }
    else {
        for (var j = 0; j < allIdB.length; j++) {
            if (allIdB[j] == id) {
                allIdA.push(id);
                var nouveauTableau = allIdB.filter(function (element) { return element !== id; });
                allIdB = [];
                allIdB = nouveauTableau;
                // allIdB.splice(j,(j+1));
                break;
            }
        }
    }
};
// decter si quelqu'un avait 12 case
var decterGagnant = function () {
    if (compterCellule('A') == 12) {
        toureA = null;
        return 'A';
    }
    if (allIdB.length == 0) {
        toureA = null;
        return 'A';
    }
    if (compterCellule('B') == 12) {
        toureA = null;
        return 'B';
    }
    if (allIdA.length == 0) {
        toureA = null;
        return 'B';
    }
    return null;
};
var compterCellule = function (joueur) {
    var cpt = 0;
    if (joueur = 'A') {
        for (var i = 0; i < toutCellule.length; i++) {
            if (toutCellule[i].classList.contains('blue')) {
                cpt++;
            }
        }
    }
    return cpt;
};
// ______ EVENEMENT _____\\
// un coin est clicker 
var mettreVertToggle = false;
var mettreVert = true;
var checkToMove = function (coinIdToMove) {
    var _a;
    if (idCoinToMove == coinIdToMove) {
        if (!mettreVertToggle) {
            mettreVert = false;
            mettreVertToggle = true;
        }
        else {
            mettreVert = true;
            mettreVertToggle = false;
        }
    }
    else {
        mettreVert = true;
    }
    idCoinToMove = coinIdToMove;
    var coinToMove = document.getElementById(coinIdToMove);
    var classCellule = (_a = coinToMove === null || coinToMove === void 0 ? void 0 : coinToMove.parentElement) === null || _a === void 0 ? void 0 : _a.classList[1];
    var ligne = 0;
    var colonne = 0;
    if (typeof (classCellule) == 'string')
        (ligne = parseInt(classCellule[8])) && (colonne = parseInt(classCellule[10]));
    coinCourant.Ligne = ligne;
    coinCourant.Colonne = colonne;
    celluleToMove.map(function (valeur) { return valeur.fill(false); });
    if (mettreVert) {
        for (var i = 0, n = lineAndColumnToMove(ligne, colonne); i < n.length; i++) {
            celluleToMove[n[i].Ligne - 1][n[i].Colonne - 1] = true;
        }
        checkToGreenIfAvailableToMove(celluleToMove, false);
    }
    else {
        celluleToMove.map(function (valeur) { return valeur.fill(false); });
        checkToGreenIfAvailableToMove(celluleToMove, false);
    }
};
var moveAtThis = function (idCelluleDestination) {
    var celluleDestination = document.getElementById(idCelluleDestination);
    var coin = document.getElementById(idCoinToMove);
    var celluleDepart = coin === null || coin === void 0 ? void 0 : coin.parentElement;
    var ligneDestination = 0;
    var colonneDestination = 0;
    var ligneDepart = 0;
    var colonneDepart = 0;
    // pour le ligne et colonne du cellule de depart
    if (celluleDepart && (typeof (parseInt(celluleDepart.classList[1][8])) == 'number') && (typeof (parseInt(celluleDepart.classList[1][10])) == 'number')) {
        ligneDepart = parseInt(celluleDepart.classList[1][8]);
        colonneDepart = parseInt(celluleDepart.classList[1][10]);
    }
    // pour le ligne et colonne du cellule d'arriver
    if (((celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList[1][8]) && typeof (parseInt(celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList[1][8])) == 'number') && ((celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList[1][10]) && typeof (parseInt(celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList[1][10])) == 'number')) {
        ligneDestination = parseInt(celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList[1][8]);
        colonneDestination = parseInt(celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList[1][10]);
    }
    // si un coin est clicker
    if (coin && (celluleToMove[ligneDestination - 1][colonneDestination - 1] == true)) {
        // si toure de A (blue)
        if (checkToureA(idCoinToMove) && toureA) {
            CoinJoueurA[ligneDestination - 1][colonneDestination - 1] += CoinJoueurA[ligneDepart - 1][colonneDepart - 1];
            CoinJoueurA[ligneDepart - 1][colonneDepart - 1] = 0;
            celluleOccuped[ligneDepart - 1][colonneDepart - 1] = false;
            celluleOccuped[ligneDestination - 1][colonneDestination - 1] = true;
            // si le cellule de destionation avait occupé par un coin
            if ((celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.children[0]) && (celluleDepart === null || celluleDepart === void 0 ? void 0 : celluleDepart.children[0])) {
                // tester s'il est est notre advesrsaire
                if (celluleDestination.classList.contains("red")) {
                    // tester s'il est faible que nous
                    if ((CoinJoueurB[ligneDestination - 1][colonneDestination - 1]) < (CoinJoueurA[ligneDestination - 1][colonneDestination - 1])) {
                        // changer le cellule de destination en bleu
                        celluleDestination.classList.remove("red");
                        celluleDestination.classList.add("blue");
                        // gestion pour le toure
                        deplacer(celluleDestination.children[0].id, false);
                        // augementer notre coin combiner
                        celluleDestination.children[0].classList.remove("B");
                        celluleDestination.children[0].classList.add("A");
                        // on doit mettre 1 le puissance du coin qu'on va combiner
                        celluleDestination.children[0].textContent = 1 + "";
                        coinCombinerA.push(celluleDestination.children[0]);
                        // la puissance de notre coin pour le cellule de destination égale ça puissance + de notre - 1 pour le depart
                        CoinJoueurA[ligneDestination - 1][colonneDestination - 1] += CoinJoueurB[ligneDestination - 1][colonneDestination - 1] - 1;
                        // et notre adversaire perdre cette puissance
                        CoinJoueurB[ligneDestination - 1][colonneDestination - 1] = 0;
                        CoinJoueurA[ligneDepart - 1][colonneDepart - 1] = 1; // mettre 1 pour le depart
                        celluleOccuped[ligneDepart - 1][colonneDepart - 1] = true; // dit que cette cellule est occupé
                        // mettre un coin dans le cellule de depart
                        celluleDepart.appendChild(coinCombinerA[0]);
                        coinCombinerA.splice(0, 1);
                        // modifier la valeur de notre coin pour le destination 
                        if (coin.textContent)
                            coin.textContent = CoinJoueurA[ligneDestination - 1][colonneDestination - 1] + "";
                        // suprimer le coin dans le cellule de destination
                        var ASuprimer = document.getElementById(celluleDestination.children[0].id);
                        if (ASuprimer) {
                            celluleDestination.removeChild(ASuprimer);
                        }
                        celluleDestination.appendChild(coin);
                        celluleToMove.map(function (valeur) { return valeur.fill(false); });
                        checkToGreenIfAvailableToMove(celluleToMove, false);
                        toureA = false;
                    }
                    else {
                        console.log("Notre adversaire est plus forte que nous ou equivalent");
                    }
                }
                else {
                    // si non
                    // gerer les coin qui va être combiner
                    coinCombinerA.push(celluleDepart === null || celluleDepart === void 0 ? void 0 : celluleDepart.children[0]);
                    var coinASuprimer = document.getElementById(celluleDepart === null || celluleDepart === void 0 ? void 0 : celluleDepart.children[0].id);
                    if (coinASuprimer)
                        celluleDepart.removeChild(coinASuprimer);
                    celluleDestination.children[0].textContent = "".concat(CoinJoueurA[ligneDestination - 1][colonneDestination - 1]);
                    celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.remove('red');
                    celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.add('blue');
                    celluleToMove.map(function (valeur) { return valeur.fill(false); });
                    checkToGreenIfAvailableToMove(celluleToMove, false);
                    toureA = false;
                }
                // si non, c'est de notre
            }
            else {
                // si le cellule de destination n'appartient pas à lui même 
                if (!(celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.contains("blue"))) {
                    // alors, notre coin vas deminuer en puissance à chaque mouvement 
                    if ((CoinJoueurA[ligneDestination - 1][colonneDestination - 1]) > 1) {
                        // mettre un coin à la cellule du depàart
                        CoinJoueurA[ligneDepart - 1][colonneDepart - 1] = 1; // mettre 1 pour le depart
                        celluleOccuped[ligneDepart - 1][colonneDepart - 1] = true; // dit que cette cellule est maintenant occupe
                        coinCombinerA[0].textContent = CoinJoueurA[ligneDepart - 1][colonneDepart - 1]; // appliquer le dans le view
                        celluleDepart === null || celluleDepart === void 0 ? void 0 : celluleDepart.appendChild(coinCombinerA[0]); // mettre le view maintenant
                        // décrementer puissance du coin maintenant
                        CoinJoueurA[ligneDestination - 1][colonneDestination - 1] = CoinJoueurA[ligneDestination - 1][colonneDestination - 1] - 1;
                        // modifier le coin pour la cellule de destination
                        if (coin.textContent)
                            coin.textContent = CoinJoueurA[ligneDestination - 1][colonneDestination - 1] + "";
                        // enlever le dans le coin combiner
                        coinCombinerA.splice(0, 1);
                    }
                }
                celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.appendChild(coin);
                celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.remove('red');
                celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.add('blue');
                celluleToMove.map(function (valeur) { return valeur.fill(false); });
                checkToGreenIfAvailableToMove(celluleToMove, false);
                toureA = false;
            }
            // si toure de B (red)
        }
        else if (checkToureB(idCoinToMove) && !toureA) {
            // toure du rouge
            CoinJoueurB[ligneDestination - 1][colonneDestination - 1] += CoinJoueurB[ligneDepart - 1][colonneDepart - 1];
            CoinJoueurB[ligneDepart - 1][colonneDepart - 1] = 0;
            celluleOccuped[ligneDepart - 1][colonneDepart - 1] = false;
            celluleOccuped[ligneDestination - 1][colonneDestination - 1] = true;
            if ((celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.children[0]) && (celluleDepart === null || celluleDepart === void 0 ? void 0 : celluleDepart.children[0])) {
                // tester s'il est est notre advesrsaire
                if (celluleDestination.classList.contains("blue")) {
                    // tester s'il est faible que nous
                    if ((CoinJoueurA[ligneDestination - 1][colonneDestination - 1]) < (CoinJoueurB[ligneDestination - 1][colonneDestination - 1])) {
                        // changer le cellule de destination en rouge
                        celluleDestination.classList.remove("blue");
                        celluleDestination.classList.add("red");
                        // gestion pour le toure
                        deplacer(celluleDestination.children[0].id, true);
                        // augementer notre coin combiner
                        celluleDestination.children[0].classList.remove("A");
                        celluleDestination.children[0].classList.add("B");
                        // on doit mettre 1 le puissance du coin qu'on va combiner
                        celluleDestination.children[0].textContent = 1 + "";
                        coinCombinerB.push(celluleDestination.children[0]);
                        // la puissance de notre coin pour le cellule de destination égale ça puissance + de notre - 1 pour le depart
                        CoinJoueurB[ligneDestination - 1][colonneDestination - 1] += CoinJoueurA[ligneDestination - 1][colonneDestination - 1] - 1;
                        // et notre adversaire perdre cette puissance
                        CoinJoueurA[ligneDestination - 1][colonneDestination - 1] = 0;
                        CoinJoueurB[ligneDepart - 1][colonneDepart - 1] = 1; // mettre 1 pour le depart
                        celluleOccuped[ligneDepart - 1][colonneDepart - 1] = true; // dit que cette cellule est occupé
                        // mettre un coin dans le cellule de depart
                        celluleDepart.appendChild(coinCombinerB[0]);
                        coinCombinerB.splice(0, 1);
                        // modifier la valeur de notre coin pour le destination 
                        if (coin.textContent)
                            coin.textContent = CoinJoueurB[ligneDestination - 1][colonneDestination - 1] + "";
                        // suprimer le coin dans le cellule de destination
                        var ASuprimer = document.getElementById(celluleDestination.children[0].id);
                        if (ASuprimer) {
                            celluleDestination.removeChild(ASuprimer);
                        }
                        celluleDestination.appendChild(coin);
                        celluleToMove.map(function (valeur) { return valeur.fill(false); });
                        checkToGreenIfAvailableToMove(celluleToMove, false);
                        toureA = true;
                    }
                    else {
                    }
                }
                else {
                    // gerer les coin qui vient d'être combiner
                    coinCombinerB.push(celluleDepart === null || celluleDepart === void 0 ? void 0 : celluleDepart.children[0]);
                    var coinASuprimer = document.getElementById(celluleDepart === null || celluleDepart === void 0 ? void 0 : celluleDepart.children[0].id);
                    if (coinASuprimer)
                        celluleDepart.removeChild(coinASuprimer);
                    celluleDestination.children[0].textContent = "".concat(CoinJoueurB[ligneDestination - 1][colonneDestination - 1]);
                    celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.remove('blue');
                    celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.add('red');
                    celluleToMove.map(function (valeur) { return valeur.fill(false); });
                    checkToGreenIfAvailableToMove(celluleToMove, false);
                    toureA = true;
                }
            }
            else {
                if (!(celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.contains("red"))) {
                    if ((CoinJoueurB[ligneDestination - 1][colonneDestination - 1]) > 1) {
                        // mettre un coin à la cellule du depàart
                        CoinJoueurB[ligneDepart - 1][colonneDepart - 1] = 1; // mettre 1 pour le depart
                        celluleOccuped[ligneDepart - 1][colonneDepart - 1] = true; // dit que cette cellule est maintenant occupe
                        coinCombinerB[0].textContent = CoinJoueurB[ligneDepart - 1][colonneDepart - 1]; // appliquer le dans le view
                        celluleDepart === null || celluleDepart === void 0 ? void 0 : celluleDepart.appendChild(coinCombinerB[0]); // mettre le view maintenant
                        // décrementer puissance du coin maintenant
                        CoinJoueurB[ligneDestination - 1][colonneDestination - 1] = CoinJoueurB[ligneDestination - 1][colonneDestination - 1] - 1;
                        if (coin.textContent)
                            coin.textContent = CoinJoueurB[ligneDestination - 1][colonneDestination - 1] + "";
                        // enlever le dans le coin combiner
                        coinCombinerB.splice(0, 1);
                    }
                }
                celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.appendChild(coin);
                celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.remove('blue');
                celluleDestination === null || celluleDestination === void 0 ? void 0 : celluleDestination.classList.add('red');
                celluleToMove.map(function (valeur) { return valeur.fill(false); });
                checkToGreenIfAvailableToMove(celluleToMove, false);
                toureA = true;
            }
        }
    }
};
