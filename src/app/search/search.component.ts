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
  avgScore = null;

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
          for(let item of data["sleep"]) {
            this.sleepResults.push(item);
          }
          this.sleepResults.sort((a, b) => {
            return <any>new Date(b.summary_date) - <any>new Date(a.summary_date);
          });
        });
    });

    this.activitySub = this.route.paramMap.subscribe(params => {
      this.activityService
        .getActivitySummary()
        .subscribe(data => {
          localStorage.setItem('activitySummary', JSON.stringify(data));
          for(let item of data["activity"]) {
            this.activityResults.push(item);
          }
          this.activityResults.sort((a, b) => {
            return <any>new Date(b.summary_date) - <any>new Date(a.summary_date);
          });
        });
    });

    this.readinessSub = this.route.paramMap.subscribe(params => {
      this.readinessService
        .getReadinessSummary()
        .subscribe(data => {
          localStorage.setItem('readinessSummary', JSON.stringify(data));
          for(let item of data["readiness"]) {
            this.readinessResults.push(item);
          }
          this.readinessResults.sort((a, b) => {
            return <any>new Date(b.summary_date) - <any>new Date(a.summary_date);
          });

          let avgDaysCalculation = 5;
          let addScore = 0;
          
          if(this.readinessResults.length >= 4) {
            for(let i=0; i<= avgDaysCalculation-1; i++) {
              addScore += this.readinessResults[i].score;
            }
            this.avgScore = addScore / avgDaysCalculation;
          } else {
            for(let i=0; i<= this.readinessResults.length; i++) {
              addScore += this.readinessResults[i].score;
            }
            this.avgScore = addScore / this.readinessResults.length;
          }
            
        });
    });
  }

  ngOnDestroy():void {
    if (this.sleepSub) {
      this.sleepSub.unsubscribe();
    }
    if (this.activitySub) {
      this.activitySub.unsubscribe();
    }
    if (this.readinessSub) {
      this.readinessSub.unsubscribe();
    }
  }

}
