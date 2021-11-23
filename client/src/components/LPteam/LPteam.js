import Steven from '../../image/Steven.png'
import Gilberto from '../../image/Gilberto.jpg'
import Minh from '../../image/Minh.jpg'
import './LPteam.css'

const LPteam = () => {
  return (
    <section
      className="text-center pt-5 pb-5 border-bottom"
      id="team">
      <div className="container">
        <h2 className="mb-5">Meet the Team</h2>
        <div className="row">
          <div className="col-lg-4">
            <div className="mx-auto mb-5 mb-lg-0">
              <img
                className="rounded-circle profile"
                src={Steven}
                alt="Steven Q."
                height="200px" />
              <h5 className="mt-4">Steven Q.</h5>
              <p class="font-weight-light mb-3">I have been coding since 2013 when I took my first C++ class.  I am a recent graduate of UC Irvine's Full Stack Development Bootcamp focused on the Mern Stack.</p>
              <p class="font-weight-light mb-0">Prior to diving into Software Development full time I was in the finance industry where I saw an immediate need to re-invent the way we approach business with technology.  My passion lies in making outdated process new, clean, and effeciant with modern tools and technologies.</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mx-auto mb-5 mb-lg-0">
              <img
                className="rounded-circle profile"
                src={Gilberto}
                alt="Gilberto R."
                height="200px" />
              <h5 className="mt-4">Gilberto R.</h5>
              <p class="font-weight-light mb-0"> I have been coding since 2019 when I decided to take a leap and try  out a Udacity Nanodegree course. I am a recent graduate of UC Irvine's Full Stack Development Bootcamp focused on the Mern Stack.</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mx-auto mb-5 mb-lg-0">
              <img
                className="rounded-circle profile"
                src={Minh}
                alt="Minh N."
                height="200px" />
              <h5 className="mt-4">Minh N.</h5>
              <div>
                <p>UC Irvine's Full Stack Development Bootcamp Graduate</p>
                <p>"Time is a social construct, we collectively create the meaning of time. It has no predetermined meaning until we give it meaning"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LPteam