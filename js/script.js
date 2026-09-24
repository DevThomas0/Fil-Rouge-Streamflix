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
