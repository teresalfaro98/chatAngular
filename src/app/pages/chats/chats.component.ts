import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SocketioService } from 'src/app/services/socketio.service';
import {environment} from '../../../environments/environment';
import jwt_Decode from 'jwt-decode';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  token:any;
  usuarios:any=[];
  suscription$:Subscription=new Subscription;

  constructor(private router: Router, private socket:SocketioService, private data: DataService) {
    this.suscription$ = this.socket.on('broadcast-message').subscribe((userList:any)=>{
      this.usuarios=userList;
      console.log(userList);
    });
  }

  async ngOnInit(): Promise<void> {
    this.token = await jwt_Decode(localStorage.getItem('jwt'));
    let payload = {
      token:localStorage.getItem('jwt'),
      apiKey:environment.API_KEY,
      bandera:0
    }
    this.socket.emit('actualizarCorreo',payload);
    console.log(this.token);
  }

  async logout(){
    this.data.sendCriterio(false);
    this.socket.emit('logOut',{token:localStorage.getItem('jwt'),apikey:environment.API_KEY});
    await localStorage.removeItem('jwt');
    this.router.navigate(['../auth/login']);
  }


  revisarTokens(){
    this.token = localStorage.getItem('jwt');
  }


}
