<template>
	<div class="grid grid-cols-2 gap-4">
		<div class="flex items-center gap-2 col-span-2">
			<h1 class="text-2xl font-bold">Todo: {{ todo.title }}</h1>
			<IconStar v-if="todo.favorite" class="animate-bounce" />
		</div>
		<TodoInfoCard class="row-span-2" :todo="todo" />
		<TodoPartnerCard :partner="partner" />
		<TodoDescCard :desc="todo.desc" />
	</div>
</template>

<script>
import IconStar from 'icons/IconStar';
import TodoPartnerCard from './TodoPartnerCard';
import TodoInfoCard from './TodoInfoCard';
import TodoDescCard from './TodoDescCard';

export default {
	components: { IconStar, TodoDescCard, TodoInfoCard, TodoPartnerCard },
	props: {
		todo: {
			type: Object,
			required: true,
		},
		partner: {
			type: Object,
			required: false,
		},
	},
};
</script>
