import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Lugar } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });


    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }

  //emitir eventos
  emit(evento: string, payload?: any, callback?: Function) {
    console.log('Emitiendo', evento);

    //emit('EVENTO', payload, callback?)
    this.socket.emit(evento, payload, callback);

  }

  //escuchar eventos
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }


  listen1(evento: string) {
    return this.socket.fromEvent<Lugar>(evento);
  }

  listenX(evento: string) {
    return this.socket.fromEvent<any>(evento);
  }


}
