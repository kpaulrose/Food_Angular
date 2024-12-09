import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GET_ORDER, ORDER } from '../api/url';
import { Order } from '../../../backend/src/model/order.model';





@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  orderItem(user:string, totalAmount: number, totalQuantity: number){
    const  body ={user,totalAmount,totalQuantity};
     return this.http.put(ORDER,body);
   }

   getItem(user:string){
     return this.http.get<Order[]>(GET_ORDER + user);
   }
}
