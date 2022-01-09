import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {
        id: 1,
        task: 'Buy new sweatshirt',
        checked: true
      },
      {
        id: 2,
        task: 'Begin promotional phase',
        checked: false
      }
    ];
    return {tasks};
  }
}
