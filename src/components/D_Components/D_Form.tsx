import React, { HTMLInputTypeAttribute } from 'react'
import { ControlledInput, InputProps } from '../ui/controlled/controlled-input'
import { Path } from 'react-hook-form'
import { ClassName } from './D_types'

type D_FormProps<T extends object> = {
}

const D_Form = <T extends object>({
    name,
    label,
    type,
}: D_FormProps<T>) => {
    return (
        <ControlledInput<T>
            name={name}
            label={label}
            type={type}
        />
    )
}

export default D_Form