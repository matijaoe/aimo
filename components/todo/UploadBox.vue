<template>
	<div v-if="isCompleted">
		<TheLoader v-if="isLoading"></TheLoader>
		<fieldset
			v-if="!photoUrl"
			class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
		>
			<legend class="px-2 uppercase text-xs font-bold text-current">
				Proof
			</legend>
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
							@change="onFileSelected"
						/>
					</label>
					<p class="pl-1">or drag and drop</p>
				</div>
				<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
			</div>
		</fieldset>
		<div v-else>
			<div class="pb-2">
				<img
					:src="photoUrl"
					alt="Todo image"
					class="rounded-lg"
					@load="finishLoading"
				/>
			</div>
			<div class="transform -translate-x-1.5">
				<vs-button danger @click="removePicture">
					Remove picture <IconTrash size="sm" class="ml-1" />
				</vs-button>
			</div>
		</div>
	</div>
</template>

<script>
import IconPhoto from 'icons/IconPhoto';
import * as fb from '@/firebase';
import { mapGetters } from 'vuex';
import IconTrash from 'icons/IconTrash';
import { app } from '../../firebase';
import TheLoader from '../UI/BaseLoadingSpinner.vue';

export default {
	components: { IconPhoto, IconTrash, TheLoader },
	props: {
		isCompleted: {
			type: Boolean,
			required: false,
			default: true,
		},
		todoId: {
			type: String,
			default: null,
		},
		todoPhoto: {
			type: String,
			required: false,
			default: null,
		},
	},
	data() {
		return {
			photoUrl: null,
			isLoading: false,
		};
	},
	computed: {
		...mapGetters(['currentUserId']),
	},
	async created() {
		this.isLoading = true;
		const todoRef = await fb.usersCollection
			.doc(this.currentUserId)
			.collection('todos')
			.doc(this.todoId)
			.get();
		if (todoRef.data().photo) {
			this.photoUrl = todoRef.data().photo;
		}
	},
	methods: {
		async onFileSelected(ev) {
			this.isLoading = true;
			const file = ev.target.files[0];
			const storageRef = app.storage().ref();
			const fileRef = storageRef.child(file.name);
			await fileRef.put(file);
			const fileUrl = await fileRef.getDownloadURL();
			await fb.usersCollection
				.doc(this.currentUserId)
				.collection('todos')
				.doc(this.todoId)
				.update({
					photo: fileUrl,
				});
			console.log('Fotografija je uploadana.');
			this.photoUrl = fileUrl;
		},
		async removePicture() {
			await fb.usersCollection
				.doc(this.currentUserId)
				.collection('todos')
				.doc(this.todoId)
				.update({
					photo: null,
				});
			console.log('Fotografija je izbrisana.');
			this.photoUrl = null;
		},
		finishLoading() {
			this.isLoading = false;
		},
	},
};
</script>
