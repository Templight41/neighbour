'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuctionCard from '@/components/auction-card';
// import HeaderBar from '@/components/header';

type AuctionItem = {
  id: string;
  name: string;
  price: string;
  imageUrl?: string | string[];
  description?: string;
  manufacturer?: string;
};

export default function AuctionListPage() {
  const [items, setItems] = useState<AuctionItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/auction');
      const data = await res.json();
      console.log(data.data);
      setItems(data.data);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        background: '#FAF7F0',
        height: 'calc(100svh - 64px)',
        top: '64px',
      }}
    >
      {/* <HeaderBar title="The Hello Neighbour Auction" /> */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
          padding: '48px 64px',
          maxWidth: '1400px',
          boxSizing: 'border-box',
          margin: '0 auto',
          justifyContent: 'center',
          // height: 'calc(100svh - 64px)',
          // top: '64px',
        }}
      >
        {items.length > 0 ? (
          items?.map((item) => (
            <Link
              key={item.id}
              href={`/auction/${item.id}`}
              style={{ textDecoration: 'none', justifySelf: 'center' }}
            >
              <AuctionCard
                imageUrl={item.imageUrl}
                price={item.price}
                name={item.name}
                description={item.description}
                manufacturer={item.manufacturer}
              />
            </Link>
          ))
        ) : (
          <h1>No auction items found</h1>
        )}
      </div>
    </div>
  );
}
