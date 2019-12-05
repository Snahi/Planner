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

/*/////////////////////////////////////
Checking that the pattern is correct and that the passwords are the same
*//////////////////////////////////////////////////////////////

function check_pass(id1,id2)
{
    return document.getElementById(id1).value === document.getElementById(id2).value;
}

function checkPattern()
{
    let elem = document.getElementById("sign_up_email");

    let pattern = elem.pattern;
    let re = new RegExp(pattern);

    return re.test(elem.value);
}

function check_everything(id1,id2)
{
	if(check_pass(id1,id2) && checkPattern())
	{
	    let isEmailUnique = register(document.getElementById("sign_up_email").value,
            document.getElementById("sign_up_pass").value);
	    
	    if (isEmailUnique)
        {
            window.location.href = "tasks_page.html";  // TODO should be tables page
        }
	}
	if(!checkPattern())
	{
        document.getElementById(id1).value = "";
        document.getElementById(id2).value = "";
        alert("the email doesnt correspond to the pattern, please try again");
	}
	if(!check_pass(id1,id2) && checkPattern())
	{
        document.getElementById(id1).value = "";
        document.getElementById(id2).value = "";
        alert("the passwords are not the same, please try again");
	}
	
}


/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
												REGISTRATION CODE
*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const USER_DATA_SEPARATOR = "&";

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

    return isEmailUnique;
}



function storeUser(email, password)
{
    let userCookie = email + USER_DATA_SEPARATOR + password;

    setCookie(email, userCookie, 1000);
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



function getCookie(cookieName)
{
    let name            = cookieName + "=";
    let decodedCookie   = decodeURIComponent(document.cookie);
    let ca              = decodedCookie.split(';');
    let c;

    for(let i = 0; i <ca.length; i++)
    {
        c = ca[i];
        while (c.charAt(0) === ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0)
        {
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