$(document).ready(function () {
//    filtrarValores();
//    inserirValores();
    listarClientes();
    listarServico();
    listarFornecedor();
    pegarano();
//    getMorris('line', 'graficolinha');

    function pegarano() {
        var now = new Date;
        var anoatual = now.getFullYear();
        $('#ano').val(anoatual);
        return inserirValores(), getMorris('line', 'graficolinha');
    }

    $('#inicio').on('change', function () {
        inserirValores();
        upGraficos();
    });
    $('#fim').on('change', function () {
        inserirValores();
        upGraficos();
    });
    $('#cliente').on('change', function () {
        inserirValores();
        upGraficos();
    });
    $('#servico').on('change', function () {
        inserirValores();
        upGraficos();
    });
    $('#fornecedor1').on('change', function () {
        inserirValores();
        upGraficos();
    });
    $('#ano').on('change', function () {
        inserirValores();
        upGraficos();
    });


});


function getMorris(type, element) {
    $.ajax({
        type: 'GET',
        url: '../ServletFiltroNumeros',
        data: 'idfile='
                + '&idano=' + $('#ano').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text()
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idfornecedor=' + $('#fornecedor1').find('option:selected').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor')
            }
        },
        success: function (dados) {
            orcfiltrado = dados.split(";");
            var i = 0;
            var ano = $('#ano').val();
            var receitajan = orcfiltrado[i].split("#")[0];
            var receitafev = orcfiltrado[i].split("#")[1];
            var receitamar = orcfiltrado[i].split("#")[2];
            var receitaabr = orcfiltrado[i].split("#")[3];
            var receitamai = orcfiltrado[i].split("#")[4];
            var receitajun = orcfiltrado[i].split("#")[5];
            var receitajul = orcfiltrado[i].split("#")[6];
            var receitaago = orcfiltrado[i].split("#")[7];
            var receitaset = orcfiltrado[i].split("#")[8];
            var receitaout = orcfiltrado[i].split("#")[9];
            var receitanov = orcfiltrado[i].split("#")[10];
            var receitadez = orcfiltrado[i].split("#")[11];
            var despesajan = orcfiltrado[i].split("#")[12];
            var despesafev = orcfiltrado[i].split("#")[13];
            var despesamar = orcfiltrado[i].split("#")[14];
            var despesaabr = orcfiltrado[i].split("#")[15];
            var despesamai = orcfiltrado[i].split("#")[16];
            var despesajun = orcfiltrado[i].split("#")[17];
            var despesajul = orcfiltrado[i].split("#")[18];
            var despesaago = orcfiltrado[i].split("#")[19];
            var despesaset = orcfiltrado[i].split("#")[20];
            var despesaout = orcfiltrado[i].split("#")[21];
            var despesanov = orcfiltrado[i].split("#")[22];
            var despesadez = orcfiltrado[i].split("#")[23];
            var receita = orcfiltrado[i].split("#")[24];
            var despesa = orcfiltrado[i].split("#")[25];

            if (type === 'line') {
                Morris.Line({
                    element: element,
                    data: [{
                            'period': ano + '-12',
                            'licensed': receitadez,
                            'sorned': despesadez
                        }, {
                            'period': ano + '-11',
                            'licensed': receitanov,
                            'sorned': despesanov
                        }, {
                            'period': ano + '-10',
                            'licensed': receitaout,
                            'sorned': despesaout
                        }, {
                            'period': ano + '-09',
                            'licensed': receitaset,
                            'sorned': despesaset
                        }, {
                            'period': ano + '-08',
                            'licensed': receitaago,
                            'sorned': despesaago
                        }, {
                            'period': ano + '-07',
                            'licensed': receitajul,
                            'sorned': despesajul
                        }, {
                            'period': ano + '-06',
                            'licensed': receitajun,
                            'sorned': despesajun
                        }, {
                            'period': ano + '-05',
                            'licensed': receitamai,
                            'sorned': despesamai
                        }, {
                            'period': ano + '-04',
                            'licensed': receitaabr,
                            'sorned': despesaabr
                        }, {
                            'period': ano + '-03',
                            'licensed': receitamar,
                            'sorned': despesamar
                        }, {
                            'period': ano + '-02',
                            'licensed': receitafev,
                            'sorned': despesafev
                        }, {
                            'period': ano + '-01',
                            'licensed': receitajan,
                            'sorned': despesajan
                        }],
                    xkey: 'period',
                    ykeys: ['licensed', 'sorned'],
                    labels: ['Receita', 'Despesa'],
                    lineColors: ['rgb(0, 188, 212)', 'rgb(233, 30, 99)'],
                    lineWidth: 3
                });
            }
        }
    });
}

function inserirValores() {
    $.ajax({
        type: 'GET',
        url: '../ServletFiltroNumeros',
        data: 'idfile='
                + '&idano=' + $('#ano').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text()
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idfornecedor=' + $('#fornecedor1').find('option:selected').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor')
            }
        },
        success: function (dados) {
            orcfiltrado = dados.split(";");
            var i = 0;
            var ano = $('#ano').val();
            var receitajan = orcfiltrado[i].split("#")[0];
            var receitafev = orcfiltrado[i].split("#")[1];
            var receitamar = orcfiltrado[i].split("#")[2];
            var receitaabr = orcfiltrado[i].split("#")[3];
            var receitamai = orcfiltrado[i].split("#")[4];
            var receitajun = orcfiltrado[i].split("#")[5];
            var receitajul = orcfiltrado[i].split("#")[6];
            var receitaago = orcfiltrado[i].split("#")[7];
            var receitaset = orcfiltrado[i].split("#")[8];
            var receitaout = orcfiltrado[i].split("#")[9];
            var receitanov = orcfiltrado[i].split("#")[10];
            var receitadez = orcfiltrado[i].split("#")[11];
            var despesajan = orcfiltrado[i].split("#")[12];
            var despesafev = orcfiltrado[i].split("#")[13];
            var despesamar = orcfiltrado[i].split("#")[14];
            var despesaabr = orcfiltrado[i].split("#")[15];
            var despesamai = orcfiltrado[i].split("#")[16];
            var despesajun = orcfiltrado[i].split("#")[17];
            var despesajul = orcfiltrado[i].split("#")[18];
            var despesaago = orcfiltrado[i].split("#")[19];
            var despesaset = orcfiltrado[i].split("#")[20];
            var despesaout = orcfiltrado[i].split("#")[21];
            var despesanov = orcfiltrado[i].split("#")[22];
            var despesadez = orcfiltrado[i].split("#")[23];
            var receita = orcfiltrado[i].split("#")[24];
            var despesa = orcfiltrado[i].split("#")[25];

            console.log(receita);

            $('#receitaacumulada').countTo({
                from: 0,
                to: receita,
                speed: 1000,
                refreshInterval: 20,
                formatter: function (value, options) {
                    return value.toFixed(2).replace(/./g, function (c, i, a) {
                        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                    });
                },
                onUpdate: function (value) {
                    console.debug(this);
                },
                onComplete: function (value) {
                    console.debug(this);
                }
            });

            $('#despesaacumulada').countTo({
                from: 0,
                to: despesa,
                speed: 1000,
                refreshInterval: 20,
                formatter: function (value, options) {
                    return value.toFixed(2).replace(/./g, function (c, i, a) {
                        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                    });
                },
                onUpdate: function (value) {
                    console.debug(this);
                },
                onComplete: function (value) {
                    console.debug(this);
                }
            });

            $('#saldoacumulado').countTo({
                from: 0,
                to: receita - despesa,
                speed: 1000,
                refreshInterval: 20,
                formatter: function (value, options) {
                    return value.toFixed(2).replace(/./g, function (c, i, a) {
                        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                    });
                },
                onUpdate: function (value) {
                    console.debug(this);
                },
                onComplete: function (value) {
                    console.debug(this);
                }
            });
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

function upGraficos() {
    $('#graficolinha').empty();
    getMorris('line', 'graficolinha');
}