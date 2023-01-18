import { defineStore } from 'pinia'
import firebase from '../config/firebase'
import { useAuthStore } from './AuthStore'

type User = {
  name: string
  email: string
}

export type Product = {
  title: string
  price?: string
  images?: File[] | string[]
  description?: string
  id?: string
  user?: User
  added_by?: string
  added_at?: Date
}

export const useAuctionStore = defineStore({
  id: 'auctionStore',
  state: () => {
    return {
      products: 'idle' as Product[] | string,
      product: 'idle' as Product | string,
    }
  },
  actions: {
    async addAuctionProduct(payload: Product, onComplete) {
      const authStore = useAuthStore()
      payload = Object.assign({}, payload)
      let auctionId = firebase.firestore().collection('auctions').doc().id
      let { images } = payload
      let idx = 0
      let tempImages: string[] = []
      for (let image of Array.from(images as File[])) {
        let filename = auctionId + '_' + idx + '.' + (image as File).name.split('.').at(-1)
        let pathRef = `/products/${filename}`
        await firebase
          .storage()
          .ref(pathRef)
          .put(image as File)
        tempImages[idx] = await firebase.storage().ref(pathRef).getDownloadURL()
        idx++
      }
      payload.images = tempImages
      firebase
        .firestore()
        .collection('auctions')
        .add({ ...payload, added_by: authStore.uid, owner_phone: authStore.phone, added_at: firebase.firestore.Timestamp.now() })
        .then(() => {
          onComplete(true)
          alert('Auction Added Successfully')
        })
        .catch((err) => {
          onComplete(false)
          alert(err.message)
        })
    },
    getAuctionProducts() {
      this.products = 'loading'
      firebase
        .firestore()
        .collection('auctions')
        .onSnapshot((snapshot) => {
          let products = [] as Product[]
          for (let doc of snapshot.docs) {
            products.push({ id: doc.id as string, ...(doc.data() as Product), added_at: new Date(doc.data().added_at.toDate()) })
          }
          this.products = products
        })
    },
    getAuctionProduct(uid: string) {
      this.product = 'loading'
      firebase
        .firestore()
        .collection('auctions')
        .doc(uid)
        .get()
        .then(async (snapshot) => {
          let { added_by } = snapshot.data() as Product
          let productData = snapshot.data() as Product
          let userDoc = await firebase.firestore().collection('users').doc(added_by).get()
          let userData = userDoc.data() as User
          this.product = { ...productData, user: userData }
        })
    },
  },
  getters: {
    allProducts: (state) => state.products,
    singleProduct: (state) => state.product,
  },
})
