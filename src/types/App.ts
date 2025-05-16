export type Contact = {
  id: string;
  name: string;
  number: string;
};

export type newContact = Omit<Contact, 'id'>;

export interface AppState {
  contacts: Contact[];
  filter: string;
}

export type InputData = {
  name: string;
  number: string;
};
