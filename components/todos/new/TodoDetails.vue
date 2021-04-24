<template>
	<div
		v-if="shown"
		class="absolute top-0 left-0 bg-black bg-opacity-40 w-screen h-screen"
	>
		<div class="relative w-full h-screen">
			<article
				class="absolute top-0 right-0 h-screen w-full max-w-[450px] bg-white border-l-2 border-gray-200 py-10 px-4"
			>
				<button
					class="bg-emerald-200 text-emerald-700 py-2 px-4 rounded-lg"
					@click="$router.push('/todos2')"
				>
					Zatvori me
				</button>
				<div class="mt-10 flex flex-col gap-3">
					<div>
						<label
							for="todoTitle"
							class="uppercase ml-1 tracking-wider text-xs"
							>Title</label
						>
						<input
							id="todoTitle"
							type="text"
							class="text-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
					<div>
						<label
							for="todoDesc"
							class="uppercase ml-1 tracking-wider text-xs"
							>Description</label
						>
						<textarea
							id="todoDesc"
							rows="3"
							class="text-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
					<div>
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
							<option value="volvo">Volvo</option>
							<option value="saab">Saab</option>
							<option value="mercedes">Mercedes</option>
							<option value="audi">Audi</option>
						</select>
					</div>
					<div>
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

export default {
	components: { IconPhoto },
	props: {
		show: {
			type: Boolean,
			required: true,
			default: true,
		},
		new: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	emits: ['close'],
	data() {
		return {
			shown: true,
		};
	},
};
</script>
