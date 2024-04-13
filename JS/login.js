const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = loginForm.email.value;
  const pass = loginForm.password.value;
  function validate() {
    if (email === "" || pass === "") {
      alert("Vui long dien du thong tin!");
      return false;
    }
    return true;
  }
  if (validate()) {
    async function login() {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(
          email,
          pass
        );
        const user = userCredential.user;

        if (!user.emailVerified) {
          auth.signOut();
          alert("Vui lòng xác thực email!!!");
        } else {
          alert("Đăng nhập thành công!!!");
          window.location.href = "../index.html";
        }
      } catch (err) {
        alert("Đã xảy ra lỗi: " + err);
      }
    }
    login();
  }
});
