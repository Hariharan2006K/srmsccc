// Admin Dashboard Script

let students = [];
let feedbacks = [];

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    loadStudentsData();
    loadFeedbacks();
    loadStudentsTable();
    updateFeedbackBadge();
});

// Check if user is admin
function checkAdminAuth() {
    const userType = localStorage.getItem('userType');
    if (userType !== 'admin') {
        window.location.href = 'index.html';
    }
}

// Load students data from localStorage
function loadStudentsData() {
    const data = localStorage.getItem('studentsData');
    if (data) {
        students = JSON.parse(data);
    }
}

// Show specific section
function showSection(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.remove('active'));

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    if (section === 'students') {
        document.getElementById('studentsSection').classList.add('active');
        loadStudentsTable();
    } else if (section === 'add') {
        document.getElementById('addSection').classList.add('active');
        document.getElementById('addStudentForm').reset();
    } else if (section === 'feedback') {
        document.getElementById('feedbackSection').classList.add('active');
        displayFeedbacks();
    }

    // Add active class to clicked link
    event.target.closest('.nav-link').classList.add('active');
}

// Load Students Table
function loadStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';

    students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.address}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.gpa.toFixed(2)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="openEditModal(${student.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Filter Students
function filterStudents() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const tbody = document.getElementById('studentsTableBody');
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(searchValue) ? '' : 'none';
    });
}

// Add Student
function addStudent() {
    const rollNo = document.getElementById('newRollNo').value.trim();
    const name = document.getElementById('newName').value.trim();
    const age = parseInt(document.getElementById('newAge').value);
    const grade = document.getElementById('newGrade').value.trim();
    const address = document.getElementById('newAddress').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const phone = document.getElementById('newPhone').value.trim();
    const gpa = parseFloat(document.getElementById('newGPA').value);
    const password = document.getElementById('newPassword').value.trim();

    if (!rollNo || !name || !age || !grade || !address || !email || !phone || !gpa || !password) {
        alert('Please fill all fields');
        return;
    }

    // Check if roll number already exists
    if (students.find(s => s.rollNo === rollNo)) {
        alert('Roll number already exists');
        return;
    }

    const newId = Math.max(...students.map(s => s.id), 0) + 1;

    const newStudent = {
        id: newId,
        rollNo: rollNo,
        name: name,
        age: age,
        grade: grade,
        address: address,
        email: email,
        phone: phone,
        gpa: gpa,
        password: password
    };

    students.push(newStudent);
    localStorage.setItem('studentsData', JSON.stringify(students));
    alert('Student added successfully!');
    document.getElementById('addStudentForm').reset();
    showSection('students');
}

// Open Edit Modal
function openEditModal(studentId) {
    const student = students.find(s => s.id === studentId);

    if (student) {
        document.getElementById('editStudentId').value = student.id;
        document.getElementById('editRollNo').value = student.rollNo;
        document.getElementById('editName').value = student.name;
        document.getElementById('editAge').value = student.age;
        document.getElementById('editGrade').value = student.grade;
        document.getElementById('editAddress').value = student.address;
        document.getElementById('editEmail').value = student.email;
        document.getElementById('editPhone').value = student.phone;
        document.getElementById('editGPA').value = student.gpa;

        document.getElementById('editModal').classList.remove('hidden');
    }
}

// Close Edit Modal
function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}

// Update Student
function updateStudent() {
    const studentId = parseInt(document.getElementById('editStudentId').value);
    const student = students.find(s => s.id === studentId);

    if (student) {
        student.name = document.getElementById('editName').value.trim();
        student.age = parseInt(document.getElementById('editAge').value);
        student.grade = document.getElementById('editGrade').value.trim();
        student.address = document.getElementById('editAddress').value.trim();
        student.email = document.getElementById('editEmail').value.trim();
        student.phone = document.getElementById('editPhone').value.trim();
        student.gpa = parseFloat(document.getElementById('editGPA').value);

        localStorage.setItem('studentsData', JSON.stringify(students));
        alert('Student record updated successfully!');
        closeEditModal();
        loadStudentsTable();
    }
}

// Delete Student
function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== studentId);
        localStorage.setItem('studentsData', JSON.stringify(students));
        alert('Student deleted successfully!');
        loadStudentsTable();
    }
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userType');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
};

// Load Feedbacks from localStorage
function loadFeedbacks() {
    const data = localStorage.getItem('studentFeedbacks');
    if (data) {
        feedbacks = JSON.parse(data);
    } else {
        feedbacks = [];
    }
}

// Update Feedback Badge
function updateFeedbackBadge() {
    const unreadFeedbacks = feedbacks.filter(f => f.status === 'unread').length;
    const badge = document.getElementById('feedbackBadge');
    if (unreadFeedbacks > 0) {
        badge.textContent = unreadFeedbacks;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// Display Feedbacks
function displayFeedbacks() {
    const container = document.getElementById('feedbackContainer');
    const noFeedback = document.getElementById('noFeedback');

    if (feedbacks.length === 0) {
        container.innerHTML = '';
        noFeedback.style.display = 'block';
        return;
    }

    noFeedback.style.display = 'none';
    container.innerHTML = '';

    feedbacks.forEach((feedback, index) => {
        const feedbackCard = document.createElement('div');
        feedbackCard.className = `feedback-card ${feedback.status === 'unread' ? 'unread' : ''}`;
        feedbackCard.innerHTML = `
            <div class="feedback-header">
                <div>
                    <h3>${feedback.subject}</h3>
                    <p class="feedback-meta">
                        <span class="badge-category">${feedback.category}</span>
                        <span class="rating">${'⭐'.repeat(feedback.rating)}</span>
                        <span class="timestamp">${feedback.timestamp}</span>
                    </p>
                </div>
                <button class="close-feedback" onclick="deleteFeedback(${index})" title="Delete">✕</button>
            </div>
            <div class="feedback-content">
                <p><strong>From:</strong> ${feedback.studentName} (${feedback.studentRollNo})</p>
                <p><strong>Message:</strong></p>
                <p class="message">${feedback.message}</p>
            </div>
            <div class="feedback-footer">
                <button onclick="markFeedbackAsRead(${index})" class="btn-small">
                    ${feedback.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                </button>
            </div>
        `;
        container.appendChild(feedbackCard);
    });
}

// Mark Feedback as Read
function markFeedbackAsRead(index) {
    if (feedbacks[index].status === 'unread') {
        feedbacks[index].status = 'read';
    } else {
        feedbacks[index].status = 'unread';
    }
    localStorage.setItem('studentFeedbacks', JSON.stringify(feedbacks));
    updateFeedbackBadge();
    displayFeedbacks();
}

// Delete Feedback
function deleteFeedback(index) {
    if (confirm('Are you sure you want to delete this feedback?')) {
        feedbacks.splice(index, 1);
        localStorage.setItem('studentFeedbacks', JSON.stringify(feedbacks));
        updateFeedbackBadge();
        displayFeedbacks();
    }
}

// Filter Feedback
function filterFeedback() {
    const searchValue = document.getElementById('feedbackSearch').value.toLowerCase();
    const categoryValue = document.getElementById('feedbackCategoryFilter').value;

    const filteredFeedbacks = feedbacks.filter(f => {
        const matchSearch = f.subject.toLowerCase().includes(searchValue) ||
                           f.studentName.toLowerCase().includes(searchValue) ||
                           f.message.toLowerCase().includes(searchValue);
        const matchCategory = categoryValue === '' || f.category === categoryValue;
        return matchSearch && matchCategory;
    });

    if (filteredFeedbacks.length === 0) {
        document.getElementById('feedbackContainer').innerHTML = '';
        document.getElementById('noFeedback').style.display = 'block';
        return;
    }

    document.getElementById('noFeedback').style.display = 'none';
    const container = document.getElementById('feedbackContainer');
    container.innerHTML = '';

    filteredFeedbacks.forEach((feedback, index) => {
        const feedbackCard = document.createElement('div');
        feedbackCard.className = `feedback-card ${feedback.status === 'unread' ? 'unread' : ''}`;
        feedbackCard.innerHTML = `
            <div class="feedback-header">
                <div>
                    <h3>${feedback.subject}</h3>
                    <p class="feedback-meta">
                        <span class="badge-category">${feedback.category}</span>
                        <span class="rating">${'⭐'.repeat(feedback.rating)}</span>
                        <span class="timestamp">${feedback.timestamp}</span>
                    </p>
                </div>
                <button class="close-feedback" onclick="deleteFeedback(${feedbacks.indexOf(feedback)})" title="Delete">✕</button>
            </div>
            <div class="feedback-content">
                <p><strong>From:</strong> ${feedback.studentName} (${feedback.studentRollNo})</p>
                <p><strong>Message:</strong></p>
                <p class="message">${feedback.message}</p>
            </div>
            <div class="feedback-footer">
                <button onclick="markFeedbackAsRead(${feedbacks.indexOf(feedback)})" class="btn-small">
                    ${feedback.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                </button>
            </div>
        `;
        container.appendChild(feedbackCard);
    });
}
