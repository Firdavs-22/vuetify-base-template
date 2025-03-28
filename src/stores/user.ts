import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useRouter} from "vue-router";

interface User {
  id: number
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const router = useRouter()

  const loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user')
    if (user) {
      user.value = JSON.parse(userData!) as User
    }
  }

  const fetchUser = async () => {
    user.value = {
      id: 1,
      name: 'Eduardo',
      email: 'eduardo@gmail.com',
    }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const getUser = (): User => {
    if (user.value) return user.value
    loadUserFromLocalStorage()
    if (!user.value) fetchUser().then(() => {
      console.log('User fetched')
    }).catch(() => {
        router.push('/login')
    })
    if (!user.value) throw new Error('User not found')
    return user.value
  }

  return {
    getUser,
  }
})
