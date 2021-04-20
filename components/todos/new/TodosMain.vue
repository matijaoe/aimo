<template>
	<div class="text-xl font-light">
		<ul>
			<li>
				<TodoItem color="amber">osisati se</TodoItem>
			</li>
			<li>
				<TodoItem color="amber" :completed="true">
					citati knjigu
				</TodoItem>
			</li>
			<li>
				<TodoItem color="amber" :completed="true">
					voziti bicikl
				</TodoItem>
			</li>
			<li>
				<TodoItem color="amber" :completed="false">
					voziti traktor
				</TodoItem>
			</li>
			<li>
				<TodoItem color="amber" :completed="true">bench</TodoItem>
			</li>
			<li>
				<TodoItem color="amber">react</TodoItem>
			</li>
			<li>
				<TodoItem color="amber" :completed="true">nuxt</TodoItem>
			</li>
			<li>
				<TodoItem color="amber">naucit baze</TodoItem>
			</li>
			<li>
				<TodoItem color="amber" :completed="true">
					pljuvat superligu
				</TodoItem>
			</li>
			<li>
				<TodoItem color="amber">obavit tjelesni</TodoItem>
			</li>
			<li>
				<TodoItem color="amber">napravit mreze</TodoItem>
			</li>
			<li>
				<TodoItem color="amber">kodirat aimo</TodoItem>
			</li>
			<li>
				<TodoItem color="amber">istrazit faxove</TodoItem>
			</li>
		</ul>
	</div>
</template>

<script>
import TodoItem from 'todos/new/TodoItem.vue';
export default {
	components: { TodoItem },
};
</script>
