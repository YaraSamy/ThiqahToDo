import {TranslateLoader} from '@ngx-translate/core';
import {en} from '../../../assets/i18n/en';
import {ar} from '../../../assets/i18n/ar';
import {Observable} from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  public getTranslation(lang: string): Observable<any> {
    return new Observable(observer => {
      if (lang === 'ar-EG') {
        document.body.classList.add('rtl');
        localStorage.setItem('LANG', 'ar-EG');
        observer.next(ar);
      } else {
        document.body.classList.remove('rtl');
        localStorage.setItem('LANG', 'en-US');
        observer.next(en);
      }
      observer.complete();
    });
  }
}
