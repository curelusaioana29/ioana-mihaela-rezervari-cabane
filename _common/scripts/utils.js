export function uppercaseFirstLetterOfWords(value, separator = ' ') {
  return value
    .split(separator)
    .map((word) => uppercaseFirstLetter(word))
    .join(' ');
}

export function uppercaseFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
