import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  private _pageCount: number = 0;

  get pageCount(): number {
    return this._pageCount;
  }

  @Input('pageCount') set pageCount(value: number) {
    this._pageCount = value;
    // this.currentPage = 0;
    this.updateVisiblePages();
  };
  @Output() selectedPage = new EventEmitter<number>();

  private clicks = new Subject<number>();
  private subscription = new Subscription();
  pageArr: Array<number> = [];
  currentPage: number = 0;
  currentPageFromRange: number = 0;
  pageRange: number = 10;

  constructor() { }

  ngOnInit(): void {

    this.subscription = this.clicks.pipe(debounceTime(500)).subscribe((e: number) => {
      this.selectedPage.emit(e);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectPage(pageNum: number) {    
    if (pageNum >= 0 && pageNum <= this.pageCount && pageNum !== this.currentPage) {
      this.currentPage = pageNum;
      this.updateVisiblePages();
      this.clicks.next(pageNum);
    }
  }

  updateVisiblePages(): void {
    const length = Math.min(this.pageCount, this.pageRange);
    const startIndex = Math.max(
      Math.min(
        this.currentPage - Math.ceil(length / 2),
        this.pageCount - length
      ),
      0
    );
    
    this.pageArr = Array(length).fill(0).map((el, i) => i + startIndex);
    this.currentPageFromRange = this.currentPage - startIndex;
  }

}
