export const serverUrl = "http://localhost:8000"
export const postsImagesUrl = `${serverUrl}/img/posts`
export const usersImagesUrl = `${serverUrl}/img/users`
//
export const PAGE_SIZE = 4
export const MIN_PAGES = 8 //means how many pages should we have to display the dots
//
export const searchForArray = [
  { label: "Posts", value: "posts" },
  { label: "Users", value: "users" }
]

export const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true
}

export const categoriesArr = [
  { label: "All", value: "all" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Travel", value: "travel" },
  { label: "Food and Cooking", value: "food and cooking" },
  { label: "Health and Wellness", value: "health and wellness" },
  { label: "Fashion and Beauty", value: "fashion and beauty" },
  { label: "Technology", value: "technology" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "News", value: "news" }
]

export const categories = [
  "Lifestyle",
  "Travel",
  "Food and Cooking",
  "Health and Wellness",
  "Fashion and Beauty",
  "Technology",
  "Finance",
  "Education",
  "News"
]
