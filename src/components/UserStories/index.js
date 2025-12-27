import Slider from 'react-slick'
import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apisStatusData = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class UserStories extends Component {
  state = {userImagesNameList: [], apiStatus: apisStatusData.initial}

  componentDidMount() {
    this.getUserStoriesData()
  }

  getUserStoriesData = async () => {
    this.setState({apiStatus: apisStatusData.inProgress})
    const userStoriesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(userStoriesUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachUserStory => ({
        storyUrl: eachUserStory.story_url,
        userId: eachUserStory.user_id,
        userName: eachUserStory.user_name,
      }))
      this.setState({
        userImagesNameList: updatedData,
        apiStatus: apisStatusData.success,
      })
    } else {
      this.setState({
        apiStatus: apisStatusData.failure,
      })
    }
  }

  onClickRetryBtn = () => {
    this.getUserStoriesData()
  }

  renderSuccessView = () => {
    const {userImagesNameList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slick-container">
        <Slider {...settings}>
          {userImagesNameList.map(eachImage => {
            const {storyUrl, userId, userName} = eachImage
            return (
              <div className="slick-item-container" key={userId}>
                <img
                  src={storyUrl}
                  className="slick-item-image"
                  alt="user story"
                />
                <p className="slick-item-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dpbd7fvio/image/upload/v1766728524/alert-trianglestoriesViewFailureImage_ktxj97.png"
        className="failure-img"
        alt="failure view"
        role="img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-retry-btn"
        onClick={this.onClickRetryBtn}
      >
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="stories-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisStatusData.success:
        return this.renderSuccessView()
      case apisStatusData.failure:
        return this.renderFailureView()
      case apisStatusData.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="slider-container">{this.renderSlider()}</div>
  }
}

export default UserStories
