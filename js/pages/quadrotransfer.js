$(document).ready(function () {

    $('#tabelatransfer').DataTable({
        "paging": false,
        "ordering": false,
        "searching": false,
        "info": false,
        "scrollX": false,
        "oLanguage": {
            "sZeroRecords": "Listagem de dados de transfer"
        }
    });

    horario();
    document.body.style.zoom = "200%";
    listarTransfer();

    $('#tabelatransfer tbody').on('click', 'button', function () {
        var tr = $(this).closest("tr");
        var dadosfile = $("#tabelatransfer").DataTable().row(tr).data();
        var type = $(this).data('type');
    });
});

function horario() {
    var hoje = new Date();


    var dia = hoje.getDate();
    if (dia < 10) {
        dia = "0" + dia;
    }
    var mes = hoje.getMonth();
    if (mes < 10) {
        mes = "0" + mes;
    }
    var horas = hoje.getHours();
    if (horas < 10) {
        horas = "0" + horas;
    }
    var minutos = hoje.getMinutes();
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    var segundos = hoje.getSeconds();
    if (segundos < 10) {
        segundos = "0" + segundos;
    }

    $('#horaatual').text(horas + ":" + minutos);
    $('#dataatual').text(dia + "/" + mes);
}

function listarTransfer() {
    $.ajax({
        type: 'GET',
        url: '../ServletListarQuadroTransfer',
        data: {idid: ""},
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            transferfiltrado = dados.split(";");
            for (var i = 0; i < transferfiltrado.length - 1; i++) {
                var id = transferfiltrado[i].split("#")[0];
                var diahora = transferfiltrado[i].split("#")[1];
                var fornecedor = transferfiltrado[i].split("#")[2];
                var placa = transferfiltrado[i].split("#")[3];
                var modelo = transferfiltrado[i].split("#")[4];
                var ineout = transferfiltrado[i].split("#")[5];
                var saida = transferfiltrado[i].split("#")[6];
                var destino = transferfiltrado[i].split("#")[7];
                var pax = transferfiltrado[i].split("#")[8];
                var pagamento = transferfiltrado[i].split("#")[9];
                var excluido = transferfiltrado[i].split("#")[10];

//                diahora = moment(diahora, "YYYY-MM-DD hh:mm:ss");
//                diahora = diahora.format("DD/MM/YYYY hh:mm:ss");

                var dia = Number(diahora.substring(8, 10));

                var hoje = new Date();
                var diaatual = hoje.getDate();
                var diaatual1 = diaatual + 1;
                var diaatual2 = diaatual + 2;
                var diaatual3 = diaatual + 3;


                if (dia === diaatual) {
                    $('#tabelatransfer').append("<tr><td>" + diahora + "</td><td>" + modelo + "</td><td>" + placa + "</td><td>" + saida + " - " + destino + "</td></tr>)");
                } else if (dia === diaatual1) {
                    $('#tabelatransfer').append("<tr bgcolor='#defaff'><td>" + diahora + "</td><td>" + modelo + "</td><td>" + placa + "</td><td>" + saida + " - " + destino + "</td></tr>)");
                } else if (dia === diaatual2) {
                    $('#tabelatransfer').append("<tr bgcolor='#abf2ff'><td>" + diahora + "</td><td>" + modelo + "</td><td>" + placa + "</td><td>" + saida + " - " + destino + "</td></tr>)");
                } else if (dia === diaatual3) {
                    $('#tabelatransfer').append("<tr bgcolor='#6ee9ff'><td>" + diahora + "</td><td>" + modelo + "</td><td>" + placa + "</td><td>" + saida + " - " + destino + "</td></tr>)");
                }

//                t.row.add([
//                    diahora,
//                    modelo,
//                    placa,
//                    saida + " - " + destino
//                ]).draw(false);
            }
        }
    });
}

window.onload = function () {
    setTimeout('location.reload();', 60000);
};