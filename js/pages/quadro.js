$(document).ready(function () {

    document.body.style.zoom = "125%";
    listarQuadro();
    listarFornecedor();
    listarServico();

    $('#servico').on('change', function () {
        filterColumn();
    });

//    $('#pegarservico').on('click', function () {
//        verificarSenha();
//    });


    $('#tabelafile tbody').on('click', 'button', function () {
        var tr = $(this).closest("tr");
        var dadosfile = $("#tabelafile").DataTable().row(tr).data();
        var type = $(this).data('type');
        if (type === 'pegarservico') {
            swal({
                title: "Coloque sua senha!",
                text: "Digite sua senha:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Escreve sua senha aqui"
            }, function (inputValue) {
                if (inputValue === false)
                    return false;
                if (inputValue === "") {
                    swal.showInputError("Você precisa colocar sua senha!");
                    return false;
                }
                $.ajax({
                    type: 'GET',
                    url: '../ServletVerificarSenhaFornecedor',
                    data: 'idsenha=' + inputValue,
                    statusCode: {
                        404: function () {
                            alert('Pagina não encontrada');
                        },
                        500: function () {
                            alert('erro no servidor');
                        }
                    },
                    success: function (dados) {
                        if (dados === "") {
                            swal("ERRO!", "Sua senha não está cadastrada", "error");
                        } else {
                            $.ajax({
                                type: 'GET',
                                url: '../ServletPegarServico',
                                data: 'idfornecedor=' + dados
                                        + '&idcliente=' + dadosfile[1]
                                        + '&idservico=' + dadosfile[2]
                                        + '&iditem=' + dadosfile[3],
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
                                    listarQuadro();
                                    swal("Pronto!", "Você pegou o serviço: " + dadosfile[2] + " - " + dadosfile[3], "success");
                                }
                            });
                        }
                    }
                });
            });
        }
    });
});

function atualizarFile() {
    var nfile = $('#nfile').attr('registro');
    if (nfile === "") {
        alert("Clique em um número do file na tabela para atualizar");
    } else {
        $.ajax({
            type: 'GET',
            url: '../ServletPegarServico',
            data: 'idfornecedor=' + $('#fornecedor').find('option:selected').text()
                    + '&idservico=' + $('#servico').text()
                    + '&iditem=' + $('#item').text()
                    + '&iddatain=' + $('#dataout').text(),
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

function verificarSenha() {
    $.ajax({
        type: 'GET',
        url: '../ServletVerificarSenhaFornecedor',
        data: 'idfornecedor=' + $('#fornecedor').find('option:selected').text()
                + '&idservico=' + $('#servico').text()
                + '&iditem=' + $('#item').text()
                + '&idsenha=' + $('#senhafornecedor').text()
                + '&iddatain=' + $('#dataout').text(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            if (dados === "") {
                alert("Dados incorretos, escolha um fornecedor e insira a senha correta");
            } else {
                showPegar();
            }
        }
    });
}


function listarQuadro() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarQuadro',
        data: 'tipo=' + $('#nfile').attr('registro')
                + '&idservico=' + $('#servico').find('option:selected').text(),
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
                var id = filefiltrados[i].split("#")[0];
                var file = filefiltrados[i].split("#")[1];
                var cliente = filefiltrados[i].split("#")[2];
                var stur = filefiltrados[i].split("#")[3];
                var servico = filefiltrados[i].split("#")[4];
                var emissao = filefiltrados[i].split("#")[5];
                var datain = filefiltrados[i].split("#")[6];
                var dataout = filefiltrados[i].split("#")[7];
                var tipo = filefiltrados[i].split("#")[8];
                var item = filefiltrados[i].split("#")[9];
                var recebimento = filefiltrados[i].split("#")[10];
                var documento = filefiltrados[i].split("#")[11];
                var valor = filefiltrados[i].split("#")[12];
                var forresp = filefiltrados[i].split("#")[13];

                var tamanhotexto = 20;
                var clientereduzido = cliente.substring(0, tamanhotexto);
                var reticencias = "";
                if (cliente.length > tamanhotexto) {
                    reticencias = "...";
                }

                var servicoreduzido = servico.substring(0, tamanhotexto);
                var reticencias1 = "";
                if (servico.length > tamanhotexto) {
                    reticencias1 = "...";
                }

                var itemreduzido = item.substring(0, tamanhotexto);
                var reticencias2 = "";
                if (item.length > tamanhotexto) {
                    reticencias2 = "...";
                }

                var t = $('#tabelafile').DataTable();
                t.row.add([
                    id,
                    clientereduzido + reticencias,
                    servicoreduzido + reticencias1,
                    itemreduzido + reticencias2,
                    datain,
                    forresp,
                    "<button id='pegarservico" + id + "' data-type='pegarservico' class='btn waves-effect bg-light-blue'><i class='material-icons'>touch_app</i></button>"
                ]).draw(false);
            }
        }
    });
}

function listarServico() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarServico',
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
                value: 0,
                text: ""
            }));
            for (var i = 0; i < fornecedorfiltrado.length - 1; i++) {
                var id = fornecedorfiltrado[i].split("#")[0];
                var cnpj = fornecedorfiltrado[i].split("#")[1];
                var nome = fornecedorfiltrado[i].split("#")[2];
                $('#fornecedor').append($('<option>', {
                    value: cnpj,
                    text: nome
                }));
            }
            $("#fornecedor").selectpicker('refresh');
        }
    });
}

$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'pegarservico') {
            showPegar();
        } else if (type === 'limpartudo') {
            showPedirSenhaMessage();
        }
    });
});


function showPegar() {
    swal({
        title: "Você deseja pegar este serviço?",
        text: "Você será o responsável pela realização deste serviço",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, vou realizar este serviço!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Pronto!", "O serviço foi registrado em seu nome.", "success");
            atualizarFile();
            window.location.reload()
        } else {
            swal("Cancelado", "O serviço continua em aberto", "error");
        }
    });
}

function showPedirSenhaMessage() {

}

window.onload = function () {
    setTimeout('location.reload();', 50000);
};