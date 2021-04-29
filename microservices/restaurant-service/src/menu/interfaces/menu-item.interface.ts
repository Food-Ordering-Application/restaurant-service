export interface IMenuItem {
  id: string;
  menuId?: string;
  menuGroupId?: string;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  index?: number;
  isActive?: boolean;
}
