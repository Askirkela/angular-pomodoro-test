import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { PomodoroService } from "./pomodoro.service";
import { PomodoroComponent } from "./pomodoro/pomodoro.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, PomodoroComponent],
  bootstrap: [AppComponent],
  providers: [PomodoroService]
})
export class AppModule {}
