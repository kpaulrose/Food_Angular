import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { FOODS_BY_ID, FOODS_URL } from '../api/url';

@Injectable({
  providedIn: 'root'
})
export class FoodserviceService {
 

  constructor(private http:HttpClient) { }

  getFood(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getFoodById(id: number) : Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID + id);
  }
}
