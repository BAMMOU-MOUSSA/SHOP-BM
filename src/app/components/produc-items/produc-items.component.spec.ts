import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducItemsComponent } from './produc-items.component';

describe('ProducItemsComponent', () => {
  let component: ProducItemsComponent;
  let fixture: ComponentFixture<ProducItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
