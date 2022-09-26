import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.pageCount = 100;
    component.pageRange = 10;
    component.currentPage = 14;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check number of page in pagination', () => {
    component.updateVisiblePages()
    expect(component.currentPageFromRange).toEqual(5);
  });

  it('should check number of page in pagination', () => {
    component.selectPage(0);
    component.updateVisiblePages()
    expect(component.currentPage).toEqual(0);
  });
  it('should check number of page in pagination', () => {
    component.selectPage(0);
    component.updateVisiblePages()
    expect(component.currentPage).toEqual(0);
  });

  it('should check the bigger number of page in pagination', () => {
    component.selectPage(110);
    component.updateVisiblePages()
    expect(component.currentPage).toBeLessThan(100);
  });
});
