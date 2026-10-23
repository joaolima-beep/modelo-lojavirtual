import type { CategoryId, Product, ColorOption } from './types';

/**
 * Configuracao central da loja PM HOUSE.
 * Para publicar, ajuste o numero de WhatsApp do vendedor abaixo.
 */
export const STORE_CONFIG = {
  name: 'PM HOUSE',
  // Numero do vendedor no formato internacional, somente digitos.
  // Este e o numero de demonstracao configurado pelo cliente.
  whatsapp: '5551991364288',
  instagram: 'https://www.instagram.com/_pmhouse?utm_source=ig_web_button_share_sheet&dlrf=ZDNlZDc0MzIxNw==', // substituir pelo perfil real antes de publicar
  email: 'contato@pmhouse.com.br',
  shippingInfo:
    'Entregamos para todo o Brasil. O prazo e o valor do frete sao calculados pelo vendedor no momento da confirmacao do pedido.',
};

export const CATEGORIES: { id: CategoryId; name: string; slug: string; image: string; description: string }[] = [
  {
    id: 'camisetas',
    name: 'Camisetas',
    slug: 'camisetas',
    image: 'https://images.pexels.com/photos/9285919/pexels-photo-9285919.png?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'T-shirts oversized, boxy e heavyweight com caimento perfeito.',
  },
  {
    id: 'calcas',
    name: 'Calcas',
    slug: 'calcas',
    image: 'https://images.pexels.com/photos/11716436/pexels-photo-11716436.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Cargos, denims e modelagens utilitarias para o dia a dia urbano.',
  },
  {
    id: 'acessorios',
    name: 'Acessorios',
    slug: 'acessorios',
    image: 'https://images.pexels.com/photos/38622783/pexels-photo-38622783.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Caps, meias e detalhes que completam o look.',
  },
  {
    id: 'kits',
    name: 'Kits',
    slug: 'kits',
    image: '/capa_inicial.png',
    description: 'Combinacoes para completar seu look.',
  },
];

const black: ColorOption = { name: 'Preto', hex: '#1A1A1A' };
const white: ColorOption = { name: 'Branco', hex: '#F5F5F5' };
const grey: ColorOption = { name: 'Cinza', hex: '#7A7A7A' };
const navy: ColorOption = { name: 'Azul Marinho', hex: '#1E2A44' };
const olive: ColorOption = { name: 'Verde Oliva', hex: '#5A5A3A' };
const sand: ColorOption = { name: 'Areia', hex: '#D4C5A8' };

const SIZES_CLOTHES = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];
const SIZES_PANTS = ['36', '38', '40', '42', '44', '46'];
const SIZES_OS = ['Unico'];

export const PRODUCTS: Product[] = [
  {
    id: 'kit-1',
    name: 'Kit PM House',
    slug: 'kit-pm-house',
    category: 'kits',
    price: 199,
    description: 'Kit inspirado no look da foto. Consulte as pecas, tamanhos e disponibilidade pelo WhatsApp.',
    details: ['Foto de referencia do modelo', 'Composicao e disponibilidade do kit sob consulta'],
    images: ['/capa_inicial.png'],
    sizes: ['A consultar'],
    colors: [{ name: 'Conforme o modelo', hex: '#1E2A44' }],
  },
  {
    id: '1',
    name: 'PM Essential Oversized Tee',
    slug: 'pm-essential-oversized-tee',
    category: 'camisetas',
    price: 129.9,
    promoPrice: 89.9,
    description:
      'T-shirt oversized em algodao felpado 240g. Caimento solto com ombro descido e barra reta. Uma peca basica e marcante para qualquer look urbano.',
    details: [
      'Algodao felpado 240g/m2',
      'Caimento oversized',
      'Ombro descido',
      'Etiqueta tecida PM HOUSE',
    ],
    images: [
      'https://images.pexels.com/photos/9285919/pexels-photo-9285919.png?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/12859416/pexels-photo-12859416.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/14230590/pexels-photo-14230590.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_CLOTHES,
    colors: [black, white, grey, navy],
    popular: true,
    isNew: true,
    badge: 'Promo',
  },
  {
    id: '2',
    name: 'Urban Boxy T-Shirt',
    slug: 'urban-boxy-t-shirt',
    category: 'camisetas',
    price: 119.9,
    description:
      'T-shirt boxy fit com manga curta e corpo mais largo e reto. Tecido estruturado que mantem a forma lavagem apos lavagem.',
    details: [
      'Algodao penteado 220g/m2',
      'Caimento boxy fit',
      'Gola canelada reforcada',
      'Costuras duplas',
    ],
    images: [
      'https://images.pexels.com/photos/15258905/pexels-photo-15258905.png?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/15258903/pexels-photo-15258903.png?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/33222517/pexels-photo-33222517.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_CLOTHES,
    colors: [black, white, olive],
    popular: true,
  },
  {
    id: '3',
    name: 'PM Heavyweight Tee',
    slug: 'pm-heavyweight-tee',
    category: 'camisetas',
    price: 149.9,
    description:
      'T-shirt heavyweight em algodao 320g, com toque premium e estrutura robusta. Pensado para quem preza por material encorpado e duravel.',
    details: [
      'Algodao felpado 320g/m2',
      'Caimento regular',
      'Toque premium',
      'Pre-shrunk',
    ],
    images: [
      'https://images.pexels.com/photos/14230590/pexels-photo-14230590.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/9285919/pexels-photo-9285919.png?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/12859416/pexels-photo-12859416.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_CLOTHES,
    colors: [black, grey, navy, sand],
    isNew: true,
  },
  {
    id: '4',
    name: 'Cargo Utility Pants',
    slug: 'cargo-utility-pants',
    category: 'calcas',
    price: 219.9,
    promoPrice: 169.9,
    description:
      'Calca cargo utilitaria com multiplos bolsos, fit relaxado e tecido ripstop leve. Funcionalidade e estilo para o cotidiano urbano.',
    details: [
      'Ripstop 100% algodao',
      '6 bolsos funcionais',
      'Fit relaxed taper',
      'Regulagem na barra',
    ],
    images: [
      'https://images.pexels.com/photos/11716436/pexels-photo-11716436.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/35043249/pexels-photo-35043249.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/5365647/pexels-photo-5365647.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_PANTS,
    colors: [black, olive, sand],
    popular: true,
    badge: 'Promo',
  },
  {
    id: '5',
    name: 'Street Denim Jeans',
    slug: 'street-denim-jeans',
    category: 'calcas',
    price: 199.9,
    description:
      'Jeans em denim rigito com lavagem escura e fit slim. Resiste ao uso intenso e mantem a cor lavagem apos lavagem.',
    details: [
      'Denim rigito 12oz',
      'Lavagem escura',
      'Fit slim straight',
      'Botoes metalicos',
    ],
    images: [
      'https://images.pexels.com/photos/10133274/pexels-photo-10133274.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/10133278/pexels-photo-10133278.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/1082526/pexels-photo-1082526.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_PANTS,
    colors: [navy, black],
    isNew: true,
  },
  {
    id: '6',
    name: 'Urban Hoodie',
    slug: 'urban-hoodie',
    category: 'camisetas',
    price: 259.9,
    description:
      'Hoodie estruturado em moletom fleece 380g com capuz forrado. Conforto e presenca para os dias frios sem perder a estetica urbana.',
    details: [
      'Moletom fleece 380g/m2',
      'Capuz forrado e ajustavel',
      'Bolso canguru',
      'Punhos e barra canelados',
    ],
    images: [
      'https://images.pexels.com/photos/28701960/pexels-photo-28701960.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/15127546/pexels-photo-15127546.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/34582210/pexels-photo-34582210.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_CLOTHES,
    colors: [black, grey, navy],
    popular: true,
  },
  {
    id: '7',
    name: 'PM Classic Cap',
    slug: 'pm-classic-cap',
    category: 'acessorios',
    price: 89.9,
    description:
      'Bone aba reta com estrutura six-panel, ajuste plastico e bordado PM HOUSE na frontal. Acabamento limpo para fechar o look.',
    details: [
      'Algodao twill',
      'Estrutura six-panel',
      'Fivela plastica ajustavel',
      'Bordado frontal',
    ],
    images: [
      'https://images.pexels.com/photos/38622783/pexels-photo-38622783.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/6403145/pexels-photo-6403145.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/17389818/pexels-photo-17389818.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_OS,
    colors: [black, white, navy, sand],
    popular: true,
    isNew: true,
  },
  {
    id: '8',
    name: 'Essential Crew Socks',
    slug: 'essential-crew-socks',
    category: 'acessorios',
    price: 49.9,
    description:
      'Meia cano medio em algodao com reforco no calcanhar e na ponta. Conforto e durabilidade para o uso diario.',
    details: [
      'Algodao com elastano',
      'Cano medio',
      'Refco no calcanhar e ponta',
      'Disponivel em pares',
    ],
    images: [
      'https://images.pexels.com/photos/11212879/pexels-photo-11212879.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/11919823/pexels-photo-11919823.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/7760802/pexels-photo-7760802.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_OS,
    colors: [black, white, grey],
    isNew: true,
  },
  {
    id: '9',
    name: 'PM Boxy Knit Tee',
    slug: 'pm-boxy-knit-tee',
    category: 'camisetas',
    price: 139.9,
    description:
      'T-shirt em malha piquet com textura e caimento boxy. Uma alternativa estruturada para quem quer variedade alem do basico liso.',
    details: [
      'Malha piquet 200g/m2',
      'Caimento boxy fit',
      'Textura em piquet',
      'Gola canelada',
    ],
    images: [
      'https://images.pexels.com/photos/33222517/pexels-photo-33222517.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/9285919/pexels-photo-9285919.png?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/14230590/pexels-photo-14230590.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_CLOTHES,
    colors: [white, black, sand, olive],
    popular: true,
  },
  {
    id: '10',
    name: 'Wide Leg Cargo Pants',
    slug: 'wide-leg-cargo-pants',
    category: 'calcas',
    price: 229.9,
    description:
      'Calca cargo de perna larga, inspirada em modelagens militares. Tecido resistente e bolsos laterais volumosos.',
    details: [
      'Sarja 100% algodao',
      'Fit wide leg',
      'Bolsos laterais volumosos',
      'Cintura ajustavel',
    ],
    images: [
      'https://images.pexels.com/photos/35043249/pexels-photo-35043249.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/11716436/pexels-photo-11716436.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/5365647/pexels-photo-5365647.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_PANTS,
    colors: [olive, black, sand],
    isNew: true,
    badge: 'Novo',
  },
  {
    id: '11',
    name: 'PM Dad Cap',
    slug: 'pm-dad-cap',
    category: 'acessorios',
    price: 79.9,
    description:
      'Dad cap em algodao lavado com aba curvada e fivela metalica. Toque casual e despojado, sem perder o acabamento.',
    details: [
      'Algodao lavado',
      'Aba curvada',
      'Fivela metalica',
      'Painel tras costurado',
    ],
    images: [
      'https://images.pexels.com/photos/6403145/pexels-photo-6403145.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/16628549/pexels-photo-16628549.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/29925645/pexels-photo-29925645.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_OS,
    colors: [black, sand, navy],
    popular: true,
  },
  {
    id: '12',
    name: 'PM Fleece Hoodie Zip',
    slug: 'pm-fleece-hoodie-zip',
    category: 'camisetas',
    price: 289.9,
    description:
      'Hoodie zip-up em moletom fleece 400g. Versatil para meias-estacoes, com capuz ajustavel e bolso canguru dividido.',
    details: [
      'Moletom fleece 400g/m2',
      'Ziper YKK metalico',
      'Capuz forrado',
      'Bolso canguru dividido',
    ],
    images: [
      'https://images.pexels.com/photos/15127546/pexels-photo-15127546.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/19461581/pexels-photo-19461581.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/5692478/pexels-photo-5692478.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    sizes: SIZES_CLOTHES,
    colors: [black, grey, navy],
    isNew: true,
  },
];

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}

export function getEffectivePrice(product: Product): number {
  return product.promoPrice ?? product.price;
}
