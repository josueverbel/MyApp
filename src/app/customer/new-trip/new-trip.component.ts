import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {
  @Input() customer: any;
  @Output() close = new EventEmitter<any>();
  public formcustomer: FormGroup;
    constructor( private fb: FormBuilder,
                 private customerservice: CustomerService,
                 public alertController: AlertController) {

     }

    ngOnInit() {
      this.createForms();
     
    }
    private createForms() {
      this.formcustomer = this.fb.group({
        email: [this.customer.email, Validators.required],
        dateofservice: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
      });
    }
    public closed() {
      this.close.emit(this.customer);
    }
    public save() {
      if (this.formcustomer.invalid) {
        return;
      }
      let date =  formatDate(this.formcustomer.value.dateofservice, 'yyyy-MM-dd', 'en-US');
      console.log(date);
      this.formcustomer.get('dateofservice').setValue(date);
      
      this.customerservice.storeTrip(this.formcustomer.value).subscribe(
        res => {
          this.customerservice.getById(this.customer.id).subscribe(
              resul => {
                this.customer = resul;
                this.presentAlert('Exito', 'Registro guardado', 'se agrego un nuevo viaje a este cliente');
                this.close.emit(this.customer);
              }
          );
        }
      );
    }
    async presentAlert(tit, sub, msg) {
      const alert = await this.alertController.create({
        header: tit,
        subHeader: sub,
        message: msg,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

