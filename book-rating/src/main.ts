import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


//////////


export class Customer {

  private foo = 'fghkfdhbgfd';
  /*private id: number;

  constructor(id: number) {
    this.id = id;
  }*/


  constructor(private id: number) {}

  fooBar(arg: number): string {

    setTimeout(() => {
      console.log('Die ID ist:', this.id);
    }, 2000);

    return '';
  }
}



const myCustomer = new Customer(3);
myCustomer.fooBar(5);
