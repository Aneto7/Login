$(document).ready(function () {
    
    $('#inicio').datepicker({
        format: 'yyyy-mm-dd'
    });
    
    $('#fim').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#limpartudo').on('click', function () {
        limparr();
    });
    
    $('#fechamento').on('submit', function(){
        fecharRelatorio(); 
    });
    
    listarClientes();
    listarServico();
    listarFornecedor();
});
function imprimirFechamento() {
    $.ajax({
        type: 'GET',
        url: '../ServletImprimirFechamento',
        data: 'idinicio=' + $('#inicio').val()
                + '&idfim=' + $('#fim').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text()
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idfornecedor=' + $('#fornecedor1').find('option:selected').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
        }
    });
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
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            $("#cliente").empty();
            clientefiltrado = dados.split(";");
            $('#cliente').append($('<option>', {
                value: 0,
                text: ""
            }));
            for (var i = 0; i < clientefiltrado.length - 1; i++) {
                var id = clientefiltrado[i].split("#")[0];
                var cpf = clientefiltrado[i].split("#")[1];
                var nome = clientefiltrado[i].split("#")[2];
                $('#cliente').append($('<option>', {
                    value: cpf,
                    text: nome
                }));
            }
            $("#cliente").selectpicker('refresh');
        }
    });
}

function listarServico() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarServico',
        data: 'idid=' + $('#servico').attr('registro')
                + '&idservico=' + $('#servico').val()
                + '&iddatainicio=' + $('#datainicio').val()
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

            $("#servico").empty();
            servicofiltrado = dados.split(";");
            $('#servico').append($('<option>', {
                value: 0,
                text: ""
            }));
            for (var i = 0; i < servicofiltrado.length; i++) {
                var id = servicofiltrado[i].split("#")[0];
                var servico = servicofiltrado[i].split("#")[1];
                var datainicio = servicofiltrado[i].split("#")[2];
                var tipo = servicofiltrado[i].split("#")[3];
                $('#servico').append($('<option>', {
                    value: servico,
                    text: servico
                }));
            }
            $("#servico").selectpicker('refresh');
        }
    });
}

function listarFornecedor() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarFornecedor',
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
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            $("#fornecedor1").empty();
            fornecedorfiltrado = dados.split(";");
            $('#fornecedor1').append($('<option>', {
                value: 0,
                text: ""
            }));
            for (var i = 0; i < fornecedorfiltrado.length - 1; i++) {
                var id = fornecedorfiltrado[i].split("#")[0];
                var cnpj = fornecedorfiltrado[i].split("#")[1];
                var nome = fornecedorfiltrado[i].split("#")[2];
                $('#fornecedor1').append($('<option>', {
                    value: cnpj,
                    text: nome
                }));
            }
            $("#fornecedor1").selectpicker('refresh');
        }
    });
}

function limparr() {
    $("#fornecedor1").val(0);
    $('#fornecedor1').selectpicker('refresh');
    $('#inicio').val();
    $('#fim').val();
    $("#cliente").val("");
    $('#cliente').selectpicker('refresh');
    $("#servico").val("");
    $('#servico').selectpicker('refresh');
    $("#fornecedor1").val(0);
    $('#fornecedor1').selectpicker('refresh');
}

$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'limpartudo') {
            limparr();
        } else if (type === 'limrtudo') {
            showLimparTudoMessage();
        }
    });
});
function fecharRelatorio() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarFileAberto',
        data: 'idinicio=' + $('#inicio').val()
                + '&idfim=' + $('#fim').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text()
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idfornecedor=' + $('#fornecedor1').find('option:selected').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            if (dados !== "FECHADO") {
                swal("Ainda possui lançamento em aberto!", "Feche os lançamentos do período.", "warning");
            } else {
                swal("Fechado!", "Gerendo relatório de fechamento.", "success");
            }
        }
    });
}