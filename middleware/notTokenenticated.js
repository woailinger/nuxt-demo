export default function ({ store, redirect,route}) {
  let noToken = ['/login', '/register']
  // if (!store.state.token && noToken.indexOf(route.path) == -1) {
  //   return redirect('/')
  // }
}
