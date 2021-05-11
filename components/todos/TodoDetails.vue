<template>
	<div
		v-if="shown"
		class="absolute top-0 left-0 bg-black bg-opacity-40 w-screen h-screen"
		@click="$emit('close')"
	>
		<div class="relative w-full h-screen">
			<article
				class="absolute top-0 right-0 h-screen w-full md:w-[480px] bg-white border-l-2 border-gray-200 py-10 px-6 overflow-y-auto space-y-2 flex flex-col"
				@click.stop=""
			>
				<div class="flex justify-end items-center pb-2">
					<TodoAttributes
						:is-important="isImportant"
						:is-daily="isDaily"
						:is-completed="isCompleted"
						:is-approved="isApproved"
						:is-personal="isPersonal"
						:partner="partner"
					/>
					<div class="ml-auto flex items-center gap-2">
						<BaseButton
							v-if="todoId"
							v-tooltip.bottom="'Details'"
							square
							mode="cta"
							link
							:to="{ path: `/todo/${todoId}` }"
						>
							<IconLink />
						</BaseButton>
						<BaseButton
							v-if="todoId && !isApproved"
							v-tooltip.bottom="'Edit'"
							class="flex items-center group"
							square
							mode="fill"
							@click="toEdit = !toEdit"
						>
							<IconEdit />
						</BaseButton>
					</div>
				</div>

				<div class="space-y-4">
					<div class="flex justify-between items-end gap-2">
						<h2
							v-if="isNewTodo && !title"
							class="text-3xl font-bold ml-1"
						>
							New todo
						</h2>
						<h2 v-else class="text-3xl font-bold ml-1">
							{{ title }}
						</h2>
						<p
							v-if="!isNewTodo"
							class="text-xs text-gray-300 flex items-center gap-1 flex-shrink-0"
						>
							<IconClock />
							{{ createdAt }}
						</p>
					</div>
					<div
						v-if="description"
						class="bg-gray-50 rounded-lg p-4 text-sm"
					>
						<p>{{ description }}</p>
					</div>
					<!-- todo extract todo categories, not all -->
					<!-- <div>
						<BaseTag v-for="tag in categories" :key="tag.name">
							{{ tag.name }}
						</BaseTag>
					</div> -->
				</div>

				<!-- todo animation  -->
				<div v-if="toEdit || isNewTodo">
					<div class="mt-10 flex flex-col gap-8">
						<div class="flex gap-4 items-center justify-between">
							<vs-input
								v-model="title"
								label-placeholder="Title"
							/>
							<vs-input
								v-model="description"
								label-placeholder="Description"
							/>
						</div>
						<div class="flex gap-4 justify-between items-center">
							<div class="ml-2">
								<vs-checkbox
									v-model="isPersonal"
									:color="'#34D399'"
								>
									Personal
								</vs-checkbox>
							</div>
							<div>
								<vs-select
									v-if="partners.length > 0"
									v-model="selectedPartner"
									filter
									label-placeholder="Choose partner"
									:disabled="!!isPersonal"
								>
									<vs-option
										v-for="(
											partnerOption, index
										) in partners"
										:key="partnerOption.username"
										:label="partnerOption.username"
										:value="index + 1"
									>
										<div class="flex items-center gap-2">
											<BaseAvatar
												size="xs"
												:src="partnerOption.photo"
											/>
											<p class="text-sm font-medium">
												{{ partnerOption.username }}
											</p>
										</div>
									</vs-option>
								</vs-select>
							</div>
						</div>
						<div class="flex gap-4 justify-between items-center">
							<div class="ml-3">
								<p>Categories</p>
							</div>
							<vs-select
								v-model="selectedCategories"
								filter
								multiple
							>
								<vs-option
									v-for="(category, index) in categories"
									:key="category.id"
									:label="category.name"
									:value="index + 1"
								>
									{{ category.name }}
								</vs-option>
							</vs-select>
						</div>
						<div>
							<vs-checkbox
								v-model="isImportant"
								:color="'#FBBF24'"
								class="ml-2"
							>
								Important
							</vs-checkbox>
							<vs-checkbox
								v-model="isDaily"
								:color="'#60A5FA'"
								class="ml-2"
							>
								Repeats daily
							</vs-checkbox>
						</div>

						<div>
							<div v-if="isNewTodo">
								<BaseButton mode="cta" @click="addNewTodo">
									<IconPlus size="sm" />
									Add
								</BaseButton>
							</div>
							<div v-else class="flex items-center gap-2">
								<BaseButton mode="fill" @click="updateTodoInfo">
									Update
									<IconEdit size="sm" />
								</BaseButton>
								<BaseButton mode="warn" @click="deleteCurrTodo">
									Delete
									<IconTrash size="sm" />
								</BaseButton>
							</div>
						</div>
					</div>
				</div>

				<!-- todo - put on bottom -->
				<div v-else>
					<div v-if="todoId" class="space-y-4">
						<MarkAsCompleteButton
							:is-completed="isCompleted"
							:todo="todo"
							@toggle-completed="toggleCompleted"
						/>
						<UploadBox
							:is-completed="isCompleted"
							:todo-id="todo.id"
							:todo-photo="todo.photo"
						/>
					</div>
				</div>
			</article>
		</div>
	</div>
</template>

<script>
import IconPlus from 'icons/IconPlus';
import IconEdit from 'icons/IconEdit';
import IconTrash from 'icons/IconTrash';
import IconLink from 'icons/IconLink';
import IconClock from 'icons/IconClock';
import BaseAvatar from 'UI/BaseAvatar';
import BaseButton from 'UI/BaseButton';
// import BaseTag from 'UI/BaseTag';
import TodoAttributes from 'todos/TodoAttributes';
import UploadBox from '@/components/todo/UploadBox';
import MarkAsCompleteButton from '@/components/todo/MarkAsCompleteButton';

import { mapGetters, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
	components: {
		MarkAsCompleteButton,
		TodoAttributes,
		BaseButton,
		UploadBox,
		// BaseTag,
		IconPlus,
		IconEdit,
		IconTrash,
		IconLink,
		IconClock,
		BaseAvatar,
	},
	props: {
		todoId: {
			type: String,
			required: false,
			default: null,
		},
	},
	emits: ['close'],
	data() {
		return {
			// select values start from 1
			inputColor: '#1E293B',
			shown: true,
			option: true,
			title: '',
			description: '',
			selectedPartner: '',
			selectedCategories: [],
			isDaily: false,
			isPersonal: false,
			isImportant: false,
			isApproved: false,
			isCompleted: false,
			todo: null,
			toEdit: false,
		};
	},
	computed: {
		...mapGetters(['currentUserPartners', 'categories']),
		...mapGetters('todos', ['getCurrentUserTodoById']),

		partners() {
			return this.currentUserPartners;
		},
		partner() {
			if (!this.isPersonal && this.selectedPartner) {
				return this.partners[this.selectedPartner - 1];
			}
			return null;
		},
		isNewTodo() {
			return !this.todoId;
		},
		createdAt() {
			const dt = dayjs(this.todo.timestamp);
			const date = dt.format(`MMMM DD`);
			const time = dt.format(`HH:mm`);
			return `${date} at ${time}`;
		},
		completedColor() {
			if (this.isCompleted) {
				return [
					'bg-green-300 text-green-900 hover:bg-green-400 focus:border-green-300 focus:ring-green-200',
				];
			} else {
				return [
					'bg-amber-300 text-amber-900 hover:bg-amber-400 focus:border-amber-300 focus:ring-amber-200',
				];
			}
		},
	},
	watch: {
		isCompleted(newValue) {
			this.updateTodo({
				...this.todo,
				id: this.todoId,
				done: newValue,
			});
		},
		isPersonal(newValue) {
			if (newValue) {
				this.selectedPartner = 0;
			}
		},
	},
	created() {
		if (this.todoId) {
			this.todo = this.getCurrentUserTodoById(this.todoId);
			this.title = this.todo.name;
			this.description = this.todo.desc;
			this.isDaily = this.todo.daily;
			this.isImportant = this.todo.important;
			this.isApproved = this.todo.approved;
			this.isPersonal = !this.todo.partner;
			this.isCompleted = this.todo.done;

			// reusat sa partner computed
			const partnerUsernames = this.partners.map((p) => p.username);
			const partnerIndex = partnerUsernames.indexOf(this.todo.partner);
			const partnerOption = partnerIndex !== -1 ? partnerIndex + 1 : '';

			this.selectedPartner = partnerOption;
			this.selectedCategories = this.categoryIdToIndex();
		} else {
			this.title = '';
			this.description = '';
			this.isDaily = false;
			this.isImportant = false;
			this.isApproved = false;
			this.isPersonal = true;
			this.isCompleted = false;
			this.selectedPartner = '';
			this.selectedCategories = [];
		}
	},
	methods: {
		...mapActions('todos', ['addTodo', 'updateTodo', 'deleteTodo']),
		toggleCompleted() {
			console.log('toggle');
			this.isCompleted = !this.isCompleted;
		},
		addNewTodo() {
			if (!this.title) return;
			const newTodo = this.extractTodoInfo();
			this.addTodo(newTodo);
			this.$emit('close');
		},
		updateTodoInfo() {
			if (!this.title) return;
			const updatedTodo = {
				...this.extractTodoInfo(),
				id: this.todoId,
			};
			this.updateTodo(updatedTodo);
			this.$emit('close');
		},
		deleteCurrTodo() {
			this.deleteTodo({ id: this.todoId, partner: this.partner });
			this.$emit('close');
		},
		isCategorySelected(index) {
			return index in this.categoryIdToIndex();
		},
		extractTodoInfo() {
			return {
				name: this.title,
				desc: this.description || '',
				categories: this.extractCategories(),
				timestamp: Date.now(),
				done: this.isCompleted,
				approved: false,
				daily: this.isDaily,
				important: this.isImportant,
				partner: this.extractPartnerUsername(),
			};
		},
		extractCategories() {
			const categories = [];
			for (const categorySelection of this.selectedCategories) {
				categories.push(this.categories[categorySelection - 1].id);
			}
			return categories;
		},
		extractPartnerUsername() {
			let partnerUsername = '';
			if (!this.isPersonal) {
				if (!this.selectedPartner) {
					this.isPersonal = true;
				} else {
					partnerUsername = this.currentUserPartners[
						this.selectedPartner - 1
					].username;
				}
			}
			return partnerUsername;
		},
		categoryIdToIndex() {
			const selected = [];
			const categoriesIds = this.categories.map((cat) => cat.id);
			for (const categoryId of this.todo.categories) {
				selected.push(categoriesIds.indexOf(categoryId) + 1);
			}
			return selected;
		},
	},
};
</script>
