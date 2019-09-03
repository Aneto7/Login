$(document).ready(function () {
    listarNoticia();
    listarLink();

    $('#tabelanoticia tbody').on('click', 'button', function () {
        $('html,body').animate({scrollTop: 0}, 'slow');

        var tr = $(this).closest("tr");
        var dadosfile = $("#tabelanoticia").DataTable().row(tr).data();
        var type = $(this).data('type');

        if (type === 'editarnoticia') {
            $.ajax({
                type: 'GET',
                url: '../ServletConsultarNocitica',
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
                    noticiafiltrada = dados.split(";");
                    var id = noticiafiltrada[0].split("#")[0];
                    var noticia = noticiafiltrada[0].split("#")[1];
                    var datainicio = noticiafiltrada[0].split("#")[2];
                    var link = noticiafiltrada[0].split("#")[3];
                    $("#noticia").attr('registro', id);
                    $("#noticia").val(noticia);
                    $("#linkurl").val(link);
                }
            });
        }
        if (type === 'deletarnoticia') {
            swal({
                title: "Você deseja excluir a notícia: " + dadosfile[1] + "?",
                text: "Será excluída a notícia selecionada",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#388E3C",
                confirmButtonText: "Sim, quero excluir a notícia!",
                cancelButtonText: "Não, cancele por favor!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Excluído!", "Os dados foram excluídos.", "success");
                    $.ajax({
                        type: 'GET',
                        url: '../ServletExcluirNoticia',
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
                            var table = $('#tabelanoticia').DataTable();
                            table.clear().draw();
                            listarNoticia();
                        }
                    });
                } else {
                    swal("Cancelado", "Os dados serão mantidos", "error");
                }
            });
        }
    });
});

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
            var table = $('#tabelanoticia').DataTable();
            table.clear().draw();
            listarNoticia();
        }
    });
}

function inserirLinks() {
    $.ajax({
        type: 'GET',
        url: '../ServletInserirLinks',
        data: 'ididlink1=1'
                + '&idlink1=' + $('#link1').val()
                + '&idtitulo1=' + $('#titulo1').val()
                + '&idsubtitulo1=' + $('#subtitulo1').val()
                + '&ididlink2=2'
                + '&idlink2=' + $('#link2').val()
                + '&idtitulo2=' + $('#titulo2').val()
                + '&idsubtitulo2=' + $('#subtitulo2').val()
                + '&ididlink3=3'
                + '&idlink3=' + $('#link3').val()
                + '&idtitulo3=' + $('#titulo3').val()
                + '&idsubtitulo3=' + $('#subtitulo3').val(),
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
    $("#notica").attr('registro', "");
    $("#noticia").val("");
    $('#linkurl').val("");

    var oTable = $('#tabelanoticia').dataTable();
    oTable.fnFilter("");
}

function atualizarNoticia() {
    $.ajax({
        type: 'GET',
        url: '../ServletAtualizarNoticia',
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
            var table = $('#tabelanoticia').DataTable();
            table.clear().draw();
            listarNoticia();
        }
    });
}


function excluirNoticia() {
    $.ajax({
        type: 'GET',
        url: '../ServletExcluirNoticia',
        data: 'idid=' + $('#noticia').attr('registro'),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            var table = $('#tabelanoticia').DataTable();
            table.clear().draw();
            listarNoticia();
        }
    });
}


function listarNoticia() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarNoticia',
        data: 'idid=' + $('#noticia').attr('registro')
                + '&idnoticia=' + $('#noticia').val()
                + '&idlinkurl=' + $('#linkurl').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor')
            }
        },
        success: function (dados) {
            noticiafiltrada = dados.split("|");
            for (var i = 0; i < noticiafiltrada.length - 1; i++) {
                var id = noticiafiltrada[i].split("#")[0];
                var noticia = noticiafiltrada[i].split("#")[1];
                var datainicio = noticiafiltrada[i].split("#")[2];
                var link = noticiafiltrada[i].split("#")[3];
                var excluido = noticiafiltrada[i].split("#")[4];
                console.log(noticiafiltrada);

                var atividades = "<button id='editarnoticia' data-type='editarnoticia' class='btn waves-effect bg-light-blue'><i class='material-icons'>edit</i></button>"
                        + "<button id='deletarnoticia' data-type='deletarnoticia' class='btn waves-effect bg-pink'><i class='material-icons'>delete_forever</i></button>";

                if (excluido === 'true') {
                    atividades = "<button id='filetopoexcluido' data-type='filetoexcluido' class='btn waves-effect bg-warning'><i class='material-icons'>delete_forever</i></button>";
                }

                var tamanhotexto = 35;
                var noticiareduzido = noticia.substring(0, tamanhotexto);
                var reticencias = "";
                if (noticia.length > tamanhotexto) {
                    reticencias = "...";
                }

                var tamanhotexto1 = 35;
                var linkreduzido = link.substring(0, tamanhotexto1);
                var reticencias1 = "";
                if (link.length > tamanhotexto1) {
                    reticencias1 = "...";
                }

                var t = $('#tabelanoticia').DataTable();
                t.row.add([
                    id,
                    noticiareduzido + reticencias,
                    linkreduzido + reticencias1,
                    atividades
                ]).draw(false);
                t.order([0, 'desc']);
            }
        }
    });
}

function listarLink() {
    $.ajax({
        type: 'GET',
        url: '../ServletConsultarLink',
        data: 'idid=' + $('#noticia').attr('registro'),
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
                console.log(link);


                $('#link' + u).val(link);
                $('#titulo' + u).val(titulo);
                $('#subtitulo' + u).val(subtitulo);
            }
        }
    });
}

$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'inserirnoticia') {
            showInserirMessage();
        } else if (type === 'limpartudo') {
            showLimparTudoMessage();
        } else if (type === 'atualizar') {
            showAtualizarMessage();
        } else if (type === 'exluir') {
            showExcluirMessage();
        } else if (type === 'inserirlink') {
            showLinkMessage();
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
            inserirNoticia();
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
        title: "Você deseja atualizar os dados da Notícia?",
        text: "Serão atualizados os dados da notícia com as informações inseridas no formulário",
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
            atualizarNoticia();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showExcluirMessage() {
    swal({
        title: "Você deseja excluir a notícia selecionada?",
        text: "Será excluído a notícia selecionada",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, exclua a notícia!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Excluído!", "Os dados foram excluídos.", "success");
            excluirNoticia();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}

function showLinkMessage() {
    swal({
        title: "Você deseja inserir os links?",
        text: "Serão inseridos os links",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        confirmButtonText: "Sim, insirá a notícia!",
        cancelButtonText: "Não, cancele por favor!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Excluído!", "Os dados foram inseridos.", "success");
            inserirLinks();
        } else {
            swal("Cancelado", "Os dados serão mantidos", "error");
        }
    });
}