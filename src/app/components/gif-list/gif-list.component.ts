import { Component, OnInit } from '@angular/core';
import { IGiphyResponse } from 'src/app/models/gif-response';
import { UtilityService } from 'src/app/services/utility.service';

export  enum SearchState {
  Trends = 'trends',
  Search = 'search'
}

@Component({
  selector: 'app-gif-list',
  templateUrl: './gif-list.component.html',
  styleUrls: ['./gif-list.component.scss']
})

export class GifListComponent implements OnInit {
  public gifList: Array<any> = [];
  public pageCount: number = 0;
  private searchList: Array<string> = [];
  private searchState: SearchState = SearchState.Trends;

  constructor(public utilServ: UtilityService) {
    this.getGifTrends(0);
  }

  ngOnInit(): void {
  }

  getGifTrends(pageNum: number = 0) {
    this.utilServ.getGiphyList(pageNum).subscribe((result: IGiphyResponse) => {
      if(result) {
        this.searchState = SearchState.Trends;
        this.gifList = result.data;
        this.getPageCount(result.pagination.total_count)
      }
    });
  }

  searchGifs(searchList: Array<string>, pageNum: number = 0) {
    this.searchList = searchList;
    if (searchList?.length) {
      this.utilServ.searchGiphy(searchList, pageNum).subscribe((result: IGiphyResponse) => {
        if (result) {
          this.searchState = SearchState.Search;
          this.gifList = result.data;
          this.getPageCount(result.pagination.total_count)
        }
      });
    } else {
      this.getGifTrends();
    }
  }

  getPageCount(count: number = 1) {
    this.pageCount = Math.ceil(count / this.utilServ.gifCountOnPage);
  }

  getNewList(pageNum: number) {
    if (this.searchState === SearchState.Trends) {
      this.getGifTrends(pageNum);
    } else {
      this.searchGifs(this.searchList, pageNum)
    }
  }
}
