import { Recinto } from "./recinto.js";

function validarAnimal(especie) {
  const animaisValidos = [
    "LEAO",
    "LEOPARDO",
    "CROCODILO",
    "MACACO",
    "GAZELA",
    "HIPOPOTAMO",
  ];
  return animaisValidos.includes(especie);
}

function validarQuantidade(quantidade) {
  return Number.isInteger(quantidade) && quantidade > 0;
}

class RecintosZoo {
  constructor() {
    this.recintos = [
      new Recinto(1, "savana", 10, [
        { especie: "MACACO", quantidade: 3, carnivoro: false },
      ]),
      new Recinto(2, "floresta", 5, []),
      new Recinto(3, "savana e rio", 7, [
        { especie: "GAZELA", quantidade: 1, carnivoro: false },
      ]),
      new Recinto(4, "rio", 8, [
        { especie: "CROCODILO", quantidade: 1, carnivoro: true },
      ]),
      new Recinto(5, "savana", 9, [
        { especie: "LEAO", quantidade: 1, carnivoro: true },
      ]),
      new Recinto(2, "savana", 10, [
        { especie: "MACACO", quantidade: 3, carnivoro: false },
      ]),
    ];
  }

  analisaRecintos(especie, quantidade) {
    if (!validarAnimal(especie)) {
      return { erro: "Animal inválido" };
    }

    if (!validarQuantidade(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const carnivoros = ["LEAO", "LEOPARDO", "CROCODILO"];
    const carnivoro = carnivoros.includes(especie);
    const recintosViaveis = this.recintos.filter((recinto) =>
      recinto.podeAdicionarAnimal(especie, quantidade, carnivoro)
    );

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    const listaRecintosViaveis = recintosViaveis
      .map(
        (recinto) =>
          `Recinto ${
            recinto.numero
          } (espaço livre: ${recinto.espacoRestante()} total: ${
            recinto.tamanhoTotal
          })`
      )
      .sort((a, b) => a.numero - b.numero);

    return { recintosViaveis: listaRecintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos("MACACO", 2));
console.log(zoo.analisaRecintos("UNICORNIO", 1));
console.log(zoo.analisaRecintos("MACACO", -1));
console.log(zoo.analisaRecintos("CROCODILO", 1));
