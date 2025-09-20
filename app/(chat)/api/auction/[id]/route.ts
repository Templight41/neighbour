import { NextResponse } from 'next/server';

const data = {
  1: {
    name: 'Antique Vase',
    price: '₹120',
    description: 'Beautiful antique vase with intricate patterns',
    manufacturer: 'Indie studio',
    imageUrl: 'https://m.media-amazon.com/images/I/610CnMEepWL.jpg',
    manufacturerUrl: 'https://assets.astaguru.com/walter_langhammer.jpg',
    manufacturerDetails: {
      location: 'India',
      established: 2010,
      description:
        'Indie studio is a small studio that makes small things for small people.',
    },
    timeForEnd: '2025-09-25T18:00:00Z',
    currentBid: 135,
    isSold: false,
    sellAmount: null,
  },
  2: {
    name: 'Rare Coin',
    price: '₹90',
    description: 'Rare historical coin in excellent condition',
    manufacturer: 'Indie studio',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRraioFPrd6TdDj8l8eWT8NeyINr1s_RCoGfA&s',
    manufacturerUrl: 'https://assets.astaguru.com/walter_langhammer.jpg',
    manufacturerDetails: {
      location: 'India',
      established: 2010,
      description:
        'Indie studio is a small studio that makes small things for small people.',
    },
    timeForEnd: '2025-09-30T20:30:00Z',
    currentBid: 105,
    isSold: false,
    sellAmount: null,
  },
  3: {
    name: 'Old Painting',
    price: '₹200',
    description: 'Vintage painting with artistic value',
    manufacturer: 'Indie studio',
    imageUrl:
      'https://harpersbazaaruk.cdnds.net/17/04/4000x2000/gallery-1485277925-slide-3cover.jpg',
    manufacturerUrl: 'https://assets.astaguru.com/walter_langhammer.jpg',
    manufacturerDetails: {
      location: 'India',
      established: 2010,
      description:
        'Indie studio is a small studio that makes small things for small people.',
    },
    timeForEnd: '2025-10-05T15:45:00Z',
    currentBid: 220,
    isSold: false,
    sellAmount: null,
  },
  4: {
    name: 'Sweater',
    price: '₹300',
    description: 'Comfortable and stylish sweater',
    manufacturer: 'Indie studio',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMwrAVaHYjY-uKmMjBLFgO8nP4gD_7DEWGYA&s',
    manufacturerUrl: 'https://assets.astaguru.com/walter_langhammer.jpg',
    manufacturerDetails: {
      location: 'India',
      established: 2010,
      description:
        'Indie studio is a small studio that makes small things for small people.',
    },
    timeForEnd: '2025-10-10T12:00:00Z',
    currentBid: 320,
    isSold: false,
    sellAmount: null,
  },
};

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const item = data[Number.parseInt(id) as keyof typeof data];

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ id, ...item });
}
