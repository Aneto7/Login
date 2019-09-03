$(document).ready(function () {
    listarFornecedor();
    listarBancos();

    $('#cnpj').on('change', function () {
        verificarCnpj();
    });

    $('#estado').on('change', function () {
        listarCidades();
    });

    $('#tabelafornecedor tbody').on('click', 'button', function () {
        $('html,body').animate({scrollTop: 0}, 'slow');

        var tr = $(this).closest("tr");
        var dadosfile = $("#tabelafornecedor").DataTable().row(tr).data();
        var type = $(this).data('type');

        if (type === 'editarfor') {
            $.ajax({
                type: 'GET',
                url: '../ServletConsultarFornecedor',
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
                    console.log(dados);
                    fornecedorfiltrado = dados.split(";");
                    var id = fornecedorfiltrado[0].split("#")[0];
                    var cnpj = fornecedorfiltrado[0].split("#")[1];
                    var nomefantasia = fornecedorfiltrado[0].split("#")[2];
                    var inscricaoestadual = fornecedorfiltrado[0].split("#")[3];
                    var razaosocial = fornecedorfiltrado[0].split("#")[4];
                    var cargo = fornecedorfiltrado[0].split("#")[5];
                    var responsavel = fornecedorfiltrado[0].split("#")[6];
                    var telcom = fornecedorfiltrado[0].split("#")[7];
                    var celular = fornecedorfiltrado[0].split("#")[8];
                    var email = fornecedorfiltrado[0].split("#")[9];
                    var cep = fornecedorfiltrado[0].split("#")[10];
                    var estado = fornecedorfiltrado[0].split("#")[11];
                    var cidade = fornecedorfiltrado[0].split("#")[12];
                    var bairro = fornecedorfiltrado[0].split("#")[13];
                    var endereco = fornecedorfiltrado[0].split("#")[14];
                    var banco = fornecedorfiltrado[0].split("#")[15];
                    var agencia = fornecedorfiltrado[0].split("#")[16];
                    var conta = fornecedorfiltrado[0].split("#")[17];
                    var tipoconta = fornecedorfiltrado[0].split("#")[18];
                    var senha = fornecedorfiltrado[0].split("#")[19];

                    $("#cnpj").attr('registro', id);
                    $("#cnpj").val(cnpj);
                    $("#nomefantasia").val(nomefantasia);
                    $("#inscricaoestadual").val(inscricaoestadual);
                    $('#razaosocial').val(razaosocial);
                    $('#cargo').val(cargo);
                    $('#responsavel').val(responsavel);
                    $('#senhafornecedor').val(senha);
                    $('#telcom').val(telcom);
                    $("#celular").val(celular);
                    $('#email').val(email);
                    $("#campocep").val(cep);
                    $('#estado').val(estado);
                    $("#estado").selectpicker('refresh');
//                $("#cidade").empty();
//                $('#cidade').append($('<option>', {
//                    value: id,
//                    text: cidade
//                }));
                    $("#cidade").val(cidade);
                    $('#cidade').selectpicker('refresh');
                    $('#bairro').val(bairro);
                    $("#endereco").val(endereco);
//                $("#banco").empty();
//                $('#banco').append($('<option>', {
//                    value: id,
//                    text: banco
//                }));
                    $("#banco").val(banco);
                    $('#banco').selectpicker('refresh');
                    $("#agencia").val(agencia);
                    $("#conta").val(conta);
                    $("#tipoconta").val(tipoconta);
                    $("#tipoconta").selectpicker('refresh');
                }
            });
        }
        if (type === 'deletarfor') {
            swal({
                title: "Você deseja excluir o fornecedor: " + dadosfile[1] + "?",
                text: "Será excluído o fornecedor selecionado",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#388E3C",
                confirmButtonText: "Sim, quero excluir o fornecedor!",
                cancelButtonText: "Não, cancele por favor!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Excluído!", "Os dados foram excluídos.", "success");
                    $.ajax({
                        type: 'GET',
                        url: '../ServletExcluirFornecedor',
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
                            var table = $('#tabelafornecedor').DataTable();
                            table.clear().draw();
                            listarFornecedor();
                        }
                    });
                } else {
                    swal("Cancelado", "Os dados serão mantidos", "error");
                }
            });
        }
    });
});

function inserirFornecedor() {
    if ($('#cnpj').val() === "") {
        swal("ERRO", "Preencha o CNPJ/CPF/Documento do Fornecedor", "error");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletInserirFornecedor',
            data: 'idcnpj=' + $('#cnpj').val()
                    + '&idnomefantasia=' + $('#nomefantasia').val()
                    + '&idinscricaoestadual=' + $('#inscricaoestadual').val()
                    + '&idrazaosocial=' + $('#razaosocial').val()
                    + '&idcargo=' + $('#cargo').val()
                    + '&idresponsavel=' + $('#responsavel').val()
                    + '&idsenha=' + $('#senhafornecedor').val()
                    + '&idtelcom=' + $('#telcom').val()
                    + '&idcelular=' + $('#celular').val()
                    + '&idemail=' + $('#email').val()
                    + '&idcep=' + $('#campocep').val()
                    + '&idestado=' + $('#estado').find('option:selected').text()
                    + '&idcidade=' + $('#cidade').find('option:selected').text()
                    + '&idbairro=' + $('#bairro').val()
                    + '&idendereco=' + $('#endereco').val()
                    + '&idbanco=' + $('#banco').find('option:selected').text()
                    + '&idagencia=' + $('#agencia').val()
                    + '&idconta=' + $('#conta').val()
                    + '&idtipoconta=' + $('#tipoconta').find('option:selected').text(),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelafornecedor').DataTable();
                table.clear().draw();
                listarFornecedor();
                limparTudo();
            }
        });
    }
}

function limparTudo() {
    $("#cnpj").attr('registro', "");
    $("#cnpj").val("");
    $("#nomefantasia").val("");
    $('#inscricaoestadual').val("");
    $('#razaosocial').val("");
    $('#cargo').val("");
    $('#responsavel').val("");
    $('#senhafornecedor').val("");
    $('#telcom').val("");
    $('#celular').val();
    $('#email').val("");
    $('#campocep').val("");
    $("#estado").val("");
    $('#estado').selectpicker('refresh');
    $('#cidade').val("");
    $('#cidade').selectpicker('refresh');
    $('#bairro').val("");
    $('#endereco').val("");
    $('#banco').val("");
    $('#banco').selectpicker('refresh');
    $('#agencia').val("");
    $('#conta').val("");
    $('#tipoconta').val("");
    $('#tipoconta').selectpicker('refresh');

    var oTable = $('#tabelacliente').dataTable();
    oTable.fnFilter("");

    listarBancos();
}

function atualizarFornecedor() {
    var cnpj = $('#cnpj').attr('registro');
    if (cnpj === "") {
        alert("Clique em um fornecedor na tabela para atualizar");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletAtualizarFornecedor',
            data: 'idid=' + $('#cnpj').attr('registro')
                    + '&idcnpj=' + $('#cnpj').val()
                    + '&idnomefantasia=' + $('#nomefantasia').val()
                    + '&idinscricaoestadual=' + $('#inscricaoestadual').val()
                    + '&idrazaosocial=' + $('#razaosocial').val()
                    + '&idcargo=' + $('#cargo').val()
                    + '&idresponsavel=' + $('#reponsavel').val()
                    + '&idsenha=' + $('#senhafornecedor').val()
                    + '&idtelcom=' + $('#telcom').val()
                    + '&idcelular=' + $('#celular').val()
                    + '&idemail=' + $('#email').val()
                    + '&idcep=' + $('#campocep').val()
                    + '&idestado=' + $('#estado').find('option:selected').text()
                    + '&idcidade=' + $('#cidade').find('option:selected').text()
                    + '&idbairro=' + $('#bairro').val()
                    + '&idendereco=' + $('#endereco').val()
                    + '&idbanco=' + $('#banco').find('option:selected').text()
                    + '&idagencia=' + $('#agencia').val()
                    + '&idconta=' + $('#conta').val()
                    + '&idtipoconta=' + $('#tipoconta').find('option:selected').text(),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelafornecedor').DataTable();
                table.clear().draw();
                listarFornecedor();
                limparTudo();
            }
        });
    }
}

function excluirFornecedor() {
    var cpf = $('#cnpj').attr('registro');
    if (cpf === "") {
        alert("Clique em um número de fornecedor na tabela para excluir");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletExcluirFornecedor',
            data: 'idid=' + $('#cnpj').attr('registro'),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelafornecedor').DataTable();
                table.clear().draw();
                listarFornecedor();
                limparTudo();
            }
        });
    }
}

function listarFornecedor() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarFornecedor',
        data: 'idid=' + $('#cnpj').attr('registro')
                + '&idcnpj=' + $('#cnpj').val()
                + '&idnomefantasia=' + $('#nomefantasia').val()
                + '&idinscricaoestadual=' + $('#inscricaoestadual').val()
                + '&idrazaosocial=' + $('#razaosocial').val()
                + '&idcargo=' + $('#cargo').val()
                + '&idresponsavel=' + $('#reponsavel').val()
                + '&idtelcom=' + $('#telcom').val()
                + '&idcelular=' + $('#celular').val()
                + '&idemail=' + $('#email').val()
                + '&idcep=' + $('#campocep').val()
                + '&idestado=' + $('#estado').find('option:selected').text()
                + '&idcidade=' + $('#cidade').find('option:selected').text()
                + '&idbairro=' + $('#bairro').val()
                + '&idendereco=' + $('#endereco').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor')
            }
        },
        success: function (dados) {
            fornecedorfiltrado = dados.split(";");
            for (var i = 0; i < fornecedorfiltrado.length - 1; i++) {
                var id = fornecedorfiltrado[i].split("#")[0];
                var cnpj = fornecedorfiltrado[i].split("#")[1];
                var nomefantasia = fornecedorfiltrado[i].split("#")[2];
                var inscricaoestadual = fornecedorfiltrado[i].split("#")[3];
                var razaosocial = fornecedorfiltrado[i].split("#")[4];
                var cargo = fornecedorfiltrado[i].split("#")[5];
                var responsavel = fornecedorfiltrado[i].split("#")[6];
                var telcom = fornecedorfiltrado[i].split("#")[7];
                var celular = fornecedorfiltrado[i].split("#")[8];
                var email = fornecedorfiltrado[i].split("#")[9];
                var cep = fornecedorfiltrado[i].split("#")[10];
                var estado = fornecedorfiltrado[i].split("#")[11];
                var cidade = fornecedorfiltrado[i].split("#")[12];
                var bairro = fornecedorfiltrado[i].split("#")[13];
                var endereco = fornecedorfiltrado[i].split("#")[14];
                var excluido = fornecedorfiltrado[i].split("#")[15];
                console.log(excluido)
                
                var atividades = "<button id='editarfor" + id + "' data-type='editarfor' class='btn waves-effect bg-light-blue'><i class='material-icons'>edit</i></button>"
                            + "<button id='deletarfor" + id + "' data-type='deletarfor' class='btn waves-effect bg-pink'><i class='material-icons'>delete_forever</i></button>";
                
                if (excluido === 'true'){
                    atividades = "<button id='filetopoexcluido' data-type='filetoexcluido' class='btn waves-effect bg-warning'><i class='material-icons'>delete_forever</i></button>";
                }

                var tamanhotexto = 25;
                var nomefantasiareduzido = nomefantasia.substring(0, tamanhotexto);
                var reticencias = "";
                if (nomefantasia.length > tamanhotexto) {
                    reticencias = "...";
                }

                var t = $('#tabelafornecedor').DataTable();
                t.row.add([
                    id,
                    cnpj,
                    nomefantasiareduzido + reticencias,
                    telcom,
                    email,
                    estado,
                    cidade,
                    atividades
                ]).draw(false);
            }
        }
    });
}

function listarCidades() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarCidades',
        data: 'idestado=' + $('#estado').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            $("#cidade").empty();
            cidadefiltrada = dados.split(";");
            $('#cidade').append($('<option>', {
                value: 0,
                text: ""
            }));
            for (var i = 0; i < cidadefiltrada.length; i++) {
                var id = cidadefiltrada[i].split("#")[0];
                var estado = cidadefiltrada[i].split("#")[1];
                var cidade = cidadefiltrada[i].split("#")[2];
                $('#cidade').append($('<option>', {
                    value: cidade,
                    text: cidade
                }));
            }
            $("#cidade").selectpicker('refresh');
        }
    });
}

function listarBancos() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarBancos',
        data: 'idbanco=' + $('#banco').find('option:selected').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            $("#banco").empty();
            bancofiltrada = dados.split(";");
            $('#banco').append($('<option>', {
                value: 0,
                text: ""
            }));
            for (var i = 0; i < bancofiltrada.length; i++) {
                var id = bancofiltrada[i].split("#")[0];
                var banco = bancofiltrada[i].split("#")[1];
                $('#banco').append($('<option>', {
                    value: banco,
                    text: banco
                }));
            }
            $("#banco").selectpicker('refresh');
        }
    });
}

function verificarCnpj() {
    $.ajax({
        type: 'GET',
        url: '../ServletVerificarCnpj',
        data: 'idid=' + $('#cnpj').attr('registro')
                + '&idcnpj=' + $('#cnpj').val(),
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
                $('#cnpj').attr('registro', "");
                $('#cnpj').val("");
                alert("CNPJ já cadastrado")
            }
        }
    });
}

$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'inserirfornecedor') {
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
            inserirFornecedor();
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
        title: "Você deseja atualizar os dados do fornecedor?",
        text: "Serão atualizados os dados do fornecedor com as informações inseridas no formulário",
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
            atualizarFornecedor();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showExcluirMessage() {
    swal({
        title: "Você deseja excluir o cliente selecionado?",
        text: "Será excluído o cliente selecionado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, exclua o fornecedor!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Excluído!", "Os dados foram excluídos.", "success");
            excluirFornecedor();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}