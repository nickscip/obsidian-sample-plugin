import { ItemView, WorkspaceLeaf } from 'obsidian';

// Import the Deck Svelte component and the `mount` and `unmount` methods.
import Deck from './Deck.svelte';
import { parseMarkdown } from './parser';
import { mount, unmount } from 'svelte';

export const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
	// A variable to hold on to the Deck instance mounted in this ItemView.
	deck: ReturnType<typeof Deck> | undefined;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	// Helper method to load and display cards from the active file
	async loadCards() {
		// Get active file - use getActiveFile() instead of getActiveViewOfType
		// because when this view opens, it becomes active, so MarkdownView is no longer active
		const activeFile = this.app.workspace.getActiveFile();

		// Unmount existing deck if it exists
		if (this.deck) {
			unmount(this.deck);
			this.deck = undefined;
		}

		// Clear the content element
		this.contentEl.empty();

		// 1. Check if there's an active file
		if (!activeFile) {
			// Show empty state if no file is open
			this.contentEl.createEl('div', { 
				text: 'No file is currently open. Please open a markdown file first.',
				cls: 'empty-state-message'
			});
			return;
		}

		// 2. Read the file content
		// Note: vault.read is better than cachedRead for a plugin like this 
		// to ensure you have the absolute latest version on disk.
		const fileContents = await this.app.vault.read(activeFile);

		// 3. Parse the text using your new helper
		const parsedCards = parseMarkdown(fileContents);

		// 4. Mount Svelte and PASS THE DATA
		// Attach the Deck Svelte component
		this.deck = mount(Deck, {
			target: this.contentEl,
			props: {
				cards: parsedCards // <--- This flows into let { cards } = $props()
			}
		});
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return 'My Flashcards';
	}

	async onOpen() {
		// Load cards from the active file
		await this.loadCards();

		// Register event listener to update when active file changes
		this.registerEvent(
			this.app.workspace.on('file-open', async () => {
				await this.loadCards();
			})
		);

		// Also listen for file modifications to update in real-time
		this.registerEvent(
			this.app.vault.on('modify', async (file) => {
				const activeFile = this.app.workspace.getActiveFile();
				if (activeFile && activeFile.path === file.path) {
					await this.loadCards();
				}
			})
		);
	}

	async onClose() {
		if (this.deck) {
			// Remove the Deck from the ItemView.
			unmount(this.deck);
		}
	}
}
