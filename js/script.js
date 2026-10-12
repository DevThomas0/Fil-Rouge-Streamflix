const cartesFilms = document.querySelectorAll('.card-film');
const hero = document.querySelector('.hero');
const modal = document.querySelector('#modal');
const modalBody = document.querySelector('#modal-body');
const champRecherche = document.querySelector('#search');

function creerBouton(texte, classesSupplementaires) {
  const bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.className = `btn btn-streamflix-ghost ${classesSupplementaires}`;
  bouton.textContent = texte;
  return bouton;
}

function texteNormalise(element) {
  return element.textContent.replace(/\s+/g, ' ').trim();
}

function genresDe(element) {
  return [...element.querySelectorAll('.badge-genre')].map((badge) => badge.textContent);
}

function infosDepuisCarte(carte) {
  return {
    titre: carte.querySelector('h3').textContent,
    meta: `${texteNormalise(carte.querySelector('.card-meta'))} · ${carte.querySelector('.card-note').textContent}`,
    genres: genresDe(carte),
  };
}

function ouvrirModal({ titre, meta, genres, description }) {
  const titreModal = document.createElement('h2');
  titreModal.id = 'titre-modal';
  titreModal.textContent = titre;

  const paragraphes = [meta, genres.join(', '), description]
    .filter(Boolean)
    .map((texte) => {
      const paragraphe = document.createElement('p');
      paragraphe.textContent = texte;
      return paragraphe;
    });

  modalBody.replaceChildren(titreModal, ...paragraphes);
  modal.style.display = 'block';
  modal.querySelector('.close').focus();
}

function fermerModal() {
  modal.style.display = 'none';
}

document.querySelectorAll('.rangee').forEach((section) => {
  const grille = section.querySelector('.grille-films');
  const bouton = creerBouton('Masquer', 'btn-toggle-section');
  bouton.setAttribute('aria-controls', grille.id);
  bouton.setAttribute('aria-expanded', 'true');

  bouton.addEventListener('click', () => {
    const masquee = grille.classList.toggle('hidden');
    bouton.textContent = masquee ? 'Afficher' : 'Masquer';
    bouton.setAttribute('aria-expanded', String(!masquee));
  });

  section.querySelector('h2').after(bouton);
});

const compteur = document.createElement('p');
compteur.className = 'compteur-films mb-0';
compteur.textContent = `Catalogue : ${cartesFilms.length} films disponibles`;
document.querySelector('.copyright').before(compteur);

cartesFilms.forEach((carte) => {
  carte.addEventListener('click', (event) => {
    if (!event.target.closest('a, button')) carte.classList.toggle('watched');
  });

  carte.querySelector('a.btn').addEventListener('click', (event) => {
    event.preventDefault();
    ouvrirModal(infosDepuisCarte(carte));
  });
});

const messageVide = document.createElement('p');
messageVide.className = 'message-vide container hidden';
messageVide.textContent = 'Aucun résultat';
document.querySelector('#films').before(messageVide);

champRecherche.addEventListener('input', () => {
  const terme = champRecherche.value.trim().toLowerCase();
  let trouves = 0;

  cartesFilms.forEach((carte) => {
    const correspond = carte.querySelector('h3').textContent.toLowerCase().includes(terme);
    carte.closest('li').style.display = correspond ? '' : 'none';
    if (correspond) trouves += 1;
  });

  messageVide.classList.toggle('hidden', trouves > 0);
});

champRecherche.form.addEventListener('submit', (event) => event.preventDefault());

document.querySelector('#hero-infos').addEventListener('click', () => {
  ouvrirModal({
    titre: hero.querySelector('#titre-hero').textContent,
    meta: texteNormalise(hero.querySelector('.hero-meta')),
    genres: genresDe(hero),
    description: texteNormalise(hero.querySelector('.hero-description')),
  });
});

modal.querySelector('.close').addEventListener('click', fermerModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) fermerModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') fermerModal();
});

const boutonTheme = creerBouton('Mode clair', 'btn-sm ms-lg-2');

boutonTheme.addEventListener('click', () => {
  const sombre = document.body.classList.toggle('dark-theme');
  boutonTheme.textContent = sombre ? 'Mode clair' : 'Mode sombre';
});

document.querySelector('#menu-principal').append(boutonTheme);
