'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';

export default function ErrorCard({
  errorMessage,
  reset,
}: {
  errorMessage: string;
  reset: () => void;
}) {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Card className="mx-auto w-[40%] border-red-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-red-300">
            <CircleX />
            Ops...
          </CardTitle>
          <CardDescription className='flex justify-center text-base'>Ocorreu um erro</CardDescription>
        </CardHeader>
        <CardContent className="underline flex justify-center text-lg">{errorMessage}</CardContent>
        <CardFooter className="flex justify-center">
          <Button variant={'outline'} onClick={reset}>
            Tentar novamente
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}