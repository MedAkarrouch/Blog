import toast from 'react-hot-toast'
export const checkForNetworkError = (err) => {
  if (err.message === 'Network Error')
    return toast.error('Something went wrong Try again later')
}
export const handleError = (err) => {
  if (err.message === 'Network Error')
    return toast.error('Something went wrong Try again later')
  //
  const {
    validationErrors,
    data: { message },
  } = err.response?.data
  if (validationErrors)
    [...validationErrors].reverse().forEach((element, index) => {
      toast.error(element.error, { id: index + 1 })
    })
  else if (message) toast.error(message)
}
