import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleWithNavbarComponent } from './example-with-navbar.component';

describe('ExampleWithNavbarComponent', () => {
  let component: ExampleWithNavbarComponent;
  let fixture: ComponentFixture<ExampleWithNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExampleWithNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleWithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
