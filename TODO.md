 Mushigarou :
    ----------------------------------------------------------------------------------
    Bugs :
        - Remove console.log, console.error from all code
        - Remove type "any" from all code
        - Check data before using it or casting the type
        - Handle cases of when color cookies are delete or invalid
        - (wait PageUrl) in tournaments cards api
        - set "Your Colors" to colors coming from backend (settings)
        - Fix bugs of when API fails
        - current_tab_view ???? in settings

    ----------------------------------------------------------------------------------
    Feat :
        - Add "(ball speed)" as a description next to the "Game difficulty" label
        - Background of enble 2FA from white to input's color
        - Group color's cookies in into one object
        - Fix width of label above input in settings to prevent label from moving back and forth on small screen sizes

----------------------------------------------------------
profile: edit bio [get, post] -> Done
profile: chart fetch [get] -> Done
dashboard game history image -> Done
statistics game histor user image -> None
Profile: add friend, remove friend , block , unblock -> None
chat: chart fetch [get] -> None
rightbar: options [send messages, play a game] -> None


---------------------------------------------------------------------------------
zakaria you have error in /api/game-settings
->  PUT http://localhost:8000/api/game-settings 400 (Bad Request)
{'first_name': 'Aimen', 'last_name': 'El', 'username': 'ael-mouz', 'email': 'ael-mouz@student.1337.ma', 'country': 'Andorra', 'city': 'Engordany', 'image_url': 'https://res.cloudinary.com/dv1i5yh71/image/upload/v1718999183/profile/115547999_pukk3i.jpg', 'new_password': '', 'repeat_password': '', 'is_2fa_enabled': False, 'two_fa_secret_key': '', 'table_color': '#161625', 'ball_color': '#ffffff', 'paddle_color': '#ff4655', 'table_position': '6,8,0', 'current_table_view': '6,8,0', 'game_difficulty': 1}

i think the problem from serializer

no makayn ta problem the problem li3ndk l3ach katl3lk bad request cause is mandatory to send email and username
---------------------------------------------------------------
