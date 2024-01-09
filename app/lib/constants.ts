import { Status } from '@prisma/client';

export const statusMap: Record<Status, { label: string, value: 'OPEN' | 'IN_PROGRESS' | 'CLOSED'; }> = {
  OPEN: { label: 'Open', value: 'OPEN' },
  IN_PROGRESS: { label: 'In Progress', value: 'IN_PROGRESS' },
  CLOSED: { label: 'Closed', value: 'CLOSED' }
};