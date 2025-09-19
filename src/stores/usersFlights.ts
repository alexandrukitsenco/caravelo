import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export interface User {
  id: number
  name: string
  email: string
  flights: number
}

export const useUsersFlightsStore = defineStore('usersFlights', () => {
  const users = ref<User[]>([])
  const toast = useToast()

  const generateRandomUsers = (count = 100) => {
    const names = [
      'Ana García', 'Carlos López', 'María Rodríguez', 'José Martínez', 'Laura Sánchez',
      'Miguel González', 'Carmen Fernández', 'Antonio Pérez', 'Isabel Jiménez', 'Francisco Ruiz',
      'Elena Díaz', 'Manuel Herrera', 'Pilar Moreno', 'Javier Muñoz', 'Rosa Álvarez',
      'Pedro Romero'
    ]
    
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'live.com']
    
    const randomUsers: User[] = []
    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)]
      const randomDomain = domains[Math.floor(Math.random() * domains.length)]
      const email = `${randomName.toLowerCase().replace(' ', '.')}@${randomDomain}`
      
      randomUsers.push({
        id: i + 1,
        name: randomName,
        email,
        flights: Math.floor(Math.random() * 10) + 1
      })
    }
    
    users.value = randomUsers
    return randomUsers
  }

  const updateUserFlights = async (user: User, value: number) => {
    try {
      await fetch('https://mock.httpstatus.io/200')
      users.value = users.value.map(u => u.id === user.id ? { ...u, flights: u.flights + value } : u)
      toast.add({ severity: 'success', summary: 'Success', detail: 'Flights updated successfully', life: 3000 })
    } catch {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error updating flights', life: 3000 })
    }
  }

  return { users, generateRandomUsers, updateUserFlights }
})
