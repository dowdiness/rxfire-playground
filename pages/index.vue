<template>
  <div class="container">
    <div>
      <h1 class="title">
        rxfire-playground
      </h1>
      <h2 class="subtitle">
        My stunning Nuxt.js project
      </h2>
      <div class="m-4 flex flex-wrap justify-start">
        <input
          v-model="user.profile.familyname"
          class="border-2 border-gray-500 rounded-sm mx-auto mb-4"
          type="text"
        />
        <input
          v-model="user.profile.firstname"
          class="border-2 border-gray-500 rounded-sm mx-auto mb-4"
          type="text"
        />
        <input
          v-model="user.profile.phone"
          class="border-2 border-gray-500 rounded-sm mx-auto mb-4"
          type="text"
        />
        <input
          v-model="user.profile.email"
          class="border-2 border-gray-500 rounded-sm mx-auto mb-4"
          type="text"
        />
      </div>
      <div>
        <button
          class="px-4 py-2 rounded-lg text-blue-700 hover:text-yellow-100 bg-yellow-400 hover:bg-blue-500"
          @click="save"
        >
          SAVE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { tap } from 'rxjs/operators'
// import { collectionData } from 'rxfire/firestore'
import { authState } from 'rxfire/auth'
import firebase from '@/plugins/firebase'
import signInAnonymously from '@/plugins/signInAnonymously'

export default {
  data() {
    return {
      uid: null,
      user: {
        profile: {
          familyname: '',
          firstname: '',
          phone: '',
          email: ''
        }
      }
    }
  },
  mounted() {
    signInAnonymously()
    const auth = firebase.auth()
    authState(auth).subscribe((user) => {
      this.uid = user.uid
    })
  },
  methods: {
    save() {
      firebase
        .firestore()
        .collection('users')
        .doc(this.uid)
        .set(this.user, { merge: true })
        .then(
          () => {
            // eslint-disable-next-line no-console
            console.log('Document successfully written')
          },
          (error) => {
            // eslint-disable-next-line no-console
            console.error('Error adding document: ', error)
          }
        )
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
