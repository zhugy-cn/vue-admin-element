export default {
  token: state => state.user.token,
  globalLoading: state => state.app.globalLoading,
  loadingMessage: state => state.app.loadingMessage,
  sideStatus: state => state.app.sideStatus,
  tagsList: state => state.tagsNav.tagsList,
}