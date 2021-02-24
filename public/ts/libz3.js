define(["require", "exports", "./ctypes"], function (require, exports, ctypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LibZ3 = exports.Z3_model = exports.Z3_constructorList = exports.Z3_stats = exports.Z3_ast_arr = exports.Z3_model_arr = exports.Z3_func_entry = exports.Z3_symbol_arr = exports.Z3_config = exports.Z3_func_decl_arr = exports.Z3_fixedpoint = exports.Z3_sort = exports.Sint32Arr = exports.Bool = exports.Z3_param = exports.Z3_apply_result = exports.Z3_func_interp = exports.Uint64Arr = exports.Z3_tactic_arr = exports.Z3_constructor_list_arr = exports.Z3_solver = exports.Z3_ast = exports.Z3_symbol = exports.string_arr = exports.Z3_ast_map = exports.Z3_pattern_arr = exports.Uint32Arr = exports.Z3_param_descrs = exports.Z3_rcf_num_arr = exports.Z3_constructor_arr = exports.Z3_func_decl = exports.Z3_probe = exports.Z3_goal = exports.Z3_constructor = exports.Z3_ast_vector = exports.Z3_rcf_num = exports.Sint64Arr = exports.Z3_optimize = exports.Z3_ast_vector_arr = exports.Z3_sort_arr = exports.Z3_context = exports.Z3_pattern = exports.Z3_tactic = exports.Z3_lbool = void 0;
    class Z3_lbool extends ctypes_1.Uint8 {
    }
    exports.Z3_lbool = Z3_lbool;
    ;
    class Z3_tactic extends ctypes_1.Ptr {
    }
    exports.Z3_tactic = Z3_tactic;
    ;
    class Z3_pattern extends ctypes_1.Ptr {
    }
    exports.Z3_pattern = Z3_pattern;
    ;
    class Z3_context extends ctypes_1.Ptr {
    }
    exports.Z3_context = Z3_context;
    ;
    class Z3_sort_arr extends ctypes_1.Ptr {
    }
    exports.Z3_sort_arr = Z3_sort_arr;
    ;
    class Z3_ast_vector_arr extends ctypes_1.Ptr {
    }
    exports.Z3_ast_vector_arr = Z3_ast_vector_arr;
    ;
    class Z3_optimize extends ctypes_1.Ptr {
    }
    exports.Z3_optimize = Z3_optimize;
    ;
    class Sint64Arr extends ctypes_1.Ptr {
    }
    exports.Sint64Arr = Sint64Arr;
    ;
    class Z3_rcf_num extends ctypes_1.Ptr {
    }
    exports.Z3_rcf_num = Z3_rcf_num;
    ;
    class Z3_ast_vector extends ctypes_1.Ptr {
    }
    exports.Z3_ast_vector = Z3_ast_vector;
    ;
    class Z3_constructor extends ctypes_1.Ptr {
    }
    exports.Z3_constructor = Z3_constructor;
    ;
    class Z3_goal extends ctypes_1.Ptr {
    }
    exports.Z3_goal = Z3_goal;
    ;
    class Z3_probe extends ctypes_1.Ptr {
    }
    exports.Z3_probe = Z3_probe;
    ;
    class Z3_func_decl extends ctypes_1.Ptr {
    }
    exports.Z3_func_decl = Z3_func_decl;
    ;
    class Z3_constructor_arr extends ctypes_1.Ptr {
    }
    exports.Z3_constructor_arr = Z3_constructor_arr;
    ;
    class Z3_rcf_num_arr extends ctypes_1.Ptr {
    }
    exports.Z3_rcf_num_arr = Z3_rcf_num_arr;
    ;
    class Z3_param_descrs extends ctypes_1.Ptr {
    }
    exports.Z3_param_descrs = Z3_param_descrs;
    ;
    class Uint32Arr extends ctypes_1.Ptr {
    }
    exports.Uint32Arr = Uint32Arr;
    ;
    class Z3_pattern_arr extends ctypes_1.Ptr {
    }
    exports.Z3_pattern_arr = Z3_pattern_arr;
    ;
    class Z3_ast_map extends ctypes_1.Ptr {
    }
    exports.Z3_ast_map = Z3_ast_map;
    ;
    class string_arr extends ctypes_1.Ptr {
    }
    exports.string_arr = string_arr;
    ;
    class Z3_symbol extends ctypes_1.Ptr {
    }
    exports.Z3_symbol = Z3_symbol;
    ;
    class Z3_ast extends ctypes_1.Ptr {
    }
    exports.Z3_ast = Z3_ast;
    ;
    class Z3_solver extends ctypes_1.Ptr {
    }
    exports.Z3_solver = Z3_solver;
    ;
    class Z3_constructor_list_arr extends ctypes_1.Ptr {
    }
    exports.Z3_constructor_list_arr = Z3_constructor_list_arr;
    ;
    class Z3_tactic_arr extends ctypes_1.Ptr {
    }
    exports.Z3_tactic_arr = Z3_tactic_arr;
    ;
    class Uint64Arr extends ctypes_1.Ptr {
    }
    exports.Uint64Arr = Uint64Arr;
    ;
    class Z3_func_interp extends ctypes_1.Ptr {
    }
    exports.Z3_func_interp = Z3_func_interp;
    ;
    class Z3_apply_result extends ctypes_1.Ptr {
    }
    exports.Z3_apply_result = Z3_apply_result;
    ;
    class Z3_param extends ctypes_1.Ptr {
    }
    exports.Z3_param = Z3_param;
    ;
    class Bool extends ctypes_1.Uint8 {
    }
    exports.Bool = Bool;
    ;
    class Sint32Arr extends ctypes_1.Ptr {
    }
    exports.Sint32Arr = Sint32Arr;
    ;
    class Z3_sort extends ctypes_1.Ptr {
    }
    exports.Z3_sort = Z3_sort;
    ;
    class Z3_fixedpoint extends ctypes_1.Ptr {
    }
    exports.Z3_fixedpoint = Z3_fixedpoint;
    ;
    class Z3_func_decl_arr extends ctypes_1.Ptr {
    }
    exports.Z3_func_decl_arr = Z3_func_decl_arr;
    ;
    class Z3_config extends ctypes_1.Ptr {
    }
    exports.Z3_config = Z3_config;
    ;
    class Z3_symbol_arr extends ctypes_1.Ptr {
    }
    exports.Z3_symbol_arr = Z3_symbol_arr;
    ;
    class Z3_func_entry extends ctypes_1.Ptr {
    }
    exports.Z3_func_entry = Z3_func_entry;
    ;
    class Z3_model_arr extends ctypes_1.Ptr {
    }
    exports.Z3_model_arr = Z3_model_arr;
    ;
    class Z3_ast_arr extends ctypes_1.Ptr {
    }
    exports.Z3_ast_arr = Z3_ast_arr;
    ;
    class Z3_stats extends ctypes_1.Ptr {
    }
    exports.Z3_stats = Z3_stats;
    ;
    class Z3_constructorList extends ctypes_1.Ptr {
    }
    exports.Z3_constructorList = Z3_constructorList;
    ;
    class Z3_model extends ctypes_1.Ptr {
    }
    exports.Z3_model = Z3_model;
    ;
    class LibZ3 {
        constructor(wasmInstance) {
            this.wasmInstance = wasmInstance;
        }
        Z3_algebraic_add(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_algebraic_add', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_div(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_algebraic_div', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_eq(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_eq', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_eval(arg0, arg1, arg2, arg3) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_algebraic_eval', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_algebraic_ge(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_ge', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_gt(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_gt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_is_neg(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_is_neg', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_algebraic_is_pos(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_is_pos', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_algebraic_is_value(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_is_value', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_algebraic_is_zero(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_is_zero', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_algebraic_le(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_le', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_lt(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_lt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_mul(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_algebraic_mul', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_neq(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_algebraic_neq', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_power(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_algebraic_power', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_root(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_algebraic_root', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_algebraic_roots(arg0, arg1, arg2, arg3) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_algebraic_roots', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_algebraic_sign(arg0, arg1) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_algebraic_sign', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_algebraic_sub(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_algebraic_sub', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_app_to_ast(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_app_to_ast', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_append_log(arg0) {
            this.wasmInstance.ccall('Z3_append_log', 'number', ['string'], [arg0]);
        }
        Z3_apply_result_convert_model(arg0, arg1, arg2, arg3) {
            return new Z3_model(this.wasmInstance.ccall('Z3_apply_result_convert_model', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_apply_result_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_apply_result_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_apply_result_get_num_subgoals(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_apply_result_get_num_subgoals', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_apply_result_get_subgoal(arg0, arg1, arg2) {
            return new Z3_goal(this.wasmInstance.ccall('Z3_apply_result_get_subgoal', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_apply_result_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_apply_result_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_apply_result_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_apply_result_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_ast_map_contains(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_ast_map_contains', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_ast_map_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_ast_map_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_ast_map_erase(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_ast_map_erase', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_ast_map_find(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_ast_map_find', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_ast_map_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_ast_map_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_ast_map_insert(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_ast_map_insert', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_ast_map_keys(arg0, arg1) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_ast_map_keys', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_ast_map_reset(arg0, arg1) {
            this.wasmInstance.ccall('Z3_ast_map_reset', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_ast_map_size(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_ast_map_size', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_ast_map_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_ast_map_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_ast_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_ast_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_ast_vector_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_ast_vector_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_ast_vector_get(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_ast_vector_get', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_ast_vector_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_ast_vector_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_ast_vector_push(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_ast_vector_push', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_ast_vector_resize(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_ast_vector_resize', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_ast_vector_set(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_ast_vector_set', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_ast_vector_size(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_ast_vector_size', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_ast_vector_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_ast_vector_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_ast_vector_translate(arg0, arg1, arg2) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_ast_vector_translate', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_benchmark_to_smtlib_string(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return this.wasmInstance.ccall('Z3_benchmark_to_smtlib_string', 'string', ['number', 'string', 'string', 'string', 'string', 'number', 'number', 'number'], [arg0.val(), arg1, arg2, arg3, arg4, arg5.val(), arg6.val(), arg7.val()]);
        }
        Z3_check_interpolant(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_check_interpolant', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]));
        }
        Z3_close_log() {
            this.wasmInstance.ccall('Z3_close_log', 'number', [], []);
        }
        Z3_compute_interpolant(arg0, arg1, arg2, arg3, arg4) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_compute_interpolant', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_datatype_update_field(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_datatype_update_field', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_del_config(arg0) {
            this.wasmInstance.ccall('Z3_del_config', 'number', ['number'], [arg0.val()]);
        }
        Z3_del_constructor(arg0, arg1) {
            this.wasmInstance.ccall('Z3_del_constructor', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_del_constructor_list(arg0, arg1) {
            this.wasmInstance.ccall('Z3_del_constructor_list', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_del_context(arg0) {
            this.wasmInstance.ccall('Z3_del_context', 'number', ['number'], [arg0.val()]);
        }
        Z3_disable_trace(arg0) {
            this.wasmInstance.ccall('Z3_disable_trace', 'number', ['string'], [arg0]);
        }
        Z3_enable_trace(arg0) {
            this.wasmInstance.ccall('Z3_enable_trace', 'number', ['string'], [arg0]);
        }
        Z3_finalize_memory() {
            this.wasmInstance.ccall('Z3_finalize_memory', 'number', [], []);
        }
        Z3_fixedpoint_add_cover(arg0, arg1, arg2, arg3, arg4) {
            this.wasmInstance.ccall('Z3_fixedpoint_add_cover', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]);
        }
        Z3_fixedpoint_add_fact(arg0, arg1, arg2, arg3, arg4) {
            this.wasmInstance.ccall('Z3_fixedpoint_add_fact', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]);
        }
        Z3_fixedpoint_add_rule(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_fixedpoint_add_rule', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_fixedpoint_assert(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_fixedpoint_assert', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_fixedpoint_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_fixedpoint_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_fixedpoint_from_file(arg0, arg1, arg2) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_fixedpoint_from_file', 'number', ['number', 'number', 'string'], [arg0.val(), arg1.val(), arg2]));
        }
        Z3_fixedpoint_from_string(arg0, arg1, arg2) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_fixedpoint_from_string', 'number', ['number', 'number', 'string'], [arg0.val(), arg1.val(), arg2]));
        }
        Z3_fixedpoint_get_answer(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_fixedpoint_get_answer', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fixedpoint_get_assertions(arg0, arg1) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_fixedpoint_get_assertions', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fixedpoint_get_cover_delta(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_fixedpoint_get_cover_delta', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_fixedpoint_get_help(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_fixedpoint_get_help', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_fixedpoint_get_num_levels(arg0, arg1, arg2) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_fixedpoint_get_num_levels', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_fixedpoint_get_param_descrs(arg0, arg1) {
            return new Z3_param_descrs(this.wasmInstance.ccall('Z3_fixedpoint_get_param_descrs', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fixedpoint_get_reason_unknown(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_fixedpoint_get_reason_unknown', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_fixedpoint_get_rules(arg0, arg1) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_fixedpoint_get_rules', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fixedpoint_get_statistics(arg0, arg1) {
            return new Z3_stats(this.wasmInstance.ccall('Z3_fixedpoint_get_statistics', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fixedpoint_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_fixedpoint_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_fixedpoint_pop(arg0, arg1) {
            this.wasmInstance.ccall('Z3_fixedpoint_pop', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_fixedpoint_push(arg0, arg1) {
            this.wasmInstance.ccall('Z3_fixedpoint_push', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_fixedpoint_query(arg0, arg1, arg2) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_fixedpoint_query', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_fixedpoint_query_relations(arg0, arg1, arg2, arg3) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_fixedpoint_query_relations', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_fixedpoint_register_relation(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_fixedpoint_register_relation', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_fixedpoint_set_params(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_fixedpoint_set_params', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_fixedpoint_set_predicate_representation(arg0, arg1, arg2, arg3, arg4) {
            this.wasmInstance.ccall('Z3_fixedpoint_set_predicate_representation', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]);
        }
        Z3_fixedpoint_to_string(arg0, arg1, arg2, arg3) {
            return this.wasmInstance.ccall('Z3_fixedpoint_to_string', 'string', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_fixedpoint_update_rule(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_fixedpoint_update_rule', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_fpa_get_ebits(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_fpa_get_ebits', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_get_numeral_exponent_bv(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_fpa_get_numeral_exponent_bv', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_fpa_get_numeral_exponent_int64(arg0, arg1, arg2, arg3) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_get_numeral_exponent_int64', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_fpa_get_numeral_exponent_string(arg0, arg1, arg2) {
            return this.wasmInstance.ccall('Z3_fpa_get_numeral_exponent_string', 'string', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_fpa_get_numeral_sign(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_get_numeral_sign', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_fpa_get_numeral_sign_bv(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_fpa_get_numeral_sign_bv', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_get_numeral_significand_bv(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_fpa_get_numeral_significand_bv', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_get_numeral_significand_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_fpa_get_numeral_significand_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_fpa_get_numeral_significand_uint64(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_get_numeral_significand_uint64', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_fpa_get_sbits(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_fpa_get_sbits', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_is_numeral_inf(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_is_numeral_inf', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_is_numeral_nan(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_is_numeral_nan', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_is_numeral_negative(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_is_numeral_negative', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_is_numeral_normal(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_is_numeral_normal', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_is_numeral_positive(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_is_numeral_positive', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_is_numeral_subnormal(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_is_numeral_subnormal', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_fpa_is_numeral_zero(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_fpa_is_numeral_zero', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_func_decl_to_ast(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_func_decl_to_ast', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_func_decl_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_func_decl_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_func_entry_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_func_entry_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_func_entry_get_arg(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_func_entry_get_arg', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_func_entry_get_num_args(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_func_entry_get_num_args', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_func_entry_get_value(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_func_entry_get_value', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_func_entry_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_func_entry_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_func_interp_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_func_interp_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_func_interp_get_arity(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_func_interp_get_arity', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_func_interp_get_else(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_func_interp_get_else', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_func_interp_get_entry(arg0, arg1, arg2) {
            return new Z3_func_entry(this.wasmInstance.ccall('Z3_func_interp_get_entry', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_func_interp_get_num_entries(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_func_interp_get_num_entries', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_func_interp_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_func_interp_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_get_algebraic_number_lower(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_algebraic_number_lower', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_algebraic_number_upper(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_algebraic_number_upper', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_app_arg(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_app_arg', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_app_decl(arg0, arg1) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_get_app_decl', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_app_num_args(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_app_num_args', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_arity(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_arity', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_array_sort_domain(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_get_array_sort_domain', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_array_sort_range(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_get_array_sort_range', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_as_array_func_decl(arg0, arg1) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_get_as_array_func_decl', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_ast_hash(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_ast_hash', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_ast_id(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_ast_id', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_ast_kind(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_ast_kind', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_bool_value(arg0, arg1) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_get_bool_value', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_bv_sort_size(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_bv_sort_size', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_datatype_sort_constructor(arg0, arg1, arg2) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_get_datatype_sort_constructor', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_datatype_sort_constructor_accessor(arg0, arg1, arg2, arg3) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_get_datatype_sort_constructor_accessor', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_get_datatype_sort_num_constructors(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_datatype_sort_num_constructors', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_datatype_sort_recognizer(arg0, arg1, arg2) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_get_datatype_sort_recognizer', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_decl_ast_parameter(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_decl_ast_parameter', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_decl_double_parameter(arg0, arg1, arg2) {
            return new ctypes_1.Double(this.wasmInstance.ccall('Z3_get_decl_double_parameter', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_decl_func_decl_parameter(arg0, arg1, arg2) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_get_decl_func_decl_parameter', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_decl_int_parameter(arg0, arg1, arg2) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_get_decl_int_parameter', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_decl_kind(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_decl_kind', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_decl_name(arg0, arg1) {
            return new Z3_symbol(this.wasmInstance.ccall('Z3_get_decl_name', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_decl_num_parameters(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_decl_num_parameters', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_decl_parameter_kind(arg0, arg1, arg2) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_decl_parameter_kind', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_decl_rational_parameter(arg0, arg1, arg2) {
            return this.wasmInstance.ccall('Z3_get_decl_rational_parameter', 'string', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_get_decl_sort_parameter(arg0, arg1, arg2) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_get_decl_sort_parameter', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_decl_symbol_parameter(arg0, arg1, arg2) {
            return new Z3_symbol(this.wasmInstance.ccall('Z3_get_decl_symbol_parameter', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_denominator(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_denominator', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_domain(arg0, arg1, arg2) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_get_domain', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_domain_size(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_domain_size', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_error_code(arg0) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_error_code', 'number', ['number'], [arg0.val()]));
        }
        Z3_get_error_msg(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_get_error_msg', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_get_estimated_alloc_size() {
            return new ctypes_1.Uint64(this.wasmInstance.ccall('Z3_get_estimated_alloc_size', 'number', [], []));
        }
        Z3_get_finite_domain_sort_size(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_get_finite_domain_sort_size', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_full_version() {
            return this.wasmInstance.ccall('Z3_get_full_version', 'string', [], []);
        }
        Z3_get_func_decl_id(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_func_decl_id', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_implied_equalities(arg0, arg1, arg2, arg3, arg4) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_get_implied_equalities', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_get_index_value(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_index_value', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_interpolant(arg0, arg1, arg2, arg3) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_get_interpolant', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_get_num_probes(arg0) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_num_probes', 'number', ['number'], [arg0.val()]));
        }
        Z3_get_num_tactics(arg0) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_num_tactics', 'number', ['number'], [arg0.val()]));
        }
        Z3_get_numeral_decimal_string(arg0, arg1, arg2) {
            return this.wasmInstance.ccall('Z3_get_numeral_decimal_string', 'string', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_get_numeral_int(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_get_numeral_int', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_numeral_int64(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_get_numeral_int64', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_numeral_rational_int64(arg0, arg1, arg2, arg3) {
            return new Bool(this.wasmInstance.ccall('Z3_get_numeral_rational_int64', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_get_numeral_small(arg0, arg1, arg2, arg3) {
            return new Bool(this.wasmInstance.ccall('Z3_get_numeral_small', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_get_numeral_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_get_numeral_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_get_numeral_uint(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_get_numeral_uint', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_numeral_uint64(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_get_numeral_uint64', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_numerator(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_numerator', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_pattern(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_pattern', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_pattern_num_terms(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_pattern_num_terms', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_probe_name(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_get_probe_name', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_get_quantifier_body(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_quantifier_body', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_quantifier_bound_name(arg0, arg1, arg2) {
            return new Z3_symbol(this.wasmInstance.ccall('Z3_get_quantifier_bound_name', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_quantifier_bound_sort(arg0, arg1, arg2) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_get_quantifier_bound_sort', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_quantifier_no_pattern_ast(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_quantifier_no_pattern_ast', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_quantifier_num_bound(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_quantifier_num_bound', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_quantifier_num_no_patterns(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_quantifier_num_no_patterns', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_quantifier_num_patterns(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_quantifier_num_patterns', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_quantifier_pattern_ast(arg0, arg1, arg2) {
            return new Z3_pattern(this.wasmInstance.ccall('Z3_get_quantifier_pattern_ast', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_quantifier_weight(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_quantifier_weight', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_range(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_get_range', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_relation_arity(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_relation_arity', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_relation_column(arg0, arg1, arg2) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_get_relation_column', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_smtlib_assumption(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_smtlib_assumption', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_smtlib_decl(arg0, arg1) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_get_smtlib_decl', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_smtlib_error(arg0) {
            return this.wasmInstance.ccall('Z3_get_smtlib_error', 'string', ['number'], [arg0.val()]);
        }
        Z3_get_smtlib_formula(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_get_smtlib_formula', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_smtlib_num_assumptions(arg0) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_smtlib_num_assumptions', 'number', ['number'], [arg0.val()]));
        }
        Z3_get_smtlib_num_decls(arg0) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_smtlib_num_decls', 'number', ['number'], [arg0.val()]));
        }
        Z3_get_smtlib_num_formulas(arg0) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_smtlib_num_formulas', 'number', ['number'], [arg0.val()]));
        }
        Z3_get_smtlib_num_sorts(arg0) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_smtlib_num_sorts', 'number', ['number'], [arg0.val()]));
        }
        Z3_get_smtlib_sort(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_get_smtlib_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_sort(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_get_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_sort_id(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_sort_id', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_sort_kind(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_sort_kind', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_sort_name(arg0, arg1) {
            return new Z3_symbol(this.wasmInstance.ccall('Z3_get_sort_name', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_get_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_get_symbol_int(arg0, arg1) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_get_symbol_int', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_symbol_kind(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_symbol_kind', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_symbol_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_get_symbol_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_get_tactic_name(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_get_tactic_name', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_get_tuple_sort_field_decl(arg0, arg1, arg2) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_get_tuple_sort_field_decl', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_get_tuple_sort_mk_decl(arg0, arg1) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_get_tuple_sort_mk_decl', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_tuple_sort_num_fields(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_get_tuple_sort_num_fields', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_get_version(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_get_version', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_global_param_get(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_global_param_get', 'number', ['string', 'number'], [arg0, arg1.val()]));
        }
        Z3_global_param_reset_all() {
            this.wasmInstance.ccall('Z3_global_param_reset_all', 'number', [], []);
        }
        Z3_global_param_set(arg0, arg1) {
            this.wasmInstance.ccall('Z3_global_param_set', 'number', ['string', 'string'], [arg0, arg1]);
        }
        Z3_goal_assert(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_goal_assert', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_goal_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_goal_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_goal_depth(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_goal_depth', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_goal_formula(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_goal_formula', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_goal_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_goal_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_goal_inconsistent(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_goal_inconsistent', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_goal_is_decided_sat(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_goal_is_decided_sat', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_goal_is_decided_unsat(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_goal_is_decided_unsat', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_goal_num_exprs(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_goal_num_exprs', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_goal_precision(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_goal_precision', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_goal_reset(arg0, arg1) {
            this.wasmInstance.ccall('Z3_goal_reset', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_goal_size(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_goal_size', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_goal_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_goal_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_goal_translate(arg0, arg1, arg2) {
            return new Z3_goal(this.wasmInstance.ccall('Z3_goal_translate', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_interpolation_profile(arg0) {
            return this.wasmInstance.ccall('Z3_interpolation_profile', 'string', ['number'], [arg0.val()]);
        }
        Z3_interrupt(arg0) {
            this.wasmInstance.ccall('Z3_interrupt', 'number', ['number'], [arg0.val()]);
        }
        Z3_is_algebraic_number(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_algebraic_number', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_is_app(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_app', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_is_as_array(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_as_array', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_is_eq_ast(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_is_eq_ast', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_is_eq_func_decl(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_is_eq_func_decl', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_is_eq_sort(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_is_eq_sort', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_is_numeral_ast(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_numeral_ast', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_is_quantifier_forall(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_quantifier_forall', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_is_re_sort(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_re_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_is_seq_sort(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_seq_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_is_string(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_string', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_is_string_sort(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_string_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_is_well_sorted(arg0, arg1) {
            return new Bool(this.wasmInstance.ccall('Z3_is_well_sorted', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_add(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_add', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_and(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_and', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_app(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_app', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_array_default(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_array_default', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_array_ext(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_array_ext', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_array_sort(arg0, arg1, arg2) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_array_sort', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_ast_map(arg0) {
            return new Z3_ast_map(this.wasmInstance.ccall('Z3_mk_ast_map', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_ast_vector(arg0) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_mk_ast_vector', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_atleast(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_atleast', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_atmost(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_atmost', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_bool_sort(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_bool_sort', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_bound(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bound', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bv2int(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bv2int', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bv_sort(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_bv_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_bvadd(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvadd', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvadd_no_overflow(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvadd_no_overflow', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_bvadd_no_underflow(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvadd_no_underflow', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvand(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvand', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvashr(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvashr', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvlshr(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvlshr', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvmul(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvmul', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvmul_no_overflow(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvmul_no_overflow', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_bvmul_no_underflow(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvmul_no_underflow', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvnand(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvnand', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvneg(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvneg', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_bvneg_no_overflow(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvneg_no_overflow', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_bvnor(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvnor', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvnot(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvnot', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_bvor(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvor', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvredand(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvredand', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_bvredor(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvredor', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_bvsdiv(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsdiv', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvsdiv_no_overflow(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsdiv_no_overflow', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvsge(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsge', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvsgt(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsgt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvshl(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvshl', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvsle(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsle', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvslt(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvslt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvsmod(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsmod', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvsrem(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsrem', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvsub(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsub', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvsub_no_overflow(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsub_no_overflow', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvsub_no_underflow(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvsub_no_underflow', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_bvudiv(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvudiv', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvuge(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvuge', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvugt(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvugt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvule(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvule', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvult(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvult', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvurem(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvurem', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvxnor(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvxnor', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_bvxor(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_bvxor', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_concat(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_concat', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_config() {
            return new Z3_config(this.wasmInstance.ccall('Z3_mk_config', 'number', [], []));
        }
        Z3_mk_const(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_const', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_const_array(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_const_array', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_constructor(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            return new Z3_constructor(this.wasmInstance.ccall('Z3_mk_constructor', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val()]));
        }
        Z3_mk_constructor_list(arg0, arg1, arg2) {
            return new Z3_constructorList(this.wasmInstance.ccall('Z3_mk_constructor_list', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_context(arg0) {
            return new Z3_context(this.wasmInstance.ccall('Z3_mk_context', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_context_rc(arg0) {
            return new Z3_context(this.wasmInstance.ccall('Z3_mk_context_rc', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_datatype(arg0, arg1, arg2, arg3) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_datatype', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_datatypes(arg0, arg1, arg2, arg3, arg4) {
            this.wasmInstance.ccall('Z3_mk_datatypes', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]);
        }
        Z3_mk_distinct(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_distinct', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_div(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_div', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_empty_set(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_empty_set', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_enumeration_sort(arg0, arg1, arg2, arg3, arg4, arg5) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_enumeration_sort', 'number', ['number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val()]));
        }
        Z3_mk_eq(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_eq', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_exists(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_exists', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]));
        }
        Z3_mk_exists_const(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_exists_const', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val()]));
        }
        Z3_mk_ext_rotate_left(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_ext_rotate_left', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_ext_rotate_right(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_ext_rotate_right', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_extract(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_extract', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_false(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_false', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_finite_domain_sort(arg0, arg1, arg2) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_finite_domain_sort', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fixedpoint(arg0) {
            return new Z3_fixedpoint(this.wasmInstance.ccall('Z3_mk_fixedpoint', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_forall(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_forall', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]));
        }
        Z3_mk_forall_const(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_forall_const', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val()]));
        }
        Z3_mk_fpa_abs(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_abs', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_add(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_add', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_div(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_div', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_eq(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_eq', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_fma(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_fma', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_mk_fpa_fp(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_fp', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_geq(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_geq', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_gt(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_gt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_inf(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_inf', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_is_infinite(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_is_infinite', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_is_nan(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_is_nan', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_is_negative(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_is_negative', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_is_normal(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_is_normal', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_is_positive(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_is_positive', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_is_subnormal(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_is_subnormal', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_is_zero(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_is_zero', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_leq(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_leq', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_lt(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_lt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_max(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_max', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_min(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_min', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_mul(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_mul', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_nan(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_nan', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_neg(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_neg', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_numeral_double(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_numeral_double', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_numeral_float(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_numeral_float', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_numeral_int(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_numeral_int', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_numeral_int64_uint64(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_numeral_int64_uint64', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_mk_fpa_numeral_int_uint(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_numeral_int_uint', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_mk_fpa_rem(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_rem', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_rna(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_rna', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_rne(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_rne', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_round_nearest_ties_to_away(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_round_nearest_ties_to_away', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_round_nearest_ties_to_even(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_round_nearest_ties_to_even', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_round_to_integral(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_round_to_integral', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_round_toward_negative(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_round_toward_negative', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_round_toward_positive(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_round_toward_positive', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_round_toward_zero(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_round_toward_zero', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_rounding_mode_sort(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_rounding_mode_sort', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_rtn(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_rtn', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_rtp(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_rtp', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_rtz(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_rtz', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_sort(arg0, arg1, arg2) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_sort', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_sort_128(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_sort_128', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_sort_16(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_sort_16', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_sort_32(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_sort_32', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_sort_64(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_sort_64', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_sort_double(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_sort_double', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_sort_half(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_sort_half', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_sort_quadruple(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_sort_quadruple', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_sort_single(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_fpa_sort_single', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_fpa_sqrt(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_sqrt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_sub(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_sub', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_to_fp_bv(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_fp_bv', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fpa_to_fp_float(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_fp_float', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_to_fp_int_real(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_fp_int_real', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_mk_fpa_to_fp_real(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_fp_real', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_to_fp_signed(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_fp_signed', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_to_fp_unsigned(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_fp_unsigned', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_to_ieee_bv(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_ieee_bv', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_to_real(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_real', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_fpa_to_sbv(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_sbv', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_to_ubv(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_to_ubv', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_fpa_zero(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fpa_zero', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_fresh_const(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_fresh_const', 'number', ['number', 'string', 'number'], [arg0.val(), arg1, arg2.val()]));
        }
        Z3_mk_fresh_func_decl(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_mk_fresh_func_decl', 'number', ['number', 'string', 'number', 'number', 'number'], [arg0.val(), arg1, arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_mk_full_set(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_full_set', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_func_decl(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_mk_func_decl', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_mk_ge(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_ge', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_goal(arg0, arg1, arg2, arg3) {
            return new Z3_goal(this.wasmInstance.ccall('Z3_mk_goal', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_gt(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_gt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_iff(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_iff', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_implies(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_implies', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_int(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_int', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_int2bv(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_int2bv', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_int2real(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_int2real', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_int64(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_int64', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_int_sort(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_int_sort', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_int_symbol(arg0, arg1) {
            return new Z3_symbol(this.wasmInstance.ccall('Z3_mk_int_symbol', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_int_to_str(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_int_to_str', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_interpolant(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_interpolant', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_interpolation_context(arg0) {
            return new Z3_context(this.wasmInstance.ccall('Z3_mk_interpolation_context', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_is_int(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_is_int', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_ite(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_ite', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_le(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_le', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_list_sort(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_list_sort', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val(), arg8.val()]));
        }
        Z3_mk_lt(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_lt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_map(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_map', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_mod(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_mod', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_mul(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_mul', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_not(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_not', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_numeral(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_numeral', 'number', ['number', 'string', 'number'], [arg0.val(), arg1, arg2.val()]));
        }
        Z3_mk_optimize(arg0) {
            return new Z3_optimize(this.wasmInstance.ccall('Z3_mk_optimize', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_or(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_or', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_params(arg0) {
            return new Z3_param(this.wasmInstance.ccall('Z3_mk_params', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_pattern(arg0, arg1, arg2) {
            return new Z3_pattern(this.wasmInstance.ccall('Z3_mk_pattern', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_pbeq(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_pbeq', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_mk_pbge(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_pbge', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_mk_pble(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_pble', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_mk_power(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_power', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_probe(arg0, arg1) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_mk_probe', 'number', ['number', 'string'], [arg0.val(), arg1]));
        }
        Z3_mk_quantifier(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_quantifier', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val(), arg8.val()]));
        }
        Z3_mk_quantifier_const(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_quantifier_const', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]));
        }
        Z3_mk_quantifier_const_ex(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_quantifier_const_ex', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val(), arg8.val(), arg9.val(), arg10.val(), arg11.val()]));
        }
        Z3_mk_quantifier_ex(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_quantifier_ex', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val(), arg8.val(), arg9.val(), arg10.val(), arg11.val(), arg12.val()]));
        }
        Z3_mk_re_complement(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_complement', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_re_concat(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_concat', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_re_empty(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_empty', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_re_full(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_full', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_re_intersect(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_intersect', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_re_loop(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_loop', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_re_option(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_option', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_re_plus(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_plus', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_re_range(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_range', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_re_sort(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_re_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_re_star(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_star', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_re_union(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_re_union', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_real(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_real', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_real2int(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_real2int', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_real_sort(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_real_sort', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_rem(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_rem', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_repeat(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_repeat', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_rotate_left(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_rotate_left', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_rotate_right(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_rotate_right', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_select(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_select', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_seq_at(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_at', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_seq_concat(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_concat', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_seq_contains(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_contains', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_seq_empty(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_empty', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_seq_extract(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_extract', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_seq_in_re(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_in_re', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_seq_index(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_index', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_seq_length(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_length', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_seq_prefix(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_prefix', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_seq_replace(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_replace', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_seq_sort(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_seq_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_seq_suffix(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_suffix', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_seq_to_re(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_to_re', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_seq_unit(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_seq_unit', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_set_add(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_set_add', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_set_complement(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_set_complement', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_set_del(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_set_del', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_set_difference(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_set_difference', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_set_intersect(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_set_intersect', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_set_member(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_set_member', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_set_sort(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_set_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_set_subset(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_set_subset', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_set_union(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_set_union', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_sign_ext(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_sign_ext', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_simple_solver(arg0) {
            return new Z3_solver(this.wasmInstance.ccall('Z3_mk_simple_solver', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_solver(arg0) {
            return new Z3_solver(this.wasmInstance.ccall('Z3_mk_solver', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_solver_for_logic(arg0, arg1) {
            return new Z3_solver(this.wasmInstance.ccall('Z3_mk_solver_for_logic', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_solver_from_tactic(arg0, arg1) {
            return new Z3_solver(this.wasmInstance.ccall('Z3_mk_solver_from_tactic', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_store(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_store', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_mk_str_to_int(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_str_to_int', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_string(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_string', 'number', ['number', 'string'], [arg0.val(), arg1]));
        }
        Z3_mk_string_sort(arg0) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_string_sort', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_string_symbol(arg0, arg1) {
            return new Z3_symbol(this.wasmInstance.ccall('Z3_mk_string_symbol', 'number', ['number', 'string'], [arg0.val(), arg1]));
        }
        Z3_mk_sub(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_sub', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_tactic(arg0, arg1) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_mk_tactic', 'number', ['number', 'string'], [arg0.val(), arg1]));
        }
        Z3_mk_true(arg0) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_true', 'number', ['number'], [arg0.val()]));
        }
        Z3_mk_tuple_sort(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_tuple_sort', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val()]));
        }
        Z3_mk_unary_minus(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_unary_minus', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_uninterpreted_sort(arg0, arg1) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_mk_uninterpreted_sort', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_mk_unsigned_int(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_unsigned_int', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_unsigned_int64(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_unsigned_int64', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_xor(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_xor', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_mk_zero_ext(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_mk_zero_ext', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_model_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_model_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_model_eval(arg0, arg1, arg2, arg3, arg4) {
            return new Bool(this.wasmInstance.ccall('Z3_model_eval', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_model_get_const_decl(arg0, arg1, arg2) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_model_get_const_decl', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_model_get_const_interp(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_model_get_const_interp', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_model_get_func_decl(arg0, arg1, arg2) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_model_get_func_decl', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_model_get_func_interp(arg0, arg1, arg2) {
            return new Z3_func_interp(this.wasmInstance.ccall('Z3_model_get_func_interp', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_model_get_num_consts(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_model_get_num_consts', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_model_get_num_funcs(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_model_get_num_funcs', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_model_get_num_sorts(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_model_get_num_sorts', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_model_get_sort(arg0, arg1, arg2) {
            return new Z3_sort(this.wasmInstance.ccall('Z3_model_get_sort', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_model_get_sort_universe(arg0, arg1, arg2) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_model_get_sort_universe', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_model_has_interp(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_model_has_interp', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_model_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_model_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_model_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_model_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_open_log(arg0) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_open_log', 'number', ['string'], [arg0]));
        }
        Z3_optimize_assert(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_optimize_assert', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_optimize_assert_soft(arg0, arg1, arg2, arg3, arg4) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_optimize_assert_soft', 'number', ['number', 'number', 'number', 'string', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3, arg4.val()]));
        }
        Z3_optimize_check(arg0, arg1) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_optimize_check', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_optimize_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_optimize_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_optimize_from_file(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_optimize_from_file', 'number', ['number', 'number', 'string'], [arg0.val(), arg1.val(), arg2]);
        }
        Z3_optimize_from_string(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_optimize_from_string', 'number', ['number', 'number', 'string'], [arg0.val(), arg1.val(), arg2]);
        }
        Z3_optimize_get_assertions(arg0, arg1) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_optimize_get_assertions', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_optimize_get_help(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_optimize_get_help', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_optimize_get_lower(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_optimize_get_lower', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_optimize_get_lower_as_vector(arg0, arg1, arg2) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_optimize_get_lower_as_vector', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_optimize_get_model(arg0, arg1) {
            return new Z3_model(this.wasmInstance.ccall('Z3_optimize_get_model', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_optimize_get_objectives(arg0, arg1) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_optimize_get_objectives', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_optimize_get_param_descrs(arg0, arg1) {
            return new Z3_param_descrs(this.wasmInstance.ccall('Z3_optimize_get_param_descrs', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_optimize_get_reason_unknown(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_optimize_get_reason_unknown', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_optimize_get_statistics(arg0, arg1) {
            return new Z3_stats(this.wasmInstance.ccall('Z3_optimize_get_statistics', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_optimize_get_upper(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_optimize_get_upper', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_optimize_get_upper_as_vector(arg0, arg1, arg2) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_optimize_get_upper_as_vector', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_optimize_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_optimize_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_optimize_maximize(arg0, arg1, arg2) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_optimize_maximize', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_optimize_minimize(arg0, arg1, arg2) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_optimize_minimize', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_optimize_pop(arg0, arg1) {
            this.wasmInstance.ccall('Z3_optimize_pop', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_optimize_push(arg0, arg1) {
            this.wasmInstance.ccall('Z3_optimize_push', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_optimize_set_params(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_optimize_set_params', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_optimize_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_optimize_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_param_descrs_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_param_descrs_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_param_descrs_get_documentation(arg0, arg1, arg2) {
            return this.wasmInstance.ccall('Z3_param_descrs_get_documentation', 'string', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_param_descrs_get_kind(arg0, arg1, arg2) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_param_descrs_get_kind', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_param_descrs_get_name(arg0, arg1, arg2) {
            return new Z3_symbol(this.wasmInstance.ccall('Z3_param_descrs_get_name', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_param_descrs_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_param_descrs_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_param_descrs_size(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_param_descrs_size', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_param_descrs_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_param_descrs_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_params_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_params_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_params_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_params_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_params_set_bool(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_params_set_bool', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_params_set_double(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_params_set_double', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_params_set_symbol(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_params_set_symbol', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_params_set_uint(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_params_set_uint', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_params_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_params_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_params_validate(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_params_validate', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_parse_smtlib2_file(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_parse_smtlib2_file', 'number', ['number', 'string', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1, arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]));
        }
        Z3_parse_smtlib2_string(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_parse_smtlib2_string', 'number', ['number', 'string', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1, arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]));
        }
        Z3_parse_smtlib_file(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            this.wasmInstance.ccall('Z3_parse_smtlib_file', 'number', ['number', 'string', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1, arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]);
        }
        Z3_parse_smtlib_string(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            this.wasmInstance.ccall('Z3_parse_smtlib_string', 'number', ['number', 'string', 'number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1, arg2.val(), arg3.val(), arg4.val(), arg5.val(), arg6.val(), arg7.val()]);
        }
        Z3_pattern_to_ast(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_pattern_to_ast', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_pattern_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_pattern_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_polynomial_subresultants(arg0, arg1, arg2, arg3) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_polynomial_subresultants', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_probe_and(arg0, arg1, arg2) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_probe_and', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_probe_apply(arg0, arg1, arg2) {
            return new ctypes_1.Double(this.wasmInstance.ccall('Z3_probe_apply', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_probe_const(arg0, arg1) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_probe_const', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_probe_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_probe_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_probe_eq(arg0, arg1, arg2) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_probe_eq', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_probe_ge(arg0, arg1, arg2) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_probe_ge', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_probe_get_descr(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_probe_get_descr', 'string', ['number', 'string'], [arg0.val(), arg1]);
        }
        Z3_probe_gt(arg0, arg1, arg2) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_probe_gt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_probe_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_probe_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_probe_le(arg0, arg1, arg2) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_probe_le', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_probe_lt(arg0, arg1, arg2) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_probe_lt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_probe_not(arg0, arg1) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_probe_not', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_probe_or(arg0, arg1, arg2) {
            return new Z3_probe(this.wasmInstance.ccall('Z3_probe_or', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_query_constructor(arg0, arg1, arg2, arg3, arg4, arg5) {
            this.wasmInstance.ccall('Z3_query_constructor', 'number', ['number', 'number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val(), arg5.val()]);
        }
        Z3_rcf_add(arg0, arg1, arg2) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_add', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_del(arg0, arg1) {
            this.wasmInstance.ccall('Z3_rcf_del', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_rcf_div(arg0, arg1, arg2) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_div', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_eq(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_rcf_eq', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_ge(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_rcf_ge', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_get_numerator_denominator(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_rcf_get_numerator_denominator', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_rcf_gt(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_rcf_gt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_inv(arg0, arg1) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_inv', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_rcf_le(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_rcf_le', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_lt(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_rcf_lt', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_mk_e(arg0) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_mk_e', 'number', ['number'], [arg0.val()]));
        }
        Z3_rcf_mk_infinitesimal(arg0) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_mk_infinitesimal', 'number', ['number'], [arg0.val()]));
        }
        Z3_rcf_mk_pi(arg0) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_mk_pi', 'number', ['number'], [arg0.val()]));
        }
        Z3_rcf_mk_rational(arg0, arg1) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_mk_rational', 'number', ['number', 'string'], [arg0.val(), arg1]));
        }
        Z3_rcf_mk_roots(arg0, arg1, arg2, arg3) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_rcf_mk_roots', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_rcf_mk_small_int(arg0, arg1) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_mk_small_int', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_rcf_mul(arg0, arg1, arg2) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_mul', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_neg(arg0, arg1) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_neg', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_rcf_neq(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_rcf_neq', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_num_to_decimal_string(arg0, arg1, arg2) {
            return this.wasmInstance.ccall('Z3_rcf_num_to_decimal_string', 'string', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_rcf_num_to_string(arg0, arg1, arg2, arg3) {
            return this.wasmInstance.ccall('Z3_rcf_num_to_string', 'string', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_rcf_power(arg0, arg1, arg2) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_power', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_rcf_sub(arg0, arg1, arg2) {
            return new Z3_rcf_num(this.wasmInstance.ccall('Z3_rcf_sub', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_read_interpolation_problem(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_read_interpolation_problem', 'number', ['number', 'number', 'number', 'number', 'string', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4, arg5.val(), arg6.val(), arg7.val()]));
        }
        Z3_reset_memory() {
            this.wasmInstance.ccall('Z3_reset_memory', 'number', [], []);
        }
        Z3_set_ast_print_mode(arg0, arg1) {
            this.wasmInstance.ccall('Z3_set_ast_print_mode', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_set_error(arg0, arg1) {
            this.wasmInstance.ccall('Z3_set_error', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_set_param_value(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_set_param_value', 'number', ['number', 'string', 'string'], [arg0.val(), arg1, arg2]);
        }
        Z3_simplify(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_simplify', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_simplify_ex(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_simplify_ex', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_simplify_get_help(arg0) {
            return this.wasmInstance.ccall('Z3_simplify_get_help', 'string', ['number'], [arg0.val()]);
        }
        Z3_simplify_get_param_descrs(arg0) {
            return new Z3_param_descrs(this.wasmInstance.ccall('Z3_simplify_get_param_descrs', 'number', ['number'], [arg0.val()]));
        }
        Z3_solver_assert(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_solver_assert', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_solver_assert_and_track(arg0, arg1, arg2, arg3) {
            this.wasmInstance.ccall('Z3_solver_assert_and_track', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]);
        }
        Z3_solver_check(arg0, arg1) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_solver_check', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_solver_check_assumptions(arg0, arg1, arg2, arg3) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_solver_check_assumptions', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_solver_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_solver_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_solver_get_assertions(arg0, arg1) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_solver_get_assertions', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_solver_get_consequences(arg0, arg1, arg2, arg3, arg4) {
            return new ctypes_1.Sint32(this.wasmInstance.ccall('Z3_solver_get_consequences', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_solver_get_help(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_solver_get_help', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_solver_get_model(arg0, arg1) {
            return new Z3_model(this.wasmInstance.ccall('Z3_solver_get_model', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_solver_get_num_scopes(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_solver_get_num_scopes', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_solver_get_param_descrs(arg0, arg1) {
            return new Z3_param_descrs(this.wasmInstance.ccall('Z3_solver_get_param_descrs', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_solver_get_proof(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_solver_get_proof', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_solver_get_reason_unknown(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_solver_get_reason_unknown', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_solver_get_statistics(arg0, arg1) {
            return new Z3_stats(this.wasmInstance.ccall('Z3_solver_get_statistics', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_solver_get_unsat_core(arg0, arg1) {
            return new Z3_ast_vector(this.wasmInstance.ccall('Z3_solver_get_unsat_core', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_solver_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_solver_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_solver_pop(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_solver_pop', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_solver_push(arg0, arg1) {
            this.wasmInstance.ccall('Z3_solver_push', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_solver_reset(arg0, arg1) {
            this.wasmInstance.ccall('Z3_solver_reset', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_solver_set_params(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_solver_set_params', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_solver_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_solver_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_solver_translate(arg0, arg1, arg2) {
            return new Z3_solver(this.wasmInstance.ccall('Z3_solver_translate', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_sort_to_ast(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_sort_to_ast', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_sort_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_sort_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_stats_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_stats_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_stats_get_double_value(arg0, arg1, arg2) {
            return new ctypes_1.Double(this.wasmInstance.ccall('Z3_stats_get_double_value', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_stats_get_key(arg0, arg1, arg2) {
            return this.wasmInstance.ccall('Z3_stats_get_key', 'string', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]);
        }
        Z3_stats_get_uint_value(arg0, arg1, arg2) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_stats_get_uint_value', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_stats_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_stats_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_stats_is_double(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_stats_is_double', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_stats_is_uint(arg0, arg1, arg2) {
            return new Bool(this.wasmInstance.ccall('Z3_stats_is_uint', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_stats_size(arg0, arg1) {
            return new ctypes_1.Uint32(this.wasmInstance.ccall('Z3_stats_size', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_stats_to_string(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_stats_to_string', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_substitute(arg0, arg1, arg2, arg3, arg4) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_substitute', 'number', ['number', 'number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4.val()]));
        }
        Z3_substitute_vars(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_substitute_vars', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_tactic_and_then(arg0, arg1, arg2) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_and_then', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_tactic_apply(arg0, arg1, arg2) {
            return new Z3_apply_result(this.wasmInstance.ccall('Z3_tactic_apply', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_tactic_apply_ex(arg0, arg1, arg2, arg3) {
            return new Z3_apply_result(this.wasmInstance.ccall('Z3_tactic_apply_ex', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_tactic_cond(arg0, arg1, arg2, arg3) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_cond', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_tactic_dec_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_tactic_dec_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_tactic_fail(arg0) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_fail', 'number', ['number'], [arg0.val()]));
        }
        Z3_tactic_fail_if(arg0, arg1) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_fail_if', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_tactic_fail_if_not_decided(arg0) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_fail_if_not_decided', 'number', ['number'], [arg0.val()]));
        }
        Z3_tactic_get_descr(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_tactic_get_descr', 'string', ['number', 'string'], [arg0.val(), arg1]);
        }
        Z3_tactic_get_help(arg0, arg1) {
            return this.wasmInstance.ccall('Z3_tactic_get_help', 'string', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_tactic_get_param_descrs(arg0, arg1) {
            return new Z3_param_descrs(this.wasmInstance.ccall('Z3_tactic_get_param_descrs', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_tactic_inc_ref(arg0, arg1) {
            this.wasmInstance.ccall('Z3_tactic_inc_ref', 'number', ['number', 'number'], [arg0.val(), arg1.val()]);
        }
        Z3_tactic_or_else(arg0, arg1, arg2) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_or_else', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_tactic_par_and_then(arg0, arg1, arg2) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_par_and_then', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_tactic_par_or(arg0, arg1, arg2) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_par_or', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_tactic_repeat(arg0, arg1, arg2) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_repeat', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_tactic_skip(arg0) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_skip', 'number', ['number'], [arg0.val()]));
        }
        Z3_tactic_try_for(arg0, arg1, arg2) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_try_for', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_tactic_using_params(arg0, arg1, arg2) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_using_params', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_tactic_when(arg0, arg1, arg2) {
            return new Z3_tactic(this.wasmInstance.ccall('Z3_tactic_when', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_to_app(arg0, arg1) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_to_app', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_to_func_decl(arg0, arg1) {
            return new Z3_func_decl(this.wasmInstance.ccall('Z3_to_func_decl', 'number', ['number', 'number'], [arg0.val(), arg1.val()]));
        }
        Z3_toggle_warning_messages(arg0) {
            this.wasmInstance.ccall('Z3_toggle_warning_messages', 'number', ['number'], [arg0.val()]);
        }
        Z3_translate(arg0, arg1, arg2) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_translate', 'number', ['number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val()]));
        }
        Z3_update_param_value(arg0, arg1, arg2) {
            this.wasmInstance.ccall('Z3_update_param_value', 'number', ['number', 'string', 'string'], [arg0.val(), arg1, arg2]);
        }
        Z3_update_term(arg0, arg1, arg2, arg3) {
            return new Z3_ast(this.wasmInstance.ccall('Z3_update_term', 'number', ['number', 'number', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val()]));
        }
        Z3_write_interpolation_problem(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            this.wasmInstance.ccall('Z3_write_interpolation_problem', 'number', ['number', 'number', 'number', 'number', 'string', 'number', 'number'], [arg0.val(), arg1.val(), arg2.val(), arg3.val(), arg4, arg5.val(), arg6.val()]);
        }
    }
    exports.LibZ3 = LibZ3;
});
