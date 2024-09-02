import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  cargando = false;
  mensajeExito = false;
  mensajeError = false;
mensaje: any;
telefono: any;
email: any;
nombre: any;

  constructor(private http: HttpClient) {}

  enviarFormulario(form: any) {
    if (form.valid) {
      this.cargando = true;
      this.mensajeExito = false;
      this.mensajeError = false;
  
      const formData = new FormData();
      formData.append('nombre', form.value.nombre);
      formData.append('email', form.value.email);
      formData.append('telefono', form.value.telefono);
      formData.append('mensaje', form.value.mensaje);
      formData.append('_captcha', 'false');
      formData.append('_subject', 'Nuevo mensaje en Pagina Web Ruggiero&ASociados');
  
      this.http.post('https://formsubmit.co/65d31c31fa8c2bd1b6585cefcaac06ae', formData, { responseType: 'text' })
        .subscribe({
          next: () => {
            this.cargando = false;
            this.mensajeExito = true;
            form.reset(); // Opcional: Resetea el formulario después de enviarlo
          },
          error: () => {
            this.cargando = false;
            this.mensajeError = true;
          }
        });
    }
  }
  
}

 
