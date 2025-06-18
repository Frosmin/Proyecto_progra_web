import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaComponent } from './vista.component';

describe('VistaComponent', () => {
  let component: VistaComponent;
  let fixture: ComponentFixture<VistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
