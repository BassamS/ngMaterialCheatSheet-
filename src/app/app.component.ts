import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-demo';
  notifications = 0;
  showSpinner = false;

  // vav
  opened = false;

  log(state) {
    console.log(state);

  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000)
  }
}
