
// Function to fetch all of the people on the database and display in a human readable way the information
$.ajax({
    url: "php/getall.php",
    type: 'POST',
    dataType: 'json',
    //cache: false,
    success: function(result) {

        // Appends each persons profile into the scrollable section
        for (i=0; i<result.length; i++) {
        $("#profiles").append('<li class="box" data-first=' + result[i]['firstName'] + ' data-last=' + result[i]['lastName'] + ' data-id=' + result[i]['id'] + ' data-email=' + result[i]['email'] + ' data-department=' + result[i]['department'] + ' data-location=' + result[i]['location'] + '><div class="list-group-item list-group-item-action flex-column align-items-start toggler-enabled" id="profile"><a><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + result[i]['firstName'] + ' ' + result[i]['lastName'] + '</h5><small>' + result[i]['id'] + '</small></div><div><p class="mb-1">' + result[i]['jobTitle'] + '</p><p class="mb-1">' + result[i]['email'] + '</p><p class="mb-1">' + result[i]['department'] + '</p><p class="mb-1">' + result[i]['location'] + '</p></div></a><div class="container" id="edit-delete"><button type="button" class="col-5" name="id" onclick="showModal(' + result[i]['id'] + ')"> Edit </button><form class="formPersonDelete"><button type="submit" class="col-5 delete confdel personDelete" name="id" value=' + result[i]['id'] + '>Delete</button><from></div></div></li>')
        };

        // Function to show and hide the edit or delete options when a persons profile is clicked
        $(".toggler-enabled").on("click", function() {
            var expdiv = $(this).children("div");
        expdiv.is(":visible")?expdiv.hide():expdiv.show();
        });

        // Function to edit employee data in the database using values in the edit person modal
        $("#editPerson").submit(function () {
            $.ajax({
                url: "php/edit.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    firstName : $("#editName").val(), 
                    lastName : $("#editLast").val(),
                    jobTitle : $("#editJob").val(),
                    email : $("#editEmail").val(),
                    departmentID : $("#editDep").val(),
                    id : $("#editID").val()
                },
                success: function(result) {

                },
                error: function(jqXHR, exception){
                    errorajx(jqXHR, exception);
                    console.log("Edit profiles");
                }
            });   
        })

        // Function to delete a person such as if the left the business
        $(".personDelete").on("click", function () {
            console.log($(this).parent().parent().parent().parent().attr("data-id"));
            $.ajax({
                        url: "php/delete.php",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            id: $(this).parent().parent().parent().parent().attr("data-id")
                        },
                        success: function(result) {
                            
                        },
                        error: function(jqXHR, exception){
                            errorajx(jqXHR, exception);
                            console.log("Delete profiles");
                        }
                    });   
        })
    },
    error: function(jqXHR, exception){
        errorajx(jqXHR, exception);
        console.log("Get profiles");
    }    
}); 

// Function to show and hide the edit or delete options when a persons profile is clicked
$(".toggler-enabled").on("click", function() {
    var expdiv = $(this).children("div");
expdiv.is(":visible")?expdiv.hide():expdiv.show();
});

// Function to add a new person to the database using the add person modal, very similar to edit but INSERT instead of UPDATE
$("#addPerson").submit(function () {
        $.ajax({
            url: "php/addPerson.php",
            type: 'POST',
            dataType: 'json',
            data: {
                firstName : $("#addName").val(), 
                lastName : $("#addLast").val(),
                jobTitle : $("#addJob").val(),
                email : $("#addEmail").val(),
                departmentID : $("#depSel").val(), 
                location : $("#locSel").val()
            },
            success: function(result) {

            },
            error: function(jqXHR, exception){
                errorajx(jqXHR, exception);
                console.log("Add profiles");
            }
        });   
});

// Function to add a department to the database
$("#addDepartment").submit(function () {
    $.ajax({
        url: "php/addDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            department : $("#departName").val(), 
            location : $("#locationSel").val(),   
        },
        success: function(result) {

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Add Department");
        }
    });   
});

// Functoin to add a new location in the Location edit modal
$("#locationAddForm").submit(function () {
    $.ajax({
        url: "php/addLocation.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            location : $("#addLoc").val(),
        },
        success: function(result) {

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Add Location");
        }
    });   
});

// Function to show and hide the advanced search options when advanced search button is clicked
$("#advanced-button").on("click", function() {
    $("#advanced-button").hide();
    $("#advancedRow").is(":visible")?$("#advancedRow").hide():$("#advancedRow").show();
    $("#remove-button").is(":visible")?$("#remove-button").hide():$("#remove-button").show();
});

// Function to do the oppsite of before and hide the advanced search
$("#remove-button").on("click", function() {
    $("#remove-button").hide();
    $("#advancedRow").is(":visible")?$("#advancedRow").hide():$("#advancedRow").show();
    $("#advanced-button").is(":visible")?$("#advanced-button").hide():$("#advanced-button").show();
    $('.loca').val('all').trigger('change');
    $('.dept').val('all').trigger('change');
});

// Function which uses the database to get all of the departments and append them to select options so user can pick departments
// with a full list as they are created or deleted
$.ajax({
    url: "php/depList.php",
    type: 'POST',
    dataType: 'json',
    success: function(result) {
        for (i=0; i<result.length; i++) {
            $("#depSel").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#editDep").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#dept").append('<option value=' + result[i]['name'] + '>' + result[i]['name'] + '</option>')
            $("#deptModal").append('<tr><td>' + result[i]['name'] + '</td><td>' + result[i]['id'] + '</td><td><form class="fromDelteDep" ><button type="submit" name="id" class="confdel deleteDep" data-id=' + result[i]['id'] + ' value=' + result[i]['id'] + '>Delete</button></form></td></tr>')
        }

        // Function to delete a department from the database
        $(".deleteDep").on("click", function () {
            $.ajax({
                url: "php/deleteDepartment.php",
                type: 'POST',
                dataType: 'json',
                data: { 
                    id : $(this).attr("data-id"),
                },
                success: function(result) {

                },
                error: function(jqXHR, exception){
                    errorajx(jqXHR, exception);
                    console.log("Delete Department");
                }
            });   
        });

    },
    error: function(jqXHR, exception){
        errorajx(jqXHR, exception);
        console.log("Get Department");
    }
}); 


// Function which does the same as the department function above but for locations
$.ajax({
    url: "php/getLoc.php",
    type: 'POST',
    dataType: 'json',
    success: function(result) {

        // Itterate through the results and append sections in the html with the a select of possible locations
        for (i=0; i<result.length; i++) {
            $("#locSel").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#editLoc").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#loca").append('<option value=' + result[i]['name'] + '>' + result[i]['name'] + '</option>')
            $("#locationSel").append('<option value=' + result[i]['id'] + '>' + result[i]['name'] + '</option>')
            $("#locationModal").append('<tr><td>' + result[i]['name'] + '</td><td>' + result[i]['id'] + '</td><td><form class="formDelLocat" ><button type="submit" name="id" class="confdel delLocat" data-id=' + result[i]['id'] + ' value=' + result[i]['id'] + '>Delete</button></form></td></tr>')
        }

        // Function to confirm a user wishes to delete a department or location by using the confirm alert window if they confirm it will be deleted or they can cancel
        $('.confdel').on("click", function areYouSure() { 
            if (confirm('Are you sure you want to permanently delete?')) {
                $('.confdel').submit()
            } else {
                return false;
            }
        });  

        // Function to delete a location from the database 
        $(".delLocat").on("click", function () {
            console.log($(".delLocat").attr("data-id"));
            $.ajax({
                url: "php/deleteLocation.php",
                type: 'POST',
                dataType: 'json',
                data: { 
                    id : $(this).attr("data-id"),
                },
                success: function(result) {
                    
                },
                error: function(jqXHR, exception){
                    errorajx(jqXHR, exception);
                    console.log("Delete Location");
                }
            });   
        });

    },
    error: function(jqXHR, exception){
        errorajx(jqXHR, exception);
        console.log("Get Locaiton");
    }
}); 

// Function to  fill the input boxes with an employees current data. This is done for two reasons, one so the  usercan easily see what they change and also
// so that the data does not have to be re-typed if it is the same.
function showModal(data) {
    console.log(data);
    $.ajax({
        url: "php/editEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: data
        },
        success: function(result) {

            // Appends each input value to their respective data
            $("#editID").val(result['id']);
            $("#editName").val(result['firstName']);
            $("#editLast").val(result['lastName']);
            $("#editEmail").val(result['email']);
            $("#editJob").val(result['job'])
            $("#editDep").val(result['department'])
            $("#editLoc").val(result['location'])
            $("#edit-modal").modal();

        },
        error: function(jqXHR, exception){
            errorajx(jqXHR, exception);
            console.log("Edit Employee");
        }
    }); 
};

// Function so that when a user presses delete on a persons profile they get an alert to double check tehy wish to delete the data
$('.confdel').on("click", function areYouSure() { 
    if (confirm('Are you sure you want to permanently delete?')) {
        $('.confdel').submit()
    } else {
        return false;
    }
});

// This section is for the search bar
// when the search bar is typed in or the department and location selects are changed the function select is run
$("#dept").change(function() {
    select();
});
$("#search").keyup(function() {
    select();
});
$("#loca").change(function() {
    select();
});
  
// Function for searching the personnel data
function select() {
    // Sets each of the search sections values to a variable
    var department = $("#dept").val();
    var search = $("#search").val();
    var location = $("#loca").val();

    // Gets the data in the box class and hides all the elements 
    $(".box").hide();
    // Sets variable boxes equal to all the data sets that equal the function using the filter method.
    var boxes = $(".box").filter(function(index) {

        // Contain department = all or if a department if it is selected and
        return (department === 'all' || $(this).attr("data-department") === department) &&
        // The result from the search type bar equal to any of the data for names, email etc or if nothing is types all are shown (not search) and
        ((!search || $(this).attr("data-first").toLowerCase().indexOf(search.toLowerCase()) >= 0 ) ||
        (!search || $(this).attr("data-last").toLowerCase().indexOf(search.toLowerCase()) >= 0 ) ||
        (!search || $(this).attr("data-email").toLowerCase().indexOf(search.toLowerCase()) >= 0 )) &&
        // Locations if selected or all if none are
        (location === 'all' || $(this).attr("data-location") === location)
    });
    // The boxes that match the search criteria are then shown
    boxes.show();
  
};  

// Function which returns the error for an ajax call depending on the error number and log to console
function errorajx(jqXHR, exception) {

    var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        console.log(msg);
};
