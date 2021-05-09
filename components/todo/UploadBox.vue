<template>
	<div v-if="isCompleted">
		<label class="uppercase ml-1 tracking-wider text-xs"> Photo </label>
		<div
			v-if="!photoUrl"
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
							@change="onFileSelected"
						/>
					</label>
					<p class="pl-1">or drag and drop</p>
				</div>
				<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
			</div>
		</div>
		<div v-else>
			<img :src="photoUrl" alt="Todo image" />
			<vs-button danger border @click="removePicture">
				Remove picture <IconTrash size="sm" />
			</vs-button>
		</div>
	</div>
</template>

<script>
import IconPhoto from 'icons/IconPhoto';
import * as fb from '@/firebase';
import { mapGetters } from 'vuex';
import IconTrash from 'icons/IconTrash';
import { app } from '../../firebase';

export default {
	components: { IconPhoto, IconTrash },
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
		};
	},
	computed: {
		...mapGetters(['currentUserId']),
	},
	async created() {
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
	},
};
</script>
