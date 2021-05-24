<template>
	<div class="flex items-center gap-3">
		<div class="flex items-center">
			<BaseButton
				v-tooltip.bottom="'Like'"
				square
				class="group"
				@click="pressLike"
			>
				<IconLike
					class="text-gray-300 group-hover:text-blue-500 transition transform hover:scale-110 hover:-rotate-3 hover:-translate-y-[5px] transition"
					:class="liked ? 'text-blue-500' : 'text-gray-300'"
				/>
			</BaseButton>
			<p
				v-tooltip.bottom="likesString"
				class="cursor-default text-base font-bold p-2 relative right-2 top-[1px] transform hover:scale-125 hover:-rotate-2 hover:-translate-y-[4px] transition"
			>
				{{ numberOfLikes }}
			</p>
		</div>

		<BaseButton v-tooltip.bottom="'Support'" square class="group">
			<IconDollar
				class="text-gray-300 group-hover:text-amber-500 transition transform hover:scale-110 hover:-rotate-3 hover:-translate-y-[5px] transition"
			/>
		</BaseButton>
	</div>
</template>

<script>
import IconLike from 'icons/IconLike.vue';
import IconDollar from 'icons/IconDollar.vue';
import BaseButton from 'UI/BaseButton.vue';

import * as fb from '@/firebase';
import { mapGetters } from 'vuex';

export default {
	components: {
		IconLike,
		IconDollar,
		BaseButton,
	},
	props: {
		todo: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			liked: false,
			numberOfLikes: 0,
			likesString: '',
		};
	},
	computed: {
		...mapGetters(['currentUserId']),
	},
	created() {
		if (this.todo.likedByUsers) {
			this.makeStringOfLikes();

			this.numberOfLikes = this.todo.likedByUsers.length;
			if (this.todo.likedByUsers.includes(this.currentUserId)) {
				this.liked = true;
			}
		}
	},
	methods: {
		makeStringOfLikes() {
			if (this.todo.likedByUsers.length > 3) {
				this.likesString = [
					this.todo.likedByUsers[0],
					this.todo.likedByUsers[1],
					this.todo.likedByUsers[2],
				].join(', ');
				if (this.todo.likedByUsers.length === 4) {
					this.likesString += ` and 1 other.`;
				} else {
					this.likesString += ` and ${
						this.todo.likedByUsers.length - 3
					} others.`;
				}
			} else if (this.todo.likedByUsers.length > 0) {
				this.likesString = this.todo.likedByUsers.join(', ');
			} else {
				this.likesString = 'Be the first who likes this!';
			}
		},
		async pressLike() {
			let likes = this.todo.likedByUsers;
			if (likes) {
				if (likes.includes(this.currentUserId)) {
					const index = likes.findIndex(
						(userId) => userId === this.currentUserId
					);
					likes.splice(index, 1);
					this.liked = false;
				} else {
					likes.push(this.currentUserId);
					this.liked = true;
				}
				this.makeStringOfLikes();
			} else {
				likes = [this.currentUserId];
				this.liked = true;
			}

			this.numberOfLikes = likes.length;

			await fb.usersCollection
				.doc(this.todo.owner.username)
				.collection('todos')
				.doc(this.todo.id)
				.update({
					likedByUsers: likes,
					numberOfLikes: likes.length,
				});
		},
	},
};
</script>
