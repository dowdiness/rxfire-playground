import firebase from '@/plugins/firebase'

const signInAnonymously = function() {
  const currentUser = firebase.auth().currentUser
  if (!currentUser) {
    firebase
      .auth()
      .signInAnonymously()
      .then(
        (user) => {},
        (error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // eslint-disable-next-line no-console
          console.log(errorCode, errorMessage)
        }
      )
  }
}

export default signInAnonymously
