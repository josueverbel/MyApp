import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {
  public loanding = false;
  public customer: any;
  public newTrip = false;
  public apiserver =  'http://apiprueba.trend2.net';
  constructor(
    private customerService: CustomerService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    public domSanitizer: DomSanitizer,
    ) { }

  ngOnInit() {
    this.getById(this.rutaActiva.snapshot.params.id);
  }
  public urlimg(url) {
    return this.apiserver + url;
  }
  getById(id) {
    this.loanding = true;
    this.customerService.getById(id).subscribe(
      res => {
        this.customer = res;
        this.loanding = false;
      }
    );
  }

  public addTrip() {
   this.newTrip = true;
  }
  public closeNewTrip(customer) {
    this.customer =  customer;
    this.newTrip = false;
  }
}
