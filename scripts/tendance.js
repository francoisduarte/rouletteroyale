// Exemple de valeurs, à ajuster selon tes besoins
const seuilScore = 10;
const seuilEcartMoyen = 5;
const seuilEcartMax = 10;
const pointsScore = 2;
const pointsEcartMoyen = -1;
const pointsEcartMax = -2;

function calculerTendance(methode) {
    let tendance = 0;

    // Ajoute des points pour un score élevé
    if (methode.score > seuilScore) {
        tendance += pointsScore;
    }

    // Retire des points pour un écart moyen élevé
    if (methode.ecartMoyen > seuilEcartMoyen) {
        tendance -= pointsEcartMoyen;
    }

    // Retire des points pour un écart maximal élevé
    if (methode.ecartMax > seuilEcartMax) {
        tendance -= pointsEcartMax;
    }

    // Retourne la tendance calculée
    return tendance;
}

function incrementerHistorique(numero, methode){
    let nouvelEcart = calculerEcartActuel2(numero, methode);
    let nouveauScore = calculerScore(numero, methode);
    
    // Mise à jour de l'écart et du score
    methode.ecart = nouvelEcart;
    methode.score = nouveauScore;

    // Mise à jour de l'écart max si nécessaire
    if (nouvelEcart > methode.ecartMax) {
        methode.ecartMax = nouvelEcart;
    }

    // Ajout à l'historique
    methode.historique.push({ ecart: nouvelEcart, score: nouveauScore });

    // Mise à jour de l'écart moyen
    methode.ecartMoyen = calculerEcartMoyen(methode.historique);  

    // Nouveau : Calcul de la tendance
     methode.tendance = calculerTendance(methode);
}

function actualiserTableau() {
    methodesDejeu.forEach(methode => {
        // Mise à jour du score
        let score = document.getElementById("score-" + methode.nom);
        if (score) score.innerHTML = methode.score;

        // Mise à jour de l'écart
        let ecart = document.getElementById("ecart-" + methode.nom);
        if (ecart) ecart.innerHTML = methode.ecart;

        // Mise à jour de l'écart maximum
        let ecartMax = document.getElementById("ecartMax-" + methode.nom);
        if (ecartMax) ecartMax.innerHTML = methode.ecartMax;

        // Mise à jour de l'écart moyen
        let ecartMoyen = document.getElementById("ecartMoyen-" + methode.nom);
        if (ecartMoyen) ecartMoyen.innerHTML = methode.ecartMoyen.toFixed(2); // Arrondi à deux décimales

        let tendanceElement = document.getElementById("tendance-" + methode.nom);
        if (tendanceElement) tendanceElement.innerHTML = methode.tendance;

    });
}