import { Component } from '@angular/core';

import { CrzzService } from '../../services/crzz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss'],
  standalone: false,
})
export class EventsPage {

  events: any[] = []

  constructor(
    private router: Router,
    private crzzService: CrzzService,
  ) {}

  ngOnInit() {
    this.load_upcoming_events()
  }

  load_upcoming_events() {
    this.events = [];
    this.crzzService.load_events().subscribe(
      async (res) => {
        this.events = res.map((event: any) => {
          event["type_name"] = this.type_name(event["type"])
          return event
        })
      }
    )
  }

  load_user_events() {
    this.events = [];
    this.crzzService.load_user_events().subscribe(
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
