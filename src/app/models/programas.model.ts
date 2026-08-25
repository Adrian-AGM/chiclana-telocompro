
export interface Producto {
    owner: string,
    baseColor: string,
    accentColor: string,
    product: string | null,
    loadingImage: boolean,
    image: string | null,
    copiadoActivo: boolean,
    price: number | null
}

export interface Programa {
    id: number,
    nombre: string,
    fecha: string,
    productos: Producto[],
    order: Map<number, number>
}