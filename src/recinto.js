class Recinto {
  constructor(numero, bioma, tamanhoTotal, animaisExistentes) {
    this.numero = numero;
    this.bioma = bioma;
    this.tamanhoTotal = tamanhoTotal;
    this.animaisExistentes = animaisExistentes;
    this.espacoOcupado = this.calcularEspacoOcupado();
  }

  calcularEspacoOcupado() {
    let espacoOcupado = 0;
    this.animaisExistentes.forEach((animal) => {
      espacoOcupado +=
        animal.quantidade * this.obterTamanhoAnimal(animal.especie);
    });
    if (this.animaisExistentes.length > 1) {
      espacoOcupado += 1;
    }
    return espacoOcupado;
  }

  obterTamanhoAnimal(especie) {
    const tamanhos = {
      LEAO: 3,
      LEOPARDO: 2,
      CROCODILO: 3,
      MACACO: 1,
      GAZELA: 2,
      HIPOPOTAMO: 4,
    };
    return tamanhos[especie];
  }

  espacoRestante() {
    return this.tamanhoTotal - this.espacoOcupado;
  }

  biomaAdequado(especie) {
    const biomasAdequados = {
      LEAO: ["savana"],
      LEOPARDO: ["savana"],
      CROCODILO: ["rio"],
      MACACO: ["savana", "floresta"],
      GAZELA: ["savana"],
      HIPOPOTAMO: ["savana", "rio"],
    };
    return biomasAdequados[especie].includes(this.bioma);
  }

  carnivoroCompatibilidade(especie, carnivoro) {
    const carnivoros = ["LEAO", "LEOPARDO", "CROCODILO"];
    if (carnivoro && this.animaisExistentes.length > 0) {
      return this.animaisExistentes.every(
        (animal) => animal.especie === especie
      );
    }
    return true;
  }

  hipopotamoCompatibilidade(especie, carnivoro) {
    if (especie === "HIPOPOTAMO" && this.animaisExistentes.length > 0) {
      return this.bioma === "savana e rio";
    }
    return true;
  }

  podeAdicionarAnimal(especie, quantidade, carnivoro) {
    const espacoNecessario = quantidade * this.obterTamanhoAnimal(especie);
    const espacoDisponivel = this.espacoRestante();
    const espacoExtra = this.animaisExistentes.length > 0 ? 1 : 0;
    return (
      this.biomaAdequado(especie) &&
      this.carnivoroCompatibilidade(especie, carnivoro) &&
      this.hipopotamoCompatibilidade(especie, carnivoro) &&
      espacoDisponivel >= espacoNecessario + espacoExtra
    );
  }
}

export { Recinto as Recinto };
