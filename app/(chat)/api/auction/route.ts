import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "1", name: "Antique Vase", price: "₹120" ,"imageUrl":"https://m.media-amazon.com/images/I/610CnMEepWL.jpg",manufacturer :"Indie studio"},
    { id: "2", name: "Rare Coin", price: "₹90" ,"imageUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRraioFPrd6TdDj8l8eWT8NeyINr1s_RCoGfA&s",manufacturer :"Indie studio"},
    { id: "3", name: "Old Painting", price: "₹200" ,"imageUrl":"https://harpersbazaaruk.cdnds.net/17/04/4000x2000/gallery-1485277925-slide-3cover.jpg",manufacturer :"Indie studio"},
    { id: "4", name: "Sweater", price: "₹300" ,"imageUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMwrAVaHYjY-uKmMjBLFgO8nP4gD_7DEWGYA&s",manufacturer :"Indie studio"},

  ]);
}
