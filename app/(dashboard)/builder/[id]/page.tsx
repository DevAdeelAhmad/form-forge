import { GetFormById } from '@/actions/form';
import Builder from '@/components/Builder';
import React from 'react'

async function BuilderPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const form = await GetFormById(Number(id))
    if (!form) {
        throw new Error("Form not found");
    }
    return (
        <Builder form={form} />
    )
}

export default BuilderPage
