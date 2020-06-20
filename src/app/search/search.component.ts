import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SleepService } from '../services/sleep.service';
import { ActivityService } from '../services/activity.service';
import { ReadinessService } from '../services/readiness.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  sleepSub: Subscription;
  activitySub: Subscription;
  readinessSub: Subscription;
  sleepResults = [];
  activityResults = [];
  readinessResults = [];
  user;

  constructor(
    private route: ActivatedRoute,
    private sleepService: SleepService,
    private activityService: ActivityService,
    private readinessService: ReadinessService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.sleepSub = this.route.paramMap.subscribe(params => {
      this.sleepService
        .getSleepSummary()
        .subscribe(data => {
          localStorage.setItem('sleepSummary', JSON.stringify(data));
          console.log(data);
          for(let item of data["sleep"]) {
            this.sleepResults.push(item);
          }
        });
    });

    this.activitySub = this.route.paramMap.subscribe(params => {
      this.activityService
        .getActivitySummary()
        .subscribe(data => {
          localStorage.setItem('activitySummary', JSON.stringify(data));
          console.log(data);
          for(let item of data["activity"]) {
            this.activityResults.push(item);
          }
        });
    });

    this.readinessSub = this.route.paramMap.subscribe(params => {
      this.readinessService
        .getReadinessSummary()
        .subscribe(data => {
          localStorage.setItem('readinessSummary', JSON.stringify(data));
          console.log(data);
          for(let item of data["readiness"]) {
            this.readinessResults.push(item);
          }
        });
    });
  }

  ngOnDestroy():void {
    if (this.sleepSub) {
      this.sleepSub.unsubscribe();
    }
  }

}
