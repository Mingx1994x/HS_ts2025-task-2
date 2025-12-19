import type { TPagination } from "../product";

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

export type TGetProductsAllResponse={
  success:  boolean;
    products: TProduct[];
    messages: unknown[];
}

export type TGetProductsResponse={
  success:  boolean;
    products: TProduct[];
    messages: unknown[];
    pagination:TPagination
}

export type TGetProductByIdResponse=Omit<TGetProductsResponse,"message">