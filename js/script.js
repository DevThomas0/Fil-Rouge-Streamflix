// Exercice 1 : afficher / masquer les sections de films

document.querySelectorAll('.rangee').forEach((section) => {
  const titre = section.querySelector('h2');
  const grille = section.querySelector('.grille-films');

  const bouton = document.createElement('button');
  bouton.className = 'btn btn-streamflix-ghost btn-toggle-section';
  bouton.type = 'button';
  bouton.textContent = 'Masquer';
  bouton.setAttribute('aria-expanded', 'true');
  bouton.setAttribute('aria-controls', grille.id);

  bouton.addEventListener('click', () => {
    const masquee = grille.classList.toggle('hidden');
    bouton.textContent = masquee ? 'Afficher' : 'Masquer';
    bouton.setAttribute('aria-expanded', String(!masquee));
  });

  titre.after(bouton);
});

// Exercice 2 : compteur de films

const films = document.querySelectorAll('.card-film');
const compteur = document.createElement('p');
compteur.className = 'compteur-films mb-0';
compteur.textContent = `Catalogue : ${films.length} films disponibles`;
document.querySelector('.copyright').before(compteur);

// Exercice 3 : marquer un film comme vu

films.forEach((film) => {
  film.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    film.classList.toggle('watched');
  });
});

// Exercice 4 : recherche et filtrage des films

const champRecherche = document.querySelector('#recherche');
const formulaireRecherche = document.querySelector('.recherche');

const messageVide = document.createElement('p');
messageVide.className = 'message-vide container hidden';
messageVide.textContent = 'Aucun résultat';
document.querySelector('#films').before(messageVide);

champRecherche.addEventListener('input', function () {
  const terme = this.value.trim().toLowerCase();
  let trouves = 0;

  films.forEach((film) => {
    const titre = film.querySelector('h3').textContent.toLowerCase();
    const correspond = titre.includes(terme);

    film.closest('li').style.display = correspond ? '' : 'none';
    if (correspond) trouves += 1;
  });

  messageVide.classList.toggle('hidden', trouves > 0);
});

formulaireRecherche.addEventListener('submit', (event) => {
  event.preventDefault();
});
