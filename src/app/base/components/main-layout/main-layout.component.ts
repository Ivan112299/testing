import { Component } from '@angular/core';
import { faCoffee, faGaugeSimple} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.less']
})
export class MainLayoutComponent {
  faCoffee = faCoffee
  faGaugeSimple = faGaugeSimple

}
