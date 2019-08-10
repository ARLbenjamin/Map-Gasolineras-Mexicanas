class UI {
    constructor() {
      //Instanciar la API
        this.api= new API();
     
        //se crean los markers en el mapa usando layerGroup
        this.markers= new L.layerGroup();

     // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }

    mostrarEstableciminetos(){

     this.api.obtenerDatos()
     .then((datos)=>{

     const resultado= datos.respuestaDatos.results;
     
     //se ejecuta una funcion que tome los datos y muestre los pines en el mapa apartir de estos

      this.mostrarPines(resultado);

     })

    }

    mostrarPines(dato){
     //limpiar marcadores antes de llamarlos
     this.markers.clearLayers();

     //recorrer los establecimientos
     dato.forEach(dato=>{  
      //usamos un destructuring para asignar los datos
      const {latitude, longitude, calle, regular, premiun}= dato;

      //crear popup
      const opcionesPopUp= L.popup().setContent(

    `<p>Calle: ${calle}</p>
     <p><b>Regular:</b>$ ${regular}</p>
     <p><b>Premiun:</b>$ ${premiun}</p>
    `

      )

      //agregamos los pines
      const marker= L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]).bindPopup(opcionesPopUp);
       this.markers.addLayer(marker);
     });

     this.markers.addTo(this.mapa);

    }
    //buscador
    obtenerSugerencias(busqueda){

     this.api.obtenerDatos().then(datos=>{
         //obtener datos
         const resultados= datos.respuestaDatos.results;

         //fultrar los resultados
        this.filtrarResultados(resultados, busqueda);
     })

    }

    filtrarResultados(resultado, busqueda){

     const filtro= resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
     
     //mostrar pines filtrados
     this.mostrarPines(filtro);
    }
}