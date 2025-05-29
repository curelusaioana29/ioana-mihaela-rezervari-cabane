import sanitizeHtml from 'sanitize-html';

import { renderMainMenu } from './../_common/scripts/services/page.service';
import { getRequest } from './../_common/scripts/services/requests-service';
import { popularDestinationTemplate } from './../_common/templates/popular-destinations';

const popularDestinationsGrid = document.querySelector(
  '.offers-destinations-grid'
);

initializePage().catch((error) => {
  console.error('Error initializing page:', error);
});

async function initializePage() {
  renderMainMenu();

  const popularDestinations = await getPopularDestinations();
  renderPopularDestinationCards(popularDestinations);
}

async function getPopularDestinations() {
  try {
    const popularDestinations = await getRequest(
      './../_mocks/popular-destinations.json'
    );
    return popularDestinations;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderPopularDestinationCards(popularDestinations) {
  popularDestinationsGrid.innerHTML = sanitizeHtml(
    popularDestinations.map(popularDestinationTemplate).join('\n'),
    {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'button']),
      allowedAttributes: {
        img: ['src', 'alt'],
        article: ['class'],
        a: ['href'],
      },
    }
  );
}
