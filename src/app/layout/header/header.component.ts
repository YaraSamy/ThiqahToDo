import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  changeLang() {
    if (localStorage.getItem('LANG') === 'en-US') {
      document.body.classList.add('rtl');
      localStorage.setItem('LANG', 'ar-EG');
      this.translateService.use('ar-EG');
    } else {
      document.body.classList.remove('rtl');
      localStorage.setItem('LANG', 'en-US');
      this.translateService.use('en-US');
    }
  }
}
