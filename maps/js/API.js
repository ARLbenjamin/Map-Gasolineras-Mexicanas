class API{

  async obtenerDatos(){
    const consulta= 1000; 
      //extraemos los datos desde la API
    const datos= await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${consulta}`);

     // retornaremos los datos como JSON
    const respuestaDatos= await datos.json();

  return {
    respuestaDatos
  }

  }
 
}