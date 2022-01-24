import * as React from 'react'

import clsxm from 'lib/clsxm'

enum ButtonVariant {
  'primary',
  'secondary',
  'outline',
  'ghost',
  'light',
  'dark',
}

type ButtonProps = {
  isDarkBg?: boolean
  isCentered?: boolean
  variant?: keyof typeof ButtonVariant
} & React.ComponentPropsWithRef<'button'>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      variant = 'primary',
      isDarkBg = false,
      isCentered,
      ...rest
    },
    ref
  ) => {
    const disabled = buttonDisabled

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center px-4 py-2 font-semibold rounded',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          'transition-colors duration-75',
          //#region  //*=========== Variants ===========
          [isCentered && 'justify-center'],
          [
            variant === 'primary' && [
              'bg-primary-500 text-white',
              'border border-primary-600',
              'hover:bg-primary-600 hover:text-white',
              'active:bg-primary-500',
              'disabled:bg-primary-400 disabled:hover:bg-primary-400',
            ],
            variant === 'secondary' && [
              'bg-secondary-500 text-white',
              'border border-secondary-600',
              'hover:bg-secondary-600 hover:text-white',
              'active:bg-secondary-500',
              'disabled:bg-secondary-400 disabled:hover:bg-secondary-400',
            ],
          ],
          className
        )}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

export default Button
