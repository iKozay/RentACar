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

| Issue | User Story Title         | Story Points | Due Date | Associated Tasks       | Priority | Risk   | Responsible/Owner |
|-------|--------------------------|--------------|----------|------------------------|----------|--------|-------------------|
| #122  | US-10: Find a Branch     | 3            | Mar. 25  | Implement Branch Locator Page, Implement Search Functionality, Handle Postal Code Search, Handle Airport Name/Code Search, Sort Branches by Proximity, Display Results, Handle No Results Found | Medium   | Medium | Mohamed & Zeiad |
| #125  | US-11: Check-in Process  |              | Mar. 25  |                        |          |        | Abderahmane & Miskat |
| #172  | US-12: Check-out Process | 7            | Mar. 25  | Confirm Return of Rental Vehicle, Verify Vehicle Details, Compare with Reservation Information, Inspect for Damages, Use Digital Inspection Tools, Document Damages, Review Additional Charges, Identify Late Fees, Fuel Charges, etc., Review Charges with Customer, Process Final Payment, Calculate Final Rental Cost, Collect Payment, Provide Receipt, Provide Necessary Documentation, Offer Digital Copies of Documents, Explain Terms and Conditions, Complete Check-out Process, Update Reservation Status, Return Deposited Funds, Hand Over Documentation, Express Gratitude to Customer | High     | High   | Matteo & Abderahmane |



| Issue | Task Title                               | Story Points | Associated User Story | Priority | Estimated Effort | Dependencies            |
|-------|------------------------------------------|--------------|-----------------------|----------|------------------|-------------------------|
| #125  | Implement user authentication            | 2            | US-11: Check-in Process | Medium   | 3                | None                    |
| #125  | Develop branch location search           | 3            | US-11: Check-in Process | High     | 3                | None                    |
| #125  | Verify Customer Information              | 2            | US-11: Check-in Process | Medium   | 2                | None                    |
| #125  | Check Reservation Status                 | 2            | US-11: Check-in Process | Medium   | 2                | None                    |
| #125  | Create a New Reservation (if necessary)  | 3            | US-11: Check-in Process | High     | 3                | None                    |
| #125  | Review Rental Agreement                  | 2            | US-11: Check-in Process | Medium   | 2                | None                    |
| #125  | Process Payment                          | 3            | US-11: Check-in Process | High     | 3                | None                    |
| #125  | Complete Check-in Process                | 2            | US-11: Check-in Process | Medium   | 3                | None                    |
| #125  | Implement check-out process              | 5            | US-11: Check-in Process | High     | 3                | Complete Check-in Process|
| #122  | Implement Branch Locator Page            | 3            | US-10: Find a Branch   | High     | 3                | None                    |
| #122  | Implement Search Functionality           | 3            | US-10: Find a Branch   | High     | 3                | Implement Branch Locator Page|
| #122  | Handle Postal Code Search                | 2            | US-10: Find a Branch   | Medium   | 1                | Implement Search Functionality|
| #122  | Handle Airport Name/Code Search         | 2            | US-10: Find a Branch   | Medium   | 1                | Implement Search Functionality|
| #122  | Sort Branches by Proximity              | 2            | US-10: Find a Branch   | Medium   | 1                | Implement Search Functionality|
| #122  | Display Results                          | 2            | US-10: Find a Branch   | Medium   | 1                | Implement Search Functionality|
| #122  | Handle No Results Found                  | 1            | US-10: Find a Branch   | Low      | 1                | Implement Search Functionality|
| #172  | Confirm Return of Rental Vehicle         | 5            | US-12: Check-out Process | High     | 3                | Implement check-out process|
| #172  | Verify Vehicle Details                   | 2            | US-12: Check-out Process | Medium   | 2                | Confirm Return of Rental Vehicle|
| #172  | Compare with Reservation Information     | 2            | US-12: Check-out Process | Medium   | 2                | Confirm Return of Rental Vehicle|
| #172  | Inspect for Damages                      | 3            | US-12: Check-out Process | High     | 2                | Confirm Return of Rental Vehicle|
| #172  | Use Digital Inspection Tools             | 3            | US-12: Check-out Process | High     | 2                | Confirm Return of Rental Vehicle|
| #172  | Document Damages                         | 2            | US-12: Check-out Process | Medium   | 2                | Inspect for Damages, Use Digital Inspection Tools|
| #172  | Review Additional Charges                | 2            | US-12: Check-out Process | Medium   | 2                | Confirm Return of Rental Vehicle|
| #172  | Identify Late Fees, Fuel Charges, etc.   | 2            | US-12: Check-out Process | Medium   | 2                | Confirm Return of Rental Vehicle|
| #172  | Review Charges with Customer             | 2            | US-12: Check-out Process | Medium   | 2                | Confirm Return of Rental Vehicle|
| #172  | Process Final Payment                    | 3            | US-12: Check-out Process | High     | 3                | Confirm Return of Rental Vehicle|
| #172  | Calculate Final Rental Cost              | 2            | US-12: Check-out Process | Medium   | 2                | Process Final Payment, Review Additional Charges|
| #172  | Collect Payment                          | 2            | US-12: Check-out Process | Medium   | 2                | Process Final Payment|
| #172  | Provide Receipt                          | 2            | US-12: Check-out Process | Medium   | 2                | Collect Payment|
| #172  | Provide Necessary Documentation          | 2            | US-12: Check-out Process | Medium   | 2                | Collect Payment|
| #172  | Offer Digital Copies of Documents        | 2            | US-12: Check-out Process | Medium   | 2                | Provide Necessary Documentation|
| #172  | Explain Terms and Conditions             | 2            | US-12: Check-out Process | Medium   | 2                | Provide Necessary Documentation|
| #172  | Complete Check-out Process               | 2            | US-12: Check-out Process | Medium   | 3                | Provide Receipt, Explain Terms and Conditions|
| #172  | Update Reservation Status                | 2            | US-12: Check-out Process | Medium   | 2                | Complete Check-out Process|
| #172  | Return Deposited Funds                   | 2            | US-12: Check-out Process | Medium   | 2                | Complete Check-out Process|
| #172  | Hand Over Documentation                  | 2            | US-12: Check-out Process | Medium   | 2                | Complete Check-out Process|
| #172  | Express Gratitude to Customer            | 2            | US-12: Check-out Process | Medium   | 2                | Complete Check-out Process|




