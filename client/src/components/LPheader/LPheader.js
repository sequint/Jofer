import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import './LPheader.css'

const LPheader = () => {
  return (
    <>
      <header className="bgColor py-5">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2">Jofer</h1>
                <p className="lead text-white-50 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione obcaecati nemo eius ipsa, ut dolore omnis amet provident corporis, adipisci praesentium nisi! Excepturi accusamus fugit, maiores blanditiis ratione cum facere!</p>
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
          </div>
        </div>
      </header>
    </>
  )
}

export default LPheader