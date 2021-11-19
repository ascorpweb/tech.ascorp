(function() {
    function validEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function validateHuman(honeypot) {
        if (honeypot) { //if hidden form filled up
            console.log("Robot Detected!");
            return true;
        } else {
            console.log("Welcome Human!");
        }
    }

    // get all data in form and return object
    function getFormData(form) {
        var elements = form.elements;

        var fields = Object.keys(elements).filter(function(k) {
            return (elements[k].name !== "honeypot");
        }).map(function(k) {
            if (elements[k].name !== undefined) {
                return elements[k].name;
                // special case for Edge's html collection
            } else if (elements[k].length > 0) {
                return elements[k].item(0).name;
            }
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function(name) {
            var element = elements[name];

            // singular form elements just have one value
            formData[name] = element.value;

            // when our element has multiple items, get their values
            if (element.length) {
                var data = [];
                for (var i = 0; i < element.length; i++) {
                    var item = element.item(i);
                    if (item.checked || item.selected) {
                        data.push(item.value);
                    }
                }
                formData[name] = data.join(', ');
            }
        });

        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

        console.log(formData);
        return formData;
    }

    function handleFormSubmit(event) { // handles form submit without any jquery
        event.preventDefault(); // we are submitting via xhr below
        var form = event.target;
        var data = getFormData(form); // get the values submitted in the form

        // OPTION: Remove this comment to enable SPAM prevention, see README.md
        if (validateHuman(data.honeypot)) { //if form is filled, form will not be submitted
            return false;
        }

        //<<------ Name Validation ------>>
        // Get the value of the input field with id.
        var contactName = document.getElementById("name").value;

        //allowed only letters (uppercase or lowercase).
        function validName(contactName) {
            var letters = /[\.A-Za-z ]$/;
            return letters.test(contactName);
        }

        // if Name is invalid show error.
        if (contactName && !validName(contactName)) {
            alert("Name is invalid. Only letters (uppercase or lowercase) are allowed.")
            return false;
        }
        //<<------ Mobile Number Validation ------>>
        // Get the value of the input field with id.
        var contactNumber = document.getElementById("mobile").value;

        //   Number can’t be empty.
        if (contactNumber == null || contactNumber == "") {
            alert("Contact Number can't be blank.");
            return false;
        }
        //minmum length 10 digits.
        if (contactNumber.length < 10) {
            alert("Contact Number can't be less than 10 digits.")
            return false;
        }

        // if Contact Number is not valid show error.
        if (contactNumber == 0000000000 || 00000000000 || 000000000000) {
            alert("Contact Number is invalid. All zeros are not allowed.")
            return false;
        }
        //Validation will remove all non-digits, no comma, no spaces,no punctuation 
        //and there will be no + sign in front the number.
        function validMobile(contactNumber) {
            var phoneno = /^\d{10,13}$/; //compare 10 to 13 digits contact number.
            return phoneno.test(contactNumber);
        }

        // if Contact Number is not valid show error.
        if (contactNumber && !validMobile(contactNumber)) {
            alert("Contact Number is invalid. Please remove spaces, alphabets or all non-digits.")
            return false;
        }

        // <<------ Email Validation ------>>
        // Email can’t be empty.
        if (data.email == null || data.email == "") {
            alert("Email can't be blank.");
            return false;
        }
        // if Email is not valid show error.
        if (data.email && !validEmail(data.email)) {
            var invalidEmail = form.querySelector(".email-invalid");
            if (invalidEmail) {
                invalidEmail.style.display = "block";
                return false;
            }
        } else {
            disableAllButtons(form);
            var url = form.action;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                console.log(xhr.status, xhr.statusText);
                console.log(xhr.responseText);
                var formElements = form.querySelector(".form-elements")
                if (formElements) {
                    formElements.style.display = "none"; // hide form
                }

                //<<------ Thankyou Message ------>>
                var thankYouMessage = form.querySelector(".thankyou_message");
                if (thankYouMessage) {
                    thankYouMessage.style.display = "block";
                }
                return;
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);
        }
    }

    function loaded() {
        // console.log("Contact form submission handler loaded successfully.");
        // bind to the submit event of our form
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
})();