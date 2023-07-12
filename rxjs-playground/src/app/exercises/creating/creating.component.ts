import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber } from 'rxjs';
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
    // timer(1000, 1000)  // ---0---1---2---3---4--- ...
    // timer(3000)        // ---------0|
    // timer(3000, 1000)  // ---------0---1---2---3---4--- ...
    // timer(0, 1000)     // 0---1---2---3---4--- ...


    // Signatur für eigenen Operator
    /*function foo (source$: Observable<any>): Observable<any> {
      return source$.pipe();
    }*/

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });



    /******************************/

    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);

      sub.next(10);
      sub.next(20);


      const intervalId = setInterval(() => {
        sub.next(Date.now());
        console.log('Interval', Date.now());
      }, 1000)

      // setTimeout(() => sub.next(200), 2000)
      // setTimeout(() => sub.complete(), 3000)


      // Teardown Logic
      // wird beim unsubscribe ausgeführt
      return () => {
        clearInterval(intervalId);
      };
    }

    const observer: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (e: any) => console.error(e),
      complete: () => console.log('COMPLETE')
    };

    // producer(observer);


    const myObs2$ = new Observable<string>(sub => {
      sub.next('');
    });
    const myObs$ = new Observable(producer);
    const sub = myObs$.subscribe(observer);


    // Subscription später wieder beenden
    setTimeout(() => sub.unsubscribe(), 5000);



    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
