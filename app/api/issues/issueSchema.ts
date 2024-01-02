import { z } from 'zod';

const issueSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }).max(255),
  description: z.string().min(1),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']),
});

export type TIssueForm = z.infer<typeof issueSchema>;

export default issueSchema;