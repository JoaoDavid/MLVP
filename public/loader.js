var testsRegistry = [
]
function registerTest(name, func) {
  testsRegistry.push([name, func])
}
var Module = {
  preRun: [],
  postRun: function() {
    for (var i in testsRegistry) {
      name = testsRegistry[i][0]
      fun = testsRegistry[i][1]
      try {
        console.log("Run test ", name)
        fun(Module)
        console.log("Succeeded! ", name)
      } catch (err) {
        console.log("Test ", name, " failed ", err)
      }
    }
  },
  print: (function() {
    return function(text) {
      console.log(text);
    };
  })(),
  printErr: function(text) {
    console.error(text);
  },
  canvas: (function() {
    return null;
  })(),
  setStatus: function(text) {
    console.log('Status: ', text)
  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
  },
};
Module.setStatus('Downloading...');
window.onerror = function(event) {
  Module.setStatus('Exception thrown, see JavaScript console');
  Module.setStatus = function(text) {
    if (text) Module.printErr('[post-exception status] ' + text);
  };
};
requirejs.config({
  paths: {
    "test": "test",
    "../ctypes": "ts/ctypes",
    "ctypes": "ts/ctypes",
    "../libz3": "ts/libz3",
    "libz3": "ts/libz3",
    "util": "ts/util",
    "../util": "ts/util",
    "wasmInstance": "ts/wasmInstance",
    "libz3.so": "libz3.so",
    "test_simple_contradiction": "ts/tests/test_simple_contradiction","test_parse": "ts/tests/test_parse","test_simple_contradiction_string_sym": "ts/tests/test_simple_contradiction_string_sym",
  },
  shim: {
    'libz3.so': {
    },
  },
  waitSeconds: 0,
});
requirejs(
  [
    "libz3.so",
    "test_simple_contradiction","test_parse","test_simple_contradiction_string_sym",
  ],
  () => {
 console.log("Loaded...");
      var statusElement = document.getElementById('status');
      var progressElement = document.getElementById('progress');
  }
);
