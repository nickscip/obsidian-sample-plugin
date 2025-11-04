<script lang="ts">
	let onFront = $state(false);
	let side = $derived( onFront ? "Front" : "Back" );

	function flipCard() {
		onFront = !onFront
	}
</script>

<button class="flashcard" onclick={flipCard}>
	<span>{side} of the Card: What is Svelte?</span>
</button>

<style>
	/* 1. Styles for the card container */
	.flashcard {
		width: 350px;
		height: 200px;
		background-color: #fff;
		border: 1px solid #999;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
		cursor: pointer

		/* Centering the text inside */
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 20px;

		/* Overriding default button styles */
		font-family: inherit; /* Use the default page font */
		color: black; /* Ensure the text is visible */
	}
</style>
