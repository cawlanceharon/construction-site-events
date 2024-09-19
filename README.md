# construction-site-events
Scalable Node.js project using TypeScript and Express.js to handle User Entry and User Exit events with corresponding actions

Entity-Relationship Diagram (ERD)
+-----------+        +------------+        +--------------+
|   Event   |        |   Action   |        |    User      |
+-----------+        +------------+        +--------------+
| - name    |        | - name     |        | - id         |
| - execute |   ->   | - execute  |        | - name       |
+-----------+        +------------+        +--------------+
                                           
Relationships:
- An Event can have multiple Actions.
- Actions are executed in response to an Event.
- User data is associated with Events.
