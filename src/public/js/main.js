function showNav() {
    elements = document.getElementsByClassName("myItem");
    for (let index = 0; index < elements.length; index++) {
        elements[index].style.display = "block";

    }
}

function hideNav() {
    elements = document.getElementsByClassName("myItem");
    for (let index = 0; index < elements.length; index++) {
        elements[index].style.display = "none";
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "200px";

    setTimeout(showNav, 400);
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";

    hideNav()
}

function add() {

    if ($("#cultAct").val() != "") {

        if (parseInt($("#mySelect").val()) > parseInt($("#cont").val())) {
            $("#mySelect").attr('disabled', 'disabled');

            $.ajax({
                url: '/agricultor/requestMuestra',
                type: 'POST',
                data: {
                    cultivosActAgricultor: $('#cultAct').val(),
                    cultivosFutAgricultor: $('#cultFut').val(),
                    observacionAgricultor: $('#observ').val()
                },
                success: function (data) {
                    if (data) {
                        Swal.fire(
                            'Muestra ' + $("#cont").val(),
                            'Los datos han sido guardados',
                            'success'
                        )
                    }
                }
            });

            $(".inputRequest").val("")
            $("#cont").val(parseInt($("#cont").val()) + 1);

            if (parseInt($("#mySelect").val()) == parseInt($("#cont").val())) {
                $("#buttMuestra").prop('disabled', true);
                $("#verSolic").prop('disabled', false);
            }
        }

    } else {
        Swal.fire(
            'Error!',
            'Debe escribir los cultivos que posee actualmente',
            'warning'
        )
    }
}

// function saveChanges() {

//     Swal.fire({
//         title: '¿Está seguro de guardar los cambios?',
//         text: "Una vez acepte, se creará la solicitud y podrá realizar el pago",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#1f942f',
//         cancelButtonColor: '#d33',
//         cancelButtonText: 'Cancelar',
//         confirmButtonText: 'Guardar'
//     }).then((result) => {
//         if (result.isConfirmed) {

//             // $.ajax({
//             //     url: '/agricultor/requestSave',
//             //     success: function (data) {
//             //         if (data) {
//             //             Swal.fire(
//             //                 'Guardado!',
//             //                 'Los datos de la solicitud han sido guardados',
//             //                 'success'
//             //             )
//             //             $("#mySelect").val("0");
//             //             $("#cont").val("0");
//             //             $("#mySelect").prop('disabled', false);
//             //             $("#buttMuestra").prop('disabled', false);
//             //             $("#buttSave").prop('disabled', true);
//             //         } else {
//             //             Swal.fire(
//             //                 'Error encontrado',
//             //                 'Ha ocurrido un error al guardar los datos',
//             //                 'error'
//             //             )
//             //         }
//             //     }
//             // });
//         }
//     })
// }

$("#verSolic").click(function () {
    $.ajax({
        url: '/agricultor/reqMuestras',
        success: function (data) {
            if ($('#bodyTab:empty').length) {
                var text = `<tr><td>Análisis de Muestra de Tierra</td><td>$30000 COP</td><td>${data.length}</td>
                        <td>$${data.length * 30000} COP</td></tr>`;
                $("#bodyTab").append(text);
            }
        }
    });
});

function deleteS() {
    Swal.fire({
        title: '¿Está seguro de borrar los datos ingresados?',
        text: "Una vez acepte se borrarán todos los datos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#1f942f',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Borrar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/agricultor/requestDelete',
                success: function (data) {

                    if (data) {
                        Swal.fire(
                            'Borrado exitoso',
                            'Los datos han sido descartados',
                            'success'
                        )
                        $("#mySelect").val("0");
                        $("#cont").val("0");
                        $("#mySelect").prop('disabled', false);
                        $("#buttMuestra").prop('disabled', false);
                        $("#buttSave").prop('disabled', true);

                    } else {
                        Swal.fire(
                            'Borrado fallido',
                            'Aun no hay datos para descartar',
                            'warning'
                        )
                    }
                }
            });
        }
    });
}