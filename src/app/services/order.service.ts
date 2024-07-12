import { Injectable } from '@angular/core';
import { Order } from '../shared/models/orders';
import { HttpClient } from '@angular/common/http';
import { ORDERS_CREATE_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  create(order: Order) {
    return this._http.post<Order>(ORDERS_CREATE_URL, order)
  }
}
