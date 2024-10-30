import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-documento',
  templateUrl: 'documento.page.html',
  styleUrls: ['documento.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})

export class DocumentoPage {

  constructor() {}

  ngOnInit(): void {
    console.log('documento pdf');

  }

}
