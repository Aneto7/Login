$(document).ready(function () {
    listarClientes();
    listarCidades();

    $('#cliente').on('change', function () {
        listarDados();
    });
});

function imprimirRecibo() {
    $.ajax({
        type: 'GET',
        url: '../ServletImprimirRecibo',
        data: 'idvalor=' + $('#valor').val()
                + '&idrecibo=' + $('#numerorecibo').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text()
                + '&idlocal=' + $('#local').val()
                + '&idemissao=' + $('#emissao').val()
                + '&idvencimento=' + $('#vencimento').val()
                + '&idcpfcnpj=' + $('#cpfcnpj').val()
                + '&idcep=' + $('#campocep').val()
                + '&idestado=' + $('#estado').find('option:selected').text()
                + '&idcidade=' + $('#cidade').find('option:selected').text()
                + '&idbairro=' + $("bairro").val()
                + '&idendereco=' + $('#endereco').val()
                + '&idtextservico=' + $('#textservico').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            console.log("teste");
            console.log(dados);
        }
    });
}

function listarClientes() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarCliente',
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

function listarDados() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarDadosCliente',
        data: 'idcpf=' + $('#cliente').find('option:selected').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            $("#campocep").val("");
            $("#cidade").empty();
            $("#bairro").val("");
            $("#endereco").val("");

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

                $("#campocep").val(cep);
                $("#bairro").val(bairro);
                $("#endereco").val(endereco);
                $("#cpfcnpj").val(cpf);

                $("#estado").val(estado).change();

                $('#cidade').append($('<option>', {
                    value: cidade,
                    text: cidade
                }));

                $("#cidade").val(cidade).change();
            }
        }
    });
}

function listarCidades() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarCidadeRecibo',
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