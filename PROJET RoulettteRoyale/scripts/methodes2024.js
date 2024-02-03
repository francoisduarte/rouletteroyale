//cette fonction retournera un objet "compteurs" contenant le nombre de numéros rouges, noirs, pairs, impairs, manque, passe, ainsi que le décompte pour chaque douzaine, chaque colonne et chaque combinaison de douzaines et de colonnes. 
function compterCoupsGagnants() {
    let compteurs = {
        rouge: 0,
        noir: 0,
        pair: 0,
        impair: 0,
        manque: 0,
        passe: 0,
        D1: 0,
        D2: 0,
        D3: 0,
        C1: 0,
        C2: 0,
        C3: 0,
        D1D2: 0,
        D1D3: 0,
        D2D3: 0,
        C1C2: 0,
        C1C3: 0,
        C2C3: 0,
        vert: 0  // Ajout du compteur pour le vert
    };

    numerosSortis.forEach(numero => {
        if (estRouge(numero)) compteurs.rouge++;
        if (estNoir(numero)) compteurs.noir++;
        if (estPair(numero)) compteurs.pair++;
        if (estImpair(numero)) compteurs.impair++;
        if (estManque(numero)) compteurs.manque++;
        if (estPasse(numero)) compteurs.passe++;
        if (estNumD1(numero)) compteurs.D1++;
        if (estNumD2(numero)) compteurs.D2++;
        if (estNumD3(numero)) compteurs.D3++;
        if (estNumC1(numero)) compteurs.C1++;
        if (estNumC2(numero)) compteurs.C2++;
        if (estNumC3(numero)) compteurs.C3++;
        if (estNumD1D2(numero)) compteurs.D1D2++;
        if (estNumD1D3(numero)) compteurs.D1D3++;
        if (estNumD2D3(numero)) compteurs.D2D3++;
        if (estNumC1C2(numero)) compteurs.C1C2++;
        if (estNumC1C3(numero)) compteurs.C1C3++;
        if (estNumC2C3(numero)) compteurs.C2C3++;
        if (estVert(numero)) compteurs.vert++; 
    });

    return compteurs;
}


// a partir de cet objet Compteurs, créer un tableau html classé par odre décroissant.
function creerTableauTrie() {
    let compteurs = compterCoupsGagnants(); // Assurez-vous que cette fonction est appelée correctement
    let tableauTrie = Object.entries(compteurs).sort((a, b) => b[1] - a[1]); // Convertit en tableau et trie

    let tableauHtml = '<table><tr><th>Méthode</th><th>Nombre</th></tr>';

    tableauTrie.forEach(([methode, nombre]) => {
        tableauHtml += `<tr><td>${methode}</td><td>${nombre}</td></tr>`;
    });

    tableauHtml += '</table>';
    return tableauHtml;
}

// Utilisation de la fonction
let tableauHtml = creerTableauTrie();
document.getElementById('idDuTableauTrieDesMethodesParOccurence').innerHTML = tableauHtml;
// Dans cette fonction :

// Object.entries(compteurs) convertit l'objet en un tableau de paires [clé, valeur].
// .sort((a, b) => b[1] - a[1]) trie ce tableau par les valeurs (les compteurs) en ordre décroissant.
// Ensuite, nous faisons le tableau HTML à partir des données triées, en ajoutant une ligne pour chaque méthode avec son nom et son nombre d'occurrences.
// Pour afficher le tableau, vous devrez avoir un élément dans votre HTML où vous pouvez insérer ce tableau. Remplacez 'idDuTableauTrieDesMethodesParOccurence' par l'ID de l'élément HTML où vous souhaitez afficher le tableau.


//cette fonction compter les 0 (numéros verts)
function compterVerts() {
    let compteVert = 0;
    numerosSortis.forEach(num => {
        if (estVert(num)) {
            compteVert++;
        }
    });
    return compteVert;
}


// CETTE fonction convertit en pourcentage 





// les couleurs
function methodeRouge() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estRouge(dernierNumero); // Retourne vrai si le dernier numéro est rouge
}

function methodeNoire() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNoir(dernierNumero); // Retourne vrai si le dernier numéro est noir
}

// les Paires et impaires
function methodePaire() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumPaire(dernierNumero); // Utilise la fonction existante estNumPaire
}

function methodeImpaire() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumImpaire(dernierNumero); // Utilise la fonction existante estNumImpaire
}


// les Paires et impaires
function methodeManque() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumManque(dernierNumero); // Utilise la fonction existante estNumManque
}

function methodePasse() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumPasse(dernierNumero); // Utilise la fonction existante estNumPasse
}

// les MANQUE et PASSE

function methodeManque() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumManque(dernierNumero); // Utilise la fonction existante estNumManque
}

function methodePasse() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumPasse(dernierNumero); // Utilise la fonction existante estNumPasse
}


// PREMIERE DOUZAINE, SECONDE DOUZAINE et TROISIEME DOUZAINE

function methodePremiereDouzaine() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumD1(dernierNumero); // Utilise la fonction existante estNumD1
}

function methodeSecondeDouzaine() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumD2(dernierNumero); // Utilise la fonction existante estNumD2
}

function methodeTroisiemeDouzaine() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumD3(dernierNumero); // Utilise la fonction existante estNumD3
}



// PREMIERE COLONNE, SECONDE COLONNE et TROISIEME COLONNE

function methodeColonne1() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumC1(dernierNumero); // Utilise la fonction existante estNumC1
}

function methodeColonne2() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumC2(dernierNumero); // Utilise la fonction existante estNumC2
}

function methodeColonne3() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumC3(dernierNumero); // Utilise la fonction existante estNumC3
}

// DEUX DOUZAINES  D1-D2, D2-D3, ou  D1-D3
// -------------------------------------------------------------------------------
function methodeD1D2() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumD1D2(dernierNumero); // Utilise la fonction existante estNumD1D2
}

function methodeD2D3() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumD2D3(dernierNumero); // Utilise la fonction existante estNumD2D3
}

function methodeD1D3() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumD1D3(dernierNumero); // Utilise la fonction existante estNumD1D3
}

// DEUX COLONNES  C1-C2, C1-C3 OU C2-C3.
// -------------------------------------------------------------------------------
function methodeC1C2() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumC1C2(dernierNumero); // Utilise la fonction existante estNumC1C2
}

function methodeC1C3() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumC1C3(dernierNumero); // Utilise la fonction existante estNumC1C3
}

function methodeC2C3() {
    if (numerosSortis.length === 0) return false; // Aucun numéro n'a été sorti
    const dernierNumero = numerosSortis[numerosSortis.length - 1];
    return estNumC2C3(dernierNumero); // Utilise la fonction existante estNumC2C3
}



