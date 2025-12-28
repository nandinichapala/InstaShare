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

class MyProfile extends Component {
  state = {apiStatus: apisStatusConstants.initial, myProfileDetails: {}}

  componentDidMount() {
    this.getMyProfileDetails()
  }

  onClickTryAgainBtn = () => {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    this.setState({apiStatus: apisStatusConstants.inProgress})
    const myProfileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(myProfileUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        posts: data.profile.posts,
        stories: data.profile.stories,
      }
      this.setState({
        myProfileDetails: updatedData,
        apiStatus: apisStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apisStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="my-profile-loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {myProfileDetails} = this.state
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
    } = myProfileDetails

    return (
      <div className="my-profile-successview-container">
        <div className="myprofile-image-details-container">
          <img
            src={profilePic}
            className="myprofile-profile-pic"
            alt="my profile"
          />
          <div className="myprofile-info-container">
            <h1 className="myprofile-username"> {userName} </h1>
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
            <p className="myprofile-userid">{userId}</p>
            <p className="myprofile-bio">{userBio}</p>
          </div>
        </div>

        <ul className="myprofile-stories-list-container">
          {stories.map(eachStory => (
            <li
              className="myprofile-story-list-item-container"
              key={eachStory.id}
            >
              <div className="myprofile-story-inner-container">
                <img
                  src={eachStory.image}
                  className="myprofile-story-image"
                  alt="my story"
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
          <ul className="myprofile-posts-list-container">
            {posts.map(eachPost => (
              <li
                className="myprofile-posts-list-item-container"
                key={eachPost.id}
              >
                <img
                  src={eachPost.image}
                  className="myprofile-post-image"
                  alt="my post"
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
    <div className="my-profile-failure-container">
      <img
        src="https://res.cloudinary.com/dpbd7fvio/image/upload/v1766138240/Group_7522myProfile-failure-image_bn2zww.png"
        className="myprofile-failure-image"
        alt="failure view"
      />
      <p className="my-profile-failure-text">
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

  renderMyProfileDetails = () => {
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
    const pageActive = 'PROFILE'
    return (
      <div className="my-profile-main-container">
        <Header pageActive={pageActive} />
        {this.renderMyProfileDetails()}
      </div>
    )
  }
}

export default MyProfile
