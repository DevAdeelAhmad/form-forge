import { GetFormStats, GetForms } from '@/actions/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ReactNode, Suspense } from 'react'
import { Separator } from '@/components/ui/separator'
import CreateFormButton from '@/components/CreateFormButton'
import { StatsCards } from '@/components/StatsCards'
import { FormCard } from '../../components/FormCard'

export default function Home() {
  return (
    <div className='container pt-4'>
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateFormButton />
        <Suspense fallback={[1, 2, 3, 4].map(el => <FormCardSkeleton key={el} />)}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  )
}
async function CardStatsWrapper() {
  const stats = await GetFormStats()
  return <StatsCards loading={false} data={stats} />
}
export interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}
interface Props {
  title: string, value: string, helperText: string, className: string, loading: boolean, icon: ReactNode
}
export function StatsCard(
  { title, value, icon, helperText, loading, className }: Props) {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {loading && <Skeleton>
            <span className='opacity-0'>0</span>
          </Skeleton>}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  )
}
function FormCardSkeleton() {
  return <Skeleton className='border-2 border-primary/20 h-[190px] w-full' />;
}
async function FormCards() {
  const forms = await GetForms();

  return <>
    {
      forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
  </>
}