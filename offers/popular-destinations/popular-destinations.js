import sanitizeHtml from 'sanitize-html';
import { guesthouseTemplate } from '../../_common/templates/guesthouses.js';
import { getRequest } from './../../_common/scripts/services/requests-service.js';

const env = import.meta.env;

initializePage().catch((error) => {
  console.error('Error initializing page:', error);
});

async function initializePage() {
  const destinationDetails = await getDestinationDetails();
  renderDestinationDetails(destinationDetails);
  await getDestinationGuesthouses();
}

async function getDestinationDetails() {
  const params = new URLSearchParams(document.location.search);
  const destinationId = params.get('id');

  try {
    const destinations = await getRequest(
      './../../_mocks/popular-destinations.json'
    );

    if (!destinations || destinations.length === 0) {
      throw new Error('Error fetching popular destinations.');
    }

    const destinationDetails = destinations.find(
      (dest) => dest.id?.toString() === destinationId.trim()
    );

    if (!destinationDetails) {
      throw new Error('Destination not found.');
    }

    return destinationDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function renderDestinationDetails(destinationDetails) {
  const mainTitle = document.querySelector('h1');
  const destinationPageHeader = document.getElementById(
    'destination-page-header'
  );
  const destinationRating = document.getElementById('destination-rating');
  const destinationDescription = document.getElementById(
    'destination-description'
  );

  mainTitle.textContent = `Popular Destination: ${destinationDetails.name}`;
  destinationPageHeader.style.background = `url("${env.VITE_IMAGES_FOLDER_URL}/${destinationDetails.thumbnailUrl}") no-repeat center center / cover`;
  destinationDescription.textContent = destinationDetails.description;
  destinationRating.innerHTML = `<b>Rating:</b> ${destinationDetails.rating}`;
}

async function getDestinationGuesthouses() {
  const guesthousesGrid = document.getElementById(
    'destination-guesthouses-list'
  );

  try {
    const guesthouses = await getRequest('./../../_mocks/guesthouses.json');

    guesthousesGrid.innerHTML = sanitizeHtml(
      guesthouses.map(guesthouseTemplate).join('\n'),
      {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
          'img',
          'button',
        ]),
        allowedAttributes: {
          img: ['src', 'alt'],
          button: ['class'],
          article: ['class'],
        },
      }
    );
  } catch (error) {
    console.error('Error fetching guesthouses:', error);
    guesthousesGrid.innerHTML = '<p>Error loading guesthouses.</p>';
    return;
  }
}
