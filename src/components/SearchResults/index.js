import './index.css'

import {FaSearch} from 'react-icons/fa'
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import PostItem from '../PostItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class SearchResults extends Component {
  onClicksearchResultTryAgainBtn = () => {
    const {getSearchResults} = this.props
    getSearchResults()
  }

  renderInitialView = () => (
    <div className="search-initial-view-container">
      <img
        src="https://res.cloudinary.com/dpbd7fvio/image/upload/v1766580897/Frame_1473search-initial-img_yy9nnr.png"
        className="search-initial-image"
        alt=""
      />
      <p className="search-initial-text">Search Results will be appear here</p>
    </div>
  )

  renderSuccessView = () => {
    const {searchResultsList} = this.props
    console.log(searchResultsList)
    return (
      <>
        {searchResultsList.length > 0 ? (
          <div className="search-result-success-view-container">
            <h1 className="search-result-success-view-heading">
              Search Results
            </h1>
            <ul className="search-result-success-list-container">
              {searchResultsList.map(eachPost => (
                <PostItem key={eachPost.postId} postDetails={eachPost} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="search-no-result-container">
            <img
              src="https://res.cloudinary.com/dpbd7fvio/image/upload/v1766657484/Groupsearch-no-results_hggop0.png"
              className="search-no-result-image"
              alt="search not found"
            />
            <h1 className="search-no-result-heading">Search Not Found</h1>
            <p className="search-no-result-description">
              Try different keyword or search again
            </p>
          </div>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="search-result-failure-container">
      <img
        src="https://res.cloudinary.com/dpbd7fvio/image/upload/v1766138240/Group_7522myProfile-failure-image_bn2zww.png"
        className="search-result-failure-image"
        alt="failure view"
      />
      <p className="search-result-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="search-result-failure-try-again-btn"
        onClick={this.onClicksearchResultTryAgainBtn}
      >
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="search-results-loading-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSearchResultsList = () => {
    const {apiStatus} = this.props
    switch (apiStatus) {
      case 'INITIAL':
        return this.renderInitialView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'INPROGRESS':
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInputValue, onChangeSearchValue, getSearchResults} = this.props

    return (
      <>
        <div className="mobile-search-bar-container">
          <div className="search-bar-container">
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
              onClick={getSearchResults}
            >
              <FaSearch className="search-icon" />
            </button>
          </div>
        </div>
        {this.renderSearchResultsList()}
      </>
    )
  }
}

export default SearchResults
