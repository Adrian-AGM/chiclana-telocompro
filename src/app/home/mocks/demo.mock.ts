import { Programa } from "../../models/programas.model";

export const programaDemo: Programa = {
    id: 1,
    nombre: 'TLC 27/07/2026',
    fecha: '2026-07-27',
    productos: [
        { owner: 'PEP', baseColor: '#FF9966', accentColor: '#FFF500', product: 'Conga 7000 Clean XXL', copiadoActivo: false, loadingImage: false, image: 'https://media.cecotec.cloud/a90_eu01_100075/conga-7000-carpetspot-clean-steam-xxl-x-treme_yhkguz_1.png:md', price: 129.00 },
        { owner: 'PUI', baseColor: '#5AA7F7', accentColor: '#FF9966', product: 'KEMEI Clipper Blue', copiadoActivo: false, loadingImage: false, image: 'https://m.media-amazon.com/images/I/81hhMFEJMSL._AC_SL1500_.jpg', price: 54.99 },
        { owner: 'JAVIER', baseColor: '#FFF500', accentColor: '#5AA7F7', product: 'META Wayfarer (Gen 2)', copiadoActivo: false, loadingImage: false, image: 'https://images2.ray-ban.com//prod-onecp-record-files/pieyewear/f5679168-0b87-4a4b-ba74-b3a10041c328/0RW4012__601ST3__P21__shad__qt.png?impolicy=RB_Product_clone&width=720&bgc=%23f2f2f2', price: 449.00 },
    ],
    order: new Map([
        [0, 0],
        [1, 1],
        [2, 2]
    ])
};