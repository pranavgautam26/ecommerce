import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import {map} from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl ='https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, typeId?: number, sort?: string,pageNumber?: Number, pageSize?: Number, search?: string) {
    let params = new HttpParams();

    if(brandId)
    {
      params = params.append('brandId',brandId.toString());
    }
    if(typeId)
    {
      params = params.append('typeId',typeId.toString());
    }
    if(sort)
    {
      params = params.append('sort', sort);
    }
    if(pageNumber)
    {
      params = params.append('pageIndex', pageNumber.toString());
    }
    if(pageSize)
    {
      params = params.append('pageSize',pageSize.toString());
    }
    if(search)
    {
      params = params.append('search', search);
    }

    return this.http.get<IPagination>(this.baseUrl + 'products',{observe: 'response',params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'products/'+ id);
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
