import { Injectable } from "@angular/core";
import { timer, Observable, of, BehaviorSubject } from "rxjs";
import { finalize, map, take } from "rxjs/operators";

/**
 * Enumeration for timer types
 */
export enum TimerType {
  WORK = "work",
  BREAK = "break"
}

/**
 * Service in charge of setting the "pomodoro" timers
 */
@Injectable()
export class PomodoroService {
  /** Base for work timer (in minutes) */
  private readonly TIMER_BASE = 60 * 0.5;
  /** Base for break timer (in minutes) */
  private readonly BREAKTIMER_BASE = 60 * 0.2;
  /** Current timer type */
  private timerType = new BehaviorSubject<TimerType>(TimerType.WORK);
  timerType$ = this.timerType.asObservable();
  /** Work timer */
  private timer = this.buildTimer(this.TIMER_BASE, TimerType.BREAK);
  /** Break timer */
  private breakTimer: Observable<number> = this.buildTimer(
    this.BREAKTIMER_BASE,
    TimerType.WORK
  );
  /** Expose work timer value as an object (minutes/seconds) */
  timer$ = this.timer.pipe(this.toRemainMS(this.TIMER_BASE));
  /** Expose break timer value as an object (minutes/seconds) */
  breakTimer$ = this.breakTimer.pipe(this.toRemainMS(this.BREAKTIMER_BASE));

  /**
   * Custom rxjs opertor to convert remaining time to an object
   * @param base
   */
  toRemainMS(base: number) {
    return (source: Observable<number>) =>
      source.pipe(
        map(seconds => base - seconds),
        map(rest => ({ m: Math.floor(rest / 60), s: rest % 60 }))
      );
  }

  /**
   * Build timer for base and prepare next timer type
   * @param base The base on which the timer runs
   * @param nextType The next type of timer
   */
  buildTimer(base: number, nextType: TimerType): Observable<number> {
    return timer(0, 1000).pipe(
      take(base + 1),
      finalize(() => this.timerType.next(nextType))
    );
  }
}
