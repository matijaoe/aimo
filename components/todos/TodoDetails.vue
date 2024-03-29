<template>
	<div
		v-if="shown"
		class="
			absolute
			top-0
			left-0
			bg-black bg-opacity-40
			w-screen
			max-h-screen
		"
		@click="$emit('close')"
	>
		<div class="relative w-full h-screen">
			<article
				class="
					absolute
					top-0
					right-0
					h-screen
					w-full
					md:w-[480px]
					bg-white
					border-l-2 border-gray-200
					py-10
					px-6
					overflow-y-auto
					space-y-4
					flex flex-col
				"
				@click.stop=""
			>
				<div
					class="
						flex flex-col
						gap-y-5
						xs:flex-row
						justify-end
						items-center
						pb-2
					"
				>
					<TodoAttributes
						:is-important="isImportant"
						:is-daily="isDaily"
						:is-completed="isCompleted"
						:is-approved="isApproved"
						:is-personal="isPersonal"
						:partner="partner"
						class="order-2 xs:order-1"
					/>
					<div
						class="
							ml-auto
							flex
							items-center
							gap-2
							order-1
							xs:order-2
						"
					>
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
						<BaseButton
							v-tooltip.bottom="'Close'"
							class="flex items-center group"
							square
							mode="warn"
							@click="$emit('close')"
						>
							<IconExit />
						</BaseButton>
					</div>
				</div>

				<div class="space-y-4">
					<div
						class="
							flex flex-col
							sm:flex-row sm:justify-between
							items-center
							sm:items-end
							gap-y-4
							sm:gap-2
						"
					>
						<h2
							v-if="isNewTodo && !title"
							class="text-3xl font-bold ml-1"
						>
							New todo
						</h2>
						<h2 v-else class="text-3xl font-bold ml-1">
							{{ title }}
						</h2>
						<BaseTimestamp v-if="!isNewTodo" :date="createdAt" />
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
						<div
							class="
								flex flex-col
								xs:flex-row
								gap-y-8
								xs:gap-4
								items-start
								xs:items-center
								justify-between
							"
						>
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
						<div
							v-if="isNewTodo"
							class="flex gap-4 justify-between items-center"
						>
							<div class="ml-3">
								<p>Deadline</p>
							</div>
							<vs-input
								v-model="due"
								type="date"
								:label="validDates"
							>
								<template v-if="invalidDueDate" #message-danger>
									Invalid date.
								</template>
							</vs-input>
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
							v-if="!isApproved && !todo.photoName"
							:is-completed="isCompleted"
							:todo="todo"
							@toggle-completed="toggleCompleted"
						/>
						<UploadBox
							:is-completed="isCompleted"
							:is-approved="isApproved"
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
import IconExit from 'icons/IconExit';
import IconEdit from 'icons/IconEdit';
import IconTrash from 'icons/IconTrash';
import IconLink from 'icons/IconLink';
import BaseTimestamp from 'UI/BaseTimestamp';

import BaseAvatar from 'UI/BaseAvatar';
import BaseButton from 'UI/BaseButton';
// import BaseTag from 'UI/BaseTag';
import TodoAttributes from 'todos/TodoAttributes';
import { mapGetters, mapActions } from 'vuex';
import dayjs from 'dayjs';
import UploadBox from '@/components/todo/UploadBox';
import MarkAsCompleteButton from '@/components/todo/MarkAsCompleteButton';

export default {
	components: {
		MarkAsCompleteButton,
		TodoAttributes,
		BaseButton,
		UploadBox,
		// BaseTag,
		IconPlus,
		IconExit,
		IconEdit,
		IconTrash,
		IconLink,
		BaseTimestamp,
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
			due: '',
			invalidDueDate: false,
			created_at: null,
			dueDate: null,
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
			const dt = dayjs.unix(this.todo.created_at.seconds);
			const date = dt.format(`MMMM Do`);
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
		validDates() {
			const today = dayjs();
			return `First Valid Date: ${today.$D + 1}.${
				today.$M + 1
			}.${today.$d.getFullYear()}`;
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
		due() {
			this.checkDueDate();
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
			this.created_at = this.todo.created_at;
			this.dueDate = this.todo.due;

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
		checkDueDate() {
			if (
				this.due === '' ||
				dayjs(this.due).diff(
					`${dayjs().$y}-${dayjs().$M}-${dayjs().$D}`
				) < 2764800000
			) {
				this.invalidDueDate = true;
				return;
			}
			this.invalidDueDate = false;
		},
		toggleCompleted() {
			this.isCompleted = !this.isCompleted;
		},
		addNewTodo() {
			this.checkDueDate();
			if (!this.title || this.invalidDueDate) return;
			const newTodo = {
				...this.extractTodoInfo(),
				numberOfLikes: 0,
				likedByUsers: [],
			};
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
				created_at: this.created_at || dayjs().$d,
				due: this.dueDate || dayjs(this.due).$d,
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
					partnerUsername =
						this.currentUserPartners[this.selectedPartner - 1]
							.username;
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
