## Sprint 4 Planning

### Sprint Objectives
**Goal:** At the end of Sprint 4, the system will include features for enhanced communication between admins and clients through email, a direct chatting system between customers and customer representatives, support for multiple individuals in each car reservation, and refactoring of the project to improve code quality and maintainability.

### To Do Items:
- Implement email communication functionality for admins and clients.
- Develop a direct chatting system for communication between customers and customer representatives.
- Allow multiple individuals to be included in each car reservation.
- Perform refactoring of the project to enhance code quality and maintainability.

## User Stories Board

| Issue | User Story Title                        | Story Points | Due Date | Associated Tasks                                         | Priority | Risk   | Responsible/Owner |
|-------|-----------------------------------------|--------------|----------|----------------------------------------------------------|----------|--------|-------------------|
| #201  | US-13: Email Communication             | 5            | [Due Date] | Implement Email Sending Functionality, Design Email Templates, Integrate Email System with Admin Interface, Handle Email Responses | High     | High   | Abdel-Rahman |
| #202  | US-14: Direct Chatting System          | 8            | [Due Date] | Develop Chat Interface, Implement Real-time Messaging Functionality, Handle User Authentication, Manage Message History, Integrate with Customer Support Interface | High     | High   | Mohammed/Samy |
| #203  | US-15: Multiple Persons in Reservation | 3            | [Due Date] | Update Reservation Data Model, Modify Booking Process, Adjust Payment Handling, Validate Data Entry for Multiple Persons | Medium   | Medium | Zeyad |
| #204  | US-16: Project Refactoring             | 5            | [Due Date] | Identify Code Smells and Technical Debt, Refactor Key Components, Improve Code Readability and Maintainability, Document Refactored Code | High     | Medium | Matteo |

## Task Breakdown

| Issue | Task Title                               | Story Points | Associated User Story                      | Priority | Estimated Effort | Dependencies          |
|-------|------------------------------------------|--------------|--------------------------------------------|----------|------------------|-----------------------|
| #201  | Implement email sending functionality    | 3            | US-13: Email Communication                | High     | 3                | None                  |
| #201  | Design email templates                   | 2            | US-13: Email Communication                | Medium   | 2                | Implement email sending functionality |
| #201  | Integrate email system with Admin interface | 3         | US-13: Email Communication                | High     | 3                | Implement email sending functionality |
| #201  | Handle email responses                   | 2            | US-13: Email Communication                | Medium   | 2                | Implement email sending functionality |
| #202  | Develop chat interface                   | 3            | US-14: Direct Chatting System             | High     | 3                | None                  |
| #202  | Implement real-time messaging functionality | 4        | US-14: Direct Chatting System             | High     | 4                | Develop chat interface |
| #202  | Handle user authentication               | 2            | US-14: Direct Chatting System             | Medium   | 2                | Develop chat interface |
| #202  | Manage message history                   | 2            | US-14: Direct Chatting System             | Medium   | 2                | Develop chat interface |
| #202  | Integrate with Customer Support interface | 2          | US-14: Direct Chatting System             | High     | 2                | Develop chat interface |
| #203  | Update reservation data model           | 2            | US-15: Multiple Persons in Reservation    | Medium   | 2                | None                  |
| #203  | Modify booking process                  | 2            | US-15: Multiple Persons in Reservation    | Medium   | 2                | Update reservation data model |
| #203  | Adjust payment handling                 | 2            | US-15: Multiple Persons in Reservation    | Medium   | 2                | Update reservation data model |
| #203  | Validate data entry for multiple persons| 2            | US-15: Multiple Persons in Reservation    | Medium   | 2                | Update reservation data model |
| #204  | Identify code smells and technical debt | 3            | US-16: Project Refactoring               | High     | 3                | None                  |
| #204  | Refactor key components                 | 3            | US-16: Project Refactoring               | High     | 3                | Identify code smells and technical debt |
| #204  | Improve code readability and maintainability | 3        | US-16: Project Refactoring               | High     | 3                | Refactor key components |
| #204  | Document refactored code                | 2            | US-16: Project Refactoring               | Medium   | 2                | Refactor key components |
