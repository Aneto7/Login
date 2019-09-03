$(document).ready(function () {

    $('#emissao').datepicker({
        format: 'yyyy-mm-dd'
    });
    $('#datain').datepicker({
        format: 'yyyy-mm-dd'
    });
    $('#dataout').datepicker({
        format: 'yyyy-mm-dd'
    });

    listarFile();
    listarClientes();
    listarFornecedor();
    listarServico();
    inserirValores();
    $('#alterarfiletopo').hide();
    $('#excluirfiletopo').hide();
    consultarOS();

    var dataAtual = new Date();
    var diaatual = dataAtual.getDate() + 1;
    var mesatual = dataAtual.getMonth() + 1;
    var anoatual = dataAtual.getYear() - 100;
    var anoatualcomp = dataAtual.getYear() + 1900;
    if (mesatual < 10) {
        mesatual = '0' + mesatual;
    }
    if (diaatual < 10) {
        diaatual = '0' + diaatual;
    }

    if ($('#nomedapagina').text() === "ALIANZ - Sistema Receptivo - File - Buscar") {
        $('#emissao').val("");
        $('#datain').val("");
    } else {
        $('#emissao').val(anoatualcomp + "-" + mesatual + "-" + diaatual);
        $('#datain').val(anoatualcomp + "-" + mesatual + "-" + diaatual);
    }


    $('#cliente').on('change', function () {
        verificarClassificacao();
    });

    consultarUsuario();
});

function inserirFile() {
    var tipo = 'Receita';
    var item = '';
    var cnpj = '';
    var fornecedor = '';
    var recebimento = '';
    var documento = '';
    var valor = 0;
    var pendente = '';
    var obs = '';
    item = $('#item').val();
    recebimento = $('#recebimento').find('option:selected').text();
    documento = $('#documento').val();
    if ($('#valor').val() !== '') {
        valor = $('#valor').val();
    }
    pendente = $('#md_checkbox_1').is(':checked');
    obs = $('#obs').val();
    $.ajax({
        type: 'GET',
        url: '../ServletInserirFile',
        data: 'idfile=' + $('#numerofile').text()
                + '&idcpf=' + $('#cpf').text()
                + '&idcliente=' + $('#client').text()
                + '&idstur=0'
                + '&idservico=' + $('#servic').text()
                + '&idemissao=' + $('#emissao').text()
                + '&iddatain=' + $('#datain').text()
                + '&iddataout=' + $('#dataout').text()
                + '&idtipo=' + tipo
                + '&iditem=' + item
                + '&idcnpj=' + cnpj
                + '&idfornecedor=' + fornecedor
                + '&idrecebimento=' + recebimento
                + '&iddocumento=' + documento
                + '&idvalor=' + valor
                + '&idpendente=' + pendente
                + '&idobs=' + obs,
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelafile').DataTable();
            table.clear().draw();
            listarFile();
            inserirValores();
            limparParte();
        }
    });
}

function inserirFile1() {
    var tipo = 'Despesa';
    var item = '';
    var cnpj = '';
    var fornecedor = '';
    var recebimento = '';
    var documento = '';
    var valor = 0;
    var pendente = '';
    var obs = '';
    item = $('#item1').val();
    cnpj = $('#fornecedor1').find('option:selected').val();
    fornecedor = $('#fornecedor1').find('option:selected').text();
    documento = $('#documento1').val();
    if ($('#valor1').val() !== '') {
        valor = $('#valor1').val();
    }
    pendente = $('#md_checkbox_2').is(':checked');
    obs = $('#obs1').val();
    $.ajax({
        type: 'GET',
        url: '../ServletInserirFile',
        data: 'idfile=' + $('#numerofile').text()
                + '&idcpf=' + $('#cpf').text()
                + '&idcliente=' + $('#client').text()
                + '&idstur=0'
                + '&idservico=' + $('#servic').text()
                + '&idemissao=' + $('#emissao').text()
                + '&iddatain=' + $('#datain').text()
                + '&iddataout=' + $('#dataout').text()
                + '&idtipo=' + tipo
                + '&iditem=' + item
                + '&idcnpj=' + cnpj
                + '&idfornecedor=' + fornecedor
                + '&idrecebimento=' + recebimento
                + '&iddocumento=' + documento
                + '&idvalor=' + valor
                + '&idpendente=' + pendente
                + '&idobs=' + obs,
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelafile').DataTable();
            table.clear().draw();
            listarFile();
            inserirValores();
            limparParte();
        }
    });
}


function novoFile() {

    var datainsertin = Date($('#datain').val());
    var mesdatain = $('#datain').val().substring(5, 7);
    var anodatain = $('#datain').val().substring(2, 4);
    var cliente = $('#avulsocliente').val();
    var cpf = "cliente não cadastrado";

    if (cliente === "") {
        cliente = $('#cliente').find('option:selected').text();
        cpf = $('#cliente').find('option:selected').val();
    }

    $.ajax({
        type: 'GET',
        url: '../ServletInserirNovoFile',
        data: 'idfile=' + '.' + mesdatain + '/' + anodatain
                + '&idcpf=' + cpf
                + '&idcliente=' + cliente
                + '&idstur=0'
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idemissao=' + $('#emissao').val()
                + '&iddatain=' + $('#datain').val()
                + '&iddataout=' + $('#dataout').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            $('#numerofile').text(dados);
        }
    });
}

function gravarSessionFile(cliente, cpf) {

    if (cliente === "") {
        cliente = $('#cliente').find('option:selected').text();
        cpf = $('#cliente').find('option:selected').val();
    }

    $.ajax({
        type: 'GET',
        url: '../ServletGravarSessionFile',
        data: 'idfile=' + $('#numerofile').text()
                + '&idcpf=' + cpf
                + '&idcliente=' + cliente
                + '&idstur=0'
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idemissao=' + $('#emissao').val()
                + '&iddatain=' + $('#datain').val()
                + '&iddataout=' + $('#dataout').val(),
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

function gravarSessionFileBusca(cliente, cpf) {
    $.ajax({
        type: 'GET',
        url: '../ServletGravarSessionFile',
        data: 'idfile=' + $('#nfile').val() + '.' + $('#mes').find('option:selected').text() + '/' + $('#ano').find('option:selected').text()
                + '&idcpf=' + cpf
                + '&idcliente=' + cliente
                + '&idstur=0'
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idemissao=' + $('#emissao').val()
                + '&iddatain=' + $('#datain').val()
                + '&iddataout=' + $('#dataout').val(),
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


function limparTudo() {
//    $("#nfile").val("");
//    $('#mes').val("");
//    $('#mes').selectpicker('refresh');
//    $('#ano').val("");
//    $('#ano').selectpicker('refresh');
//    $("#cliente").val("");
//    $('#cliente').selectpicker('refresh');
//    $('#n_res_stur').val("");
//    $("#servico").val("");
//    $('#servico').selectpicker('refresh');
//    $("#emissao").val("");
//    $('#datain').val("");
//    $("#dataout").val("");
//    $("#item").val("");
//    $("#fornecedor").val("");
//    $('#fornecedor').selectpicker('refresh');
//    $('#recebimento').val("");
//    $('#recebimento').selectpicker('refresh');
//    $("#documento").val("");
//    $('#valor').val("");
//    $('#md_checkbox_1').prop('checked', false);
//    $('#obs').val("");
//
//    var oTable = $('#tabelafile').dataTable();
//    oTable.fnFilter("");
//    inserirValores();
    window.location.reload();
}

function limparBusca() {
    $("#nfile").val("");
    $('#mes').val("");
    $('#mes').selectpicker('refresh');
    $('#ano').val("");
    $('#ano').selectpicker('refresh');
    $("#cliente").val("");
    $('#cliente').selectpicker('refresh');
    $("#servico").val("");
    $('#servico').selectpicker('refresh');
    $("#emissao").val("");
    $('#datain').val("");
    $("#dataout").val("");

}

function limparParte() {
    $("#item").val("");
    $("#item1").val("");
    $("#fornecedor1").val(0);
    $('#fornecedor1').selectpicker('refresh');
    $('#recebimento').val("");
    $('#recebimento').selectpicker('refresh');
    $("#documento").val("");
    $("#documento1").val("");
    $('#valor').val("");
    $('#valor1').val("");
    $('#md_checkbox_1').prop('checked', false);
    $('#md_checkbox_2').prop('checked', false);
    $('#obs').val("");
    $('#obs1').val("");
    var oTable = $('#tabelafile').dataTable();
    oTable.fnFilter("");
}

function atualizarFile() {
    $.ajax({
        type: 'GET',
        url: '../ServletAtualizarFile',
        data: 'idid=' + $('#item').attr('registro')
                + '&idfile=' + $('#numerofile').text()
                + '&idcpf=' + $('#cpf').text()
                + '&idcliente=' + $('#client').text()
                + '&idstur=0'
                + '&idservico=' + $('#servic').text()
                + '&idemissao=' + $('#emissao').text()
                + '&iddatain=' + $('#datain').text()
                + '&iddataout=' + $('#dataout').text()
                + '&idtipo=Receita'
                + '&iditem=' + $('#item').val()
                + '&idcnpj='
                + '&idfornecedor='
                + '&idrecebimento=' + $('#recebimento').find('option:selected').text()
                + '&iddocumento=' + $('#documento').val()
                + '&idvalor=' + $('#valor').val()
                + '&idpendente=' + $('#md_checkbox_1').is(':checked')
                + '&idobs=' + $('#obs').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelafile').DataTable();
            table.clear().draw();
            listarFile();
            inserirValores();
            limparParte();
        }
    });
}


function atualizarFile1() {
    $.ajax({
        type: 'GET',
        url: '../ServletAtualizarFile',
        data: 'idid=' + $('#item1').attr('registro')
                + '&idfile=' + $('#numerofile').text()
                + '&idcpf=' + $('#cpf').text()
                + '&idcliente=' + $('#client').text()
                + '&idstur=0'
                + '&idservico=' + $('#servic').text()
                + '&idemissao=' + $('#emissao').text()
                + '&iddatain=' + $('#datain').text()
                + '&iddataout=' + $('#dataout').text()
                + '&idtipo=Despesa'
                + '&iditem=' + $('#item1').val()
                + '&idcnpj=' + $('#fornecedor1').find('option:selected').val()
                + '&idfornecedor=' + $('#fornecedor1').find('option:selected').text()
                + '&idrecebimento='
                + '&iddocumento=' + $('#documento1').val()
                + '&idvalor=' + $('#valor1').val()
                + '&idpendente=' + $('#md_checkbox_2').is(':checked')
                + '&idobs=' + $('#obs1').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelafile').DataTable();
            table.clear().draw();
            listarFile();
            inserirValores();
            limparParte();
        }
    });
}


function atualizarFileTopo() {
    $.ajax({
        type: 'GET',
        url: '../ServletAtualizarFileTopo',
        data: 'idfile=' + $('#nfile').val() + '.' + $('#mes').find('option:selected').text() + '/' + $('#ano').find('option:selected').text()
                + '&idcpf=' + $('#cliente').find('option:selected').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text()
                + '&idstur=0'
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idemissao=' + $('#emissao').val()
                + '&iddatain=' + $('#datain').val()
                + '&iddataout=' + $('#dataout').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelafiletopo').DataTable();
            table.clear().draw();
            listarFileTopo();
            limparBusca();
        }
    });
}

function excluirFileTopo() {
    $.ajax({
        type: 'GET',
        url: '../ServletExcluirFileTopo',
        data: 'idfile=' + $('#nfile').val() + '.' + $('#mes').find('option:selected').text() + '/' + $('#ano').find('option:selected').text()
                + '&idcpf=' + $('#cliente').find('option:selected').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text()
                + '&idstur=0'
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idemissao=' + $('#emissao').val()
                + '&iddatain=' + $('#datain').val()
                + '&iddataout=' + $('#dataout').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelafiletopo').DataTable();
            table.clear().draw();
            listarFileTopo();
            limparBusca();
        }
    });
}

function excluirFileT() {
    $.ajax({
        type: 'GET',
        url: '../ServletExcluirFileTopo',
        data: 'idfile=' + $('#numerofile').text()
                + '&idcpf=' + $('#cliente').find('option:selected').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text()
                + '&idstur=0'
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idemissao=' + $('#emissao').val()
                + '&iddatain=' + $('#datain').val()
                + '&iddataout=' + $('#dataout').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelafiletopo').DataTable();
            table.clear().draw();
            listarFileTopo();
            limparBusca();
        }
    });
}

function excluirFile() {
    $.ajax({
        type: 'GET',
        url: '../ServletExcluirFile',
        data: 'idid=' + $('#item').attr('registro'),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelafile').DataTable();
            table.clear().draw();
            listarFile();
            inserirValores();
        }
    });
}


function excluirTodoFile() {
    var nfile = $('#nfile').val();
    if (nfile === "") {
        alert("Clique em um número do file na tabela para excluir");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletExcluirTodoFile',
            data: 'idfile=' + $('#nfile').val() + '.' + $('#mes').find('option:selected').text() + '/' + $('#ano').find('option:selected').text(),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var table = $('#tabelafile').DataTable();
                table.clear().draw();
                listarFile();
                inserirValores();
            }
        });
    }
}

function listarFile() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarFile',
        data: 'idfile=' + $('#numerofile').text()
                + '&idcpf=' + $('#cliente').text()
                + '&idstur=' + $('#n_res_stur').val()
                + '&idservico=' + $('#servico').text()
                + '&idemissao=' + $('#emissao').text()
                + '&iddatain=' + $('#datain').text()
                + '&iddataout=' + $('#dataout').text()
                + '&idtipo=' + $("input[name='group1']:checked").val()
                + '&iditem=' + $('#item').val()
                + '&idcnpj=' + $('#fornecedor1').find('option:selected').val()
                + '&idfornecedor=' + $('#fornecedor1').find('option:selected').text()
                + '&idrecebimento=' + $('#recebimento').find('option:selected').text()
                + '&iddocumento=' + $('#documento').val()
                + '&idvalor=' + $('#valor').val(),
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
            var statusfechado = "";
            for (var i = 0; i < filefiltrados.length - 1; i++) {
                var id = filefiltrados[i].split("#")[0];
                var file = filefiltrados[i].split("#")[1];
                var cliente = filefiltrados[i].split("#")[2];
                var status = filefiltrados[i].split("#")[3];
                var servico = filefiltrados[i].split("#")[4];
                var emissao = filefiltrados[i].split("#")[5];
                var datain = filefiltrados[i].split("#")[6];
                var dataout = filefiltrados[i].split("#")[7];
                var tipo = filefiltrados[i].split("#")[8];
                var item = filefiltrados[i].split("#")[9];
                var recebimento = filefiltrados[i].split("#")[10];
                var documento = filefiltrados[i].split("#")[11];
                var valor = filefiltrados[i].split("#")[12];
                var pendente = filefiltrados[i].split("#")[13];
                var fornecedor = filefiltrados[i].split("#")[14];
                var excluido = filefiltrados[i].split("#")[15];
                var usuario = filefiltrados[i].split("#")[16];
                var t = $('#tabelafile').DataTable();
                var collapsef = '';
                var ident = '';
                var botaopendente = '';
                var botaofechado = '';
                var recibo = '';
                var atividades = "<button id='editarservico' data-type='editarservico' class='btn waves-effect bg-light-blue' data-toggle='collapse' href='#" + collapsef + "'><i class='material-icons'>edit</i></button>"
                        + "<button id='deletarservico' data-type='deletarservico' class='btn waves-effect bg-pink'><i class='material-icons'>delete_forever</i></button>";

                statusfechado = status;

                if (tipo === 'Receita') {
                    ident = "<button id='receitadespesa" + id + "' tipo='receita' class='btn waves-effect bg-blue-grey'><i class='material-icons'>attach_money</i></button>";
                    recibo = "<button id='printrecibo' data-type='printrecibo' class='btn waves-effect bg-blue-grey'><i class='material-icons'>assignment_turned_in</i><span>Recibo</span></button>";
                } else {
                    ident = "<button id='receitadespesa" + id + "' tipo='despesa' class='btn waves-effect bg-pink'><i class='material-icons'>money_off</i></button>";
                }
                if (pendente === 'false') {
                    botaopendente = "";
                } else {
                    botaopendente = "<button class='btn waves-effect bg-amber'><i class='material-icons'>warning</i></button>";
                }
                if (status !== 'FECHADO') {
                    botaofechado = "";
                } else {
                    botaofechado = "<button id='botaofechado' registro='fechado' class='btn waves-effect bg-black'><i class='material-icons'>lock_outline</i></button>";
                }
                if (excluido === "true") {
                    botaofechado = "<button id='botaoexcluido' registro='excluido' class='btn waves-effect bg-warning'><i class='material-icons'>delete_forever</i></button>";
                    atividades = "";
                    recibo = "";
                }

                var tamanhotexto = 25;
                var fornecedorreduzido = fornecedor.substring(0, tamanhotexto);
                var reticencias = "";
                if (fornecedor.length > tamanhotexto) {
                    reticencias = "...";
                }

                var itemduzido = item.substring(0, tamanhotexto);
                var reticencias1 = "";
                if (item.length > tamanhotexto) {
                    reticencias1 = "...";
                }

                var tamanhotexto1 = 15;
                var usuarioreduzido = usuario.substring(0, tamanhotexto1);
                var reticencias2 = "";
                if (usuario.length > tamanhotexto1) {
                    reticencias2 = "...";
                }

                t.row.add([
                    botaopendente + botaofechado + ident,
                    id,
//                    fornecedorreduzido + reticencias,
                    itemduzido + reticencias1,
                    valor,
                    usuarioreduzido + reticencias2,
                    atividades + recibo
                ]).draw(false);
                t.order([1, 'desc']);
            }

            if (statusfechado === "FECHADO") {
                $('#fecharfile').hide();
            } else {
                $('#abrirfile').hide();
            }
        }
    });
}

function listarFileTopo() {
    var ponto = '';
    var barra = '';
    if ($('#mes').find('option:selected').text() === '') {
        barra = '';
    } else {
        ponto = '.';
        barra = '/';
    }
    var t = $('#tabelafiletopo').DataTable();
    t.clear().draw();

    $.ajax({
        type: 'GET',
        url: '../ServletListarFileTopo',
        data: 'idfile=' + $('#nfile').val() + ponto + $('#mes').find('option:selected').text() + barra + $('#ano').find('option:selected').text()
                + '&idcpf=' + $('#cliente').find('option:selected').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text()
                + '&idstur=0'
                + '&idservico=' + $('#servico').find('option:selected').text()
                + '&idemissao=' + $('#emissao').val()
                + '&iddatain=' + $('#datain').val()
                + '&iddataout=' + $('#dataout').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            filefiltrados = dados.split(";");
            for (var i = 0; i < filefiltrados.length - 1; i++) {
                var id = filefiltrados[i].split("#")[0];
                var file = filefiltrados[i].split("#")[1];
                var cliente = filefiltrados[i].split("#")[2];
                var servico = filefiltrados[i].split("#")[3];
                var emissao = filefiltrados[i].split("#")[4];
                var datain = filefiltrados[i].split("#")[5];
                var dataout = filefiltrados[i].split("#")[6];
                var cpf = filefiltrados[i].split("#")[7];
                var stur = filefiltrados[i].split("#")[8];
                var excluido = filefiltrados[i].split("#")[9];
                var usuario = filefiltrados[i].split("#")[10];

                var botaofecha = "";
                var atividades = "";
                botaofecha = "<button id='filetopoaberto' data-type='filetopoaberto' class='btn waves-effect bg-light-blue'><i class='material-icons'>lock_open</i></button>";
                atividades = "<button id='adicionar' data-type='adicionar' class='btn waves-effect bg-blue-grey'><i class='material-icons'>note_add</i></button>"
                        + "<button id='editar' data-type='editar' class='btn waves-effect bg-light-blue'><i class='material-icons'>edit</i></button>";
//                            + "<button id='del' data-type='deletar' class='btn waves-effect bg-pink'><i class='material-icons'>delete_forever</i></button>"

                if (stur !== "0") {
                    botaofecha = "<button id='filetopofechado' data-type='filetopofechado' class='btn waves-effect bg-black'><i class='material-icons'>lock_outline</i></button>";
                }

                if (excluido === "true") {
                    botaofecha = "<button id='filetopoexcluido' data-type='filetoexcluido' class='btn waves-effect bg-warning'><i class='material-icons'>delete_forever</i></button>";
                    atividades = "<button id='adicionar' data-type='adicionar' class='btn waves-effect bg-blue-grey'><i class='material-icons'>note_add</i></button>";
                }

                var tamanhotexto = 25;
                var clienteduzido = cliente.substring(0, tamanhotexto);
                var reticencias = "";
                if (cliente.length > tamanhotexto) {
                    reticencias = "...";
                }

                var servicoreduzido = servico.substring(0, tamanhotexto);
                var reticencias1 = "";
                if (servico.length > tamanhotexto) {
                    reticencias1 = "...";
                }

                var tamanhotexto1 = 15;
                var usuarioreduzido = usuario.substring(0, tamanhotexto1);
                var reticencias2 = "";
                if (usuario.length > tamanhotexto1) {
                    reticencias2 = "...";
                }

                t.row.add([
                    botaofecha,
                    file,
                    clienteduzido + reticencias,
                    servicoreduzido + reticencias1,
                    emissao,
                    usuarioreduzido + reticencias2,
                    atividades
                ]).draw(false);
                t.order([4, 'desc']);
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
            listarFileTopo();
        }
    });
}

$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'inserirservicos') {
            showInserirReceitaMessage();
        } else if (type === 'limpartudo') {
            showLimparTudoMessage();
        } else if (type === 'limparservicos') {
            showLimparServicoMessage();
        } else if (type === 'atualizar') {
            showAtualizarMessage();
        } else if (type === 'excluir') {
            showExcluirMessage();
        } else if (type === 'excluirtudo') {
            showExcluirFileMessage();
        } else if (type === 'inserirservicos1') {
            showInserirDespesaMessage();
        } else if (type === 'atualizar1') {
            showAtualizar1Message();
        } else if (type === 'buscarfile') {
            showBuscarFileMessage();
        } else if (type === 'buscarfiletopo') {
            showBuscarFileTopoMessage();
        } else if (type === 'inserirfile') {
            showInserirMessage();
        } else if (type === 'novofile') {
            showNovoMessage();
        } else if (type === 'alterarfiletopo') {
            showAtualizarFileTopoMessage();
        } else if (type === 'limparbusca') {
            showLimparBuscaMessage();
        } else if (type === 'excluirfiletopo') {
            showExcluirFileTopoMessage();
        } else if (type === 'buscarfilelancamento') {
            showBuscarFileLançamentoMessage();
        } else if (type === 'excluirfilet') {
            showExcluirFileTMessage();
        } else if (type === 'fecharfile') {
            fecharFile();
        } else if (type === 'inseriros') {
            showInserirOS();
        } else if (type === 'abrirfile') {
            abrirFile();
        }
    });
});
function showInserirMessage() {
    swal({
        title: "Você deseja inserir um novo file?",
        text: "Será aberta janela para lançamento de novo file",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, quero inserir novo!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            window.location.href = "../pages/fileinserir.jsp";
        } else {
            swal("Cancelado", "Os dados não foram salvos", "error");
        }
    });
}

function showLancarMessage(cliente, cpf) {

    swal({
        title: "Você deseja lançar serviços neste file?",
        text: "Serão direcionado a página de lançamentos",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, quero efetuar lançamentos!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            gravarSessionFileBusca(cliente, cpf);
            return(window.location.href = "../pages/file.jsp");
        } else {
            swal("Cancelado", "Os dados não foram salvos", "error");
        }
    });
}

function showLancarExcluirMessage() {
    swal({
        title: "Você deseja excluir serviços deste file?",
        text: "Serão direcionado a página de lançamentos",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, quero efetuar a exclusão!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            gravarSessionFileBusca();
            window.location.href = "../pages/file.jsp";
        } else {
            swal("Cancelado", "Os dados não foram salvos", "error");
        }
    });
}

function showNovoMessage() {
    var cliente = $('#avulsocliente').val();
    var cpf = "cliente não cadastrado";
    var aviso = "ESSE CLIENTE NÃO TERÁ CADASTRO";
    if (cliente === "") {
        cliente = $('#cliente').find('option:selected').text();
        cpf = $('#cliente').find('option:selected').val();
        aviso = "";
    }
    swal({
        title: "Confirma a inclusão do novo File?\n" + aviso,
        text: "Será inseriro serviço: \n" + $('#servico').find('option:selected').text()
                + "\n\n para o cliente: \n" + cliente
                + "\n\n com início na data de: \n" + $('#datain').val(),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, incluir File!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            novoFile();
            swal({
                title: "Os dados foram salvos!",
                text: "Deseja efetuar lançamentos neste File?",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#388E3C",
                confirmButtonText: "Sim, desejo efetuar lançamentos!",
                cancelButtonText: "Não neste momento!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    if ($('#numerofile').text() === "-") {
                        swal("Aguarde Criação do File", "Após a criação do file você serpa direcionado para página de lançamento", "warning");
                    } else {
                        gravarSessionFile(cliente, cpf);
                        window.location.href = "../pages/file.jsp";
                    }
                } else {
                    swal("Mantido", "Você vai continuar na mesma página", "error");
                }
            });
        } else {
            swal("Cancelado", "Os dados não foram salvos", "error");
        }
    });
}

function showInserirDespesaMessage() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarFechado',
        data: 'idfile=' + $('#numerofile').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var base = dados.split(";");
            var fechado = base[0].split("#")[0];
            var excluido = base[0].split("#")[1];
            if (fechado !== "FECHADO" && excluido === "false") {
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
                        inserirFile1();
                    } else {
                        swal("Cancelado", "Os dados não foram salvos", "error");
                    }
                });
            } else {
                swal("File Fechado!", "Não é possível realizar lançamentos.", "warning");
            }
        }
    });
}

function showInserirReceitaMessage() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarFechado',
        data: 'idfile=' + $('#numerofile').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var base = dados.split(";");
            var fechado = base[0].split("#")[0];
            var excluido = base[0].split("#")[1];
            if (fechado !== "FECHADO" && excluido === "false") {
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
                        inserirFile();
                    } else {
                        swal("Cancelado", "Os dados não foram salvos", "error");
                    }
                });
            } else {
                swal("File Fechado!", "Não é possível realizar lançamentos.", "warning");
            }
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

function showLimparServicoMessage() {
    swal({
        title: "Você deseja limpar os campos de serviços?",
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
            limparParte();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showLimparBuscaMessage() {
    $('#alterarfiletopo').hide();
    $('#excluirfiletopo').hide();
    swal({
        title: "Você deseja limpar os campos de busca?",
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
            limparBusca();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showAtualizarMessage() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarFechado',
        data: 'idfile=' + $('#numerofile').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var base = dados.split(";");
            var fechado = base[0].split("#")[0];
            var excluido = base[0].split("#")[1];
            if (fechado !== "FECHADO" && excluido === "false") {
                swal({
                    title: "Você deseja atualizar o lançamento?",
                    text: "Será atualizado o lançamento com os dados inseridos no formulário",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#388E3C",
                    confirmButtonText: "Sim, atualize o lançamento!",
                    cancelButtonText: "Não, cancele por favor!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        swal("Atualizado!", "Os dados foram atualizados.", "success");
                        atualizarFile();
                    } else {
                        swal("Cancelado", "Os dados serão mantidos", "error");
                    }
                });
            } else {
                swal("File Fechado!", "Não é possível realizar lançamentos.", "warning");
            }
        }
    });
}

function showAtualizar1Message() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarFechado',
        data: 'idfile=' + $('#numerofile').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var base = dados.split(";");
            var fechado = base[0].split("#")[0];
            var excluido = base[0].split("#")[1];
            if (fechado !== "FECHADO" && excluido === "false") {
                swal({
                    title: "Você deseja atualizar o lançamento?",
                    text: "Será atualizado o lançamento com os dados inseridos no formulário",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#388E3C",
                    confirmButtonText: "Sim, atualize o lançamento!",
                    cancelButtonText: "Não, cancele por favor!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        swal("Atualizado!", "Os dados foram atualizados.", "success");
                        atualizarFile1();
                    } else {
                        swal("Cancelado", "Os dados serão mantidos", "error");
                    }
                });
            } else {
                swal("File Fechado ou Exluído!", "Não é possível realizar lançamentos.", "warning");
            }
        }
    });
}
function showAtualizarFileTopoMessage() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarFechado',
        data: 'idfile=' + $('#nfile').val() + '.' + $('#mes').find('option:selected').text() + '/' + $('#ano').find('option:selected').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var base = dados.split(";");
            var fechado = base[0].split("#")[0];
            var excluido = base[0].split("#")[1];
            if (fechado !== "FECHADO" && excluido === "false") {

                swal({
                    title: "Você deseja atualizar o file?",
                    text: "Será atualizado o file com os dados inseridos no formulário",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#388E3C",
                    confirmButtonText: "Sim, atualize o file!",
                    cancelButtonText: "Não, cancele por favor!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        swal("Atualizado!", "Os dados foram atualizados.", "success");
                        atualizarFileTopo();
                        $('#alterarfiletopo').hide();
                    } else {
                        swal("Cancelado", "Os dados serão mantidos", "error");
                    }
                });
            } else {
                swal("File Fechado ou Excluído!", "Não é possível realizar lançamentos.", "warning");
            }
        }
    });
}

function showExcluirMessage() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarFechado',
        data: 'idfile=' + $('#numerofile').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var base = dados.split(";");
            var fechado = base[0].split("#")[0];
            var excluido = base[0].split("#")[1];
            if (fechado !== "FECHADO" && excluido === "false") {
                swal({
                    title: "Você deseja excluir o lançamento?",
                    text: "Será excluído o lançamento selecionado",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#388E3C",
                    confirmButtonText: "Sim, exclua o lançamento!",
                    cancelButtonText: "Não, cancele por favor!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        swal("Excluído!", "Os dados foram excluídos.", "success");
                        excluirFile();
                    } else {
                        swal("Cancelado", "Os dados serão mantidos", "error");
                    }
                });
            } else {
                swal("File Fechado ou Excluído!", "Não é possível realizar lançamentos.", "warning");
            }
        }
    });
}

function showExcluirFileMessage() {
    swal({
        title: "Você deseja excluir todos os lançamentos deste file?",
        text: "Serão excluídos os lançamentos do file selecionado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, exclua o file completo!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Excluído!", "Os dados foram excluídos.", "success");
            excluirTodoFile();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showExcluirFileTopoMessage() {
    swal({
        title: "Você deseja excluir o file?",
        text: "Será excluido o file com os dados inseridos no formulário",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, exclua o file!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Excluído!", "Os dados foram excluídos.", "success");
//            excluirFileTopo();

            $('#excluirfiletopo').hide();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showExcluirFileTMessage() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarFechado',
        data: 'idfile=' + $('#numerofile').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var base = dados.split(";");
            var fechado = base[0].split("#")[0];
            var excluido = base[0].split("#")[1];
            if (fechado !== "FECHADO" && excluido === "false") {
                swal({
                    title: "Você deseja excluir o file?",
                    text: "Será excluido o file com os dados inseridos no formulário",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#388E3C",
                    confirmButtonText: "Sim, exclua o file!",
                    cancelButtonText: "Não, cancele por favor!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        swal("Excluído!", "Os dados foram excluídos.", "success");
                        excluirFileT();
                        window.location.href = "../pages/filebuscar.jsp";

                    } else {
                        swal("Cancelado", "Os dados serão mantidos", "error");
                    }
                });
            } else {
                swal("File Fechado ou Excluído!", "Não é possível realizar lançamentos.", "warning");
            }
        }
    });
}

function showBuscarFileMessage() {
    swal({
        title: "Você deseja buscar todos os lançamentos deste file?",
        text: "Serão selecionados os lançamentos do file",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, selecione o file!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Selecionado!", "Os dados foram selecionados.", "success");
            inserirValores();
            filterColumn();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showBuscarFileTopoMessage() {
    $('#alterarfiletopo').hide();
    $('#excluirfiletopo').hide();
    swal({
        title: "Você deseja buscar file?",
        text: "Serão selecionados os files filtrados",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, selecione o file!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Selecionado!", "Os dados foram selecionados.", "success");
            listarFileTopo();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showBuscarFileLançamentoMessage() {
    $('#alterarfiletopo').hide();
    $('#excluirfiletopo').hide();
    swal({
        title: "Você deseja buscar file?",
        text: "Será aberta tela de busca",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, quero buscar o file!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            window.location.href = '../pages/filebuscar.jsp';
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showAbirFileMessage() {
    swal({
        title: "Você deseja efetuarlançamentos no file?",
        text: "Será aberta tela para lançamentos",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, desejo efetuar lançamentos!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {

            window.location.href = '../pages/file.jsp';

        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showInserirOS() {
    swal({
        title: "Você deseja salvar a O.S.?",
        text: "Será salva no sistema",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, salve a O.S.!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Salvo!", "A O.S. foi salva.", "success");
            inserirOS();
        } else {
            swal("Cancelado", "A O.S. foi cancelada", "error");
            consultarOS();
        }
    });
}

function inserirValores() {

    var str = $('#numerofile').text();
    var anofile = "20" + str.substring(str.length - 2, str.length);

    $.ajax({
        type: 'GET',
        url: '../ServletFiltroNumeros',
        data: 'idfile=' + $('#numerofile').text()
                + '&idexcluido='
                + '&idano=' + anofile
                + '&idcliente='
                + '&idservico='
                + '&idfornecedor=',
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
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

function filterColumn() {
    $('#tabelafile').DataTable().search(
            $('#nfile').val() + '.' + $('#mes').find('option:selected').text() + '/' + $('#ano').find('option:selected').text(),
            ).draw();
}

$('#tabelafiletopo tbody').on('click', 'button', function () {
    var tr = $(this).closest("tr");
    var dados = $("#tabelafiletopo").DataTable().row(tr).data();
    var type = $(this).data('type');

    if (type === 'adicionar') {

        $.ajax({
            type: 'GET',
            url: '../ServletConsultaFileTopo',
            data: 'idid=' + dados[1],
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada no filtro');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                filefiltrados = dados.split(";");
                var cliente = filefiltrados[0].split("#")[0];
                var servico = filefiltrados[0].split("#")[1];
                var emissao = filefiltrados[0].split("#")[2];
                var datain = filefiltrados[0].split("#")[3];
                var dataout = filefiltrados[0].split("#")[4];
                var cpf = filefiltrados[0].split("#")[5];
                var file = filefiltrados[0].split("#")[6];

                $('#excluirfiletopo').hide();
                $('#alterarfiletopo').hide();

                $('html,body').animate({scrollTop: 0}, 'slow');

                $('#nfile').val(file.substring(0, file.length - 6));
                $('#mes').val(file.substring(file.length - 5, file.length - 3));
                $('#mes').selectpicker('refresh');
                $('#ano').val(file.substring(file.length - 2, file.length));
                $('#ano').selectpicker('refresh');
                $('#cliente').val(cpf);
                $('#cliente').selectpicker('refresh');
                $('#servico').val(servico);
                $('#servico').selectpicker('refresh');
                $('#emissao').val(emissao);
                $('#datain').val(datain);
                $('#dataout').val(dataout);

                showLancarMessage(cliente, cpf);
            }
        });

    } else if (type === 'editar') {
        $.ajax({
            type: 'GET',
            url: '../ServletConsultaFileTopo',
            data: 'idid=' + dados[1],
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada no filtro');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                filefiltrados = dados.split(";");
                var cliente = filefiltrados[0].split("#")[0];
                var servico = filefiltrados[0].split("#")[1];
                var emissao = filefiltrados[0].split("#")[2];
                var datain = filefiltrados[0].split("#")[3];
                var dataout = filefiltrados[0].split("#")[4];
                var cpf = filefiltrados[0].split("#")[5];
                var file = filefiltrados[0].split("#")[6];

                $('#excluirfiletopo').hide();
                $('#alterarfiletopo').hide();
                $('html,body').animate({scrollTop: 0}, 'slow');

                $('#nfile').val(file.substring(0, file.length - 6));
                $('#mes').val(file.substring(file.length - 5, file.length - 3));
                $('#mes').selectpicker('refresh');
                $('#ano').val(file.substring(file.length - 2, file.length));
                $('#ano').selectpicker('refresh');
                $('#cliente').val(cpf);
                $('#cliente').selectpicker('refresh');
                $('#servico').val(servico);
                $('#servico').selectpicker('refresh');
                $('#emissao').val(emissao);
                $('#datain').val(datain);
                $('#dataout').val(dataout);

                $('#alterarfiletopo').show();
            }
        });
    } else if (type === 'deletar') {
        $('#alterarfiletopo').hide();
        $('html,body').animate({scrollTop: 0}, 'slow');

        $('#nfile').val(dados[1].substring(0, dados[1].length - 6));
        $('#mes').val(dados[1].substring(dados[1].length - 5, dados[1].length - 3));
        $('#mes').selectpicker('refresh');
        $('#ano').val(dados[1].substring(dados[1].length - 2, dados[1].length));
        $('#ano').selectpicker('refresh');
        $('#cliente').val(dados[2]);
        $('#cliente').selectpicker('refresh');
        $('#servico').val(dados[4]);
        $('#servico').selectpicker('refresh');
        $('#emissao').val(dados[5]);
        $('#datain').val(dados[6]);
        $('#dataout').val(dados[7]);

//        $('#excluirfiletopo').show();
        showLancarExcluirMessage();



    }
});


$('#tabelafile tbody').on('click', 'button', function () {
    var tr = $(this).closest("tr");
    var dadosfile = $("#tabelafile").DataTable().row(tr).data();
    var type = $(this).data('type');
    var receitadespesa = $('#receitadespesa' + dadosfile[1]).attr('tipo');

    if (type === 'editarservico') {

        if (receitadespesa === 'receita') {
            var statuscollapse1 = $('#collapsedfile1').attr('aria-expanded');
            var statuscollapse2 = $('#collapsedfile2').attr('aria-expanded');
            if (statuscollapse1 == "false") {
                $('#collapsedfile1').click();
            }
            if (statuscollapse2 == "true") {
                $('#collapsedfile2').click();
            }
        }

        if (receitadespesa === 'despesa') {
            var statuscollapse1 = $('#collapsedfile1').attr('aria-expanded');
            var statuscollapse2 = $('#collapsedfile2').attr('aria-expanded');
            if (statuscollapse2 == "false") {
                $('#collapsedfile2').click();
            }
            if (statuscollapse1 == "true") {
                $('#collapsedfile1').click();
            }
        }

        $.ajax({
            type: 'GET',
            url: '../ServletConsultaFile',
            data: 'idid=' + dadosfile[1],
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada no filtro');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                filefiltrados = dados.split(";");
                var id = filefiltrados[0].split("#")[0];
                var file = filefiltrados[0].split("#")[1];
                var cliente = filefiltrados[0].split("#")[2];
                var cpf = filefiltrados[0].split("#")[3];
                var stur = filefiltrados[0].split("#")[4];
                var servico = filefiltrados[0].split("#")[5];
                var emissao = filefiltrados[0].split("#")[6];
                var datain = filefiltrados[0].split("#")[7];
                var dataout = filefiltrados[0].split("#")[8];
                var tipo = filefiltrados[0].split("#")[9];
                var item = filefiltrados[0].split("#")[10];
                var cnpj = filefiltrados[0].split("#")[11];
                var fornecedor = filefiltrados[0].split("#")[12];
                var recebimento = filefiltrados[0].split("#")[13];
                var documento = filefiltrados[0].split("#")[14];
                var valor = filefiltrados[0].split("#")[15];
                var pendente = filefiltrados[0].split("#")[16];
                var observacao = filefiltrados[0].split("#")[17];
                var nfile = file.split(".")[0];
                var ames = file.split("/")[0];
                var mes = ames.split(".")[1];
                var ano = file.split("/")[1];

                if (tipo === 'Receita') {
                    $('#item').val(item);
                    $('#item').attr('registro', dadosfile[1]);
                    $('#recebimento').val(recebimento);
                    $('#recebimento').selectpicker('refresh');
                    $('#documento').val(documento);
                    $('#valor').val(valor);
                    if (pendente == 'false') {
                        $('#md_checkbox_1').prop('checked', false);
                    } else {
                        $('#md_checkbox_1').prop('checked', true);
                    }
                    $('#obs').val(observacao);
                    $('html, body').animate({scrollTop: $('#headingOne_17').offset().top}, 1000);
                } else if (tipo === 'Despesa') {
                    $('#item1').val(item);
                    $('#item1').attr('registro', dadosfile[1]);
                    $('#fornecedor1').val(cnpj);
                    $('#fornecedor1').selectpicker('refresh');
                    $('#documento1').val(documento);
                    $('#valor1').val(valor);
                    if (pendente == 'false') {
                        $('#md_checkbox_2').prop('checked', false);
                    } else {
                        $('#md_checkbox_2').prop('checked', true);
                    }
                    $('#obs1').val(observacao);
                    $('html, body').animate({scrollTop: $('#headingTwo_17').offset().top}, 1000);
                }
                inserirValores();
            }
        });
    }
    if (type === 'deletarservico') {
        $.ajax({
            type: 'GET',
            url: '../ServletConsultarFechado',
            data: 'idfile=' + $('#numerofile').text(),
            statusCode: {
                404: function () {
                    alert('Pagina não encontrada');
                },
                500: function () {
                    alert('erro no servidor');
                }
            },
            success: function (dados) {
                var base = dados.split(";");
                var fechado = base[0].split("#")[0];
                var excluido = base[0].split("#")[1];
                if (fechado !== "FECHADO" && excluido === "false") {
                    swal({
                        title: "Você deseja excluir lançamento ID: " + dadosfile[1] + "?",
                        text: "Será excluído lançamento selecionado",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#388E3C",
                        confirmButtonText: "Sim, quero excluir lançamento!",
                        cancelButtonText: "Não, cancele por favor!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function (isConfirm) {
                        if (isConfirm) {
                            swal("Excluído!", "Os dados foram excluídos.", "success");
                            $.ajax({
                                type: 'GET',
                                url: '../ServletExcluirFile',
                                data: 'idid=' + dadosfile[1],
                                statusCode: {
                                    404: function () {
                                        alert('Pagina não encontrada');
                                    },
                                    500: function () {
                                        alert('erro no servidor');
                                    }
                                },
                                success: function (dados) {
                                    var table = $('#tabelafile').DataTable();
                                    table.clear().draw();
                                    listarFile();
                                    inserirValores();
                                }
                            });
                        } else {
                            swal("Cancelado", "Os dados serão mantidos", "error");
                        }
                    });
                } else {
                    swal("File Fechado!", "Não é possível realizar lançamentos.", "warning");
                }
            }
        });
    }
    if (type === 'printrecibo') {
        window.open('../ServletImprimirRecibo?file=' + dadosfile[1], '_blank');
    }
});

function fecharFile() {
    swal({
        title: "Você deseja fechar este file?",
        text: "Será fechado o file para contabilização",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, quero fechar!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: 'GET',
                url: '../ServletFecharFile',
                data: 'idfile=' + $('#numerofile').text(),
                statusCode: {
                    404: function () {
                        alert('Pagina não encontrada');
                    },
                    500: function () {
                        alert('erro no servidor');
                    }
                },
                success: function (dados) {
                    filefiltrados = dados.split(";");
                    var pendente1 = filefiltrados[0].split("#")[0];
                    var stur1 = filefiltrados[0].split("#")[1];
                    if (pendente1 === "true") {
                        swal("Pendente!", "Este file possui lançamentos pendentes.", "warning");
                    } else if (stur1 === "FECHADO") {
                        swal("Já está fechado!", "Este file já esta fechado.", "warning");
                    } else {
                        swal("Fechado!", "Este file foi fechado.", "success");
                        window.location.reload();
                    }
                }
            });
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });

}

function abrirFile() {
    swal({
        title: "Você deseja abrir este file?",
        text: "Será aberto o file para lançamentos",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, quero abrir!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: 'GET',
                url: '../ServletAbrirFile',
                data: 'idfile=' + $('#numerofile').text(),
                statusCode: {
                    404: function () {
                        alert('Pagina não encontrada');
                    },
                    500: function () {
                        alert('erro no servidor');
                    }
                },
                success: function (dados) {
                    filefiltrados = dados.split(";");
                    var pendente1 = filefiltrados[0].split("#")[0];
                    var stur1 = filefiltrados[0].split("#")[1];
                    if (stur1 !== "FECHADO") {
                        swal("Já está aberto!", "Este file já esta aberto.", "warning");
                    } else {
                        swal("Aberto!", "Este file foi aberto.", "success");
                        window.location.reload();
                    }
                }
            });
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });

}

function verificarClassificacao() {

    $.ajax({
        type: 'GET',
        url: '../ServletVerificarClassificacao',
        data: 'idcpf=' + $('#cliente').find('option:selected').val()
                + '&idcliente=' + $('#cliente').find('option:selected').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            if (dados === "5") {
                $('#classificacao').html('<i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i>');
            } else if (dados === "4") {
                $('#classificacao').html('<i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_border</i>');
            } else if (dados === "3") {
                $('#classificacao').html('<i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i>');
            } else if (dados === "2") {
                $('#classificacao').html('<i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i>');
            } else if (dados === "1") {
                $('#classificacao').html('<i class="material-icons">star</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i>');
            }
        }
    });
}

function inserirOS() {
    $.ajax({
        type: 'GET',
        url: '../ServletInserirOS',
        data: 'idfile=' + $('#numerofile').text() + '&idos=' + $('#osdofile').val(),
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

function consultarOS() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarOS',
        data: 'idfile=' + $('#numerofile').text(),
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
            $('#osdofile').val("");
            $('#osdofile').val(dados);
        }
    });
}

function consultarUsuario() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarCriador',
        data: 'idfile=' + $('#numerofile').text(),
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

            var tamanhotexto = 15;
            var usuarioreduzido = dados.substring(0, tamanhotexto);
            var reticencias = "";
            if (dados.length > tamanhotexto) {
                reticencias = "...";
            }

            $('#criador').text("");
            $('#criador').text(usuarioreduzido + reticencias);
        }
    });
}