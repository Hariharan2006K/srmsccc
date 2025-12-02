// Utility functions for all pages

// Switch between login types
function switchLoginType(type) {
    try {
        console.log('Switching to:', type);
        
        const adminForm = document.getElementById('adminLoginForm');
        const studentForm = document.getElementById('studentLoginForm');
        const parentForm = document.getElementById('parentLoginForm');
        const tabBtns = document.querySelectorAll('.tab-btn');

        console.log('Forms found:', { adminForm: !!adminForm, studentForm: !!studentForm, parentForm: !!parentForm });

        // Hide all forms
        if (adminForm) adminForm.classList.remove('active');
        if (studentForm) studentForm.classList.remove('active');
        if (parentForm) parentForm.classList.remove('active');
        
        // Remove active class from all tabs
        tabBtns.forEach(btn => btn.classList.remove('active'));

        // Show selected form
        if (type === 'admin') {
            if (adminForm) adminForm.classList.add('active');
            if (tabBtns[0]) tabBtns[0].classList.add('active');
        } else if (type === 'student') {
            if (studentForm) studentForm.classList.add('active');
            if (tabBtns[1]) tabBtns[1].classList.add('active');
        } else if (type === 'parent') {
            if (parentForm) parentForm.classList.add('active');
            if (tabBtns[2]) tabBtns[2].classList.add('active');
        }
        
        console.log('Switched successfully');
    } catch (error) {
        console.error('Error in switchLoginType:', error);
    }
}
