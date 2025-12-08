<script lang="ts">
	import Flashcard from './Flashcard.svelte';
	// We import the CardData interface so TypeScript knows what a "card" looks like.
	// Ensure this matches the export in your parser.ts file.
	import type { CardData } from './parser';

	// 1. Define the inputs (Props) this component expects
	interface Props {
		cards: CardData[];
	}

	// 2. Accept the data from the parent (Obsidian)
	// We default to an empty array [] to prevent errors if data is missing
	let { cards = [] }: Props = $props();

</script>

<div class="deck-container">
	{#if cards.length === 0}
		<!-- A helpful message if the file has no headers -->
		<div class="empty-state">
			<h3>No cards found!</h3>
			<p>Add a Markdown header (e.g., "# Question") to create a flashcard.</p>
		</div>
	{:else}
		<!-- The Loop: Render a Flashcard for every item in the array -->
		{#each cards as card (card.id)}
			<Flashcard 
				frontText={card.front} 
				backText={card.back.trim()} 
			/>
		{/each}
	{/if}
</div>

<style>
	.deck-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		gap: 20px; /* Adds space between flex items automatically */
		background-color: transparent; /* Matches Obsidian theme better */
		width: 100%;
		height: 100%;
		overflow-y: auto; /* Allows scrolling if the list is long */
	}

	.empty-state {
		margin-top: 50px;
		text-align: center;
		color: var(--text-muted); /* Uses Obsidian's built-in theme color */
	}
</style>
