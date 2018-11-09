export class Task {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  notified: boolean;
  assignedBy: string;
  rating?: number;
  award: string;
  status: string;
}
