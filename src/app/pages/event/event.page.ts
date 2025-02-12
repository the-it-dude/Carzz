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
      console.log("NANAA")
      this.router.navigateByUrl("/", { replaceUrl: true })
      return
    }

    this.crzzService.load_event(event_id).subscribe(
      async (result) => {
        this.event = result
      }
    )
  }

}
