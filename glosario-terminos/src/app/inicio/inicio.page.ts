import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdministradorGlosario } from '../modelo/administradorGlosario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class InicioPage implements OnInit {
  private administradorGlosario: AdministradorGlosario;
  showSpinner!: boolean;

  constructor(private router: Router) {
    this.administradorGlosario = AdministradorGlosario.getInstance();
  }

  async ngOnInit() {
    this.showSpinner = true;
    this.administradorGlosario.cargarTerminosGlosario();

    await new Promise(f => setTimeout(f, 2000));
    this.showSpinner = false;

    await new Promise(f => setTimeout(f, 2000));
    this.router.navigateByUrl(environment.paginaIntroduccion);
  }

}
