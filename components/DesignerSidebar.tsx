import React from 'react'
import useDesigner from './hooks/useDesigner'
import FormElementSidebar from './FormElementSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';

function DesignerSidebar() {
    const { selectedElement } = useDesigner();
    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 m-4 mt-4 bg-background rounded-b-xl rounded-t-xl overflow-y-auto ">
            {!selectedElement ? <FormElementSidebar /> : <PropertiesFormSidebar />}
        </aside>
    )
}

export default DesignerSidebar
