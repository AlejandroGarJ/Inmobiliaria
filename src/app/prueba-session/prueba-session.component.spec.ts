import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaSESSIONComponent } from './prueba-session.component';

describe('PruebaSESSIONComponent', () => {
  let component: PruebaSESSIONComponent;
  let fixture: ComponentFixture<PruebaSESSIONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaSESSIONComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaSESSIONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
