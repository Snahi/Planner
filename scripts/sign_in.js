// CONST
const SIGN_UP_POPUP_ID = "sign_up_hide";

// global variables
let show_counter_sign_in = 0;    // used to determine whether sign in popup is open or closed. 0 -> closed, 1 -> opened


function show_sign_in(id)
{
    if(show_counter_sign_in === 0)
    {
        // first close sign up popup (no matter if it's open)
        document.getElementById(SIGN_UP_POPUP_ID).style.display = "none";
        show_counter = 0;

        // open the sign in popup
        document.getElementById(id).style.display = "block";
        show_counter_sign_in = 1;
    }
    else
    {
        document.getElementById(id).style.display = "none";
        show_counter_sign_in = 0;
    }
}



/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
												LOGIN CODE
*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function handleLogin(emailId, passwordId)
{
    let email = document.getElementById(emailId).value;
    let user = obtainUser(email);

    if (user === null)
    {
        alert("Incorrect data");
    }
    else
    {
        let password = document.getElementById(passwordId).value;

        if (user.password === password)
        {
            window.location.href = "tables.html";
        }
        else
        {
            alert("Incorrect data");
        }
    }

    return false;
}
