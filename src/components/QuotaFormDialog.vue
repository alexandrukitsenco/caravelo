<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';

const dialog = ref(false);
const numberFlights = ref(0);
const reason = ref();

const addQuotaReasons = [
    { label: 'Subscriber canceled flight', value: 'subscriber_canceled_flight' },
    { label: 'Airline canceled flight', value: 'airline_canceled_flight' },
    { label: 'Customer compensation', value: 'customer_compensation' },
    { label: 'Other', value: 'other_add' }
];

const removeQuotaReasons = [
    { label: 'Flight not redeposited after a flight cancellation', value: 'flight_not_redeposited' },
    { label: 'Subscriber had log in or password issues', value: 'login_password_issues' },
    { label: 'Subscriber had issues when booking', value: 'booking_issues' },
    { label: 'Subscription has not renewed correctly', value: 'subscription_not_renewed' },
    { label: 'Other', value: 'other_remove' }
];

const isAddingQuota = computed(() => numberFlights.value > 0);
const isRemovingQuota = computed(() => numberFlights.value < 0);

const resonOptions = computed(() => {
    if (isAddingQuota.value) {
        return addQuotaReasons;
    } else if (isRemovingQuota.value) {
        return removeQuotaReasons;
    }
    return [];
});

const openDialog = () => {
    dialog.value = true;
}

watch(numberFlights, () => {
    if (numberFlights.value === 0) {
        reason.value = null;
    }
});

watch(dialog, () => {
    if (dialog.value) {
        numberFlights.value = 0;
        reason.value = null;
    }
});

</script>

<template>
    <Button label="Edit Flights" icon="pi pi-pencil" @click="openDialog" />
    <Dialog v-model:visible="dialog" :modal="true">
        <template #header>
            <h3>Quota Form</h3>
        </template>
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">Number of flights:</label>
                <div class="flex flex-row gap-2 items-center w-full">
                    <Button @click="numberFlights--" rounded text icon="pi pi-minus" />
                    <InputNumber v-model="numberFlights" class="w-full" />
                    <Button @click="numberFlights++" rounded text icon="pi pi-plus" />
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">Reason:</label>
                <Select v-model="reason" :options="resonOptions" optionLabel="label" optionValue="value" class="w-full"
                    placeholder="Select a reason" :disabled="resonOptions.length === 0" />
                <small v-if="numberFlights === 0" class="text-gray-500">
                    Add of Decrease flights to see the available reason options
                </small>
            </div>
        </div>

        <template #footer>
            <Button label="Save" />
        </template>
    </Dialog>
</template>