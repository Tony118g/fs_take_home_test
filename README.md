# FS Take Home Test

*This project is for educational purposes only.*

This repository hosts the code for a TCM test assignment. The requirements are outlined [here](assignment.md).

---

## User Manager App Overview

This app lets you create, view, edit, and delete users, each with a first name, last name, and date of birth (which is used to calculate and display age). The UI also provides some validation feedback to ensure data quality.

---

## Screenshots & Features

### Landing Page

Shows initial options to create a user or view the user list.

![Landing Page](readme-images/landing.png)

---

### Creating a New User

- The form only allows letters in name fields.
- Date of birth cannot be a future date.
- Validation errors are shown inline.

![Create User Form](readme-images/create_ss.png)  
*User creation form with input fields.*

![Name Validation Error](readme-images/name-err-msg.png)  
*Shows error when entering invalid characters in name fields.*

![Date Validation Error](readme-images/date-err-msg.png)  
*Shows error if the date of birth is in the future.*

![Date Restriction](readme-images/date-restriction.png)  
*Date picker restricted to today or earlier.*

---

### Successful User Creation

After submitting a valid form, a success message confirms creation.

![Create Success Message](readme-images/create-success-msg.png)  

---

### Viewing Users List

- Displays all users with their age and date of birth.
- Options to edit or delete each user.

![User List View](readme-images/user-list.png)

---

### Editing a User

- Inline editing replaces the user display.
- Same validations as creation apply.
- Save or cancel changes.

![Edit View](readme-images/edit-view.png)

---

### Successful User Update

After saving edits, a success message appears.

![Update Success Message](readme-images/update-success-msg.png)

---

### Deleting a User

- Click "Delete" button to remove a user.
- Success message confirms deletion.

![Delete Success Message](readme-images/delete-success-msg.png)

## How to Run

### Prerequisites

- Docker installed on your machine ([Get Docker](https://www.docker.com/get-started))
- Docker Compose installed (usually included with Docker Desktop) ([Install Docker Compose](https://docs.docker.com/compose/install/))

### Starting the Application

Clone the repository and navigate to the project folder via:

git clone repo-url

cd repo-folder

Then run the command: "docker compose up" and navigate to the local url returned in the response.

## Disclaimer

Some parts of this project, including formatting and code comments, were assisted by ChatGPT.

This project is intended solely for educational purposes and should not be used in production without appropriate review and licensing considerations.