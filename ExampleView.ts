import { ItemView, WorkspaceLeaf } from 'obsidian';

// Import the Counter Svelte component and the `mount` and `unmount` methods.
import Flashcard from './Flashcard.svelte';
import { mount, unmount } from 'svelte';

export const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
	// A variable to hold on to the Counter instance mounted in this ItemView.
	cardText: ReturnType<typeof Flashcard> | undefined;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return 'Example view';
	}

	async onOpen() {
		// Create separate containers for each component
		const flashcardContainer = this.contentEl.createDiv();
		// const counterContainer = this.contentEl.createDiv();

		// Attach the Svelte components to separate containers
		this.cardText = mount(Flashcard, { target: flashcardContainer });
		// this.counter = mount(Counter, {
		// 	target: counterContainer,
		// 	props: {
		// 		startCount: 5,
		// 	}
		// });

		// Since the component instance is typed, the exported `increment` method is known to TypeScript.
		// this.counter.increment();

	}

	async onClose() {
		if (this.cardText) {
			// Remove the Flashcard from the ItemView.
			unmount(this.cardText);
		}
	}
}
