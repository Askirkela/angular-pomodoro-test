import { Component } from "@angular/core";
import { PomodoroService, TimerType } from "./pomodoro.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  

  constructor() {}
}
