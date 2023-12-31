'use client';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import createIssueSchema, { TIssueForm } from '@/app/api/issues/createIssueSchema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<TIssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
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
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        {errors.title && <ErrorMessage error={errors.title.message} />}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        {errors.description && <ErrorMessage error={errors.description.message} />}
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
};
export default NewIssuePage;