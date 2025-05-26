import { getRequest } from './../../_common/scripts/services/requests-service.js';
import { uppercaseFirstLetterOfWords } from '../../_common/scripts/utils.js';

initializePage();

function initializePage() {
  updateDestinationTitle();
  getDestinationGuesthouses();
}

function updateDestinationTitle() {
  const params = new URLSearchParams(document.location.search);
  const destinationName = params.get('name')
    ? uppercaseFirstLetterOfWords(params.get('name'), '-')
    : '';
  const destinationCounty = params.get('location')
    ? uppercaseFirstLetterOfWords(params.get('location'), '-')
    : '';

  const mainTitle = document.querySelector('h1');
  mainTitle.textContent = `Popular Destinations: ${destinationName}, ${destinationCounty}`;
}

function getDestinationGuesthouses() {
  // TODO: Implement the function to fetch guesthouses based on the destination

  getRequest('https://api.example.com/guesthouses', 'POST', {
    locality: params.get('name'),
    county: params.get('location'),
  });
}
