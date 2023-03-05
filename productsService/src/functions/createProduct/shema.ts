export const shema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        price: { type: 'integer' },
        description: { type: 'string' },
        count: { type: 'integer' }
    },
    required: ['title', 'price', 'description']
} as const;

export type ProductShema = typeof shema;
