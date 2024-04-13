const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userName = registerForm.username.value;
  const email = registerForm.email.value;
  const pass = registerForm.password.value;
  // func validate
  function validate() {
    if (userName.trim() === "" || email.trim() === "" || pass.trim() === "") {
      alert("Vui lòng điền đầy đủ thông tin!!!");
      return false;
    }
    // Đoạn mã emailPattern là một biểu thức chính quy được sử dụng
    // để kiểm tra một chuỗicó phải là một địa chỉ email hợp lệ hay ko
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Email không hợp lệ");
      return false;
    }
    if (pass.length < 6) {
      alert("Mật khẩu phải chứa ít nhất 6 ký tự");
      return false;
    }
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/;
    if (!passwordPattern.test(pass)) {
      alert(
        "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một ký tự đặc biệt"
      );
      return false;
    }
    return true;
  }

  if (validate()) {
    async function register() {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          pass
        );
        console.log(userCredential);
        // Gửi mail xác thực
        await auth.currentUser.sendEmailVerification();
        //Update profile
        await auth.currentUser.updateProfile({
          displayName: userName,
          photoURL: `https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg`,
        });

        alert("Đăng ký thành công!!!");
      } catch (err) {
        alert("Đã xảy ra lỗi: " + err);
      }
    }
    register();
  }
});
