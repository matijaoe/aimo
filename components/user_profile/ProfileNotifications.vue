<template>
	<!-- todo clamp -->
	<div class="overflow-hidden">
		<BaseContainer
			fieldset
			label="Notifications"
			class="p-2 overflow-y-auto custom-height"
		>
			<p
				class="px-5 font-medium text-center"
				:class="{ 'mb-3': notifyCount > 0 }"
			>
				You have
				<span
					v-if="notifyCount"
					class="
						font-bold
						mx-0.5
						text-amber-500 text-base
						transition
						p-2
						bg-amber-100
						w-9
						h-9
						inline-grid
						rounded-full
						place-content-center
					"
				>
					{{ notifyCount }}
				</span>
				<span v-else>no</span>
				new notification{{ notifyCount === 1 ? '' : 's' }}
			</p>
			<ul class="space-y-2">
				<li
					v-for="notification in notifications"
					:key="notification.id"
					class="p-3 rounded-lg bg-gray-50"
				>
					<BaseNotification
						:not-id="notification.id"
						:request="notification.type === 'request'"
						color="blue"
						:partner="
							notification.partner ? notification.partner : ''
						"
						options
					>
						<p>{{ notification.message }}</p>
					</BaseNotification>
				</li>
			</ul>
		</BaseContainer>
	</div>
</template>

<script>
import BaseContainer from 'UI/BaseContainer.vue';
import BaseNotification from 'UI/BaseNotification.vue';

export default {
	components: { BaseContainer, BaseNotification },
	props: ['notifications'],
	computed: {
		notifyCount() {
			return this.notifications?.length || 0;
		},
	},
};
</script>
