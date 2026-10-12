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

const champRecherche = document.querySelector('#search');
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

// Exercice 5 : modal de fiche film

const modal = document.querySelector('#modal');
const modalBody = document.querySelector('#modal-body');

function openModal({ titre, meta, genres, description }) {
  modalBody.replaceChildren();

  const h2 = document.createElement('h2');
  h2.id = 'titre-modal';
  h2.textContent = titre;

  const infos = document.createElement('p');
  infos.textContent = meta;

  const listeGenres = document.createElement('p');
  listeGenres.textContent = genres.join(', ');

  modalBody.append(h2, infos, listeGenres);

  if (description) {
    const resume = document.createElement('p');
    resume.textContent = description;
    modalBody.append(resume);
  }

  modal.style.display = 'block';
  modal.querySelector('.close').focus();
}

function closeModal() {
  modal.style.display = 'none';
}

function texteNormalise(element) {
  return element.textContent.replace(/\s+/g, ' ').trim();
}

function infosDepuisCarte(film) {
  return {
    titre: film.querySelector('h3').textContent,
    meta: `${texteNormalise(film.querySelector('.card-meta'))} · ${film.querySelector('.card-note').textContent}`,
    genres: [...film.querySelectorAll('.badge-genre')].map((b) => b.textContent),
  };
}

films.forEach((film) => {
  film.querySelector('a.btn').addEventListener('click', (event) => {
    event.preventDefault();
    openModal(infosDepuisCarte(film));
  });
});

// Le film vedette ouvre la meme modal que les cartes du catalogue
const hero = document.querySelector('.hero');

document.querySelector('#hero-infos').addEventListener('click', () => {
  openModal({
    titre: hero.querySelector('#titre-hero').textContent,
    meta: texteNormalise(hero.querySelector('.hero-meta')),
    genres: [...hero.querySelectorAll('.badge-genre')].map((b) => b.textContent),
    description: texteNormalise(hero.querySelector('.hero-description')),
  });
});

modal.querySelector('.close').addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

// Exercice 6 : bascule du theme sombre / clair

const boutonTheme = document.createElement('button');
boutonTheme.className = 'btn btn-streamflix-ghost btn-sm ms-lg-2';
boutonTheme.type = 'button';
boutonTheme.textContent = 'Mode clair';

boutonTheme.addEventListener('click', () => {
  const sombre = document.body.classList.toggle('dark-theme');
  boutonTheme.textContent = sombre ? 'Mode clair' : 'Mode sombre';
});

document.querySelector('#menu-principal').append(boutonTheme);
