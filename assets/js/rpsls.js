/**
 * RPSLS Game Object
 * Ronny Tomasetti
 * 2016 UCF Coding Bootcamp
 */

function RPSLS() {

    this.player = {};
    this.opponent = {};
    
    this.weapons = [ 'rock', 'paper', 'scissors', 'lizard', 'spock' ];

    this.config = {
                    apiKey: "AIzaSyDkXBvYGeQz45NI9wQmWy6C_cS7P4KR354",
                    authDomain: "rpsls-5141f.firebaseapp.com",
                    databaseURL: "https://rpsls-5141f.firebaseio.com",
                    storageBucket: "rpsls-5141f.appspot.com"
                  };

    /**
     * Initializes Firebase connection using declared config variables above.
     *
     * @param {}
     * @return {} 
     */
    this.initializeFirebaseConnection = function()
    {
        return firebase.initializeApp(this.config);
    }

    /**
     * Authenticates a new anonymous player with Firebase.
     *
     * @param {}
     * @return {} 
     */
    this.createAnonymousPlayer = function()
    {
        var self = this;

        firebase.auth().signInAnonymously().catch( function(error) {
            console.warn("Error Code: " + error.code + ": " + error.message);
        });

        firebase.auth().onAuthStateChanged( function(user) {
            firebase.database().ref('/player-profiles/' + user.uid).set(
            {
                name: self.player.name,
                wins: self.player.wins,
                losses: self.player.losses,
                draws: self.player.draws
            });
        });
    }

    /**
     * Retrieves currently signed in and authenticated Firebase user.
     *
     * @param {}
     * @return { NULL ? USER } :Returns null if user is signed in anonymously, else returns current user.
     */
    this.getCurrentUser = function()
    {
        return firebase.auth().currentUser;
    }

    /**
     * Starts new Firebase database listeners to path /game-rooms
     * for [ child_added ] and [ child_removed ] events.
     *
     * @param {}
     * @return {} 
     */
    this.startGameRoomsListeners = function()
    {
        firebase.database().ref('/game-rooms/').on('child_added', function(data) {
          addNewGameRoomBtn(data.key, data.val().name);
        });

        firebase.database().ref('/game-rooms/').on('child_removed', function(data) {
          removeGameRoomBtn(data.key);
        });
    };

    /**
     * Returns new game room key after pushing object to /game-rooms path.
     *
     * @param {string} roomName :Name variable for game room from user input.
     * @return {string} newKey  :Firebase uid variable to newly added /game-rooms object. 
     */
    this.getNewRoomKey = function(roomName)
    {
        var newKey = firebase.database().ref('/game-rooms/').push({ name: roomName }).key;
        return newKey;
    };
  
}