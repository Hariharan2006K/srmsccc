// Parent Dashboard Script

// Load initial data
window.addEventListener('DOMContentLoaded', function() {
    loadParentData();
    displayChildRecord();
});

// Load parent data from localStorage
function loadParentData() {
    try {
        const userType = localStorage.getItem('userType');
        const parentData = JSON.parse(localStorage.getItem('parentData') || '{}');
        const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');

        if (userType !== 'parent') {
            window.location.href = 'index.html';
            return;
        }

        // Display welcome message
        const parentName = parentData.name || 'Parent';
        document.getElementById('parentWelcome').textContent = `Welcome, ${parentName}`;
    } catch (error) {
        console.error('Error loading parent data:', error);
        window.location.href = 'index.html';
    }
}

// Display child's record
function displayChildRecord() {
    try {
        const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');

        document.getElementById('viewRollNo').textContent = studentData.rollNo || 'N/A';
        document.getElementById('viewName').textContent = studentData.name || 'N/A';
        document.getElementById('viewAge').textContent = studentData.age || 'N/A';
        document.getElementById('viewGrade').textContent = studentData.grade || 'N/A';
        document.getElementById('viewAddress').textContent = studentData.address || 'N/A';
        document.getElementById('viewEmail').textContent = studentData.email || 'N/A';
        document.getElementById('viewPhone').textContent = studentData.phone || 'N/A';
        document.getElementById('viewGPA').textContent = studentData.gpa || 'N/A';
    } catch (error) {
        console.error('Error displaying child record:', error);
    }
}

// Show section
function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Remove active class from all sections
    sections.forEach(s => s.classList.remove('active'));

    // Remove active class from all nav links
    navLinks.forEach(link => link.classList.remove('active'));

    // Show selected section
    if (sectionName === 'record') {
        document.getElementById('recordSection').classList.add('active');
    } else if (sectionName === 'grades') {
        document.getElementById('gradesSection').classList.add('active');
    } else if (sectionName === 'attendance') {
        document.getElementById('attendanceSection').classList.add('active');
    } else if (sectionName === 'feedback') {
        document.getElementById('feedbackSection').classList.add('active');
    }

    // Add active class to clicked link
    event.target.closest('.nav-link').classList.add('active');
}

// Submit parent message
function submitParentMessage() {
    try {
        const subject = document.getElementById('messageSubject').value.trim();
        const category = document.getElementById('messageCategory').value;
        const content = document.getElementById('messageContent').value.trim();
        const priority = document.getElementById('messageRating').value;

        if (!subject || !category || !content || !priority) {
            alert('Please fill in all fields');
            return;
        }

        const parentData = JSON.parse(localStorage.getItem('parentData') || '{}');
        const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');

        // Get existing feedbacks or create new array
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');

        // Create new feedback object (from parent perspective, it's a message)
        const newMessage = {
            id: Date.now(),
            studentRollNo: studentData.rollNo,
            studentName: studentData.name,
            category: category,
            subject: subject,
            message: content,
            rating: priority,
            status: 'unread',
            type: 'parent-message', // To distinguish from student feedback
            parentName: parentData.name || 'Parent',
            timestamp: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        };

        feedbacks.push(newMessage);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        // Show success message
        const successBox = document.getElementById('messageSuccess');
        successBox.classList.remove('hidden');

        // Reset form
        document.getElementById('parentMessageForm').reset();

        // Hide success message after 3 seconds
        setTimeout(() => {
            successBox.classList.add('hidden');
        }, 3000);
    } catch (error) {
        console.error('Error submitting message:', error);
        alert('An error occurred while sending your message');
    }
}

// Reset parent form
function resetParentForm() {
    document.getElementById('parentMessageForm').reset();
    document.getElementById('messageSuccess').classList.add('hidden');
}

// Logout
function logout() {
    try {
        localStorage.removeItem('userType');
        localStorage.removeItem('parentData');
        localStorage.removeItem('studentData');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = 'index.html';
    }
}
