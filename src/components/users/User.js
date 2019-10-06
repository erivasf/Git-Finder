import React, {useEffect, useContext} from 'react'
import Loading from '../layout/Loading'
import {Link} from 'react-router-dom'
import Repos from '../repos/Repos'
import GithubContext from '../../context/github/githubContext'

const User = ({match}) => {
  const githubContext = useContext(GithubContext)

  const {searchUser, loading, user, searchUsersRepos, repos} = githubContext

  useEffect(()=> {
     searchUser(match.params.login)
     searchUsersRepos(match.params.login)
     // eslint-disable-next-line
  }, [])

    const {
      name, 
      avatar_url,
      location,
      bio,
      blog, 
      login,
      html_url,
      followers,
      following, 
      public_repos, 
      public_gists, 
      hireable,
      company
    } = user
    
    if(loading) return <Loading/>
    return (
      <div>
        <Link to="/" className="btn btn-light">Back</Link>
        Hierabale: {''}
        {hireable ? < i className = "fas fa-check text-success" > < /i> :  <i className="fas fa-times-circle text-danger"></i>} 
        <div className="card grid-2">
          <div className="all-center">
            <img src={avatar_url} className="round-img" alt="" style={{width:"15vw"}}/>
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && <div>
              <h3>Bio</h3>
              <p>{bio}</p>
            </div>
            }
            <a href={html_url} className="btn btn-dark my-1"> <i className="fab fa-github"/> Visit Github Profile</a>
            <ul>
              <li>
                {login && (<div>
                  <strong>Username: {login}</strong>
                </div>)}
              </li>
              <li>
                {company && (<div>
                  <strong>Company: {company}</strong>
                </div>)}
              </li>
              <li>
                {blog && (<div>
                  <strong>Website: </strong>  {blog}
                </div>)}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary"> Followers: {followers}</div>
          <div className="badge badge-success"> Following: {following}</div>
          <div className="badge badge-light"> Public Repos: {public_repos}</div>
          <div className="badge badge-dark"> Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos}/>
      </div>
    )
}

export default User
