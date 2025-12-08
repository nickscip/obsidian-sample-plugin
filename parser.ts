export interface CardData {
	id: number;
	front: string;
	back: string;
}

export function parseMarkdown(text: string): CardData[] {
	const lines = text.split('\n');
	const cards: CardData[] = [];

	let currentCard: CardData | null = null;
	let idCounter = 1;

	// Regex to match any markdown header (e.g. "# Title" or "### Title")
	// ^ = start of line, #+ = one or more hashes, \s+ = one or more spaces
	const headerRegex = /^#+\s+(.*)/;

	for (const line of lines) {
		const headerMatch = line.match(headerRegex);

		if (headerMatch) {

			// 1. If we were working on a card, save it before starting a new one.
			if (currentCard) {
				cards.push(currentCard);
			}

			// 2. Start a new card. 
			// headerMatch[1] is the text captured in the parenthesis (the title without hashes)
			currentCard = {
				id: idCounter++,
				front: headerMatch[1].trim(),
				back: ''
			};
		} else {
			// This is not a header.
			if (currentCard) {
				// Add this line to the back of the current card.
				// We add a newline character to preserve formatting.
				currentCard.back += line + '\n';
			}
		}
	}

	// Don't forget to push the very last card after the loop finishes!
	if (currentCard) {
		cards.push(currentCard);
	}

	return cards;
}
