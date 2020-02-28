export default function ({ store, redirect }) {
    console.log('EXECUTING AUTH MIDDLEWARE: ', store);
    if (!store.state.user) {
        redirect('/login')
    }
  }