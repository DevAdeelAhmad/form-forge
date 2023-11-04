"use client"
import React, { useContext } from 'react'
import { DesignerContext } from '../DesignerContext'

function useDesigner() {
    const context = useContext(DesignerContext);
    if (!context) {
        throw new Error("Use Designer must be used within a Designer Context")
    }
    return context
}

export default useDesigner
