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
          'font-semibold inline-flex items-center px-4 py-2 rounded',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          'duration-75 transition-colors',
          //#region  //*=========== Variants ===========
          [isCentered && 'justify-center'],
          [
            variant === 'primary' && [
              'bg-gradient-to-r from-primary-500 to-primary-300 text-white',
              'border border-primary-600',
              'hover:from-primary-600 hover:to-secondary-400 hover:text-white',
              'active:bg-primary-500',
              'disabled:bg-primary-400 disabled:hover:bg-primary-400',
            ],
            variant === 'secondary' && [
              'bg-gradient-to-r from-secondary-500 to-secondary-300 text-white',
              'border border-secondary-600',
              'hover:from-secondary-600 hover:to-secondary-400 hover:text-red',
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

Button.displayName = 'Button'

export default Button
