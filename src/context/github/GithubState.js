import React, {useReducer} from 'react'
import axios from 'axios'
import GitHubContext from './githubContext'
import GitHubReducer from './githubReducer'
import {SEARCH_USER,SEARCH_USERS,SEARCH_USERS_REPOS,CLEAR_USERS,SET_LOADING} from '../types'

let githubClientId
let githubClientSecret

if(process.env.NODE_ENV !== 'production'){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
}else{
  githubClientId = process.env.GITHUB_CLIENT_ID
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}
const GithubState = props => {
  const initialState = {
    users: [],
    user: {}, 
    repos: [],
    loading: false
   } 

    const [state, dispatch] = useReducer (GitHubReducer, initialState)

   const searchUsers = async text => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
      client_id=${githubClientId}
      &
      client_secret=${githubClientSecret}`
    )
    dispatch({
      type:SEARCH_USERS,
      payload: res.data.items
    })
   }

  const searchUser = async username => {
     setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}?
      client_id=${githubClientId}
      &
      client_secret=${githubClientSecret}`
    )
    dispatch({
      type: SEARCH_USER,
      payload: res.data
    })
  }

  const searchUsersRepos = async username => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
      client_id=${githubClientId}
      &
      client_secret=${githubClientSecret}`
    )
    dispatch({
      type: SEARCH_USERS_REPOS,
      payload: res.data
    })
  }
  const clearUsers = () => dispatch({type:CLEAR_USERS})
   
  const setLoading = () => dispatch({type: SET_LOADING})

  return <GitHubContext.Provider 
  value = {{
    users: state.users,
    user: state.user,
    repos: state.repos,
    loading: state.loading,
    searchUsers,
    clearUsers,
    searchUser,
    searchUsersRepos
  }}
  >
  {props.children}
  </GitHubContext.Provider>
}

export default GithubState 