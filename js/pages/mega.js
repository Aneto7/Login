function gerarNumero() {
    $.ajax({
        type: 'GET',
        url: 'ServletNumerosMegaSena',
        data: 'idusuario=' + $('#usuario').val(),
        statusCode: {
            404: function () {
                alert('Pagina não encontrada');
            },
            500: function () {
                alert('erro no servidor');
            }
        },
        success: function (dados) {
            numerofiltrado = dados.split(";");
            console.log(numerofiltrado);

            var sorteados = [];
            var valorMaximo = 20;

            for (i = 0; i <= 5; i++) {

                var sugestao = Math.ceil(Math.random() * valorMaximo); // Escolher um numero ao acaso
                while (sorteados.indexOf(sugestao) >= 0) {  // Enquanto o numero já existir, escolher outro
                    sugestao = Math.ceil(Math.random() * valorMaximo);
                }
                sorteados.push(sugestao); // adicionar este numero à array de numeros sorteados para futura referência
            }
            var n1 = sorteados[0];
            var n2 = sorteados[1];
            var n3 = sorteados[2];
            var n4 = sorteados[3];
            var n5 = sorteados[4];
            var n6 = sorteados[5];
            $('#numeromega').val(n1 + " - " + n2 + " - " + n3 + " - " + n4 + " - " + n5 + " - " + n6);
        }
    });
}