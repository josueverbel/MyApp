import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  public errors: any;
  public customers: any = [];
  public loanding = false;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.loanding = true;
    this.customerService.get().subscribe(
      res  => {
       this.loanding = false;
        this.customers = res ;
      }, err => {
        this.errors = JSON.stringify(err);
      }
    );
  }

  public searchByPhone(ion) {
    if (ion.detail.value.length == 0) {
      this.getCustomers();
    }
    if (ion.detail.value.length != 0) {
      this.customers.data = [];
      this.customerService.getByPhone(ion.detail.value).subscribe(
        res => {
          this.customers = res;
        }
      );
    }


  }
}
