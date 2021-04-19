<template>
	<div class="flex items-start gap-4 group w-full">
		<div class="p-2 rounded-full bg-blue-100" :class="`bg-${color}-100`">
			<slot name="icon">
				<IconBell class="text-blue-500" :class="`text-${color}-600`" />
			</slot>
		</div>
		<div class="flex flex-col gap-y-1 flex-1">
			<div class="flex justify-between">
				<h3 class="font-bold">Notification title</h3>
				<span class="text-[10px] opacity-40">{{ '1 day ago' }}</span>
			</div>
			<div class="text-xs text-gray-500 group-hover:text-gray-700">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
import IconBell from 'icons/IconBell.vue';

export default {
	components: { IconBell },
	props: ['color'],
};
</script>
