function afficherEffetGain() {
    const gainDiv = document.getElementById('gainEffect');
    gainDiv.classList.remove('hidden');

    setTimeout(() => {
        gainDiv.classList.add('hidden');
    }, 1000); // Cache l'effet après 3 secondes
}