"use client"

import { MdTextFields } from "react-icons/md"
import { ElementsType, FormElement, FormElementInstance } from "../FormElement"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form'
import { Switch } from "../ui/switch"

const type: ElementsType = "TextField"

const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Enter Here..."
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeholder: z.string().max(50),
})
export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id, type, extraAttributes
    }),
    designerButtonElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div className="text-white">Form Component</div>,
    propertiesComponent: PropertiesComponent,
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}


function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, required, placeHolder, helperText } = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>{label}{required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeHolder} />
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
        </div>
    )
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {

    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const { label, helperText, placeholder, required } = element.extraAttributes;
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: { label, helperText, required, placeholder, }
    })

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { label, helperText, placeholder, required } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: { label, helperText, placeholder, required, }
        })
    }
    return (
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)} onSubmit={e => e.preventDefault()} className="space-y-3">
                <FormField control={form.control} name="label" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input {...field} onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.blur();
                                }
                            }} />
                        </FormControl>
                        <FormDescription>
                            The label of the Field. <br /> It will be displayed above the field.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />

                <FormField control={form.control} name="placeholder" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Placeholder</FormLabel>
                        <FormControl>
                            <Input {...field} onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.blur();
                                }
                            }} />
                        </FormControl>
                        <FormDescription>
                            The placeholder of the Field.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />

                <FormField control={form.control} name="helperText" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Helper Text</FormLabel>
                        <FormControl>
                            <Input {...field} onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.blur();
                                }
                            }} />
                        </FormControl>
                        <FormDescription>
                            The Helper Text of the Field. <br /> It will be displayed below the field.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField control={form.control} name="required" render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-md">
                        <div className="space-y-0.5">
                            <FormLabel>Required</FormLabel>

                            <FormDescription>
                                The Helper Text of the Field. <br /> It will be displayed below the field.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            </form>
        </Form>
    )
}
