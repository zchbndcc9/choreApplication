import { Infraction } from './infraction';
import { Member } from './member';
import { Task } from './task';

export class Child extends Member {
  rating: number;
  isGrounded: boolean;
  infractions: Infraction[];
  tasks: Task[];
}
