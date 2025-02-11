Overview
This project is a two-step registration form built using Next.js, TypeScript, and Tailwind CSS. The form mimics the provided Figma design,smooth transitions, and client-side validation.

Getting Started
Prerequisites
Ensure you have yarn installed on your system. You can install it by following the instructions on the official website.

Setup
Clone the repository:

bash
Copy
Edit
git clone <repository-url>
Navigate to the project directory:

bash
cd <project-directory>
Install the dependencies:

bash
yarn install
Run the development server:

bash
yarn dev
Open http://localhost:3000 in your browser to see the app in action.

Folder Structure
The project structure includes the following components:

Buttons: Reusable button components for the form navigation.
Blocks: UI blocks used to structure the form steps.
Form: The main form component, which handles the logic for the two-step form, validation, and state management.
The form consists of two steps:

Step 1: Collects user details (e.g., name, email).
Step 2: Collects phone information.
Back Button: A button allows users to return to Step 1. The state is preserved when navigating between the steps.
Validation: Each field has client-side validation, and the user receives feedback on missing or incorrect information.
State is managed within the form component using React’s useState hook, and the form state is preserved even when navigating back and forth between the steps.


Testing
Form Validation: Test the form by entering valid and invalid values for each field. Ensure that validation feedback is displayed when required.
Responsiveness: Resize the browser to verify that the form is responsive on different screen sizes.
 Accessibility
The form includes proper ARIA attributes for accessibility. 