import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import UserStories from '../UserStories'
import Header from '../Header'
import UserPosts from '../UserPosts'
import SearchResults from '../SearchResults'

const apisStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class Home extends Component {
  state = {
    searchInputValue: '',
    searchResultsList: [],
    searchMode: false,
    apiStatus: apisStatusContants.initial,
  }

  getSearchResults = async () => {
    const {searchInputValue} = this.state
    this.setState({apiStatus: apisStatusContants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const searchUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInputValue}`
    console.log(searchUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(searchUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedSearchPostsLists = data.posts.map(eachPost => ({
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
        apiStatus: apisStatusContants.success,
        searchResultsList: updatedSearchPostsLists,
      })
    } else {
      this.setState({apiStatus: apisStatusContants.failure})
    }
  }

  onChangeSearchValue = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onChangeSearchMode = () => {
    this.setState(prevState => ({
      searchMode: !prevState.searchMode,
    }))
  }

  onActiveDestopSearchMode = () => {
    this.setState({searchMode: true})
    console.log('searchTab clicked')
  }

  onChangeSearchModeOff = () => {
    this.setState({searchMode: false})
  }

  render() {
    const {
      searchMode,
      searchInputValue,
      apiStatus,
      searchResultsList,
    } = this.state
    const pageActive = searchMode ? 'SEARCH' : 'HOME'
    console.log(searchMode)
    return (
      <>
        <Header
          searchInputValue={searchInputValue}
          onChangeSearchModeOff={this.onChangeSearchModeOff}
          onActiveDestopSearchMode={this.onActiveDestopSearchMode}
          onChangeSearchMode={this.onChangeSearchMode}
          getSearchResults={this.getSearchResults}
          onChangeSearchValue={this.onChangeSearchValue}
          pageActive={pageActive}
          searchMode={searchMode}
        />
        {searchMode ? (
          <SearchResults
            getSearchResults={this.getSearchResults}
            onChangeSearchValue={this.onChangeSearchValue}
            searchInputValue={searchInputValue}
            apiStatus={apiStatus}
            searchResultsList={searchResultsList}
          />
        ) : (
          <div className="User-stories-posts-container">
            <UserStories />
            <UserPosts />
          </div>
        )}
      </>
    )
  }
}

export default Home
