import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( private wsServivice: WebsocketService) { }

  sendMessage(de: string, mensaje: string ){
    const payload = {
      de,
      cuerpo: mensaje
    };

    this.wsServivice.emitir('mensaje', payload );
  }

  getMessages() {
    return this.wsServivice.escuchar('mensaje-nuevo');
  }

  getMessagePrivate() {
    return this.wsServivice.escuchar('mensaje-privado');
  }
}
