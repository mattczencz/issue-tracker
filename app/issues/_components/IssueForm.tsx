'use client';
import issueSchema, { TIssueForm } from '@/app/api/issues/issueSchema';
import { ErrorMessage, Spinner } from '@/app/components';
import { statusMap } from '@/app/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, Select, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
});

const IssueForm = ({ issue }: { issue?: Issue; }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<TIssueForm>({
    resolver: zodResolver(issueSchema)
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch('/api/issues/' + issue.id, data);
        router.push(`/issues/${issue.id}`);
      } else {
        await axios.post('/api/issues', data);
        router.push('/issues');
      }
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error has occured');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-6">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-4"
        onSubmit={onSubmit}
      >
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
        </TextField.Root>
        {errors.title && <ErrorMessage error={errors.title.message} />}
        <Controller
          name="status"
          control={control}
          defaultValue={issue?.status ?? 'OPEN'}
          render={({ field }) => (
            <Select.Root {...field} value={field.value} onValueChange={field.onChange}>
              <Select.Trigger className="hover:cursor-pointer" />
              <Select.Content position="popper">
                {Object.values(statusMap).map(status => (
                  <Select.Item className="hover:cursor-pointer" key={status.value} value={status.value}>{status.label}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        {errors.description && <ErrorMessage error={errors.description.message} />}
        <Button disabled={isSubmitting} className="block hover:enabled:cursor-pointer">
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
export default IssueForm;