import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../interfaces/interfaces';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {

  mapa?: mapboxgl.Map;


  lugares: Lugar[] = [{
    id: '1',
    nombre: 'Fernando',
    lng: -75.75512993582937,
    lat: 45.349977429009954,
    color: '#dd8fee'
  },
  {
    id: '2',
    nombre: 'Amy',
    lng: -75.75195645527508,
    lat: 45.351584045823756,
    color: '#790af0'
  },
  {
    id: '3',
    nombre: 'Orlando',
    lng: -75.75900589557777,
    lat: 45.34794635758547,
    color: '#19884b'
  }];


  ngOnInit() {
    this.crearMapa();
  }


  crearMapa() {

    // (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYmluYXJ5ZmFiIiwiYSI6ImNsdDV3czJsMDA1OG8yd28yZHowejN2ODEifQ.-nGhi5HqRGX4yPC6bWDxbw';

    this.mapa = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiYmluYXJ5ZmFiIiwiYSI6ImNsdDV3czJsMDA1OG8yd28yZHowejN2ODEifQ.-nGhi5HqRGX4yPC6bWDxbw',
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 15.8
    });

    for (const marcador of this.lugares) {
      this.agregarMarcador(marcador);
    }

  }

  agregarMarcador(marcador: Lugar) {

    //console.log(marcador);

    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;

    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';

    const div = document.createElement('div');
    div.append(h2, btnBorrar);



    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent(div);

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color
    })
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup(customPopup)
      .addTo(this.mapa!);

    marker.on('drag', () => {
      const lngLat = marker.getLngLat();
      console.log(lngLat);

      //TODO: Crear evento para emitir las coordenadas de este marcador


    });

    btnBorrar.addEventListener('click', () => {
      marker.remove();
      //TODO: Eliminar el marcador mediante sockets
    })

  }


  crearMarcador() {

    const customMoarker: Lugar = {
      id: new Date().toISOString(),
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      nombre: 'Sin Nombre',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    this.agregarMarcador(customMoarker);
  }

}

// Función para generar un color HEX random
// '#' + Math.floor(Math.random() * 16777215).toString(16) 