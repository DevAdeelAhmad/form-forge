import { GetFormContentByUrl } from '@/actions/form'
import React from 'react'

async function SubmitPage({ params, }: { params: { formUrl: string }; }) {
    const form = await GetFormContentByUrl(params.formUrl)
    if (!form) {
        throw new Error("Form not found...");
    }
    return (
        <main>
            Submit Page: {params.formUrl}
        </main>
    )
}

export default SubmitPage