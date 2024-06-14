document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const contentContainer = document.getElementById('content-container');
    const errorMessage = document.getElementById('error-message');
    const userCountElement = document.getElementById('user-count');

    // ตั้งค่า user, password และเวลาที่กำหนด
    const validCredentials = [
        { username: "admin168", password: "123456", timeout: 3600 * 1000 }, // 60 นาที
        { username: "dx", password: "164626", timeout: Infinity }, // ไม่จำกัดเวลา
        { username: "user3", password: "password3", timeout: 3600 * 1000 } // 60 นาที
    ];

    let activeUsers = 0;
    let isUserLoggedIn = false;
    let currentUserTimeout = null;

    // ฟังก์ชันสำหรับจัดการการล็อกเอาต์เมื่อไม่มีการใช้งาน
    let logoutTimer;
    function resetLogoutTimer() {
        if (isUserLoggedIn && currentUserTimeout !== Infinity) {
            clearTimeout(logoutTimer);
            logoutTimer = setTimeout(logoutUser, currentUserTimeout);
        }
    }

    function logoutUser() {
        alert("หมดเวลาการใช้งาน กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
        loginForm.style.display = 'block';
        contentContainer.style.display = 'none';
        isUserLoggedIn = false;
        decrementUserCount();
    }

    function incrementUserCount() {
        activeUsers++;
        updateUserCount();
        showActiveUsers();
    }

    function decrementUserCount() {
        if (activeUsers > 0) {
            activeUsers--;
        }
        updateUserCount();
        showActiveUsers();
    }

    function updateUserCount() {
        userCountElement.textContent = `จำนวนผู้ใช้งาน: ${activeUsers}`;
    }

    // ฟังก์ชันแสดงจำนวนผู้ใช้งานใน Console
    function showActiveUsers() {
        console.log(`จำนวนผู้ใช้งานปัจจุบัน: ${activeUsers}`);
    }

    // รีเซ็ตตัวจับเวลาเมื่อมีการคลิกหรือเคลื่อนเมาส์
    document.addEventListener('mousemove', resetLogoutTimer);
    document.addEventListener('click', resetLogoutTimer);

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        
        // ตรวจสอบว่า username และ password ตรงกับคู่ที่ตั้งไว้หรือไม่
        const user = validCredentials.find(cred => cred.username === usernameInput && cred.password === passwordInput);

        if (user) {
            loginForm.style.display = 'none';
            contentContainer.style.display = 'grid';
            isUserLoggedIn = true;
            currentUserTimeout = user.timeout;
            incrementUserCount();
            incrementTotalVisits();
            resetLogoutTimer(); // เริ่มจับเวลาเมื่อเข้าสู่ระบบสำเร็จ
        } else {
            errorMessage.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        }
    });

    // ฟังก์ชันสำหรับนับจำนวนผู้เข้าชมทั้งหมด
    function incrementTotalVisits() {
        let totalVisits = localStorage.getItem('totalVisits') || 0;
        totalVisits++;
        localStorage.setItem('totalVisits', totalVisits);
        console.log(`จำนวนผู้เข้าชมทั้งหมด: ${totalVisits}`);
    }

    // แสดงจำนวนผู้เข้าชมทั้งหมดใน console
    function showTotalVisits() {
        let totalVisits = localStorage.getItem('totalVisits') || 0;
        console.log(`จำนวนผู้เข้าชมทั้งหมด: ${totalVisits}`);
    }

    // เรียกฟังก์ชันแสดงจำนวนผู้เข้าชมทั้งหมดเมื่อโหลดหน้า
    showTotalVisits();
});
