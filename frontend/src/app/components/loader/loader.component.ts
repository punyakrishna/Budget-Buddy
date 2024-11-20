import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  loading$: Observable<boolean>; // Define type for clarity

  constructor(private loadingService: LoaderService) {
    this.loading$ = this.loadingService.loading$;

  }

}
