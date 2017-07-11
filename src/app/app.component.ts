import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentTime = new Date();
  timeZone = null;
  fullTimeZone = null;
  timer = null;
  message = null;
  mapImagePath = 'assets/images/timezonemap.gif'
  tzOffsetHours = this.currentTime.getTimezoneOffset() / 60;

  updateTime() {
    this.getTime();
  }

  setTimeZone(tz) {
    if (this.timer._state === "notScheduled") {
      this.timer = setInterval(() => this.updateTime(), 1000);
    }
    if (this.message) {
      this.message = null;
    }
    if (tz === 'HT') {
      this.timeZone = 'HT';
      this.fullTimeZone = "Hawaii-Aleutian Time Zone"
      this.getTime();
    }
    else if (tz === 'AKT') {
      this.timeZone = 'AKT';
      this.fullTimeZone = "Alaska Time Zone"
      this.getTime();
    }
    else if (tz === 'PT') {
      this.timeZone = 'PT';
      this.fullTimeZone = "Pacific Time Zone"
      this.getTime();
    }
    else if (tz === 'MT') {
      this.timeZone = 'MT';
      this.fullTimeZone = "Mountain Time Zone"
      this.getTime();
    }
    else if (tz === 'CT') {
      this.timeZone = 'CT';
      this.fullTimeZone = "Central Time Zone";
      this.getTime();
    }
    else {
      this.timeZone = 'ET';
      this.fullTimeZone = "Eastern Time Zone"
      this.getTime();
    }
  }

  getUTCTime() {
    this.tzOffsetHours = this.currentTime.getTimezoneOffset() / 60
    this.currentTime.setHours(this.currentTime.getHours() + this.tzOffsetHours )
  }

  getTime() {
    this.currentTime = new Date();
    this.getUTCTime();
    if (this.timeZone ==='HT') {
      this.currentTime.setHours(this.currentTime.getHours() - 10 )
    }    
    else if (this.timeZone ==='AKT') {
      this.currentTime.setHours(this.currentTime.getHours() - 8 )
    }    
    else if (this.timeZone ==='PT') {
      this.currentTime.setHours(this.currentTime.getHours() - 7 )
    }
    else if (this.timeZone ==='MT') {
      this.currentTime.setHours(this.currentTime.getHours() - 6 )
    }
    else if (this.timeZone ==='CT') {
      this.currentTime.setHours(this.currentTime.getHours() - 5 )
    }
    else if (this.timeZone ==='ET') {
      this.currentTime.setHours(this.currentTime.getHours() - 4 )
    }
  }

  reset() {
    this.currentTime = null;
    this.timeZone = null;
    this.fullTimeZone = null;
    if (this.message) {
      this.message = null;
    }
    clearInterval(this.timer);
  }

  ngOnInit() {
    this.timer = setInterval(() => this.updateTime(), 1000);
    switch(this.tzOffsetHours) {
      case 4:
        this.timeZone = 'ET';
        this.fullTimeZone = "Eastern Time Zone";
        break;     
      case 5:
        this.timeZone = 'CT';
        this.fullTimeZone = "Central Time Zone";
        break;
      case 6:
        this.timeZone = 'MT';
        this.fullTimeZone = "Mountain Time Zone";
        break;
      case 7:
        this.timeZone = 'PT';
        this.fullTimeZone = "Pacific Time Zone";
        break;
      case 8:
        this.timeZone = 'AKT';
        this.fullTimeZone = "Alaska Time Zone";
        break;
      case 10:
        this.timeZone = 'HT';
        this.fullTimeZone = "Hawaii-Aleutian Time Zone";
        break;
      default:
        this.message = "Your computer's local time zone is not set to a location in the United States. Time zone defaulted to Eastern Time."
        this.timeZone = 'ET';
        this.fullTimeZone = "Eastern Time Zone";
    }
    this.updateTime();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
