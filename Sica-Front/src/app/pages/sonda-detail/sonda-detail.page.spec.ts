import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SondaDetailPage } from './sonda-detail.page';

describe('SondaDetailPage', () => {
  let component: SondaDetailPage;
  let fixture: ComponentFixture<SondaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SondaDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SondaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
