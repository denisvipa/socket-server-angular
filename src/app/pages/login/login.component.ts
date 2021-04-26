import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre: string = '';

  constructor( public wsService: WebsocketService, private router: Router) { }

  ngOnInit(): void {
  }

  ingresar( f: NgForm ) {

    if( f.invalid){ return }

    this.wsService.loginWs(this.nombre)
      .then( ()=> {
        this.router.navigate(['/mensajes']);
      });
    

  }

}
