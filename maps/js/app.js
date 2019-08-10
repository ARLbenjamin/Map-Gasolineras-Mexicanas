const ui= new UI();

document.addEventListener('DOMContentLoaded', () =>{

    ui.mostrarEstableciminetos();

})

//habilitar busqueda de establecimientos
const buscador= document.querySelector('#buscar input');
buscador.addEventListener('input', ()=>{
  if(buscador.value.length > 4){
//buscamos cuando se pase una cantidad determinada de caracteres
  ui.obtenerSugerencias(buscador.value);
} else{
    ui.mostrarEstableciminetos();
}
});