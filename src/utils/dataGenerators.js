// src/utils/dataGenerators.js

export function generateRandomNums(qtd, min, max) {
  return Array.from({ length: qtd }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export function generateColor() {
  let cor;
  const caracteres = "0123456789ABCDEF";
  do {
    cor = "#";
    for (let i = 0; i < 6; i++) {
      cor += caracteres[Math.floor(Math.random() * 16)];
    }
  } while (cor >= "#DDDDDD");
  return cor;
}

export function generatePower() {
  const horaAtual = new Date().getHours();
  if (horaAtual >= 6 && horaAtual < 10) {
    return getRandomInt(100, 300); // Manhã
  } else if (horaAtual >= 10 && horaAtual < 16) {
    return getRandomInt(400, 800); // Meio-dia
  } else if (horaAtual >= 16 && horaAtual < 19) {
    return getRandomInt(100, 400); // Tarde
  } else {
    return getRandomInt(10, 50); // Noite
  }
}

export function generateTemperature() {
  return getRandomInt(25, 55);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
