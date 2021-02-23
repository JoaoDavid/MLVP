import {LibZ3, Z3_config, Z3_context, Z3_solver, Z3_sort, Z3_symbol, Z3_ast, Z3_lbool} from "../libz3"
import {WasmJSInstance} from "../wasmInstance"
import {assert} from "../util"
import registerTest from "../testShim";

registerTest("simple_contradiction_string", function test(wasmInstance: WasmJSInstance) {
  var lib: LibZ3 = new LibZ3(wasmInstance)
  var config: Z3_config = lib.Z3_mk_config()
  console.log("config: ", config)
  var context: Z3_context = lib.Z3_mk_context(config)
  console.log("context: ", context)
  var solver: Z3_solver = lib.Z3_mk_solver(context)
  console.log("solver: ", solver)
  var int_sort: Z3_sort = lib.Z3_mk_int_sort(context)
  console.log("int_sort: ", int_sort)
  var s1: Z3_symbol = lib.Z3_mk_string_symbol(context, "a")
  console.log("s1: ", s1)
  var c1: Z3_ast = lib.Z3_mk_const(context, s1, int_sort)
  console.log("c1: ", c1)
  var s2: Z3_symbol = lib.Z3_mk_string_symbol(context, "b")
  console.log("s2: ", s2)
  var c2: Z3_ast = lib.Z3_mk_const(context, s2, int_sort)
  console.log("c2: ", c2)

  var eq: Z3_ast = lib.Z3_mk_eq(context, c1, c2)
  console.log('eq:', eq);
  var neq: Z3_ast = lib.Z3_mk_not(context, eq)
  console.log('neq:', neq);

  lib.Z3_solver_assert(context, solver, eq)
  lib.Z3_solver_assert(context, solver, neq)
  var res: Z3_lbool = lib.Z3_solver_check(context, solver)
  console.log('res:', res);
})
