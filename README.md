# Jofer ![ScreenShot](/client/src/assets/JOFER.png)

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

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Deployment

[Jofer](https://jofer.herokuapp.com)

## Future Goals

- Auto Emails
  - Employers have the option to click a button that sends an automatic email to all applicants to join Jofer to track their job progress (with their email).
- The Negotiator
  - Feature that uses company data to automate salary negotiations between employer and applicant once in the offer column.
- End-to-end Application Process
  - Currently our app is scaled down for smaller companies.  We would keep this version for companies with less than 50 employees.  Our next version would be subscription based for larger companies with more applicants.
  - This larger version would be fully automated and end-to-end.  The employer would post the job on our site.  When an applicant applies, they fill out all of the information that the employer needs (skills, history, etc.).
  - Then the employer will be able to filter applicants in the managed job tool in bulk, and decline applicants in groups, but still automate decline reasons that are individual to the applicants so that this app can be used at scale.
