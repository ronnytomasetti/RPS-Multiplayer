// ====================================================================================
// GETS THE CURRENT USERS AUTHENTICATION DATA
// ====================================================================================
var authData = ref.getAuth();

if (authData) {
  console.log("Authenticated user with uid:", authData.uid);
}
// ================================== END =============================================

/**
 *  Starts a new game
 *
 *  Initializes global variables and templates.
 *  Calls function to retrieve json containing questions.
 *  Binds one click event listener to start button.
 *
 *  @param 
 *  @return 
 */
