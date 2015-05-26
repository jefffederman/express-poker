ALTER TABLE hands
ADD COLUMN players jsonb,
ADD COLUMN created_at timestamp,
ADD COLUMN updated_at timestamp,
DROP COLUMN hole_cards_1,
DROP COLUMN hole_cards_2;
