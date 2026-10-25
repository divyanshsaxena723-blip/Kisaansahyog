export interface CropListing {
  id: string;
  cropName: string;
  cropNameHi: string;
  variety: string;
  quantityQuintals: number;
  ratePerQuintal: number;
  farmerName: string;
  farmerPhone: string;
  district: string;
  state: string;
  harvestDate: string;
  verified: boolean;
  organic: boolean;
  createdAt: string;
}

export interface BargainOffer {
  id: string;
  listingId: string;
  cropName: string;
  farmerName: string;
  farmerPhone: string;
  buyerName: string;
  buyerPhone: string;
  originalRate: number;
  offeredRate: number;
  quantityQuintals: number;
  status: "pending" | "accepted" | "rejected" | "countered";
  createdAt: string;
}
