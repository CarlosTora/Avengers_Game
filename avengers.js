
const readline = require('readline');

/**º
 * La temática va a ser Avengers.
 * Teniendo una lista de héroes que
 * se enfrentan a Thanos, cada turno
 * Thanos chasquea los dedos una vez
 * para matar a cada héroe,
 * con un 50% de éxito.
 * Thanos tiene 500 de vida.
 * Los héroes son 10 y hacen daño aleatorio
 * entre 1 y 15 cada uno.
 * ¿Quién ganará?
 */

class Thanos {
  constructor() {
    this.vida = 500
  }
  amenaza() {
    console.log("Cabrones!", "Preparaos para el combate!!!");
  }
  chasquido() {
    const haMuerto = Math.random() > 0.5;
    if (haMuerto) {
     
    }
    return haMuerto;
  }
}

class SuperHeroe {
  constructor(nombre) {
    this.nombre = nombre;
    this.estaVivo = true;
  }
  atacar() {
    // EL HEROE HACE DAÑO ENTRE 1 Y 15
    const danyo = +(Math.random() * 100 % 50).toFixed(0);
    console.log(this.nombre, danyo);
    return danyo;
  }
  morir() {
    console.log(this.nombre, "ha muerto...")
    this.estaVivo = false;
  }
  vivo() {
    return this.estaVivo;
  }
}

const thanos = new Thanos();
thanos.amenaza();

const listaDeHeroes = [];
const spiderman = new SuperHeroe("Spiderman");
listaDeHeroes.push(spiderman);

const hulk = new SuperHeroe("Hulk");
listaDeHeroes.push(hulk);

const capitanAmerica = new SuperHeroe("Capitán América");
listaDeHeroes.push(capitanAmerica);

const blackPanther = new SuperHeroe("Black Panther");
listaDeHeroes.push(blackPanther);

const ironMan = new SuperHeroe("Iron Man");
listaDeHeroes.push(ironMan);

const blackWidow = new SuperHeroe("Black Widow");
listaDeHeroes.push(blackWidow);

const ojoDeAlcon = new SuperHeroe("Ojo de Halcón");
listaDeHeroes.push(ojoDeAlcon);

const thor = new SuperHeroe("Thor");
listaDeHeroes.push(thor);

const antMan = new SuperHeroe("AntMan");
listaDeHeroes.push(antMan);

const missMarvel = new SuperHeroe("MissMarvel");
listaDeHeroes.push(missMarvel);

console.log("Nos enfrentamos a ti, Thanos");

let heroesVivos = listaDeHeroes.some(function(heroe) {
  return heroe.vivo();
});


async function partida(){
  while (thanos.vida > 0 && heroesVivos) {
    listaDeHeroes.forEach(function(heroe){
      if(heroe.estaVivo){
        thanos.vida -= heroe.atacar();
      }
    });
    console.log("Thanos: ", thanos.vida);
    if(thanos.vida <= 0){
      console.log("Thanos ha muerto...");
      console.log("VICTORIAAAAA!!!");
      break;
    }

    listaDeHeroes.forEach(function(heroe){
      if(heroe.estaVivo && thanos.chasquido()){
        heroe.morir();
      }
    });

    heroesVivos = listaDeHeroes.some(function(heroe) {
      return heroe.vivo();
    });
    if(!heroesVivos){
      console.log ("THANOS HA GANADO");
      break;
    }

    const cantidadVivos = listaDeHeroes.filter(function(heroe){
      return heroe.vivo();

    }).length;
    console.log ("Siguen vivos", cantidadVivos)

    await pasarTurno();
  }
}
partida();

/**
 * Pide al usuario permiso
 * para continuar la batalla.
 */
function pasarTurno() {
  return new Promise(function(resolve, reject) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Turno siguiente...', function(answer) {
      resolve();
      rl.close();
    });
  });
}
