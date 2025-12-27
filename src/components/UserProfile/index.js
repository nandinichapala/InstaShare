import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apisStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {apiStatus: apisStatusConstants.initial, userProfileDetails: {}}

  componentDidMount() {
    this.getUserProfileDetails()
  }

  onClickTryAgainBtn = () => {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({apiStatus: apisStatusConstants.inProgress})
    const userProfileUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userProfileUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        posts: data.user_details.posts,
        stories: data.user_details.stories,
      }
      this.setState({
        userProfileDetails: updatedData,
        apiStatus: apisStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apisStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="user-profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {userProfileDetails} = this.state
    const {
      followersCount,
      followingCount,
      postsCount,
      profilePic,
      userBio,
      userId,
      userName,
      posts,
      stories,
    } = userProfileDetails
    console.log(userProfileDetails)
    return (
      <div className="user-profile-successview-container">
        <div className="user-profile-image-details-container">
          <img
            src={profilePic}
            className="user-profile-profile-pic"
            alt="user profile"
          />
          <div className="user-profile-info-container">
            <h1 className="user-profile-username" role="heading">
              {userName}
            </h1>
            <div className="post-count-container">
              <div className="post-count-text-container">
                <p className="post-count">{postsCount}</p>
                <p className="post-count-text">posts</p>
              </div>
              <div className="post-count-text-container">
                <p className="post-count">{followersCount}</p>
                <p className="post-count-text">followers</p>
              </div>
              <div className="post-count-text-container">
                <p className="post-count">{followingCount}</p>
                <p className="post-count-text">posts</p>
              </div>
            </div>
            <p className="user-profile-userid">{userId}</p>
            <p className="user-profile-bio">{userBio}</p>
          </div>
        </div>
        <ul className="user-profile-stories-list-container">
          {stories.map(eachStory => (
            <li
              className="user-profile-story-list-item-container"
              key={eachStory.id}
            >
              <div className="user-profile-story-inner-container">
                <img
                  src={eachStory.image}
                  className="user-profile-story-image"
                  alt="user story"
                />
              </div>
            </li>
          ))}
        </ul>
        <hr className="separate-line" />
        <div className="posts-image-heading-container">
          <BsGrid3X3 className="posts-icon" />
          <h1 className="posts-heading">Posts</h1>
        </div>
        {posts.length > 0 ? (
          <ul className="user-profile-posts-list-container">
            {posts.map(eachPost => (
              <li
                className="user-profile-posts-list-item-container"
                key={eachPost.id}
              >
                <img
                  src={eachPost.image}
                  className="user-profile-post-image"
                  alt="user post"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-posts-container">
            <div className="camera-icon-container">
              <BiCamera className="camera-icon" />
            </div>
            <h1 className="no-posts-heading">No Posts Yet</h1>
          </div>
        )}
      </div>
    )
  }

  renderFailureView = () => (
    <div className="user-profile-failure-container">
      <img
        src="https://res.cloudinary.com/dpbd7fvio/image/upload/v1766138240/Group_7522myProfile-failure-image_bn2zww.png"
        className="user-profile-failure-image"
        alt="failure view"
      />
      <p className="user-profile-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="failure-try-again-btn"
        onClick={this.onClickTryAgainBtn}
      >
        Try again
      </button>
    </div>
  )

  renderUserProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisStatusConstants.inProgress:
        return this.renderLoadingView()
      case apisStatusConstants.success:
        return this.renderSuccessView()
      case apisStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-main-container">
        <Header />
        {this.renderUserProfileDetails()}
      </div>
    )
  }
}

export default UserProfile
