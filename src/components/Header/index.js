import './index.css'

import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {IoMenu} from 'react-icons/io5'
import {IoIosCloseCircle} from 'react-icons/io'

class Header extends Component {
  state = {showMenuBar: false}

  onClickLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickMenuBtn = () => {
    this.setState(prevState => ({showMenuBar: !prevState.showMenuBar}))
  }

  onClickCloseBtn = () => {
    this.setState({showMenuBar: false})
  }

  render() {
    const {showMenuBar} = this.state
    const {
      searchInputValue,
      onChangeSearchModeOff,
      getSearchResults,
      onActiveDestopSearchMode,
      onChangeSearchMode,
      onChangeSearchValue,
      pageActive,
      searchMode,
    } = this.props
    const activeHome = pageActive === 'HOME' && !searchMode ? 'active-mode' : ''
    const activeProfile = pageActive === 'PROFILE' ? 'active-mode' : ''
    const activeSearch = pageActive === 'SEARCH' ? 'active-mode' : ''
    return (
      <>
        <div className="header-lg-container">
          <Link className="link-item" to="/">
            <div
              className="logo-title-container"
              onClick={onChangeSearchModeOff}
            >
              <img
                src="https://res.cloudinary.com/deaq38ckx/image/upload/v1765028320/logologinPageLogo_uxv0j9.jpg"
                className="header-logo-image"
                alt="website logo"
              />
              <h1 className="header-title">Insta Share</h1>
            </div>
          </Link>
          <div className="search-links-logout-btn-container">
            <ul className="search-links-list-container">
              <li
                className="search-container"
                onClick={onActiveDestopSearchMode}
              >
                <Link to="/" className="search-link-container">
                  <input
                    type="search"
                    placeholder="Search Caption"
                    className="search-input"
                    value={searchInputValue}
                    onChange={onChangeSearchValue}
                  />
                  <button
                    type="button"
                    className="search-icon-btn"
                    testid="searchIcon"
                    onClick={getSearchResults}
                  >
                    <FaSearch className="search-icon" />
                  </button>
                </Link>
              </li>

              <li className="list-item" onClick={onChangeSearchModeOff}>
                <Link className={`link-text ${activeHome}`} to="/">
                  Home
                </Link>
              </li>
              <li className="list-item">
                <Link className={`link-text ${activeProfile}`} to="/my-profile">
                  Profile
                </Link>
              </li>
            </ul>

            <button
              type="button"
              className="logout-btn"
              onClick={this.onClickLogoutBtn}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="header-sm-container">
          <div className="logo-title-menuicon-container">
            <Link className="link-item" to="/">
              <div
                className="logo-title-container"
                onClick={onChangeSearchModeOff}
              >
                <img
                  src="https://res.cloudinary.com/deaq38ckx/image/upload/v1765028320/logologinPageLogo_uxv0j9.jpg"
                  className="header-logo-image"
                  alt="website logo"
                />
                <h1 className="header-title">Insta Share</h1>
              </div>
            </Link>
            <button
              type="button"
              className="sm-menu-btn"
              onClick={this.onClickMenuBtn}
            >
              <IoMenu className="menu-icon" />
            </button>
          </div>
          {showMenuBar && (
            <div className="links-logoutbtn-container">
              <ul className="tabsList-container">
                <li className="list-item" onClick={onChangeSearchModeOff}>
                  <Link className={`link-text ${activeHome}`} to="/">
                    Home
                  </Link>
                </li>
                <li className="list-item" onClick={onChangeSearchMode}>
                  <Link className={`link-text ${activeSearch}`} to="/">
                    Search
                  </Link>
                </li>
                <li className="list-item">
                  <Link
                    className={`link-text ${activeProfile}`}
                    to="/my-profile"
                  >
                    Profile
                  </Link>
                </li>
              </ul>

              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogoutBtn}
              >
                Logout
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={this.onClickCloseBtn}
              >
                <IoIosCloseCircle className="close-icon" />
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
