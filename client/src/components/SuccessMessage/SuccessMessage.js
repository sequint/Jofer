import Alert from 'react-bootstrap/Alert'

const SuccessMessage = () => {
  return(
    <>
      <Alert variant='success'>
        User registered!  Re-routing to the login page.
      </Alert>
    </>
  )
}

export default SuccessMessage
