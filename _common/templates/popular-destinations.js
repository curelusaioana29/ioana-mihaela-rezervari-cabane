const env = import.meta.env;

export const popularDestinationTemplate = (destination) => `
  <article class="offers-destination-card">
    <a href="/offers/popular-destinations/?id=${destination.id}">
      <img src="${env.VITE_IMAGES_FOLDER_URL}/${destination.thumbnailUrl}" alt="${destination.name}" />
      <h3>${destination.name}</h3>
    </a>
  </article>
`;