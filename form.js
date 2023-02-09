let list = [];
let student = {};
$(document).ready(function () {
    $("#subm").click(function () {
        let id = $("#id").val();
        let username = $('input[name=username]').val();
        let fname = $('input[name=fname]').val();
        let email = $('input[name=email]').val();
        let dob = $('input[name=dob]').val();
        let number = $('input[name=number]').val();
        let address = $('textarea[name=address]').val();

        jQuery.validator.addMethod("customEmail", function (value, element) {
            return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
        }, "Please enter valid email address!");

        jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
            phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length > 9 &&
                phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
        }, "Please specify a valid phone number");

        var $registrationForm = $('#registration');
        if ($registrationForm.length) {
            $registrationForm.validate(
                {

                    rules: {
                        username: {
                            required: true,

                        },
                        fname: {
                            required: true,
                        },
                        email: {
                            required: true,
                            customEmail: true
                        },
                        dob: {
                            required: true,
                        },
                        number: {
                            required: true,
                            phoneUS: true
                        },

                        address: {
                            required: true,

                        }
                    },
                    messages: {
                        username: {

                            required: 'Please enter username!'
                        },
                        fname: {
                            required: 'Please enter father name!'
                        },
                        email: {
                            required: 'Please enter email!',
                            email: 'Please enter valid email!'
                        },
                        dob: {
                            required: 'Please enter dateofbirth!'
                        },
                        number: {
                            required: 'Please enter phonenumber!'

                        },
                        address: {
                            required: 'Please enter address!'
                        },

                    },

                }


            )
        }

        var registration = {
            'username': username, 'fname': fname, 'email': email, 'dob': dob, 'number': number, 'address': address
        }
        console.log(registration);




        if (username && fname && email && dob && number && address) {
            list.push(registration);
        }
            if (id == "") {
                $.ajax({
                    type: "POST",
                    url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user",
                    data: registration,
                    dataType: "JSON",
                    endcode: true,
                    success: function () {
                        // buildTable1()
                        // location.reload()
                    }

                })
            }
            else {
                $.ajax({
                    type: "PUT",
                    url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user/" + student.id,
                    data: registration,
                    dataType: "JSON",
                    endcode: true,
                    success: function () {
                        // console.log(response)
                        location.reload()
                    }

                })
            }
        
    })
})

function buildTable1() {
  
    $.ajax({
        type: "GET",
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user",
        dataType: "JSON",
        success: function (response) {
            let list = response

            // list = JSON.parse(localStorage.getItem("registrationvalue"));
            // console.log(list)
            var count = 1;
            for (let i = 0; i < list.length; i++) {

                let row =
                    "<td>" + count++ + "</td>"
                    + "<td>" + list[i].username + "</td>"
                    + "<td>" + list[i].fname + "</td>"
                    + "<td>" + list[i].email + "</td>"
                    + "<td>" + list[i].dob + "</td>"
                    + "<td>" + list[i].number + "</td>"
                    + "<td>" + list[i].address + "</td>"
                    + "<td>" + "<button type='button' class='getEditWin text-white btn btn-primary' data-id=" +

                    list[i].id + ">Edit</button><button type='button' class=' deleteRow btn btn-danger ms-2' onclick='deleteRow (" +

                    list[i].id + ")'>Delete</button> " + "</td>"


                document.getElementById("myTable1").innerHTML += row;
            }
        }
    })
}
$(document).on('click', '.getEditWin', function () {
    var id = $(this).data('id');
    $.ajax({
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user/" + id,
        type: "GET",
        success: function (response) {
            $("#id").val(response.id);
            $("#username").val(response.username);
            $("#fname").val(response.fname);
            $("#email").val(response.email);
            $("#dob").val(response.dob);
            $("#number").val(response.number);
            $("#address").val(response.address);
            student = response;

        }
    })
})
function deleteRow(id) {
    $.ajax({
        url: "https://63cfb75b8a780ae6e67b1f01.mockapi.io/user/" + id,
        type: "DELETE",
        success: function (response) {
            location.reload()

        }
    })
}