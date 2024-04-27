# ft_transcendence

# Index
- [Essentiel Points](#essentiel-points)
- [Supported & Unsupported Features](#supported--unsupported-features)
- [ft_transcendence Content](#content)
- [1. Unified Modeling Language](#1-unified-modeling-language)
- [2. Merise](#2-merise)

## Essentiel Points

- **Complex Undertaking**: Decision-making within specified constraints.
- **Flexibility**: Certain modules can be implemented with discretion within the scope.
- **Justifiable Choices**: All choices must be justifiable.
- **Use of Nginx**: Question the necessity; assess if it's truly required.
- **Library Usage**: Understand if a library will fulfill tasks before implementation.
- **Focus on Proposed Features**: Emphasize making proposed features function.
- **Stay Within Project Framework**: Necessary to stay within the framework once project requirements are understood.
- **Imposed Technology**: Imposed technology allows everything officially related to requested framework/language.
- **Restrictions Apply to Modules**: All restrictions apply to modules, especially when implementing a specific module.
- **Adaptation Required for Specific Modules**: Adapt project accordingly if using specified module; using default language/framework will invalidate the module.
- **Strong Dependencies Between Modules**: Some modules intentionally have strong dependencies on others.
- **Significance of Choices**: Choices are significant and must be justified during evaluation.
- **Caution in Decision-Making**: Exercise caution in making choices.
- **Contemplate Design Before Coding**: Crucial to contemplate application design with chosen options before coding.
<br><hr>

[⬆️ Back To Index](#index)

# Supported & Unsupported Features

**Majors** : 9

**Minors** : 4

| Feature                                                | Module                                                                                     | Major/Minor | Supported |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------|-------------|-----------|
| **Mandatory Part**                                         |                                                                                           |             |           |
|                                                        |   Overview                                                                                        |              | ✅           |
|                                                        |  Minimal technical requirement                                                                              |             | ✅           |
|                           |                                   Game                                                        |             |✅           |
|                  |                                       Security Concerns and Recommendations                                                    |             | ✅           |
| **Web**                                                    |                                                                                           |             |           |
|                                                        | Use a Framework as backend.                                                               | Major       | ✅           |
|                                                        | Use a front-end framework or toolkit.                                                    | Minor       | ❌           |
|                                                        | Use a database for the backend.                                                           | Minor       | ✅           |
|                                                        | Store the score of a tournament in the Blockchain.                                       | Major       | ❌          |
| **User Management**                                        |                                                                                           |             |           |
|                                                        | Standard user management, authentication, users across tournaments.                      | Major       | ✅          |
|                                                        | Implementing a remote authentication.                                                    | Major       |  ✅         |
| **Gameplay and user experience**                          |                                                                                           |             |           |
|                                                        | Remote players                                                                            | Major       | ✅           |
|                                                        | Multiplayers                                                                              | Major       | ❌          |
|                                                        | Add Another Game with User History and Matchmaking.                                       | Major       | ❌         |
|                                                        | Game Customization Options.                                                               | Minor       | ✅          |
|                                                        | Live chat.                                                                                | Major       | ✅          |
| **AI-Algo**                                                |                                                                                           |             |           |
|                                                        | Introduce an AI Opponent.                                                                | Major       | ✅           |
|                                                        | User and Game Stats Dashboards                                                           | Minor       | ✅          |
| **Cybersecurity**                                          |                                                                                           |             |           |
|                                                        | Implement WAF/ModSecurity with Hardened Configuration and HashiCorp Vault for Secrets Management. | Major       | ❌           |
|                                                        | GDPR Compliance Options with User Anonymization, Local Data Management, and Account Deletion. | Minor       | ❌          |
|                                                        | Implement Two-Factor Authentication (2FA) and JWT.                                       | Major       | ✅          |
| **Devops**                                                 |                                                                                           |             |           |
|                                                        | Infrastructure Setup for Log Management.                                                  | Major       | ✅          |
|                                                        | Monitoring system.                                                                        | Minor       | ✅          |
|                                                        | Designing the Backend as Microservices.                                                   | Major       | ❌          |
| **Graphics**                                               |                                                                                           |             |           |
|                                                        | Use of advanced 3D techniques.                                                            | Major       | ✅          |
| **Accessibility**                                          |                                                                                           |             |           |
|                                                        | Support on all devices.                                                                    | Minor       | ❌          |
|                                                        | Expanding Browser Compatibility.                                                          | Minor       | ❌          |
|                                                        | Multiple language supports.                                                               | Minor       | ❌          |
|                                                        | Add accessibility for Visually Impaired Users.                                            | Minor       | ❌          |
|                                                        | Server-Side Rendering (SSR) Integration.                                                   | Minor       | ✅          |
| **Server-Side Pong**                                       |                                                                                           |             |           |
|                                                        | Replacing Basic Pong with Server-Side Pong and Implementing an API.                        | Major       | ❌          |
|                                                        | Enabling Pong Gameplay via CLI against Web Users with API Integration.                     | Major       | ❌          |

[⬆️ Back To Index](#index)

# Content
- [Mandatory Part](#mandatory-part)
    - [Overview](#overview)
    - [Minimal technical requirement](#minimal-technical-requirement)
    - [Game](#game)
    - [Security Concerns](#security-concerns-and-recommendations)
- [Modules](#modules)
    - [Web](#web)
      - [Major module: Use a Framework as backend.](#major-module-use-a-framework-as-backend)
      - [Minor module: Use a front-end framework or toolkit.](#minor-module-use-a-front-end-framework-or-toolkit)
      - [Minor module: Use a database for the backend.](#minor-module-use-a-database-for-the-backend)
      - [Major module: Store the score of a tournament in the Blockchain.](#major-module-store-the-score-of-a-tournament-in-the-blockchain)
    - [User Management](#user-management)
      - [Major module: Standard user management, authentication, users across tournaments.](#major-module-standard-user-management-authentication-users-across-tournaments)
      - [Major module: Implementing a remote authentication.](#major-module-implementing-a-remote-authentication)
    - [Gaming](#gaming)
    - [Gameplay and user experience](#gameplay-and-user-experience)
      - [Major module: Remote players](#major-module-remote-players)
      - [Major module: Multiplayers](#major-module-multiple-players)
      - [Major module: Add Another Game with User History and Matchmaking.](#major-module-add-another-game-with-user-history-and-matchmaking)
      - [Minor module: Game Customization Options.](#minor-module-game-customization-options)
      - [Major module: Live chat.](#major-module-live-chat)
    - [AI-Algo](#ai-algo)
      - [Major module: Introduce an AI Opponent.](#major-module-introduce-an-ai-opponent)
      - [Minor module: User and Game Stats Dashboards](#minor-module-user-and-game-stats-dashboards)
    - [Cybersecurity](#cybersecurity)
      - [Major module: Implement WAF/ModSecurity with Hardened Configuration and HashiCorp Vault for Secrets Management.](#cybersecurity)
      - [Minor module: GDPR Compliance Options with User Anonymization, Local Data Management, and Account Deletion.](#cybersecurity)
      - [Major module: Implement Two-Factor Authentication (2FA) and JWT.](#cybersecurity)
    - [Devops](#devops)
      - [Major module: Infrastructure Setup for Log Management.](#devops)
      - [Minor module: Monitoring system.](#devops)
      - [Major module: Designing the Backend as Microservices.](#devops)
    - [Graphics](#graphics)
      - [Major module: Use of advanced 3D techniques.](#major-module-use-of-advanced-3d-techniques)
    - [Accessibility](#accessibility)
      - [Minor module: Support on all devices.](#accessibility)
      - [Minor module: Expanding Browser Compatibility.](#accessibility)
      - [Minor module: Multiple language supports.](#accessibility)
      - [Minor module: Add accessibility for Visually Impaired Users.](#accessibility)
      - [Minor module: Server-Side Rendering (SSR) Integration.](#accessibility)
    - [Server-Side Pong](#server-side-pong)
      - [Major module: Replacing Basic Pong with Server-Side Pong and Implementing an API.](#server-side-pong)
      - [Major module: Enabling Pong Gameplay via CLI against Web Users with API Integration.](#server-side-pong)

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

# Mandatory Part
## Overview

- **Project Description**: Creating a website for the mighty Pong contest!
- **Prohibition of Libraries/Frameworks/Tools**: Strictly prohibited to replace job functions.
- **Authorized Third-Party Software**: Each part of the subject will explicitly present authorized third-party software.
- **Use of Tools to Simplify Actions**: Allowed and recommended to use anything possible to simplify certain actions.
- **Justification of Tools/Resources**: Any tools or resources utilized must be justified.
- **Simplification vs. Completion**: Simplifying does not equate to completing work.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Minimal technical requirement

| Technology stack      | Requirement | Overriden |
| -----------           | ----------- | ------    |  
| Backend               | Pure Ruby  | Framework module |
| Frontend             | Pure vanilla Javascript |   Framework module |
| Database              | Database module |     |

-  Website must be a single-page application. use the
Back and Forward buttons of the browser.
- Compatible with the latest stable up-to-date version of
Google Chrome .
- No unhandled errors and no warnings when browsing the
website.
- Everything must be launched with a single command line (e.g docker-compose up --build)

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Game

| Requirement                                  | Description                                                                                         | Implementation                                        |
|----------------------------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| Live Pong game                              | Users play Pong against each other directly on the website using the same keyboard.               | Stack: FrontEnd module                                |
| Remote players module                       | Enhances gameplay by enabling players to compete against remote opponents.                         | Optional: Remote players module                       |
| Tournament system                           | Allows players to compete in a tournament format, displaying matchups and player order clearly.   | Stack: Backend module                                 |
| Registration system                         | Players input aliases at the start of each tournament. Aliases reset for new tournaments.          | Stack: Backend module                                 |
| Standard User Management module             | Provides flexibility in managing user registration and aliases.                                     | Optional: Standard User Management module             |
| Matchmaking system                          | Organizes matchups for participants and announces next fights.                                      | Stack: Backend module                                 |
| Adherence to rules                          | All players, including AI, must adhere to the same rules, including identical paddle speed.        | Stack: Backend module                                 |
| Frontend development                        | Develop game within default frontend constraints or utilize FrontEnd module.                       | Stack: FrontEnd module                                |
| Override option with Graphics module        | Provides option to override default frontend with Graphics module for enhanced visual aesthetics.  | Optional: Graphics module                             |
| Prohibition on third-party tools            | Prohibits use of libraries or frameworks that replace necessary functions. Justification required. | Strictly Prohibited                                   |
| Simplification with justified tools/resources | Recommended to use tools/resources for simplification, but they must be justified.                 | Allowed and recommended; justification required       |

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Security Concerns and Recommendations

| Security Concern                   | Recommendation                                                                                                   |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Password storage                  | Hash passwords before storing them in the database. Use a strong password hashing algorithm.                   |
| Protection against SQL injections/XSS | Implement measures to sanitize and validate user input to prevent SQL injections and Cross-Site Scripting (XSS). |
| HTTPS connection                  | Enable HTTPS connection for all aspects of the website. Utilize wss instead of ws for WebSocket connections.    |
| Form and user input validation   | Implement validation for forms and any user input, either on the client-side within the base page or on the server-side if a backend is employed. |

# Modules
- you’ve accomplished 25% of the project, congratulations!
- **To attain 100% project completion, a minimum of 7 major modules is required**
- **Two Minor Modules are equivalent to one Major Module.**

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Web

### Major module: Use a Framework as backend.

1. **Framework**: Django
   - *Constraints*: Utilize Django for backend development.

### Minor module: Use a front-end framework or toolkit.

2. **Toolkit**: Bootstrap
   - *Constraints*: Utilize Bootstrap for front-end development.

### Minor module: Use a database for the backend.

3. **Database**: PostgreSQL
   - *Constraints*: Utilize PostgreSQL for backend database instances. Ensures data consistency and compatibility.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

### Major module: Store the score of a tournament in the Blockchain.

4. **Blockchain**: Ethereum
   - **Smart Contract Language**: Solidity
   - *Integration*: Seamlessly integrate Ethereum blockchain into the Pong website.
   - *Blockchain Integration*: Secure and immutable storage of tournament scores.
   - *Smart Contracts*: Develop Solidity smart contracts for score recording, management, and retrieval.
   - *Testing Blockchain*: Utilize a testing blockchain environment (e.g., Ganache) for development and testing.
   - *Interoperability*: Potential dependencies on Backend Framework module for integrating blockchain functionality.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## User Management

### Major Module: Standard user management, authentication, users across tournaments.

1. *Features*:
   - Secure user subscription.
   - Secure user login.
   - Selection of unique display names for tournaments.
   - User information update functionality.
   - Avatar upload with default option.
   - Friend addition and online status viewing.
   - User profile stats display (e.g., wins and losses).
   - Match History for 1v1 games with dates and details.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

### Major Module: Implementing a remote authentication.

2. **Authentication System**: OAuth 2.0 with 42
   - *Objectives*:
     - Integrate OAuth 2.0 authentication system for secure sign-in.
     - Obtain necessary credentials and permissions from the authority.
     - Implement user-friendly login and authorization flows adhering to best practices.
     - Ensure secure exchange of authentication tokens and user information.
   - *Note*: Management of duplicate usernames/emails is at the discretion of the developer, with justification required for the decision.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Gameplay and user experience

### **Major Module: Remote Players**
   - Description: Allows two distant players to access the same website and play the same Pong game. Consider network issues like disconnection or lag for the best user experience.

[🔼 Back to top](#Portfolio)

### **Major Module: Multiple Players**
   - Description: Enables gameplay with more than two players, each having live control. Consider integrating the Remote Players module for distant players. Define gameplay mechanics for 3 or more players, such as playing on a squared board.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

### **Major Module: Add Another Game with User History and Matchmaking**
   - Description: Introduces a new game besides Pong, incorporating user history tracking and matchmaking features.
   - Key Features:
     - Develop a new engaging game to diversify the platform's offerings.
     - Implement user history tracking and display individual gameplay statistics.
     - Create a matchmaking system for fair and balanced matches.
     - Ensure secure storage of user game history and matchmaking data.
     - Optimize game performance and responsiveness for an enjoyable user experience.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

### **Minor Module: Game Customization Options**
   - Description: Provides customization options for all available games on the platform.
   - Key Features:
     - Offer customization features like power-ups, attacks, or different maps.
     - Allow users to choose a default version of the game for a simpler experience.
     - Ensure customization options are available and applicable to all games.
     - Implement user-friendly settings menus for adjusting game parameters.
     - Maintain consistency in customization features across all games.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

### **Major Module: Live Chat**
   - Description: Implements a chat system for users with various functionalities.
   - Key Features:
     - Allow users to send direct messages to other users.
     - Enable user blocking to stop receiving messages from blocked accounts.
     - Provide the ability to invite other users to play Pong through the chat interface.
     - Integrate tournament system notifications for upcoming games.
     - Allow access to other players' profiles through the chat interface.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## AI-Algo

### Major module: Introduce an AI Opponent.

- **Objective**: Incorporate an AI player into the game without using the A* algorithm.
- **Features**:
  - Develop a challenging AI opponent that simulates human behavior.
  - Implement AI logic for intelligent and strategic moves.
  - Utilize power-ups if Game customization options module is implemented.
  - Explore alternative algorithms for AI decision-making.
  - Ensure adaptability to different gameplay scenarios and user interactions.
- **Attention**: AI must be capable of winning occasionally; creating an AI that does nothing is prohibited.

### Minor module: User and Game Stats Dashboards.

- **Goal**: Introduce user-friendly dashboards displaying statistics for individual users and game sessions.
- **Features**:
  - Create separate dashboards for user and game session statistics.
  - Implement intuitive and informative user interfaces.
  - Utilize data visualization techniques such as charts and graphs.
  - Allow users to access and explore their gaming history and performance metrics.
  - Additional metrics can be added as deemed useful.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Cybersecurity

| Module Type | Description | Key Features |
|-------------|-------------|--------------|
| Major | **Implement WAF/ModSecurity with Hardened Configuration and HashiCorp Vault for Secrets Management** | - Configure and deploy a Web Application Firewall (WAF) and ModSecurity with a strict and secure configuration. <br> - Integrate HashiCorp Vault for secure secrets management. |
| Minor | **GDPR Compliance Options with User Anonymization, Local Data Management, and Account Deletion** | - Implement GDPR-compliant features for user data privacy rights. <br> - Enable users to request anonymization of their personal data. <br> - Provide tools for users to manage their local data and request account deletion. |
| Major | **Implement Two-Factor Authentication (2FA) and JWT** | - Introduce Two-Factor Authentication (2FA) for enhanced security. <br> - Utilize JSON Web Tokens (JWT) for secure authentication and authorization. <br> - Offer a user-friendly setup process for enabling 2FA. |

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Devops

| Module Type | Description | Key Features |
|-------------|-------------|--------------|
| Major | **Infrastructure Setup with ELK (Elasticsearch, Logstash, Kibana) for Log Management** | - Deploy Elasticsearch for efficient log data storage and indexing. <br> - Configure Logstash to collect, process, and transform log data. <br> - Set up Kibana for log data visualization and insights. <br> - Define data retention policies and implement security measures. |
| Minor | **Monitoring System with Prometheus and Grafana** | - Deploy Prometheus for monitoring and alerting. <br> - Configure Grafana for custom dashboards and visualizations. <br> - Set up alerting rules and ensure proper data retention. <br> - Implement secure authentication and access control. |
| Major | **Designing the Backend as Microservices** | - Divide backend into microservices for flexibility and scalability. <br> - Define clear boundaries and interfaces between microservices. <br> - Implement communication mechanisms for data exchange. <br> - Ensure each microservice is responsible for a single, well-defined task. |

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Gaming

### Major Module: Add Another Game with User History and Matchmaking
- **Objective**: Introduce a new game, implement user history tracking, and create a matchmaking system.
- **Key Features**:
  - Develop a new game to diversify the platform’s offerings.
  - Implement user history tracking for individual gameplay statistics.
  - Create a matchmaking system for fair and balanced matches.
  - Ensure secure storage and up-to-date data for user game history and matchmaking.
  - Optimize game performance and responsiveness for an enjoyable user experience.

### Minor Module: Game Customization Options
- **Goal**: Provide customization options for all available games on the platform.
- **Key Features**:
  - Offer customization features like power-ups, attacks, or different maps.
  - Allow users to choose a default game version for a simpler experience.
  - Ensure customization options are available for all games.
  - Implement user-friendly settings menus for adjusting game parameters.
  - Maintain consistency in customization features across all games for a unified user experience.


[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Graphics

### **Major Module: Use of advanced 3D techniques.**
  - **Objective**: Enhance the visual aspects of the Pong game using advanced 3D techniques.
  - **Key Features**:
    - Implement advanced 3D graphics techniques to elevate the visual quality of the Pong game.
    - Utilize ThreeJS/WebGL technology to create stunning visual effects.
    - Enhance gameplay experience with visually engaging and captivating elements.
    - Ensure compatibility and optimal performance by integrating ThreeJS/WebGL.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Accessibility

| Module                                       | Type        | Focus                                                   | Key Features and Objectives                                                                                                     |
|----------------------------------------------|-------------|---------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| Support on all devices                       | Minor       | Ensuring website compatibility across devices           | - Responsive design for various screen sizes and orientations <br> - Easy navigation with different input methods                |
| Expanding Browser Compatibility             | Minor       | Enhancing compatibility with additional web browsers    | - Extend browser support <br> - Thorough testing and optimization <br> - Address compatibility issues                                |
| Multiple language support                   | Minor       | Supporting multiple languages for diverse users         | - Implement support for at least three languages <br> - Provide language switcher <br> - Translate essential content           |
| Accessibility for Visually Impaired Users   | Minor       | Improving accessibility for visually impaired users    | - Support for screen readers and assistive technologies <br> - Descriptive alt text for images <br> - High-contrast color scheme |
| Server-Side Rendering (SSR) Integration    | Minor       | Integrating SSR for improved performance and UX        | - Implement SSR for faster loading <br> - Pre-render content for SEO optimization                                                |

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## Server-Side Pong
| Module                                                                   | Type        | Focus                                                                    | Key Features and Objectives                                                                                               |
|--------------------------------------------------------------------------|-------------|--------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Replacing Basic Pong with Server-Side Pong and Implementing an API       | Major       | Migrating Pong game logic to server-side and creating an API             | - Develop server-side logic for Pong game <br> - Create API with necessary endpoints for game interaction                |
| Enabling Pong Gameplay via CLI against Web Users with API Integration    | Major       | Creating a CLI interface for playing Pong against web users              | - Develop robust CLI application for Pong gameplay <br> - Utilize API for CLI to web application communication <br> - Implement user authentication mechanism in CLI for secure web application login                                            |

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

<br><hr>

## 1. Unified Modeling Language

<h4 align="center">Use Case</h4>

<img src="https://github.com/zakarm/ft_transcendence/blob/master/docs/use_case.drawio.png">

- Sign Up: This use case allows a new user to create an account on the website. Users will provide necessary information such as username, email, and password to register themselves.

- Sign In: This use case enables registered users to authenticate themselves into the system by providing their username/email and password.

- Dashboard: Upon signing in, users are directed to their dashboard. The dashboard provides an overview of the user's profile, activities, notifications, and other relevant information.

- Play Game: Users can engage in playing games available on the website. This use case allows users to select and participate in various games, such as ping pong, available on the platform.

- Chat: Users can communicate with each other through the chat feature provided by the website. This use case enables users to send and receive messages, emojis, and other media in real-time.

- View Achievement: Users can view their achievements and milestones attained while using the website. This use case allows users to track their progress and accomplishments within the platform.

- Logout: This use case allows users to securely log out of their account, ensuring the privacy and security of their data.

- Add Friends: Users can expand their social network by adding other users as friends. This use case enables users to send and accept friend requests, thereby connecting with each other on the platform.

- View Leaderboard: Users can view the leaderboard to see rankings based on various criteria, such as game scores, achievements, or activity levels. This use case provides users with a sense of competition and allows them to compare their performance with others.

- Update Profile: Users can modify and update their profile information as needed. This use case allows users to edit their profile details, such as username, profile picture, bio, and other preferences.

- Manage User Accounts: Admins can manage user accounts, including creating new accounts, updating user information, and deactivating or deleting accounts if necessary.

- Manage Admin Functions: Admins have access to additional functionalities for managing the website, such as managing system settings, controlling access permissions, and handling reported issues or disputes.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

## 2. Merise

<h4 align="center">Logical Data Model</h4>

<img src="https://github.com/zakarm/ft_transcendence/blob/master/docs/ft_transcendence.pgerd.png">

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

### 2.1 Achievements:

Columns:
- achievement_id: Serial primary key.
- achiev_name: Character field for the name of the achievement.
- xp_to_get: Real number field indicating the experience points required to achieve this.

### 2.2 Friendship:

Columns:
- friendship_id: Serial primary key.
- user_from: Integer referencing user_id from the "Users" table.
- user_to: Integer referencing user_id from the "Users" table.
- is_accepted: Boolean indicating whether the friendship request is accepted.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

### 2.3 Messages:

Columns:
- user_one: Integer referencing user_id from the "Users" table.
- user_two: Integer referencing user_id from the "Users" table.
- message_content: Character field for the message content.
- message_date: Date field for the date of the message.
- message_direction: Character field indicating the direction of the message.

### 2.4 Matches:

Columns:
- match_id: Serial primary key.
- user_one: Integer referencing user_id from the "Users" table.
- user_two: Integer referencing user_id from the "Users" table.
- score_user_one: Integer for the score of user one.
- score_user_two: Integer for the score of user two.
- match_start: Date field for the start date of the match.
- match_end: Date field for the end date of the match.
- tackle_user_one: Integer indicating tackles by user one.
- tackle_user_two: Integer indicating tackles by user two.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

### 2.5 Users:

Columns:
- user_id: Serial primary key.
- first_name, last_name, nick_name: Character fields for user names.
- user_xp: Real number field for user experience points.
- image_url, cover_url: Character fields for image URLs.
- first_log, last_log: Date fields for the first and last login dates.
- is_log: Boolean indicating whether the user is logged in.
- is_two_fact: Boolean indicating whether two-factor authentication is enabled.
- two_fact_secret: Character field for the two-factor authentication secret.
- country, city: Character fields for user's country and city.
- password: Character field for user password.

### 2.6 UserAchievements:

Columns:
- user_id: Integer referencing user_id from the "Users" table.
- achievement_id: Integer referencing achievement_id from the "Achievements" table.
- achieve_date: Date field for the achievement date.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

### 2.7 Tournaments:

Columns:
- tournament_id: Serial primary key.
- tournament_name: Character field for the tournament name.
- tournament_start, tournament_end: Date fields for the start and end dates of the tournament.

### 2.8 TournamentsMatches:

Columns:
- tournament_id: Integer referencing tournament_id from the "Tournaments" table.
- match_id: Integer referencing match_id from the "Matches" table.
- tournament_round: Character field indicating the round of the tournament.

[⬆️ Back To Content](#content)
[⬆️ Back To Index](#index)

