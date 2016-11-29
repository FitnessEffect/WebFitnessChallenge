var da = ""
var user = ""
var usernameArr = []
var exerciseArr = []
var repsArr = []
var setsArr = []
var resultArr = []

window.onload = function() {

    usernameArr = [];
    exerciseArr = [];
    repsArr = [];
    setsArr = [];
    resultArr = [];


    firebase.database().ref().child("users").once("value", function(snapshot) {
        var e = snapshot.val();
        var keys = Object.keys(e);


        for (var i = 0; i < keys.length; i++) {
            usernameArr.push(" " + e[keys[i]].username + " ");
            exerciseArr.push(" " + e[keys[i]].exercise + " ");
            repsArr.push(" " + e[keys[i]].reps + " ");
            setsArr.push(" " + e[keys[i]].sets + " ");
            resultArr.push(" " + e[keys[i]].result + " ");

            var newButton = document.createElement("BUTTON"); //create button node
            var newLine = document.createElement("LABEL");

            var userStr = "User:";
            var userLabel = userStr.fontcolor("blue");
            var exerciseStr = "Exercise:";
            var exerciseLabel = exerciseStr.fontcolor("blue");
            var repsStr = "Reps:";
            var repsLabel = repsStr.fontcolor("blue");
            var setsStr = "Sets:";
            var setsLabel = setsStr.fontcolor("blue");
            var resultStr = "Result:";
            var resultLabel = resultStr.fontcolor("blue");

            newButton.classList.add('btn');
            newButton.setAttribute("onclick", "editResult(" + i + ")");
            newButton.id = i;
            newButton.innerHTML = userLabel + usernameArr[i] + exerciseLabel + exerciseArr[i] + repsLabel + repsArr[i] + setsLabel + setsArr[i] + resultLabel + resultArr[i];
            newLine.innerHTML = "</br>";

            document.getElementById('container').appendChild(newButton);
            document.getElementById('container').appendChild(newLine);
        }
    })
};

var ls = localStorage;
ls.setItem("", "");
ls.getItem("");

function Exercise(username, exercise, reps, sets, result) {
    this.username = username;
    this.exercise = exercise;
    this.reps = reps;
    this.sets = sets;
    this.result = result;
}

function addExercise() {

    var textLabel = document.getElementById('textLabel');
    var username = document.getElementById('usernameID').value;
    var exercise = document.getElementById('exerciseID').value;
    var reps = document.getElementById('repsID').value;
    var sets = document.getElementById('setsID').value;
    var result = document.getElementById('resultID').value;

    var newExercise = new Exercise(username, exercise, reps, sets, result);

    firebase.database().ref().child("users").push(newExercise);

    document.getElementById('container').innerText = "";
    window.onload();
}

function registerUser() {
    var email = document.getElementById('emailID').value;
    var password = document.getElementById('passwordID').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function createExercise(){
  var newExercise = prompt('Create new exercise:');
  var exID = document.getElementById('exerciseID');
  var newEx = document.createElement("option");
  newEx.value = newExercise;
  newEx.text = newExercise;
  exID.appendChild(newEx);
  firebase.database().ref().push(exerciseArr);
}

function editResult(index) {
    var btnArray = document.getElementsByClassName('btn');


    console.log(index);

    var newResult = prompt('Add new result:');
    console.log(newResult);
    if (newResult === undefined || newResult === null) {
        return null;
    }
    firebase.database().ref().child("users").once("value", function(snapshot) {
        var s = snapshot.val();
        var keys = Object.keys(s);

        console.log(keys[index]);

        firebase.database().ref().child("users/" + keys[index] + "/result").set(newResult);
        location.reload();
    });
}
