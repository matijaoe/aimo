<template>
	<div v-if="isCompleted">
		<TheLoader v-if="isLoading"></TheLoader>
		<fieldset
			v-if="!photoUrl"
			class="
				mt-1
				flex
				justify-center
				px-6
				pt-5
				pb-6
				border-2 border-gray-300 border-dashed
				rounded-md
			"
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
						class="
							relative
							cursor-pointer
							bg-white
							rounded-md
							font-medium
							text-indigo-600
							hover:text-indigo-500
							focus-within:outline-none
							focus-within:ring-2
							focus-within:ring-offset-2
							focus-within:ring-indigo-500
						"
					>
						<span>Upload a file</span>
						<input
							id="file-upload"
							name="file-upload"
							type="file"
							class="sr-only"
							accept=".jpg, .jpeg, .png, .gif"
							@change="onFileSelected"
						/>
					</label>
					<p class="pl-1">or drag and drop</p>
				</div>
				<p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
			</div>
		</fieldset>
		<div v-else>
			<div class="pb-2">
				<img
					:src="photoUrl"
					alt="Todo image"
					class="rounded-lg max-h-[600px]"
					@load="finishLoading"
				/>
			</div>
			<div v-if="!isApproved" class="mt-1">
				<BaseButton mode="warn" @click="removePicture"
					>Remove picture
					<IconTrash size="sm" />
				</BaseButton>
			</div>
		</div>
	</div>
</template>

<script>
import IconPhoto from 'icons/IconPhoto';
import { mapGetters } from 'vuex';
import IconTrash from 'icons/IconTrash';
import BaseButton from 'UI/BaseButton';
import { nanoid } from 'nanoid';
import { app } from '../../firebase';
import TheLoader from '../UI/BaseLoadingSpinner.vue';
import * as fb from '@/firebase';

export default {
	components: { IconPhoto, BaseButton, IconTrash, TheLoader },
	props: {
		isCompleted: {
			type: Boolean,
			required: false,
			default: true,
		},
		isApproved: {
			type: Boolean,
			required: false,
			default: false,
		},
		todoId: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			photoUrl: null,
			isLoading: false,
			maximumFileSize: 5, // in MB
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
		if (todoRef.data().photoUrl) {
			this.isLoading = true;
			this.photoUrl = todoRef.data().photoUrl;
		}
	},
	methods: {
		async onFileSelected(ev) {
			const file = ev.target.files[0];

			if (!this.checkFileExtension(file.name.split('.')[1])) {
				return;
			}

			if (!this.checkFileSize(file.size)) {
				return;
			}

			this.isLoading = true;

			const storageRef = app.storage().ref();
			const fileName = nanoid();
			const fileRef = storageRef.child(fileName);
			await fileRef.put(file);
			const fileUrl = await fileRef.getDownloadURL();

			await fb.usersCollection
				.doc(this.currentUserId)
				.collection('todos')
				.doc(this.todoId)
				.update({
					photoUrl: fileUrl,
					photoName: fileName,
				});

			console.log('Fotografija je uploadana.');
			this.photoUrl = fileUrl;
		},
		async removePicture() {
			this.isLoading = true;
			const todoRef = await fb.usersCollection
				.doc(this.currentUserId)
				.collection('todos')
				.doc(this.todoId)
				.get();

			const storageRef = app
				.storage()
				.ref()
				.child(todoRef.data().photoName);

			await storageRef.delete();

			await fb.usersCollection
				.doc(this.currentUserId)
				.collection('todos')
				.doc(this.todoId)
				.update({
					photoUrl: null,
					photoName: null,
				});

			console.log('Fotografija je izbrisana.');
			this.photoUrl = null;
			this.isLoading = false;
		},
		finishLoading() {
			this.isLoading = false;
		},
		checkFileSize(fileSize) {
			if (fileSize > 1048576 * this.maximumFileSize) {
				alert(
					`Your file is too large. Maximum size is ${this.maximumFileSize}MB.`
				);
				return false;
			} else {
				return true;
			}
		},
		checkFileExtension(extension) {
			if (
				extension !== 'jpg' &&
				extension !== 'png' &&
				extension !== 'gif' &&
				extension !== 'jpeg'
			) {
				alert(`Your file extension (${extension}) is not allowed!`);
				return false;
			} else {
				return true;
			}
		},
	},
};
</script>
