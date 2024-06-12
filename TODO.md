 Mushigarou :
    ----------------------------------------------------------------------------------
    Bugs :
        - Change typo error in "11-0"
        - Remove console.log, console.error from all code
        - Remove type "any" from all code
        - Check data before using it or casting the type
        - Prevent "cannot upload the image" in settings
        - Handle cases of when color cookies are delete or invalid
        - validate access token in signout view (permissions & auth)
        - Browser Issues in tournament Form's input and label (id)
        - (wait PageUrl) in tournaments cards api
        - set "Your Colors" to colors coming from backend (settings)
        - page/profile ==> refresh on save
        - valid range of game difficulty [0-2]
        - Fix bugs of when API fails

    ----------------------------------------------------------------------------------
    Feat :
        - Implement searchbox logic in tournament page
        - Make game customization buttons smaller
        - Make achivements cards smaller
        - Add "(ball speed)" as a description next to the "Game difficulty" label
        - Background of enble 2FA from white to input's color
        - Group color's cookies in into one object
        - Fix width of label above input in settings to prevent label from moving back and forth on small screen sizes

    ----------------------------------------------------------------------------------
    Chore :
        - POST settings data and handle response accordingly
        - POST remote and local tournament data and handle response accordingly

api/ create-tournament [name='create-tournament']
api/ game-settings [name='game-settings']


----------------------------------------------------------
const ValuesToPost: InputValuesProps = {
    username: '', //
    tournament_name: '',
    tournament_image: '', //
    game_difficulty: '1',
};
