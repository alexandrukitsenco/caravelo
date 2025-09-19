import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export const useFlightsStore = defineStore('flights', () => {
  const flights = ref(0)
  const toast = useToast()

  const randomizedFlights = () => {
    flights.value = Math.floor(Math.random() * 10)
  }

  const patchFlights = async (value: number) => {
    if (flights.value + value < 0) {
      await fetch('https://mock.httpstatus.io/400')
      toast.add({ severity: 'error', summary: 'Error', detail: 'You cannot have less than 0 flights', life: 3000 })
      return
    }
    flights.value = flights.value + value
    await fetch('https://mock.httpstatus.io/200')
    toast.add({ severity: 'success', summary: 'Success', detail: 'Flights updated successfully', life: 3000 })
  }


  return { flights, randomizedFlights, patchFlights }
})
