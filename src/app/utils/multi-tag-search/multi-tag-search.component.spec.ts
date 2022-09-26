import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTagSearchComponent } from './multi-tag-search.component';

describe('MultiTagSearchComponent', () => {
  let component: MultiTagSearchComponent;
  let fixture: ComponentFixture<MultiTagSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiTagSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiTagSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item to list', () => {
    component.searchInput.nativeElement.value = 'tree';
    component.addItemToList();

    expect(component.searchItemList.length).toEqual(1);
    expect(component.searchInput.nativeElement.value).toEqual('');
  });

  it('should remove item form list', () => {
    component.searchItemList = ['tree', 'big', 'fall'];
    component.removeChip(1);

    expect(component.searchItemList.length).toEqual(2);
    expect(component.searchItemList).toEqual(['tree', 'fall']);
  });

  it('should add item to list and call api', () => {
    component.searchInput.nativeElement.value = 'tree';
    component.callQueryList();

    expect(component.searchItemList.length).toBeGreaterThan(0);
  });

  it('should add item to input', () => {
    const event = new KeyboardEvent("keydown",{
      "key": "Enter",
    });

    component.searchInput.nativeElement.value = 'tree';
    component.inputChange(event);

    expect(component.searchItemList.length).toBeGreaterThan(0);
  });

  it('should remove item from input', () => {
    const event = new KeyboardEvent("keydown",{
      "key": "Backspace",
    });

    component.searchInput.nativeElement.value = null;
    component.searchItemList = ['1', '2', '3'];
    component.inputChange(event);

    expect(component.searchItemList.length).toEqual(2);
  });


});
