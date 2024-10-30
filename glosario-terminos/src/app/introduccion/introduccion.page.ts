import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-introduccion',
  templateUrl: 'introduccion.page.html',
  styleUrls: ['introduccion.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class IntroduccionPage {
  constructor() {}
}
