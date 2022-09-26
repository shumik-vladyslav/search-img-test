import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-multi-tag-search',
  templateUrl: './multi-tag-search.component.html',
  styleUrls: ['./multi-tag-search.component.scss']
})
export class MultiTagSearchComponent implements OnInit {
  searchItemList: Array<string> = [];

  @Output() callChipsList = new EventEmitter<any>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  private elementsCount = new Subject<number>();
  private subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.elementsCount.pipe(debounceTime(500)).subscribe((e: number) => {
      this.callChipsList.emit(this.searchItemList);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  inputChange(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.addItemToList();
      this.callQueryList();
    }
    if (event.key === "Backspace" && !this.searchInput.nativeElement.value) {
      if (this.searchItemList.length) {
        this.removeChip(this.searchItemList.length - 1)
      }
    }
  }

  addItemToList() {
    if (this.searchInput.nativeElement.value) {
      this.searchItemList.push(this.searchInput.nativeElement.value);
      this.searchInput.nativeElement.value = '';
    }
  }

  removeChip(i: number) {
    this.searchItemList.splice(i, 1);
    this.elementsCount.next(this.searchItemList.length);
  }

  callQueryList() {
    if (this.searchInput.nativeElement.value) {
      this.addItemToList();
    }

    this.elementsCount.next(this.searchItemList.length);
  }
}
