<template>
	<div v-if="isCompleted">
		<fieldset
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
	</div>
</template>

<script>
import IconPhoto from 'icons/IconPhoto';

export default {
	components: { IconPhoto },
	props: {
		isCompleted: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
};
</script>
