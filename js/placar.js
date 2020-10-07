$('#botao-placar').click (mostraPlacar);
$('#botao-sync').click (sincronizaPlacar);
var placar = $('.placar');

function inserePlacar() {
    var corpoTabela = placar.find('tbody');
    var usuario = $('#usuarios').val();
    var numPalavras = $('#contador-palavras').text();
    var linha = novaLinha (usuario, numPalavras);
    linha.find ('.botao-remover').click(removeLinha);
    corpoTabela.prepend(linha);
    placar.slideDown (500);
    scrollPlacar();
};

function scrollPlacar () {
    var posicaoPlacar = placar.offset().top;
    $('html').animate(
        {
            scrollTop: posicaoPlacar+'px'
        }, 1000);
};

function novaLinha (usuario, Palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $('<td>').text(usuario);
    var colunaPalavras = $('<td>').text(Palavras);
    var colunaRemover = $('<td>');
    var link = $('<a>').addClass('botao-remover').attr('href', '#');
    var icone = $('<i>').addClass('material-icons').addClass('small').text('delete');
    link.append (icone);
    colunaRemover.append(link);
    linha.append (colunaUsuario);
    linha.append (colunaPalavras);
    linha.append (colunaRemover);
    return linha;
};   

function removeLinha () {
    event.preventDefault();
    var tempoRemocao = 500;
    var linha = $(this).parent().parent();
    linha.fadeOut(tempoRemocao);
    setTimeout (function() {
        console.log('Vai remover');
        console.log(linha);
        linha.remove();
        console.log('Removeu');
    }, tempoRemocao);
};

function mostraPlacar () {
    placar.stop().slideToggle(600);
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        var score = {
            usuario: usuario,
            pontos: palavras
        };
        placar.push(score);
    });
    
    var dados = {
        placar: placar
    };

    $.post ('http://localhost:3000/placar',dados,function() {
        // alert ('Placar gravado no servidor');
        $('.tooltip-custom').tooltipster('open').tooltipster('content', 'Sucesso ao sincronizar');
        
    }).fail(function() {
        $('.tooltip-custom').tooltipster('open').tooltipster('content', 'Falha ao sincronizar');
    }).always (function() {
        setTimeout (function() {
            $('.tooltip-custom').tooltipster('close');
        }, 2000);
    });
}


function atualizaPlacar () {
    $.get ('http://localhost:3000/placar', function (retornoPlacar) {
        $(retornoPlacar).each (function() {
            var usuario = this.usuario;
            var palavras = this.pontos;
            linha = novaLinha(usuario, palavras);
            linha.find ('.botao-remover').click(removeLinha);
            $('tbody').append(linha);
        });
    });
}
