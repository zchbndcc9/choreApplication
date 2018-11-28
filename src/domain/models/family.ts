import { Child } from './child';
import { Member } from './member';

export class Family {
  id: number;
  email: string;
  address: string;
  phone: number;
  registrationDate: Date;
  parents: Member[];
  children: Child[];
}
