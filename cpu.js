const os = require('os');
var cpuWin = require('windows-cpu');

function getCpuLoad(io){
    var currOs = os.platform();
    if  (currOs=='win32'){
        //windows
        cpuWin.totalLoad(function(error, results) {
            if(error) {
                return console.log(error);
            }
            else{
                // results (single cpu in percent) =>
                // [8]
                
                // results (multi-cpu in percent) =>
                // [3, 10]
                io.emit('cpu', results);
            }
        });
    }
    else{
        //linux or other
        var cpuLoad = os.loadavg();
        io.emit('cpu', cpuLoad);
    }
}



//module.exports = exports = plugin

module.exports = {
    getCpuLoad: getCpuLoad
};














