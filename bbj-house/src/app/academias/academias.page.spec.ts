import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcademiasPage } from './academias.page';

describe('AcademiasPage', () => {
  let component: AcademiasPage;
  let fixture: ComponentFixture<AcademiasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
