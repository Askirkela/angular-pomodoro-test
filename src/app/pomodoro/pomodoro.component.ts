import { Component, OnInit } from '@angular/core';
import { PomodoroService, TimerType } from '../pomodoro.service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  timerTypes = TimerType;
  timerType$ = this.p.timerType$;
  breakTimer$ = this.p.breakTimer$;
  timer$ = this.p.timer$;

  constructor(private p: PomodoroService) { }

  ngOnInit() {
  }

}