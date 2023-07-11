import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, startWith } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
    templateUrl: './game-score.component.html',
    standalone: true,
    imports: [HistoryComponent]
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den Punktestand zu ermitteln ...
     */

    /******************************/

    this.score$.pipe(
      startWith(0),
      scan((acc, value) => acc + value, 100)
    ).subscribe(score => this.currentScore = score);

    // [1,2,3,4,5,6].reduce((acc, item) => acc + item) // 21


    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
