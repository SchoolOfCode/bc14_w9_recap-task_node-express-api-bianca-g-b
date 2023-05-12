## Recap task

### Create your API routes

👉 Create a REST API using the user JSON data found in `data/users.json`. Your API must be RESTful with all CRUD routes (create, read, update, delete).

| Operation         | Path             | Response body shape                                                          |
| ----------------- | ---------------- | ---------------------------------------------------------------------------- |
| Get all users     | `/api/users`     | <code>{ success: true, payload: array of user objects } </code>              |
| Get user by id    | `/api/users/:id` | <code>{ success: true, payload: user object }</code>                         |
| Create new user   | `/api/users`     | <code>{ success: true, payload: newly created user object }</code>           |
| Update user by id | `/api/users/:id` | <code>{ success: true, payload: new user object (after replacement) }</code> |
| Delete user by id | `/api/users/:id` | <code>{ success: true, payload: deleted user } </code>                       |

Remember to break down the task and tackle it step by step.

- Start by looking at the data and familiarizing yourself with how it's structured.
- Make a plan for each CRUD route, and break down the logic in that plan until you can't break it down anymore!
- Code each route handler in the `routes/users.js` file.
- Code each helper function in the `models/users.js` file.
  - Test each route with Postman as you finish it before you move on to the next one!
  - Add, commit, and push after you complete each route/helper function.

If you are still fuzzy about Postman, you can [read more about it here](https://learning.postman.com/docs/getting-started/introduction/).

Remember the reasons why we separate concerns, like our routes and models. These include:

- Our code is more organized and easier for fellow developers (and future you!) to navigate with a lighter cognitive load.
- We can make any changes to parts of our server's architecture more quickly without changing the whole thing. For example, next week, when we layer on databases, we can quickly go back and change our models to talk to the database instead of the hard-coded data file in this repo, and our app.js, routes, etc., will remain the same.

## Bonus challenges (_These are optional if you're ready for an extra challenge!_)

⭐ If you've finished everything above and have time left over, keep developing! Think through what ideas you can come up with to improve functionality.

This can include:

- Implementing the correct HTTP response status code
- Making a front end to consume and display your data
- Additional routes that include searching the data using queries
- Implementing middleware (start with a simple logger, and then explore what else you can add)
