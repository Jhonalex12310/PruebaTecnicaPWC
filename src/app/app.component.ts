import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pTecnica';
  mobile = false;
 
  ngOnInit() {
    if (window.screen.width <= 650) { 
      this.mobile = true;
    }
  }
}
