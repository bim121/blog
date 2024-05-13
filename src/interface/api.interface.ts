interface DataNews {
    name: string;
};

interface DataResponse{
    id: number;
    attributes: NewsItem;
}

interface DataResponseImage{
    data: DataImage;
}

interface DataImage{
    attributes: ImageAttributes;
}

interface ImageAttributes{
    url: string;
}
