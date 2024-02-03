// ---------------------
// La montante Labouchère
// ---------------------
//est une stratégie de gestion des mises qui consiste à utiliser une série de numéros dans une ligne pour déterminer le montant de la mise. Le joueur commence par écrire une séquence de numéros, par exemple, 1, 2, 3. La mise est alors la somme du premier et du dernier nombre de la ligne (ici, 1 + 3 = 4). Si le pari est gagnant, les numéros utilisés sont rayés de la liste. En cas de perte, le montant perdu est ajouté à la fin de la séquence. Le processus se poursuit jusqu'à ce que tous les numéros soient rayés, l'objectif étant de gagner le montant total des numéros initiaux de la séquence. Cette méthode implique une progression plus complexe que les systèmes de mise simples et requiert une bonne gestion du capital.

function labouchere(targetGain, series) {
    let currentSeries = [...series];
    let totalGain = 0;

    while (currentSeries.length > 0 && totalGain < targetGain) {
        let bet = currentSeries[0] + currentSeries[currentSeries.length - 1];

        // Simuler un pari - remplacer ceci par votre logique de pari réelle
        let isWin = Math.random() < 0.5; // Supposons une chance de 50% de gagner

        if (isWin) {
            totalGain += bet;
            // Enlever les numéros des extrémités en cas de gain
            currentSeries.shift();
            currentSeries.pop();
        } else {
            totalGain -= bet;
            // Ajouter le montant du pari à la fin en cas de perte
            currentSeries.push(bet);
        }

        //console.log('Pari: ${bet}, Gain total: ${totalGain}, Série actuelle: ${currentSeries}');
    }

    return totalGain >= targetGain;
}

// Utilisation de la fonction
let targetGain = 10;
let series = [1, 1, 2, 2, 2, 3];
let isSuccess = labouchere(targetGain, series);
//console.log('Objectif atteint: ${isSuccess}');



// ---------------------
// La méthode 7 boules
// ---------------------
// Le principe de la martingale des 7 Boules à la roulette consiste à parier 7 fois de suite la même mise sur une même chance simple. Le jeu s'arrête quand le joueur est bénéficiaire. Si après 7 coups, le joueur a un déficit, il mise ce déficit sur les 7 prochaines boules. Cette méthode présente des limites en cas de mauvaise série, avec une augmentation rapide des mises et un risque d'atteindre rapidement les limites de mise maximales. Malgré cela, elle offre plus de chances de gagner que de perdre et est considérée comme une bonne méthode de jeu à la roulette.


let seriesCount = 0;
let deficit = 0;
let valeurJeton = 1; // Valeur du jeton, peut être modifiée
let recommandationPari = "rouge"; // La recommandation peut varier

function jouerBoule(recommandation, valeurJeton) {
    const mise = seriesCount < 7 ? valeurJeton : deficit;
    const resultat = Math.random() < 0.5 ? "rouge" : "noir"; // Simuler le résultat du pari

    if (resultat === recommandation) {
        deficit -= mise;
    } else {
        deficit += mise;
    }

    seriesCount = (seriesCount + 1) % 7; // Réinitialiser après 7 boules

    if (seriesCount === 0 && deficit > 0) {
        jouerSerieSuivante(valeurJeton);
    }
}

function jouerSerieSuivante(valeurJeton) {
    for (let i = 0; i < 7; i++) {
        jouerBoule(recommandationPari, valeurJeton);
    }
}

// Utilisation initiale
jouerSerieSuivante(valeurJeton);


// ---------------------
// La montante 20 10
// ---------------------
// La montante 20_10 est plutôt une montante en gain car la valeur du jeton est augmentée de 20% en cas de gain et diminuée de 10% en cas de perte

function ajusterMise(jeton, gain) {
    if (gain) {
        jeton *= 1.2; // Augmenter de 50% en cas de gain
    } else {
        jeton *= 0.9; // Diminuer de 20% en cas de perte
    }
    return Math.max(jeton, 1); // S'assurer que la mise ne descende pas en dessous de la valeur initiale
}

// ---------------------
// La montante fibonnaci
// ---------------------
// La montante fibonnaci est La montante de Fibonacci à la roulette est une stratégie de mise qui s'inspire de la célèbre suite de Fibonacci en mathématiques. Dans cette suite, chaque nombre est la somme des deux nombres qui le précèdent, commençant généralement par 0 et 1. Par exemple, les premiers nombres de la suite sont 0, 1, 1, 2, 3, 5, 8, 13, et ainsi de suite.

// Voici comment cette suite est généralement appliquée à la roulette :

// Début de la Série : Le joueur commence avec les deux premiers nombres de la suite de Fibonacci, généralement 1 (en ignorant le 0 initial pour les mises).

// Progression en Cas de Perte : Si un pari est perdu, le joueur avance dans la suite de Fibonacci pour déterminer la prochaine mise. Par exemple, s'il commence par parier 1 unité et perd, il parie ensuite 1 unité (le prochain nombre dans la suite), puis 2 unités, puis 3 unités, et ainsi de suite, tant qu'il continue de perdre.

// Régression en Cas de Gain : Lorsque le joueur gagne un pari, il recule de deux étapes dans la suite. Par exemple, si le joueur est à 5 unités dans la suite et qu'il gagne, il recule à 2 unités pour le prochain pari.

// Réinitialisation après Gains : Si le joueur remonte à la première ou à la deuxième mise de la série (1 unité dans notre exemple) et gagne, il recommence la série depuis le début.

function fibonacciMontante(nombreDeParis) {
    let fibonacci = [1, 1]; // Initialisation de la suite Fibonacci
    let indexFibonacci = 0;  // Position actuelle dans la suite Fibonacci
    let historique = [];     // Historique des mises

    for (let i = 0; i < nombreDeParis; i++) {
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        if (gain) {
            // Reculer de deux étapes dans la suite Fibonacci si possible
            indexFibonacci = Math.max(0, indexFibonacci - 2);
        } else {
            // Avancer dans la suite Fibonacci
            indexFibonacci++;
            if (indexFibonacci >= fibonacci.length) {
                // Calculer le prochain nombre Fibonacci et l'ajouter à la suite
                let nextFib = fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2];
                fibonacci.push(nextFib);
            }
        }

        let mise = fibonacci[indexFibonacci];
        historique.push(mise);
    }

    return historique;
}

// Exemple d'utilisation de la fonction
let historiqueDesParis = fibonacciMontante(10);
//console.log(historiqueDesParis);


// ---------------------
// La montante Mangouste
// ---------------------
//  La méthode démarre avec une série de sept mises prédéfinies, par exemple, 1, 2, 3, 4, 6, 9, 14. Cette série peut varier selon le joueur, mais doit suivre une progression croissante.
// Commencer par la Première Mise : Le joueur commence par la première mise de la série.
// En Cas de Perte : Si le pari est perdu, le joueur passe à la mise suivante dans la série.
// En Cas de Gain : Si le pari est gagné, le joueur recule de deux étapes dans la série. Si cela n'est pas possible (par exemple, s'il est à la deuxième mise), il recommence à la première mise.
// Fin de la Série : Si le joueur arrive à la fin de la série (la septième mise) et perd, il recommence au début. S'il gagne, il recommence au début, à l'étape 1



function montanteMangouste(nombreDeParis) {
    let mises = [1, 2, 3, 4, 6, 9, 14];
    let indexMise = 0;
    let historique = [];

    for (let i = 0; i < nombreDeParis; i++) {
        let mise = mises[indexMise];
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        if (gain) {
            // Reculer de deux étapes dans la série de mises si possible, sinon revenir au début
            indexMise = Math.max(0, indexMise - 2);
        } else {
            // Avancer à la mise suivante dans la série
            indexMise++;
            if (indexMise >= mises.length) {
                // Revenir au début si on est à la fin de la série
                indexMise = 0;
            }
        }

        historique.push(mise);
    }

    return historique;
}

// Exemple d'utilisation de la fonction
let historiqueDesParis2 = montanteMangouste(10);
//console.log(historiqueDesParis2);

// ---------------------
// La montante PIQUEMOUCHE
// ---------------------
// 
// La "Montante Piquemouche" est une stratégie de mise à la roulette qui est une variante de la Martingale classique. Cette méthode est souvent utilisée pour les paris à chances simples (comme rouge/noir, pair/impair, etc.). Voici le principe de la Montante Piquemouche :
// Début avec une Mise de Base : Le joueur commence avec une mise de base, disons 1 unité.
// Doublement Après Trois Pertes Consécutives : Contrairement à la Martingale classique où le joueur double sa mise après chaque perte, dans la Piquemouche, le joueur attend trois pertes consécutives avant de doubler la mise.
// Réinitialisation Après un Gain : Après un gain, le joueur revient à sa mise initiale de 1 unité.
// Progression des Mises : Si le joueur perd trois fois de suite, il double sa mise. Si cette mise plus élevée est perdue, il continue à parier le même montant jusqu'à ce qu'il gagne, après quoi il revient à la mise initiale. Si le joueur perd à nouveau trois fois de suite, il double à nouveau la mise.
// Objectif : L'idée est de récupérer les pertes précédentes avec un risque moindre comparé à la Martingale classique, car le doublement ne se produit qu'après trois pertes consécutives et non après chaque perte.

// Cette stratégie est considérée comme moins risquée que la Martingale traditionnelle

function piquemouche(nombreDeParis, miseInitiale) {
    let mise = miseInitiale;
    let pertesConsecutives = 0;
    let historique = [];

    for (let i = 0; i < nombreDeParis; i++) {
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        if (gain) {
            // En cas de gain, réinitialiser la mise et le compteur de pertes
            mise = miseInitiale;
            pertesConsecutives = 0;
        } else {
            // En cas de perte, incrémenter le compteur de pertes
            pertesConsecutives++;
            if (pertesConsecutives === 3) {
                // Doubler la mise après trois pertes consécutives
                mise *= 2;
                pertesConsecutives = 0; // Réinitialiser le compteur de pertes après le doublement
            }
        }

        historique.push(mise);
    }

    return historique;
}

// Exemple d'utilisation de la fonction
historiqueDesParis3= piquemouche(10, 1); // Simuler 10 paris avec une mise initiale de 1 unité
//console.log(historiqueDesParis);


// ---------------------
// La montante D'ALEMBERT
// ---------------------
// 
//
//La montante d'Alembert, souvent utilisée dans les jeux de hasard comme la roulette, est une stratégie de paris basée sur une progression moins agressive que la Martingale classique. Elle est généralement utilisée pour les paris à chances simples (rouge/noir, pair/impair, etc.). Voici le principe de la montante d'Alembert :

//Mise de Base : Le joueur commence par définir une mise de base, par exemple, 1 unité.

//Augmentation Après une Perte : Si le joueur perd un pari, il augmente sa prochaine mise d'une unité de base.

//Diminution Après un Gain : Si le joueur gagne un pari, il diminue sa prochaine mise d'une unité de base, mais jamais en dessous de la mise de base initiale.

//Objectif : L'idée est de compenser les pertes précédentes par des gains futurs, en supposant qu'il y aura à peu près autant de gains que de pertes sur une longue période.

//Progression Linéaire : Contrairement à la Martingale, où les mises doublent, la progression d'Alembert est linéaire, ce qui signifie que les augmentations et diminutions se font toujours par la même quantité (la mise de base).

//Gestion du Risque : Cette stratégie est considérée comme moins risquée que d'autres méthodes de progression car l'augmentation des mises après les pertes est plus modérée.

function alembert(nombreDeParis, miseInitiale) {
    let mise = miseInitiale;
    let historique = [];

    for (let i = 0; i < nombreDeParis; i++) {
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        if (gain) {
            // Diminuer la mise d'une unité après un gain, sans aller en dessous de la mise initiale
            mise = Math.max(mise - 1, miseInitiale);
        } else {
            // Augmenter la mise d'une unité après une perte
            mise += 1;
        }

        historique.push(mise);
    }

    return historique;
}

// Exemple d'utilisation de la fonction
historiqueDesParis = alembert(10, 1); // Simuler 10 paris avec une mise initiale de 1 unité
//console.log(historiqueDesParis);

// ---------------------
// La montante p37
// ---------------------
// La montante P37, comme vous l'avez décrite, est une variation de la montante d'Alembert, où la mise est augmentée non pas d'une unité mais de deux unités après un gain, mais reste inchangée après une perte.
// Cette montante ressemble beaucoup au système OSCAR GRIND qui vise d'abord à faire 1 unité de gain et que la mise initiale se voit ajoutée 1 unité en plus au lieu de deux dans la montante P37. La montante P37 ne s'arrete pas après un gain c'est au joueur de décider quand est ce qu'il réinitialise sa mise.
//Dans cette fonction montanteP37 :
//La mise initiale est définie par l'utilisateur.
//Un pari est simulé à chaque itération, avec une chance de 50 % de gagner.
//Si le pari est gagné, la mise est augmentée d'une unité.
//Si le pari est perdu, la mise reste la même.
//La fonction retourne l'historique des mises pour chaque pari.

function montanteP37(nombreDeParis, miseInitiale) {
    let mise = miseInitiale;
    let historique = [];

    for (let i = 0; i < nombreDeParis; i++) {
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        if (gain) {
            // Augmenter la mise d'une unité après un gain
            mise += 1;
        }
        // Si c'est une perte, la mise reste inchangée

        historique.push(mise);
    }

    return historique;
}

// Exemple d'utilisation de la fonction
historiqueDesParis = montanteP37(10, 1); // Simuler 10 paris avec une mise initiale de 1 unité
//console.log(historiqueDesParis);

// ---------------------
// La montante DENTs de Scie
// ---------------------
//  Début avec une Mise de Base : Le joueur commence avec une mise de base déterminée, par exemple, 10 unités.
//Augmentation Après un Gain : Si le joueur gagne un pari, il augmente sa prochaine mise de 1 unité, sa mise sera de 11 unités : 10 + 1 pour le premier coup, 12 unités pour le second coup, etc.
//Diminution de la mise en cas de perte dés qu'une perte intervient, on jouera 10 unités et si une nouvelle perte surgit, revenir à 1 unité TANT que l'on perd. En cas de gain, on reprend la montante en gain là où elle s'était arrété, par exemple 12 unités.
//Objectif : L'objectif de cette méthode est de récupérer les pertes en augmentant les mises après les pertes et de protéger les gains en diminuant les mises après les victoires.

//Gestion du Risque : La méthode Dents de Scie tente d'équilibrer entre récupération des pertes et conservation des gains. Cela peut aider à éviter les grandes pertes consécutives, mais nécessite aussi de gagner fréquemment pour être efficace.

function dentsDeScie(nombreDeParis) {
    const miseDeBase = 10;
    let miseActuelle = miseDeBase;
    let miseMaxAtteinte = miseDeBase;
    let historique = [];

    for (let i = 0; i < nombreDeParis; i++) {
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        if (gain) {
            miseActuelle = miseMaxAtteinte + 1;
            miseMaxAtteinte = miseActuelle;
        } else {
            if (miseActuelle === miseDeBase) {
                miseActuelle = 1;
            } else {
                miseActuelle = miseDeBase;
            }
        }

        historique.push(miseActuelle);
    }

    return historique;
}

// Exemple d'utilisation de la fonction
historiqueDesParis = dentsDeScie(20); // Simuler 20 paris
//console.log(historiqueDesParis);





// ---------------------
// La montante HOLLANDAISE
// ---------------------
// Cette montante ressemble beaucoup à la montante LABOUCHERE, mais elle est plus sûre.
//Construction de la Série de Mises :

//Labouchère : La série de mises est créée par le joueur et peut commencer par n'importe quelle séquence de nombres. La mise est déterminée par la somme du premier et du dernier nombre de la série. Après un gain, ces deux nombres sont supprimés de la série. Après une perte, le montant perdu est ajouté à la fin de la série.
//Hollandaise : La série de mises est également définie par le joueur, mais la méthode de progression est différente. Ici, la mise est également la somme du premier et du dernier nombre de la série. Cependant, après un gain, ces nombres sont retirés, et après une perte, le montant total de la mise est ajouté à la fin de la série.
//Gestion des Pertes et des Gains :

//Labouchère : Vise à compenser les pertes en gagnant un montant égal à la somme initiale des nombres de la série.
//Hollandaise : Vise à récupérer les pertes en effaçant progressivement tous les nombres de la série, avec un potentiel de réaliser un petit bénéfice une fois que toute la série est éliminée.
//Complexité et Flexibilité :

//Labouchère : Peut être plus complexe en termes de suivi car les montants de mise changent après chaque pari, et la série s'allonge après chaque perte.
//Hollandaise : Bien que la série s'allonge également après chaque perte, la progression est généralement plus simple à suivre.
//Risque et Variance :

//Les deux méthodes augmentent le risque en cas de longues séquences de pertes, mais la méthode Labouchère peut conduire à des augmentations plus rapides de la mise en raison de l'ajout de montants plus élevés à la série après chaque perte.
//Objectif Final :

//Labouchère : L'objectif est de fermer complètement la série pour réaliser un bénéfice égal à la somme des nombres initiaux de la série.
//Hollandaise : L'objectif est de fermer la série pour récupérer toutes les pertes avec un potentiel de gain plus petit.


function montanteHollandaise(nombreDeParis, serieInitiale) {
    let serie = [...serieInitiale];
    let historique = [];

    for (let i = 0; i < nombreDeParis; i++) {
        let mise = serie[0] + serie[serie.length - 1];
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        if (gain) {
            // En cas de gain, retirer les deux nombres utilisés pour la mise
            serie.shift();
            if (serie.length > 0) {
                serie.pop();
            }
        } else {
            // En cas de perte, ajouter le montant de la mise à la fin de la série
            serie.push(mise);
        }

        historique.push({ mise, serie: [...serie] });
        if (serie.length === 0) break; // Arrêter si la série est vide
    }

    return historique;
}

// Exemple d'utilisation de la fonction
let serieInitiale = [1, 2, 3, 4, 5];
historiqueDesParis = montanteHollandaise(20, serieInitiale);
//console.log(historiqueDesParis);

// ---------------------
// La montante AMERICAINE
// ---------------------
// 
// La montante Américaine, également connue sous le nom de "progression Américaine", est une stratégie de pari utilisée dans les jeux de casino, notamment à la roulette. Voici les principes de base de cette méthode :

// Séries de Nombres Prédéfinis : Contrairement à d'autres systèmes de progression où les mises augmentent ou diminuent en fonction des résultats précédents, la montante Américaine utilise une série de nombres prédéfinie pour déterminer la mise. Cette série est souvent fixe et ne change pas en fonction des gains ou des pertes.

// Mise en Fonction de la Série : Le joueur parie en suivant la série de nombres. Par exemple, si la série est 1, 2, 3, 4, 5, le joueur commence par miser 1 unité, puis 2 unités, et ainsi de suite.

// Fin de la Série : Une fois que le joueur a atteint la fin de la série, il recommence au début, que les paris soient gagnants ou perdants.

// Objectif : L'objectif de la montante Américaine est de capitaliser sur les séquences gagnantes tout en limitant les pertes pendant les séquences perdantes, grâce à la structure fixe de la série de mises.

// Risque et Variance : Comme la série de mises est fixe, la montante Américaine peut parfois être moins risquée que les stratégies de progression agressive comme la Martingale. Cependant, elle ne garantit pas de gains et peut encore entraîner des pertes importantes en cas de longues séquences de défaites.

function montanteAmericaine(nombreDeParis, serie) {
    let indexSerie = 0; // Index pour suivre la position dans la série
    let historique = [];

    for (let i = 0; i < nombreDeParis; i++) {
        let mise = serie[indexSerie];
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        historique.push({ pari: i + 1, mise, gain });

        // Avancer dans la série ou revenir au début si on est à la fin
        indexSerie = (indexSerie + 1) % serie.length;
    }

    return historique;
}

// Exemple d'utilisation de la fonction
let serieDeMises = [1, 2, 3, 4, 5]; // Série de mises prédéfinie
historiqueDesParis = montanteAmericaine(20, serieDeMises);
//console.log(historiqueDesParis);

// ---------------------
// La montante OSCAR GRIND
// ---------------------
// 
// les règles de ce système : la mise reste la même après une perte et augmente d'une unité après un gain, sauf si cela permet d'atteindre l'objectif de profit d'une unité. 

//système d'Oscar's Grind : Ce système vise à gagner une unité par série de paris. Après chaque perte, la mise reste la même, mais après chaque gain, si le bénéfice total n'est pas de 1 unité, la mise est augmentée d'une unité jusqu'à obtenir un gain de 1 unité. Lorsqu'on se rapproche de l'équilibre , on adaptera alors notre mise à la baisse pour qu'en cas de gain, l'objectif soit atteint à savoir 1 unité. Dés que l'objectif est atteint on recommence. 

function oscarsGrind(nombreDeParis) {
    let mise = 1;
    let profitTotal = 0;
    let historique = [];

    for (let i = 0; i < nombreDeParis; i++) {
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        if (gain) {
            profitTotal += mise;
            if (profitTotal > 1) {
                // Réduire la mise si un gain supplémentaire nous ferait dépasser l'objectif
                mise = Math.max(1, mise - (profitTotal - 1));
            } else if (profitTotal < 1) {
                // Augmenter la mise si le profit total est toujours inférieur à l'objectif
                mise += 1;
            }
        } else {
            profitTotal -= mise;
        }

        historique.push({ pari: i + 1, mise, profitTotal });

        if (profitTotal === 1) {
            break; // Objectif atteint, arrêter la série
        }
    }

    return historique;
}

// Exemple d'utilisation de la fonction
historiqueDesParis = oscarsGrind(20); // Simuler 20 paris
//console.log(historiqueDesParis);



// ---------------------
// Le système de Labouchère inversé 
// ---------------------
// 
//Le système de Labouchère inversé est une variation de la méthode de Labouchère, souvent utilisée pour les paris à la roulette et d'autres jeux de casino. Contrairement à la méthode Labouchère classique qui est une stratégie de montante en perte, la version inversée est une montante en gain. Voici les principes de base du système de Labouchère inversé :

//Création de la Liste : Le joueur commence par écrire une courte liste de nombres positifs qui représentent les unités de mise. Par exemple, la liste pourrait être [1, 2, 3].

//Détermination de la Mise : La mise pour chaque tour est la somme du premier et du dernier nombre de la liste. Dans l'exemple ci-dessus, la première mise serait de 1 + 3 = 4 unités.

//En Cas de Gain : Si le pari est gagnant, les deux nombres utilisés pour la mise (le premier et le dernier de la liste) sont ajoutés à la fin de la liste. Dans notre exemple, après un gain, la liste deviendrait [1, 2, 3, 4].

//En Cas de Perte : Si le pari est perdant, les deux nombres utilisés pour la mise sont retirés de la liste. Si la liste ne contient qu'un seul nombre, ce nombre est utilisé pour la mise.

//Objectif : Le but de cette méthode est de continuer à jouer jusqu'à ce que tous les nombres de la liste initiale soient éliminés, signifiant que l'objectif de profit a été atteint, ou jusqu'à ce que la liste s'allonge à un point où le joueur décide de s'arrêter.

//Gestion du Risque : Comme il s'agit d'une stratégie de montante en gain, les pertes peuvent être limitées plus facilement qu'avec la version classique de Labouchère. Cependant, les séries perdantes peuvent quand même entraîner des pertes.

//Le système de Labouchère inversé est plus orienté vers la recherche de gains plus importants en cas de séquences gagnantes, tout en essayant de limiter les pertes lors de séquences perdantes.

function labouchereInverse(nombreDeParis, serieInitiale) {
    let serie = [...serieInitiale];
    let historique = [];

    for (let i = 0; i < nombreDeParis; i++) {
        if (serie.length < 2) {
            // S'il ne reste qu'un seul nombre dans la série, parier ce nombre
            serie.push(serie[0]);
        }

        let mise = serie[0] + serie[serie.length - 1];
        let gain = Math.random() < 0.5; // Simuler un gain ou une perte (50% de chances)

        if (gain) {
            // En cas de gain, ajouter la somme pariée à la fin de la série
            serie.push(mise);
        } else {
            // En cas de perte, retirer les deux nombres utilisés pour la mise
            serie.shift();
            if (serie.length > 0) {
                serie.pop();
            }
        }

        historique.push({ mise, serie: [...serie] });
        if (serie.length === 0) break; // Arrêter si la série est vide
    }

    return historique;
}

// Exemple d'utilisation de la fonction
serieInitiale = [1, 2, 3];
historiqueDesParis = labouchereInverse(20, serieInitiale);
//console.log(historiqueDesParis);

//Dans cette fonction labouchereInverse :
// - La série initiale des mises est définie par l'utilisateur.
// - La mise pour chaque pari est la somme du premier et du dernier nombre de la série.
// - Si le pari est gagné, la somme pariée est ajoutée à la fin de la série.
// - Si le pari est perdu, les nombres utilisés pour la mise sont retirés de la série.
// - La fonction continue jusqu'à ce que le nombre spécifié de paris soit atteint ou que la série soit vide.
// - La fonction retourne un historique des mises et de l'état de la série après chaque pari.


// ---------------------
// La montante 1 3 6 
// ---------------------
// un systeme de gestions de montante pour jouer 24 numéros à la roulette, comme par exemple deux colonnes ou deux douzaine.
// on va miser 1 mise, puis en cas de perte on va tripler, enfin, on va doubler pour récupérer sans faire de bénéfice nos mises perdues. Le premier palier est donc 1  3  6 . En cas de trois pertes consécutives : miser 5 puis 15 puis 30

function montante24NumerosPaliers(nombreDeParis) {
    let paliers = [[1, 3, 6], [5, 15, 30]]; // Définition des paliers de mises
    let palierActuel = 0;
    let etapeDansPalier = 0;
    let historique = [];
    let perteConsecutive = 0;

    for (let i = 0; i < nombreDeParis; i++) {
        let mise = paliers[palierActuel][etapeDansPalier];
        let gain = Math.random() < 24/37; // Simuler un gain ou une perte (chance d'environ 24/37)

        historique.push({ pari: i + 1, mise, gain });

        if (gain) {
            // Réinitialiser en cas de gain
            palierActuel = 0;
            etapeDansPalier = 0;
            perteConsecutive = 0;
        } else {
            // Gérer la perte
            perteConsecutive++;
            etapeDansPalier++;

            // Passer au palier suivant si nécessaire
            if (etapeDansPalier >= paliers[palierActuel].length) {
                etapeDansPalier = 0;
                palierActuel = perteConsecutive >= 3 ? 1 : 0;
            }
        }

        if (palierActuel >= paliers.length) {
            // Arrêter si tous les paliers ont été épuisés
            break;
        }
    }

    return historique;
}

// Exemple d'utilisation de la fonction
historiqueDesParis = montante24NumerosPaliers(20);
//console.log(historiqueDesParis);


// ---------------------
// La montante 1 2 4 8  
// ---------------------
// un systeme de gestions de montante pour jouer 18 numéros


function montante1248(historiqueGains,miseInitiale,maxPertesConsecutives) {
    
    let dernierResultat=historiqueGains[historiqueGains.length-1];
    let pertesConsecutives= 0;
    let mise = miseInitiale;
    let checkHistorique = historiqueGains.length-1;
    if (dernierResultat==true) return mise;
    do{
        pertesConsecutives++;
        mise *= 2;
    } while(pertesConsecutives * 2 <= maxPertesConsecutives && pertesConsecutives + 1 < historiqueGains.length)
    return mise;
}
console.log(montante1248([false, 1, 4]));