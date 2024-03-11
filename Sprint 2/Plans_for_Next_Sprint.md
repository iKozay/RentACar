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
| #125  | Implement user authentication            | 3            | US-11: Check-in Process | Medium   |                  |              |
| #125  | Develop branch location search           | 5            | US-11: Check-in Process | High     |                  |              |
| #125  | Verify Customer Information              | 3            | US-11: Check-in Process | Medium   |                  |              |
| #125  | Check Reservation Status                 | 3            | US-11: Check-in Process | Medium   |                  |              |
| #125  | Create a New Reservation (if necessary)  | 5            | US-11: Check-in Process | High     |                  |              |
| #125  | Review Rental Agreement                  | 3            | US-11: Check-in Process | Medium   |                  |              |
| #125  | Process Payment                          | 5            | US-11: Check-in Process | High     |                  |              |
| #125  | Complete Check-in Process                | 3            | US-11: Check-in Process | Medium   |                  |              |
| #125  | Implement check-out process              | 7            | US-11: Check-in Process | High     |                  |              |
| #122  | Implement Branch Locator Page            | 5            | US-10: Find a Branch   | High     |                  |              |
| #122  | Implement Search Functionality           | 5            | US-10: Find a Branch   | High     |                  |              |
| #122  | Handle Postal Code Search                | 3            | US-10: Find a Branch   | Medium   |                  |              |
| #122  | Handle Airport Name/Code Search         | 3            | US-10: Find a Branch   | Medium   |                  |              |
| #122  | Sort Branches by Proximity              | 3            | US-10: Find a Branch   | Medium   |                  |              |
| #122  | Display Results                          | 3            | US-10: Find a Branch   | Medium   |                  |              |
| #122  | Handle No Results Found                  | 3            | US-10: Find a Branch   | Low      |                  |              |
| #172  | Confirm Return of Rental Vehicle         | 8            | US-12: Check-out Process | High     |                  |              |
| #172  | Verify Vehicle Details                   | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Compare with Reservation Information     | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Inspect for Damages                      | 5            | US-12: Check-out Process | High     |                  |              |
| #172  | Use Digital Inspection Tools             | 5            | US-12: Check-out Process | High     |                  |              |
| #172  | Document Damages                         | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Review Additional Charges                | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Identify Late Fees, Fuel Charges, etc.   | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Review Charges with Customer             | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Process Final Payment                    | 5            | US-12: Check-out Process | High     |                  |              |
| #172  | Calculate Final Rental Cost              | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Collect Payment                          | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Provide Receipt                          | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Provide Necessary Documentation          | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Offer Digital Copies of Documents        | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Explain Terms and Conditions             | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Complete Check-out Process               | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Update Reservation Status                | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Return Deposited Funds                   | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Hand Over Documentation                  | 3            | US-12: Check-out Process | Medium   |                  |              |
| #172  | Express Gratitude to Customer            | 3            | US-12: Check-out Process | Medium   |                  |              |


