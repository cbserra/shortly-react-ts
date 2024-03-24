import React from 'react'
import './FormError.css'
import { FormValues } from '../../types/ShortenTypes'
import { FieldErrors } from 'react-hook-form'

type Props = {
  isMobile?: boolean
  isDesktop?: boolean
  formErrors: FieldErrors<FormValues>
}

export const FormError = (props: Props) => {
  const formErrors = props.formErrors

  return (
    <div className="error-message">
        { formErrors.url && (
            <span className='error-message'>
                {formErrors.url?.message}
            </span>
        )}
    </div>
  )
}