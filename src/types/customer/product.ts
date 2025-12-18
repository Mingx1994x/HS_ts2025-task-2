export type TProduct = {
    id:           string;
    category:     string;
    content:      string;
    description:  string;
    imageUrl:     string;
    imagesUrl:    string[];
    is_enabled:   number;
    num:          number;
    origin_price: number;
    price:        number;
    title:        string;
    unit:         string;
}

export type TGetProductsResponse={
  success:  boolean;
    products: TProduct[];
    messages: unknown[];
}

export type TGetProductByIdResponse=Omit<TGetProductsResponse,"message">