export const serverUrl = 'http://localhost:8000'
export const postsImagesUrl = `${serverUrl}/img/posts`
export const usersImagesUrl = `${serverUrl}/img/users`
//
// export const MAX_POSTS_ON_DASHBOARD = 10
export const MAX_POSTS_ON_DASHBOARD = 5
//
export const COMMENTS_PER_PAGE = 10
//
export const MAX_COMMENT_LENGTH = 10000
export const DEFAULT_IMG = 'default.jpg'
//
export const PAGE_SIZE = 4
export const MIN_PAGES = 8 //means how many pages should we have to display the dots
//
export const searchForArray = [
  { label: 'Posts', value: 'posts' },
  { label: 'Users', value: 'users' },
]

export const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
}

export const categoriesArr = [
  { label: 'All', value: 'all' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Travel', value: 'travel' },
  { label: 'Food and Cooking', value: 'food and cooking' },
  { label: 'Health and Wellness', value: 'health and wellness' },
  { label: 'Fashion and Beauty', value: 'fashion and beauty' },
  { label: 'Technology', value: 'technology' },
  { label: 'Finance', value: 'finance' },
  { label: 'Education', value: 'education' },
  { label: 'News', value: 'news' },
]

export const categories = [
  'Lifestyle',
  'Travel',
  'Food and Cooking',
  'Health and Wellness',
  'Fashion and Beauty',
  'Technology',
  'Finance',
  'Education',
  'News',
]
export const socialsLinks = [
  {
    social: 'Linkedin',
    link: 'https://www.linkedin.com/shareArticle?url=URL',
  },
  {
    social: 'Facebok',
    link: 'https://www.facebook.com/sharer/sharer.php?u=URL',
  },
  {
    social: 'Twitter',
    link: 'https://twitter.com/intent/tweet?url=URL',
  },
  {
    social: 'Reddit',
    link: 'https://www.reddit.com/submit?url=URL',
  },
]
