// ====================================================================================
// GETS THE CURRENT USERS AUTHENTICATION DATA
// ====================================================================================
var authData = ref.getAuth();

if (authData) {
  console.log("Authenticated user with uid:", authData.uid);
}
// ================================== END =============================================

// ====================================================================================
// CALLED EVERYTIME AUTHENTICATION STATE CHANGES. (PAGE LOAD, REFRESH, SIGNIN, SIGNOUT)
// ====================================================================================
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Logged in user.
    var displayName = user.displayName;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(displayName);
    console.log(uid);
    console.log(providerData);
  } else {
    // No user
    console.log('No user found!');
  }
}, function(error) {
  console.log(error);
});
// ================================== END =============================================

// ====================================================================================
// WRITING DATA TO THE DATABASE
// ====================================================================================
firebase.database().ref('users/' + userId).set({
	displayName: name
});
// ================================== END =============================================
