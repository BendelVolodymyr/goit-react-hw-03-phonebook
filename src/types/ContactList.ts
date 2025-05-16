import { Contact } from './App';

export interface ContactListProps {
  createList: Contact[];
  onDelete: (id: string) => void;
}
