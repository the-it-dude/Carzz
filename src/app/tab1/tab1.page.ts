import { Component } from '@angular/core';

import { CrzzService } from '../crzz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  events: any[] = []

  constructor(
    private router: Router,
    private crzzService: CrzzService,
  ) {}

  ngOnInit() {
    this.crzzService.load_events().subscribe(
      async (res) => {
        this.events = res.map((event: any) => {
          event["type_name"] = this.type_name(event["type"])
          return event
        })
      }
    )
  }

  type_name(event_type: string) {
    return {
      "cars_and_coffee": "Cars & Coffee",
      "meeting": "Meeting",
    }[event_type]
  }

  view_event(event_id: string) {
    this.router.navigateByUrl("/tabs/events/" + event_id, { replaceUrl: true })
  }
}
