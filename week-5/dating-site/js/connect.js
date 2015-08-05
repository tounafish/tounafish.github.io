/* The user would fill out the form and
click submit. At that point, the screen
is replacent with "Send This Email?" 
message, also displaying what the user
wrote. If the user clicks "Yes", then
the message "Sent" is displayed. If 
user clicks "No", then the user
starts over.

Ideas on how to do this:
1. Give all inputs an id.
2. Grab the values of all the ids.
3. Submit button replaces HTML with
   "Send This Email?" and the values
   entered. It would also display
   "Yes" and "No" buttons.  
5. Clicking "Yes" replaces HTML with
   "Thank You".
6. Clicking "No" nullifies all values
   and starts over.

*/

document.getElementById("clickme").onclick = submit;

function submit() {
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var reason = document.getElementById("reason").value;
	var comment = document.getElementById("comment").value;
	document.getElementById("emailsent").innerHTML = "Email Sent! <br>"+"<h5>"+name+"<br>"+email+"<br>"+reason+"<br>"+comment+"</h5>";
}