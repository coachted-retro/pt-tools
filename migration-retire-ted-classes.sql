-- Ted is no longer running Ignite Core (Tuesday) or Boot Camp (Thursday).
-- Soft retire rather than DELETE: group_class_sessions rows reference
-- class_id, so deleting the class row would orphan every agenda and
-- station plan ever built for those classes. active=0 pulls them out of
-- the class list, the public schedule, and the agenda picker while the
-- history stays intact and navigable.
UPDATE group_classes
   SET active = 0
 WHERE coach = 'Ted Scholl'
   AND gym_id = 1
   AND (
        (name = 'Ignite Core' AND day_of_week = 2)
     OR (name = 'Boot Camp'   AND day_of_week = 4)
   );

-- Confirm what is left running under his name:
-- SELECT id, name, day_of_week, start_time, active FROM group_classes WHERE coach='Ted Scholl';
