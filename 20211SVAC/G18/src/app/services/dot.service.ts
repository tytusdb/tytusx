import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class DotService {
  public data: any = [];
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  setDot(dot: string) {
    this.storage.set('dot', dot);
  }

  getDot() {
    return this.storage.get('dot');
  }
}
