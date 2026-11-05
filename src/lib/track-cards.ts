export function indexTrackCards<T extends { id: string }>(cards: readonly T[]): Map<string, T> {
  return new Map(cards.map(card => [card.id, card]));
}
