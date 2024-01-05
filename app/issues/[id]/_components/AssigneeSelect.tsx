'use client';

import { Skeleton } from '@/app/components';
import { minutesToMilliseconds } from '@/app/lib/helpers';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue; }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id,
        { assignedToUserId: userId !== 'null' ? userId : null })
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'null'}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign issue..." className="hover:cursor-pointer" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null" className="hover:cursor-pointer">Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id} className="hover:cursor-pointer">{user.name}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => useQuery<User[]>({
  queryKey: ['users'],
  queryFn: () => axios.get('/api/users').then(res => res.data),
  retry: 3,
});

export default AssigneeSelect;