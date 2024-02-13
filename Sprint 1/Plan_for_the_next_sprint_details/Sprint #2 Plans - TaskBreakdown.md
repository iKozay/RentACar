# Planning for Sprint 2 

## Sprint Objectives
Goal: Develop and deploy a fully functional vehicle rental system with essential features to facilitate browsing, reservation management, user authentication, and branch location finding by March 11th. Below are some important objectives.

### Implement User Interface Functionality:
  - Allow users to browse vehicles for rent (#22).
  - Enable users to start a reservation (#19).
  - Provide the ability to view, modify, and cancel reservations (#40).
  - Implement CRUD operations for vehicles (#30).
  - Implement CRUD operations for user accounts (#16).
  - Implement CRUD operations for reservations (#35).
  - Develop a login/sign-up page (#56).
  - Implement the functionality to find a branch (#112).




## User Stories Board

| Issue | User Story Title | Story Points | Due Date | Associated Tasks | Priority | Risk | Responsible/Owner |
| -- | -- | -- | -- | -- | -- | -- | -- |
| #22 | Browse vehicles for rent | 7 | Mar. 11 | #57, #58, #59 | High | Medium: Database interaction | Matteo |
| #19 | Start a reservation | 8 | Mar. 11 | #60, #61, #62 | High | High: Complex reservation logic | Mohamed |
| #40 | View/Modify/Cancel reservation | 7 | Mar. 11 | #63, #64, #65 | High | High: Database interaction | Zeiad |
| #30 | CRUD operations on vehicles | 4 | Mar. 11 | #66 | High | Medium: Database management | Abdelrahman |
| #16 | CRUD operations on user accounts | 4 | Mar. 11 | #67 | High | Medium: User authentication and management | Abdelrahman |
| #35 | CRUD operations on reservations | 4 | Mar. 11 | #68 | High | Medium: Reservation management | Miskat |
| #56 | Login/Sign-Up Page | 9 | Mar. 11 | #96, #97, #98, #99 | High | Medium: Database interaction | Matteo |
| #112 | Find a Branch | 5 | Mar. 11 | #114 | Medium| Medium: Database interaction | Zeiad |

## Task Breakdown

Issue | Task Title | Story Points | Associated User Story | Priority
-- | -- | -- | -- | --
|#85 | Task - Create a MERN project structure | 2 | | High
|#60 | Task – Reservation frontend design | 2 | #19 | High
|#61 | Task – Implement reservation form | 3 | #19 | High
|#62 | Task – Reservation form validation | 3 | #19 | High
|#63 | Task – Implement view reservation page | 2 | #40 | High
|#64 | Task – Implement modify reservation page | 3 | #40 | High
|#65 | Task – Implement cancel reservation page | 2 | #40 | High
|#66 | Task – Implement users CRUD operations | 4 | #16 | High
|#67 | Task – Implement vehicle CRUD operations | 4 | #30 | High
|#68 | Task – Implement reservations CRUD operations | 4 | #35 | High
|#69 | Task – Design DB Schema | 3 |   | High
|#74 | Task - Implement Read User Account Functionality | 0 | #16 | High
|#76 | Task - Implement Update User Account Functionality | 0 | #16 | High
|#79 | Task - Implement Add New Vehicle Functionality | 0 |#30   | High
|#80 | Task - Implement View Vehicle Details Functionality | 0 | #30 | High
|#81 | Task - Implement Edit Vehicle Information Functionality | 0 | #30 | High
|#82 | Task - Implement Delete Vehicle Functionality | 0 | #30 | High
|#93 | Task - Sorting and Filtering Options While Browsing | 3 | #22 | High
|#94 | Task - Create Browsing Page | 2 | #22 | High
|#95 | Task - Display Vehicles in Browse Page | 2 | #22 | High
|#96 | Task - Create Login Pop-Up Page | 2 | #56 | High
|#97 | Task - Implement Sign-Up Option | 2 | #56 | High
|#98 | Task - Implement "Forgot Password" Functionality | 2 | #56 | High
|#114 | Task - Implement find a branch page | 5 | #112 | Med





## Dependencies:

#### Database Interaction:
  - Associated User Stories: #22, #40, #56, #112
  - Associated Tasks: #57, #58, #59, #63, #64, #65, #96, #97, #98, #99, #114
  - Responsible/Owner: Matteo, Zeiad
    
#### Complex Reservation Logic:
  - Associated User Story: #19
  - Associated Tasks: #60, #61, #62
  - Responsible/Owner: Mohamed
    
#### Database Management:
  - Associated User Stories: #30, #56
  - Associated Tasks: #66
  - Responsible/Owner: Abdelrahman, Matteo
    
#### User Authentication and Management:
  - Associated User Story: #16
  - Associated Tasks: #67
  - Responsible/Owner: Abdelrahman
    
#### Reservation Management:
  - Associated User Story: #35
  - Associated Tasks: #68
  - Responsible/Owner: Miskat
