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
  tzOffset = this.currentTime.getTimezoneOffset();

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
      this.fullTimeZone = "Hawaii Time Zone"
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

  getTime() {
    if (this.timeZone ==='HT') {
      this.currentTime = new Date();
      this.currentTime.setHours(this.currentTime.getHours() - 5 )
    }    
    else if (this.timeZone ==='AKT') {
      this.currentTime = new Date();
      this.currentTime.setHours(this.currentTime.getHours() - 3 )
    }    
    else if (this.timeZone ==='PT') {
      this.currentTime = new Date();
      this.currentTime.setHours(this.currentTime.getHours() - 2 )
    }
    else if (this.timeZone ==='MT') {
      this.currentTime = new Date();
      this.currentTime.setHours(this.currentTime.getHours() - 1 )
    }
    else if (this.timeZone ==='CT') {
      this.currentTime = new Date();
    }
    else if (this.timeZone ==='ET') {
      this.currentTime = new Date();
      this.currentTime.setHours(this.currentTime.getHours() + 1 )
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
    switch(this.tzOffset) {
      case 240:
        this.timeZone = 'ET';
        this.fullTimeZone = "Eastern Time Zone";
        break;     
      case 300:
        this.timeZone = 'CT';
        this.fullTimeZone = "Central Time Zone";
        break;
      case 360:
        this.timeZone = 'MT';
        this.fullTimeZone = "Mountain Time Zone";
        break;
      case 420:
        this.timeZone = 'PT';
        this.fullTimeZone = "Pacific Time Zone";
        break;
      case 480:
        this.timeZone = 'AKT';
        this.fullTimeZone = "Alaska Time Zone";
        break;
      case 600:
        this.timeZone = 'HT';
        this.fullTimeZone = "Hawaii-Aleutian Time Zone";
        break;
      default:
        this.message = "Your computer's local time zone is not set to a location in the United States. Time zone defaulted to Eastern Time."
        this.timeZone = 'ET';
        this.fullTimeZone = "Eastern Time Zone";
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
