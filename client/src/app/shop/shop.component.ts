import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  types: IType[];
  brands: IBrand[];
  search: string;
  brandIdSelected: number = 0;
  typeIdSelected: number = 0;
  sortSelected = 'name';
  pageNumber = 1;
  pageSize = 6;
  totalCount: Number;
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price Low to High', value: 'priceAsc'},
    {name: 'Price High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected, this.pageNumber, this.pageSize,this.search).subscribe(response => {
      this.products = response.data;
      this.pageNumber = response.pageIndex;
      this.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number)
  {
    this.brandIdSelected = brandId;
    this.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number)
  {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string)
  {
    this.sortSelected = sort;
    this.getProducts();
  }

  onPageChanged(event: any)
  {
    if(this.pageNumber !== event)
    {
      this.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() 
  {
    this.search = this.searchTerm.nativeElement.value;
    this.pageNumber =1;
    this.getProducts();
  }

  onReset()
  {
    this.searchTerm.nativeElement.value = '';
    this.brandIdSelected = 0;
    this.typeIdSelected = 0;
    this.sortSelected = 'name';
    this.pageNumber = 1;
    this.pageSize = 6;
    this.search = '';
    this.getProducts();
  }

}
