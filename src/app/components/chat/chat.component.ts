import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  
  texto: string;
  mensajeSubscription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor( public chatService: ChatService, private wsService: WebsocketService ) { }

  ngOnInit(): void {

    this.elemento = document.getElementById("chat-mensajes");
    this.mensajeSubscription =  this.chatService.getMessages().subscribe( msg =>{
      this.mensajes.push(msg);
      
      setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });

  }

  ngOnDestroy(){
    this.mensajeSubscription.unsubscribe();
  }

  enviar( f: NgForm ) {
    if(f.invalid) { return }

    this.chatService.sendMessage( this.wsService.usuario.nombre, this.texto);

    this.texto = "";

  }

}
