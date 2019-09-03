$(document).ready(function () {
    listarTransfer();
    listarFornecedor();

    $("#diahora").inputmask("99/99/9999 99:99:99", {"placeholder": "dd/mm/aaaa hh:mm:ss"});

    $('#tabelatransfer tbody').on('click', 'button', function () {
        $('html,body').animate({scrollTop: 0}, 'slow');

        var tr = $(this).closest("tr");
        var dadosfile = $("#tabelatransfer").DataTable().row(tr).data();
        var type = $(this).data('type');

        if (type === 'editartransfer') {
            $.ajax({
                type: 'GET',
                url: '../ServletConsultarTransfer',
                data: 'idid=' + dadosfile[0],
                statusCode: {
                    404: function () {
                        alert('Pagina não encontrada no filtro');
                    },
                    500: function () {
                        alert('erro no servidor');
                    }
                },
                success: function (dados) {
                    transferfiltrado = dados.split(";");
                    var id = transferfiltrado[0].split("#")[0];
                    var diahora = transferfiltrado[0].split("#")[1];
                    var fornecedor = transferfiltrado[0].split("#")[2];
                    var placa = transferfiltrado[0].split("#")[3];
                    var modelo = transferfiltrado[0].split("#")[4];
                    var ineout = transferfiltrado[0].split("#")[5];
                    var saida = transferfiltrado[0].split("#")[6];
                    var destino = transferfiltrado[0].split("#")[7];
                    var pax = transferfiltrado[0].split("#")[8];
                    var pagamento = transferfiltrado[0].split("#")[9];

                    diahora = moment(diahora, "YYYY-MM-DD hh:mm:ss");
                    diahora = diahora.format("DD/MM/YYYY HH:mm:ss");

                    $("#diahora").attr('registro', id);
                    $("#diahora").val(diahora);
                    $('#fornecedor').selectpicker('val', fornecedor);
                    $("#placacarro").val(placa);
                    $("#modelomarca").val(modelo);
                    $("#ineout").val(ineout);
                    $("#ineout").selectpicker('refresh');
                    $("#saida").val(saida);
                    $("#destino").val(destino);
                    $("#paxref").val(pax);
                    $("#pagamento").val(pagamento);
                }
            });
        }
        if (type === 'deletartransfer') {
            swal({
                title: "Você deseja excluir o transfer: " + dadosfile[0] + "?",
                text: "Será excluído o transfer selecionado",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#388E3C",
                confirmButtonText: "Sim, quero excluir o transfer!",
                cancelButtonText: "Não, cancele por favor!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Excluído!", "Os dados foram excluídos.", "success");
                    $.ajax({
                        type: 'GET',
                        url: '../ServletExcluirTransfer',
                        data: 'idid=' + dadosfile[0],
                        statusCode: {
                            404: function () {
                                alert('Pagina não encontrada');
                            },
                            500: function () {
                                alert('erro no servidor');
                            }
                        },
                        success: function (dados) {
                            var table = $('#tabelatransfer').DataTable();
                            table.clear().draw();
                            listarTransfer();
                        }
                    });
                } else {
                    swal("Cancelado", "Os dados serão mantidos", "error");
                }
            });
        }
    });
});

function inserirTransfer() {

    var diahora = moment($("#diahora").val(), "DD/MM/YYYY hh:mm:ss");
    diahora = diahora.format("YYYY-MM-DD H:mm:ss");
    
    $.ajax({
        type: 'GET',
        url: '../ServletInserirTransfer',
        data: {iddiahora: diahora,
            idfornecedor: $('#fornecedor').find('option:selected').text(),
            idplaca: $('#placacarro').val(),
            idmodelo: $('#modelomarca').val(),
            idineout: $('#ineout').find('option:selected').text(),
            idsaida: $('#saida').val(),
            iddestino: $('#destino').val(),
            idpax: $('#paxref').val(),
            idpagamento: $('#pagamento').val()
        },
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelatransfer').DataTable();
            table.clear().draw();
            listarTransfer();
        }
    });
}

function limparTudo() {
    $('#diahora').val('');
    $('#diahora').attr('registro', '');
    $('#fornecedor').val("");
    $('#fornecedor').selectpicker('refresh');
    $('#placacarro').val('');
    $('#modelomarca').val('');
    $('#ineout').val("");
    $('#ineout').selectpicker('refresh');
    $('#saida').val('');
    $('#destino').val('');
    $('#paxref').val('');
    $('#pagamento').val('');

    var oTable = $('#tabelatransfer').dataTable();
    oTable.fnFilter("");
}

function atualizarTransfer() {
    var diahoras = moment($("#diahora").val(), "DD/MM/YYYY hh:mm:ss");
    diahoras = diahoras.format("YYYY-MM-DD H:mm:ss");
    $.ajax({
        type: 'GET',
        url: '../ServletAtualizarTransfer',
        data: {idid: $('#diahora').attr('registro'),
            iddiahora: diahoras,
            idfornecedor: $('#fornecedor').find('option:selected').text(),
            idplaca: $('#placacarro').val(),
            idmodelo: $('#modelomarca').val(),
            idineout: $('#ineout').find('option:selected').text(),
            idsaida: $('#saida').val(),
            iddestino: $('#destino').val(),
            idpax: $('#paxref').val(),
            idpagamento: $('#pagamento').val()
        },
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelatransfer').DataTable();
            table.clear().draw();
            listarTransfer();
        }
    });
}


function excluirTransfer() {
    var diahora = $('#diahora').attr('registro');
    if (diahora === "") {
        alert("Clique em um número de transfer na tabela para excluir");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletExcluirTransfer',
            data: {idid: $('#diahora').attr('registro')},
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelatransfer').DataTable();
                table.clear().draw();
                listarTransfer();
            }
        });
    }
}

function listarFornecedor() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarFornecedor',
        data: 'idcpf=' + $('#cpf').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            $("#fornecedor").empty();
            fornecedorfiltrado = dados.split(";");
            $('#fornecedor').append($('<option>', {
                value: "",
                text: ""
            }));
            for (var i = 0; i < fornecedorfiltrado.length - 1; i++) {
                var id = fornecedorfiltrado[i].split("#")[0];
                var cnpj = fornecedorfiltrado[i].split("#")[1];
                var nome = fornecedorfiltrado[i].split("#")[2];
                $('#fornecedor').append($('<option>', {
                    value: nome,
                    text: nome
                }));
            }
            $("#fornecedor").selectpicker('refresh');
        }
    });
}

function listarTransfer() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarTransfer',
        data: {idid: $('#servico').attr('registro')},
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            transferfiltrado = dados.split(";");
            for (var i = 0; i < transferfiltrado.length - 1; i++) {
                var id = transferfiltrado[i].split("#")[0];
                var diahora = transferfiltrado[i].split("#")[1];
                var fornecedor = transferfiltrado[i].split("#")[2];
                var placa = transferfiltrado[i].split("#")[3];
                var modelo = transferfiltrado[i].split("#")[4];
                var ineout = transferfiltrado[i].split("#")[5];
                var saida = transferfiltrado[i].split("#")[6];
                var destino = transferfiltrado[i].split("#")[7];
                var pax = transferfiltrado[i].split("#")[8];
                var pagamento = transferfiltrado[i].split("#")[9];
                var excluido = transferfiltrado[i].split("#")[10];

//                diahora = moment(diahora, "YYYY-MM-DD hh:mm:ss");
//                diahora = diahora.format("DD/MM/YYYY hh:mm:ss");

                var atividades = "<button id='editartransfer' data-type='editartransfer' class='btn waves-effect bg-light-blue'><i class='material-icons'>edit</i></button>"
                        + "<button id='deletartransfer' data-type='deletartransfer' class='btn waves-effect bg-pink'><i class='material-icons'>delete_forever</i></button>";

                if (excluido === 'true') {
                    atividades = "<button id='transferexcluido' data-type='transferexcluido' class='btn waves-effect bg-warning'><i class='material-icons'>delete_forever</i></button>";
                }

                var t = $('#tabelatransfer').DataTable();
                t.row.add([
                    id,
                    diahora,
                    fornecedor,
                    placa,
                    modelo,
                    ineout,
                    saida,
                    destino,
                    atividades
                ]).draw(false);
            }
        }
    });
}

$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'inserirtransfer') {
            showInserirMessage();
        } else if (type === 'limpartudo') {
            showLimparTudoMessage();
        } else if (type === 'atualizar') {
            showAtualizarMessage();
        } else if (type === 'exluir') {
            showExcluirMessage();
        }
    });
});


function showInserirMessage() {
    swal({
        title: "Você deseja salvar os dados?",
        text: "Serão salvos no sistema os dados preenchidos",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, salve os dados!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Salvo!", "Os dados foram salvos.", "success");
            inserirTransfer();
        } else {
            swal("Cancelado", "Os dados não foram salvos", "error");
        }
    });
}

function showLimparTudoMessage() {
    swal({
        title: "Você deseja limpar todos os campos?",
        text: "Serão limpos os dados inseridos",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, limpe os campos!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Limpo!", "Os dados foram limpos.", "success");
            limparTudo();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showAtualizarMessage() {
    swal({
        title: "Você deseja atualizar os dados do transfer?",
        text: "Serão atualizados os dados do transfer com as informações inseridas no formulário",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, atualize!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Atualizado!", "Os dados foram atualizados.", "success");
            atualizarTransfer();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showExcluirMessage() {
    swal({
        title: "Você deseja excluir o transfer selecionado?",
        text: "Será excluído o transfer selecionado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, exclua o transfer!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Excluído!", "Os dados foram excluídos.", "success");
            excluirTransfer();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}