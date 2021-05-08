import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { SocketioService } from 'src/app/services/socketio.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token:any;
  suscription$:Subscription = new Subscription;

  constructor(private router:Router, private data:DataService, private socket: SocketioService, private svAuth:AuthService) { }

  async ngOnInit(): Promise<void> {
    await this.revisarToken();
  }

  async login(provider: string) {
    console.log('Provider: ', provider);
    this.svAuth.loginOAuth2(provider)
      .then((user: any) => {
        console.log(user);
        this.socket.emit('signIn',{
          displayName: user.displayName,
          email: user.email,
          phtoURL: user.photoURL,
          apiKey:environment.API_KEY
        });
        this.suscription$ = this.socket.on('token').subscribe((token:any)=>{
          localStorage.setItem('jwt',token);
          this.data.sendCriterio(true);
          this.router.navigate(['../../chats']);
        });
      })
      .catch((error) => {
        return {
          success: false,
          error
        }
      })
  }

  revisarToken(){
    this.token = localStorage.getItem('jwt');
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }
}
