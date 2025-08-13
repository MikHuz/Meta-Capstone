# Restaurant Reservation Project

## Overview

This is a multi-page React project simulating a restaurant reservation workflow, built as part of a course assignment. The app includes the following pages:

- **Reserve a Table:** Select date, time, guests, and preferences  
- **Customer Details:** Collect user contact information  
- **Payment:** Capture payment information securely (simulated)  
- **Confirmation:** Show reservation confirmation and summary  

> **Note:** This project is for learning and demonstration purposes only and is **not intended for production use**.

---

## Features

- Multi-step form navigation across pages  
- Basic client-side validation with accessible error messaging  
- State management to preserve data between steps  
- Simulated submission process and confirmation display
- Unit test coverage using Jest
- Accessibility best practices including labels, ARIA attributes, and live regions  

---

## Technical Highlights

### React Context for State Management

The project uses **React Context** to manage and share state across multiple pages in the reservation flow. This allows form data to persist as users navigate between steps without relying on external state management libraries.

### API Call Simulation

While this project does not connect to a real backend, it simulates API calls for submitting reservation data. This demonstrates handling asynchronous operations and how you might integrate with a server in a full application.

### Jest Test Coverage

Unit and integration tests are implemented using **Jest** to validate critical functionality such as form validation, state updates, and component rendering. Test coverage helps ensure that changes do not break existing features and supports maintainable code quality.

---
