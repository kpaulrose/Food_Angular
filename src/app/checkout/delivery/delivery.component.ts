import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit {
  user:any;
  userAddress!: string;
  storePhonenumber = +4914994874857;
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
    this.userAddress= this.user.address;
  }
  }
  
}
