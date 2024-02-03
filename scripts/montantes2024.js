// ---------------------
// La montante 1 2 4 8  
// ---------------------
// un systeme de gestions de montante pour jouer 24 numéros à la roulette, comme par exemple deux colonnes ou deux douzaine.
// on va miser 1 mise, puis en cas de perte on va tripler, enfin, on va doubler pour récupérer sans faire de bénéfice nos mises perdues. Le premier palier est donc 1  3  6 . En cas de trois pertes consécutives : miser 5 puis 15 puis 30


function montante1248Historique(historiqueGains,miseInitiale,maxPertesConsecutives) {
    let coupsPerdantsReelsConsecutifs = 0;
    while(coupsPerdantsReelsConsecutifs < historiqueGains.length && historiqueGains[historiqueGains.length - 1 - coupsPerdantsReelsConsecutifs] == false)
        coupsPerdantsReelsConsecutifs++;
    let pertesSequenceEnCours = coupsPerdantsReelsConsecutifs % maxPertesConsecutives;
    return Math.pow(2,pertesSequenceEnCours) * miseInitiale;
}
const montante1248DernierCoup = (dernierCoup, derniereMise, miseMaximale, miseInitiale) => {
    if(dernierCoup) return miseInitiale;
    return derniereMise * 2 <= miseMaximale ? derniereMise * 2 : miseInitiale;
}

const miserBloc0Bloc1 = (historique) => {
    if (historique.length < 2)
        return true;
    return ! (historique[historique.length - 1 ] == false && historique[historique.length - 2] == false);

}

// #01 - LA MARTINGALE DE HAWKS ou “LA MARTINGALE CLASSQIQUE"
// #02 - LA GRANDE MARTINGALE
// #03 - LA MARTINGALE A MULTIPLICATEUR
// #04 - LA MARTINGALE D’ALEMBERT
// #05 - LA MARTINGALE CONTRE D’ALEMBERT
// #06 - LA MARTINGALE CYCLIQUE 
// #07 - LA MONTANTE BREAD-WINNER
// #08 - LA MONTANTE P37 (27 PALIERS)
// #09 - LA MONTANTE WELLS
// #10 - LA MONTANTE CONTRE WELLS
// #11 - LA MARTINGALE 7 BOULES
// #12 - LA MARTINGALE DENTS DE SCIE
// #13 - LA MARTINGALE FIBONACCI
// #14 - LA MARTINGALE AMÉRICAINE
// #15 - LA PROGRESSION AMERICAINE : ASCOT
// #16 - LA MONTANTE WHITTACKER
// #17 - LA MONTANTE PIQUEMOUCHE
// #18 - LA MONTANTE 20/10
// #19 - LA MONTANTE HOLLANDAISE
// #20 - LA MONTANTE LABOUCHERE
// #21 - LA MONTANTE MANGOUSTE
// #22 - LA MARTINGALE BELGE
// #23 - LA MARTINGALE MARTIN YUNG
// #24 - LE SYSTEME OSCAR’S GRIND
// #25 - LA MARTINGALE DE BARSTOW
// #26 - LA MARTINGALE À MASSE ÉGALE
// #27 - LA MONTANTE 1 3 6
// #28 - LA MONTANTE 1 2 4 8 
// #29 - LA MONTANTE 1 1 1 2 2  4 4 8  
// #30 - LA MONTANTE 1 2 3 4 5  


// #01 - LA MARTINGALE DE HAWKS ou “LA MARTINGALE CLASSQIQUE"

// let capitalInitial = 1000; // Définir le capital initial
// let mise = valeurJeton1; // Mise initiale
// let objectifGain = 200; // Objectif de gain défini
// let stopLoss = -200; // Stop loss défini
// let coupsJoues = 0;
// let misesPerdues = 0;
// let misesGagnees = 0;
// let totalBeneficesPertes = 0;

// let capitalInitial = 1000; // Capital initial
// let mise = 1; // Mise initiale
// let objectifGain = 20; // Objectif de gain
// let stopLoss = -60; // Seuil de perte maximale
// let coupsJoues = 0, misesPerdues = 0, misesGagnees = 0, totalBeneficesPertes = 0;



function jouerMartingaleSimple() {
    if (numerosSortis.length === 0) return; // Si aucun numéro n'est enregistré, ne rien faire
    // Vérification de la présence de numéros dans le tableau
    if (numerosSortis.length === 0) return;

    let dernierNumero = numerosSortis[numerosSortis.length - 1]; // Dernier numéro sorti
        // Vérifier si le dernier numéro est gagnant
        if (verifierGain(dernierNumero)) {
            // Gagné: Réinitialiser la mise et vérifier les bénéfices
            miseActuelle = valeurJeton1;
            capital += miseActuelle;

            // Vérifier si l'objectif de gain est atteint
            if (capital >= objectifGain) {
                afficherPopupFinDeJeu("Gain atteint");
                return;
            }
        } else {
            // Perdu: Doubler la mise
            capital -= miseActuelle;
            miseActuelle *= 2;

            // Vérifier le stop loss
            if (capital <= stopLoss) {
                afficherPopupFinDeJeu("Stop loss atteint");
                return;
            }

//affichage de la mise dans un paragraphe class="miseAjouer"
            function afficherMiseAJoindre(mise) {
                const elementsMiseAJoindre = document.querySelectorAll('.miseAjouer');
            
                // Mise à jour de tous les éléments avec la classe 'miseAjouer'
                elementsMiseAJoindre.forEach(element => {
                    element.innerHTML = mise;
                });
            }
            

    // Mise à jour des statistiques
    coupsJoues++;

    if (gagne) {
        capitalInitial += mise; // Augmente le capital de la valeur de la mise
        mise = 1; // Réinitialise la mise
        misesGagnees++;
    } else {
        capitalInitial -= mise; // Réduit le capital de la valeur de la mise
        mise *= 2; // Double la mise pour le prochain coup
        misesPerdues++;

    }

    totalBeneficesPertes = capitalInitial - 1000; // Calcul du total des bénéfices et pertes

    // Vérifier si l'objectif de gain ou le stop loss est atteint
    // if (capitalInitial >= 1000 + objectifGain || capitalInitial <= 1000 - stopLoss) {
    //     afficherPopupFinDeJeu(); // Affiche un popup pour indiquer la fin du jeu
    //     return; // Arrête la fonction
    // }
    function afficherPopupFinDeJeu() {
        let montantTotal = capitalInitial - 1000; // Calcul du montant total (gains ou pertes)
        let messageFinDeJeu;
    
        if (montantTotal >= 0) {
            // Si le joueur est en bénéfice
            messageFinDeJeu = "La partie est terminée. Vous avez un gain total de : " + montantTotal + " unités.";
        } else {
            // Si le joueur est en perte
            messageFinDeJeu = "La partie est terminée. Vous avez une perte totale de : " + Math.abs(montantTotal) + " unités.";
        }
    
        // Mettre à jour le contenu du popup
        const popupContent = document.getElementById('idDuPopup'); // Remplacez par l'ID de mon  popup
        popupContent.innerHTML = messageFinDeJeu;
    
        // Afficher le popup
        togglePopup(); // Si vous avez une fonction pour afficher/masquer le popup
    }
    




    // Mettre à jour l'affichage
    mettreAJourAffichage();

    // Après calcul de la nouvelle mise
afficherMiseAJoindre(miseActuelle);


    }
}


function verifierGain(dernierNumero) {
  // Logique pour déterminer si le dernier numéro est gagnant selon la chance simple jouée
  // Retourner true si gagnant, false sinon
}

function afficherPopupFinDeJeu() {
  // Fonction pour afficher un popup en fin de jeu
}

function mettreAJourAffichage() {
  document.getElementById('coupsJoues').innerText = coupsJoues;
  document.getElementById('misesPerdues').innerText = misesPerdues;
  document.getElementById('misesGagnees').innerText = misesGagnees;
}