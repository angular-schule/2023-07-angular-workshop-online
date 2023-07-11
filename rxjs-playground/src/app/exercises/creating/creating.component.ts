import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    // of('A', 'B', 'C')
    // from([1,2,3,4,5])
    // interval(1000)     // ---0---1---2---3---4--- ...
    // timer(3000)        // ---------0|
    // timer(3000, 1000)  // ---------0---1---2---3---4--- ...
    // timer(0, 1000)     // 0---1---2---3---4--- ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });



    /******************************/

    function producer(sub: any) {
      const result = Math.random();
      sub.next(result);

      sub.next(10);
      sub.next(20);

      setTimeout(() => sub.next(100), 1000)
      setTimeout(() => sub.next(200), 2000)
      setTimeout(() => sub.complete(), 3000)
    }

    const observer = {
      next: (e: number) => console.log(e),
      error: (e: any) => console.error(e),
      complete: () => console.log('COMPLETE')
    };

    // producer(observer);


    const myObs$ = new Observable<number>(producer);
    // myObs$.subscribe(observer);



    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
