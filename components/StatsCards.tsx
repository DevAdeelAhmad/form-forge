import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { StatsCardProps, StatsCard } from '@/app/(dashboard)/page';

export function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;
  const statsCardsData = [
    {
      title: "Total Visits",
      icon: <LuView className="text-blue-600" />,
      helperText: "All time form visits",
      value: data?.visits.toLocaleString() || '',
      loading: loading,
      className: "shadow-md shadow-blue-600",
    },
    {
      title: "Total Submissions",
      icon: <FaWpforms className="text-yellow-600" />,
      helperText: "All time submissions",
      value: data?.submissions.toLocaleString() || '',
      loading: loading,
      className: "shadow-md shadow-yellow-600",
    },
    {
      title: "Submission Rate",
      icon: <HiCursorClick className="text-green-600" />,
      helperText: "Visits that bring form submissions",
      value: data?.submissionRate.toLocaleString() || '',
      loading: loading,
      className: "shadow-md shadow-green-600",
    },
    {
      title: "Bounce Rate",
      icon: <TbArrowBounce className="text-red-600" />,
      helperText: "Visits that leave without interacting",
      value: data?.bounceRate.toLocaleString() || '',
      loading: loading,
      className: "shadow-md shadow-red-600",
    },
  ];
  return (
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      {statsCardsData.map((cardData, index) => (
        <StatsCard key={index} className={cardData.className} helperText={cardData.helperText}
          icon={cardData.icon} loading={loading} title={cardData.title} value={cardData.value} />
      ))}
    </div>
  );
}
