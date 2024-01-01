import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';
import prisma from '@/prisma/client';

interface Props {
  params: { id: string; };
}

const EditIssuePage = async ({ params }: Props) => {
  const parsedId = parseInt(params.id);

  if (isNaN(parsedId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parsedId }
  });

  if (!issue) notFound();

  return (
    <IssueForm issue={issue} />
  );
};
export default EditIssuePage;