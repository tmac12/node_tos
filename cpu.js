const os = require('os');
var cpuWin = require('windows-cpu');
var si = require('systeminformation');

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
        // callback style
        si.currentLoad(function(data) {
            io.emit('cpu', data.currentload);
        })
    }
}


module.exports = {
    getCpuLoad: getCpuLoad
};














