import * as React from 'react'

import clsxm from 'lib/clsxm'

type SelectProps = {
  options: {
    label: string
    value: string
  }[]
  placeholder: string
} & React.ComponentPropsWithRef<'select'>

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, placeholder, options, ...rest }, ref) => {
    return (
      <select
        ref={ref}
        className={clsxm('border px-4 py-2 rounded-md w-full', className)}
        {...rest}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)

Select.displayName = 'Select'

export default Select
