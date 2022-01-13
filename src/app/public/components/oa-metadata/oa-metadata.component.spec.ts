import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OaMetadataComponent } from './oa-metadata.component';

describe('OaMetadataComponent', () => {
  let component: OaMetadataComponent;
  let fixture: ComponentFixture<OaMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OaMetadataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OaMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
