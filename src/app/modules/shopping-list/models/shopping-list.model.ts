import { ShoppingListItem } from '@app/modules/shopping-list/models/shopping-list-item.model';

export class ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
}
