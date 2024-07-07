- Link DevOps in the Docker Compose
- Review Makefile
- Add Prettier and run it for the whole project
- Test backend for 500 server error

- Add display name to the database
- add rules popup
- delete tournament and send match notif
- fix chart player card and ball speed problem
- match sign-up with settings inputs length (/components/SettingsForm/account-tab/accountTab.tsx)
    - username : 30 sign-up // settings 20 (should be 30 in settings)
    - email : 320 not 55 (should be 320 in settings and backend) || accountTab.tsx || authentication/models.py
- Uncaught exceptions backend (status 500)
    - email.length > 55 coming from settings // should be 320 {'email': 'userfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfsdfdsfdsfdsfdsfd1@example.comf'}

----------------------------------------------------------------------------------------------

- Update user info after the first message from the socket is sent (no need to click)
- "APOLLO" <---------- Statistics || should be empty string IF NO TOP PLAYER IS FOUND
- Title of tournament card div overflow
- profile long username
- right bar long username 
- userSearch friends long username
- password 100 max (frontend check settings))
- achiv image in statistics (Response 404)

------------------------------------------------------------------------------------------------

- fix right bar icons
- the red circle used to notify the user that a new message is sent [it doesn't disappear even after sending a message back]
- Z-index for the arrow button in in the right sidebar
- Start Chatting : appears when i have an already ongoing chat a user (over 300 messages and start chat?)
    Expect : last message sent between me and that user
- showing last message