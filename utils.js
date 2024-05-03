// import { redirect } from 'react-router-dom';
import { redirect } from './redirectUtil';

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem('loggedin');

  if (!isLoggedIn) {
    const response = redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
    return response;
  } else {
    return null;
  }
}

// export async function requireAuth() {
//   const isLoggedIn = localStorage.getItem("loggedin")

//   if (!isLoggedIn) {
//       throw redirect("/login?message=You must log in first.")
//   }
// }
