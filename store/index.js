const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    token: null,
    userId: null,
    userInfo: null
  }
}
export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setEmail(state, email) {
    state.email = email
  }
}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let token = null
    let userId = null
    let userInfo = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        token = parsed._t
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setToken', token)
    commit('setUserId', userId)
    commit('setUserInfo', userInfo)
  }
}
