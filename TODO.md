Bugs:
aimen:
    - Participant count is not accurate
    - Tournament winner card missing
    - Achievement missing
    - Add display name to the database and sign-in form and settings form
    - Link DevOps in the Docker Compose
    - Review Makefile
    - Add Prettier and run it for the whole project
    - Test backend for 500 server error
    - reverse player on board items
    - after passing the "loading" animation, if a user switch the tab during a game (this user can disconnect after switching tab),
        the game stays frozen [no winner, no reconnecting...]
    - after clicking on "join" button, my name and picture doesn't appear on the tournament Looby
    - cannot quit lobby tournament page via side bar icons, keeps redirecting me back to lobby page
    - increment z-index of "SEARCHING" in tournament looby && remove cursor pointer on the text

----------------------------------------------------------------------------------------------
marouane :
    - (wait PageUrl) in tournaments cards API
    - Update user info after the first message from the socket is sent (no need to click)
    - Fix "types" folder (/lib or /types)
    - Remove unnecessary files (app/front-end/src/services/profile.json, app/front-end/src/components/friends.json)
    - Replace console.error with toast notifications and remove console.log
    - app/front-end/src/app/api (remove test data from the file here and maybe the test folder)

------------------------------------------------------------------------------------------------

Othman : 
    - alert?? in onClick. found in :: add friend button --> blocked tab --> search button
        <Button className="border" variant="dark" id="button-addon2" onClick={() => alert()}>
            Search..
        </Button>

    - by simulating a failure of the profile API like this :
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/pofile`, { // removing character 'r' from profile
            headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
        });

        Result =======> [[ the whole page doesn't render at all ]]

    - Max Input of character in chat doesn't get send : (starting from 510 characters up to 512)
        fvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffvdfvfdvfdvdfvdfvdfvdfvfdvdfvdfvdffv

    - long messages overflow the div on left side that containers the user and last message sent
    - the red circle used to notify the user that a new message is sent [it doesn't disappear even after sending a message back]
    - browser issues,warning and improvements [for inputs] 
    - Same ID for two input in chat : 
        <input color="red" aria-label="search" placeholder="Enter for search..." id="search" class="form-control" type="text" style="background-color: rgb(44, 49, 67);">
        <input class="" placeholder="Find a player ..." id="search" type="text" style="background-color: rgb(44, 49, 67); border: 0px;">
    - Z-index for the arrow button in in the right sidebar
    
    - Activate scroll for the whole website from chat :
        1 ==> send a bunch of messages in chat > 100 messages
        2 ==> refresh chat page
        3 ==> open chat with the user (normally it shows the first ever message send)
        4 ==> start scrolling very quickly the messages
        5 ==> quickly switch and use the mouse wheel outside of container of chat
        6 ==> causes an activation of the scroll for the whole website

    - "Start Chatting :}" appears when i have an already ongoing chat a user (over 300 messages and start chat?)
        Expect : last message sent between me and that user
------------------------------------------------------------------------------------------------------

Zakaria :
    - Notication appears forcefully when switching between pages, cannot not ignore it for later
    - activate scroll for the div that holds all the notification
    - after checking notification of chat ==> i disconnect ==> when i reconnect ===> all notifications reappear
        [I've already checked them before disconnecting, they should not appear]
    - invite a friend to play a game doesn't work [the button "Pong"]