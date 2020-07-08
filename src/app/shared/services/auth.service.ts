import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; 

  constructor(
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone 
  ) {
    /**
     * Servicio para guardar localmente los datos de usuario, y eliminar cuando cierra sesion
     */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  } 
  /**
   * Obtiene los elementos de una coleccion creada en FireBase Store
   */
  public getItems() {
    return this.afs.collection('menus').snapshotChanges();
  }
  
  /**
   * Ingreso al aplicativo con correo y contraseña
   */
  SignIn(email, password) {     
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        setTimeout (() => { 
          this.ngZone.run(() => {
          this.router.navigate(['principal']);
          }, 3000);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert('La combinación de usuario y clave es incorrecta')
      })
  }
  /**
   * Verifica el estado de conexion del usuario actual
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('user')))
    return (user != null ) ? true : false;
  }

  /**
   * Ingreso con la API de Gmail
   */
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  /**
   * Ingreso a la pantalla principal de la aplicación, después de verificar los datos de inicio 
   * de sesión
   * @param provider 
   */
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      setTimeout (() => { 
        this.ngZone.run(() => {
        this.router.navigate(['principal']);
        }, 3000);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert('Se ha presentado un error')
    })
  }

  /**
   * Configuracion de los datos de inicio de sesión del usuario
   * ID: identificador del usuario
   * EMAIL: direccion de correo electronico del usuario
   * 
   * @param user 
   */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  /**
   * Elimina los datos de la sesión del usuario actualmente logueado en el sistema
   */
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['ingreso']);
    })
  }

}
