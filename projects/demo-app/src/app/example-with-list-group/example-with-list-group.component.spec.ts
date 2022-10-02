import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleWithListGroupComponent } from './example-with-list-group.component';

describe('ExampleWithListGroupComponent', () => {
  let component: ExampleWithListGroupComponent;
  let fixture: ComponentFixture<ExampleWithListGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExampleWithListGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleWithListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
