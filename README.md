# ft_transcendence


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

## 2. Merise

<h4 align="center">Logical Data Model</h4>

<img src="https://github.com/zakarm/ft_transcendence/blob/master/docs/ft_transcendence.pgerd.png">

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




