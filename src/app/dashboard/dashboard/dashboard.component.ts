import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { RouterModule } from '@angular/router';
import { HomeContentComponent } from "../../home/home-content/home-content.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, RouterModule, HomeContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
