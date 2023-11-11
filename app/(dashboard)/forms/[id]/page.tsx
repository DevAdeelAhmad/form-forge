import { GetFormById } from '@/actions/form';
import Builder from '@/components/Builder';
import FormLinkShare from '@/components/FormLinkShare';
import VisitButton from '@/components/VisitButton';
import React from 'react'
import { StatsCard } from '../../page';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';

async function FormDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const form = await GetFormById(Number(id))
    if (!form) {
        throw new Error("Form not found");
    }
    const { visits, submissions } = form;
    let submissionRate = 0;
    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }
    const bounceRate = 100 - submissionRate;

    const statsCardsData = [
        {
            title: "Total Visits",
            icon: <LuView className="text-blue-600" />,
            helperText: "All time form visits",
            value: visits.toLocaleString() || '',
            loading: false,
            className: "shadow-md shadow-blue-600",
        },
        {
            title: "Total Submissions",
            icon: <FaWpforms className="text-yellow-600" />,
            helperText: "All time submissions",
            value: submissions.toLocaleString() || '',
            loading: false,
            className: "shadow-md shadow-yellow-600",
        },
        {
            title: "Submission Rate",
            icon: <HiCursorClick className="text-green-600" />,
            helperText: "Visits that bring form submissions",
            value: submissionRate.toLocaleString() || '',
            loading: false,
            className: "shadow-md shadow-green-600",
        },
        {
            title: "Bounce Rate",
            icon: <TbArrowBounce className="text-red-600" />,
            helperText: "Visits that leave without interacting",
            value: bounceRate.toLocaleString() || '',
            loading: false,
            className: "shadow-md shadow-red-600",
        },
    ];
    return (
        <>
            <div className="py-10 border-b border-muted">
                <div className="flex justify-between container">
                    <h1 className='text-4xl font-bold truncate'>{form.name}</h1>
                    <VisitButton shareUrl={form.shareUrl} />
                </div>
                <div className="py-4 border-b border-muted">
                    <div className="container flex gap-2 items-center justify-between">
                        <FormLinkShare shareUrl={form.shareUrl} />
                    </div>
                </div>
            </div>
            <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
                {statsCardsData.map((cardData, index) => (
                    <StatsCard key={index} className={cardData.className} helperText={cardData.helperText}
                        icon={cardData.icon} loading={cardData.loading} title={cardData.title} value={cardData.value} />
                ))}
            </div>
            <div className="container pt-10">
                <SubmissionsTable id={form.id} />
            </div>
        </>
    )
}

export default FormDetailPage


function SubmissionsTable({ id }: { id: number }) {
    return (
        <>
            <h1 className="text-2xl font-bold my-4">Submissions</h1>
        </>
    )
}