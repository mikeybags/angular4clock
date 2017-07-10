import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentTime = new Date();
  timeZone = 'CST';
  fullTimeZone = "Central Time Zone"
  timer = null;

  updateTime() {
    this.getTime();
  }

  setTimeZone(tz) {
    if (this.timer._state === "notScheduled") {
      this.timer = setInterval(() => this.updateTime(), 1000);
    }
    if (tz === 'PST') {
      this.timeZone = 'PST';
      this.fullTimeZone = "Pacific Time Zone"
      this.getTime();
    }
    else if (tz === 'MST') {
      this.timeZone = 'MST';
      this.fullTimeZone = "Mountain Time Zone"
      this.getTime();
    }
    else if (tz === 'CST') {
      this.timeZone = 'CST';
      this.fullTimeZone = "Central Time Zone";
      this.getTime();
    }
    else {
      this.timeZone = 'EST';
      this.fullTimeZone = "Eastern Time Zone"
      this.getTime();
    }
  }

  getTime() {
    if (this.timeZone ==='PST') {
      this.currentTime = new Date();
      this.currentTime.setHours(this.currentTime.getHours() - 2 )
    }
    else if (this.timeZone ==='MST') {
      this.currentTime = new Date();
      this.currentTime.setHours(this.currentTime.getHours() - 1 )
    }
    else if (this.timeZone ==='CST') {
      this.currentTime = new Date();
    }
    else if (this.timeZone ==='EST') {
      this.currentTime = new Date();
      this.currentTime.setHours(this.currentTime.getHours() + 1 )
    }
  }

  reset() {
    this.currentTime = null;
    this.timeZone = null;
    clearInterval(this.timer);
  }

  ngOnInit() {
    this.timer = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
