
$.getJSON("/report").done(function(config) {
    var $container = $('#reportContainer');
    var report = powerbi.embed($container.get(0), config);
});
