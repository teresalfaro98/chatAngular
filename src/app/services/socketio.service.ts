import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  statusConnect: boolean = false;
  socketId:string;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  on(eventName: string){
    return this.socket.fromEvent(eventName).pipe(map((data:any)=>data));
  }

  emit(eventName:string, payload){
    this.socket.emit(eventName, payload);
  }

  checkStatus(){
    this.socket.on('connect',() => {
      console.log('Conectado al servidor de sockets');
      this.statusConnect=true;
    });
    this.socket.on('disconnect',() => {
      console.log('se ha desconectado del servidor de sockets');
      this.statusConnect=false;
    });
  }
}
