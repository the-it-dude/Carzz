import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrzzService } from '../crzz.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage {

  constructor(
    private crzzService: CrzzService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.crzzService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true});
  }

}
