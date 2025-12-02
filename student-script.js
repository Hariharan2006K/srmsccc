// Student Dashboard Script

let currentStudent = null;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkStudentAuth();
    loadStudentData();
    displayStudentRecord();
});

// Check if user is student
function checkStudentAuth() {
    const userType = localStorage.getItem('userType');
    if (userType !== 'student') {
        window.location.href = 'index.html';
    }
}

// Load student data from localStorage
function loadStudentData() {
    const data = localStorage.getItem('studentData');
    if (data) {
        currentStudent = JSON.parse(data);
    }
}

// Show specific section
function showSection(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.remove('active'));

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    if (section === 'record') {
        document.getElementById('recordSection').classList.add('active');
    } else if (section === 'grades') {
        document.getElementById('gradesSection').classList.add('active');
    } else if (section === 'attendance') {
        document.getElementById('attendanceSection').classList.add('active');
    } else if (section === 'feedback') {
        document.getElementById('feedbackSection').classList.add('active');
    }

    // Add active class to clicked link
    event.target.closest('.nav-link').classList.add('active');
}

// Display Student Record
function displayStudentRecord() {
    if (!currentStudent) return;

    document.getElementById('viewRollNo').textContent = currentStudent.rollNo;
    document.getElementById('viewName').textContent = currentStudent.name;
    document.getElementById('viewAge').textContent = currentStudent.age;
    document.getElementById('viewGrade').textContent = currentStudent.grade;
    document.getElementById('viewAddress').textContent = currentStudent.address;
    document.getElementById('viewEmail').textContent = currentStudent.email;
    document.getElementById('viewPhone').textContent = currentStudent.phone;
    document.getElementById('viewGPA').textContent = currentStudent.gpa.toFixed(2);
    document.getElementById('studentWelcome').textContent = `Welcome, ${currentStudent.name}!`;
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userType');
        localStorage.removeItem('studentId');
        localStorage.removeItem('studentData');
        window.location.href = 'index.html';
    }
}

// Submit Feedback
function submitFeedback() {
    const subject = document.getElementById('feedbackSubject').value.trim();
    const category = document.getElementById('feedbackCategory').value;
    const message = document.getElementById('feedbackMessage').value.trim();
    const rating = document.getElementById('feedbackRating').value;

    if (!subject || !category || !message || !rating) {
        alert('Please fill in all feedback fields');
        return;
    }

    // Create feedback object
    const feedback = {
        id: Date.now(),
        studentId: currentStudent.id,
        studentName: currentStudent.name,
        studentRollNo: currentStudent.rollNo,
        subject: subject,
        category: category,
        message: message,
        rating: rating,
        timestamp: new Date().toLocaleString(),
        status: 'unread'
    };

    // Get existing feedbacks
    let feedbacks = [];
    const existingFeedbacks = localStorage.getItem('studentFeedbacks');
    if (existingFeedbacks) {
        feedbacks = JSON.parse(existingFeedbacks);
    }

    // Add new feedback
    feedbacks.push(feedback);
    localStorage.setItem('studentFeedbacks', JSON.stringify(feedbacks));

    // Show success message
    document.getElementById('feedbackSuccess').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('feedbackSuccess').classList.add('hidden');
    }, 3000);

    // Reset form
    resetFeedbackForm();
}

// Reset Feedback Form
function resetFeedbackForm() {
    document.getElementById('feedbackForm').reset();
}
