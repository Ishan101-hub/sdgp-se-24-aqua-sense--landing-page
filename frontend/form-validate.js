/*create account */
function registerAccount(){
    clearErrors();
    /*collect input fields in to variables for use*/
    let valid = true;
    const name = get("name");
    const email = get("email");
    const pass = get("password");
    const confirm = get("confirmPassword");

    /*field validation */
    if(!name.value.trim()){
        error(name, "Full name is required");
        valid = false;
    }

    if(!email.value.trim()){
        error(email, "Email is required");
        valid = false;
    }
    else if(!/^\S+@\S+\.\S+$/.test(email.value)){
        error(email, "Invalid email - use format: user@gmail.com");
        valid = false;
    }

    if(!pass.value.trim()){
        error(pass, "Password cannot be empty");
        valid = false;
    }
    else if(pass.value.length < 6 ){
        error(pass, "Must be atleast 6 characters");
        valid = false
    }

    if(!confirm.value.trim()){
        error(confirm, "Confirm password required");
        valid = false;
    }
    
    else if(pass.value !== confirm.value){
        error(confirm, "Password do not match");
        valid = false
    }

    if (valid){
        success("Account Created Successfully");
    }
}

/*login validation*/

function loginUser(){
    clearErrors();
    let valid = true;
    
    /*Get values from login field*/
    const email = get("loginEmail");
    const pass = get("loginPassword");

    if(!email.value.trim()){
        error(email, "Email required");
        valid = false;
    }
    else if(!/^\S+@\S+\.\S+$/.test(email.value)){
        error(email, "Invalid email - example: user@gmail.com");
        valid = false;
    }

    if(!pass.value.trim()){
        error(pass, "Password required");
        valid = false;
    }
    else if(pass.value.length < 6){
        error(pass, "Must be 6+ characters long");
        valid  = false;
    }
    if (valid){
        successLogin("Login Successful");
        setTimeout(()=> location.href = "index.html#home", 900); /*Redirect after 0.9s */
    }
}
/*util function*/

function get(id){
    return document.getElementById(id);
}

/*Add error UI to an input, insert small msg bellow the field*/
function error(el, msg){
    el.classList.add("error");
    let small = document.createElement("small");
    small.className = "error-msg";
    small.innerHTML = msg;
    el.insertAdjacentElement("afterend", small); 
}

/*Clearing old all errors before new validation run*/
function clearErrors(){
    document.querySelectorAll(".error-msg").forEach(e => e.remove()); /*Remove msgs*/
    document.querySelectorAll(".input-field").forEach(e => e.classList.remove("error"));
}

/*Show success msg in  create account */
function success(txt){
    get("msg").innerHTML = txt;
    get("msg").style.color = "#00ffcc";
}

/*Show success msg in login form*/
function successLogin(txt){
    get("loginMsg").innerHTML = txt;
    get("loginMsg").style.color = "#00ffcc";
}

