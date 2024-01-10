import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  issueId: number;
  disabled: boolean;
}

const EditIssueButton = ({ issueId, disabled }: Props) => {
  return (
    <Button asChild={!disabled} disabled={disabled}>
      {
        disabled
          ? <><Pencil2Icon /> Edit Issue</>
          : <Link href={`/issues/${issueId}/edit`}><Pencil2Icon /> Edit Issue</Link>
      }
    </Button>
  );
};
export default EditIssueButton;