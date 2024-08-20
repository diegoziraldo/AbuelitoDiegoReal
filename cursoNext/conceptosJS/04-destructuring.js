const mascota = {
  nombre: 'Diego',
  edad: '39',
  vivo: true,
  razas: ['Dogo', 'Caniche']
}

mascota.id = 1; //Aca le estamos agregando una propiedad al objeto


const {edad} = mascota;

console.log(edad);