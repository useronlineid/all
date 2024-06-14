// script.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const contentContainer = document.getElementById('content-container');
    const errorMessage = document.getElementById('error-message');

    // ตั้งค่า user และ password หลายคู่
    const validCredentials = [
        { username: "admin168", password: "123456" },
        { username: "dx", password: "164626" },
        { username: "user3", password: "password3" }
    ];

    // ฟังก์ชันสำหรับจัดการการล็อกเอาต์เมื่อไม่มีการใช้งาน
    let logoutTimer;
    function resetLogoutTimer() {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(logoutUser, 3600 * 1000); // 60 นาที
    }

    function logoutUser() {
        alert("หมดเวลาการใช้งาน กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
        loginForm.style.display = 'block';
        contentContainer.style.display = 'none';
    }

    // รีเซ็ตตัวจับเวลาเมื่อมีการคลิกหรือเคลื่อนเมาส์
    document.addEventListener('mousemove', resetLogoutTimer);
    document.addEventListener('click', resetLogoutTimer);

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        
        // ตรวจสอบว่า username และ password ตรงกับคู่ที่ตั้งไว้หรือไม่
        const isValid = validCredentials.some(cred => cred.username === usernameInput && cred.password === passwordInput);

        if (isValid) {
            loginForm.style.display = 'none';
            contentContainer.style.display = 'grid';
            resetLogoutTimer(); // เริ่มจับเวลาเมื่อเข้าสู่ระบบสำเร็จ
        } else {
            errorMessage.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        }
    });
});
