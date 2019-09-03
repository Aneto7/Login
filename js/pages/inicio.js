$(document).ready(function () {
    cotacao();
    listarLink();
//    listarNoticia();
    listarFileInicio();
//    listarClientes();
//    listarFornecedor();
//    listarServico();
//    inserirValores();

});

function listarFileInicio() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarFileInicio',
        data: 'idid=inicio',
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor')
            }
        },
        success: function (dados) {
            filefiltrados = dados.split(";");
            for (var i = 0; i < filefiltrados.length - 1; i++) {
                var file = filefiltrados[i].split("#")[0];
                var datain = filefiltrados[i].split("#")[1];
                var dataout = filefiltrados[i].split("#")[2];
                var servico = filefiltrados[i].split("#")[3];
                var cliente = filefiltrados[i].split("#")[4];
                var item = filefiltrados[i].split("#")[5];
                var fornecedor = filefiltrados[i].split("#")[6];
                var status = filefiltrados[i].split("#")[7];
                var pendente = filefiltrados[i].split("#")[8];

                if (pendente === 'false') {
                    pendente = 'Sem pendência';
                } else {
                    pendente = 'Exite pendência';
                }

                var t = $('#tabelainicio').DataTable();
                t.row.add([
                    file,
                    datain,
                    servico,
                    cliente,
                    item,
                    fornecedor,
                    status,
                    pendente
                ]).order([1, 'asc']).draw(false);
            }
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
            clientefiltrado = dados.split(";");
            for (var i = 0; i < clientefiltrado.length - 1; i++) {
                var id = clientefiltrado[i].split("#")[0];
                var cpf = clientefiltrado[i].split("#")[1];
                var nome = clientefiltrado[i].split("#")[2];

                var t = $('#tabelacliente').DataTable();
                t.row.add([
                    nome
                ]).draw(false);
            }
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

            fornecedorfiltrado = dados.split(";");

            for (var i = 0; i < fornecedorfiltrado.length - 1; i++) {
                var id = fornecedorfiltrado[i].split("#")[0];
                var cnpj = fornecedorfiltrado[i].split("#")[1];
                var nome = fornecedorfiltrado[i].split("#")[2];

                var t = $('#tabelafornecedor').DataTable();
                t.row.add([
                    nome
                ]).draw(false);
            }
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

            servicofiltrado = dados.split(";");

            for (var i = 0; i < servicofiltrado.length - 1; i++) {
                var id = servicofiltrado[i].split("#")[0];
                var servico = servicofiltrado[i].split("#")[1];
                var datainicio = servicofiltrado[i].split("#")[2];
                var tipo = servicofiltrado[i].split("#")[3];

                var t = $('#tabelaservico').DataTable();
                t.row.add([
                    servico
                ]).draw(false);
            }
        }
    });
}

function listarNoticia() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarUltimasNoticias',
        data: 'idid=' + $('#noticia').attr('registro')
                + '&idnoticia=' + $('#noticia').val()
                + '&idlinkurl=' + $('#linkurl').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            noticiafiltrada = dados.split(";");
            for (var i = 0; i < noticiafiltrada.length - 1; i++) {
                var id = noticiafiltrada[i].split("#")[0];
                var noticia = noticiafiltrada[i].split("#")[1];
                var datainicio = noticiafiltrada[i].split("#")[2];
                var link = noticiafiltrada[i].split("#")[3];
                var excluido = noticiafiltrada[i].split("#")[4];

                console.log(link);

                var a = i + 1;
                $("#noticia" + a).empty();
                $("#noticia" + a).append('<a href="' + link + '" target="_blank"><h2>' + noticia + '</h2></a>');
            }
        }
    });
}

function cotacao() {
    var request = new XMLHttpRequest();
    var endPoint = 'https://economia.awesomeapi.com.br/all';
    request.open('GET', endPoint, true);
    request.onload = function () {
        var data = JSON.parse(request.responseText);
        $('#dolar').text(data.USD.name);
        $('#cotdolar').text(data.USD.bid);
        $('#dolart').text(data.USDT.name);
        $('#cotdolart').text(data.USDT.bid);
        $('#euro').text(data.EUR.name);
        $('#coteuro').text(data.EUR.bid);
        $('#cad').text(data.CAD.name);
        $('#cotcad').text(data.CAD.bid);
    };
    request.send();
}

function inserirNoticia() {
    $.ajax({
        type: 'GET',
        url: '../ServletInserirNoticia',
        data: 'idnoticia=' + $('#noticia').val()
                + '&idlinkurl=' + $('#linkurl').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            limparTudo();
            window.location.reload();
        }
    });
}

function limparTudo() {
    $("#notica").attr('registro', "");
    $("#noticia").val("");
    $('#linkurl').val("");
}

function listarLink() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarLink',
        data: 'idid=',
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor')
            }
        },
        success: function (dados) {
            linksfiltrados = dados.split(";");
            for (var i = 0; i < linksfiltrados.length - 1; i++) {
                var id = linksfiltrados[i].split("#")[0];
                var titulo = linksfiltrados[i].split("#")[1];
                var subtitulo = linksfiltrados[i].split("#")[2];
                var link = linksfiltrados[i].split("#")[3];
                var u = i + 1;

                var texto = "<div class='info-box-4 hover-zoom-effect'><div class='icon'><i class='material-icons col-light-blue'>public</i></div><div class='content'><div class='text'>" + titulo + "</div><div class='number'>" + subtitulo + "</div></div></div>";

                $('#link' + u).append(texto);
                $('#link' + u).attr("href", link);
            }
        }
    });
}