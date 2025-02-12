import { Component, Inject, LOCALE_ID } from '@angular/core';
import {formatDate} from '@angular/common';
import { NgForm } from '@angular/forms';
import { CrzzService } from 'src/app/services/crzz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new_event',
  templateUrl: 'new_event.page.html',
  styleUrls: ['new_event.page.scss'],
  standalone: false,
})
export class NewEventPage {
  min_date: string;
  event_type: string = "cars_and_coffee"

  constructor(
    private router: Router,
    private crzzService: CrzzService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.min_date =  formatDate(Date.now(),'yyyy-MM-dd', locale);
  }

  create_event(form: NgForm) {
    const date_time: number = Date.parse(form.value.date_time)

    this.crzzService.create_event(
      form.value.event_type,
      form.value.title,
      form.value.description,
      formatDate(Date.now(), 'yyyy-MM-dd', this.locale),
      formatDate(date_time, 'HH:mm', this.locale),
      form.value.location_name,
    ).subscribe(
      async (res) => {
        this.router.navigateByUrl("/tabs/events/" + res.id, { replaceUrl: true })
      },
      async (error_result) => {
        console.log(error_result)
      }
    )
  }

}
