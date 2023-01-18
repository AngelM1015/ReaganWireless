import { defineStore } from 'pinia'
import firebase from '../config/firebase'

type LoginProps = {
  email: string
  password: string
  onComplete: (state: boolean) => {}
}
type ResetProps = {
  email: string
  onComplete: (state: boolean) => {}
}
type RegisterProps = {
  email: string
  password: string
  name: string
  phone: string
  onComplete: (state: boolean) => {}
}
type User = {
  email: string
  name: string
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => {
    return {
      user: {} as User,
      uid: '' as string,
      phone: '' as string,
    }
  },
  actions: {
    login({ email, password, onComplete }: LoginProps) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((authSnapshot) => {
          this.uid = authSnapshot.user?.uid
          this.user = { email: authSnapshot.user?.email, name: authSnapshot.user?.displayName }
            firebase
              .firestore()
              .collection("users")
              .where("email", "==", authSnapshot.user?.email)
              .get().then((snapshot) => {
                for (let doc of snapshot.docs) {
                  this.phone = doc.data().phone as string
                }
              })
          onComplete(true)
        })
        .catch((err) => {
          onComplete(false)
          alert(err.message)
        })
    },
    register({ email, password, name, phone, onComplete }: RegisterProps) {
      firebase
      .firestore()
      .collection("allowed_emails")
      .where("email", "==", email)
      .get().then((snapshot) => {
        if (snapshot.docs.length>0) {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((authSnapshot) => {
          authSnapshot.user
            ?.updateProfile({ displayName: name })
            .then(() => {
              firebase
                .firestore()
                .collection('users')
                .doc(authSnapshot.user?.uid)
                .set({
                  name,
                  email,
                  phone,
                })
                .then(() => {
                  onComplete(true)
                  alert('Registered Successfully!!!')
                })
                .catch((err) => {
                  onComplete(false)
                  alert(err.message)
                })
            })
            .catch((err) => {
              onComplete(false)
              alert(err.message)
            })
        })
        .catch((err) => {
          onComplete(false)
          alert(err.message)
        })
        } else{
          onComplete(false)
         alert("You don't have access to sign up!")
        }
      })
      
    },
    logout(onComplete) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.uid = ''
          this.user = {}
          onComplete()
        })
    },
    resetPassword({ email, onComplete }: ResetProps) {
      firebase
      .auth()
      .sendPasswordResetEmail(email)
        .then(() => {
          alert("Reset email has been sent!");
          onComplete(true)
        }).catch((err) => {
          onComplete(false)
          alert(err.message)
        })
    },
  },
  getters: {
    loggedUid: (state) => state.uid,
    loggedUser: (state) => state.user,
    loggedPhone: (state) => state.phone,
  },
  persist: true,

})
