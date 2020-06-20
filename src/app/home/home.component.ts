import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private subscription;
  clientId: string;
  state: string;
  redirect_uri: string;
  response_type:string;
  innerHtml: any;

  constructor(
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit():void {
    this.clientId = '5VUJFE7S2KN6INUL';
    this.state = 'XXX';
    this.redirect_uri = window.location.origin + '/callback';
    this.response_type = 'token';
  }

  authorize():void {
    window.open(`https://cloud.ouraring.com/oauth/authorize?client_id=${this.clientId}&state=${this.state}&redirect_uri=${this.redirect_uri}&response_type=${this.response_type}`, "_self");
  }

 }