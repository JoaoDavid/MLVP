define(["require", "exports", "util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CString = exports.Ptr = exports.Double = exports.Float = exports.Sint64 = exports.Uint64 = exports.Sint32 = exports.Uint32 = exports.Sint16 = exports.Uint16 = exports.Sint8 = exports.Uint8 = exports.Void = exports.CType = void 0;
    class CType {
    }
    exports.CType = CType;
    class Void {
        static sizeof() {
            throw new Error("void doesn't have a size");
        }
        static from_heap(heap, off) {
            throw new Error("void can't be instantiated");
        }
        constructor() { }
    }
    exports.Void = Void;
    class NumberCType {
        constructor(arg) {
            util_1.assert(arg >= this.min() && arg <= this.max(), "Bad number " + arg + " out of range [" + this.min() + "," + this.max() + "]");
            this._val = arg;
        }
        val() { return this._val; }
        ;
    }
    class Uint8 extends NumberCType {
        min() { return 0; }
        ;
        max() { return (1 << 8 - 1); }
        ;
        static sizeof() { return 8; }
        ;
        static from_heap(heap, off) {
            return new Uint8(heap.getUint8(off));
        }
    }
    exports.Uint8 = Uint8;
    class Sint8 extends NumberCType {
        min() { return -(1 << 7); }
        ;
        max() { return (1 << 7) - 1; }
        ;
        static sizeof() { return 8; }
        ;
        static from_heap(heap, off) {
            return new Sint8(heap.getInt8(off));
        }
    }
    exports.Sint8 = Sint8;
    class Uint16 extends NumberCType {
        min() { return 0; }
        ;
        max() { return (1 << 16 - 1); }
        ;
        static sizeof() { return 16; }
        ;
        static from_heap(heap, off) {
            return new Uint16(heap.getUint16(off));
        }
    }
    exports.Uint16 = Uint16;
    class Sint16 extends NumberCType {
        min() { return -(1 << 15); }
        ;
        max() { return (1 << 15) - 1; }
        ;
        static sizeof() { return 16; }
        ;
        static from_heap(heap, off) {
            return new Sint16(heap.getInt16(off));
        }
    }
    exports.Sint16 = Sint16;
    class Uint32 extends NumberCType {
        min() { return 0; }
        ;
        max() { return (1 << 30) + (1 << 30) + (1 << 30) + ((1 << 30) - 1); }
        ;
        static sizeof() { return 32; }
        ;
        static from_heap(heap, off) {
            return new Uint32(heap.getUint32(off));
        }
    }
    exports.Uint32 = Uint32;
    class Sint32 extends NumberCType {
        sizeof() { return 32; }
        ;
        min() { return -((1 << 30) + (1 << 30)); }
        ;
        max() { return ((1 << 30) + ((1 << 30) - 1)); }
        ;
        static sizeof() { return 32; }
        ;
        static from_heap(heap, off) {
            return new Sint32(heap.getInt32(off));
        }
    }
    exports.Sint32 = Sint32;
    class Uint64 extends NumberCType {
        min() { return 0; }
        ;
        max() { return (1 << 64 - 1); }
        ;
        static sizeof() { return 64; }
        ;
        static from_heap(heap, off) {
            throw "64 bit numbers NYI";
        }
    }
    exports.Uint64 = Uint64;
    class Sint64 extends NumberCType {
        sizeof() { return 64; }
        ;
        min() { return -(1 << 31); }
        ;
        max() { return (1 << 31) - 1; }
        ;
        static sizeof() { return 64; }
        ;
        static from_heap(heap, off) {
            throw "64 bit numbers NYI";
        }
    }
    exports.Sint64 = Sint64;
    class Float extends NumberCType {
        sizeof() { return 32; }
        ;
        min() { return -(1 << 31); }
        ;
        max() { return (1 << 31) - 1; }
        ;
        static sizeof() { return 32; }
        ;
        static from_heap(heap, off) {
            return new Float(heap.getFloat32(off));
        }
    }
    exports.Float = Float;
    class Double extends NumberCType {
        sizeof() { return 64; }
        ;
        min() { return -(1 << 31); }
        ;
        max() { return (1 << 31) - 1; }
        ;
        static sizeof() { return 64; }
        ;
        static from_heap(heap, off) {
            return new Double(heap.getFloat64(off));
        }
    }
    exports.Double = Double;
    class Ptr extends Uint32 {
        deref(heap, typ) {
            return typ.from_heap(heap, this._val);
        }
        static nullPtr() {
            return new Ptr(0);
        }
    }
    exports.Ptr = Ptr;
    class CString extends Ptr {
        str() {
            return "TODO";
        }
    }
    exports.CString = CString;
});
