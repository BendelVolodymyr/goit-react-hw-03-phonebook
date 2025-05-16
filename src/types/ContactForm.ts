export interface ContactFormState {
  id: string;
  name: string;
  number: string;
}

export interface ContactFormProps {
  onSubmit: (e: ContactFormState) => void;
}
