$(document).ready(function () {
    listarUsuarios();

    $('#usuario').on('change', function () {
        verificarUsuario();
    });

    $('#tabelausuario tbody').on('click', 'button', function () {
        $('html,body').animate({scrollTop: 0}, 'slow');

        var tr = $(this).closest("tr");
        var dadosfile = $("#tabelausuario").DataTable().row(tr).data();
        var type = $(this).data('type');

if (type === 'editarusuario') {
        $.ajax({
            type: 'GET',
            url: '../ServletConsultarUsuario',
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
                usuariofiltrado = dados.split(";");
                var id = usuariofiltrado[0].split("#")[0];
                var usuario = usuariofiltrado[0].split("#")[1];
                var nome = usuariofiltrado[0].split("#")[2];
                var perfil = usuariofiltrado[0].split("#")[3];
                var empresa = usuariofiltrado[0].split("#")[4];
                var setor = usuariofiltrado[0].split("#")[5];
                var inicio = usuariofiltrado[0].split("#")[6];
                var file = usuariofiltrado[0].split("#")[7];
                var dashboard = usuariofiltrado[0].split("#")[8];
                var cliente = usuariofiltrado[0].split("#")[9];
                var servico = usuariofiltrado[0].split("#")[10];
                var fornecedor = usuariofiltrado[0].split("#")[11];
                var recibo = usuariofiltrado[0].split("#")[12];
                var fatura = usuariofiltrado[0].split("#")[13];
                var fechamento = usuariofiltrado[0].split("#")[14];
                var usuarios = usuariofiltrado[0].split("#")[15];
                var senha = usuariofiltrado[0].split("#")[16];

                $("#usuario").attr('registro', id);
                $("#usuario").val(usuario);
                $("#nome").val(nome);
                $("#perfil").val(perfil);
                $("#perfil").selectpicker('refresh');
                $("#empresa").val(empresa);
                $('#setor').val(setor);
                $("#senha").val(senha);
                if (inicio == 'false') {
                    $('#md_checkbox_1').prop('checked', false);
                } else {
                    $('#md_checkbox_1').prop('checked', true);
                }
                if (file == 'false') {
                    $('#md_checkbox_2').prop('checked', false);
                } else {
                    $('#md_checkbox_2').prop('checked', true);
                }
                if (dashboard == 'false') {
                    $('#md_checkbox_3').prop('checked', false);
                } else {
                    $('#md_checkbox_3').prop('checked', true);
                }
                if (cliente == 'false') {
                    $('#md_checkbox_4').prop('checked', false);
                } else {
                    $('#md_checkbox_4').prop('checked', true);
                }
                if (servico == 'false') {
                    $('#md_checkbox_5').prop('checked', false);
                } else {
                    $('#md_checkbox_5').prop('checked', true);
                }
                if (fornecedor == 'false') {
                    $('#md_checkbox_6').prop('checked', false);
                } else {
                    $('#md_checkbox_6').prop('checked', true);
                }
                if (recibo == 'false') {
                    $('#md_checkbox_7').prop('checked', false);
                } else {
                    $('#md_checkbox_7').prop('checked', true);
                }
                if (fatura == 'false') {
                    $('#md_checkbox_8').prop('checked', false);
                } else {
                    $('#md_checkbox_8').prop('checked', true);
                }
                if (fechamento == 'false') {
                    $('#md_checkbox_9').prop('checked', false);
                } else {
                    $('#md_checkbox_9').prop('checked', true);
                }
                if (usuarios == 'false') {
                    $('#md_checkbox_10').prop('checked', false);
                } else {
                    $('#md_checkbox_10').prop('checked', true);
                }
            }
        });
        }
        if (type === 'deletarusuario') {
            swal({
                title: "Você deseja excluir o usuario: " + dadosfile[1] + "?",
                text: "Será excluído o usuário selecionado",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#388E3C",
                confirmButtonText: "Sim, quero excluir o usuário!",
                cancelButtonText: "Não, cancele por favor!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Excluído!", "Os dados foram excluídos.", "success");
                    $.ajax({
                        type: 'GET',
                        url: '../ServletExcluirUsuario',
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
                            var table = $('#tabelausuario').DataTable();
                            table.clear().draw();
                            limparTudo();
                            listarUsuarios();
                        }
                    });
                } else {
                    swal("Cancelado", "Os dados serão mantidos", "error");
                }
            });
        }
    });
});

function inserirUsuario() {
    $.ajax({
        type: 'GET',
        url: '../ServletInserirUsuario',
        data: 'idusuario=' + $('#usuario').val()
                + '&idnome=' + $('#nome').val()
                + '&idperfil=' + $('#perfil').val()
                + '&idempresa=' + $('#empresa').val()
                + '&idsetor=' + $('#setor').val()
                + '&idsenha=' + $('#senha').val()
                + '&idinicio=' + $('#md_checkbox_1').is(':checked')
                + '&idfile=' + $('#md_checkbox_2').is(':checked')
                + '&iddashboard=' + $('#md_checkbox_3').is(':checked')
                + '&idcliente=' + $('#md_checkbox_4').is(':checked')
                + '&idservico=' + $('#md_checkbox_5').is(':checked')
                + '&idfornecedor=' + $('#md_checkbox_6').is(':checked')
                + '&idrecibo=' + $('#md_checkbox_7').is(':checked')
                + '&idfatura=' + $('#md_checkbox_8').is(':checked')
                + '&idfechamento=' + $('#md_checkbox_9').is(':checked')
                + '&idusuarios=' + $('#md_checkbox_10').is(':checked'),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelausuario').DataTable();
            table.clear().draw();
            listarUsuarios();
        }
    });
}

function limparTudo() {
    $('#usuario').attr('registro', "");
    $('#usuario').val("");
    $('#nome').val("");
    $('#perfil').val("");
    $('#perfil').selectpicker('refresh');
    $('#empresa').val("");
    $('#setor').val("");
    $('#senha').val("");
    $('#md_checkbox_1').prop('checked', false);
    $('#md_checkbox_2').prop('checked', false);
    $('#md_checkbox_3').prop('checked', false);
    $('#md_checkbox_4').prop('checked', false);
    $('#md_checkbox_5').prop('checked', false);
    $('#md_checkbox_6').prop('checked', false);
    $('#md_checkbox_7').prop('checked', false);
    $('#md_checkbox_8').prop('checked', false);
    $('#md_checkbox_9').prop('checked', false);
    $('#md_checkbox_10').prop('checked', false);

    var oTable = $('#tabelausuario').dataTable();
    oTable.fnFilter("");
}

function atualizarUsuario() {
    var cpf = $('#usuario').attr('registro');
    if (cpf === "") {
        alert("Clique em um usuário na tabela para atualizar");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletAtualizarUsuario',
            data: 'idid=' + $('#usuario').attr('registro')
                    + '&idusuario=' + $('#usuario').val()
                    + '&idnome=' + $('#nome').val()
                    + '&idperfil=' + $('#perfil').val()
                    + '&idempresa=' + $('#empresa').val()
                    + '&idsetor=' + $('#setor').val()
                    + '&idsenha=' + $('#senha').val()
                    + '&idinicio=' + $('#md_checkbox_1').is(':checked')
                    + '&idfile=' + $('#md_checkbox_2').is(':checked')
                    + '&iddashboard=' + $('#md_checkbox_3').is(':checked')
                    + '&idcliente=' + $('#md_checkbox_4').is(':checked')
                    + '&idservico=' + $('#md_checkbox_5').is(':checked')
                    + '&idfornecedor=' + $('#md_checkbox_6').is(':checked')
                    + '&idrecibo=' + $('#md_checkbox_7').is(':checked')
                    + '&idfatura=' + $('#md_checkbox_8').is(':checked')
                    + '&idfechamento=' + $('#md_checkbox_9').is(':checked')
                    + '&idusuarios=' + $('#md_checkbox_10').is(':checked'),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelausuario').DataTable();
                table.clear().draw();
                listarUsuarios();
            }
        });
    }
}

function excluirUsuario() {
    var cpf = $('#usuario').attr('registro');
    if (cpf === "") {
        alert("Clique em um número do usuário na tabela para excluir");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletExcluirUsuario',
            data: 'idid=' + $('#usuario').attr('registro'),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelausuario').DataTable();
                table.clear().draw();
                listarUsuarios();
            }
        });
    }
}

function listarUsuarios() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarUsuario',
        data: 'idid=' + $('#usuario').attr('registro')
                + '&idusuario=' + $('#usuario').val()
                + '&idnome=' + $('#nome').val()
                + '&idperfil=' + $('#perfil').val()
                + '&idempresa=' + $('#empresa').val()
                + '&idsetor=' + $('#setor').val()
                + '&idsenha=' + $('#senha').val()
                + '&idinicio=' + $('#md_checkbox_1').is(':checked')
                + '&idfile=' + $('#md_checkbox_2').is(':checked')
                + '&iddashboard=' + $('#md_checkbox_3').is(':checked')
                + '&idcliente=' + $('#md_checkbox_4').is(':checked')
                + '&idservico=' + $('#md_checkbox_5').is(':checked')
                + '&idfornecedor=' + $('#md_checkbox_6').is(':checked')
                + '&idrecibo=' + $('#md_checkbox_7').is(':checked')
                + '&idfatura=' + $('#md_checkbox_8').is(':checked')
                + '&idfechamento=' + $('#md_checkbox_9').is(':checked')
                + '&idusuarios=' + $('#md_checkbox_10').is(':checked'),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor')
            }
        },
        success: function (dados) {
            usuariofiltrado = dados.split(";");
            for (var i = 0; i < usuariofiltrado.length - 1; i++) {
                var id = usuariofiltrado[i].split("#")[0];
                var usuario = usuariofiltrado[i].split("#")[1];
                var nome = usuariofiltrado[i].split("#")[2];
                var perfil = usuariofiltrado[i].split("#")[3];
                var empresa = usuariofiltrado[i].split("#")[4];
                var setor = usuariofiltrado[i].split("#")[5];
                var inicio = usuariofiltrado[i].split("#")[6];
                var file = usuariofiltrado[i].split("#")[7];
                var dashboard = usuariofiltrado[i].split("#")[8];
                var cliente = usuariofiltrado[i].split("#")[9];
                var servico = usuariofiltrado[i].split("#")[10];
                var fornecedor = usuariofiltrado[i].split("#")[11];
                var recibo = usuariofiltrado[i].split("#")[12];
                var fatura = usuariofiltrado[i].split("#")[13];
                var fechamento = usuariofiltrado[i].split("#")[14];
                var usuarios = usuariofiltrado[i].split("#")[15];
                var senha = usuariofiltrado[i].split("#")[16];
                var excluido = usuariofiltrado[i].split("#")[17];
                
                var atividades = "<button id='editarusuario"+id+"' data-type='editarusuario' class='btn waves-effect bg-light-blue'><i class='material-icons'>edit</i></button>"
                            + "<button id='deletarusuario"+id+"' data-type='deletarusuario' class='btn waves-effect bg-pink'><i class='material-icons'>delete_forever</i></button>";
                
                if (excluido === 'true'){
                    atividades = "<button id='filetopoexcluido' data-type='filetoexcluido' class='btn waves-effect bg-warning'><i class='material-icons'>delete_forever</i></button>";
                }
                
                var tamanhotexto = 20;
                var nomereduzido = nome.substring(0,tamanhotexto);
                var reticencias = "";
                if(nome.length > tamanhotexto){
                    reticencias = "...";
                }

                var t = $('#tabelausuario').DataTable();
                t.row.add([
                    id,
                    usuario,
                    nomereduzido + reticencias,
                    perfil,
                    empresa,
                    setor,
                    atividades
                ]).draw(false);
            }
        }
    });
}

function verificarUsuario() {
    $.ajax({
        type: 'GET',
        url: '../ServletVerificarUsuario',
        data: 'idid=' + $('#usuario').attr('registro')
                + '&idusuario=' + $('#usuario').val(),
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
                $('#usuario').attr('registro', "");
                $('#usuario').val("");
                alert("Usuário já cadastrado")
            }
        }
    });
}

$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'inserirusuario') {
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
            inserirUsuario();
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
        title: "Você deseja atualizar os dados do usuário?",
        text: "Serão atualizados os dados do usuário com as informações inseridas no formulário",
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
            atualizarUsuario();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showExcluirMessage() {
    swal({
        title: "Você deseja excluir o usuário selecionado?",
        text: "Será excluído o usuário selecionado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, exclua o usuário!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Excluído!", "Os dados foram excluídos.", "success");
            excluirUsuario();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}