import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { GifListComponent } from './gif-list.component';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IGiphyResponse } from "../../models/gif-response";
import { of } from 'rxjs';
import { MockTrendData } from "../../../assets/mockTrendData.json";
import { MockSearchData } from "../../../assets/mockSearchData.json";

describe('GifListComponent', () => {
  let component: GifListComponent;
  let fixture: ComponentFixture<GifListComponent>;
  let service: UtilityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ 
        GifListComponent
      ],
      providers: [UtilityService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifListComponent);
    service = TestBed.inject(UtilityService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get count of pages', () => {
    component.getPageCount(90);
    expect(component.pageCount).toEqual(10);
  });

  it('should get trend gifs', fakeAsync(() => {
    spyOn(service, 'getGiphyList').and.returnValue(of(MockTrendData));
    component.getGifTrends(0);
    
    expect(component.gifList.length).toEqual(service.gifCountOnPage);
  }));

  it('should get gifs by search', () => {
    spyOn(service, 'searchGiphy').and.returnValue(of(MockSearchData));
    component.searchGifs(['tree'], 0);
    
    expect(component.gifList.length).toEqual(service.gifCountOnPage);
  });

  it('should get trend gifs if search array is empty', () => {
    spyOn(service, 'getGiphyList').and.returnValue(of(MockTrendData));
    component.searchGifs([], 0);
    
    expect(component.gifList.length).toEqual(service.gifCountOnPage);
  });
});
