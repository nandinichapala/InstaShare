import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import PostItem from '../PostItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apisStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class UserPosts extends Component {
  state = {
    userPostsList: [],
    apiCurrentState: apisStatus.initial,
  }

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    this.setState({apiCurrentState: apisStatus.inProgress})
    const postsUrl = 'https://apis.ccbp.in/insta-share/posts'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(postsUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedPostLists = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        postCaption: eachPost.post_details.caption,
        postImageUrl: eachPost.post_details.image_url,
        likesCount: eachPost.likes_count,
        createdAt: eachPost.created_at,
        comments: eachPost.comments.map(each => ({
          comment: each.comment,
          userId: each.user_id,
          userName: each.user_name,
        })),
      }))
      this.setState({
        userPostsList: updatedPostLists,
        apiCurrentState: apisStatus.success,
      })
    } else {
      this.setState({apiCurrentState: apisStatus.failure})
    }
  }

  onClickFailureRetryBtn = () => {
    this.getUserPosts()
  }

  renderSuccessView = () => {
    const {userPostsList} = this.state

    return (
      <ul className="post-list-container">
        {userPostsList.map(eachPostDetails => (
          <PostItem
            key={eachPostDetails.postId}
            postDetails={eachPostDetails}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="posts-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="home-posts-failure-container">
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
        onClick={this.onClickFailureRetryBtn}
      >
        Try again
      </button>
    </div>
  )

  renderPosts = () => {
    const {apiCurrentState} = this.state
    switch (apiCurrentState) {
      case apisStatus.success:
        return this.renderSuccessView()
      case apisStatus.inProgress:
        return this.renderLoadingView()
      case apisStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderPosts()}</>
  }
}

export default UserPosts
