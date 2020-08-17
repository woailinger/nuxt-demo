export default function ({ store, redirect,route}) {
  if (!store.state.token && route.path !== '/login') {
    return redirect('/')
  }
}
