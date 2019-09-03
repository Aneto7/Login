$(document).ready(function () {
    listarClientes();
    
    $('#nascimento').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#cpf').on('change', function () {
        verificarCpf();
    });

    $('#estado').on('change', function () {
        listarCidades();
    });

    $('#tabelacliente tbody').on('click', 'button', function () {
        $('html,body').animate({scrollTop: 0}, 'slow');

        var tr = $(this).closest("tr");
        var dadosfile = $("#tabelacliente").DataTable().row(tr).data();
        var type = $(this).data('type');

        if (type === 'editarcliente') {

            $.ajax({
                type: 'GET',
                url: '../ServletConsultarCliente',
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
                    clientefiltrado = dados.split(";");
                    var id = clientefiltrado[0].split("#")[0];
                    var cpf = clientefiltrado[0].split("#")[1];
                    var nome = clientefiltrado[0].split("#")[2];
                    var nascimento = clientefiltrado[0].split("#")[3];
                    var email = clientefiltrado[0].split("#")[4];
                    var telres = clientefiltrado[0].split("#")[5];
                    var celular = clientefiltrado[0].split("#")[6];
                    var telcom = clientefiltrado[0].split("#")[7];
                    var cep = clientefiltrado[0].split("#")[8];
                    var estado = clientefiltrado[0].split("#")[9];
                    var cidade = clientefiltrado[0].split("#")[10];
                    var bairro = clientefiltrado[0].split("#")[11];
                    var endereco = clientefiltrado[0].split("#")[12];
                    var classificacao = clientefiltrado[0].split("#")[13];

                    $("#cpf").attr('registro', id);
                    $("#cpf").val(cpf);
                    $("#nome").val(nome);
                    $("#nascimento").val(nascimento);
                    $('#email').val(email);
                    $('#telres').val(telres);
                    $("#celular").val(celular);
                    $('#telcom').val(telcom);
                    $("#campocep").val(cep);
                    $('#estado').val(estado);
                    $("#estado").selectpicker('refresh');
                    $("#cidade").empty();
                    $('#cidade').append($('<option>', {
                        value: id,
                        text: cidade
                    }));
                    $("#cidade").val(cidade);
                    $('#cidade').selectpicker('refresh');
                    $('#bairro').val(bairro);
                    $("#endereco").val(endereco);
                    $("#classificacao").val(classificacao);
                }
            });
        }
        if (type === 'deletarcliente') {
            swal({
                title: "Você deseja excluir o cliente: " + dadosfile[1] + "?",
                text: "Será excluído o cliente selecionado",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#388E3C",
                confirmButtonText: "Sim, quero excluir o cliente!",
                cancelButtonText: "Não, cancele por favor!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Excluído!", "Os dados foram excluídos.", "success");
                    $.ajax({
                        type: 'GET',
                        url: '../ServletExcluirCliente',
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
                            var table = $('#tabelacliente').DataTable();
                            table.clear().draw();
                            listarClientes();
                        }
                    });
                } else {
                    swal("Cancelado", "Os dados serão mantidos", "error");
                }
            });
        }
    });
});

function inserirCliente() {
    if ($('#cpf').val() === "") {
        swal("ERRO", "Preencha o CPF/CNPJ/Documento do Cliente", "error");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletInserirCliente',
            data: 'idcpf=' + $('#cpf').val()
                    + '&idnome=' + $('#nome').val()
                    + '&idnascimento=' + $('#nascimento').val()
                    + '&idemail=' + $('#email').val()
                    + '&idtelres=' + $('#telres').val()
                    + '&idcelular=' + $('#celular').val()
                    + '&idtelcom=' + $('#telcom').val()
                    + '&idcep=' + $('#campocep').val()
                    + '&idestado=' + $('#estado').find('option:selected').text()
                    + '&idcidade=' + $('#cidade').find('option:selected').text()
                    + '&idbairro=' + $('#bairro').val()
                    + '&idendereco=' + $('#endereco').val()
                    + '&idclassificacao=' + $('#classificacao').val(),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelacliente').DataTable();
                table.clear().draw();
                listarClientes();
                limparTudo();
            }
        });
    }
}

function limparTudo() {
    $("#cpf").attr('registro', "");
    $("#cpf").val("");
    $("#nome").val("");
    $('#nascimento').val("");
    $('#email').val("");
    $('#telres').val("");
    $('#celular').selectpicker('refresh');
    $('#telcom').val("");
    $('#campocep').val("");
    $("#estado").val("");
    $('#estado').selectpicker('refresh');
    $('#cidade').val("");
    $('#cidade').selectpicker('refresh');
    $('#bairro').val("");
    $('#endereco').val("");
    $('#classificacao').val("");

    var oTable = $('#tabelacliente').dataTable();
    oTable.fnFilter("");
}

function atualizarCliente() {
    var cpf = $('#cpf').attr('registro');
    if (cpf === "") {
        alert("Clique em um cliente na tabela para atualizar");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletAtualizarCliente',
            data: 'idid=' + $('#cpf').attr('registro')
                    + '&idcpf=' + $('#cpf').val()
                    + '&idnome=' + $('#nome').val()
                    + '&idnascimento=' + $('#nascimento').val()
                    + '&idemail=' + $('#email').val()
                    + '&idtelres=' + $('#telres').val()
                    + '&idcelular=' + $('#celular').val()
                    + '&idtelcom=' + $('#telcom').val()
                    + '&idcep=' + $('#campocep').val()
                    + '&idestado=' + $('#estado').find('option:selected').text()
                    + '&idcidade=' + $('#cidade').find('option:selected').text()
                    + '&idbairro=' + $('#bairro').val()
                    + '&idendereco=' + $('#endereco').val()
                    + '&idclassificacao=' + $('#classificacao').val(),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelacliente').DataTable();
                table.clear().draw();
                listarClientes();
                limparTudo();
            }
        });
    }
}

function excluirCliente() {
    var cpf = $('#cpf').attr('registro');
    if (cpf === "") {
        alert("Clique em um número do file na tabela para excluir");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletExcluirCliente',
            data: 'idid=' + $('#cpf').attr('registro'),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelacliente').DataTable();
                table.clear().draw();
                listarClientes();
                limparTudo();
            }
        });
    }
}

function listarClientes() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarCliente',
        data: 'idcpf=' + $('#cpf').val()
                + '&idnome=' + $('#nome').val()
                + '&idnascimento=' + $('#nascimento').val()
                + '&idemail=' + $('#email').val()
                + '&idtelres=' + $('#telres').val()
                + '&idcelular=' + $('#celular').val()
                + '&idtelcom=' + $('#telcom').val()
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
            clientefiltrado = dados.split(";");
            for (var i = 0; i < clientefiltrado.length - 1; i++) {
                var id = clientefiltrado[i].split("#")[0];
                var cpf = clientefiltrado[i].split("#")[1];
                var nome = clientefiltrado[i].split("#")[2];
                var nascimento = clientefiltrado[i].split("#")[3];
                var email = clientefiltrado[i].split("#")[4];
                var telres = clientefiltrado[i].split("#")[5];
                var celular = clientefiltrado[i].split("#")[6];
                var telcom = clientefiltrado[i].split("#")[7];
                var cep = clientefiltrado[i].split("#")[8];
                var estado = clientefiltrado[i].split("#")[9];
                var cidade = clientefiltrado[i].split("#")[10];
                var bairro = clientefiltrado[i].split("#")[11];
                var endereco = clientefiltrado[i].split("#")[12];
                var excluido = clientefiltrado[i].split("#")[13];
                
                var atividades = "<button id='editarcliente' data-type='editarcliente' class='btn waves-effect bg-light-blue'><i class='material-icons'>edit</i></button>"
                            + "<button id='deletarcliente' data-type='deletarcliente' class='btn waves-effect bg-pink'><i class='material-icons'>delete_forever</i></button>";
                
                if (excluido === 'true'){
                    atividades = "<button id='filetopoexcluido' data-type='filetoexcluido' class='btn waves-effect bg-warning'><i class='material-icons'>delete_forever</i></button>";
                }

                var tamanhotexto = 25;
                var nomereduzido = nome.substring(0, tamanhotexto);
                var reticencias = "";
                if (nome.length > tamanhotexto) {
                    reticencias = "...";
                }

                var t = $('#tabelacliente').DataTable();
                t.row.add([
                    id,
                    nomereduzido + reticencias,
                    telres,
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
                    value: id,
                    text: cidade
                }));
            }
            $("#cidade").selectpicker('refresh');
        }
    });
}

function verificarCpf() {
    console.log($('#cpf').val());
    $.ajax({
        type: 'GET',
        url: '../ServletVerificarCpf',
        data: 'idid=' + $('#cpf').attr('registro')
                + '&idcpf=' + $('#cpf').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            console.log(dados);
            if (dados !== "") {
                $('#cpf').attr('registro', "");
                $('#cpf').val("");
                alert("CPF já cadastrado");
            }
        }
    });
}

$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'inserircliente') {
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
            inserirCliente();
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
        title: "Você deseja atualizar os dados do cliente?",
        text: "Serão atualizados os dados do cliente com as informações inseridas no formulário",
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
            atualizarCliente();
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
        confirmButtonText: "Sim, exclua o cliente!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Excluído!", "Os dados foram excluídos.", "success");
            excluirCliente();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}