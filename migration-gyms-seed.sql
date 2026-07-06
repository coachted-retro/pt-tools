-- Seeds the 10 real, live club locations into gyms (currently empty).
-- IDs are explicit and intentional — they match CLUB_GYM_ID in command-center.html
-- and the ?club=slug pricing config in fitness-consultation-tool.html.
-- Safe to re-run: INSERT OR IGNORE won't duplicate if a row with that id already exists.

INSERT OR IGNORE INTO gyms (id, name, city, state, director, active, is_demo) VALUES
  (1,  'Retro Fitness of Fairless Hills', 'Fairless Hills', 'PA', 'Ted Scholl',      1, 0),
  (2,  'Retro Fitness of Forest Hills',   'Forest Hills',   'NY', 'Keith & Rashawn', 1, 0),
  (3,  'Retro Fitness of Glendale',       'Glendale',       'NY', 'Keith & Rashawn', 1, 0),
  (4,  'Retro Fitness of Jersey City',    'Jersey City',    'NJ', 'Des',             1, 0),
  (5,  'Retro Fitness of Cedar City',     'Cedar City',     'UT', 'Brittney',        1, 0),
  (6,  'Retro Fitness of Rego Park',      'Rego Park',      'NY', 'Ruveena',         1, 0),
  (7,  'Retro Fitness of Fairfield',      'Fairfield',      'NJ', 'Shawn',           1, 0),
  (8,  'Retro Fitness of Tottenville',    'Tottenville',    'NY', 'Sarah',           1, 0),
  (9,  'Retro Fitness of Mt. Olive',      'Mt. Olive',      'NJ', 'Sarah & Bianca',  1, 0),
  (10, 'Retro Fitness of Whippany',       'Whippany',       'NJ', 'Dij''uan',        1, 0);
