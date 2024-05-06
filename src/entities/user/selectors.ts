import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import { ILogin, userApi } from "./userApi";

// const selectPosts = (state: RootState) => state.postsApi.posts;
// const selectAuthors = (state) => state.postsApi.authors;

// const selectPostsAndAuthors = createSelector(
//   selectPosts,
//   selectAuthors,
//   (posts, authors) => {
//     return posts.map((post) => {
//       return {
//         ...post,
//         author: authors.find((author) => author.id === post.authorId),
//       };
//     });
//   }
// );

export const selectLoginResponse = userApi.endpoints.login.select("data");

export const selectIsAuthorised = createSelector(
   selectLoginResponse,
   state => state.data?.access_token
);

