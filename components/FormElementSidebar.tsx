import React from 'react'
import SidebarButtonElement from './SidebarButtonElement'
import { FormElements } from './FormElement'

function FormElementSidebar() {
    return (
        <div>
            Elements
            <SidebarButtonElement formElement={FormElements.TextField} />
        </div>
    )
}

export default FormElementSidebar
