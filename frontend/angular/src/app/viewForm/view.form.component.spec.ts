import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormComponent } from './view.form.component';

describe('ViewFormComponent', () => {
  let component: ViewFormComponent;
  let fixture: ComponentFixture<ViewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
