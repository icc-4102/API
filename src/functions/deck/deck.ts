/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Deck {
  name: string;
  cards: string[];
}

export const getDeck = async (_event, _context) => {
  const standardDeck: Deck = {
    name: 'Standard',
    cards: ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '∞'],
  };
  const fibonacciDeck: Deck = {
    name: 'Fibonacci',
    cards: [
      '0',
      '1',
      '2',
      '3',
      '5',
      '8',
      '13',
      '21',
      '34',
      '55',
      '89',
      '144',
      '∞',
    ],
  };
  const tshirtDeck: Deck = {
    name: 'T-Shirt',
    cards: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  };

  const decks = [standardDeck, fibonacciDeck, tshirtDeck];

  return {
    statusCode: 200,
    body: JSON.stringify(decks, null, 2),
  };
};
