'use client';
import { statusMap } from '@/app/lib/constants';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const StatusSelector = ({ issue: { status, id } }: { issue: Issue; }) => {
  const router = useRouter();

  const updateStatus = async (newStatus: Status) => {
    try {
      await axios.patch('/api/issues/' + id, { status: newStatus });
      router.refresh();
    } catch (error) {
      toast.error('Status could not be saved.');
    }
  };

  return (
    <>
      <Select.Root defaultValue={status} onValueChange={updateStatus}>
        <Select.Trigger />
        <Select.Content position="popper">
          {Object.values(statusMap).map(status => (
            <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
export default StatusSelector;