import sanitizeHtml from 'sanitize-html';

import { renderMainMenu } from './_common/scripts/services/page.service.js';
import { getRequest } from './_common/scripts/services/requests-service.js';
import { guesthouseTemplate } from './_common/templates/guesthouses.js';

const guesthousesGrid = document.querySelector('.guest-houses-grid');

initializePage().catch((error) => {
  console.error('Error initializing page:', error);
});

async function initializePage() {
  renderMainMenu();

  const guesthouses = await getGuesthouses();
  const popularGuesthouses = guesthouses.filter(guesthouse => guesthouse.rating >= 4.5);
  renderGuesthouseCards(popularGuesthouses);
}

async function getGuesthouses() {
  try {
    const guesthouses = await getRequest('./_mocks/guesthouses.json');
    return guesthouses;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderGuesthouseCards(guesthouses) {
  console.log(guesthousesGrid);
  guesthousesGrid.innerHTML = sanitizeHtml(
    guesthouses.map(guesthouseTemplate).join('\n'),
    {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'button' ]),
      allowedAttributes: {
        img: ['src', 'alt'],
        button: ['class'],
        article: ['class'],
      },
    }
  );
}
