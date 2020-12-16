import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: any;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this._globalService.httpGetProfile();

    this._globalService.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('this is from my profile ts', profile);
        this.fillGroup(profile.tag.groups);
      }
    );
  }

  fillGroup(profile: any): void {
    this.groups = profile;
  }

}
