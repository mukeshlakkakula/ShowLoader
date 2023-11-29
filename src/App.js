import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class App extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bloggerDetails: {},
    blogPages: {},
    blogPosts: {},
  }

  componentDidMount = () => {
    this.getBlogger()
  }

  getBlogger = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url =
      'https://www.googleapis.com/blogger/v3/blogs/2399953?key=AIzaSyA0SctrE6p6AGiS-nGNuKsHT887i8GxDNM'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        bloggerDetails: data,
        blogPosts: data.posts,
        blogPages: data.pages,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {bloggerDetails, apiStatus, blogPages, blogPosts} = this.state
    console.log(bloggerDetails, apiStatus, blogPages, blogPosts)

    const successView = (
      <div>
        <h3>Blogger :{bloggerDetails.name}</h3>
        <p>{bloggerDetails.description}</p>
        <h3>TotalPages:{blogPages.totalItems}</h3>
        BlogLink: <a href={blogPages.selfLink}>{blogPages.selfLink}</a>
        <h3>totalItems:{blogPosts.totalItems}</h3>
        selfLink : <a href={blogPosts.selfLink}>{blogPosts.selfLink}</a>
        <h6>published : {bloggerDetails.published}</h6>
        <h6>updated : {bloggerDetails.updated}</h6>
      </div>
    )
    const loader = (
      <div>
        <Loader type="ThreeDots" height="50" width="50" />
      </div>
    )
    const failureView = (
      <div>
        <p>Something Went Wrong please Retry!</p>
        <button type="button" onClick={this.getBlogger}>
          Retry
        </button>
      </div>
    )
    let finalView = ''
    switch (apiStatus) {
      case apiStatusConstants.success:
        finalView = successView
        break
      case apiStatusConstants.inProgress:
        finalView = loader
        break
      case apiStatusConstants.failure:
        finalView = failureView
        break

      default:
        return null
    }

    return <div className="blogFullContainer">{finalView}</div>
  }
}

export default App
