import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleWithNavbarAndSidebarComponent } from './example-with-navbar-and-sidebar.component';

describe('ExampleWithNavbarAndSidebarComponent', () => {
  let component: ExampleWithNavbarAndSidebarComponent;
  let fixture: ComponentFixture<ExampleWithNavbarAndSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExampleWithNavbarAndSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleWithNavbarAndSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
