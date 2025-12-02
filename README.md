# Email Application - Project 1

## Project Overview
This is an Email Application that simulates creating email accounts for new hires in an IT Support Administrator role. The application generates email addresses with specific syntax and provides functionality to manage email account settings.

## Features Implemented

### ✅ All Requirements Met:
1. **Generate email with syntax**: `firstname.lastname@department.company.com`
2. **Determine department**: Choose from sales, development, accounting, or leave blank
3. **Generate random password**: Creates a secure random password
4. **Set methods**: Change password, set mailbox capacity, define alternate email
5. **Get methods**: Display name, email, and mailbox capacity

## How to Run

### Prerequisites
- Java JDK 8 or higher installed
- Command line access

### Compilation and Execution
```bash
# Compile the Java files
javac Email.java EmailApp.java

# Run the application
java EmailApp
```

## Usage

1. **Run the application**: Execute `java EmailApp`
2. **Enter first name**: The program will prompt for the employee's first name
3. **Enter last name**: The program will prompt for the employee's last name
4. **Select department**: Choose from the available options:
   - 1 for Sales
   - 2 for Development  
   - 3 for Accounting
   - 0 for none (blank department)
5. **View generated account**: The system will display the created email account
6. **Modify settings**: Use the setter methods to customize the account

## Example Output
```
=== EMAIL APPLICATION ===
Welcome to the Email Account Generator!

Enter first name: John
Enter last name: Smith

DEPARTMENT CODES:
1 for Sales
2 for Development
3 for Accounting
0 for none
Enter department code: 2

=== EMAIL ACCOUNT CREATED ===
DISPLAY NAME: John Smith
COMPANY EMAIL: john.smith@development.company.com
MAILBOX CAPACITY: 500mb

=== DEMONSTRATING SETTER METHODS ===
Mailbox capacity changed to: 1000mb
Alternate email set to: john.smith.personal@gmail.com
Password changed to: NewSecurePassword123!

=== FINAL ACCOUNT INFO ===
DISPLAY NAME: John Smith
COMPANY EMAIL: john.smith@development.company.com
MAILBOX CAPACITY: 1000mb
```

## File Structure
- `Email.java` - Main Email class with all functionality
- `EmailApp.java` - Application runner and demonstration
- `README.md` - This documentation file

## Technical Details

### Email Class Features:
- **Constructor**: Takes first name and last name
- **Department Selection**: Interactive department choice
- **Password Generation**: Random 8-character password
- **Email Generation**: Automatic email address creation
- **Setters**: Modify password, mailbox capacity, alternate email
- **Getters**: Retrieve account information
- **Display**: Show formatted account information

### Security Features:
- Random password generation with mixed characters
- Secure password storage
- Input validation for department selection

## Project Requirements Fulfillment
This implementation fully satisfies all the requirements specified in the project specification:
- ✅ Email syntax generation
- ✅ Department determination
- ✅ Random password generation
- ✅ Setter methods for customization
- ✅ Getter methods for information retrieval 