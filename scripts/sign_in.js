var show_counter=0;

function changeCursor(){
			document.body.style.cursor = "pointer";
			}

function restoreCursor(){
			document.body.style.cursor = "auto";
			}
function show_sign_up(id){
			if(show_counter==0){
			document.getElementById(id).style.visibility = "visible";
			show_counter++;
			}else{
				document.getElementById(id).style.visibility = "hidden";
			show_counter--;
			}
}
function show_sign_in(id){
			if(show_counter==0){
			document.getElementById(id).style.visibility = "visible";
			show_counter++;
			}else{
				document.getElementById(id).style.visibility = "hidden";
			show_counter--;
			}
}

/*/////////////////////////////////////
Checking that the password is correct based on cookies
*//////////////////////////////////////////////////////////////
window.onload = function() {
  console.log("hey");
  console.log(document.cookie);
}



function check_everything(pass,email1){

  handleLogin(email1,pass);

}


/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
												REGISTRATION CODE
*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const USER_DATA_SEPARATOR         = "&";
function register(email, password)
{
    let isEmailUnique = obtainUser(email) === null;

    if (isEmailUnique)
    {
        storeUser(email, password);
        window.alert("account created");
    }
    else
    {
        window.alert("user with such email already exists");
    }
}



function storeUser(email, password)
{
    let userCookie = email + USER_DATA_SEPARATOR + password;

    setCookie(email, userCookie, 1000);

}
function handleLogin(e1,pass1) {


  let email = document.getElementById(e1).value;

  if (!cookieExists(email)) {
    alert("User not found");
  } else {
    let cookie1 = getCookie(email);
    cookie = cookie1.split("$");

    password = (cookie[0].split("&"))[1];
    console.log(password);

    if (password == document.getElementById(pass1).value) {
      let user = (cookie[0].split(":"))[1];
      setCookie("user", user);
      alert("success");
      window.location.replace("tasks_page.html");
    } else {
      alert("The password is Incorrect");
    }
  }
  return false;
}


function obtainUser(email)
{
    let userCookie  = getCookie(email);
    let user        = null;

    if (userCookie !== "")
    {
        let userData = userCookie.split(USER_DATA_SEPARATOR);
        user = {
            email:      userData[0],
            password:   userData[1]
        }
    }

    return user;
}



function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}



function setCookie(name, value, daysTillExpire)
{
    let d = new Date();
    d.setTime(d.getTime() + (daysTillExpire * 24 * 60 * 60 * 1000));    // transform days to milliseconds
    let expires = "expires="+ d.toUTCString();

    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function cookieExists(cookieName) {
  var cookie = getCookie(cookieName);

  return cookie != "" && cookie != null;
}
