<template>
	<div class="grid md:grid-cols-6 gap-y-4 md:gap-4 overflow-hidden">
		<SupportDialog :post-details="postDetails" />
		<PostsList
			:todos="todos"
			class="col-span-4 order-2 md:order-1 full-height"
		/>
		<transition>
			<CommunitySidebar
				class="
					md:col-span-2
					order-1
					md:order-2
					overflow-y-auto
					md:full-height
				"
				:category-id="categoryId"
			/>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommunitySidebar from './CommunitySidebar';
import PostsList from './PostsList';
import SupportDialog from './SupportDialog';

export default {
	components: {
		SupportDialog,
		PostsList,
		CommunitySidebar,
	},
	provide() {
		return {
			setPostDetails: this.setPostDetails,
		};
	},
	props: {
		todos: {
			type: Array,
			required: true,
		},
		categoryName: {
			type: String,
			required: false,
			default: '',
		},
	},
	data() {
		return {
			postDetails: null,
		};
	},
	computed: {
		...mapGetters(['getCategoryIdByName']),
		categoryId() {
			if (this.categoryName) {
				return this.getCategoryIdByName(this.categoryName);
			}
			return '';
		},
	},
	methods: {
		setPostDetails(todo) {
			this.postDetails = todo;
		},
	},
};
</script>

<style scoped lang="postcss">
.full-height {
	height: calc(100vh - 9rem);
	@apply overflow-y-auto;
}
</style>
