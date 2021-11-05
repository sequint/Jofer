import logo from '../../image/JOFER.png'

const LPteam = () => {
  return (
    <section
      className="text-center bg-light pt-5 mb-5 pb-5"
      id="team">
      <div className="container">
        <h2 className="mb-5">Meet the Team</h2>
        <div className="row">
          <div className="col-lg-3">
            <div className="mx-auto mb-5 mb-lg-0">
              <img 
              src={logo} 
              alt="self"
              height="170px" />
              <h5 className="mt-4">Name1</h5>
              <p class="font-weight-light mb-0">"Something really cool here"</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mx-auto mb-5 mb-lg-0">
              <img src={logo} alt="self" height="170px" />
              <h5 className="mt-4">Name1</h5>
              <p class="font-weight-light mb-0">"Something really cool here"</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mx-auto mb-5 mb-lg-0">
              <img src={logo} alt="self" height="170px" />
              <h5 className="mt-4">Name1</h5>
              <p class="font-weight-light mb-0">"Something really cool here"</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mx-auto mb-5 mb-lg-0">
              <img src={logo} alt="self" height="170px" />
              <h5 className="mt-4">Name1</h5>
              <p class="font-weight-light mb-0">"Something really cool here"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LPteam