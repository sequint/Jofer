import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import './LPheader.css'

const LPheader = () => {
  return (
    <>
      <header 
      className="bgColor py-5"
      id='home'
      >
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2 landingTitle">Jofer</h1>
                <p className="lead text-white-50 mb-4 landingText">Jofer is a job application tool designed to be an intermediary between employers and applicants. Jofer refines communication between these entities to bring transparency in the job application process, this includes tips to better their next application process if declined for any reason.</p>
                <div className="d-grid d-sm-flex justify-content-sm-center">
                  <Link to="/login">
                    <Button
                      className="gStart"
                      type="button">
                      <strong>Get Started</strong>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </header>
    </>
  )
}

export default LPheader