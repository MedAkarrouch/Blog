# Blog App

> [Demo](http:www.youtube.com) (Log in with email= **selena@email.io** & password=**12345678**)

Our blog web app is a feature-rich platform that empowers users to create, manage, and share their thoughts through blog posts. With a strong focus on user experience and functionality, it offers user registration and authentication through JWT, making it easy for users to access and contribute to the platform. Users can create, edit, and delete their blog posts, leave comments, and like posts.

A key feature is the user dashboard, which provides users with an at-a-glance summary of their activity, including the total number of posts, comments, and likes on their own posts. Users can manage their posts through a user-friendly table, where they can edit, delete, or view individual posts in detail. The dashboard also allows users to sort the table by post statistics (likes and comments) or post date, enhancing their ability to organize and engage with their content.

To enhance content discovery, the app offers search functionality to find specific posts by title, and users can filter and sort blog posts by category, popularity, or recency. The platform also supports user profile management, enabling users to update their information and customize their profile picture.

With a responsive and well-designed user interface, social sharing capabilities, and a focus on responsive design, our blog web app offers a delightful and engaging experience for bloggers and readers alike.

## Technology Stack

The Blog Web App is built using the following technologies and tools:

- **Node.js**: The JavaScript runtime used for server-side development.
- **Express.js**: A web application framework for building the server.
- **MongoDB**: A NoSQL database for storing blog posts and user data.
- **JWT (JSON Web Tokens)**: Used for user authentication and securing API endpoints.
- **React**: A JavaScript library for building the user interface and managing the front-end.
- **npm**: The Node Package Manager for managing project dependencies.

## Features

1. **User Registration and Authentication:**

   - User registration with username, email and password.
   - User login and authentication using JWT (JSON Web Tokens).

2. **Search Functionality:**

   - Search for specific blog posts by title.

3. **Filter and Sort Blog Posts:**

   - Filter posts by category.
   - Sort posts by popularity.
   - Sort posts by the most recent ones.

4. **User Profile Management:**

   - Change profile picture.
   - Update username, email, and password.
   - Delete user account.

5. **Blog Post Management:**

   - Create new blog posts.
   - Edit existing blog posts.
   - Delete blog posts.

6. **Commenting System:**

   - Leave comments on blog posts.
   - Edit or delete comments.

7. **Liking Posts:**

   - Users can like blog posts.
   - Remove likes from posts.

8. **Reading List:**

   - Add blog posts to a reading list.
   - Remove posts from the reading list.

9. **User Dashboard:**

- Provides an overview of the user's posts, including:

  - Total blog posts created by the user.
  - Total comments on all the user's posts.
  - Total likes on all the user's posts.
  - Average likes per post on the user's posts.
  - Average comments per post on the user's posts.

- Displays a table containing all of the user's posts, where the user can:

  - Update or edit posts.
  - Delete posts.
  - Navigate to individual posts for detailed viewing.

  - Offers the ability to sort the table by:
    - Post statistics (e.g., likes and comments).
    - Post date (e.g., most recent or oldest posts).

10. **Social Sharing:**

    - Integration with social media platforms for sharing blog posts.

11. **Responsive Design:**

    - Ensure the web app is mobile-friendly and adapts to various screen sizes.

12. **Well-Designed User Interface:**

    - A user-friendly and aesthetically pleasing design for a positive user experience.

## Screenshots

### Home page

![Homepage](/screenshots/Home.png)

### Blog post page

![Blog post](/screenshots/Blog-post-1.png)

![Comments section of the blog post](/screenshots/blog-post-comments-section.png)

### Dashboard page

![User dashboard](/screenshots/Dashboard.png)
_Caption: The user's dashboard page._

### Account page

![Create account page](/screenshots/Account.png)

### Create post page

![Create post page](/screenshots/Create-post.png)

### Reading list page

![User reading list](/screenshots/Reading-list.png)
_Caption : The user's reading list page._

## API Reference

### Auth

| Method | Url              | Description     |
| :----- | :--------------- | :-------------- |
| `POST` | /api/auth/login  | used to log in  |
| `POST` | /api/auth/signup | used to sign up |
| `GET`  | /api/auth/logout | used to log out |

### Posts

| Method   | Url                                                     | Description                                                                                         |
| :------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------- |
| `GET`    | /api/posts?search=tv&categorie=lifestyle&sortBy=popular | Retrieve posts with "TV" in the title, categorized as "lifestyle," sorted by popularity, on page 1. |
| `GET`    | /api/posts/getUserPosts?page=1&sortBy=date-asc          | retrieves the user's posts and specifies the sorting order on the first page by ascending date.     |
| `GET`    | /api/posts/stats                                        | Get user stats                                                                                      |
| `POST`   | /api/posts/addNewPost                                   | Create post                                                                                         |
| `GET`    | /api/posts/getPost?post=12                              | Retrieve post #12                                                                                   |
| `Post`   | /api/posts/updatePost?post=12                           | update post #12                                                                                     |
| `DELETE` | /api/posts/deletePost?post=12                           | delete post #12                                                                                     |

### Users

| Method  | Url                       | Description                                                 |
| :------ | :------------------------ | :---------------------------------------------------------- |
| `GET`   | /api/users/getMe          | retrieve information about the currently authenticated user |
| `PATCH` | /api/users/updateMe       | update the user's profile                                   |
| `PATCH` | /api/users/updatePassword | update user's password                                      |
| `POST`  | /api/users/deleteMe       | delete user's account                                       |

### Comments

| Method  | Url                                    | Description             |
| :------ | :------------------------------------- | :---------------------- |
| `POST`  | /api/comments/addComment?post=12       | add comment on post #12 |
| `POST`  | /api/comments/deleteComment?comment=12 | delete comment #12      |
| `PATCH` | /api/comments/updateComment?comment=12 | update comment #12      |

### Likes

| Method | Url                           | Description               |
| :----- | :---------------------------- | :------------------------ |
| `POST` | /api/Likes/addLike?post=12    | add a like on post #12    |
| `POST` | /api/Likes/removeLike?post=12 | delete like from post #12 |

### Reading lists

| Method   | Url                                                 | Description                                                 |
| :------- | :-------------------------------------------------- | :---------------------------------------------------------- |
| `GET`    | /api/readingLists?page=1&sortBy=date-asc            | Retrieve reading lists, sorted by ascending date, on page 1 |
| `POST`   | /api/readingLists/addToReadingList?post=12          | add post #12 to the user's reading list                     |
| `DELETE` | /api/readingLists/removePostFromReadingList?post=12 | remove post #12 from the user's reading list                |
