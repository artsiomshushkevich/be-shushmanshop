export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
};

export type ProductWithCount = Product & { count: number };

export type ProductWithCountWithoutId = Omit<ProductWithCount, 'id'>;
