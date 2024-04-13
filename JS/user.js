const containerEL = document.querySelector(".container");

auth.onAuthStateChanged((user) => {
  if (user) {
    containerEL.innerHTML = `
    <form id="user-form">
    <div class="user-avatar">
      <div class="upload">
        <img
          src="${user.photoURL}"
          name="userAvatar"
          width="100"
          height="100"
          alt=""
        />
        <div class="round">
          <input type="file" id="uploadInput" name="uploadInput" />
          <i class="fa fa-camera" style="color: #fff"></i>
        </div>
      </div>
      <h1><span class="username">${user.displayName}</span></h1>
      <p>u/<span class="username">${user.displayName}</span></p>
    </div>
    <div class="form-content">
      <label for="email">Email:</label>
      <input type="text" name="email" value="${user.email}" />
      <label for="numberPhone">Number phone:</label>
      <input type="text" name="numberPhone" value="${user.phoneNumber}" />
      <label for="address">Address:</label>
      <input type="text" name="address" value="" />
      <input type="submit" class="btn-submit" value="update" />
    </div>
  </form>
    `;
  } else {
    window.location.href = "../index.html";
  }

  // const uploadInput = document.querySelector("#uploadInput");
  // const userForm = document.querySelector("#user-form");
  // uploadInput.addEventListener("change", function (event) {
  //   const file = event.target.files[0];
  //   const storageRef = storage.ref("avatars/" + file.name);
  //   console.log(file.name);
  //   // const reader = new FileReader();
  //   // reader.readAsDataURL(file);

  //   // reader.onload = function (e) {
  //   //   avatarEl.src = e.target.result;
  //   //   firebase.storage().ref("pictures" + user.uid);
  //   // };
  // });

  // userForm.addEventListener("submit", function (e) {
  //   e.preventDefault();

  //   const file = uploadInput.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onload = function (e) {
  //     auth.currentUser.updateProfile({
  //       photoURL: e.target.result,
  //     });
  //   };
  // });
});
