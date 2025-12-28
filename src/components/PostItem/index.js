import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FcLike} from 'react-icons/fc'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

class PostItem extends Component {
  state = {isLiked: false}

  onToggleLikedBtn = async () => {
    await this.setState(prevState => ({isLiked: !prevState.isLiked}))

    const {postDetails} = this.props
    const {postId} = postDetails

    const postLikeUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const {isLiked} = this.state

    const likeRequest = {
      like_status: isLiked,
    }

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likeRequest),
    }

    const response = await fetch(postLikeUrl, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {postDetails} = this.props
    const {
      profilePic,
      userName,
      userId,
      postCaption,
      postImageUrl,
      likesCount,
      createdAt,
      comments,
    } = postDetails
    const {isLiked} = this.state
    return (
      <li className="post-list-item-container">
        <div className="post-profile-name-container">
          <div className="post-profile-image-outer-conatiner">
            <div className="post-profile-image-inner-container">
              <img
                src={profilePic}
                className="post-profile-image"
                alt="post author profile"
              />
            </div>
          </div>
          <Link to={`/users/${userId}`} className="user-Profile-link">
            <p className="post-username">{userName}</p>
          </Link>
        </div>
        <img src={postImageUrl} className="post-image" alt="post" />
        <div className="like-comments-container">
          <div className="like-comment-share-icons-container">
            {isLiked ? (
              <button
                type="button"
                className="like-btn-container"
                onClick={this.onToggleLikedBtn}
              >
                <FcLike className="liked-icon" />
              </button>
            ) : (
              <button
                type="button"
                className="like-btn-container"
                onClick={this.onToggleLikedBtn}
              >
                <BsHeart className="liked-icon" />
              </button>
            )}
            <FaRegComment className="comment-icon" />
            <BiShareAlt className="share-icon" />
          </div>
          <p className="like-text">
            {isLiked ? likesCount + 1 : likesCount} likes
          </p>
          <p className="caption-text">{postCaption}</p>
          <ul className="comments-list-container">
            {comments.map(eachComment => (
              <li key={eachComment.userId}>
                <p className="comment-text">
                  <span className="span-text">{eachComment.userName}</span>{' '}
                  {eachComment.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="created-at-text">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default PostItem
