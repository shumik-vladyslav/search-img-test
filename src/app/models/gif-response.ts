export interface IGiphyResponse {
    data: Array<IGiphyItem>,
    pagination: IPagination,
    meta: IMetaResponse
}

export interface IGiphyItem {
    id: string,
    url: string,
    title: string,
    rating: string,
    images: IGiphyImage
}

interface IPagination {
    total_count: number,
    count: number,
    offset: number
}

interface IMetaResponse {
    status: number,
    msg: string,
    response_id: string
}

interface IGiphyImage {
    downsized: IGiphyImageOptions,
    original: IGiphyImageOptions
}

interface IGiphyImageOptions {
    url: string,
    height: string,
    width: string,
    size: string,
}