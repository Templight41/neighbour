'use client';

import HeaderBar from '@/components/header';
import ItemContainer from '@/components/item-container';
import ManufacturerContainer from '@/components/manufacturer-card';
import RaiseBidButton from '@/components/raise-bid-button';
import { useState, useEffect, use } from 'react';

type AuctionItem = {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
  description?: string;
  currentBid?: number;
  timeForEnd?: string;
  manufacturer?: string;
  manufacturerDetails?: {
    location: string;
    established: number;
    description: string;
  };
  manufacturerUrl?: string;
};

type AuctionDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default function AuctionDetailPage({ params }: AuctionDetailPageProps) {
  const { id } = use(params);

  const [item, setItem] = useState<AuctionItem | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/auction/${id}`, {
        cache: 'no-store',
      });
      const item = await res.json();
      console.log(item);
      setItem(item);
    };
    fetchItem();
  }, []);

  return (
    item && (
      <div
        style={{
          overflowY: 'auto',
          height: 'calc(100svh - 64px)',
          top: '64px',
        }}
      >
        {/* <HeaderBar title="The Hello Neighbour Auction" /> */}
        <ItemContainer
          name={item?.name}
          manufacturer={item?.manufacturer}
          imageUrl={item?.imageUrl}
          price={item?.price}
          currentBid={item?.currentBid}
          timeForEnd={item?.timeForEnd}
          description={item?.description}
          auctionId={id}
        />

        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.25rem',
          }}
        >
          <div
            style={{
              height: '2px',
              background:
                'linear-gradient(90deg, transparent 0%, #EAEAEA 20%, #EAEAEA 80%, transparent 100%)',
              margin: '3rem 0',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '2px',
                backgroundColor: '#C09B55',
              }}
            />
          </div>
        </div>

        <ManufacturerContainer
          manufacturerDetails={item?.manufacturerDetails}
          manufacturerUrl={item?.manufacturerUrl}
          manufacturer={item?.manufacturer}
        />

        {/* <RaiseBidButton currentBid={item?.currentBid?.toString() || '0'} /> */}
      </div>
    )
  );
}
