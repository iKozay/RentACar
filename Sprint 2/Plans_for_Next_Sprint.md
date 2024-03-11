# Planning for Sprint 3 

## Sprint Objectives
Goal: At the end of Sprint 3, the system will provide complete functionality for booking vehicles, facilitating the check-in and check-out processes at rental branches. This includes enabling users to sign in, search for vehicles, select rental options, confirm bookings, and manage payments seamlessly. Additionally, the system will implement necessary architecture design requirements, including generating UML diagrams for each process and stubbing/mock data for interactions with external systems.

### To Do items:    
    - Implement user authentication and branch location search.
    - Develop vehicle search, selection, and booking confirmation.
    - Integrate payment processing and generate booking confirmations.
    - Implement employee reservation creation and deposit handling.
    - Develop check-in and check-out processes.
    - Set up email confirmation system.
    - Create mocks/stubs for external systems.
    - Generate UML diagrams and activity diagrams.
    - Integrate rental agreement template and populate with data.
    - Implement indemnification handling.




## User Stories Board

| Issue | User Story Title | Story Points | Due Date | Associated Tasks | Priority | Risk | Responsible/Owner |
| -- | -- | -- | -- | -- | -- | -- | -- |
| #122 | US-10: Find a Branch|  | Mar. 25 | |  |  |  |
| #125 | US-11: Check-in Process |  | Mar. 25 |  |  |  |  |
| #172 | US-12: Check-out Process  | 7 | Mar. 25 |  |  |  |  |


| Issue | Task Title                               | Story Points | Associated User Story | Priority | Estimated Effort | Dependencies |
|-------|------------------------------------------|--------------|-----------------------|----------|------------------|--------------|
| #125  | Implement user authentication            | 2            | US-11: Check-in Process | Medium   | 3                |              |
| #125  | Develop branch location search           | 3            | US-11: Check-in Process | High     | 3                |              |
| #125  | Verify Customer Information              | 2            | US-11: Check-in Process | Medium   | 2                |              |
| #125  | Check Reservation Status                 | 2            | US-11: Check-in Process | Medium   | 2                |              |
| #125  | Create a New Reservation (if necessary)  | 3            | US-11: Check-in Process | High     | 3                |              |
| #125  | Review Rental Agreement                  | 2            | US-11: Check-in Process | Medium   | 2                |              |
| #125  | Process Payment                          | 3            | US-11: Check-in Process | High     | 3                |              |
| #125  | Complete Check-in Process                | 2            | US-11: Check-in Process | Medium   | 3                |              |
| #125  | Implement check-out process              | 5            | US-11: Check-in Process | High     | 3                |              |
| #122  | Implement Branch Locator Page            | 3            | US-10: Find a Branch   | High     | 3                |              |
| #122  | Implement Search Functionality           | 3            | US-10: Find a Branch   | High     | 3                |              |
| #122  | Handle Postal Code Search                | 2            | US-10: Find a Branch   | Medium   | 1                |              |
| #122  | Handle Airport Name/Code Search         | 2            | US-10: Find a Branch   | Medium   | 1                |              |
| #122  | Sort Branches by Proximity              | 2            | US-10: Find a Branch   | Medium   | 1                |              |
| #122  | Display Results                          | 2            | US-10: Find a Branch   | Medium   | 1                |              |
| #122  | Handle No Results Found                  | 1            | US-10: Find a Branch   | Low      | 1                |              |
| #172  | Confirm Return of Rental Vehicle         | 5            | US-12: Check-out Process | High     | 3                |              |
| #172  | Verify Vehicle Details                   | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Compare with Reservation Information     | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Inspect for Damages                      | 3            | US-12: Check-out Process | High     | 2                |              |
| #172  | Use Digital Inspection Tools             | 3            | US-12: Check-out Process | High     | 2                |              |
| #172  | Document Damages                         | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Review Additional Charges                | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Identify Late Fees, Fuel Charges, etc.   | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Review Charges with Customer             | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Process Final Payment                    | 3            | US-12: Check-out Process | High     | 3                |              |
| #172  | Calculate Final Rental Cost              | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Collect Payment                          | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Provide Receipt                          | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Provide Necessary Documentation          | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Offer Digital Copies of Documents        | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Explain Terms and Conditions             | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Complete Check-out Process               | 2            | US-12: Check-out Process | Medium   | 3                |              |
| #172  | Update Reservation Status                | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Return Deposited Funds                   | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Hand Over Documentation                  | 2            | US-12: Check-out Process | Medium   | 2                |              |
| #172  | Express Gratitude to Customer            | 2            | US-12: Check-out Process | Medium   | 2                |              |



