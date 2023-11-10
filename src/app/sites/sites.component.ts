import { Component, ViewChild } from '@angular/core';
import { App } from '../interface/App';
import { SiteService } from '../services/site.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent {
  @ViewChild('cadreAddForm') cadreAddForm: any;
  @ViewChild('addForm') addForm: any;
  response: any = { status: 0, message: '' };
  categories = [
    'Games',
    'Social',
    'Hobbies',
    'Professional',
    'Studies',
    'News',
    'Administration',
    'Other',
  ];
  apps: App[] = [];

  app: App = {
    user: this.sessionService.getUser()._id || '',
    name: '',
    image: '',
    description: '',
    category: 'Other',
    addDate: new Date(),
    url: '',
  };
  constructor(
    private readonly siteService: SiteService,
    private readonly sessionService: SessionService
  ) {
    this.apps = this.sessionService.getSites();
  }
  addApp() {
    this.siteService.add(this.app).subscribe((res: any) => {
      //set response to notify the user of the response message
      this.response = res;
      //if success add the site to the list in local storage and reset the form
      if (res.status === 200) {
        //reset response after 5 seconds
        setTimeout(() => {
          this.response = { status: 0, message: '' };
        }, 5000);
        //add Site to local storage
        this.sessionService.addSite(res.site);
        //add Site to the list
        this.apps.unshift(res.site);
        //reset the form for new app adding
        this.addForm.nativeElement.reset();
      }
    });
  }
  displayAddForm(event: Event): void {
    if (this.cadreAddForm.nativeElement.style.display === 'flex') {
      if (event.target == event.currentTarget) {
        this.cadreAddForm.nativeElement.style.display = 'none';
      }
    } else {
      this.cadreAddForm.nativeElement.style.display = 'flex';
    }
  }

  updateApp() {
    this.siteService.update(this.app).subscribe((res: any) => {
      //set response to notify the user of the response message
      this.response = res;
      //if success add the site to the list in local storage and reset the form
      if (res.status === 200) {
        //reset response after 5 seconds
        setTimeout(() => {
          this.response = { status: 0, message: '' };
        }, 5000);
        //update Site in local storage
        this.sessionService.updateSite(res.app);
        //update Site in the list
        this.apps = this.apps.map((app) => {
          if (app._id === res.app._id) {
            return res.app;
          }
          return app;
        });
      }
    });
  }
  deleteApp() {
    this.siteService.delete(this.app).subscribe((res: any) => {
      if (res.status == 200) {
        //delet the site from local storage
        this.sessionService.deleteSite(this.app);
        //delet the site from the list

        this.apps = this.apps.filter((app) => app._id !== this.app._id);
        //hide the setting of the app
        this.cadreSettingApp.nativeElement.style.display = 'none';
        //reset the app to empty
        this.app = {
          user: this.sessionService.getUser()._id || '',
          name: '',
          image: '',
          description: '',
          category: 'Other',
          addDate: new Date(),
          url: '',
        };
      } else {
        //set response to notify the user of the response message
        this.response = res;
        //reset response after 5 seconds
        setTimeout(() => {
          this.response = { status: 0, message: '' };
        }, 5000);
      }
    });
  }
  @ViewChild('cadreSettingApp') cadreSettingApp: any;
  displayCadreSettingApp(event: Event, app: App) {
    if (this.cadreSettingApp.nativeElement.style.display === 'flex') {
      if (event.target == event.currentTarget) {
        this.cadreSettingApp.nativeElement.style.display = 'none';
      }
    } else {
      this.app = app;
      this.cadreSettingApp.nativeElement.style.display = 'flex';
    }
  }
}
