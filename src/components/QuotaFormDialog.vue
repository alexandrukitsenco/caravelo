<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, not, sameAs } from '@vuelidate/validators';
import { useUsersFlightsStore, type User } from '../stores/usersFlights';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Select from 'primevue/select';


const usersFlightsStore = useUsersFlightsStore();

const props = defineProps<{
    user: User;
}>();

const dialog = defineModel<boolean>('dialog', { required: true });

const numberFlights = ref(0);
const reason = ref();

const rules = computed(() => ({
    numberFlights: {
        required,
        notZero: not(sameAs(0))
    },
    reason: {
        required
    }
}));


const isAddingQuota = computed(() => numberFlights.value > 0);
const isRemovingQuota = computed(() => numberFlights.value < 0);

const addButtonEnabled = computed(() => numberFlights.value < 3);
const removeButtonEnabled = computed(() => numberFlights.value + props.user.flights > 0);

const reasonOptions = computed(() => {
    if (isAddingQuota.value) {
        return addQuotaReasons;
    } else if (isRemovingQuota.value) {
        return removeQuotaReasons;
    }
    return [];
});

const v$ = useVuelidate(rules, { numberFlights, reason });

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

const handleSubmit = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (isFormCorrect) {
        usersFlightsStore.updateUserFlights(props.user, numberFlights.value);
        dialog.value = false;
    }
};

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
    <Dialog v-model:visible="dialog" :modal="true" @hide="dialog = false">
        <template #header>
            <h3 class="text-lg font-medium">Flights Form</h3>
        </template>
        <div class="flex flex-col gap-6 w-3xs">
            <div>
                <h3 class="text-lg font-medium">User: {{ props.user.name }}</h3>
                <p class="text-sm text-gray-500">Flights: {{ props.user.flights }}</p>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">Number of flights:</label>
                <div class="flex flex-row justify-between items-center w-full">
                    <Button @click="numberFlights--" rounded text icon="pi pi-minus" :disabled="!removeButtonEnabled" />
                    <span class="text-xl font-medium">{{ numberFlights }}</span>
                    <Button @click="numberFlights++" rounded text icon="pi pi-plus" :disabled="!addButtonEnabled" />
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">Reason:</label>
                <Select v-model="reason" :options="reasonOptions" optionLabel="label" optionValue="value" class="w-full"
                    placeholder="Select a reason" :disabled="reasonOptions.length === 0" />
                <small v-if="numberFlights === 0" class="text-gray-500">
                    Add of Decrease flights to see the available reason options
                </small>
            </div>
        </div>

        <template #footer>
            <Button label="Save" @click="handleSubmit" :disabled="v$.$invalid" />
        </template>
    </Dialog>
</template>