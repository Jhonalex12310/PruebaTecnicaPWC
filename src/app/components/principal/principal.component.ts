import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  public lista=[];
  seleccion:number=0;
  user:string='';
  visualizacion1:boolean =true;
  visualizacion2:boolean =true;
  visualizacion3:boolean =true;
  visualizacion4:boolean=true;

  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    this.authService.getItems().subscribe((Snapshot) => {
      this.lista=[];
      Snapshot.forEach((menusData: any) => {
        this.lista.push({
          descripcion: menusData.payload.doc.data().descripcion,
          valor: menusData.payload.doc.data().valor
        });
      })
    });
  }
  
  iniciar(){
    if( this.user=='' && this.seleccion ==0){
      window.alert('Ingrese los datos')
    } else if(this.seleccion==0 ){
      window.alert('seleccione una opción')
    } else if(this.user==''){
      window.alert('Ingrese su nombre')
    }else{
      this.cambios();
    }
  }
  cambios(){
    if(this.seleccion==1){
      this.variables(false,true,true,true);
    }
    if(this.seleccion==2){
      this.variables(true,false,true,true);
    }
    if(this.seleccion==3){
      this.variables(true,true,false,true);
    }
    if(this.seleccion==4){
      this.variables(true,true,true,false);
    }
    if(this.seleccion==5){
      this.variables(true,true,true,true);
    }
  }
  variables(a:boolean,b:boolean,c:boolean,d:boolean){
      this.visualizacion1=a;
      this.visualizacion2=b;
      this.visualizacion3=c;
      this.visualizacion4=d;
  }
}
