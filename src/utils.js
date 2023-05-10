function getRandomNumber(min = 1, max = 10) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandomArrayElement(items) {
  return items[getRandomNumber(0, items.length - 1)];
}

export { getRandomNumber, getRandomArrayElement };
