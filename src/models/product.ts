export interface IProduct {
  id: number;
  code: string;
  name: string;
  category_id?: number;
  on_hand?: number;
  unit_price?: number;
  photo?: string;
}
