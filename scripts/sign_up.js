// CONST
const MIN_PASS_LEN      = 6;
const MAX_PASS_LEN      = 20;
const SIGN_IN_POPUP_ID  = "sign_in_hide";

// global variables
let show_counter = 0;   // used to determine whether sign up popup is open or closed. 0 -> closed, 1 -> opened



function show_sign_up(id)
{
    if(show_counter === 0)
    {
        // first hide sign in popup (no matter if is opened)
        document.getElementById(SIGN_IN_POPUP_ID).style.display = "none";
        show_counter_sign_in = 0;

        // show sign up popup
        document.getElementById(id).style.display = "block";
        show_counter = 1;
    }
    else
    {
        document.getElementById(id).style.display = "none";
        show_counter = 0;
    }
}



/*/////////////////////////////////////
Checking that the pattern is correct and that the passwords are the same
*//////////////////////////////////////////////////////////////



function check_pass(passwordId, confirmedPasswordId)
{
    let pass        = document.getElementById(passwordId).value;
    let confPass    = document.getElementById(confirmedPasswordId).value;

    return pass === confPass && pass.length >= MIN_PASS_LEN && pass.length <= MAX_PASS_LEN;
}



function checkEmailPattern(emailId)
{
    let emailElem = document.getElementById(emailId);

    let pattern = emailElem.pattern;
    let re      = new RegExp(pattern);

    return re.test(emailElem.value);
}



function validateAndRegister(passwordId, confirmedPasswordId, emailId)
{
    let isEmailValid = checkEmailPattern(emailId);
    let isPasswordValid = check_pass(passwordId, confirmedPasswordId);

	if(isPasswordValid && isEmailValid)
	{
	    let isEmailUnique = register(document.getElementById(emailId).value,
            document.getElementById("sign_up_pass").value);

	    if (isEmailUnique)
        {
            window.location.href = "tables.html";
        }
	    else
        {
            alert("user with such email already exists");
        }
	}
	else if(!isEmailValid)
	{
        alert("the email doesnt correspond to the pattern, please try again");
	}
	else if(!isPasswordValid)
	{
        document.getElementById(passwordId).value = "";
        document.getElementById(confirmedPasswordId).value = "";
        alert("password must be have at least " + MIN_PASS_LEN + " characters and " + MAX_PASS_LEN + " at most. " +
            "Also passwords must be the same, please try again");
	}
	
}


/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
												REGISTRATION / COOKIES CODE
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