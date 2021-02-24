define(["require", "exports", "../libz3", "../ctypes"], function (require, exports, libz3_1, ctypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    registerTest("parse", function test(wasmInstance) {
        var lib = new libz3_1.LibZ3(wasmInstance);
        var config = lib.Z3_mk_config();
        console.log("config: ", config);
        var context = lib.Z3_mk_context(config);
        console.log("context: ", context);
        let nullP = ctypes_1.Ptr.nullPtr();
        var ast = lib.Z3_parse_smtlib2_string(context, "(declare-fun x () Int)", new ctypes_1.Uint32(0), nullP, nullP, new ctypes_1.Uint32(0), nullP, nullP);
        console.log("ast: ", ast);
    });
});
