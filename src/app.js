const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// event, querySelector, addEventListener, click, DOMContentLoaded 
// preventDefault: disable it from making GET/POST rerquest when 'submit' is clicked
// click event listener
// --> make the form disappear when the submit is clicked


/*
<div id="clicker">Click Me</div>
document.querySelector('#clicker').addEventListener('click', myCallback)
this, function myCallback
*/

app.listen(3000);
console.log('Server started running!');