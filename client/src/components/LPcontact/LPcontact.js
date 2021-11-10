import emailjs from 'emailjs-com'
import { useState } from 'react'
import './LPcontact.css'

const LPcontact = () => {


  const [connectInfo, setConnectInfo] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = ({ target: { name, value } }) => setConnectInfo({ ...connectInfo, [name]: value })



  const handleSubmit = event => {
    event.preventDefault()

    if (connectInfo.name !== '' && connectInfo.email !== '' && connectInfo.message !== '') {


      emailjs.send("service_bzw9z2j", "contact", connectInfo, "user_74lDawTBgW65Sfcmf8XdP")


      setConnectInfo({ email: '', name: '', message: '' })
      console.log(connectInfo)
    }
    console.log(connectInfo)

  }
  return (
    <section
      className="bg-light py-5"
      id="contact">
      <div className="container px-5 my-5 px-5">
        <div className="text-center mb-5">
          <div className="feature bg-gradient rounded-3 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60" height="60"
              fill="currentColor"
              className="bi bi-envelope"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
          </div>
          <h2 class="fw-bolder">Get in touch</h2>
          <p class="lead mb-0">We'd love to hear from you</p>
        </div>
        <div className="row gx-5 justify-content-center">
          <div className="col-lg-6">
            <form id="contactform">
              <div className="form-floating mb-3">
                <input
                  className="form-control mb-2"
                  name="name"
                  value={connectInfo.name}
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter your name..." data-sb-validations="required" />
                <label for="name">Full name</label>
                <div
                  className="invalid-feedback"
                  data-sb-feedback="name:required">
                  A name is required.
                </div>

                <div className="form-floating mb-3">
                  <input className="form-control"
                    name="email"
                    value={connectInfo.email}
                    type="email"
                    onChange={handleInputChange}
                    placeholder="name@example.com" data-sb-validations="required,email" />
                  <label for="email">Email address</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:required">
                    An email is required.
                  </div>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:email">
                    Email is not valid.
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    name="message"
                    value={connectInfo.message}
                    type="text"
                    onChange={handleInputChange}
                    laceholder="Enter your message here..."
                    data-sb-validations="required"></textarea>
                  <label for="message">Message</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="message:required">
                    A message is required.
                  </div>
                </div>

                <div className="d-grid justify-content-center">
                  <button
                    className="btn btn-lg Submit text-white"
                    id="submitButton"
                    onClick={handleSubmit}
                    type="submit">
                    Submit
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LPcontact