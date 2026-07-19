import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudnetCreate } from './studnet-create';

describe('StudnetCreate', () => {
  let component: StudnetCreate;
  let fixture: ComponentFixture<StudnetCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudnetCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(StudnetCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
