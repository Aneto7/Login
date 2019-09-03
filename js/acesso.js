$(document).ready(function () {
    
    criar();
    
    $('#logout').on('click', function () {
        logOut();
    });

    $('#login').on('action', function () {
        acessarSistema();
    });
});

function acessarSistema() {
    $.ajax({
        type: 'GET',
        url: 'ServletGravarUsuario',
        data: 'idusuario=' + $('#username').val()
                + '&idsenha=' + $('#password').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro de conexão com o servidor, verificar parâmetros12');
            }
        },
        success: function (dados) {
            dadosusuario = dados.split(";");
            var i = 0;

            var usuario = dadosusuario[i].split("%")[0];
            var nome = dadosusuario[i].split("%")[1];
            var perfil = dadosusuario[i].split("%")[2];
            var empresa = dadosusuario[i].split("%")[3];
            var setor = dadosusuario[i].split("%")[4];
            var inicio = dadosusuario[i].split("%")[5];
            var file = dadosusuario[i].split("%")[6];
            var dashboard = dadosusuario[i].split("%")[7];
            var cliente = dadosusuario[i].split("%")[8];
            var servico = dadosusuario[i].split("%")[8];
            var fornecedor = dadosusuario[i].split("%")[8];
            var recibo = dadosusuario[i].split("%")[8];
            var fatura = dadosusuario[i].split("%")[8];
            var fechamento = dadosusuario[i].split("%")[8];
            var usuarios = dadosusuario[i].split("%")[8];

            if (usuario === "null") {
                document.getElementById("inicio").innerHTML = '<div class="alert bg-pink alert-dismissible waves-effect" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Usuário não encontrato, insira um usuário cadastrados</div>';
                $('#username').val("");
                $('#password').val("");
            } else {
                window.location.href = "pages/inicio.jsp";
            }
        }
    });
}

function logOut() {
    $.ajax({
        type: 'GET',
        url: 'ServletLogOut',
        data: 'idusuario=' + $('#username').val()
                + '&idsenha=' + $('#password').val()
                + '&idtela=' + $('#nometela').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor mais um teste');
            }
        },
        success: function (dados) {

        }
    });
}
function criar() {
    var request = new XMLHttpRequest();
    var endPoint = 'https://cieloecommerce.cielo.com.br/api/public/v1/orders/';

    request.open('POST', endPoint, true);
    request.setRequestHeader("MerchantId", "b49382c2-6664-4118-9fbb-847924d48f21", "Content-Type", "application/json");
    request.onload = function () {
        var data = JSON.parse(request.responseText);
        console.log(data);
    };
    request.send("");
}