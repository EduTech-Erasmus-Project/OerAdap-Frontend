import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OaInfoComponent } from './oa-info.component';

describe('OaInfoComponent', () => {
  let component: OaInfoComponent;
  let fixture: ComponentFixture<OaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
