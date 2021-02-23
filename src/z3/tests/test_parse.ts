import {LibZ3, Z3_config, Z3_context} from "../libz3"
import {Void, Ptr, Uint32} from "../ctypes"
import {WasmJSInstance} from "../wasmInstance"
import {assert} from "../util"
import registerTest from "../testShim";

registerTest("parse", function test(wasmInstance: WasmJSInstance) {
  var lib: LibZ3 = new LibZ3(wasmInstance)
  var config: Z3_config = lib.Z3_mk_config()
  console.log("config: ", config)
  var context: Z3_context = lib.Z3_mk_context(config)
  console.log("context: ", context)
  let nullP = Ptr.nullPtr();
  var ast = lib.Z3_parse_smtlib2_string(context, "(declare-fun x () Int)", new Uint32(0), nullP, nullP, new Uint32(0), nullP, nullP)
  console.log("ast: ", ast)
})
