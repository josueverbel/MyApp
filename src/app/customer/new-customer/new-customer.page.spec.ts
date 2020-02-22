import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCustomerPage } from './new-customer.page';

describe('NewCustomerPage', () => {
  let component: NewCustomerPage;
  let fixture: ComponentFixture<NewCustomerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
