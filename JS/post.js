const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get("key");
// console.log(value); // In ra: "value"

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

renderPost();
async function renderPost() {
  try {
    const querySnapshot = await db.collection("posts").doc(value).get();
    const post = querySnapshot.data();
    const postEl = document.getElementById("post");
    postEl.innerHTML = `
    <div class="p-3 rounded post-item">
        <p class="mb-1" style="color: #748398">Posted by <span style="color: #000">u/${
          post.displayName
        }</span> ${calculateElapsedTime(
      post.createdAt?.seconds ? post.createdAt.seconds * 1000 : Date.now()
    )}</p>
        <p class="m-0 fs-3">${post.title}</p>
        <p class="m-0" style="white-space: pre-wrap">${post.content}</p>
    </div>
    `;

    document.querySelector("#comment-box-container").innerHTML = /*html*/ `
          <form class="my-4" autocomplete="off">
            <p class="mb-2">${
              auth.currentUser
                ? `Comment as ${auth.currentUser.displayName}`
                : "Sign in to comment"
            }</p>
            <input
              required
              type="text"
              class="form-control mb-2"
              placeholder="Enter your comment..."
              aria-label="Enter your comment..."
              id="comment"
              name="comment"
              ${auth.currentUser ? "" : "disabled"}
            />
            <button class="btn btn-primary" type="submit" ${
              auth.currentUser ? "" : "disabled"
            }>Comment</button>
          </form>
          `;

    // Add comments to firestore
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = e.target.comment.value.trim();

      e.target.comment.value = "";
      comments();
      async function comments() {
        try {
          await db
            .collection("posts")
            .doc(value)
            .collection("comments")
            .add({
              title,
              user: {
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                email: auth.currentUser.email,
              },
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
          getComments();
        } catch (err) {
          console.log(err);
        }
      }
    });

    //truy vấn lấy comments sắp xếp theo thời gian
    const q = firebase
      .firestore()
      .collection("posts")
      .doc(value)
      .collection("comments")
      .orderBy("createdAt", "desc");

    // Thực hiện truy vấn và xử lý kết quả
    getComments();
    async function getComments() {
      try {
        const comments = [];
        const q = db
          .collection("posts")
          .doc(value)
          .collection("comments")
          .orderBy("createdAt", "desc");

        const querySnapshot = await q.get();
        querySnapshot.forEach((doc) => {
          comments.push({ id: doc.id, ...doc.data() });
        });

        const cmtEl = document.querySelector("#comments");
        cmtEl.innerHTML = null;
        comments.forEach((comment) => {
          cmtEl.innerHTML += `
            <div class="p-3 rounded post-item">
                <p class="mb-1" style="color: #748398"><span style="color: #000">u/${
                  comment.user.displayName
                }</span> ${calculateElapsedTime(
            comment.createdAt?.seconds
              ? comment.createdAt.seconds * 1000
              : Date.now()
          )}</p>
                <p class="m-0 fs-5">${comment.title}</p>
            </div> 
            `;
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
