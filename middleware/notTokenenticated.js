export default function ({ store, redirect }) {
  console.log(store.state.token, 111)
  if (store.state.token) {
    return redirect('/')
  }
}
