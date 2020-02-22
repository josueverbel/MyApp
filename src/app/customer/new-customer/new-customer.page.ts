import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerService } from 'src/app/services/customer.service';
import { Constant } from 'src/app/Constants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.page.html',
  styleUrls: ['./new-customer.page.scss'],
})
export class NewCustomerPage implements OnInit {
  public formcustomer: FormGroup;
  public loanding = false;
   public clickedImage: string;

  constructor(
    private camera: Camera,
    private fb: FormBuilder,
    private customerService: CustomerService,
    public alertController: AlertController,
    public domSanitizer: DomSanitizer,
    public navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.clickedImage = Constant.images.noSelectedbase64;
    this.createForms();
  }
  private createForms() {
    this.formcustomer = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  public save() {
  
    if (this.formcustomer.invalid) {

      this.onError('Verifica que has ingresado todos los datos en el formato correpto');
      return;
    }
    this.store(this.formcustomer.value);
  }
  private store(data) {
    this.loanding = true;
    this.customerService.store(data).subscribe(
      res => {
        this.onSuccess('Sera redirigido a home');
        this.loanding = false;
        this.formcustomer.patchValue({});
        this.router.navigate(['/']);
      },
      err => {
        this.onError();
        this.loanding = false;
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
  public captureImage() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options) .then((imageData) => {
      this.clickedImage = 'data:image/jpeg;base64,' + imageData;
      this.formcustomer.get('file').setValue(imageData);
    }, (err) => {
     this.onError();

		});
  }
  onSuccess(msm = null) {
    if (!msm) { msm = 'Continua con tus acciones'; }
    this.presentAlert(
      'En hora buena!',
      'Todo salio bien',
      msm
    );
  }
  onError(msm = null) {
    if (!msm) { msm = 'Contacta con el administrador'; }
    this.presentAlert(
      'Error',
      'Algo anda mal',
      msm
    );
  }

}
