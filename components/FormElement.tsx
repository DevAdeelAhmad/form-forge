import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField"

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
    type: ElementsType;
    construct: (id: string) => FormElementInstance
    designerButtonElement: {
        icon: React.ElementType,
        label: string
    }
    formComponent: React.FC<{
        elementInstance: FormElementInstance
        submitValue?: (key: string, value: string) => void;
    }>;
    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;
}

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}

type FormElementsType = {
    [key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement
}