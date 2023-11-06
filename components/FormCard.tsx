import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';

export function FormCard({ form }: { form: Form; }) {
  return <>
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between gap-2'>
          <span className='truncate font-semibold uppercase'>{form.name}</span>
          {form.publised && <Badge>Published</Badge>}
          {!form.publised && <Badge variant={'destructive'}>Draft</Badge>}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.publised && <span className='flex items-center gap-2'>
            <LuView className="text-muted-foreground" />
            <span>{form.visits.toLocaleString()}</span>
            <FaWpforms className="text-muted-foreground" />
            <span>{form.submissions.toLocaleString()}</span>
          </span>}
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
        {form.description || "No description provided yet"}
      </CardContent>
      <CardFooter>
        {form.publised && (
          <Button asChild className='w-full mt-2 text-md gap-4'>
            <Link href={`/forms/${form.id}`}>View Submissions <BiRightArrowAlt /></Link>
          </Button>
        )}
        {!form.publised && (
          <Button asChild variant={'secondary'} className='w-full mt-2 text-md gap-4'>
            <Link href={`/builder/${form.id}`}>Edit Form <FaEdit /></Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  </>;
}
