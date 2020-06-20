import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  @Input('data') searchResults = [];
  public accessToken: string;
  private subscription;
  private token;
  searchText: string;
  value = 'Clear me';

  constructor(
    private route: ActivatedRoute,
    private userInfoService: UserInfoService
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
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
