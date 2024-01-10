import { z } from 'zod';

const issueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1).max(65535),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']),
  createdByUserId: z.string().min(1, 'Must provide the user ID').max(255),
});

export type TIssueForm = z.infer<typeof issueSchema>;

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255).optional(),
  description: z.string().min(1, 'Description is required.').max(65535).optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
  assignedToUserId: z.string().min(1, 'AssignedToUserId is required.').max(255).optional().nullable()
});

export type TPatchIssueSchema = z.infer<typeof patchIssueSchema>;

export default issueSchema;