# Jofer <img src="./client/src/assets/JOFER.png" alt="logo" height="50">

A full MERN Stack application geared toward helping employers and HR departments give their applicants the best application experience possible, while streamlining communication during the hiring process.

Because employers are flooded with applications on a daily basis, it is often hard to keep up with communication back to all applicants, especially when it comes to declines!  However, every time an auto decline is sent out, employers may be loosing a potential future candidate who is now turned off from the brand.

That's where Jofer steps in!  Jofer provides an easy to use job management tool to manage where an applicant is at in a job process.  When a change is made in the job management tool, the applicant can see their status in real time.  Likewise, when an applicant is dragged into decline, the employer is prompted to enter decline reason and action items so the applicant can see what they can improve on to be competitive in the future.

## Table of Contents

- [Technology](#Techonology)
- [Installation/Dependencies](#Installation/Dependencies)
- [License](#License)
- [Deployment](#Deployment)

## Technology

- React.js
- React Beautiful DND
- Emailjs
- React-Bootstrap
- Javascript
- Node.js
- Express.js
- Passport.js
- MongoDB

## Installation/Dependencies

To install for development purposes, clone this repo into a local folder, then run npm i in both the general folder and the client folder to capture node modules for both the front and back end.  Below are a list of dependencies that should install in order to have a working test environment.

- Back End
  - concurrently
  - dotenv
  - express
  - firebase
  - if-env
  - jsonwebtoken
  - mongoose
  - passport
  - passport-jwt
  - passport-local
  - passport-local-mongoose
- Front End
  - @testing-library/jest-dom
  - @testing-library/react
  - @testing-library/user-event
  - axios
  - bootstrap
  - react
  - react-beautiful-dnd
  - react-bootstrap
  - react-dom
  - react-router-dom
  - react-scripts
  - reactstrap
  - web-vitals
  - emailjs

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Deployment

[Jofer](https://jofer.herokuapp.com)

## Future Goals

- A single UI on applicant side between jobs the applicant creates and jobs employers post.
  - Currently A drag and drop feature is available to manage jobs where employers don't use Jofer and jobs posted by employers are listed below.  Future state goals are to combine the two, where job updates from employers are managed in the drag and drop feature from the applicant side.
- When an applicant creates an account the are promted to fill out a digital resume, and have the ability to update it (skills, experience, etc.) via a profile page.
- Ability for employers to post jobs, and have posted jobs be on the home page for applicants to scroll through, solidifying end-to-end application process through Jofer.
- Incorporate AI into decline process to learn applicants resume, and compare it to what the employer is looking for to give even more custom decline responses.
- Incorporate more automation into the salary negotiator to allow an alogorythm to handle negoatiations based on company data.
- Set an alert if an applicant has been in the review stage for too long.
