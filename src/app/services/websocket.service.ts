import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  getUsuario(){
    return this.usuario;
  }

  constructor( private socket: Socket ) { 
    this.checkStatus();
    this.cargarStorage();
  }

  private checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emitir(evento: string, payload?: any, callback?: Function){
    console.log("emitiendo evento " + evento);
    this.socket.emit(evento, payload, callback);
  }

  escuchar(evento: string) {
    return this.socket.fromEvent( evento );
  }

  loginWs (nombre: string) {
     return new Promise( (resolve, reject) =>{
       this.emitir('configurar-usuario', { nombre }, resp =>{
         this.usuario = new Usuario(nombre);
         this.guardarStorage();
         resolve(resp);
       });      
     });
  }

  guardarStorage(){
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage(){
    
    if(sessionStorage.getItem('usuario')){
      this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
      this.loginWs(this.usuario.nombre);
    }

  }
}
