auth.onAuthStateChanged(function (user) {
  if (user) {
    document.querySelector("#navbar-links").innerHTML = `
    <a href="./components/user.html" style="text-decoration: none; color: black">
      <img style="width: 40px;height: 35px; border-bottom-left-radius: 80%;
      border-bottom-right-radius: 80%;
      border-top-left-radius: 80%;
      border-top-right-radius: 80%;"
          src="${user.photoURL}"
          alt="">
      <span>${user.displayName}</span>
      <button onclick="logout()" class="btn btn-danger">Logout</button>
    </a>
    `;
  } else {
    document.querySelector("#navbar-links").innerHTML = `
      <a href="./components/login.html" class="btn btn-success">Login</a>
      <a href="./components/register.html" class="btn btn-primary">Register</a>
    `;
  }
});

function logout() {
  auth.signOut();
  window.location.href = "./index.html";
}
renderPost();
async function renderPost() {
  try {
    const querySnapshot = await db.collection("posts").get();

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    const postCountEl = document.getElementById("post-count");
    postCountEl.innerText =
      posts.length > 1 ? posts.length + " posts" : posts.length + " post";
    posts.forEach((post) => {
      document.querySelector("#posts").innerHTML += `
        
        <a href="./components/post.html?key=${
          post.id
        }" class="p-3 rounded post-item">
          <p class="mb-1" style="color: #748398">Posted by <span style="color: #000">u/${
            post.displayName
          }</span> ${calculateElapsedTime(
        post.createdAt?.seconds ? post.createdAt.seconds * 1000 : Date.now()
      )}</p>
          <p class="m-0 fs-3">${post.title}</p>
          <p class="m-0" style="white-space: pre-wrap">${post.content}</p>
        </a>
        `;
    });
  } catch (err) {
    console.log(err);
  }
}
