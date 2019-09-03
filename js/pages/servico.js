$(document).ready(function () {
    listarServico();

    $('#servico').on('change', function () {
        verificarServico();
    });

    $('#tabelaservico tbody').on('click', 'button', function () {
        $('html,body').animate({scrollTop: 0}, 'slow');

        var tr = $(this).closest("tr");
        var dadosfile = $("#tabelaservico").DataTable().row(tr).data();
        var type = $(this).data('type');

        if (type === 'editarservico') {
            $.ajax({
                type: 'GET',
                url: '../ServletConsultarServico',
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
                    servicofiltrado = dados.split(";");
                    var id = servicofiltrado[0].split("#")[0];
                    var servico = servicofiltrado[0].split("#")[1];
                    var datainicio = servicofiltrado[0].split("#")[2];
                    var tipo = servicofiltrado[0].split("#")[3];
                    $("#servico").attr('registro', id);
                    $("#servico").val(servico);
                    $("#tipodeservico").val(tipo);
                }
            });
        }
        if (type === 'deletarservico') {
            swal({
                title: "Você deseja excluir o serviço: " + dadosfile[1] + "?",
                text: "Será excluído o serviço selecionado",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#388E3C",
                confirmButtonText: "Sim, quero excluir o serviço!",
                cancelButtonText: "Não, cancele por favor!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Excluído!", "Os dados foram excluídos.", "success");
                    $.ajax({
                        type: 'GET',
                        url: '../ServletExcluirServico',
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
                            var table = $('#tabelaservico').DataTable();
                            table.clear().draw();
                            listarServico();
                        }
                    });
                } else {
                    swal("Cancelado", "Os dados serão mantidos", "error");
                }
            });
        }
    });
});

function inserirServico() {
    $.ajax({
        type: 'GET',
        url: '../ServletInserirServico',
        data: 'idservico=' + $('#servico').val()
                + '&idtipodeservico=' + $('#tipodeservico').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelaservico').DataTable();
            table.clear().draw();
            listarServico();
        }
    });
}

function limparTudo() {
    $("#servico").attr('registro', "");
    $("#servico").val("");
    $('#tipodeservico').val("");

    var oTable = $('#tabelaservico').dataTable();
    oTable.fnFilter("");
}

function atualizarServico() {
    var cpf = $('#servico').attr('registro');
    if (cpf === "") {
        alert("Clique em um fornecedor na tabela para atualizar");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletAtualizarServico',
            data: 'idid=' + $('#servico').attr('registro')
                    + '&idservico=' + $('#servico').val()
                    + '&idtipodeservico=' + $('#tipodeservico').val(),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelaservico').DataTable();
                table.clear().draw();
                listarServico();
            }
        });
    }
}

function excluirServico() {
    var cpf = $('#servico').attr('registro');
    if (cpf === "") {
        alert("Clique em um número de servico na tabela para excluir");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletExcluirServico',
            data: 'idid=' + $('#servico').attr('registro'),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelaservico').DataTable();
                table.clear().draw();
                listarServico();
            }
        });
    }
}

function listarServico() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarServico',
        data: 'idid=' + $('#servico').attr('registro')
                + '&idservico=' + $('#servico').val()
                + '&idtipodeservico=' + $('#tipodeservico').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor')
            }
        },
        success: function (dados) {
            servicofiltrado = dados.split(";");
            for (var i = 0; i < servicofiltrado.length - 1; i++) {
                var id = servicofiltrado[i].split("#")[0];
                var servico = servicofiltrado[i].split("#")[1];
                var datainicio = servicofiltrado[i].split("#")[2];
                var tipo = servicofiltrado[i].split("#")[3];
                var excluido = servicofiltrado[i].split("#")[4];
                
                var atividades = "<button id='editarservico' data-type='editarservico' class='btn waves-effect bg-light-blue'><i class='material-icons'>edit</i></button>"
                            + "<button id='deletarservico' data-type='deletarservico' class='btn waves-effect bg-pink'><i class='material-icons'>delete_forever</i></button>";
                
                if (excluido === 'true'){
                    atividades = "<button id='filetopoexcluido' data-type='filetoexcluido' class='btn waves-effect bg-warning'><i class='material-icons'>delete_forever</i></button>";
                }
                
                var tamanhotexto = 35;
                var servicoreduzido = servico.substring(0,tamanhotexto);
                var reticencias = "";
                if(servico.length > tamanhotexto){
                    reticencias = "...";
                }
                
                var tiporeduzido = tipo.substring(0,tamanhotexto);
                var reticencias1 = "";
                if(tipo.length > tamanhotexto){
                    reticencias1 = "...";
                }

                var t = $('#tabelaservico').DataTable();
                t.row.add([
                    id,
                    servicoreduzido + reticencias,
                    tiporeduzido + reticencias1,
                    atividades
                ]).draw(false);
            }
        }
    });
}

function verificarServico() {
    $.ajax({
        type: 'GET',
        url: '../ServletVerificarServico',
        data: 'idid=' + $('#servico').attr('registro')
                + '&idservico=' + $('#servico').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            if (dados !== "") {
                $('#servico').attr('registro', "");
                $('#servico').val("");
                alert("Serviço já cadastrado")
            }
        }
    });
}

$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'inserirservico') {
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
            inserirServico();
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
        title: "Você deseja atualizar os dados do serviço?",
        text: "Serão atualizados os dados do serviço com as informações inseridas no formulário",
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
            atualizarServico();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showExcluirMessage() {
    swal({
        title: "Você deseja excluir o serviço selecionado?",
        text: "Será excluído o serviço selecionado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, exclua o serviço!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Excluído!", "Os dados foram excluídos.", "success");
            excluirServico();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}