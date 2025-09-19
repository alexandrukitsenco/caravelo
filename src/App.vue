<script setup lang="ts">
import { onMounted } from 'vue';
import QuotaFormDialog from './components/QuotaFormDialog.vue';
import { useFlightsStore } from './stores/flights';
import Toast from 'primevue/toast';

const flightsStore = useFlightsStore();

onMounted(() => {
  flightsStore.randomizedFlights();
});
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center gap-4">
    <h3 class="text-2xl font-bold">Hello Jose Luis, welcome to the Caravelo!</h3>
    <p class="text-lg font-bold">You have {{ flightsStore.flights }} flights</p>
    <QuotaFormDialog />
  </div>
  <Toast />

</template>

<style scoped></style>
