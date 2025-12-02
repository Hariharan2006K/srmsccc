// Student Report Management System - Authentication

// Sample data
let students = [
    {
        id: 1,
        rollNo: 'S001',
        name: 'John Smith',
        age: 20,
        grade: 'A',
        address: '123 Main St, Springfield',
        email: 'john.smith@university.edu',
        phone: '+1-555-0101',
        gpa: 3.8,
        password: 'student123'
    },
    {
        id: 2,
        rollNo: 'S002',
        name: 'Emma Johnson',
        age: 19,
        grade: 'A+',
        address: '456 Oak Ave, Springfield',
        email: 'emma.johnson@university.edu',
        phone: '+1-555-0102',
        gpa: 3.95,
        password: 'student123'
    },
    {
        id: 3,
        rollNo: 'S003',
        name: 'Michael Brown',
        age: 21,
        grade: 'B+',
        address: '789 Pine Rd, Springfield',
        email: 'michael.brown@university.edu',
        phone: '+1-555-0103',
        gpa: 3.5,
        password: 'student123'
    },
    {
        id: 4,
        rollNo: 'S004',
        name: 'Sarah Davis',
        age: 20,
        grade: 'A',
        address: '321 Elm St, Springfield',
        email: 'sarah.davis@university.edu',
        phone: '+1-555-0104',
        gpa: 3.75,
        password: 'student123'
    }
];

// Parent data (linked to students)
let parents = [
    {
        id: 1,
        email: 'parent1@email.com',
        password: 'parent123',
        name: 'Robert Smith',
        studentId: 1,
        studentRollNo: 'S001'
    },
    {
        id: 2,
        email: 'parent2@email.com',
        password: 'parent123',
        name: 'Margaret Johnson',
        studentId: 2,
        studentRollNo: 'S002'
    },
    {
        id: 3,
        email: 'parent3@email.com',
        password: 'parent123',
        name: 'James Brown',
        studentId: 3,
        studentRollNo: 'S003'
    },
    {
        id: 4,
        email: 'parent4@email.com',
        password: 'parent123',
        name: 'Linda Davis',
        studentId: 4,
        studentRollNo: 'S004'
    }
];

// Admin credentials
const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

// Switch between login types
function switchLoginType(type) {
    const adminForm = document.getElementById('adminLoginForm');
    const studentForm = document.getElementById('studentLoginForm');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (type === 'admin') {
        adminForm.classList.add('active');
        studentForm.classList.remove('active');
        tabBtns[0].classList.add('active');
        tabBtns[1].classList.remove('active');
    } else {
        studentForm.classList.add('active');
        adminForm.classList.remove('active');
        tabBtns[1].classList.add('active');
        tabBtns[0].classList.remove('active');
    }
}

// Admin Login
function loginAdmin() {
    try {
        const username = document.getElementById('adminUsername').value.trim();
        const password = document.getElementById('adminPassword').value.trim();

        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }

        if (username === adminCredentials.username && password === adminCredentials.password) {
            // Store credentials
            localStorage.setItem('userType', 'admin');
            localStorage.setItem('username', username);
            // Store students data
            localStorage.setItem('studentsData', JSON.stringify(students));
            // Redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            alert('Invalid credentials! Try admin/admin123');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}

// Student Login
function loginStudent() {
    try {
        const rollNo = document.getElementById('studentRollNo').value.trim();
        const password = document.getElementById('studentPassword').value.trim();

        if (!rollNo || !password) {
            alert('Please enter both roll number and password');
            return;
        }

        const student = students.find(s => s.rollNo === rollNo && s.password === password);

        if (student) {
            // Store credentials
            localStorage.setItem('userType', 'student');
            localStorage.setItem('studentId', student.id);
            localStorage.setItem('studentData', JSON.stringify(student));
            localStorage.setItem('studentsData', JSON.stringify(students));
            // Redirect to student dashboard
            window.location.href = 'student-dashboard.html';
        } else {
            alert('Invalid credentials! Try S001/student123');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}

// Parent Login
function loginParent() {
    try {
        const email = document.getElementById('parentEmail').value.trim();
        const password = document.getElementById('parentPassword').value.trim();

        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        const parent = parents.find(p => p.email === email && p.password === password);

        if (parent) {
            // Find the student linked to this parent
            const student = students.find(s => s.id === parent.studentId);

            if (student) {
                // Store credentials
                localStorage.setItem('userType', 'parent');
                localStorage.setItem('parentData', JSON.stringify(parent));
                localStorage.setItem('studentData', JSON.stringify(student));
                localStorage.setItem('studentsData', JSON.stringify(students));
                // Redirect to parent dashboard
                window.location.href = 'parent-dashboard.html';
            } else {
                alert('Student data not found');
            }
        } else {
            alert('Invalid credentials! Try parent1@email.com/parent123');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}
