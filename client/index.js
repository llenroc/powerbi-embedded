
$("#showReport1").click(function() {
    $.getJSON("/report?id=1").done(function(config) {
        var $container = $('#reportContainer');
        var report = powerbi.embed($container.get(0), config);
    });
});

$("#showReport2").click(function() {
    $.getJSON("/report?id=2").done(function(config) {
        var $container = $('#reportContainer');
        var report = powerbi.embed($container.get(0), config);
    });
});
