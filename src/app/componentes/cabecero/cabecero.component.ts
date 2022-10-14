import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  public isCollapsed = true;
  public isDropdownCollapsed = true;
  permitirRegistro: boolean;
  
  isloggedIn: boolean;
  loggedInUser: string;

  constructor(private loginService: LoginService,
    private router: Router, private confServ: ConfiguracionServicio) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.isloggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isloggedIn = false;
      }
    })

    this.confServ.getConfiguracion().subscribe(configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    })
  }

  logout(){
    this.loginService.logout();
    this.isloggedIn = false;
    this.router.navigate(['/login'])
  }

}
