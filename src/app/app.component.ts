import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from "./login/login-page/login-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_project';
}
