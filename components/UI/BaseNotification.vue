<template>
	<div>
		<div v-if="request" class="flex items-start gap-4 group w-full">
			<div class="p-2 rounded-full bg-red-100" :class="`bg-red-100`">
				<slot name="icon">
					<IconUser class="text-red-500" :class="`text-red-600`" />
				</slot>
			</div>
			<div class="flex flex-col gap-y-1 flex-1">
				<div class="flex justify-between">
					<h3 class="font-bold">Request</h3>
				</div>
				<div class="text-xs text-gray-500 group-hover:text-gray-700">
					<slot />
				</div>
			</div>
			<div v-if="options" class="flex justify-center items-center">
				<BaseButton v-tooltip.bottom="'Accept'" square @click="accept">
					<IconCheck
						size="sm"
						class="text-coolGray-500 hover:text-green-500"
					/>
				</BaseButton>

				<BaseButton
					v-tooltip.bottom="'Decline'"
					square
					@click="decline"
				>
					<IconExit
						size="sm"
						class="text-coolGray-500 hover:text-red-500"
					/>
				</BaseButton>
			</div>
		</div>
		<div v-else class="flex items-start gap-4 group w-full">
			<div
				class="p-2 rounded-full bg-blue-100"
				:class="`bg-${color}-100`"
			>
				<slot name="icon">
					<IconBell
						class="text-blue-500"
						:class="`text-${color}-600`"
					/>
				</slot>
			</div>
			<div class="flex flex-col gap-y-1 flex-1">
				<div class="flex justify-between">
					<h3 class="font-bold">Notification</h3>
				</div>
				<div class="text-xs text-gray-500 group-hover:text-gray-700">
					<slot />
				</div>
			</div>
			<BaseButton
				v-if="options"
				v-tooltip.bottom="'Delete'"
				square
				@click="deleteNot"
			>
				<IconTrash size="sm" class="text-grey-700 hover:text-red-500" />
			</BaseButton>
		</div>
	</div>
</template>

<script>
import IconBell from 'icons/IconBell.vue';
import IconUser from 'icons/IconUser.vue';
import { mapActions } from 'vuex';
import IconCheck from '../app_icons/IconCheck';
import IconExit from '../app_icons/IconExit';
import IconTrash from '../app_icons/IconTrash';
import BaseButton from './BaseButton';

export default {
	components: {
		IconTrash,
		IconExit,
		BaseButton,
		IconCheck,
		IconBell,
		IconUser,
	},
	props: {
		color: {
			type: String,
			required: false,
			default: 'blue',
		},
		request: {
			type: Boolean,
			required: false,
			default: false,
		},
		notId: {
			type: String,
			required: true,
		},
		partner: {
			type: String,
			required: false,
			default: '',
		},
		options: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	data() {
		return {
			executed: false,
		};
	},
	methods: {
		...mapActions('notifications', [
			'deleteNotification',
			'acceptPartnerRequest',
			'declinePartnerRequest',
		]),
		deleteNot() {
			this.deleteNotification(this.notId);
		},
		accept() {
			if (!this.executed) {
				this.executed = true;
				this.acceptPartnerRequest({
					id: this.notId,
					partner: this.partner,
				});
			}
		},
		decline() {
			this.declinePartnerRequest({
				id: this.notId,
				partner: this.partner,
			});
		},
	},
};
</script>
