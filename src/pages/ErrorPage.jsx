import React from 'react'
import {useRouteError} from 'react-router-dom'
const ErrorPage = () => {
    const error = useRouteError()
  return (
    <div>ErrorPage - {error.statusText} - {error.message} </div>
  )
}

export default ErrorPage