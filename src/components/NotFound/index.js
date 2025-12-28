import './index.css'

import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dpbd7fvio/image/upload/v1766410846/Layer_2_jpgxs2.png"
      alt="page not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
