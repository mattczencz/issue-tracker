import { Text } from '@radix-ui/themes';

interface Props {
  error: string | undefined;
}

const ErrorMessage = ({ error }: Props) => {
  return (
    <Text color="red" as="p">{error}</Text>
  );
};
export default ErrorMessage;