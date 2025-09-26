export default interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}
