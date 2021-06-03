<template>
	<a
		v-tooltip.bottom="brandName"
		class="flex-shrink-0 rounded-full w-10 h-10 grid place-content-center"
		:style="{ backgroundColor: brandColor }"
		:href="href"
		target="_blank"
	>
		<!-- Boxicons -->
		<i :class="['bx', `${brandIcon}`, 'text-white', 'bx-sm']"></i>
	</a>
</template>

<script>
export default {
	props: {
		brand: {
			type: String,
			required: true,
			default: 'default',
		},
		href: {
			type: String,
			required: false,
			default: '#',
		},
	},
	data() {
		return {
			brands: {
				twitter: {
					icon: 'bxl-twitter',
					name: 'Twitter',
					color: '#1da1f2',
				},
				instagram: {
					icon: 'bxl-instagram-alt',
					name: 'Instagram',
					color: '#e1306c',
				},
				facebook: {
					icon: 'bxl-facebook',
					name: 'Facebook',
					color: '#4267B2',
				},
				linkedin: {
					icon: 'bxl-linkedin',
					name: 'LinkedIn',
					color: '#2867B2',
				},
				tumblr: {
					icon: 'bxl-tumblr',
					name: 'Tumblr',
					color: '#34526f ',
				},
				reddit: {
					icon: 'bxl-reddit',
					name: 'Reddit',
					color: '#FF5700',
				},
				youtube: {
					icon: 'bxl-youtube',
					name: 'Youtube',
					color: '#ff0000',
				},
				discord: {
					icon: 'bxl-discord',
					name: 'Discord',
					color: '#7289da',
				},
				github: { icon: 'bxl-github', name: 'GitHub', color: '#333' },
				'stack-overflow': {
					icon: 'bxl-stack-overflow',
					name: 'Stack Overflow',
					color: '#F48024',
				},
				dribbble: {
					icon: 'bxl-dribbble',
					name: 'Dribbble',
					color: '#ea4c89',
				},
				behance: {
					icon: 'bxl-behance',
					name: 'Behance',
					color: '#1769ff',
				},
				codepen: {
					icon: 'bxl-codepen',
					name: 'CodePen',
					color: '#333',
				},
				medium: {
					icon: 'bxl-medium',
					name: 'Medium',
					color: '#000',
				},
				unsplash: {
					icon: 'bxl-unsplash',
					name: 'Unsplash',
					color: '#000',
				},
				whatsapp: {
					icon: 'bxl-whatsapp',
					name: 'WhatsApp',
					color: '#25d366',
				},
				telegram: {
					icon: 'bxl-telegram',
					name: 'Telegram',
					color: '#0088cc',
				},
				messenger: {
					icon: 'bxl-messenger',
					name: 'FB Messenger',
					color: '#009EFF',
				},
				pinterest: {
					icon: 'bxl-pinterest-alt',
					name: 'Pinterest',
					color: '#e60023',
				},
				slack: {
					icon: 'bxl-slack',
					name: 'Slack',
					color: '#e01563',
				},
				patreon: {
					icon: 'bxl-patreon',
					name: 'Patreon',
					color: '#f96854',
				},
				quora: {
					icon: 'bxl-quora',
					name: 'Quora',
					color: '#B92B27',
				},
				bitcoin: {
					icon: 'bxl-bitcoin',
					name: 'Bitcoin',
					color: '#f2a900',
				},
				default: {
					icon: 'bx-globe-alt',
					name: 'Personal',
					color: '#94A3B8',
				},
			},
		};
	},
	computed: {
		brandColor() {
			return this.brands[this.brand]?.color || this.brands.default.color;
		},
		brandIcon() {
			return this.brands[this.brand]?.icon || this.brands.default.icon;
		},
		brandName() {
			return this.brands[this.brand]?.name || this.brands.default.name;
		},
	},
};
</script>
