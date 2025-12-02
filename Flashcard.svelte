<script lang="ts">
	interface Props {
		frontText: string;
		backText: string;
	}

	let { frontText, backText }: Props = $props();

	let onFront = $state(true);

	let side = $derived( onFront ? frontText : backText );

	function flipCard() {
		onFront = !onFront
	}
</script>

<button class="flashcard" onclick={flipCard}>
	<span class="card-text">{side}</span>
</button>

<style>
	/* 1. Styles for the card container */
	.flashcard {
		width: 350px;
		max-width: 350px; /* Prevent expansion */
		height: 200px;
		background-color: #fff;
		border: 1px solid #999;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		overflow: hidden; /* Clip any overflow */
		box-sizing: border-box; /* Ensure padding is included in width */
		white-space: normal; /* Ensure button allows text wrapping */

		/* Centering the text inside */
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin-bottom: 20px;
		flex-wrap: wrap; /* Allow content to wrap */

		/* Overriding default button styles */
		font-family: inherit; /* Use the default page font */
		font-size: 1.2rem;
		color: black; /* Ensure the text is visible */
	}

	.card-text {
		/* Text wrapping properties - MUST be set for wrapping to work */
		word-wrap: break-word !important;
		overflow-wrap: anywhere !important; /* Breaks anywhere if needed */
		word-break: break-word !important;
		white-space: normal !important; /* Explicitly allow text wrapping */
		
		/* Size constraints - critical for wrapping */
		/* Button is 350px with 20px padding each side = 310px content area */
		width: 100% !important;
		max-width: 100% !important;
		min-width: 0 !important; /* Critical: allows flex item to shrink */
		flex: 0 1 100% !important; /* Don't grow, shrink from 100%, critical for wrapping */
		
		/* Display properties */
		display: block !important;
		box-sizing: border-box !important;
		
		/* Typography */
		hyphens: auto;
		line-height: 1.4;
	}
</style>
