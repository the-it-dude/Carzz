import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrzzService } from '../../services/crzz.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: false
})
export class EventPage implements OnInit {

  event: any = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crzzService: CrzzService,
  ) { }

  ngOnInit() {
    const event_id : string | null = this.route.snapshot.paramMap.get("event_id")

    this.load_event(event_id)
  }

  load_event(event_id: string | null) {
    if (event_id  === null) {
      this.router.navigateByUrl("/", { replaceUrl: true })
      return
    }

    this.crzzService.load_event(event_id).subscribe(
      async (result) => {
        this.event = result
      }
    )
  }

  follow(event_id: string) {
    this.crzzService.follow(event_id).subscribe(
      async () => {
        this.load_event(event_id)
      }
    )
  }

  unfollow(event_id: string) {
    this.crzzService.unfollow(event_id).subscribe(
      async () => {
        this.load_event(event_id)
      }
    )
  }

  participage(event_id: string) {
    this.crzzService.participate(event_id).subscribe(
      async () => {
        this.load_event(event_id)
      }
    )
  }

  can_edit_event(event: any) {
    return ["owner", "manager"].includes(event.role)
  }

  mark_as_draft(event_id: string) {
    this.crzzService.change_status(event_id, "draft").subscribe(
      async (result) => {
        this.event = result
      }
    )
  }

  publish(event_id: string) {
    this.crzzService.change_status(event_id, "published").subscribe(
      async (result) => {
        this.event = result
      }
    )
  }

  make_private(event_id: string) {
    this.crzzService.change_status(event_id, "private").subscribe(
      async (result) => {
        this.event = result
      }
    )
  }

}
