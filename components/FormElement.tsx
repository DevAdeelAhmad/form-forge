import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField"

export type FormElement = {
    type: ElementsType;
    construct: (id: string) => FormElementInstance
    designerButtonElement: {
        icon: React.ElementType,
        label: string
    }
    formComponent: React.FC;
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