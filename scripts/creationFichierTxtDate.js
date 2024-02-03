let fichierCompteur = 1; // Commencez avec 1 et incrémentez pour chaque fichier créé

// on récupère la date
function formaterDate(date) {
    let jour = date.getDate().toString().padStart(2, '0');
    let mois = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0
    let annee = date.getFullYear();
    return `${annee}${mois}${jour}`;
}
// On formate la date pour le nom du fichier txt qui sera créé et on incrément de 1 si le fichier existe déjà.
function genererNomFichier() {
    let dateDuJour = formaterDate(new Date());
    let nomFichier = `permanence_du_${dateDuJour}_${fichierCompteur.toString().padStart(3, '0')}.txt`;

    fichierCompteur++; // Incrémentez le compteur pour la prochaine utilisation
    return nomFichier;
}

function creerEtTelechargerFichier() {
    const exportPermanence = document.getElementById('exportPermanence');
    const nombreDeSpins = document.getElementById('count2').textContent;
    const dateDuJour = new Date().toLocaleDateString();

    const contenu = `---------------------------\n Date: ${dateDuJour}\n Nombre de spins: ${nombreDeSpins}\n--------------------------- \n\n${exportPermanence.value} ` ;
        const blob = new Blob([contenu], { type: "text/plain;charset=utf-8" });
    const lien = document.createElement("a");

    lien.href = URL.createObjectURL(blob);
    lien.download = genererNomFichier(); // cree le fichier dans le chemin souhaité.
    lien.click();
    URL.revokeObjectURL(lien.href);
}



// Appeler cette fonction pour télécharger le fichier
//creerEtTelechargerFichier();
