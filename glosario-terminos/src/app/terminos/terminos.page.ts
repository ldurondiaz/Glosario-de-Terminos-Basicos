import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonAccordion, IonItem, IonLabel, IonAccordionGroup, IonChip, IonAvatar, IonIcon, IonSearchbar, IonList, IonItemDivider, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Glosario } from '../modelo/glosario';
import { AdministradorGlosario } from '../modelo/administradorGlosario';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SitioWeb } from '../modelo/sitioweb';

@Component({
  selector: 'app-terminos',
  templateUrl: 'terminos.page.html',
  styleUrls: ['terminos.page.scss'],
  standalone: true,
  imports: [IonButton, IonItemDivider, IonList, IonSearchbar, IonIcon, IonAvatar, IonChip, IonAccordionGroup,
    IonLabel, IonItem, IonAccordion, IonCol, IonRow, IonGrid, IonCardContent, IonCardSubtitle,
    IonCardTitle, IonCard, IonCardHeader, IonHeader, IonToolbar, IonTitle, IonContent,
    ExploreContainerComponent]
})

export class TerminosPage {
  safeUrl: SafeUrl | undefined;

  administradorGlosario: AdministradorGlosario;
  items!: Glosario[];
  itemsResult!: Glosario[];
  letra: string = '';
  letras: string[] = [];

  constructor(private sanitizer: DomSanitizer) {
    this.administradorGlosario = AdministradorGlosario.getInstance();
    let str = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (let i = 0; i < str.length; i++) {
      let l = str.charAt(i);
      this.letras.push(l);
    }
  }

  ngOnInit(): void {
    this.items = this.administradorGlosario.getItemsTerminos();
    for (let index = 0; index < this.items.length; index++) {
      let sitiosWeb: string[] = this.items[index].sitiosweb.split(' ');
      for (let i = 0; i < sitiosWeb.length; i++) {
        let sitioweb: SitioWeb = { url: sitiosWeb[i]};
        if (!this.items[index].listaSitiosWeb) {
          this.items[index].listaSitiosWeb = [];
        }
        this.items[index].listaSitiosWeb.push(sitioweb);
      }
    }
    this.itemsResult = this.items;
  }

  filtro(event: any) {
    const query = (event.target.value).toLowerCase();
    // se tarda en abrir y cerrar el ion-accordion
    //this.itemsResult = this.items.filter(item => item.concepto.toLowerCase().indexOf(query) > -1);
    // se tarda en cerrar el ion-accordion
    this.itemsResult = this.items.filter(item => item.concepto.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

  cambiarLetra(itemLetra: string) {
    this.letra = itemLetra;
  }

  compararLetras(a: string, b: string): boolean {
    return a.localeCompare(b, undefined, {sensitivity: 'base'}) === 0;
  }

  irEncabezadoLetra(itemLetra: string) {
    var element = document.getElementById(itemLetra);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getSafeUrl(sitioweb: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(sitioweb);
  }

}
