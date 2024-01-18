import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViviendasComponentComponent } from './viviendas-component.component';

describe('ViviendasComponentComponent', () => {
  let component: ViviendasComponentComponent;
  let fixture: ComponentFixture<ViviendasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViviendasComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViviendasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
