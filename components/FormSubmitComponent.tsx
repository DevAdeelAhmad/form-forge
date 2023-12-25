"use client"
import React, { useCallback, useRef } from 'react'
import { FormElementInstance, FormElements } from './FormElement'
import { Button } from './ui/button';
import { HiCursorClick } from 'react-icons/hi';

function FormSubmitComponent({ formUrl, content }: { formUrl: string, content: FormElementInstance[] }) {
    const submitForm = () => {
        console.log("Form Values: ", formValues.current);

    }
    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value;
    }, [])

    const formValues = useRef<{ [key: string]: string }>({})
    return (
        <div className='flex justify-center items-center w-full h-full p-8'>
            <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 border shadow-xl shadow-violet-700 rounded overflow-y-auto">
                {content.map((element) => {
                    const FormElement = FormElements[element.type].formComponent;
                    return <FormElement key={element.id} elementInstance={element} submitValue={submitValue} />
                })}
                <Button onClick={() => {
                    submitForm();
                }} className='mt-8'><HiCursorClick className="mr-2" />Submit</Button>
            </div>
        </div>
    )
}

export default FormSubmitComponent
