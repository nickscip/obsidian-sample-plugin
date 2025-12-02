import { ItemView, WorkspaceLeaf } from 'obsidian';

// Import the Deck Svelte component and the `mount` and `unmount` methods.
import Deck from './Deck.svelte';
import { mount, unmount } from 'svelte';

export const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
	// A variable to hold on to the Deck instance mounted in this ItemView.
	deck: ReturnType<typeof Deck> | undefined;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return 'My Flashcards';
	}

	async onOpen() {
		// Create container for the Deck component
		const deckContainer = this.contentEl.createDiv();

		// Attach the Deck Svelte component to the container
		this.deck = mount(Deck, { target: deckContainer });
	}

	async onClose() {
		if (this.deck) {
			// Remove the Deck from the ItemView.
			unmount(this.deck);
		}
	}
}
