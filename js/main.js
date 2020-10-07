var tempoInicial = $('#tempo-digitacao').text();
var campo = $('.campo-digitacao');
var botaoReiniciar = $('#botao-reiniciar');
var tempoDigitacao = $('#tempo-digitação');


$ (function () {
    atualizaTamanhoFrase ();
    inicializaContadores();
    inicializaCronometro();
    verificaDigitacao();
    atualizaPlacar();
    botaoReiniciar.click(reiniciaJogo);

    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });

    $('.tooltip').tooltipster();

    $('.tooltip-custom').tooltipster({
        trigger: 'custom'
    });
});



function atualizaTamanhoFrase () {
    var frase = $('.frase').text();
    var numPalavras = frase.split(' ').length;
    var tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numPalavras);   
};


function inicializaContadores () {
    campo.val('');
    campo.on('input', function(){
        var conteudo = (campo.val());

        var qtdPalavras = conteudo.split(/\S+/).length -1;
        $('#contador-palavras').text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $('#contador-caracteres').text(qtdCaracteres);
    });
};


function inicializaCronometro () {
    campo.one('focus', function() {
        var tempoRestante = $('#tempo-digitacao').text();
        botaoReiniciar.attr('disabled', true);
        var cronometroId = setInterval (function() {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1){
                clearInterval (cronometroId);
                finalizaJogo();
            };
            
        }, 1000);
    });
};

function finalizaJogo () {
    campo.attr('disabled', true);
    campo.toggleClass('campo-desativado');
    inserePlacar();
};

function verificaDigitacao () {
    campo.on ('input', function() {
        var frase = $('.frase').text();
        var digitado = campo.val();
        var comparavel = frase.substring (0, digitado.length);
        if (digitado == comparavel){
            campo.addClass ('borda-verde');
            campo.removeClass ('borda-vermelha');
        } else {
            campo.addClass ('borda-vermelha');
            campo.removeClass ('borda-verde');
        };
    });
};

function atualizaTempoInicial (tempo) {
    tempoInicial = tempo;
    $('#tempo-digitacao').text(tempo);
}

function reiniciaJogo () {
    campo.val('');
    $('#tempo-digitacao').text(tempoInicial);
    tempoRestante = $('#tempo-digitacao').text();
    campo.attr('disabled', false);
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    inicializaCronometro();
    campo.toggleClass('campo-desativado');
    campo.removeClass ('borda-vermelha');
    campo.removeClass ('borda-verde');
};

