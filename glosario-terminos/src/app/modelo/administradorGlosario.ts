import { Injectable } from '@angular/core';
import { Glosario } from './glosario';

@Injectable()
export class AdministradorGlosario {
  private static instance: AdministradorGlosario;
  private itemsTerminos!: Glosario[];

  private constructor() {
  }

  public static getInstance(): AdministradorGlosario {
    if (!AdministradorGlosario.instance) {
      AdministradorGlosario.instance = new AdministradorGlosario();
    }
    return AdministradorGlosario.instance;
  }

  public cargarTerminosGlosario() {
    fetch('./assets/json/glosario-terminos.json').then(res => res.json())
    .then(data => {
      this.itemsTerminos = data.terminos;
    })
    .catch(error => {console.error('¡Ocurrió un error!', error);});
  }

  public getItemsTerminos(): Glosario[] {
    return this.itemsTerminos;
  }
}
