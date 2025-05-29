const env = import.meta.env;

export const guesthouseTemplate = (guesthouse) => `
  <article class="guest-house-card">
    <img src="${env.VITE_IMAGES_FOLDER_URL}/${guesthouse.previewImageUrl}" alt="${guesthouse.name}" />
    <h3>${guesthouse.name}</h3>
    <p>
      ${guesthouse.description}
    </p>
    <p class="guest-house-card-price"><strong>Rating:</strong> ${guesthouse.rating}</p>
    <p class="guest-house-card-price"><strong>Preț:</strong> ${guesthouse.price}RON</p>
    <button class="button button-primary">Rezervă</button>
  </article>
`;
