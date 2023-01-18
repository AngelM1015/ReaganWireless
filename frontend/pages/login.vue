<script lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  name: 'login',

  data: () => ({
    login: true,
    forgotPass: false,
    loading: false,
    resetLoading: false,
    formData: {
      email: '',
      phone: '',
      password: '',
      name: '',
    },
  }),
  methods: {
    updateView() {
      this.login = !this.login
      this.resetFormData()
    },
    resetFormData() {
      this.formData = {
        email: '',
        password: '',
        name: '',
      }
    },
    handleReset() {
      this.resetLoading = true
      let { email } = this.formData
      this.authStore.resetPassword({
        email,
        onComplete: (completeStatus: boolean) => {
          if (completeStatus) {
            this.resetLoading = false
          }
        },
      })
    },
    handleSubmit() {
      this.loading = true
      if (this.login) {
        let { email, password } = this.formData
        this.authStore.login({
          email,
          password,
          onComplete: (completeStatus: boolean) => {
            if (completeStatus) {
              this.$router.push('/auction')
            }
            this.loading = false
          },
        })
      } else {
        this.authStore.register({
          ...this.formData,
          onComplete: (completeStatus: boolean) => {
            if (completeStatus) {
              this.login = true
              this.resetFormData()
            }
            this.loading = false
          },
        })
      }
    },
  },
  components: {},
})
</script>
<template>
  <div class="custom-gradient--login">
    <div class="flex flex-col items-center py-6 px-6 py-8 mx-auto">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <span v-if="!forgotPass">
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl" v-if="login == true">Sign in to your account</h1>
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl" v-else>Create new account</h1>
          </span>
          <span v-if="forgotPass">
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">Reset Your Password</h1>
          </span>

          <form v-if="!forgotPass" class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit()">
            <div v-if="!login">
              <label for="email" class="block mb-2 text-sm font-medium">Name</label>
              <input
                v-model="formData.name"
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus-visible:ring-blue-600 block w-full p-2.5"
                placeholder="John Smith"
                required
              />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium">Email</label>
              <input
                v-model="formData.email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus-visible:ring-blue-600 block w-full p-2.5"
                placeholder="name@email.com"
                required
              />
            </div>
            <div v-if="!login">
              <label for="phone" class="block mb-2 text-sm font-medium">Phone No</label>
              <input
                v-model="formData.phone"
                type="text"
                name="phone"
                id="phone"
                class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus-visible:ring-blue-600 block w-full p-2.5"
                placeholder="000-000-000"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium">Password</label>
              <input
                v-model="formData.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus-visible:ring-blue-600 block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span v-if="loading"
                ><svg class="inline mr-2 w-4 h-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  /></svg
              ></span>
              <span v-else-if="login"> Sign in </span>
              <span v-else> Sign up </span>
            </button>
            <small v-if="login" @click="forgotPass = !forgotPass" class="text-gray-400 cursor-pointer"> Forgot password? </small>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              <span v-if="login"> Don’t have an account yet? </span>
              <span v-else>Already have an account yet? </span>
              <span class="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer" @click="() => updateView()">
                <span v-if="login"> Sign up </span>
                <span v-else> Login </span>
              </span>
            </p>
          </form>

          <form v-if="forgotPass" @submit.prevent="handleReset()">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium">Email</label>
              <input
                v-model="formData.email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus-visible:ring-blue-600 block w-full p-2.5"
                placeholder="name@email.com"
                required
              />
              <button
                type="submit"
                class="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span v-if="resetLoading"
                  ><svg class="inline mr-2 w-4 h-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    /></svg
                ></span>
                <span v-else> Reset Password </span>
              </button>
            </div>

            <small v-if="login" @click="forgotPass = !forgotPass" class="text-gray-400 cursor-pointer"> Sign In? </small>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-gradient--login {
  background: linear-gradient(133deg, #1452b7 20%, #142484 50%, #08103e 100%);
}
</style>
