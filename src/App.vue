<script setup lang="ts">
import { onMounted, ref } from 'vue';
import QuotaFormDialog from './components/QuotaFormDialog.vue';
import { useUsersFlightsStore, type User } from './stores/usersFlights';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const usersFlightsStore = useUsersFlightsStore();
const dialog = ref(false);
const editedUser = ref<User | null>(null);

const openDialog = (user: User) => {
  dialog.value = true;
  editedUser.value = user;
}

onMounted(() => {
  usersFlightsStore.generateRandomUsers();
});
</script>

<template>
  <QuotaFormDialog v-if="editedUser" :user="editedUser!" v-model:dialog="dialog" />
  <Toast />
  <div class="w-full h-screen flex flex-col justify-center items-center gap-4">
    <DataTable :value="usersFlightsStore.users" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
      :totalRecords="usersFlightsStore.users.length">
      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column field="flights" header="Flights" />
      <Column field="actions" header="Actions">
        <template #body="{ data }">
          <Button @click="openDialog(data)" icon="pi pi-pencil" rounded text />
        </template>
      </Column>
    </DataTable>
  </div>

</template>

<style scoped></style>
