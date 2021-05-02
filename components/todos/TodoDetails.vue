<template>
	<div
		v-if="shown"
		class="absolute top-0 left-0 bg-black bg-opacity-40 w-screen h-screen"
		@click="$emit('close')"
	>
		<div class="relative w-full h-screen">
			<article
				class="absolute top-0 right-0 h-screen w-full w-[480px] bg-white border-l-2 border-gray-200 py-10 px-6 overflow-y-auto"
				@click.stop=""
			>
				<div>
					<!--				<button
					class="bg-emerald-200 text-emerald-700 py-2 px-4 rounded-lg"
					@click="$emit('close')"
				>
					Zatvori me
				</button>-->
					<BaseButton mode="ghost" @click="$emit('close')">
						Zatvori me
					</BaseButton>
					<BaseButton v-if="isNewTodo" mode="cta" @click="addNewTodo"
						>Add</BaseButton
					>
					<BaseButton v-else mode="cta">Save</BaseButton>
				</div>

				<!-- todo full widht imputs -->
				<div class="mt-10 flex flex-col gap-8">
					<div class="flex gap-4">
						<vs-input v-model="title" label-placeholder="Title" />
						<vs-input
							v-model="description"
							label-placeholder="Description"
						/>
					</div>
					<!-- <div>
						<label
							for="todoDesc"
							class="uppercase ml-1 tracking-wider text-xs"
							>Partners</label
						>
						<select
							id="cars"
							name="cars"
							class="text-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						>
							<option selected>None</option>
							<option
								v-for="partner in currentUserPartners"
								:key="partner.username"
								:value="partner.username"
							>
								@{{ partner.username }}
							</option>
						</select>
					</div> -->
					<div class="flex gap-4 justify-between items-center">
						<!-- todo switch -->
						<div class="mx-auto my-1">
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
									<div class="flex items-center gap-2">
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
					<div class="flex gap-4 justify-between items-center">
						<div class="mx-auto">
							<p>Categories</p>
						</div>
						<vs-select v-model="selectedCategories" filter multiple>
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
						<vs-checkbox v-model="isDaily" :color="'#60A5FA'">
							Repeats daily
						</vs-checkbox>
						<vs-checkbox v-model="isImportant" :color="'#FBBF24'">
							Important
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
									<IconPhoto
										size="xl"
										class="text-gray-300"
									/>
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
				</div>
			</article>
		</div>
	</div>
</template>

<script>
import IconPhoto from 'icons/IconPhoto';
import BaseAvatar from 'UI/BaseAvatar';
import { mapGetters } from 'vuex';
import { nanoid } from 'nanoid';
import BaseButton from '../UI/BaseButton';

export default {
	components: {
		BaseButton,
		IconPhoto,
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
			isApproved: false,
			isCompleted: false,
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
	},
	created() {
		if (this.todoId) {
			const todo = this.getCurrentUserTodoById(this.todoId);
			this.title = todo.name;
			this.description = todo.desc;
			this.isDaily = todo.daily;
			this.isImportant = todo.important;
			this.isApproved = todo.approved;
			this.isPersonal = !todo.partner;
			this.isCompleted = todo.done;

			const partnerUsernames = this.partners.map((p) => p.username);
			const partnerIndex = partnerUsernames.indexOf(todo.partner);
			const partnerOption = partnerIndex !== -1 ? partnerIndex + 1 : '';

			this.selectedPartner = partnerOption;
			this.selectedCategories = todo.categories;
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
		addNewTodo() {
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
			const categories = [];
			for (const categorySelection of this.selectedCategories) {
				categories.push(this.categories[categorySelection - 1].id);
			}
			const newTodo = {
				name: this.title,
				desc: this.description || '',
				categories,
				timestamp: Date.now(),
				done: false,
				approved: false,
				daily: this.isDaily,
				important: this.isImportant,
				partner: partnerUsername,
			};
			this.$store.dispatch('todos/addNewTodo', newTodo);
			this.$emit('close');
		},
	},
};
</script>
