const mainMenuLinks = [
  {'/': 'Home'},
  {'/offers/': 'Oferte'},
  {'/contact/': 'Contact'},
  {'/about-us/': 'Despre noi'}
];

export function renderMainMenu() {
  const mainMenu = document.getElementById('main-menu');
  
  mainMenuLinks.forEach((link) => {
    const [href, text] = Object.entries(link)[0];
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.textContent = text;
    mainMenu.appendChild(anchor);
  });
}
