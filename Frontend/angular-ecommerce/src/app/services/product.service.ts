import { ProductCategory } from './../common/product-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import{map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProduct(theProductId: number): Observable<Product> {
    const productUrl= `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  searchProducts(theKeyword: string) :Observable<Product[]> {
   const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
   return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
     map(response=>response._embedded.products)
   )
  }
  
  private baseUrl = 'http://localhost:8080/api/products';
  private ProductCategoryUrl='http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryById: number) : Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryById}`
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response=>response._embedded.products)
    )
  }
  getProductListPagination(thePage: number, thePageSize: number , theCategoryId:number): Observable<GetResponseProducts>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+
    `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
    
  }
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProducts_Category>(this.ProductCategoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    )
  }
  getProductListSearchPagination(thePage: number, thePageSize: number , theKeyword:string): Observable<GetResponseProducts>{
        const searchUrl=`${this.baseUrl}/search/findByNameContaining?=${theKeyword}`+
                        `&page=${thePage}&size=${thePageSize}`;
                        return this.httpClient.get<GetResponseProducts>(searchUrl);
        
  }
  
}
interface GetResponseProducts{
  _embedded:{
    products:Product[];
  },
  page:{
    size: number,
    totalElement: number,
    totalPages:number,
    number:number
  }
}
interface GetResponseProducts_Category{
  _embedded:{
    productCategory:ProductCategory[];
  }
}

