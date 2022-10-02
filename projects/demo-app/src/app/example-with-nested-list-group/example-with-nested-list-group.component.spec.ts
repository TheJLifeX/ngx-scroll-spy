import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleWithNestedListGroupComponent } from './example-with-nested-list-group.component';

describe('ExampleWithNestedListGroupComponent', () => {
  let component: ExampleWithNestedListGroupComponent;
  let fixture: ComponentFixture<ExampleWithNestedListGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExampleWithNestedListGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleWithNestedListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
