import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [NgFor],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input({ required: true }) value = 0;

  getStars() {
    return new Array(this.value);
  }
}
