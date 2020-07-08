import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';
import { SleepService } from '../services/sleep.service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  @Input('data') searchResults = [];
  sleepResults = [];
  public accessToken: string;
  private subscription;
  private sleepSub;
  private token;
  searchText: string;
  value = 'Clear me';
  avgDelta = null;

  constructor(
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private sleepService: SleepService
    ){
    const fragment: string = this.route.snapshot.fragment;
    let cBParams = JSON.parse('{"' + fragment.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
    this.token = cBParams.access_token;
    let tokenType = cBParams.token_type;
    localStorage.setItem('token', this.token);
    localStorage.setItem('tokenType', tokenType);
   }
  

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.userInfoService
        .getUserInfo(this.token)
        .subscribe(data => {
          localStorage.setItem('userInfo', JSON.stringify(data));
          this.searchResults.push(data);
        });
    });

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

          let avgDaysCalculation = 5;
          let addScore = 0;
          
          if(this.sleepResults.length >= 4) {
            for(let i=0; i<= avgDaysCalculation-1; i++) {
              addScore += this.sleepResults[i].temperature_delta;
            }
            this.avgDelta = addScore / avgDaysCalculation;
          } else {
            for(let i=0; i<= this.sleepResults.length; i++) {
              addScore += this.sleepResults[i].temperature_delta;
            }
            this.avgDelta = addScore / this.sleepResults.length;
          }
        });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
