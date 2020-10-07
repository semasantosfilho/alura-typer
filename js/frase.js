$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

function fraseAleatoria () {
    $('#spinner').toggle();
    $.get('http://localhost:3000/frases', trocaFraseAleatoria)
    .fail (erroServidor)
    .always (paraSpinner);
};

function trocaFraseAleatoria (frasesRetornadas) {
    var frase = $('.frase');
    var numeroAleatorio = Math.floor (Math.random() * frasesRetornadas.length);
    frase.text(frasesRetornadas[numeroAleatorio].texto);
    atualizaTempoInicial (frasesRetornadas[numeroAleatorio].tempo);
    atualizaTamanhoFrase();
}

function buscaFrase () {
    var fraseId = $('#frase-id').val();
    var idEscolhido = { id: fraseId };
    $('#spinner').toggle();
    $.get('http://localhost:3000/frases', idEscolhido, trocaFrase)
    .fail (erroServidor)
    .always (paraSpinner);
}

function trocaFrase (fraseSelecionada) {
    var frase = $('.frase');
    frase.text(fraseSelecionada.texto);
    atualizaTempoInicial (fraseSelecionada.tempo);
    atualizaTamanhoFrase();
}

function erroServidor() {
    $('#erro').toggle();
    setTimeout (function() {
        $('#erro').toggle();
    },2000);
}

function paraSpinner () {
    $('#spinner').toggle();
}
