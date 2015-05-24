CREATE TABLE IF NOT EXISTS hands (
  id SERIAL PRIMARY KEY,
  flop jsonb,
  turn jsonb,
  river jsonb,
  hole_cards_1 jsonb,
  hole_cards_2 jsonb
)