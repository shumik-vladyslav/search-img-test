import {
    HttpClientTestingModule,
    HttpTestingController
} from "@angular/common/http/testing";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { UtilityService } from "./utility.service";
import { environment } from "../../environments/environment";
import { IGiphyItem, IGiphyResponse } from "../models/gif-response";
import { MockTrendData } from "../../assets/mockTrendData.json";
import { MockSearchData } from "../../assets/mockSearchData.json";

describe("Service: Search", () => {
    let service: UtilityService;
    let httpTestingController: HttpTestingController;
    let searchUrl = environment.urlSearch + environment.apiKey;
    let trendUrl = environment.urlTrending + environment.apiKey;

    const mockTrendResp: IGiphyResponse = MockTrendData;
    const mockSearchResp: IGiphyResponse = MockSearchData;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UtilityService]
        });
        service = TestBed.inject(UtilityService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should make a get request and get trend gifs", () => {
        let giphyList: IGiphyItem[] = [];
        let status: number = 0;

        service.getGiphyList(0).subscribe((res: IGiphyResponse) => {
            status = res.meta.status;
            giphyList = res.data;
        });
        
        const req = httpTestingController.expectOne(`${trendUrl}&limit=${service.gifCountOnPage}&rating=g&offset=0`);
        req.flush(mockTrendResp);
        
        expect(req.request.method).toEqual('GET');
        expect(status).toEqual(200);
        expect(giphyList.length).toBeGreaterThan(0);
        expect(giphyList.length).toBeLessThanOrEqual(service.gifCountOnPage);
    });

    it("should make a get request and get a gifs by parameters", () => {
        let giphyList: IGiphyItem[] = [];
        let status: number = 0;
        let query: string[] = ['tree'];

        service.searchGiphy(query, 0).subscribe((res: IGiphyResponse) => {
            status = res.meta.status;
            giphyList = res.data;
        });

        const req = httpTestingController.expectOne(`${searchUrl}&q=${query}&limit=${service.gifCountOnPage}&offset=0&rating=g&lang=en`);
        req.flush(mockSearchResp);
        
        expect(req.request.method).toEqual('GET');
        expect(status).toEqual(200);
        expect(giphyList.length).toBeGreaterThan(0);
        expect(giphyList.length).toBeLessThanOrEqual(service.gifCountOnPage);
    });

    it("should make a get request and get a gifs by multi parameter", () => {
        let giphyList: IGiphyItem[] = [];
        let status: number = 0;
        let query: string[] = ['tree', 'wow'];

        service.searchGiphy(query, 0).subscribe((res: IGiphyResponse) => {
            status = res.meta.status;
            giphyList = res.data;
        });

        let lineQuery = query.join('%2C');

        const req = httpTestingController.expectOne(`${searchUrl}&q=${lineQuery}&limit=${service.gifCountOnPage}&offset=0&rating=g&lang=en`);
        req.flush(mockSearchResp);
        
        expect(req.request.method).toEqual('GET');
        expect(status).toEqual(200);
        expect(giphyList.length).toBeGreaterThan(0);
        expect(giphyList.length).toBeLessThanOrEqual(service.gifCountOnPage);
    });
});