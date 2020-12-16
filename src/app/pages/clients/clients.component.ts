import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this._globalService.httpGetProfile();

    this._globalService.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('this is from my profile ts', profile);
        this.fillClient(profile.tag.accounts);
      }
    );
  }

  fillClient(profile: any): void {
    this.clients = profile;
  }

}
