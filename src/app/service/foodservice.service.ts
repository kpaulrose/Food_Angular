import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { FOODS_BY_ID, FOODS_URL, GET_FOOD } from '../api/url';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
 

  constructor(private http:HttpClient) { }

  getFood(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getFoodById(id: string) : Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID + id);
  }

  getFoodByIdWithoutParameter(foodId: string) : Observable<Food>{
    const body = { foodId}; 
    return this.http.post<Food>(GET_FOOD, body, { withCredentials: true });
    ;
  }
}
