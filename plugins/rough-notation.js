import Vue from 'vue';
import VueRoughNotation from 'vue-rough-notation';

const options = {
	// Turn on/off animation when annotating.
	animate: true,
	// Duration of the animation in milliseconds.
	animationDuration: 350,
	// Representing the color of the annotation sketch.
	color: 'currentColor',
	// Width of the annotation strokes.
	strokeWidth: 2,
	// (in pixels) Padding between the element and roughly where the annotation is drawn.
	padding: 20,
	// To annotate multiline text (each line separately), set this property to true.
	multiline: true,
	// By default annotations are drawn in two iterations.
	iterations: 1,
	// When drawing a bracket, this configures which side(s) of the element to bracket.
	brackets: `right`,
};

Vue.use(VueRoughNotation, options);
