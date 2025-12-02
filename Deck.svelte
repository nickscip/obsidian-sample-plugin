<script lang="ts">
	import Flashcard from './Flashcard.svelte';

	let cards = [
		{
			id: 1,
			front: "What is Svelte?",
			back: "A UI framework that compiles your code to tiny, framework-less vanilla JS."
		},
		{
			id: 2,
			front: "What does the $derived rune do?",
			back: "It creates a value that automatically updates whenever its dependencies change."
		},
		{
			id: 3,
			front: "How do you loop in Svelte?",
			back: "Using the {#each} block."
		}
	];
</script>

<div class="deck-container">
	<h2>My Flashcard Deck</h2>

	{#each cards as card (card.id)}
		<Flashcard
			frontText={card.front}
			backText={card.back}
		/>
	{/each}
</div>

<style>
	.deck-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		background-color: #f5f5f5; /* Light grey background for contrast */
		min-height: 100vh;
	}

	h2 {
		margin-bottom: 30px;
		font-family: sans-serif;
		color: #444;
	}
</style>
