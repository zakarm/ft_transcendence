# ft_transcendence ⏳

- Play Ping Pong matches and tournaments, and chat live with your friends!

## Index

- [Technology Stack](#technology-stack)
- [Usage](#usage)
- [Merise](#merise)
- [Unified Modeling Language](#unified-modeling-language)
- [Supported Features](#supported-features)
- [Ressources](#ressources)

# Technology Stack

| Category               | Technology                                                                                                                                                                                                                                                                                                           |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Server**             | ![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)                                                                                                                                                                                                                     |
| **Backend Framework**  | ![Django REST](https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white)                                                                                                                                                                                                     |
| **Database**           | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)                                                                                                                                                                                                     |
| **Containerization**   | ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)                                                                                                                                                                                                                  |
| **Frontend**           | ![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![Three.js](https://img.shields.io/badge/ThreeJs-black?style=for-the-badge&logo=three.js&logoColor=white) |
| **Authentication**     | ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)                                                                                                                                                                                                           |
| **Monitoring and Logging** | ![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white) ![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white) ![Kibana](https://img.shields.io/badge/Kibana-005571?style=for-the-badge&logo=Kibana&logoColor=white) ![Elasticsearch](https://img.shields.io/badge/Elastic_Search-005571?style=for-the-badge&logo=elasticsearch&logoColor=white) |
| **Languages**          | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue) |
| **Development Tools**  | ![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white) ![Google Chrome](https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) |
| **Design**             | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)                                                                                                                                                                                                                     |

---

## Usage

```bash
# to see all available commands
$> make

# build images and run containers
$> make start

# to build docker images
$> make build

# to run docker containers
$> make up

# removes containers, volumes... and restart everything
$> make re

# generating some users and matches
$> make data-generator

```

**After running all the containers, you can access <a href='https://localhost' target="_blank">https://localhost</a>**

---

## Merise

### Logical Data Model

![Logical Data Model](https://github.com/zakarm/ft_transcendence/blob/master/docs/ft_transcendence.pgerd.png)


[⬆️ Back To Features](#supported-features)

---

## Unified Modeling Language

### Use Case

![Use Case](https://github.com/zakarm/ft_transcendence/blob/master/docs/use_case.drawio.png)
<!-- <img src="https://github.com/zakarm/ft_transcendence/blob/master/docs/use_case.drawio.png"> -->

- **Sign Up**: This use case allows a new user to create an account on the website. Users will provide necessary information such as username, email, and password to register themselves.
- **Sign In**: This use case enables registered users to authenticate themselves into the system by providing their username/email and password.
- **Dashboard**: Upon signing in, users are directed to their dashboard. The dashboard provides an overview of the user's profile, activities, notifications, and other relevant information.
- **Play Game**: Users can engage in playing games available on the website. This use case allows users to select and participate in various games, such as ping pong, available on the platform.
- **Chat**: Users can communicate with each other through the chat feature provided by the website. This use case enables users to send and receive messages, emojis, and other media in real-time.
- **View Achievement**: Users can view their achievements and milestones attained while using the website. This use case allows users to track their progress and accomplishments within the platform.
- **Logout**: This use case allows users to securely log out of their account, ensuring the privacy and security of their data.
- **Add Friends**: Users can expand their social network by adding other users as friends. This use case enables users to send and accept friend requests, thereby connecting with each other on the platform.
- **View Leaderboard**: Users can view the leaderboard to see rankings based on various criteria, such as game scores, achievements, or activity levels. This use case provides users with a sense of competition and allows them to compare their performance with others.
- **Update Profile**: Users can modify and update their profile information as needed. This use case allows users to edit their profile details, such as username, profile picture, bio, and other preferences.
- **Manage User Accounts**: Admins can manage user accounts, including creating new accounts, updating user information, and deactivating or deleting accounts if necessary.
- **Manage Admin Functions**: Admins have access to additional functionalities for managing the website, such as managing system settings, controlling access permissions, and handling reported issues or disputes.

[⬆️ Back To Features](#supported-features)

---


# Supported Features

| Feature                                                           | Module                                                                                                                                                | Major/Minor | Supported | Progress |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|-----------|----------|
| **[Mandatory Part](#mandatory-part)**                             |                                                                                                                                                       |             |           |          |
|                                                                   | [Minimal technical requirement](#minimal-technical-requirement)                                                                                       |             | ✅        | Done     |
|                                                                   | [Game](#game)                                                                                                                                         |             | ✅        | Done     |
|                                                                   | [Security Concerns and Recommendations](#security-concerns-and-recommendations)                                                                       |             | ✅        | Done     |
| **[Web](#web)**                                                   |                                                                                                                                                       |             |           |          |
|                                                                   | [Use a Framework as backend.](#major-module-use-a-framework-as-backend)                                                                               | Major       | ✅        | Done     |
|                                                                   | [Use a database for the backend.](#minor-module-use-a-database-for-the-backend)                                                                       | Minor       | ✅        | Done     |
| **[User Management](#user-management)**                           |                                                                                                                                                       |             |           |          |
|                                                                   | [Standard user management, authentication, users across tournaments.](#major-module-standard-user-management-authentication-users-across-tournaments) | Major       | ✅        | Done     |
|                                                                   | [Implementing a remote authentication.](#major-module-implementing-a-remote-authentication)                                                           | Major       | ✅        | Done     |
| **[Gameplay and user experience](#gameplay-and-user-experience)** |                                                                                                                                                       |             |           |          |
|                                                                   | [Remote players](#major-module-remote-players)                                                                                                        | Major       | ✅        | Done     |
|                                                                   | [Game Customization Options](#minor-module-game-customization-options)                                                                                | Minor       | ✅        | Done     |
|                                                                   | [Live chat](#major-module-live-chat)                                                                                                                  | Major       | ✅        | Done     |
| **[AI-Algo](#ai-algo)**                                           |                                                                                                                                                       |             |           |          |
|                                                                   | [User and Game Stats Dashboards](#minor-module-user-and-game-stats-dashboards)                                                                        | Minor       | ✅        | Done     |
| **[Cybersecurity](#cybersecurity)**                               |                                                                                                                                                       |             |           |          |
|                                                                   | [Implement Two-Factor Authentication (2FA) and JWT.](#cybersecurity)                                                                                  | Major       | ✅        | Done     |
| **[Devops](#devops)**                                             |                                                                                                                                                       |             |           |          |
|                                                                   | [Infrastructure Setup for Log Management.](#devops)                                                                                                   | Major       | ✅        | Done     |
|                                                                   | [Monitoring system.](#devops)                                                                                                                         | Minor       | ✅        | Done     |
| **[Graphics](#graphics)**                                         |                                                                                                                                                       |             |           |          |
|                                                                   | [Use of advanced 3D techniques.](#major-module-use-of-advanced-3d-techniques)                                                                         | Major       | ✅        | Done     |

---

# Mandatory Part

## Minimal technical requirement

- Website must be a single-page application. use the Back and Forward buttons of the browser.
- Compatible with the latest stable up-to-date version of Google Chrome.
- No unhandled errors and no warnings when browsing the website.
- Everything must be launched with a single command line (e.g docker-compose up --build)

[⬆️ Back To Features](#supported-features)

## Game

| Requirement                                   | Description                                                                                        | Implementation                                  |
|-----------------------------------------------|----------------------------------------------------------------------------------------------------|-------------------------------------------------|
| Live Pong game                                | Users play Pong against each other directly on the website using the same keyboard.                | Stack: FrontEnd module                          |
| Remote players module                         | Enhances gameplay by enabling players to compete against remote opponents.                         | Optional: Remote players module                 |
| Tournament system                             | Allows players to compete in a tournament format, displaying matchups and player order clearly.    | Stack: Backend module                           |
| Registration system                           | Players input aliases at the start of each tournament. Aliases reset for new tournaments.          | Stack: Backend module                           |
| Standard User Management module               | Provides flexibility in managing user registration and aliases.                                    | Optional: Standard User Management module       |
| Matchmaking system                            | Organizes matchups for participants and announces next fights.                                     | Stack: Backend module                           |
| Adherence to rules                            | All players, including AI, must adhere to the same rules, including identical paddle speed.        | Stack: Backend module                           |
| Frontend development                          | Develop game within default frontend constraints or utilize FrontEnd module.                       | Stack: FrontEnd module                          |
| Override option with Graphics module          | Provides option to override default frontend with Graphics module for enhanced visual aesthetics.  | Optional: Graphics module                       |
| Prohibition on third-party tools              | Prohibits use of libraries or frameworks that replace necessary functions. Justification required. | Strictly Prohibited                             |
| Simplification with justified tools/resources | Recommended to use tools/resources for simplification, but they must be justified.                 | Allowed and recommended; justification required |

[⬆️ Back To Features](#supported-features)

## Security Concerns and Recommendations

| Security Concern                      | Recommendation                                                                                                                                    |
|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Password storage                      | Hash passwords before storing them in the database. Use a strong password hashing algorithm.                                                      |
| Protection against SQL injections/XSS | Implement measures to sanitize and validate user input to prevent SQL injections and Cross-Site Scripting (XSS).                                  |
| HTTPS connection                      | Enable HTTPS connection for all aspects of the website. Utilize wss instead of ws for WebSocket connections.                                      |
| Form and user input validation        | Implement validation for forms and any user input, either on the client-side within the base page or on the server-side if a backend is employed. |

# Modules

## Web

### Major module: Use a Framework as backend

1. **Framework**: Django
   - **Constraints**: Utilize Django for backend development.

### Minor module: Use a database for the backend

1. **Database**: PostgreSQL
   - **Constraints**: Utilize PostgreSQL for backend database instances. Ensures data consistency and compatibility.

[⬆️ Back To Features](#supported-features)

## User Management

### Major Module: Standard user management, authentication, users across tournaments

1. **Features**:
   - Secure user subscription.
   - Secure user login.
   - Selection of unique display names for tournaments.
   - User information update functionality.
   - Avatar upload with default option.
   - Friend addition and online status viewing.
   - User profile stats display (e.g., wins and losses).
   - Match History for 1v1 games with dates and details.

[⬆️ Back To Features](#supported-features)

### Major Module: Implementing a remote authentication

1. **Authentication System**: OAuth 2.0 with 42
   - **Objectives**:
     - Integrate OAuth 2.0 authentication system for secure sign-in.
     - Obtain necessary credentials and permissions from the authority.
     - Implement user-friendly login and authorization flows adhering to best practices.
     - Ensure secure exchange of authentication tokens and user information.

[⬆️ Back To Features](#supported-features)

## Gameplay and user experience

### **Major Module: Remote Players**

- **Description**: Allows two distant players to access the same website and play the same Pong game. Consider network issues like disconnection or lag for the best user experience.

[⬆️ Back to top](#technology-stack)

### **Minor Module: Game Customization Options**

- **Description**: Provides customization options for all available games on the platform.
- **Key Features**:
  - Offer customization features like power-ups, attacks, or different maps.
  - Allow users to choose a default version of the game for a simpler experience.
  - Ensure customization options are available and applicable to all games.
  - Implement user-friendly settings menus for adjusting game parameters.
  - Maintain consistency in customization features across all games.

[⬆️ Back To Features](#supported-features)

### **Major Module: Live Chat**

- **Description**: Implements a chat system for users with various functionalities.
- **Key Features**:
  - Allow users to send direct messages to other users.
  - Enable user blocking to stop receiving messages from blocked accounts.
  - Provide the ability to invite other users to play Pong through the chat interface.
  - Integrate tournament system notifications for upcoming games.
  - Allow access to other players' profiles through the chat interface.

[⬆️ Back To Features](#supported-features)

## AI-Algo

### Minor module: User and Game Stats Dashboards

- **Goal**: Introduce user-friendly dashboards displaying statistics for individual users and game sessions.
- **Features**:
  - Create separate dashboards for user and game session statistics.
  - Implement intuitive and informative user interfaces.
  - Utilize data visualization techniques such as charts and graphs.
  - Allow users to access and explore their gaming history and performance metrics.
  - Additional metrics can be added as deemed useful.

## Cybersecurity

| Module Type | Description                                                                                          | Key Features                                                                                                    |
|-------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Major       | **Implement Two-Factor Authentication (2FA) and JWT**                                                | - Introduce Two-Factor Authentication (2FA) for enhanced security.                                              |
|             |                                                                                                      | - Utilize JSON Web Tokens (JWT) for secure authentication and authorization.                                    |
|             |                                                                                                      |  - Offer a user-friendly setup process for enabling 2FA.                                                        |

[⬆️ Back To Features](#supported-features)

## Devops

| Module Type | Description                                                                            | Key Features                                                               |
|-------------|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| Major       | **Infrastructure Setup with ELK (Elasticsearch, Logstash, Kibana) for Log Management** | - Deploy Elasticsearch for efficient log data storage and indexing.        |
|             |                                                                                        | - Configure Logstash to collect, process, and transform log data.          |
|             |                                                                                        | - Set up Kibana for log data visualization and insights.                   |
|             |                                                                                        | - Define data retention policies and implement security measures.          |
| Minor       | **Monitoring System with Prometheus and Grafana**                                      | - Deploy Prometheus for monitoring and alerting.                           |
|             |                                                                                        | - Configure Grafana for custom dashboards and visualizations.              |
|             |                                                                                        | - Set up alerting rules and ensure proper data retention.                  |
|             |                                                                                        | - Implement secure authentication and access control.                      |

[⬆️ Back To Features](#supported-features)

## Graphics

### **Major Module: Use of advanced 3D techniques.**

- **Objective**: Enhance the visual aspects of the Pong game using advanced 3D techniques.
- **Key Features**:
  - Implement advanced 3D graphics techniques to elevate the visual quality of the Pong game.
  - Utilize ThreeJS/WebGL technology to create stunning visual effects.
  - Enhance gameplay experience with visually engaging and captivating elements.
  - Ensure compatibility and optimal performance by integrating ThreeJS/WebGL.

[⬆️ Back To Features](#supported-features)

## Ressources

- [NextJS and Cloudinary — App Router Integration](https://medium.com/@varchasvipandey/nextjs-and-cloudinary-app-router-integration-ad7fd2e0fdb2)
- [NextJS 13 API Routes: Better Than Expected!](https://www.youtube.com/watch?v=vrR4MlB7nBI&ab_channel=Joshtriedcoding)
