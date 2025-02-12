import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CrzzService } from '../crzz.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage {

  constructor(
    private crzzService: CrzzService,
		private router: Router,
  ) {}

  async login(form: any) {
    this.crzzService.login(form.value.email, form.value.password).subscribe(
      async (_) => {
				this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      async (_) => {
        form.form.controls['email'].setErrors({'incorrect': true});
        form.form.controls['password'].setErrors({'incorrect': true});
      }
    )
  }

}
