<template>
	<div
		v-if="shown"
		class="absolute top-0 left-0 bg-black bg-opacity-40 w-screen h-screen"
		@click="$emit('close')"
	>
		<div class="relative w-full h-screen">
			<article
				class="absolute top-0 right-0 h-screen w-full w-[480px] bg-white border-l-2 border-gray-200 py-10 px-6 overflow-y-auto space-y-2"
				@click.stop="doNothing"
			>
				<!--<div>
									<button
					class="bg-emerald-200 text-emerald-700 py-2 px-4 rounded-lg"
					@click="$emit('close')"
				>
					Zatvori me
				</button>
				</div>-->

				<h4 v-if="isNewTodo" class="text-4xl font-bold">New todo</h4>

				<div class="flex justify-end items-center pb-2">
					<div class="flex items-center gap-4">
						<IconStar
							class="fill-current transition"
							:class="starStyle"
							:fill="isImportant"
						/>
						<IconGlobeAlt
							class="transition"
							:class="isDaily ? 'text-blue-400' : 'text-gray-300'"
						/>
						<IconCheckCircle
							class="transition"
							:class="
								isCompleted
									? 'text-indigo-400'
									: 'text-gray-300'
							"
						/>
						<IconShieldCheck
							class="transition"
							:class="
								isApproved
									? 'text-emerald-400'
									: 'text-gray-300'
							"
						/>
					</div>
					<div class="ml-auto">
						<BaseButton
							v-tooltip.left="'Edit'"
							class="flex items-center group"
							mode="square"
							@click="toEdit = !toEdit"
						>
							<IconEdit
								class="text-gray-300 group-hover:text-gray-700 transition"
							/>
						</BaseButton>
					</div>
				</div>

				<div v-if="!isNewTodo" class="space-y-4">
					<div class="flex justify-between items-baseline">
						<h2 class="text-4xl font-bold ml-1">{{ title }}</h2>
						<p class="text-xs text-gray-300">{{ createdAt }}</p>
					</div>
					<div class="bg-gray-50 rounded-lg p-4 text-sm">
						<p>{{ description }}</p>
					</div>
				</div>

				<div v-if="!isNewTodo" class="mt-8"></div>

				<transition name="fade">
					<div v-if="toEdit || isNewTodo">
						<!-- todo full width inputs -->
						<div class="mt-10 flex flex-col gap-8">
							<div class="flex gap-4">
								<vs-input
									v-model="title"
									label-placeholder="Title"
								/>
								<vs-input
									v-model="description"
									label-placeholder="Description"
								/>
							</div>
							<div
								class="flex gap-4 justify-between items-center"
							>
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
										v-model="selectedPartner"
										filter
										label-placeholder="Choose partner"
										:disabled="!!isPersonal"
									>
										<vs-option
											v-for="(
												partner, index
											) in currentUserPartners"
											:key="partner.username"
											:label="partner.username"
											:value="index + 1"
										>
											<div
												class="flex items-center gap-2"
											>
												<BaseAvatar
													size="xs"
													:src="partner.photo"
												/>
												<p class="text-sm font-medium">
													{{ partner.username }}
												</p>
											</div>
										</vs-option>
									</vs-select>
								</div>
							</div>
							<div
								class="flex gap-4 justify-between items-center"
							>
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
								>
									Important
								</vs-checkbox>
								<vs-checkbox
									v-model="isDaily"
									:color="'#60A5FA'"
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
								<div v-else>
									<BaseButton
										mode="fill"
										@click="updateTodoInfo"
									>
										<IconEdit size="sm" />
										Update
									</BaseButton>
									<BaseButton mode="fill" @click="deleteTodo">
										<IconTrash size="sm" />
										Delete
									</BaseButton>
									<BaseButton
										mode="fill"
										@click="showTodoPage"
									>
										<IconExclamationCircle size="sm" />
										Details
									</BaseButton>
								</div>
							</div>
						</div>
					</div>
				</transition>
				<div v-if="todoId">
					<vs-checkbox v-model="isCompleted" :color="'#818CF8'">
						Completed
					</vs-checkbox>
				</div>

				<div v-if="isCompleted">
					<label class="uppercase ml-1 tracking-wider text-xs">
						Photo
					</label>
					<div
						class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
					>
						<div class="space-y-1 text-center">
							<div class="flex items-center justify-center">
								<IconPhoto size="xl" class="text-gray-300" />
							</div>
							<div class="flex text-sm text-gray-600">
								<label
									for="file-upload"
									class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
								>
									<span>Upload a file</span>
									<input
										id="file-upload"
										name="file-upload"
										type="file"
										class="sr-only"
									/>
								</label>
								<p class="pl-1">or drag and drop</p>
							</div>
							<p class="text-xs text-gray-500">
								PNG, JPG, GIF up to 10MB
							</p>
						</div>
					</div>
				</div>
			</article>
		</div>
	</div>
</template>

<script>
import IconPhoto from 'icons/IconPhoto';
import IconPlus from 'icons/IconPlus';
import IconEdit from 'icons/IconEdit';
import IconTrash from 'icons/IconTrash';
import IconExclamationCircle from 'icons/IconExclamationCircle';
import IconStar from 'icons/IconStar';
import IconShieldCheck from 'icons/IconShieldCheck';
import IconCheckCircle from 'icons/IconCheckCircle';
import IconGlobeAlt from 'icons/IconGlobeAlt';
import BaseAvatar from 'UI/BaseAvatar';
import BaseButton from 'UI/BaseButton';

import { mapGetters } from 'vuex';
import dayjs from 'dayjs';

export default {
	components: {
		BaseButton,
		IconPhoto,
		IconPlus,
		IconEdit,
		IconTrash,
		IconExclamationCircle,
		IconStar,
		IconShieldCheck,
		IconCheckCircle,
		IconGlobeAlt,
		BaseAvatar,
	},
	props: {
		new: {
			type: Boolean,
			required: false,
			default: false,
		},
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
		isNewTodo() {
			return !this.todoId;
		},
		createdAt() {
			const dt = dayjs(this.todo.timestamp);
			const date = dt.format(`MMMM DD`);
			const time = dt.format(`HH:mm`);
			return `${date} at ${time}`;
		},
		starStyle() {
			if (this.isImportant) {
				return ['text-amber-300'];
				// } else if (this.isApproved) {
				// 	return ['text-emerald-200', 'group-hover:text-amber-300'];
			} else {
				return ['text-gray-200', 'group-hover:text-amber-300'];
			}
		},
	},
	watch: {
		isCompleted(newValue) {
			this.$store.dispatch('todos/updateIsDoneStatus', {
				id: this.todoId,
				done: newValue,
			});
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
			this.isPersonal = false;
			this.isCompleted = false;
			this.selectedPartner = '';
			this.selectedCategories = [];
		}
	},
	methods: {
		isCategorySelected(index) {
			return index in this.categoryIdToIndex();
		},
		addNewTodo() {
			if (!this.title) return;
			const newTodo = this.extractTodoInfo();
			this.$store.dispatch('todos/addNewTodo', newTodo);
			this.$emit('close');
		},
		updateTodoInfo() {
			if (!this.title) return;
			const updatedTodo = {
				...this.extractTodoInfo(),
				id: this.todoId,
			};
			this.$store.dispatch('todos/updateTodo', updatedTodo);
			this.$emit('close');
		},
		deleteTodo() {
			this.$store.dispatch('todos/deleteTodo', { id: this.todoId });
			this.$emit('close');
		},
		showTodoPage() {
			this.$router.push(`/todo/${this.todoId}`);
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
				partner: this.extractPartner(),
			};
		},
		extractCategories() {
			const categories = [];
			for (const categorySelection of this.selectedCategories) {
				categories.push(this.categories[categorySelection - 1].id);
			}
			return categories;
		},
		extractPartner() {
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
		doNothing() {},
	},
};
</script>
