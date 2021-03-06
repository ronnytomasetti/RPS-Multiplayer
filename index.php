<?php ?>

<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="Ronny Tomasetti">
  <meta name="description" content="Rock, Paper, Scissors Online Multiplayer">
  <meta name="keywords" content="rps, rock paper scissors, multiplayer rps">
  <link rel="icon" href="assets/img/favicon.ico">

  <title>RPS Online Multiplayer</title>

  <!-- Bootstrap core CSS -->
  <link href="assets/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom CSS stylesheet -->
  <link href="assets/css/stylesheet.css" rel="stylesheet" type="text/css">
  <!-- Firebase Reference -->
  <script src="https://www.gstatic.com/firebasejs/3.2.1/firebase.js"></script>
</head>

<body>

  <nav class="navbar navbar-inverse">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
        </button>
        <a class="navbar-brand" href="#">RPSLS</a>
      </div>
      <!-- <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li><a data-toggle="modal" href="#signup-modal">Sign-up</a></li>
          <li><a data-toggle="modal" href="#login-modal">Login</a></li>
        </ul>
      </div> -->
    </div> <!--/.container -->
  </nav> <!--/.navbar -->

  <div class="container">
    <div id="rpsls-app" class="row text-center">

    </div> <!-- /#rpsls-app -->
  </div> <!-- /.container -->

  <footer class="footer">
    <div class="container">
      <p class="text-center">2016 UCF Coding Bootcamp RPS-Multiplayer by Ronny Tomasetti</p>
    </div>
  </footer>

  <!-- ======================================================== -->
  <!-- jQuery min.js -->
  <script src="assets/js/jquery-3.1.0.min.js"></script>
  <!-- Bootstrap core JS -->
  <script src="assets/js/bootstrap.min.js"></script>
  <!-- RPSLS JS Game Object -->
  <script src="assets/js/rpsls.js"></script>
  <!-- Application JS -->
  <script src="assets/js/app.js"></script>
  <!-- ======================================================== -->
</body>
</html>
