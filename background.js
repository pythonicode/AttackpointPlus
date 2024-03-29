/*
    Attackpoint Plus written and developed by AJ Riley
*/

////
////                    SCRIPT THAT RUNS IN THE BACKGROUND OF CHROME
////

// Firebase code
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).firebase = e()
}(this, function() {
    "use strict";
    ! function(t) {
        if (!t.fetch) {
            var e = "URLSearchParams" in t,
                r = "Symbol" in t && "iterator" in Symbol,
                a = "FileReader" in t && "Blob" in t && function() {
                    try {
                        return new Blob, !0
                    } catch (t) {
                        return !1
                    }
                }(),
                n = "FormData" in t,
                o = "ArrayBuffer" in t;
            if (o) var i = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                s = function(t) {
                    return t && DataView.prototype.isPrototypeOf(t)
                },
                u = ArrayBuffer.isView || function(t) {
                    return t && -1 < i.indexOf(Object.prototype.toString.call(t))
                };
            d.prototype.append = function(t, e) {
                t = l(t), e = p(e);
                var r = this.map[t];
                this.map[t] = r ? r + "," + e : e
            }, d.prototype.delete = function(t) {
                delete this.map[l(t)]
            }, d.prototype.get = function(t) {
                return t = l(t), this.has(t) ? this.map[t] : null
            }, d.prototype.has = function(t) {
                return this.map.hasOwnProperty(l(t))
            }, d.prototype.set = function(t, e) {
                this.map[l(t)] = p(e)
            }, d.prototype.forEach = function(t, e) {
                for (var r in this.map) this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this)
            }, d.prototype.keys = function() {
                var r = [];
                return this.forEach(function(t, e) {
                    r.push(e)
                }), h(r)
            }, d.prototype.values = function() {
                var e = [];
                return this.forEach(function(t) {
                    e.push(t)
                }), h(e)
            }, d.prototype.entries = function() {
                var r = [];
                return this.forEach(function(t, e) {
                    r.push([e, t])
                }), h(r)
            }, r && (d.prototype[Symbol.iterator] = d.prototype.entries);
            var c = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            w.prototype.clone = function() {
                return new w(this, {
                    body: this._bodyInit
                })
            }, g.call(w.prototype), g.call(O.prototype), O.prototype.clone = function() {
                return new O(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new d(this.headers),
                    url: this.url
                })
            }, O.error = function() {
                var t = new O(null, {
                    status: 0,
                    statusText: ""
                });
                return t.type = "error", t
            };
            var f = [301, 302, 303, 307, 308];
            O.redirect = function(t, e) {
                if (-1 === f.indexOf(e)) throw new RangeError("Invalid status code");
                return new O(null, {
                    status: e,
                    headers: {
                        location: t
                    }
                })
            }, t.Headers = d, t.Request = w, t.Response = O, t.fetch = function(r, o) {
                return new Promise(function(n, t) {
                    var e = new w(r, o),
                        i = new XMLHttpRequest;
                    i.onload = function() {
                        var t, o, e = {
                            status: i.status,
                            statusText: i.statusText,
                            headers: (t = i.getAllResponseHeaders() || "", o = new d, t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(t) {
                                var e = t.split(":"),
                                    r = e.shift().trim();
                                if (r) {
                                    var n = e.join(":").trim();
                                    o.append(r, n)
                                }
                            }), o)
                        };
                        e.url = "responseURL" in i ? i.responseURL : e.headers.get("X-Request-URL");
                        var r = "response" in i ? i.response : i.responseText;
                        n(new O(r, e))
                    }, i.onerror = function() {
                        t(new TypeError("Network request failed"))
                    }, i.ontimeout = function() {
                        t(new TypeError("Network request failed"))
                    }, i.open(e.method, e.url, !0), "include" === e.credentials ? i.withCredentials = !0 : "omit" === e.credentials && (i.withCredentials = !1), "responseType" in i && a && (i.responseType = "blob"), e.headers.forEach(function(t, e) {
                        i.setRequestHeader(e, t)
                    }), i.send(void 0 === e._bodyInit ? null : e._bodyInit)
                })
            }, t.fetch.polyfill = !0
        }

        function l(t) {
            if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
            return t.toLowerCase()
        }

        function p(t) {
            return "string" != typeof t && (t = String(t)), t
        }

        function h(e) {
            var t = {
                next: function() {
                    var t = e.shift();
                    return {
                        done: void 0 === t,
                        value: t
                    }
                }
            };
            return r && (t[Symbol.iterator] = function() {
                return t
            }), t
        }

        function d(e) {
            this.map = {}, e instanceof d ? e.forEach(function(t, e) {
                this.append(e, t)
            }, this) : Array.isArray(e) ? e.forEach(function(t) {
                this.append(t[0], t[1])
            }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
                this.append(t, e[t])
            }, this)
        }

        function y(t) {
            if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
            t.bodyUsed = !0
        }

        function v(r) {
            return new Promise(function(t, e) {
                r.onload = function() {
                    t(r.result)
                }, r.onerror = function() {
                    e(r.error)
                }
            })
        }

        function b(t) {
            var e = new FileReader,
                r = v(e);
            return e.readAsArrayBuffer(t), r
        }

        function m(t) {
            if (t.slice) return t.slice(0);
            var e = new Uint8Array(t.byteLength);
            return e.set(new Uint8Array(t)), e.buffer
        }

        function g() {
            return this.bodyUsed = !1, this._initBody = function(t) {
                if (this._bodyInit = t)
                    if ("string" == typeof t) this._bodyText = t;
                    else if (a && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
                else if (n && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
                else if (e && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
                else if (o && a && s(t)) this._bodyArrayBuffer = m(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                else {
                    if (!o || !ArrayBuffer.prototype.isPrototypeOf(t) && !u(t)) throw new Error("unsupported BodyInit type");
                    this._bodyArrayBuffer = m(t)
                } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : e && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, a && (this.blob = function() {
                var t = y(this);
                if (t) return t;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? y(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(b)
            }), this.text = function() {
                var t, e, r, n = y(this);
                if (n) return n;
                if (this._bodyBlob) return t = this._bodyBlob, e = new FileReader, r = v(e), e.readAsText(t), r;
                if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                    for (var e = new Uint8Array(t), r = new Array(e.length), n = 0; n < e.length; n++) r[n] = String.fromCharCode(e[n]);
                    return r.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, n && (this.formData = function() {
                return this.text().then(_)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }

        function w(t, e) {
            var r, n, o = (e = e || {}).body;
            if (t instanceof w) {
                if (t.bodyUsed) throw new TypeError("Already read");
                this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new d(t.headers)), this.method = t.method, this.mode = t.mode, o || null == t._bodyInit || (o = t._bodyInit, t.bodyUsed = !0)
            } else this.url = String(t);
            if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new d(e.headers)), this.method = (r = e.method || this.method || "GET", n = r.toUpperCase(), -1 < c.indexOf(n) ? n : r), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(o)
        }

        function _(t) {
            var o = new FormData;
            return t.trim().split("&").forEach(function(t) {
                if (t) {
                    var e = t.split("="),
                        r = e.shift().replace(/\+/g, " "),
                        n = e.join("=").replace(/\+/g, " ");
                    o.append(decodeURIComponent(r), decodeURIComponent(n))
                }
            }), o
        }

        function O(t, e) {
            e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = 200 <= this.status && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new d(e.headers), this.url = e.url || "", this._initBody(t)
        }
    }("undefined" != typeof self ? self : void 0);
    var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function e(t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports
    }

    function r(e) {
        var r = this.constructor;
        return this.then(function(t) {
            return r.resolve(e()).then(function() {
                return t
            })
        }, function(t) {
            return r.resolve(e()).then(function() {
                return r.reject(t)
            })
        })
    }
    var n = setTimeout;

    function o() {}

    function i(t) {
        if (!(this instanceof i)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], l(t, this)
    }

    function a(r, n) {
        for (; 3 === r._state;) r = r._value;
        0 !== r._state ? (r._handled = !0, i._immediateFn(function() {
            var t = 1 === r._state ? n.onFulfilled : n.onRejected;
            if (null !== t) {
                var e;
                try {
                    e = t(r._value)
                } catch (t) {
                    return void u(n.promise, t)
                }
                s(n.promise, e)
            } else(1 === r._state ? s : u)(n.promise, r._value)
        })) : r._deferreds.push(n)
    }

    function s(e, t) {
        try {
            if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == typeof t || "function" == typeof t)) {
                var r = t.then;
                if (t instanceof i) return e._state = 3, e._value = t, void c(e);
                if ("function" == typeof r) return void l((n = r, o = t, function() {
                    n.apply(o, arguments)
                }), e)
            }
            e._state = 1, e._value = t, c(e)
        } catch (t) {
            u(e, t)
        }
        var n, o
    }

    function u(t, e) {
        t._state = 2, t._value = e, c(t)
    }

    function c(t) {
        2 === t._state && 0 === t._deferreds.length && i._immediateFn(function() {
            t._handled || i._unhandledRejectionFn(t._value)
        });
        for (var e = 0, r = t._deferreds.length; e < r; e++) a(t, t._deferreds[e]);
        t._deferreds = null
    }

    function f(t, e, r) {
        this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = r
    }

    function l(t, e) {
        var r = !1;
        try {
            t(function(t) {
                r || (r = !0, s(e, t))
            }, function(t) {
                r || (r = !0, u(e, t))
            })
        } catch (t) {
            if (r) return;
            r = !0, u(e, t)
        }
    }
    i.prototype.catch = function(t) {
        return this.then(null, t)
    }, i.prototype.then = function(t, e) {
        var r = new this.constructor(o);
        return a(this, new f(t, e, r)), r
    }, i.prototype.finally = r, i.all = function(e) {
        return new i(function(n, o) {
            if (!e || void 0 === e.length) throw new TypeError("Promise.all accepts an array");
            var i = Array.prototype.slice.call(e);
            if (0 === i.length) return n([]);
            var a = i.length;

            function s(e, t) {
                try {
                    if (t && ("object" == typeof t || "function" == typeof t)) {
                        var r = t.then;
                        if ("function" == typeof r) return void r.call(t, function(t) {
                            s(e, t)
                        }, o)
                    }
                    i[e] = t, 0 == --a && n(i)
                } catch (t) {
                    o(t)
                }
            }
            for (var t = 0; t < i.length; t++) s(t, i[t])
        })
    }, i.resolve = function(e) {
        return e && "object" == typeof e && e.constructor === i ? e : new i(function(t) {
            t(e)
        })
    }, i.reject = function(r) {
        return new i(function(t, e) {
            e(r)
        })
    }, i.race = function(o) {
        return new i(function(t, e) {
            for (var r = 0, n = o.length; r < n; r++) o[r].then(t, e)
        })
    }, i._immediateFn = "function" == typeof setImmediate && function(t) {
        setImmediate(t)
    } || function(t) {
        n(t, 0)
    }, i._unhandledRejectionFn = function(t) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
    };
    var p = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if (void 0 !== t) return t;
        throw new Error("unable to locate global object")
    }();
    "Promise" in p ? p.Promise.prototype.finally || (p.Promise.prototype.finally = r) : p.Promise = i;
    var h, d, y, g = function(n, o, t) {
            if (function(t) {
                    if ("function" != typeof t) throw TypeError(String(t) + " is not a function")
                }(n), void 0 === o) return n;
            switch (t) {
                case 0:
                    return function() {
                        return n.call(o)
                    };
                case 1:
                    return function(t) {
                        return n.call(o, t)
                    };
                case 2:
                    return function(t, e) {
                        return n.call(o, t, e)
                    };
                case 3:
                    return function(t, e, r) {
                        return n.call(o, t, e, r)
                    }
            }
            return function() {
                return n.apply(o, arguments)
            }
        },
        v = function(t) {
            try {
                return !!t()
            } catch (t) {
                return !0
            }
        },
        b = {}.toString,
        m = function(t) {
            return b.call(t).slice(8, -1)
        },
        w = "".split,
        _ = v(function() {
            return !Object("z").propertyIsEnumerable(0)
        }) ? function(t) {
            return "String" == m(t) ? w.call(t, "") : Object(t)
        } : Object,
        O = function(t) {
            if (null == t) throw TypeError("Can't call method on " + t);
            return t
        },
        S = function(t) {
            return Object(O(t))
        },
        j = Math.ceil,
        A = Math.floor,
        E = function(t) {
            return isNaN(t = +t) ? 0 : (0 < t ? A : j)(t)
        },
        T = Math.min,
        P = function(t) {
            return 0 < t ? T(E(t), 9007199254740991) : 0
        },
        x = function(t) {
            return "object" == typeof t ? null !== t : "function" == typeof t
        },
        I = Array.isArray || function(t) {
            return "Array" == m(t)
        },
        k = "object" == typeof window && window && window.Math == Math ? window : "object" == typeof self && self && self.Math == Math ? self : Function("return this")(),
        F = !v(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        }),
        L = k.document,
        N = x(L) && x(L.createElement),
        R = function(t) {
            return N ? L.createElement(t) : {}
        },
        D = !F && !v(function() {
            return 7 != Object.defineProperty(R("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        }),
        B = function(t) {
            if (!x(t)) throw TypeError(String(t) + " is not an object");
            return t
        },
        C = function(t, e) {
            if (!x(t)) return t;
            var r, n;
            if (e && "function" == typeof(r = t.toString) && !x(n = r.call(t))) return n;
            if ("function" == typeof(r = t.valueOf) && !x(n = r.call(t))) return n;
            if (!e && "function" == typeof(r = t.toString) && !x(n = r.call(t))) return n;
            throw TypeError("Can't convert object to primitive value")
        },
        M = Object.defineProperty,
        U = {
            f: F ? M : function(t, e, r) {
                if (B(t), e = C(e, !0), B(r), D) try {
                    return M(t, e, r)
                } catch (t) {}
                if ("get" in r || "set" in r) throw TypeError("Accessors not supported");
                return "value" in r && (t[e] = r.value), t
            }
        },
        G = function(t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e
            }
        },
        z = F ? function(t, e, r) {
            return U.f(t, e, G(1, r))
        } : function(t, e, r) {
            return t[e] = r, t
        },
        V = function(e, r) {
            try {
                z(k, e, r)
            } catch (t) {
                k[e] = r
            }
            return r
        },
        W = e(function(t) {
            var e = "__core-js_shared__",
                r = k[e] || V(e, {});
            (t.exports = function(t, e) {
                return r[t] || (r[t] = void 0 !== e ? e : {})
            })("versions", []).push({
                version: "3.0.1",
                mode: "global",
                copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
            })
        }),
        H = 0,
        q = Math.random(),
        $ = function(t) {
            return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++H + q).toString(36))
        },
        J = !v(function() {
            return !String(Symbol())
        }),
        Y = W("wks"),
        K = k.Symbol,
        X = function(t) {
            return Y[t] || (Y[t] = J && K[t] || (J ? K : $)("Symbol." + t))
        },
        Q = X("species"),
        Z = function(t, e) {
            var r;
            return I(t) && ("function" != typeof(r = t.constructor) || r !== Array && !I(r.prototype) ? x(r) && null === (r = r[Q]) && (r = void 0) : r = void 0), new(void 0 === r ? Array : r)(0 === e ? 0 : e)
        },
        tt = function(l, t) {
            var p = 1 == l,
                h = 2 == l,
                d = 3 == l,
                y = 4 == l,
                v = 6 == l,
                b = 5 == l || v,
                m = t || Z;
            return function(t, e, r) {
                for (var n, o, i = S(t), a = _(i), s = g(e, r, 3), u = P(a.length), c = 0, f = p ? m(t, u) : h ? m(t, 0) : void 0; c < u; c++)
                    if ((b || c in a) && (o = s(n = a[c], c, i), l))
                        if (p) f[c] = o;
                        else if (o) switch (l) {
                    case 3:
                        return !0;
                    case 5:
                        return n;
                    case 6:
                        return c;
                    case 2:
                        f.push(n)
                } else if (y) return !1;
                return v ? -1 : d || y ? y : f
            }
        },
        et = {}.propertyIsEnumerable,
        rt = Object.getOwnPropertyDescriptor,
        nt = {
            f: rt && !et.call({
                1: 2
            }, 1) ? function(t) {
                var e = rt(this, t);
                return !!e && e.enumerable
            } : et
        },
        ot = function(t) {
            return _(O(t))
        },
        it = {}.hasOwnProperty,
        at = function(t, e) {
            return it.call(t, e)
        },
        st = Object.getOwnPropertyDescriptor,
        ut = {
            f: F ? st : function(t, e) {
                if (t = ot(t), e = C(e, !0), D) try {
                    return st(t, e)
                } catch (t) {}
                if (at(t, e)) return G(!nt.f.call(t, e), t[e])
            }
        },
        ct = W("native-function-to-string", Function.toString),
        ft = k.WeakMap,
        lt = "function" == typeof ft && /native code/.test(ct.call(ft)),
        pt = W("keys"),
        ht = function(t) {
            return pt[t] || (pt[t] = $(t))
        },
        dt = {},
        yt = k.WeakMap;
    if (lt) {
        var vt = new yt,
            bt = vt.get,
            mt = vt.has,
            gt = vt.set;
        h = function(t, e) {
            return gt.call(vt, t, e), e
        }, d = function(t) {
            return bt.call(vt, t) || {}
        }, y = function(t) {
            return mt.call(vt, t)
        }
    } else {
        var wt = ht("state");
        dt[wt] = !0, h = function(t, e) {
            return z(t, wt, e), e
        }, d = function(t) {
            return at(t, wt) ? t[wt] : {}
        }, y = function(t) {
            return at(t, wt)
        }
    }
    var _t, Ot = {
            set: h,
            get: d,
            has: y,
            enforce: function(t) {
                return y(t) ? d(t) : h(t, {})
            },
            getterFor: function(r) {
                return function(t) {
                    var e;
                    if (!x(t) || (e = d(t)).type !== r) throw TypeError("Incompatible receiver, " + r + " required");
                    return e
                }
            }
        },
        St = e(function(t) {
            var e = Ot.get,
                s = Ot.enforce,
                u = String(ct).split("toString");
            W("inspectSource", function(t) {
                return ct.call(t)
            }), (t.exports = function(t, e, r, n) {
                var o = !!n && !!n.unsafe,
                    i = !!n && !!n.enumerable,
                    a = !!n && !!n.noTargetGet;
                "function" == typeof r && ("string" != typeof e || at(r, "name") || z(r, "name", e), s(r).source = u.join("string" == typeof e ? e : "")), t !== k ? (o ? !a && t[e] && (i = !0) : delete t[e], i ? t[e] = r : z(t, e, r)) : i ? t[e] = r : V(e, r)
            })(Function.prototype, "toString", function() {
                return "function" == typeof this && e(this).source || ct.call(this)
            })
        }),
        jt = Math.max,
        At = Math.min,
        Et = (_t = !1, function(t, e, r) {
            var n, o, i, a = ot(t),
                s = P(a.length),
                u = (n = s, (o = E(r)) < 0 ? jt(o + n, 0) : At(o, n));
            if (_t && e != e) {
                for (; u < s;)
                    if ((i = a[u++]) != i) return !0
            } else
                for (; u < s; u++)
                    if ((_t || u in a) && a[u] === e) return _t || u || 0;
            return !_t && -1
        }),
        Tt = function(t, e) {
            var r, n = ot(t),
                o = 0,
                i = [];
            for (r in n) !at(dt, r) && at(n, r) && i.push(r);
            for (; e.length > o;) at(n, r = e[o++]) && (~Et(i, r) || i.push(r));
            return i
        },
        Pt = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
        xt = Pt.concat("length", "prototype"),
        It = {
            f: Object.getOwnPropertyNames || function(t) {
                return Tt(t, xt)
            }
        },
        kt = {
            f: Object.getOwnPropertySymbols
        },
        Ft = k.Reflect,
        Lt = Ft && Ft.ownKeys || function(t) {
            var e = It.f(B(t)),
                r = kt.f;
            return r ? e.concat(r(t)) : e
        },
        Nt = function(t, e) {
            for (var r = Lt(e), n = U.f, o = ut.f, i = 0; i < r.length; i++) {
                var a = r[i];
                at(t, a) || n(t, a, o(e, a))
            }
        },
        Rt = /#|\.prototype\./,
        Dt = function(t, e) {
            var r = Ct[Bt(t)];
            return r == Ut || r != Mt && ("function" == typeof e ? v(e) : !!e)
        },
        Bt = Dt.normalize = function(t) {
            return String(t).replace(Rt, ".").toLowerCase()
        },
        Ct = Dt.data = {},
        Mt = Dt.NATIVE = "N",
        Ut = Dt.POLYFILL = "P",
        Gt = Dt,
        zt = ut.f,
        Vt = function(t, e) {
            var r, n, o, i, a, s = t.target,
                u = t.global,
                c = t.stat;
            if (r = u ? k : c ? k[s] || V(s, {}) : (k[s] || {}).prototype)
                for (n in e) {
                    if (i = e[n], o = t.noTargetGet ? (a = zt(r, n)) && a.value : r[n], !Gt(u ? n : s + (c ? "." : "#") + n, t.forced) && void 0 !== o) {
                        if (typeof i == typeof o) continue;
                        Nt(i, o)
                    }(t.sham || o && o.sham) && z(i, "sham", !0), St(r, n, i, t)
                }
        },
        Wt = Object.keys || function(t) {
            return Tt(t, Pt)
        },
        Ht = F ? Object.defineProperties : function(t, e) {
            B(t);
            for (var r, n = Wt(e), o = n.length, i = 0; i < o;) U.f(t, r = n[i++], e[r]);
            return t
        },
        qt = k.document,
        $t = qt && qt.documentElement,
        Jt = ht("IE_PROTO"),
        Yt = "prototype",
        Kt = function() {},
        Xt = function() {
            var t, e = R("iframe"),
                r = Pt.length,
                n = "script";
            for (e.style.display = "none", $t.appendChild(e), e.src = String("javascript:"), (t = e.contentWindow.document).open(), t.write("<script>document.F=Object</" + n + ">"), t.close(), Xt = t.F; r--;) delete Xt[Yt][Pt[r]];
            return Xt()
        },
        Qt = Object.create || function(t, e) {
            var r;
            return null !== t ? (Kt[Yt] = B(t), r = new Kt, Kt[Yt] = null, r[Jt] = t) : r = Xt(), void 0 === e ? r : Ht(r, e)
        };
    dt[Jt] = !0;
    var Zt = X("unscopables"),
        te = Array.prototype;
    null == te[Zt] && z(te, Zt, Qt(null));
    var ee = function(t) {
            te[Zt][t] = !0
        },
        re = tt(5),
        ne = "find",
        oe = !0;
    ne in [] && Array(1)[ne](function() {
        oe = !1
    }), Vt({
        target: "Array",
        proto: !0,
        forced: oe
    }, {
        find: function(t) {
            return re(this, t, 1 < arguments.length ? arguments[1] : void 0)
        }
    }), ee(ne);
    var ie = Function.call,
        ae = function(t, e, r) {
            return g(ie, k[t].prototype[e], r)
        },
        se = (ae("Array", "find"), tt(6)),
        ue = "findIndex",
        ce = !0;
    ue in [] && Array(1)[ue](function() {
        ce = !1
    }), Vt({
        target: "Array",
        proto: !0,
        forced: ce
    }, {
        findIndex: function(t) {
            return se(this, t, 1 < arguments.length ? arguments[1] : void 0)
        }
    }), ee(ue);
    ae("Array", "findIndex");
    var fe = Object.assign,
        le = !fe || v(function() {
            var t = {},
                e = {},
                r = Symbol(),
                n = "abcdefghijklmnopqrst";
            return t[r] = 7, n.split("").forEach(function(t) {
                e[t] = t
            }), 7 != fe({}, t)[r] || Wt(fe({}, e)).join("") != n
        }) ? function(t, e) {
            for (var r = S(t), n = arguments.length, o = 1, i = kt.f, a = nt.f; o < n;)
                for (var s, u = _(arguments[o++]), c = i ? Wt(u).concat(i(u)) : Wt(u), f = c.length, l = 0; l < f;) a.call(u, s = c[l++]) && (r[s] = u[s]);
            return r
        } : fe;
    Vt({
        target: "Object",
        stat: !0,
        forced: Object.assign !== le
    }, {
        assign: le
    });
    var pe = k,
        he = (pe.Object.assign, X("match")),
        de = function(t, e, r) {
            if (x(n = e) && (void 0 !== (o = n[he]) ? o : "RegExp" == m(n))) throw TypeError("String.prototype." + r + " doesn't accept regex");
            var n, o;
            return String(O(t))
        },
        ye = X("match"),
        ve = "startsWith",
        be = function(e) {
            var r = /./;
            try {
                "/./" [e](r)
            } catch (t) {
                try {
                    return r[ye] = !1, "/./" [e](r)
                } catch (t) {}
            }
            return !1
        }(ve),
        me = "" [ve];
    Vt({
        target: "String",
        proto: !0,
        forced: !be
    }, {
        startsWith: function(t) {
            var e = de(this, t, ve),
                r = P(Math.min(1 < arguments.length ? arguments[1] : void 0, e.length)),
                n = String(t);
            return me ? me.call(e, n, r) : e.slice(r, r + n.length) === n
        }
    });
    ae("String", "startsWith");
    Vt({
        target: "String",
        proto: !0
    }, {
        repeat: "".repeat || function(t) {
            var e = String(O(this)),
                r = "",
                n = E(t);
            if (n < 0 || n == 1 / 0) throw RangeError("Wrong number of repetitions");
            for (; 0 < n;
                (n >>>= 1) && (e += e)) 1 & n && (r += e);
            return r
        }
    });
    ae("String", "repeat");
    var ge, we = function(t, e, r) {
            var n = C(e);
            n in t ? U.f(t, n, G(0, r)) : t[n] = r
        },
        _e = X("species"),
        Oe = X("isConcatSpreadable"),
        Se = 9007199254740991,
        je = "Maximum allowed index exceeded",
        Ae = !v(function() {
            var t = [];
            return t[Oe] = !1, t.concat()[0] !== t
        }),
        Ee = (ge = "concat", !v(function() {
            var t = [];
            return (t.constructor = {})[_e] = function() {
                return {
                    foo: 1
                }
            }, 1 !== t[ge](Boolean).foo
        })),
        Te = function(t) {
            if (!x(t)) return !1;
            var e = t[Oe];
            return void 0 !== e ? !!e : I(t)
        };
    Vt({
        target: "Array",
        proto: !0,
        forced: !Ae || !Ee
    }, {
        concat: function(t) {
            var e, r, n, o, i, a = S(this),
                s = Z(a, 0),
                u = 0;
            for (e = -1, n = arguments.length; e < n; e++)
                if (i = -1 === e ? a : arguments[e], Te(i)) {
                    if (o = P(i.length), Se < u + o) throw TypeError(je);
                    for (r = 0; r < o; r++, u++) r in i && we(s, u, i[r])
                } else {
                    if (Se <= u) throw TypeError(je);
                    we(s, u++, i)
                } return s.length = u, s
        }
    });
    var Pe = X("toStringTag"),
        xe = "Arguments" == m(function() {
            return arguments
        }()),
        Ie = {};
    Ie[X("toStringTag")] = "z";
    var ke = "[object z]" !== String(Ie) ? function() {
            return "[object " + (void 0 === (t = this) ? "Undefined" : null === t ? "Null" : "string" == typeof(r = function(t, e) {
                try {
                    return t[e]
                } catch (t) {}
            }(e = Object(t), Pe)) ? r : xe ? m(e) : "Object" == (n = m(e)) && "function" == typeof e.callee ? "Arguments" : n) + "]";
            var t, e, r, n
        } : Ie.toString,
        Fe = Object.prototype;
    ke !== Fe.toString && St(Fe, "toString", ke, {
        unsafe: !0
    });
    var Le = U.f,
        Ne = X("toStringTag"),
        Re = function(t, e, r) {
            t && !at(t = r ? t : t.prototype, Ne) && Le(t, Ne, {
                configurable: !0,
                value: e
            })
        },
        De = {
            f: X
        },
        Be = U.f,
        Ce = function(t) {
            var e = pe.Symbol || (pe.Symbol = {});
            at(e, t) || Be(e, t, {
                value: De.f(t)
            })
        },
        Me = It.f,
        Ue = {}.toString,
        Ge = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        ze = {
            f: function(t) {
                return Ge && "[object Window]" == Ue.call(t) ? function(t) {
                    try {
                        return Me(t)
                    } catch (t) {
                        return Ge.slice()
                    }
                }(t) : Me(ot(t))
            }
        },
        Ve = ht("hidden"),
        We = "Symbol",
        He = Ot.set,
        qe = Ot.getterFor(We),
        $e = ut.f,
        Je = U.f,
        Ye = ze.f,
        Ke = k.Symbol,
        Xe = k.JSON,
        Qe = Xe && Xe.stringify,
        Ze = "prototype",
        tr = X("toPrimitive"),
        er = nt.f,
        rr = W("symbol-registry"),
        nr = W("symbols"),
        or = W("op-symbols"),
        ir = W("wks"),
        ar = Object[Ze],
        sr = k.QObject,
        ur = !sr || !sr[Ze] || !sr[Ze].findChild,
        cr = F && v(function() {
            return 7 != Qt(Je({}, "a", {
                get: function() {
                    return Je(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        }) ? function(t, e, r) {
            var n = $e(ar, e);
            n && delete ar[e], Je(t, e, r), n && t !== ar && Je(ar, e, n)
        } : Je,
        fr = function(t, e) {
            var r = nr[t] = Qt(Ke[Ze]);
            return He(r, {
                type: We,
                tag: t,
                description: e
            }), F || (r.description = e), r
        },
        lr = J && "symbol" == typeof Ke.iterator ? function(t) {
            return "symbol" == typeof t
        } : function(t) {
            return Object(t) instanceof Ke
        },
        pr = function(t, e, r) {
            return t === ar && pr(or, e, r), B(t), e = C(e, !0), B(r), at(nr, e) ? (r.enumerable ? (at(t, Ve) && t[Ve][e] && (t[Ve][e] = !1), r = Qt(r, {
                enumerable: G(0, !1)
            })) : (at(t, Ve) || Je(t, Ve, G(1, {})), t[Ve][e] = !0), cr(t, e, r)) : Je(t, e, r)
        },
        hr = function(t, e) {
            B(t);
            for (var r, n = function(t) {
                    var e = Wt(t),
                        r = kt.f;
                    if (r)
                        for (var n, o = r(t), i = nt.f, a = 0; o.length > a;) i.call(t, n = o[a++]) && e.push(n);
                    return e
                }(e = ot(e)), o = 0, i = n.length; o < i;) pr(t, r = n[o++], e[r]);
            return t
        },
        dr = function(t) {
            var e = er.call(this, t = C(t, !0));
            return !(this === ar && at(nr, t) && !at(or, t)) && (!(e || !at(this, t) || !at(nr, t) || at(this, Ve) && this[Ve][t]) || e)
        },
        yr = function(t, e) {
            if (t = ot(t), e = C(e, !0), t !== ar || !at(nr, e) || at(or, e)) {
                var r = $e(t, e);
                return !r || !at(nr, e) || at(t, Ve) && t[Ve][e] || (r.enumerable = !0), r
            }
        },
        vr = function(t) {
            for (var e, r = Ye(ot(t)), n = [], o = 0; r.length > o;) at(nr, e = r[o++]) || at(dt, e) || n.push(e);
            return n
        },
        br = function(t) {
            for (var e, r = t === ar, n = Ye(r ? or : ot(t)), o = [], i = 0; n.length > i;) !at(nr, e = n[i++]) || r && !at(ar, e) || o.push(nr[e]);
            return o
        };
    J || (St((Ke = function() {
        if (this instanceof Ke) throw TypeError("Symbol is not a constructor");
        var t = void 0 === arguments[0] ? void 0 : String(arguments[0]),
            e = $(t),
            r = function(t) {
                this === ar && r.call(or, t), at(this, Ve) && at(this[Ve], e) && (this[Ve][e] = !1), cr(this, e, G(1, t))
            };
        return F && ur && cr(ar, e, {
            configurable: !0,
            set: r
        }), fr(e, t)
    })[Ze], "toString", function() {
        return qe(this).tag
    }), nt.f = dr, U.f = pr, ut.f = yr, It.f = ze.f = vr, kt.f = br, F && (Je(Ke[Ze], "description", {
        configurable: !0,
        get: function() {
            return qe(this).description
        }
    }), St(ar, "propertyIsEnumerable", dr, {
        unsafe: !0
    })), De.f = function(t) {
        return fr(X(t), t)
    }), Vt({
        global: !0,
        wrap: !0,
        forced: !J,
        sham: !J
    }, {
        Symbol: Ke
    });
    for (var mr = Wt(ir), gr = 0; mr.length > gr;) Ce(mr[gr++]);
    Vt({
        target: We,
        stat: !0,
        forced: !J
    }, {
        for: function(t) {
            return at(rr, t += "") ? rr[t] : rr[t] = Ke(t)
        },
        keyFor: function(t) {
            if (!lr(t)) throw TypeError(t + " is not a symbol");
            for (var e in rr)
                if (rr[e] === t) return e
        },
        useSetter: function() {
            ur = !0
        },
        useSimple: function() {
            ur = !1
        }
    }), Vt({
        target: "Object",
        stat: !0,
        forced: !J,
        sham: !F
    }, {
        create: function(t, e) {
            return void 0 === e ? Qt(t) : hr(Qt(t), e)
        },
        defineProperty: pr,
        defineProperties: hr,
        getOwnPropertyDescriptor: yr
    }), Vt({
        target: "Object",
        stat: !0,
        forced: !J
    }, {
        getOwnPropertyNames: vr,
        getOwnPropertySymbols: br
    }), Xe && Vt({
        target: "JSON",
        stat: !0,
        forced: !J || v(function() {
            var t = Ke();
            return "[null]" != Qe([t]) || "{}" != Qe({
                a: t
            }) || "{}" != Qe(Object(t))
        })
    }, {
        stringify: function(t) {
            for (var e, r, n = [t], o = 1; arguments.length > o;) n.push(arguments[o++]);
            if (r = e = n[1], (x(e) || void 0 !== t) && !lr(t)) return I(e) || (e = function(t, e) {
                if ("function" == typeof r && (e = r.call(this, t, e)), !lr(e)) return e
            }), n[1] = e, Qe.apply(Xe, n)
        }
    }), Ke[Ze][tr] || z(Ke[Ze], tr, Ke[Ze].valueOf), Re(Ke, We), dt[Ve] = !0, Ce("asyncIterator");
    var wr = U.f,
        _r = k.Symbol;
    if (F && "function" == typeof _r && (!("description" in _r.prototype) || void 0 !== _r().description)) {
        var Or = {},
            Sr = function() {
                var t = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),
                    e = this instanceof Sr ? new _r(t) : void 0 === t ? _r() : _r(t);
                return "" === t && (Or[e] = !0), e
            };
        Nt(Sr, _r);
        var jr = Sr.prototype = _r.prototype;
        jr.constructor = Sr;
        var Ar = jr.toString,
            Er = "Symbol(test)" == String(_r("test")),
            Tr = /^Symbol\((.*)\)[^)]+$/;
        wr(jr, "description", {
            configurable: !0,
            get: function() {
                var t = x(this) ? this.valueOf() : this,
                    e = Ar.call(t);
                if (at(Or, t)) return "";
                var r = Er ? e.slice(7, -1) : e.replace(Tr, "$1");
                return "" === r ? void 0 : r
            }
        }), Vt({
            global: !0,
            forced: !0
        }, {
            Symbol: Sr
        })
    }
    Ce("hasInstance"), Ce("isConcatSpreadable"), Ce("iterator"), Ce("match"), Ce("replace"), Ce("search"), Ce("species"), Ce("split"), Ce("toPrimitive"), Ce("toStringTag"), Ce("unscopables"), Re(Math, "Math", !0), Re(k.JSON, "JSON", !0);
    pe.Symbol;
    Ce("dispose"), Ce("observable"), Ce("patternMatch");
    var Pr, xr, Ir, kr = !v(function() {
            function t() {}
            return t.prototype.constructor = null, Object.getPrototypeOf(new t) !== t.prototype
        }),
        Fr = ht("IE_PROTO"),
        Lr = Object.prototype,
        Nr = kr ? Object.getPrototypeOf : function(t) {
            return t = S(t), at(t, Fr) ? t[Fr] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? Lr : null
        },
        Rr = X("iterator"),
        Dr = !1;
    [].keys && ("next" in (Ir = [].keys()) ? (xr = Nr(Nr(Ir))) !== Object.prototype && (Pr = xr) : Dr = !0), null == Pr && (Pr = {}), at(Pr, Rr) || z(Pr, Rr, function() {
        return this
    });
    var Br = {
            IteratorPrototype: Pr,
            BUGGY_SAFARI_ITERATORS: Dr
        },
        Cr = Br.IteratorPrototype,
        Mr = Object.setPrototypeOf || ("__proto__" in {} ? function() {
            var r, n = !1,
                t = {};
            try {
                (r = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(t, []), n = t instanceof Array
            } catch (t) {}
            return function(t, e) {
                return function(t, e) {
                    if (B(t), !x(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype")
                }(t, e), n ? r.call(t, e) : t.__proto__ = e, t
            }
        }() : void 0),
        Ur = X("iterator"),
        Gr = Br.IteratorPrototype,
        zr = Br.BUGGY_SAFARI_ITERATORS,
        Vr = "values",
        Wr = "entries",
        Hr = function() {
            return this
        },
        qr = function(t, e, r, n, o, i, a) {
            var s, u, c;
            u = n, c = e + " Iterator", (s = r).prototype = Qt(Cr, {
                next: G(1, u)
            }), Re(s, c, !1);
            var f, l, p, h = function(t) {
                    if (t === o && m) return m;
                    if (!zr && t in v) return v[t];
                    switch (t) {
                        case "keys":
                        case Vr:
                        case Wr:
                            return function() {
                                return new r(this, t)
                            }
                    }
                    return function() {
                        return new r(this)
                    }
                },
                d = e + " Iterator",
                y = !1,
                v = t.prototype,
                b = v[Ur] || v["@@iterator"] || o && v[o],
                m = !zr && b || h(o),
                g = "Array" == e && v.entries || b;
            if (g && (f = Nr(g.call(new t)), Gr !== Object.prototype && f.next && (Nr(f) !== Gr && (Mr ? Mr(f, Gr) : "function" != typeof f[Ur] && z(f, Ur, Hr)), Re(f, d, !0))), o == Vr && b && b.name !== Vr && (y = !0, m = function() {
                    return b.call(this)
                }), v[Ur] !== m && z(v, Ur, m), o)
                if (l = {
                        values: h(Vr),
                        keys: i ? m : h("keys"),
                        entries: h(Wr)
                    }, a)
                    for (p in l) !zr && !y && p in v || St(v, p, l[p]);
                else Vt({
                    target: e,
                    proto: !0,
                    forced: zr || y
                }, l);
            return l
        },
        $r = "String Iterator",
        Jr = Ot.set,
        Yr = Ot.getterFor($r);
    qr(String, "String", function(t) {
        Jr(this, {
            type: $r,
            string: String(t),
            index: 0
        })
    }, function() {
        var t, e, r, n, o, i, a, s, u = Yr(this),
            c = u.string,
            f = u.index;
        return f >= c.length ? {
            value: void 0,
            done: !0
        } : (e = f, r = !0, i = String(O(c)), a = E(e), s = i.length, t = a < 0 || s <= a ? r ? "" : void 0 : (n = i.charCodeAt(a)) < 55296 || 56319 < n || a + 1 === s || (o = i.charCodeAt(a + 1)) < 56320 || 57343 < o ? r ? i.charAt(a) : n : r ? i.slice(a, a + 2) : o - 56320 + (n - 55296 << 10) + 65536, u.index += t.length, {
            value: t,
            done: !1
        })
    });
    var Kr = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
        },
        Xr = "Array Iterator",
        Qr = Ot.set,
        Zr = Ot.getterFor(Xr),
        tn = qr(Array, "Array", function(t, e) {
            Qr(this, {
                type: Xr,
                target: ot(t),
                index: 0,
                kind: e
            })
        }, function() {
            var t = Zr(this),
                e = t.target,
                r = t.kind,
                n = t.index++;
            return !e || n >= e.length ? {
                value: t.target = void 0,
                done: !0
            } : "keys" == r ? {
                value: n,
                done: !1
            } : "values" == r ? {
                value: e[n],
                done: !1
            } : {
                value: [n, e[n]],
                done: !1
            }
        }, "values");
    ee("keys"), ee("values"), ee("entries");
    var en = X("iterator"),
        rn = X("toStringTag"),
        nn = tn.values;
    for (var on in Kr) {
        var an = k[on],
            sn = an && an.prototype;
        if (sn) {
            if (sn[en] !== nn) try {
                z(sn, en, nn)
            } catch (On) {
                sn[en] = nn
            }
            if (sn[rn] || z(sn, rn, on), Kr[on])
                for (var un in tn)
                    if (sn[un] !== tn[un]) try {
                        z(sn, un, tn[un])
                    } catch (On) {
                        sn[un] = tn[un]
                    }
        }
    }
    De.f("iterator");
    var cn = function(t, e) {
        return (cn = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            })(t, e)
    };
    var fn = function() {
        return (fn = Object.assign || function(t) {
            for (var e, r = 1, n = arguments.length; r < n; r++)
                for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t
        }).apply(this, arguments)
    };

    function ln(t, e) {
        if (!(e instanceof Object)) return e;
        switch (e.constructor) {
            case Date:
                return new Date(e.getTime());
            case Object:
                void 0 === t && (t = {});
                break;
            case Array:
                t = [];
                break;
            default:
                return e
        }
        for (var r in e) e.hasOwnProperty(r) && (t[r] = ln(t[r], e[r]));
        return t
    }

    function pn(t, e, r) {
        t[e] = r
    }
    var hn = function(n) {
            function o(t, e) {
                var r = n.call(this, e) || this;
                return r.code = t, r.name = "FirebaseError", Object.setPrototypeOf(r, o.prototype), Error.captureStackTrace && Error.captureStackTrace(r, dn.prototype.create), r
            }
            return function(t, e) {
                function r() {
                    this.constructor = t
                }
                cn(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            }(o, n), o
        }(Error),
        dn = function() {
            function t(t, e, r) {
                this.service = t, this.serviceName = e, this.errors = r
            }
            return t.prototype.create = function(t, e) {
                void 0 === e && (e = {});
                for (var n, r = this.service + "/" + t, o = this.errors[t], i = o ? (n = e, o.replace(yn, function(t, e) {
                        var r = n[e];
                        return null != r ? r.toString() : "<" + e + "?>"
                    })) : "Error", a = this.serviceName + ": " + i + " (" + r + ").", s = new hn(r, a), u = 0, c = Object.keys(e); u < c.length; u++) {
                    var f = c[u];
                    "_" !== f.slice(-1) && (f in s && console.warn('Overwriting FirebaseError base field "' + f + '" can cause unexpected behavior.'), s[f] = e[f])
                }
                return s
            }, t
        }();
    var yn = /\{\$([^}]+)}/g;

    function vn(t, e) {
        var r = new mn(t, e);
        return r.subscribe.bind(r)
    }
    var bn, mn = function() {
        function t(t, e) {
            var r = this;
            this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = e, this.task.then(function() {
                t(r)
            }).catch(function(t) {
                r.error(t)
            })
        }
        return t.prototype.next = function(e) {
            this.forEachObserver(function(t) {
                t.next(e)
            })
        }, t.prototype.error = function(e) {
            this.forEachObserver(function(t) {
                t.error(e)
            }), this.close(e)
        }, t.prototype.complete = function() {
            this.forEachObserver(function(t) {
                t.complete()
            }), this.close()
        }, t.prototype.subscribe = function(t, e, r) {
            var n, o = this;
            if (void 0 === t && void 0 === e && void 0 === r) throw new Error("Missing Observer.");
            void 0 === (n = function(t, e) {
                if ("object" != typeof t || null === t) return !1;
                for (var r = 0, n = e; r < n.length; r++) {
                    var o = n[r];
                    if (o in t && "function" == typeof t[o]) return !0
                }
                return !1
            }(t, ["next", "error", "complete"]) ? t : {
                next: t,
                error: e,
                complete: r
            }).next && (n.next = gn), void 0 === n.error && (n.error = gn), void 0 === n.complete && (n.complete = gn);
            var i = this.unsubscribeOne.bind(this, this.observers.length);
            return this.finalized && this.task.then(function() {
                try {
                    o.finalError ? n.error(o.finalError) : n.complete()
                } catch (t) {}
            }), this.observers.push(n), i
        }, t.prototype.unsubscribeOne = function(t) {
            void 0 !== this.observers && void 0 !== this.observers[t] && (delete this.observers[t], this.observerCount -= 1, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
        }, t.prototype.forEachObserver = function(t) {
            if (!this.finalized)
                for (var e = 0; e < this.observers.length; e++) this.sendOne(e, t)
        }, t.prototype.sendOne = function(t, e) {
            var r = this;
            this.task.then(function() {
                if (void 0 !== r.observers && void 0 !== r.observers[t]) try {
                    e(r.observers[t])
                } catch (t) {
                    "undefined" != typeof console && console.error && console.error(t)
                }
            })
        }, t.prototype.close = function(t) {
            var e = this;
            this.finalized || (this.finalized = !0, void 0 !== t && (this.finalError = t), this.task.then(function() {
                e.observers = void 0, e.onNoObservers = void 0
            }))
        }, t
    }();

    function gn() {}
    var wn = ((bn = {})["no-app"] = "No Firebase App '{$name}' has been created - call Firebase App.initializeApp()", bn["bad-app-name"] = "Illegal App name: '{$name}", bn["duplicate-app"] = "Firebase App named '{$name}' already exists", bn["app-deleted"] = "Firebase App named '{$name}' already deleted", bn["duplicate-service"] = "Firebase service named '{$name}' already registered", bn["invalid-app-argument"] = "firebase.{$name}() takes either no argument or a Firebase App instance.", bn),
        _n = new dn("app", "Firebase", wn);

    function On(t, e) {
        throw _n.create(t, e)
    }
    var Sn = "[DEFAULT]",
        jn = [],
        An = function() {
            function t(t, e, r) {
                this.firebase_ = r, this.isDeleted_ = !1, this.services_ = {}, this.name_ = e.name, this.automaticDataCollectionEnabled_ = e.automaticDataCollectionEnabled || !1, this.options_ = ln(void 0, t), this.INTERNAL = {
                    getUid: function() {
                        return null
                    },
                    getToken: function() {
                        return Promise.resolve(null)
                    },
                    addAuthTokenListener: function(t) {
                        jn.push(t), setTimeout(function() {
                            return t(null)
                        }, 0)
                    },
                    removeAuthTokenListener: function(e) {
                        jn = jn.filter(function(t) {
                            return t !== e
                        })
                    }
                }
            }
            return Object.defineProperty(t.prototype, "automaticDataCollectionEnabled", {
                get: function() {
                    return this.checkDestroyed_(), this.automaticDataCollectionEnabled_
                },
                set: function(t) {
                    this.checkDestroyed_(), this.automaticDataCollectionEnabled_ = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "name", {
                get: function() {
                    return this.checkDestroyed_(), this.name_
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "options", {
                get: function() {
                    return this.checkDestroyed_(), this.options_
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.delete = function() {
                var s = this;
                return new Promise(function(t) {
                    s.checkDestroyed_(), t()
                }).then(function() {
                    s.firebase_.INTERNAL.removeApp(s.name_);
                    for (var t = [], e = 0, r = Object.keys(s.services_); e < r.length; e++)
                        for (var n = r[e], o = 0, i = Object.keys(s.services_[n]); o < i.length; o++) {
                            var a = i[o];
                            t.push(s.services_[n][a])
                        }
                    return Promise.all(t.map(function(t) {
                        return t.INTERNAL.delete()
                    }))
                }).then(function() {
                    s.isDeleted_ = !0, s.services_ = {}
                })
            }, t.prototype._getService = function(t, e) {
                if (void 0 === e && (e = Sn), this.checkDestroyed_(), this.services_[t] || (this.services_[t] = {}), !this.services_[t][e]) {
                    var r = e !== Sn ? e : void 0,
                        n = this.firebase_.INTERNAL.factories[t](this, this.extendApp.bind(this), r);
                    this.services_[t][e] = n
                }
                return this.services_[t][e]
            }, t.prototype.extendApp = function(t) {
                var e = this;
                ln(this, t), t.INTERNAL && t.INTERNAL.addAuthTokenListener && (jn.forEach(function(t) {
                    e.INTERNAL.addAuthTokenListener(t)
                }), jn = [])
            }, t.prototype.checkDestroyed_ = function() {
                this.isDeleted_ && On("app-deleted", {
                    name: this.name_
                })
            }, t
        }();

    function En(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    An.prototype.name && An.prototype.options || An.prototype.delete || console.log("dc");
    var Tn = !1;
    try {
        Tn = "[object process]" === Object.prototype.toString.call(global.process)
    } catch (t) {}
    if (Tn && console.warn('\nWarning: This is a browser-targeted Firebase bundle but it appears it is being\nrun in a Node environment.  If running in a Node environment, make sure you\nare using the bundle specified by the "main" field in package.json.\n\nIf you are using Webpack, you can specify "main" as the first item in\n"resolve.mainFields":\nhttps://webpack.js.org/configuration/resolve/#resolvemainfields\n\nIf using Rollup, use the rollup-plugin-node-resolve plugin and set "module"\nto false and "main" to true:\nhttps://github.com/rollup/rollup-plugin-node-resolve\n'), self && "firebase" in self) {
        console.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");
        var Pn = self.firebase.SDK_VERSION;
        Pn && 0 <= Pn.indexOf("LITE") && console.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")
    }
    return function t() {
        var e = function(a) {
            var s = {},
                u = {},
                c = {},
                f = {
                    __esModule: !0,
                    initializeApp: function(t, e) {
                        if (void 0 === e && (e = {}), "object" != typeof e || null === e) {
                            var r = e;
                            e = {
                                name: r
                            }
                        }
                        var n = e;
                        void 0 === n.name && (n.name = Sn);
                        var o = n.name;
                        "string" == typeof o && o || On("bad-app-name", {
                            name: String(o)
                        }), En(s, o) && On("duplicate-app", {
                            name: o
                        });
                        var i = new a(t, n, f);
                        return h(s[o] = i, "create"), i
                    },
                    app: l,
                    apps: null,
                    Promise: Promise,
                    SDK_VERSION: "5.11.1",
                    INTERNAL: {
                        registerService: function(r, t, e, n, o) {
                            function i(t) {
                                return void 0 === t && (t = l()), "function" != typeof t[r] && On("invalid-app-argument", {
                                    name: r
                                }), t[r]()
                            }
                            return void 0 === o && (o = !1), u[r] && On("duplicate-service", {
                                name: r
                            }), u[r] = t, n && (c[r] = n, p().forEach(function(t) {
                                n("create", t)
                            })), void 0 !== e && ln(i, e), f[r] = i, a.prototype[r] = function() {
                                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                return this._getService.bind(this, r).apply(this, o ? t : [])
                            }, i
                        },
                        removeApp: function(t) {
                            h(s[t], "delete"), delete s[t]
                        },
                        factories: u,
                        useAsService: i
                    }
                };

            function l(t) {
                return En(s, t = t || Sn) || On("no-app", {
                    name: t
                }), s[t]
            }

            function p() {
                return Object.keys(s).map(function(t) {
                    return s[t]
                })
            }

            function h(t, e) {
                for (var r = 0, n = Object.keys(u); r < n.length; r++) {
                    var o = i(t, n[r]);
                    if (null === o) return;
                    c[o] && c[o](e, t)
                }
            }

            function i(t, e) {
                if ("serverAuth" === e) return null;
                var r = e;
                return t.options, r
            }
            return pn(f, "default", f), Object.defineProperty(f, "apps", {
                get: p
            }), pn(l, "App", a), f
        }(An);
        return e.INTERNAL = fn({}, e.INTERNAL, {
            createFirebaseNamespace: t,
            extendNamespace: function(t) {
                ln(e, t)
            },
            createSubscribe: vn,
            ErrorFactory: dn,
            deepExtend: ln
        }), e
    }()
});

// Firestore code

! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(require("@firebase/app")) : "function" == typeof define && define.amd ? define(["@firebase/app"], e) : e((t = t || self).firebase)
}(this, function(bh) {
    "use strict";
    try {
        (function() {
            var o, t;
            bh = bh && bh.hasOwnProperty("default") ? bh.default : bh, (t = o || (o = {}))[t.DEBUG = 0] = "DEBUG", t[t.VERBOSE = 1] = "VERBOSE", t[t.INFO = 2] = "INFO", t[t.WARN = 3] = "WARN", t[t.ERROR = 4] = "ERROR", t[t.SILENT = 5] = "SILENT";
            var e = o.INFO,
                n = function(t, e) {
                    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                    if (!(e < t.logLevel)) {
                        var i = (new Date).toISOString();
                        switch (e) {
                            case o.DEBUG:
                            case o.VERBOSE:
                                console.log.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
                                break;
                            case o.INFO:
                                console.info.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
                                break;
                            case o.WARN:
                                console.warn.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
                                break;
                            case o.ERROR:
                                console.error.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
                                break;
                            default:
                                throw new Error("Attempted to log a message with an invalid logType (value: " + e + ")")
                        }
                    }
                },
                r = function() {
                    function t(t) {
                        this.name = t, this._logLevel = e, this._logHandler = n
                    }
                    return Object.defineProperty(t.prototype, "logLevel", {
                        get: function() {
                            return this._logLevel
                        },
                        set: function(t) {
                            if (!(t in o)) throw new TypeError("Invalid value assigned to `logLevel`");
                            this._logLevel = t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "logHandler", {
                        get: function() {
                            return this._logHandler
                        },
                        set: function(t) {
                            if ("function" != typeof t) throw new TypeError("Value assigned to `logHandler` must be a function");
                            this._logHandler = t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.debug = function() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        this._logHandler.apply(this, [this, o.DEBUG].concat(t))
                    }, t.prototype.log = function() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        this._logHandler.apply(this, [this, o.VERBOSE].concat(t))
                    }, t.prototype.info = function() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        this._logHandler.apply(this, [this, o.INFO].concat(t))
                    }, t.prototype.warn = function() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        this._logHandler.apply(this, [this, o.WARN].concat(t))
                    }, t.prototype.error = function() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        this._logHandler.apply(this, [this, o.ERROR].concat(t))
                    }, t
                }(),
                i = function(t, e) {
                    return (i = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(t, e) {
                            t.__proto__ = e
                        } || function(t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(t, e)
                };

            function s(t, e) {
                function n() {
                    this.constructor = t
                }
                i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
            }

            function h(o, a, s, u) {
                return new(s || (s = Promise))(function(t, e) {
                    function n(t) {
                        try {
                            i(u.next(t))
                        } catch (t) {
                            e(t)
                        }
                    }

                    function r(t) {
                        try {
                            i(u.throw(t))
                        } catch (t) {
                            e(t)
                        }
                    }

                    function i(e) {
                        e.done ? t(e.value) : new s(function(t) {
                            t(e.value)
                        }).then(n, r)
                    }
                    i((u = u.apply(o, a || [])).next())
                })
            }

            function p(n, r) {
                var i, o, a, t, s = {
                    label: 0,
                    sent: function() {
                        if (1 & a[0]) throw a[1];
                        return a[1]
                    },
                    trys: [],
                    ops: []
                };
                return t = {
                    next: e(0),
                    throw: e(1),
                    return: e(2)
                }, "function" == typeof Symbol && (t[Symbol.iterator] = function() {
                    return this
                }), t;

                function e(e) {
                    return function(t) {
                        return function(e) {
                            if (i) throw new TypeError("Generator is already executing.");
                            for (; s;) try {
                                if (i = 1, o && (a = 2 & e[0] ? o.return : e[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, e[1])).done) return a;
                                switch (o = 0, a && (e = [2 & e[0], a.value]), e[0]) {
                                    case 0:
                                    case 1:
                                        a = e;
                                        break;
                                    case 4:
                                        return s.label++, {
                                            value: e[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++, o = e[1], e = [0];
                                        continue;
                                    case 7:
                                        e = s.ops.pop(), s.trys.pop();
                                        continue;
                                    default:
                                        if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === e[0] || 2 === e[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === e[0] && (!a || e[1] > a[0] && e[1] < a[3])) {
                                            s.label = e[1];
                                            break
                                        }
                                        if (6 === e[0] && s.label < a[1]) {
                                            s.label = a[1], a = e;
                                            break
                                        }
                                        if (a && s.label < a[2]) {
                                            s.label = a[2], s.ops.push(e);
                                            break
                                        }
                                        a[2] && s.ops.pop(), s.trys.pop();
                                        continue
                                }
                                e = r.call(n, s)
                            } catch (t) {
                                e = [6, t], o = 0
                            } finally {
                                i = a = 0
                            }
                            if (5 & e[0]) throw e[1];
                            return {
                                value: e[0] ? e[1] : void 0,
                                done: !0
                            }
                        }([e, t])
                    }
                }
            }
            var a, u = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
                c = c || {},
                f = u;

            function l(t) {
                return "string" == typeof t
            }

            function d(t) {
                return "number" == typeof t
            }

            function m(t, e) {
                t = t.split("."), e = e || f;
                for (var n = 0; n < t.length; n++)
                    if (null == (e = e[t[n]])) return null;
                return e
            }

            function y() {}

            function g(t) {
                var e = typeof t;
                if ("object" == e) {
                    if (!t) return "null";
                    if (t instanceof Array) return "array";
                    if (t instanceof Object) return e;
                    var n = Object.prototype.toString.call(t);
                    if ("[object Window]" == n) return "object";
                    if ("[object Array]" == n || "number" == typeof t.length && void 0 !== t.splice && void 0 !== t.propertyIsEnumerable && !t.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == n || void 0 !== t.call && void 0 !== t.propertyIsEnumerable && !t.propertyIsEnumerable("call")) return "function"
                } else if ("function" == e && void 0 === t.call) return "object";
                return e
            }

            function v(t) {
                return "array" == g(t)
            }

            function b(t) {
                var e = g(t);
                return "array" == e || "object" == e && "number" == typeof t.length
            }

            function w(t) {
                var e = typeof t;
                return "object" == e && null != t || "function" == e
            }
            var E = "closure_uid_" + (1e9 * Math.random() >>> 0),
                S = 0;

            function T(t, e, n) {
                return t.call.apply(t.bind, arguments)
            }

            function I(e, n, t) {
                if (!e) throw Error();
                if (2 < arguments.length) {
                    var r = Array.prototype.slice.call(arguments, 2);
                    return function() {
                        var t = Array.prototype.slice.call(arguments);
                        return Array.prototype.unshift.apply(t, r), e.apply(n, t)
                    }
                }
                return function() {
                    return e.apply(n, arguments)
                }
            }

            function C(t, e, n) {
                return (C = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? T : I).apply(null, arguments)
            }

            function D(e, t) {
                var n = Array.prototype.slice.call(arguments, 1);
                return function() {
                    var t = n.slice();
                    return t.push.apply(t, arguments), e.apply(this, t)
                }
            }
            var N = Date.now || function() {
                return +new Date
            };

            function A(t, o) {
                function e() {}
                e.prototype = o.prototype, t.N = o.prototype, t.prototype = new e, (t.prototype.constructor = t).yb = function(t, e, n) {
                    for (var r = Array(arguments.length - 2), i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
                    return o.prototype[e].apply(t, r)
                }
            }

            function k() {
                this.j = this.j, this.i = this.i
            }
            k.prototype.j = !1, k.prototype.la = function() {
                if (!this.j && (this.j = !0, this.G(), 0)) this[E] || (this[E] = ++S)
            }, k.prototype.G = function() {
                if (this.i)
                    for (; this.i.length;) this.i.shift()()
            };
            var R = Array.prototype.indexOf ? function(t, e) {
                    return Array.prototype.indexOf.call(t, e, void 0)
                } : function(t, e) {
                    if (l(t)) return l(e) && 1 == e.length ? t.indexOf(e, 0) : -1;
                    for (var n = 0; n < t.length; n++)
                        if (n in t && t[n] === e) return n;
                    return -1
                },
                M = Array.prototype.forEach ? function(t, e, n) {
                    Array.prototype.forEach.call(t, e, n)
                } : function(t, e, n) {
                    for (var r = t.length, i = l(t) ? t.split("") : t, o = 0; o < r; o++) o in i && e.call(n, i[o], o, t)
                };

            function O(t) {
                return Array.prototype.concat.apply([], arguments)
            }

            function _(t) {
                var e = t.length;
                if (0 < e) {
                    for (var n = Array(e), r = 0; r < e; r++) n[r] = t[r];
                    return n
                }
                return []
            }

            function P(t) {
                return /^[\s\xa0]*$/.test(t)
            }
            var L, x = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]
            };

            function q(t, e) {
                return -1 != t.indexOf(e)
            }

            function F(t, e) {
                return t < e ? -1 : e < t ? 1 : 0
            }
            t: {
                var V = f.navigator;
                if (V) {
                    var B = V.userAgent;
                    if (B) {
                        L = B;
                        break t
                    }
                }
                L = ""
            }

            function U(t, e, n) {
                for (var r in t) e.call(n, t[r], r, t)
            }

            function Q(t) {
                var e, n = {};
                for (e in t) n[e] = t[e];
                return n
            }
            var K = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

            function j(t, e) {
                for (var n, r, i = 1; i < arguments.length; i++) {
                    for (n in r = arguments[i]) t[n] = r[n];
                    for (var o = 0; o < K.length; o++) n = K[o], Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
                }
            }

            function G(t) {
                return G[" "](t), t
            }
            G[" "] = y;
            var W, z, H = q(L, "Opera"),
                Y = q(L, "Trident") || q(L, "MSIE"),
                X = q(L, "Edge"),
                J = X || Y,
                $ = q(L, "Gecko") && !(q(L.toLowerCase(), "webkit") && !q(L, "Edge")) && !(q(L, "Trident") || q(L, "MSIE")) && !q(L, "Edge"),
                Z = q(L.toLowerCase(), "webkit") && !q(L, "Edge");

            function tt() {
                var t = f.document;
                return t ? t.documentMode : void 0
            }
            t: {
                var et = "",
                    nt = (z = L, $ ? /rv:([^\);]+)(\)|;)/.exec(z) : X ? /Edge\/([\d\.]+)/.exec(z) : Y ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(z) : Z ? /WebKit\/(\S+)/.exec(z) : H ? /(?:Version)[ \/]?(\S+)/.exec(z) : void 0);
                if (nt && (et = nt ? nt[1] : ""), Y) {
                    var rt = tt();
                    if (null != rt && rt > parseFloat(et)) {
                        W = String(rt);
                        break t
                    }
                }
                W = et
            }
            var it, ot = {};

            function at(s) {
                return t = s, e = function() {
                    for (var t = 0, e = x(String(W)).split("."), n = x(String(s)).split("."), r = Math.max(e.length, n.length), i = 0; 0 == t && i < r; i++) {
                        var o = e[i] || "",
                            a = n[i] || "";
                        do {
                            if (o = /(\d*)(\D*)(.*)/.exec(o) || ["", "", "", ""], a = /(\d*)(\D*)(.*)/.exec(a) || ["", "", "", ""], 0 == o[0].length && 0 == a[0].length) break;
                            t = F(0 == o[1].length ? 0 : parseInt(o[1], 10), 0 == a[1].length ? 0 : parseInt(a[1], 10)) || F(0 == o[2].length, 0 == a[2].length) || F(o[2], a[2]), o = o[3], a = a[3]
                        } while (0 == t)
                    }
                    return 0 <= t
                }, n = ot, Object.prototype.hasOwnProperty.call(n, t) ? n[t] : n[t] = e(t);
                var t, e, n
            }
            var st = f.document;
            it = st && Y ? tt() || ("CSS1Compat" == st.compatMode ? parseInt(W, 10) : 5) : void 0;
            var ut = !Y || 9 <= Number(it),
                ct = Y && !at("9"),
                ht = function() {
                    if (!f.addEventListener || !Object.defineProperty) return !1;
                    var t = !1,
                        e = Object.defineProperty({}, "passive", {
                            get: function() {
                                t = !0
                            }
                        });
                    try {
                        f.addEventListener("test", y, e), f.removeEventListener("test", y, e)
                    } catch (t) {}
                    return t
                }();

            function lt(t, e) {
                this.type = t, this.a = this.target = e, this.Ja = !0
            }

            function ft(t, e) {
                if (lt.call(this, t ? t.type : ""), this.relatedTarget = this.a = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = "", this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.pointerId = 0, this.pointerType = "", this.c = null, t) {
                    var n = this.type = t.type,
                        r = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : null;
                    if (this.target = t.target || t.srcElement, this.a = e, e = t.relatedTarget) {
                        if ($) {
                            t: {
                                try {
                                    G(e.nodeName);
                                    var i = !0;
                                    break t
                                } catch (t) {}
                                i = !1
                            }
                            i || (e = null)
                        }
                    } else "mouseover" == n ? e = t.fromElement : "mouseout" == n && (e = t.toElement);
                    this.relatedTarget = e, this.screenY = r ? (this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX, this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY, this.screenX = r.screenX || 0, r.screenY || 0) : (this.clientX = void 0 !== t.clientX ? t.clientX : t.pageX, this.clientY = void 0 !== t.clientY ? t.clientY : t.pageY, this.screenX = t.screenX || 0, t.screenY || 0), this.button = t.button, this.key = t.key || "", this.ctrlKey = t.ctrlKey, this.altKey = t.altKey, this.shiftKey = t.shiftKey, this.metaKey = t.metaKey, this.pointerId = t.pointerId || 0, this.pointerType = l(t.pointerType) ? t.pointerType : pt[t.pointerType] || "", (this.c = t).defaultPrevented && this.b()
                }
            }
            lt.prototype.b = function() {
                this.Ja = !1
            }, A(ft, lt);
            var pt = {
                2: "touch",
                3: "pen",
                4: "mouse"
            };
            ft.prototype.b = function() {
                ft.N.b.call(this);
                var t = this.c;
                if (t.preventDefault) t.preventDefault();
                else if (t.returnValue = !1, ct) try {
                    (t.ctrlKey || 112 <= t.keyCode && t.keyCode <= 123) && (t.keyCode = -1)
                } catch (t) {}
            };
            var dt = "closure_listenable_" + (1e6 * Math.random() | 0),
                mt = 0;

            function yt(t, e, n, r, i) {
                this.listener = t, this.proxy = null, this.src = e, this.type = n, this.capture = !!r, this.da = i, this.key = ++mt, this.X = this.Z = !1
            }

            function gt(t) {
                t.X = !0, t.listener = null, t.proxy = null, t.src = null, t.da = null
            }

            function vt(t) {
                this.src = t, this.a = {}, this.b = 0
            }

            function bt(t, e) {
                var n = e.type;
                if (n in t.a) {
                    var r, i = t.a[n],
                        o = R(i, e);
                    (r = 0 <= o) && Array.prototype.splice.call(i, o, 1), r && (gt(e), 0 == t.a[n].length && (delete t.a[n], t.b--))
                }
            }

            function wt(t, e, n, r) {
                for (var i = 0; i < t.length; ++i) {
                    var o = t[i];
                    if (!o.X && o.listener == e && o.capture == !!n && o.da == r) return i
                }
                return -1
            }
            vt.prototype.add = function(t, e, n, r, i) {
                var o = t.toString();
                (t = this.a[o]) || (t = this.a[o] = [], this.b++);
                var a = wt(t, e, r, i);
                return -1 < a ? (e = t[a], n || (e.Z = !1)) : ((e = new yt(e, this.src, o, !!r, i)).Z = n, t.push(e)), e
            };
            var Et = "closure_lm_" + (1e6 * Math.random() | 0),
                St = {};

            function Tt(t, e, n, r, i) {
                if (r && r.once) return function t(e, n, r, i, o) {
                    if (v(n)) {
                        for (var a = 0; a < n.length; a++) t(e, n[a], r, i, o);
                        return null
                    }
                    r = Mt(r);
                    return e && e[dt] ? e.Ba(n, r, w(i) ? !!i.capture : !!i, o) : It(e, n, r, !0, i, o)
                }(t, e, n, r, i);
                if (v(e)) {
                    for (var o = 0; o < e.length; o++) Tt(t, e[o], n, r, i);
                    return null
                }
                return n = Mt(n), t && t[dt] ? t.Aa(e, n, w(r) ? !!r.capture : !!r, i) : It(t, e, n, !1, r, i)
            }

            function It(t, e, n, r, i, o) {
                if (!e) throw Error("Invalid event type");
                var a = w(i) ? !!i.capture : !!i;
                if (a && !ut) return null;
                var s, u, c = kt(t);
                if (c || (t[Et] = c = new vt(t)), (n = c.add(e, n, r, a, o)).proxy) return n;
                if (s = At, r = u = ut ? function(t) {
                        return s.call(u.src, u.listener, t)
                    } : function(t) {
                        if (!(t = s.call(u.src, u.listener, t))) return t
                    }, (n.proxy = r).src = t, r.listener = n, t.addEventListener) ht || (i = a), void 0 === i && (i = !1), t.addEventListener(e.toString(), r, i);
                else if (t.attachEvent) t.attachEvent(Dt(e.toString()), r);
                else {
                    if (!t.addListener || !t.removeListener) throw Error("addEventListener and attachEvent are unavailable.");
                    t.addListener(r)
                }
                return n
            }

            function Ct(t) {
                if (!d(t) && t && !t.X) {
                    var e = t.src;
                    if (e && e[dt]) bt(e.c, t);
                    else {
                        var n = t.type,
                            r = t.proxy;
                        e.removeEventListener ? e.removeEventListener(n, r, t.capture) : e.detachEvent ? e.detachEvent(Dt(n), r) : e.addListener && e.removeListener && e.removeListener(r), (n = kt(e)) ? (bt(n, t), 0 == n.b && (n.src = null, e[Et] = null)) : gt(t)
                    }
                }
            }

            function Dt(t) {
                return t in St ? St[t] : St[t] = "on" + t
            }

            function Nt(t, e) {
                var n = t.listener,
                    r = t.da || t.src;
                return t.Z && Ct(t), n.call(r, e)
            }

            function At(t, e) {
                return !!t.X || (ut ? Nt(t, new ft(e, this)) : Nt(t, e = new ft(e || m("window.event"), this)))
            }

            function kt(t) {
                return (t = t[Et]) instanceof vt ? t : null
            }
            var Rt = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);

            function Mt(e) {
                return "function" == g(e) ? e : (e[Rt] || (e[Rt] = function(t) {
                    return e.handleEvent(t)
                }), e[Rt])
            }

            function Ot() {
                k.call(this), this.c = new vt(this), (this.J = this).B = null
            }

            function _t(t, e, n, r) {
                if (!(e = t.c.a[String(e)])) return !0;
                e = e.concat();
                for (var i = !0, o = 0; o < e.length; ++o) {
                    var a = e[o];
                    if (a && !a.X && a.capture == n) {
                        var s = a.listener,
                            u = a.da || a.src;
                        a.Z && bt(t.c, a), i = !1 !== s.call(u, r) && i
                    }
                }
                return i && 0 != r.Ja
            }
            A(Ot, k), Ot.prototype[dt] = !0, (a = Ot.prototype).addEventListener = function(t, e, n, r) {
                Tt(this, t, e, n, r)
            }, a.removeEventListener = function(t, e, n, r) {
                ! function t(e, n, r, i, o) {
                    if (v(n))
                        for (var a = 0; a < n.length; a++) t(e, n[a], r, i, o);
                    else i = w(i) ? !!i.capture : !!i, r = Mt(r), e && e[dt] ? (e = e.c, (n = String(n).toString()) in e.a && -1 < (r = wt(a = e.a[n], r, i, o)) && (gt(a[r]), Array.prototype.splice.call(a, r, 1), 0 == a.length && (delete e.a[n], e.b--))) : e && (e = kt(e)) && (n = e.a[n.toString()], e = -1, n && (e = wt(n, r, i, o)), (r = -1 < e ? n[e] : null) && Ct(r))
                }(this, t, e, n, r)
            }, a.dispatchEvent = function(t) {
                var e, n = this.B;
                if (n)
                    for (e = []; n; n = n.B) e.push(n);
                n = this.J;
                var r = t.type || t;
                if (l(t)) t = new lt(t, n);
                else if (t instanceof lt) t.target = t.target || n;
                else {
                    var i = t;
                    j(t = new lt(r, n), i)
                }
                if (i = !0, e)
                    for (var o = e.length - 1; 0 <= o; o--) {
                        var a = t.a = e[o];
                        i = _t(a, r, !0, t) && i
                    }
                if (i = _t(a = t.a = n, r, !0, t) && i, i = _t(a, r, !1, t) && i, e)
                    for (o = 0; o < e.length; o++) i = _t(a = t.a = e[o], r, !1, t) && i;
                return i
            }, a.G = function() {
                if (Ot.N.G.call(this), this.c) {
                    var t, e = this.c;
                    for (t in e.a) {
                        for (var n = e.a[t], r = 0; r < n.length; r++) gt(n[r]);
                        delete e.a[t], e.b--
                    }
                }
                this.B = null
            }, a.Aa = function(t, e, n, r) {
                return this.c.add(String(t), e, !1, n, r)
            }, a.Ba = function(t, e, n, r) {
                return this.c.add(String(t), e, !0, n, r)
            };
            var Pt = f.JSON.stringify;

            function Lt(t, e) {
                this.c = t, this.f = e, this.b = 0, this.a = null
            }

            function xt() {
                this.b = this.a = null
            }
            Lt.prototype.get = function() {
                if (0 < this.b) {
                    this.b--;
                    var t = this.a;
                    this.a = t.next, t.next = null
                } else t = this.c();
                return t
            };
            var qt, Ft = new Lt(function() {
                return new Vt
            }, function(t) {
                t.reset()
            });

            function Vt() {
                this.next = this.b = this.a = null
            }

            function Bt(t) {
                f.setTimeout(function() {
                    throw t
                }, 0)
            }

            function Ut(t, e) {
                var n;
                qt || (n = f.Promise.resolve(void 0), qt = function() {
                    n.then(jt)
                }), Qt || (qt(), Qt = !0), Kt.add(t, e)
            }
            xt.prototype.add = function(t, e) {
                var n = Ft.get();
                n.set(t, e), this.b ? this.b.next = n : this.a = n, this.b = n
            }, Vt.prototype.set = function(t, e) {
                this.a = t, this.b = e, this.next = null
            };
            var Qt = !(Vt.prototype.reset = function() {
                    this.next = this.b = this.a = null
                }),
                Kt = new xt;

            function jt() {
                for (var t; r = n = void 0, r = null, (n = Kt).a && (r = n.a, n.a = n.a.next, n.a || (n.b = null), r.next = null), t = r;) {
                    try {
                        t.a.call(t.b)
                    } catch (t) {
                        Bt(t)
                    }
                    var e = Ft;
                    e.f(t), e.b < 100 && (e.b++, t.next = e.a, e.a = t)
                }
                var n, r;
                Qt = !1
            }

            function Gt(t, e) {
                Ot.call(this), this.b = t || 1, this.a = e || f, this.f = C(this.gb, this), this.g = N()
            }

            function Wt(t) {
                t.ba = !1, t.L && (t.a.clearTimeout(t.L), t.L = null)
            }

            function zt(t, e, n) {
                if ("function" == g(t)) n && (t = C(t, n));
                else {
                    if (!t || "function" != typeof t.handleEvent) throw Error("Invalid listener argument");
                    t = C(t.handleEvent, t)
                }
                return 2147483647 < Number(e) ? -1 : f.setTimeout(t, e || 0)
            }

            function Ht(t, e, n) {
                k.call(this), this.f = null != n ? C(t, n) : t, this.c = e, this.b = C(this.ab, this), this.a = []
            }

            function Yt(t) {
                t.U = zt(t.b, t.c), t.f.apply(null, t.a)
            }

            function Xt(t) {
                k.call(this), this.b = t, this.a = {}
            }
            A(Gt, Ot), (a = Gt.prototype).ba = !1, a.L = null, a.gb = function() {
                if (this.ba) {
                    var t = N() - this.g;
                    0 < t && t < .8 * this.b ? this.L = this.a.setTimeout(this.f, this.b - t) : (this.L && (this.a.clearTimeout(this.L), this.L = null), this.dispatchEvent("tick"), this.ba && (Wt(this), this.start()))
                }
            }, a.start = function() {
                this.ba = !0, this.L || (this.L = this.a.setTimeout(this.f, this.b), this.g = N())
            }, a.G = function() {
                Gt.N.G.call(this), Wt(this), delete this.a
            }, A(Ht, k), (a = Ht.prototype).ea = !1, a.U = null, a.Ua = function(t) {
                this.a = arguments, this.U ? this.ea = !0 : Yt(this)
            }, a.G = function() {
                Ht.N.G.call(this), this.U && (f.clearTimeout(this.U), this.U = null, this.ea = !1, this.a = [])
            }, a.ab = function() {
                this.U = null, this.ea && (this.ea = !1, Yt(this))
            }, A(Xt, k);
            var Jt = [];

            function $t(t, e, n, r) {
                v(n) || (n && (Jt[0] = n.toString()), n = Jt);
                for (var i = 0; i < n.length; i++) {
                    var o = Tt(e, n[i], r || t.handleEvent, !1, t.b || t);
                    if (!o) break;
                    t.a[o.key] = o
                }
            }

            function Zt(t) {
                U(t.a, function(t, e) {
                    this.a.hasOwnProperty(e) && Ct(t)
                }, t), t.a = {}
            }

            function te() {}
            Xt.prototype.G = function() {
                Xt.N.G.call(this), Zt(this)
            }, Xt.prototype.handleEvent = function() {
                throw Error("EventHandler.handleEvent not implemented")
            };
            var ee = new Ot;

            function ne(t) {
                lt.call(this, "serverreachability", t)
            }

            function re(t) {
                ee.dispatchEvent(new ne(ee, t))
            }

            function ie(t) {
                lt.call(this, "statevent", t)
            }

            function oe(t) {
                ee.dispatchEvent(new ie(ee, t))
            }

            function ae(t) {
                lt.call(this, "timingevent", t)
            }

            function se(t, e) {
                if ("function" != g(t)) throw Error("Fn must not be null and must be a function");
                return f.setTimeout(function() {
                    t()
                }, e)
            }
            A(ne, lt), A(ie, lt), A(ae, lt);
            var ue = {
                    NO_ERROR: 0,
                    hb: 1,
                    ob: 2,
                    nb: 3,
                    kb: 4,
                    mb: 5,
                    pb: 6,
                    Ma: 7,
                    TIMEOUT: 8,
                    sb: 9
                },
                ce = {
                    jb: "complete",
                    wb: "success",
                    Na: "error",
                    Ma: "abort",
                    ub: "ready",
                    vb: "readystatechange",
                    TIMEOUT: "timeout",
                    qb: "incrementaldata",
                    tb: "progress",
                    lb: "downloadprogress",
                    xb: "uploadprogress"
                };

            function he() {}

            function le(t) {
                var e;
                return (e = t.a) || (e = t.a = {}), e
            }

            function fe() {}
            he.prototype.a = null;
            var pe, de = {
                OPEN: "a",
                ib: "b",
                Na: "c",
                rb: "d"
            };

            function me() {
                lt.call(this, "d")
            }

            function ye() {
                lt.call(this, "c")
            }

            function ge() {}

            function ve(t, e, n) {
                this.g = t, this.W = e, this.V = n || 1, this.I = new Xt(this), this.O = be, t = J ? 125 : void 0, this.P = new Gt(t), this.h = null, this.b = !1, this.l = this.D = this.f = this.F = this.v = this.R = this.i = null, this.j = [], this.a = null, this.A = 0, this.c = this.w = null, this.o = -1, this.m = !1, this.J = 0, this.B = null, this.s = this.S = this.H = !1
            }
            A(me, lt), A(ye, lt), A(ge, he), pe = new ge;
            var be = 45e3,
                we = {},
                Ee = {};

            function Se(t, e, n) {
                t.F = 1, t.f = ze(Be(e)), t.l = n, t.H = !0, Ie(t, null)
            }

            function Te(t, e, n, r) {
                t.F = 1, t.f = ze(Be(e)), t.l = null, t.H = n, Ie(t, r)
            }

            function Ie(t, e) {
                t.v = N(), Ne(t), t.D = Be(t.f), We(t.D, "t", t.V), t.A = 0, t.a = t.g.$(t.g.Y() ? e : null), 0 < t.J && (t.B = new Ht(C(t.Ka, t, t.a), t.J)), $t(t.I, t.a, "readystatechange", t.eb), e = t.h ? Q(t.h) : {}, t.l ? (t.w || (t.w = "POST"), e["Content-Type"] = "application/x-www-form-urlencoded", t.a.ca(t.D, t.w, t.l, e)) : (t.w = "GET", t.a.ca(t.D, t.w, null, e)), re(1)
            }

            function Ce(t, e, n) {
                for (var r = !0; !t.m && t.A < n.length;) {
                    var i = De(t, n);
                    if (i == Ee) {
                        4 == e && (t.c = 4, oe(14), r = !1);
                        break
                    }
                    if (i == we) {
                        t.c = 4, oe(15), r = !1;
                        break
                    }
                    Oe(t, i)
                }
                4 == e && 0 == n.length && (t.c = 1, oe(16), r = !1), t.b = t.b && r, r || (Me(t), Re(t))
            }

            function De(t, e) {
                var n = t.A,
                    r = e.indexOf("\n", n);
                return -1 == r ? Ee : (n = Number(e.substring(n, r)), isNaN(n) ? we : (r += 1) + n > e.length ? Ee : (e = e.substr(r, n), t.A = r + n, e))
            }

            function Ne(t) {
                t.R = N() + t.O, Ae(t, t.O)
            }

            function Ae(t, e) {
                if (null != t.i) throw Error("WatchDog timer not null");
                t.i = se(C(t.bb, t), e)
            }

            function ke(t) {
                t.i && (f.clearTimeout(t.i), t.i = null)
            }

            function Re(t) {
                t.g.Da() || t.m || t.g.na(t)
            }

            function Me(t) {
                ke(t);
                var e = t.B;
                e && "function" == typeof e.la && e.la(), t.B = null, Wt(t.P), Zt(t.I), t.a && (e = t.a, t.a = null, e.abort(), e.la())
            }

            function Oe(t, e) {
                try {
                    t.g.Ga(t, e), re(4)
                } catch (t) {}
            }

            function _e(t, e) {
                if (t.forEach && "function" == typeof t.forEach) t.forEach(e, void 0);
                else if (b(t) || l(t)) M(t, e, void 0);
                else {
                    if (t.K && "function" == typeof t.K) var n = t.K();
                    else if (t.C && "function" == typeof t.C) n = void 0;
                    else if (b(t) || l(t)) {
                        n = [];
                        for (var r = t.length, i = 0; i < r; i++) n.push(i)
                    } else
                        for (i in n = [], r = 0, t) n[r++] = i;
                    i = (r = function(t) {
                        if (t.C && "function" == typeof t.C) return t.C();
                        if (l(t)) return t.split("");
                        if (b(t)) {
                            for (var e = [], n = t.length, r = 0; r < n; r++) e.push(t[r]);
                            return e
                        }
                        for (r in e = [], n = 0, t) e[n++] = t[r];
                        return e
                    }(t)).length;
                    for (var o = 0; o < i; o++) e.call(void 0, r[o], n && n[o], t)
                }
            }

            function Pe(t, e) {
                this.b = {}, this.a = [], this.c = 0;
                var n = arguments.length;
                if (1 < n) {
                    if (n % 2) throw Error("Uneven number of arguments");
                    for (var r = 0; r < n; r += 2) this.set(arguments[r], arguments[r + 1])
                } else if (t)
                    if (t instanceof Pe)
                        for (n = t.K(), r = 0; r < n.length; r++) this.set(n[r], t.get(n[r]));
                    else
                        for (r in t) this.set(r, t[r])
            }

            function Le(t, e) {
                qe(t.b, e) && (delete t.b[e], t.c--, t.a.length > 2 * t.c && xe(t))
            }

            function xe(t) {
                if (t.c != t.a.length) {
                    for (var e = 0, n = 0; e < t.a.length;) {
                        var r = t.a[e];
                        qe(t.b, r) && (t.a[n++] = r), e++
                    }
                    t.a.length = n
                }
                if (t.c != t.a.length) {
                    var i = {};
                    for (n = e = 0; e < t.a.length;) qe(i, r = t.a[e]) || (i[t.a[n++] = r] = 1), e++;
                    t.a.length = n
                }
            }

            function qe(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }(a = ve.prototype).setTimeout = function(t) {
                this.O = t
            }, a.eb = function(t) {
                t = t.target;
                var e = this.B;
                e && 3 == Bn(t) ? e.Ua() : this.Ka(t)
            }, a.Ka = function(t) {
                try {
                    if (t == this.a) t: {
                        var e = Bn(this.a),
                            n = this.a.ya(),
                            r = this.a.T();
                        if (!(e < 3 || 3 == e && !J && !this.a.aa())) {
                            this.m || 4 != e || 7 == n || re(8 == n || r <= 0 ? 3 : 2), ke(this);
                            var i = this.a.T();
                            this.o = i;
                            var o = this.a.aa();
                            if (this.b = 200 == i) {
                                if (this.S && !this.s) {
                                    e: {
                                        if (this.a) {
                                            var a = Un(this.a, "X-HTTP-Initial-Response");
                                            if (a && !P(a)) {
                                                var s = a;
                                                break e
                                            }
                                        }
                                        s = null
                                    }
                                    if (!s) {
                                        this.b = !1, this.c = 3, oe(12), Me(this), Re(this);
                                        break t
                                    }
                                    this.s = !0,
                                    Oe(this, s)
                                }
                                this.H ? (Ce(this, e, o), J && this.b && 3 == e && ($t(this.I, this.P, "tick", this.cb), this.P.start())) : Oe(this, o), 4 == e && Me(this), this.b && !this.m && (4 == e ? this.g.na(this) : (this.b = !1, Ne(this)))
                            } else 400 == i && 0 < o.indexOf("Unknown SID") ? (this.c = 3, oe(12)) : (this.c = 0, oe(13)), Me(this), Re(this)
                        }
                    }
                } catch (t) {}
            }, a.cb = function() {
                if (this.a) {
                    var t = Bn(this.a),
                        e = this.a.aa();
                    this.A < e.length && (ke(this), Ce(this, t, e), this.b && 4 != t && Ne(this))
                }
            }, a.cancel = function() {
                this.m = !0, Me(this)
            }, a.bb = function() {
                this.i = null;
                var t = N();
                0 <= t - this.R ? (2 != this.F && (re(3), oe(17)), Me(this), this.c = 2, Re(this)) : Ae(this, this.R - t)
            }, (a = Pe.prototype).C = function() {
                xe(this);
                for (var t = [], e = 0; e < this.a.length; e++) t.push(this.b[this.a[e]]);
                return t
            }, a.K = function() {
                return xe(this), this.a.concat()
            }, a.get = function(t, e) {
                return qe(this.b, t) ? this.b[t] : e
            }, a.set = function(t, e) {
                qe(this.b, t) || (this.c++, this.a.push(t)), this.b[t] = e
            }, a.forEach = function(t, e) {
                for (var n = this.K(), r = 0; r < n.length; r++) {
                    var i = n[r],
                        o = this.get(i);
                    t.call(e, o, i, this)
                }
            };
            var Fe = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

            function Ve(t, e) {
                var n;
                this.b = this.j = this.f = "", this.i = null, this.g = this.a = "", this.h = !1, t instanceof Ve ? (this.h = void 0 !== e ? e : t.h, Ue(this, t.f), this.j = t.j, Qe(this, t.b), Ke(this, t.i), this.a = t.a, je(this, un(t.c)), this.g = t.g) : t && (n = String(t).match(Fe)) ? (this.h = !!e, Ue(this, n[1] || "", !0), this.j = He(n[2] || ""), Qe(this, n[3] || "", !0), Ke(this, n[4]), this.a = He(n[5] || "", !0), je(this, n[6] || "", !0), this.g = He(n[7] || "")) : (this.h = !!e, this.c = new nn(null, this.h))
            }

            function Be(t) {
                return new Ve(t)
            }

            function Ue(t, e, n) {
                t.f = n ? He(e, !0) : e, t.f && (t.f = t.f.replace(/:$/, ""))
            }

            function Qe(t, e, n) {
                t.b = n ? He(e, !0) : e
            }

            function Ke(t, e) {
                if (e) {
                    if (e = Number(e), isNaN(e) || e < 0) throw Error("Bad port number " + e);
                    t.i = e
                } else t.i = null
            }

            function je(t, e, n) {
                var r, i;
                e instanceof nn ? (t.c = e, r = t.c, (i = t.h) && !r.f && (rn(r), r.c = null, r.a.forEach(function(t, e) {
                    var n = e.toLowerCase();
                    e != n && (on(this, e), sn(this, n, t))
                }, r)), r.f = i) : (n || (e = Ye(e, tn)), t.c = new nn(e, t.h))
            }

            function Ge(t, e, n) {
                t.c.set(e, n)
            }

            function We(t, e, n) {
                v(n) || (n = [String(n)]), sn(t.c, e, n)
            }

            function ze(t) {
                return Ge(t, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ N()).toString(36)), t
            }

            function He(t, e) {
                return t ? e ? decodeURI(t.replace(/%25/g, "%2525")) : decodeURIComponent(t) : ""
            }

            function Ye(t, e, n) {
                return l(t) ? (t = encodeURI(t).replace(e, Xe), n && (t = t.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), t) : null
            }

            function Xe(t) {
                return "%" + ((t = t.charCodeAt(0)) >> 4 & 15).toString(16) + (15 & t).toString(16)
            }
            Ve.prototype.toString = function() {
                var t = [],
                    e = this.f;
                e && t.push(Ye(e, Je, !0), ":");
                var n = this.b;
                return (n || "file" == e) && (t.push("//"), (e = this.j) && t.push(Ye(e, Je, !0), "@"), t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), null != (n = this.i) && t.push(":", String(n))), (n = this.a) && (this.b && "/" != n.charAt(0) && t.push("/"), t.push(Ye(n, "/" == n.charAt(0) ? Ze : $e, !0))), (n = this.c.toString()) && t.push("?", n), (n = this.g) && t.push("#", Ye(n, en)), t.join("")
            }, Ve.prototype.resolve = function(t) {
                var e = Be(this),
                    n = !!t.f;
                n ? Ue(e, t.f) : n = !!t.j, n ? e.j = t.j : n = !!t.b, n ? Qe(e, t.b) : n = null != t.i;
                var r = t.a;
                if (n) Ke(e, t.i);
                else if (n = !!t.a) {
                    if ("/" != r.charAt(0))
                        if (this.b && !this.a) r = "/" + r;
                        else {
                            var i = e.a.lastIndexOf("/"); - 1 != i && (r = e.a.substr(0, i + 1) + r)
                        } if (".." == (i = r) || "." == i) r = "";
                    else if (q(i, "./") || q(i, "/.")) {
                        r = 0 == i.lastIndexOf("/", 0), i = i.split("/");
                        for (var o = [], a = 0; a < i.length;) {
                            var s = i[a++];
                            "." == s ? r && a == i.length && o.push("") : ".." == s ? ((1 < o.length || 1 == o.length && "" != o[0]) && o.pop(), r && a == i.length && o.push("")) : (o.push(s), r = !0)
                        }
                        r = o.join("/")
                    } else r = i
                }
                return n ? e.a = r : n = "" !== t.c.toString(), n ? je(e, un(t.c)) : n = !!t.g, n && (e.g = t.g), e
            };
            var Je = /[#\/\?@]/g,
                $e = /[#\?:]/g,
                Ze = /[#\?]/g,
                tn = /[#\?@]/g,
                en = /#/g;

            function nn(t, e) {
                this.b = this.a = null, this.c = t || null, this.f = !!e
            }

            function rn(n) {
                n.a || (n.a = new Pe, n.b = 0, n.c && function(t, e) {
                    if (t) {
                        t = t.split("&");
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n].indexOf("="),
                                i = null;
                            if (0 <= r) {
                                var o = t[n].substring(0, r);
                                i = t[n].substring(r + 1)
                            } else o = t[n];
                            e(o, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "")
                        }
                    }
                }(n.c, function(t, e) {
                    n.add(decodeURIComponent(t.replace(/\+/g, " ")), e)
                }))
            }

            function on(t, e) {
                rn(t), e = cn(t, e), qe(t.a.b, e) && (t.c = null, t.b -= t.a.get(e).length, Le(t.a, e))
            }

            function an(t, e) {
                return rn(t), e = cn(t, e), qe(t.a.b, e)
            }

            function sn(t, e, n) {
                on(t, e), 0 < n.length && (t.c = null, t.a.set(cn(t, e), _(n)), t.b += n.length)
            }

            function un(t) {
                var e = new nn;
                return e.c = t.c, t.a && (e.a = new Pe(t.a), e.b = t.b), e
            }

            function cn(t, e) {
                return e = String(e), t.f && (e = e.toLowerCase()), e
            }

            function hn(t) {
                this.a = t, this.b = this.h = null, this.g = !1, this.i = null, this.c = -1, this.l = this.f = null
            }

            function ln(t) {
                var e = t.a.F.a;
                if (null != e) oe(4), e ? (oe(10), Zn(t.a, t, !1)) : (oe(11), Zn(t.a, t, !0));
                else {
                    t.b = new ve(t, void 0, void 0), t.b.h = t.h, e = ir(e = t.a, e.Y() ? t.f : null, t.i), oe(4), We(e, "TYPE", "xmlhttp");
                    var n = t.a.j,
                        r = t.a.I;
                    n && r && Ge(e, n, r), Te(t.b, e, !1, t.f)
                }
            }

            function fn() {
                this.a = this.b = null
            }

            function pn() {
                this.a = new Pe
            }

            function dn(t) {
                var e = typeof t;
                return "object" == e && t || "function" == e ? "o" + (t[E] || (t[E] = ++S)) : e.charAt(0) + t
            }

            function mn(t, e) {
                this.b = t, this.a = e
            }

            function yn(t) {
                this.g = t || gn, t = f.PerformanceNavigationTiming ? 0 < (t = f.performance.getEntriesByType("navigation")).length && ("hq" == t[0].nextHopProtocol || "h2" == t[0].nextHopProtocol) : !!(f.ka && f.ka.Ea && f.ka.Ea() && f.ka.Ea().zb), this.f = t ? this.g : 1, this.a = null, 1 < this.f && (this.a = new pn), this.b = null, this.c = []
            }(a = nn.prototype).add = function(t, e) {
                rn(this), this.c = null, t = cn(this, t);
                var n = this.a.get(t);
                return n || this.a.set(t, n = []), n.push(e), this.b += 1, this
            }, a.forEach = function(n, r) {
                rn(this), this.a.forEach(function(t, e) {
                    M(t, function(t) {
                        n.call(r, t, e, this)
                    }, this)
                }, this)
            }, a.K = function() {
                rn(this);
                for (var t = this.a.C(), e = this.a.K(), n = [], r = 0; r < e.length; r++)
                    for (var i = t[r], o = 0; o < i.length; o++) n.push(e[r]);
                return n
            }, a.C = function(t) {
                rn(this);
                var e = [];
                if (l(t)) an(this, t) && (e = O(e, this.a.get(cn(this, t))));
                else {
                    t = this.a.C();
                    for (var n = 0; n < t.length; n++) e = O(e, t[n])
                }
                return e
            }, a.set = function(t, e) {
                return rn(this), this.c = null, an(this, t = cn(this, t)) && (this.b -= this.a.get(t).length), this.a.set(t, [e]), this.b += 1, this
            }, a.get = function(t, e) {
                return t && 0 < (t = this.C(t)).length ? String(t[0]) : e
            }, a.toString = function() {
                if (this.c) return this.c;
                if (!this.a) return "";
                for (var t = [], e = this.a.K(), n = 0; n < e.length; n++) {
                    var r = e[n],
                        i = encodeURIComponent(String(r));
                    r = this.C(r);
                    for (var o = 0; o < r.length; o++) {
                        var a = i;
                        "" !== r[o] && (a += "=" + encodeURIComponent(String(r[o]))), t.push(a)
                    }
                }
                return this.c = t.join("&")
            }, A(function() {}, function() {}), (a = hn.prototype).M = null, a.$ = function(t) {
                return this.a.$(t)
            }, a.abort = function() {
                this.b && (this.b.cancel(), this.b = null), this.c = -1
            }, a.Da = function() {
                return !1
            }, a.Ga = function(t, e) {
                if (this.c = t.o, 0 == this.M) {
                    if (!this.a.o && (t = t.a)) {
                        var n = Un(t, "X-Client-Wire-Protocol");
                        this.l = n || null, this.a.j && (t = Un(t, "X-HTTP-Session-Id")) && (this.a.I = t)
                    }
                    if (e) {
                        try {
                            var r = this.a.ja.a.parse(e)
                        } catch (t) {
                            return (e = this.a).m = this.c, void nr(e, 2)
                        }
                        this.f = r[0]
                    } else(e = this.a).m = this.c, nr(e, 2)
                } else 1 == this.M && (this.g ? oe(6) : "11111" == e ? (oe(5), this.g = !0, (!Y || 10 <= Number(it)) && (this.c = 200, this.b.cancel(), oe(11), Zn(this.a, this, !0))) : (oe(7), this.g = !1))
            }, a.na = function() {
                if (this.c = this.b.o, this.b.b) 0 == this.M ? (this.M = 1, ln(this)) : 1 == this.M && (this.g ? (oe(11), Zn(this.a, this, !0)) : (oe(10), Zn(this.a, this, !1)));
                else {
                    0 == this.M ? oe(8) : 1 == this.M && oe(9);
                    var t = this.a;
                    t.m = this.c, nr(t, 2)
                }
            }, a.Y = function() {
                return this.a.Y()
            }, a.ma = function() {
                return this.a.ma()
            }, pn.prototype.add = function(t) {
                this.a.set(dn(t), t)
            }, pn.prototype.C = function() {
                return this.a.C()
            };
            var gn = 10;

            function vn(t, e) {
                !t.a && (q(e, "spdy") || q(e, "quic") || q(e, "h2")) && (t.f = t.g, t.a = new pn, t.b && (Sn(t, t.b), t.b = null))
            }

            function bn(t) {
                return !!t.b || !!t.a && t.a.a.c >= t.f
            }

            function wn(t) {
                return t.b ? 1 : t.a ? t.a.a.c : 0
            }

            function En(t, e) {
                return t = t.b ? t.b == e : !!t.a && (e = dn(e), qe(t.a.a.b, e))
            }

            function Sn(t, e) {
                t.a ? t.a.add(e) : t.b = e
            }

            function Tn(t, e) {
                var n;
                t.b && t.b == e ? t.b = null : ((n = t.a) && (n = dn(e), n = qe(t.a.a.b, n)), n && Le(t.a.a, dn(e)))
            }

            function In(t) {
                if (null != t.b) return t.c.concat(t.b.j);
                if (null == t.a || 0 == t.a.a.c) return _(t.c);
                var e = t.c;
                return M(t.a.C(), function(t) {
                    e = e.concat(t.j)
                }), e
            }

            function Cn() {}

            function Dn() {
                this.a = new Cn
            }

            function Nn(t, r, e) {
                var i = e || "";
                try {
                    _e(t, function(t, e) {
                        var n = t;
                        w(t) && (n = Pt(t)), r.push(i + e + "=" + encodeURIComponent(n))
                    })
                } catch (t) {
                    throw r.push(i + "type=" + encodeURIComponent("_badmap")), t
                }
            }

            function An(t, e, n, r, i) {
                try {
                    e.onload = null, e.onerror = null, e.onabort = null, e.ontimeout = null, i(r)
                } catch (t) {}
            }
            yn.prototype.cancel = function() {
                var t;
                this.c = In(this), this.b ? (this.b.cancel(), this.b = null) : this.a && 0 != this.a.a.c && (M(this.a.C(), function(t) {
                    t.cancel()
                }), (t = this.a.a).b = {}, t.a.length = 0, t.c = 0)
            }, Cn.prototype.stringify = function(t) {
                return f.JSON.stringify(t, void 0)
            }, Cn.prototype.parse = function(t) {
                return f.JSON.parse(t, void 0)
            };
            var kn = f.JSON.parse;

            function Rn(t) {
                Ot.call(this), this.headers = new Pe, this.H = t || null, this.b = !1, this.s = this.a = null, this.A = "", this.h = 0, this.f = "", this.g = this.w = this.l = this.v = !1, this.o = 0, this.m = null, this.I = Mn, this.D = this.F = !1
            }
            A(Rn, Ot);
            var Mn = "",
                On = /^https?$/i,
                _n = ["POST", "PUT"];

            function Pn(t) {
                return "content-type" == t.toLowerCase()
            }

            function Ln(t, e) {
                t.b = !1, t.a && (t.g = !0, t.a.abort(), t.g = !1), t.f = e, t.h = 5, xn(t), Fn(t)
            }

            function xn(t) {
                t.v || (t.v = !0, t.dispatchEvent("complete"), t.dispatchEvent("error"))
            }

            function qn(t) {
                if (t.b && void 0 !== c && (!t.s[1] || 4 != Bn(t) || 2 != t.T()))
                    if (t.l && 4 == Bn(t)) zt(t.Fa, 0, t);
                    else if (t.dispatchEvent("readystatechange"), 4 == Bn(t)) {
                    t.b = !1;
                    try {
                        var e, n = t.T();
                        t: switch (n) {
                            case 200:
                            case 201:
                            case 202:
                            case 204:
                            case 206:
                            case 304:
                            case 1223:
                                var r = !0;
                                break t;
                            default:
                                r = !1
                        }
                        if (!(e = r)) {
                            var i;
                            if (i = 0 === n) {
                                var o = String(t.A).match(Fe)[1] || null;
                                if (!o && f.self && f.self.location) {
                                    var a = f.self.location.protocol;
                                    o = a.substr(0, a.length - 1)
                                }
                                i = !On.test(o ? o.toLowerCase() : "")
                            }
                            e = i
                        }
                        e ? (t.dispatchEvent("complete"), t.dispatchEvent("success")) : (t.h = 6, t.f = t.za() + " [" + t.T() + "]", xn(t))
                    } finally {
                        Fn(t)
                    }
                }
            }

            function Fn(t, e) {
                if (t.a) {
                    Vn(t);
                    var n = t.a,
                        r = t.s[0] ? y : null;
                    t.a = null, t.s = null, e || t.dispatchEvent("ready");
                    try {
                        n.onreadystatechange = r
                    } catch (t) {}
                }
            }

            function Vn(t) {
                t.a && t.D && (t.a.ontimeout = null), t.m && (f.clearTimeout(t.m), t.m = null)
            }

            function Bn(t) {
                return t.a ? t.a.readyState : 0
            }

            function Un(t, e) {
                return t.a ? t.a.getResponseHeader(e) : null
            }

            function Qn(t, e, n) {
                t: {
                    for (r in n) {
                        var r = !1;
                        break t
                    }
                    r = !0
                }
                if (r) return t;
                var i;
                if (i = "", U(n, function(t, e) {
                        i += e, i += ":", i += t, i += "\r\n"
                    }), n = i, l(t)) {
                    if (e = encodeURIComponent(String(e)), e += n = null != n ? "=" + encodeURIComponent(String(n)) : "") {
                        if ((n = t.indexOf("#")) < 0 && (n = t.length), (r = t.indexOf("?")) < 0 || n < r) {
                            r = n;
                            var o = ""
                        } else o = t.substring(r + 1, n);
                        n = (t = [t.substr(0, r), o, t.substr(n)])[1], t[1] = e ? n ? n + "&" + e : e : n, t = t[0] + (t[1] ? "?" + t[1] : "") + t[2]
                    }
                    return t
                }
                return Ge(t, e, n),
                t
            }

            function Kn(t) {
                this.f = [], this.F = new fn, this.ga = this.pa = this.B = this.ha = this.a = this.I = this.j = this.V = this.g = this.J = this.i = null, this.Ra = this.P = 0, this.Pa = !!m("internalChannelParams.failFast", t), this.ia = this.w = this.s = this.l = this.h = this.c = null, this.oa = !0, this.m = this.ra = this.O = -1, this.S = this.v = this.A = 0, this.Oa = m("internalChannelParams.baseRetryDelayMs", t) || 5e3, this.Sa = m("internalChannelParams.retryDelaySeedMs", t) || 1e4, this.Qa = m("internalChannelParams.forwardChannelMaxRetries", t) || 2, this.qa = m("internalChannelParams.forwardChannelRequestTimeoutMs", t) || 2e4, this.La = t && t.Ab || void 0, this.D = void 0, this.R = t && t.supportsCrossDomainXhr || !1, this.H = "", this.b = new yn(t && t.concurrentRequestLimit), this.ja = new Dn, this.o = !t || void 0 === t.backgroundChannelTest || t.backgroundChannelTest, (this.W = t && t.fastHandshake || !1) && !this.o && (this.o = !0), t && t.forceLongPolling && (this.oa = !1), this.fa = void 0
            }

            function jn(t) {
                if (Gn(t), 3 == t.u) {
                    var e = t.P++,
                        n = Be(t.B);
                    Ge(n, "SID", t.H), Ge(n, "RID", e), Ge(n, "TYPE", "terminate"), Yn(t, n), (e = new ve(t, e, void 0)).F = 2, e.f = ze(Be(n)), n = !1, f.navigator && f.navigator.sendBeacon && (n = f.navigator.sendBeacon(e.f.toString(), "")), !n && f.Image && ((new Image).src = e.f, n = !0), n || (e.a = e.g.$(null), e.a.ca(e.f)), e.v = N(), Ne(e)
                }
                rr(t)
            }

            function Gn(t) {
                t.w && (t.w.abort(), t.w = null), t.a && (t.a.cancel(), t.a = null), t.l && (f.clearTimeout(t.l), t.l = null), tr(t), t.b.cancel(), t.h && (d(t.h) && f.clearTimeout(t.h), t.h = null)
            }

            function Wn(t, e) {
                t.f.push(new mn(t.Ra++, e)), 3 == t.u && zn(t)
            }

            function zn(t) {
                bn(t.b) || t.h || (t.h = !0, Ut(t.Ia, t), t.A = 0)
            }

            function Hn(t, e) {
                var n;
                n = e ? e.W : t.P++;
                var r = Be(t.B);
                Ge(r, "SID", t.H), Ge(r, "RID", n), Ge(r, "AID", t.O), Yn(t, r), t.g && t.i && Qn(r, t.g, t.i), n = new ve(t, n, t.A + 1), null === t.g && (n.h = t.i), e && (t.f = e.j.concat(t.f)), e = Xn(t, n, 1e3), n.setTimeout(Math.round(.5 * t.qa) + Math.round(.5 * t.qa * Math.random())), Sn(t.b, n), Se(n, r, e)
            }

            function Yn(t, n) {
                t.c && _e({}, function(t, e) {
                    Ge(n, e, t)
                })
            }

            function Xn(t, e, n) {
                n = Math.min(t.f.length, n);
                var r = t.c ? C(t.c.Ta, t.c, t) : null;
                t: for (var i = t.f, o = -1;;) {
                    var a = ["count=" + n]; - 1 == o ? 0 < n ? (o = i[0].b, a.push("ofs=" + o)) : o = 0 : a.push("ofs=" + o);
                    for (var s = !0, u = 0; u < n; u++) {
                        var c = i[u].b,
                            h = i[u].a;
                        if ((c -= o) < 0) o = Math.max(0, i[u].b - 100), s = !1;
                        else try {
                            Nn(h, a, "req" + c + "_")
                        } catch (t) {
                            r && r(h)
                        }
                    }
                    if (s) {
                        r = a.join("&");
                        break t
                    }
                }
                return t = t.f.splice(0, n), e.j = t, r
            }

            function Jn(t) {
                t.a || t.l || (t.S = 1, Ut(t.Ha, t), t.v = 0)
            }

            function $n(t) {
                return !(t.a || t.l || 3 <= t.v) && (t.S++, t.l = se(C(t.Ha, t), er(t, t.v)), t.v++, !0)
            }

            function Zn(t, e, n) {
                var r = e.l;
                r && vn(t.b, r), t.ia = t.oa && n, t.m = e.c, t.B = ir(t, null, t.ha), zn(t)
            }

            function tr(t) {
                null != t.s && (f.clearTimeout(t.s), t.s = null)
            }

            function er(t, e) {
                var n = t.Oa + Math.floor(Math.random() * t.Sa);
                return t.ma() || (n *= 2), n * e
            }

            function nr(t, e) {
                if (2 == e) {
                    var n = null;
                    t.c && (n = null);
                    var r = C(t.fb, t);
                    n || (n = new Ve("//www.google.com/images/cleardot.gif"), f.location && "http" == f.location.protocol || Ue(n, "https"), ze(n)),
                        function(t, e) {
                            var n = new te;
                            if (f.Image) {
                                var r = new Image;
                                r.onload = D(An, n, r, "TestLoadImage: loaded", !0, e), r.onerror = D(An, n, r, "TestLoadImage: error", !1, e), r.onabort = D(An, n, r, "TestLoadImage: abort", !1, e), r.ontimeout = D(An, n, r, "TestLoadImage: timeout", !1, e), f.setTimeout(function() {
                                    r.ontimeout && r.ontimeout()
                                }, 1e4), r.src = t
                            } else e(!1)
                        }(n.toString(), r)
                } else oe(2);
                t.u = 0, t.c && t.c.ta(e), rr(t), Gn(t)
            }

            function rr(t) {
                t.u = 0, t.m = -1, t.c && (0 == In(t.b).length && 0 == t.f.length || (t.b.c.length = 0, _(t.f), t.f.length = 0), t.c.sa())
            }

            function ir(t, e, n) {
                var r, i, o, a, s, u, c = (r = n) instanceof Ve ? Be(r) : new Ve(r, void 0);
                if ("" != c.b) e && Qe(c, e + "." + c.b), Ke(c, c.i);
                else {
                    var h, l = f.location;
                    h = e ? e + "." + l.hostname : l.hostname, i = l.protocol, o = h, a = +l.port, s = n, u = new Ve(null, void 0), i && Ue(u, i), o && Qe(u, o), a && Ke(u, a), s && (u.a = s), c = u
                }
                return t.V && U(t.V, function(t, e) {
                    Ge(c, e, t)
                }), e = t.j, n = t.I, e && n && Ge(c, e, n), Ge(c, "VER", t.wa), Yn(t, c), c
            }

            function or() {}

            function ar() {
                if (Y && !(10 <= Number(it))) throw Error("Environmental error: no available transport.")
            }

            function sr(t, e) {
                Ot.call(this), this.a = new Kn(e), this.g = t, this.m = e && e.testUrl ? e.testUrl : function(t) {
                    for (var e = t, n = 1; n < arguments.length; n++) {
                        var r, i = arguments[n];
                        0 == i.lastIndexOf("/", 0) ? e = i : ((r = "" == e) || (r = 0 <= (r = e.length - 1) && e.indexOf("/", r) == r), e += r ? i : "/" + i)
                    }
                    return e
                }(this.g, "test"), this.b = e && e.messageUrlParams || null, t = e && e.messageHeaders || null, e && e.clientProtocolHeaderRequired && (t ? t["X-Client-Protocol"] = "webchannel" : t = {
                    "X-Client-Protocol": "webchannel"
                }), this.a.i = t, t = e && e.initMessageHeaders || null, e && e.messageContentType && (t ? t["X-WebChannel-Content-Type"] = e.messageContentType : t = {
                    "X-WebChannel-Content-Type": e.messageContentType
                }), e && e.xa && (t ? t["X-WebChannel-Client-Profile"] = e.xa : t = {
                    "X-WebChannel-Client-Profile": e.xa
                }), this.a.J = t, (t = e && e.httpHeadersOverwriteParam) && !P(t) && (this.a.g = t), this.l = e && e.supportsCrossDomainXhr || !1, this.h = e && e.sendRawJson || !1, (e = e && e.httpSessionIdParam) && !P(e) && (this.a.j = e, null !== (t = this.b) && e in t && (e in (t = this.b) && delete t[e])), this.f = new hr(this)
            }

            function ur(t) {
                me.call(this);
                var e = t.__sm__;
                if (e) {
                    t: {
                        for (var n in e) {
                            t = n;
                            break t
                        }
                        t = void 0
                    }(this.c = t) ? (t = this.c, this.data = null !== e && t in e ? e[t] : void 0) : this.data = e
                }
                else this.data = t
            }

            function cr() {
                ye.call(this), this.status = 1
            }

            function hr(t) {
                this.a = t
            }(a = Rn.prototype).ca = function(t, e, n, r) {
                if (this.a) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.A + "; newUri=" + t);
                e = e ? e.toUpperCase() : "GET", this.A = t, this.f = "", this.h = 0, this.v = !1, this.b = !0, this.a = new XMLHttpRequest, this.s = this.H ? le(this.H) : le(pe), this.a.onreadystatechange = C(this.Fa, this);
                try {
                    this.w = !0, this.a.open(e, String(t), !0), this.w = !1
                } catch (t) {
                    return void Ln(this, t)
                }
                t = n || "";
                var i, o = new Pe(this.headers);
                r && _e(r, function(t, e) {
                    o.set(e, t)
                }), r = function(t) {
                    t: {
                        for (var e = Pn, n = t.length, r = l(t) ? t.split("") : t, i = 0; i < n; i++)
                            if (i in r && e.call(void 0, r[i], i, t)) {
                                e = i;
                                break t
                            } e = -1
                    }
                    return e < 0 ? null : l(t) ? t.charAt(e) : t[e]
                }(o.K()), n = f.FormData && t instanceof f.FormData, !(0 <= R(_n, e)) || r || n || o.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"), o.forEach(function(t, e) {
                    this.a.setRequestHeader(e, t)
                }, this), this.I && (this.a.responseType = this.I), "withCredentials" in this.a && this.a.withCredentials !== this.F && (this.a.withCredentials = this.F);
                try {
                    Vn(this), 0 < this.o && ((this.D = (i = this.a, Y && at(9) && d(i.timeout) && void 0 !== i.ontimeout)) ? (this.a.timeout = this.o, this.a.ontimeout = C(this.Ca, this)) : this.m = zt(this.Ca, this.o, this)), this.l = !0, this.a.send(t), this.l = !1
                } catch (t) {
                    Ln(this, t)
                }
            }, a.Ca = function() {
                void 0 !== c && this.a && (this.f = "Timed out after " + this.o + "ms, aborting", this.h = 8, this.dispatchEvent("timeout"), this.abort(8))
            }, a.abort = function(t) {
                this.a && this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1, this.h = t || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Fn(this))
            }, a.G = function() {
                this.a && (this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1), Fn(this, !0)), Rn.N.G.call(this)
            }, a.Fa = function() {
                this.j || (this.w || this.l || this.g ? qn(this) : this.$a())
            }, a.$a = function() {
                qn(this)
            }, a.T = function() {
                try {
                    return 2 < Bn(this) ? this.a.status : -1
                } catch (t) {
                    return -1
                }
            }, a.za = function() {
                try {
                    return 2 < Bn(this) ? this.a.statusText : ""
                } catch (t) {
                    return ""
                }
            }, a.aa = function() {
                try {
                    return this.a ? this.a.responseText : ""
                } catch (t) {
                    return ""
                }
            }, a.Va = function(t) {
                if (this.a) {
                    var e = this.a.responseText;
                    return t && 0 == e.indexOf(t) && (e = e.substring(t.length)), kn(e)
                }
            }, a.ya = function() {
                return this.h
            }, a.Ya = function() {
                return l(this.f) ? this.f : String(this.f)
            }, (a = Kn.prototype).wa = 8, a.u = 1, a.Da = function() {
                return 0 == this.u
            }, a.Ia = function(t) {
                if (this.h)
                    if (this.h = null, 1 == this.u) {
                        if (!t) {
                            this.P = Math.floor(1e5 * Math.random());
                            var e, n = new ve(this, t = this.P++, void 0),
                                r = this.i;
                            if (this.J && (r ? j(r = Q(r), this.J) : r = this.J), null === this.g && (n.h = r), this.W) t: {
                                for (var i = e = 0; i < this.f.length; i++) {
                                    var o = this.f[i];
                                    if (void 0 === (o = "__data__" in o.a && l(o = o.a.__data__) ? o.length : void 0)) break;
                                    if (4096 < (e += o)) {
                                        e = i;
                                        break t
                                    }
                                    if (4096 === e || i === this.f.length - 1) {
                                        e = i + 1;
                                        break t
                                    }
                                }
                                e = 1e3
                            }
                            else e = 1e3;
                            e = Xn(this, n, e), Ge(i = Be(this.B), "RID", t), Ge(i, "CVER", 22), this.o && this.j && Ge(i, "X-HTTP-Session-Id", this.j), Yn(this, i), this.g && r && Qn(i, this.g, r), Sn(this.b, n), this.W ? (Ge(i, "$req", e), Ge(i, "SID", "null"), n.S = !0, Se(n, i, null)) : Se(n, i, e), this.u = 2
                        }
                    } else 3 == this.u && (t ? Hn(this, t) : 0 == this.f.length || bn(this.b) || Hn(this))
            }, a.Ha = function() {
                this.l = null, this.a = new ve(this, "rpc", this.S), null === this.g && (this.a.h = this.i), this.a.J = 0;
                var t = Be(this.pa);
                Ge(t, "RID", "rpc"), Ge(t, "SID", this.H), Ge(t, "CI", this.ia ? "0" : "1"), Ge(t, "AID", this.O), Yn(this, t), Ge(t, "TYPE", "xmlhttp"), this.g && this.i && Qn(t, this.g, this.i), this.D && this.a.setTimeout(this.D), Te(this.a, t, !0, this.ga)
            }, a.Ga = function(t, e) {
                if (0 != this.u && (this.a == t || En(this.b, t)))
                    if (this.m = t.o, !t.s && En(this.b, t) && 3 == this.u) {
                        try {
                            var n = this.ja.a.parse(e)
                        } catch (t) {
                            n = null
                        }
                        if (v(n) && 3 == n.length) {
                            if (0 == (e = n)[0]) {
                                t: if (!this.l) {
                                    if (this.a) {
                                        if (!(this.a.v + 3e3 < t.v)) break t;
                                        tr(this), this.a.cancel(), this.a = null
                                    }
                                    $n(this), oe(18)
                                }
                            }
                            else this.ra = e[1], 0 < this.ra - this.O && e[2] < 37500 && this.ia && 0 == this.v && !this.s && (this.s = se(C(this.Za, this), 6e3));
                            if (wn(this.b) <= 1 && this.fa) {
                                try {
                                    this.fa()
                                } catch (t) {}
                                this.fa = void 0
                            }
                        } else nr(this, 11)
                    } else if ((t.s || this.a == t) && tr(this), !P(e))
                    for (e = n = this.ja.a.parse(e), n = 0; n < e.length; n++) {
                        var r = e[n];
                        if (this.O = r[0], r = r[1], 2 == this.u)
                            if ("c" == r[0]) {
                                this.H = r[1], this.ga = r[2];
                                var i = r[3];
                                null != i && (this.wa = i), null != (r = r[5]) && d(r) && 0 < r && (this.D = 1.5 * r), this.o && (r = t.a) && ((i = Un(r, "X-Client-Wire-Protocol")) && vn(this.b, i), this.j && (r = Un(r, "X-HTTP-Session-Id"))) && (this.I = r, Ge(this.B, this.j, r)), this.u = 3, this.c && this.c.va(), r = t, this.pa = ir(this, this.Y() ? this.ga : null, this.ha), r.s ? (Tn(this.b, r), (i = this.D) && r.setTimeout(i), r.i && (ke(r), Ne(r)), this.a = r) : Jn(this), 0 < this.f.length && zn(this)
                            } else "stop" != r[0] && "close" != r[0] || nr(this, 7);
                        else 3 == this.u && ("stop" == r[0] || "close" == r[0] ? "stop" == r[0] ? nr(this, 7) : jn(this) : "noop" != r[0] && this.c && this.c.ua(r), this.v = 0)
                    }
            }, a.Za = function() {
                null != this.s && (this.s = null, this.a.cancel(), this.a = null, $n(this), oe(19))
            }, a.na = function(t) {
                var e, n, r = null;
                if (this.a == t) {
                    tr(this), this.a = null;
                    var i = 2
                } else {
                    if (!En(this.b, t)) return;
                    r = t.j, Tn(this.b, t), i = 1
                }
                if (this.m = t.o, 0 != this.u)
                    if (t.b) 1 == i ? (r = N() - t.v, ee.dispatchEvent(new ae(ee, t.l ? t.l.length : 0, r, this.A)), zn(this)) : Jn(this);
                    else {
                        var o = t.c;
                        if (3 == o || 0 == o && 0 < this.m || (1 != i || (n = t, wn((e = this).b) >= e.b.f - (e.h ? 1 : 0) || (e.h ? (e.f = n.j.concat(e.f), 0) : 1 == e.u || 2 == e.u || e.A >= (e.Pa ? 0 : e.Qa) || (e.h = se(C(e.Ia, e, n), er(e, e.A)), e.A++, 0)))) && (2 != i || !$n(this))) switch (r && 0 < r.length && (t = this.b, t.c = t.c.concat(r)), o) {
                            case 1:
                                nr(this, 5);
                                break;
                            case 4:
                                nr(this, 10);
                                break;
                            case 3:
                                nr(this, 6);
                                break;
                            default:
                                nr(this, 2)
                        }
                    }
            }, a.fb = function(t) {
                oe(t ? 2 : 1)
            }, a.$ = function(t) {
                if (t && !this.R) throw Error("Can't create secondary domain capable XhrIo object.");
                return (t = new Rn(this.La)).F = this.R, t
            }, a.ma = function() {
                return !!this.c && !0
            }, a.Y = function() {
                return this.R
            }, (a = or.prototype).va = function() {}, a.ua = function() {}, a.ta = function() {}, a.sa = function() {}, a.Ta = function() {}, ar.prototype.a = function(t, e) {
                return new sr(t, e)
            }, A(sr, Ot), (a = sr.prototype).addEventListener = function(t, e, n, r) {
                sr.N.addEventListener.call(this, t, e, n, r)
            }, a.removeEventListener = function(t, e, n, r) {
                sr.N.removeEventListener.call(this, t, e, n, r)
            }, a.Wa = function() {
                this.a.c = this.f, this.l && (this.a.R = !0);
                var t = this.a,
                    e = this.m,
                    n = this.g,
                    r = this.b || void 0;
                oe(0), t.ha = n, t.V = r || {}, t.o && (t.F.b = [], t.F.a = !1), t.w = new hn(t), null === t.g && (t.w.h = t.i), n = e, t.g && t.i && (n = Qn(e, t.g, t.i)), (t = t.w).i = n, e = ir(t.a, null, t.i), oe(3), null != (n = t.a.F.b) ? (t.f = n[0], t.M = 1, ln(t)) : (We(e, "MODE", "init"), !t.a.o && t.a.j && We(e, "X-HTTP-Session-Id", t.a.j), t.b = new ve(t, void 0, void 0), t.b.h = t.h, Te(t.b, e, !1, null), t.M = 0)
            }, a.close = function() {
                jn(this.a)
            }, a.Xa = function(t) {
                if (l(t)) {
                    var e = {};
                    e.__data__ = t, Wn(this.a, e)
                } else this.h ? ((e = {}).__data__ = Pt(t), Wn(this.a, e)) : Wn(this.a, t)
            }, a.G = function() {
                this.a.c = null, delete this.f, jn(this.a), delete this.a, sr.N.G.call(this)
            }, A(ur, me), A(cr, ye), A(hr, or), hr.prototype.va = function() {
                this.a.dispatchEvent("a")
            }, hr.prototype.ua = function(t) {
                this.a.dispatchEvent(new ur(t))
            }, hr.prototype.ta = function(t) {
                this.a.dispatchEvent(new cr(t))
            }, hr.prototype.sa = function() {
                this.a.dispatchEvent("b")
            };
            var lr = D(function(t, e) {
                function n() {}
                n.prototype = t.prototype;
                var r = new n;
                return t.apply(r, Array.prototype.slice.call(arguments, 1)), r
            }, ar);
            ar.prototype.createWebChannel = ar.prototype.a, sr.prototype.send = sr.prototype.Xa, sr.prototype.open = sr.prototype.Wa, sr.prototype.close = sr.prototype.close, ue.NO_ERROR = 0, ue.TIMEOUT = 8, ue.HTTP_ERROR = 6, ce.COMPLETE = "complete", (fe.EventType = de).OPEN = "a", de.CLOSE = "b", de.ERROR = "c", de.MESSAGE = "d", Ot.prototype.listen = Ot.prototype.Aa, Rn.prototype.listenOnce = Rn.prototype.Ba, Rn.prototype.getLastError = Rn.prototype.Ya, Rn.prototype.getLastErrorCode = Rn.prototype.ya, Rn.prototype.getStatus = Rn.prototype.T, Rn.prototype.getStatusText = Rn.prototype.za, Rn.prototype.getResponseJson = Rn.prototype.Va, Rn.prototype.getResponseText = Rn.prototype.aa, Rn.prototype.send = Rn.prototype.ca;
            var fr = {
                    createWebChannelTransport: lr,
                    ErrorCode: ue,
                    EventType: ce,
                    WebChannel: fe,
                    XhrIo: Rn
                },
                pr = fr.createWebChannelTransport,
                dr = fr.ErrorCode,
                mr = fr.EventType,
                yr = fr.WebChannel,
                gr = fr.XhrIo,
                vr = function(r) {
                    function i(t, e) {
                        var n = r.call(this, e) || this;
                        return n.code = t, n.name = "FirebaseError", Object.setPrototypeOf(n, i.prototype), Error.captureStackTrace && Error.captureStackTrace(n, br.prototype.create), n
                    }
                    return s(i, r), i
                }(Error),
                br = function() {
                    function t(t, e, n) {
                        this.service = t, this.serviceName = e, this.errors = n
                    }
                    return t.prototype.create = function(t, e) {
                        void 0 === e && (e = {});
                        for (var r, n = this.service + "/" + t, i = this.errors[t], o = i ? (r = e, i.replace(Sr, function(t, e) {
                                var n = r[e];
                                return null != n ? n.toString() : "<" + e + "?>"
                            })) : "Error", a = this.serviceName + ": " + o + " (" + n + ").", s = new vr(n, a), u = 0, c = Object.keys(e); u < c.length; u++) {
                            var h = c[u];
                            "_" !== h.slice(-1) && (h in s && console.warn('Overwriting FirebaseError base field "' + h + '" can cause unexpected behavior.'), s[h] = e[h])
                        }
                        return s
                    }, t
                }();
            var wr, Er, Sr = /\{\$([^}]+)}/g,
                Tr = bh.SDK_VERSION,
                Ir = new r("@firebase/firestore");

            function Cr() {
                return Ir.logLevel === o.DEBUG ? wr.DEBUG : Ir.logLevel === o.SILENT ? wr.SILENT : wr.ERROR
            }

            function Dr(t) {
                switch (t) {
                    case wr.DEBUG:
                        Ir.logLevel = o.DEBUG;
                        break;
                    case wr.ERROR:
                        Ir.logLevel = o.ERROR;
                        break;
                    case wr.SILENT:
                        Ir.logLevel = o.SILENT;
                        break;
                    default:
                        Ir.error("Firestore (" + Tr + "): Invalid value passed to `setLogLevel`")
                }
            }

            function Nr(t, e) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                if (Ir.logLevel <= o.DEBUG) {
                    var i = n.map(kr);
                    Ir.debug.apply(Ir, ["Firestore (" + Tr + ") [" + t + "]: " + e].concat(i))
                }
            }

            function Ar(t) {
                for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                if (Ir.logLevel <= o.ERROR) {
                    var r = e.map(kr);
                    Ir.error.apply(Ir, ["Firestore (" + Tr + "): " + t].concat(r))
                }
            }

            function kr(e) {
                if ("string" == typeof e) return e;
                var t = Or.getPlatform();
                try {
                    return t.formatJSON(e)
                } catch (t) {
                    return e
                }
            }

            function Rr(t) {
                var e = "FIRESTORE (" + Tr + ") INTERNAL ASSERTION FAILED: " + t;
                throw Ar(e), new Error(e)
            }

            function Mr(t, e) {
                t || Rr(e)
            }(Er = wr || (wr = {}))[Er.DEBUG = 0] = "DEBUG", Er[Er.ERROR = 1] = "ERROR", Er[Er.SILENT = 2] = "SILENT";
            var Or = function() {
                function e() {}
                return e.setPlatform = function(t) {
                    e.platform && Rr("Platform already defined"), e.platform = t
                }, e.getPlatform = function() {
                    return e.platform || Rr("Platform not set"), e.platform
                }, e
            }();

            function _r() {
                return Or.getPlatform().emptyByteString
            }
            var Pr = {
                    OK: "ok",
                    CANCELLED: "cancelled",
                    UNKNOWN: "unknown",
                    INVALID_ARGUMENT: "invalid-argument",
                    DEADLINE_EXCEEDED: "deadline-exceeded",
                    NOT_FOUND: "not-found",
                    ALREADY_EXISTS: "already-exists",
                    PERMISSION_DENIED: "permission-denied",
                    UNAUTHENTICATED: "unauthenticated",
                    RESOURCE_EXHAUSTED: "resource-exhausted",
                    FAILED_PRECONDITION: "failed-precondition",
                    ABORTED: "aborted",
                    OUT_OF_RANGE: "out-of-range",
                    UNIMPLEMENTED: "unimplemented",
                    INTERNAL: "internal",
                    UNAVAILABLE: "unavailable",
                    DATA_LOSS: "data-loss"
                },
                Lr = function(r) {
                    function t(t, e) {
                        var n = r.call(this, e) || this;
                        return n.code = t, n.message = e, n.name = "FirebaseError", n.toString = function() {
                            return n.name + ": [code=" + n.code + "]: " + n.message
                        }, n
                    }
                    return s(t, r), t
                }(Error);

            function xr(t, e) {
                function n() {
                    var t = "This constructor is private.";
                    throw e && (t += " ", t += e), new Lr(Pr.INVALID_ARGUMENT, t)
                }
                for (var r in n.prototype = t.prototype, t) t.hasOwnProperty(r) && (n[r] = t[r]);
                return n
            }

            function qr(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }

            function Fr(t, e) {
                return void 0 !== t ? t : e
            }

            function Vr(t, e) {
                for (var n in t)
                    if (Object.prototype.hasOwnProperty.call(t, n)) {
                        var r = Number(n);
                        isNaN(r) || e(r, t[n])
                    }
            }

            function Br(t, e) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n])
            }

            function Ur(t) {
                for (var e in Mr(null != t && "object" == typeof t, "isEmpty() expects object parameter."), t)
                    if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
                return !0
            }

            function Qr(t, e) {
                if (0 !== e.length) throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() does not support arguments, but was called with " + oi(e.length, "argument") + ".")
            }

            function Kr(t, e, n) {
                if (e.length !== n) throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() requires " + oi(n, "argument") + ", but was called with " + oi(e.length, "argument") + ".")
            }

            function jr(t, e, n) {
                if (e.length < n) throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() requires at least " + oi(n, "argument") + ", but was called with " + oi(e.length, "argument") + ".")
            }

            function Gr(t, e, n, r) {
                if (e.length < n || e.length > r) throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() requires between " + n + " and " + r + " arguments, but was called with " + oi(e.length, "argument") + ".")
            }

            function Wr(t, e, n, r) {
                $r(t, e, ii(n) + " argument", r)
            }

            function zr(t, e, n, r) {
                void 0 !== r && Wr(t, e, n, r)
            }

            function Hr(t, e, n, r) {
                $r(t, e, n + " option", r)
            }

            function Yr(t, e, n, r) {
                void 0 !== r && Hr(t, e, n, r)
            }

            function Xr(t, e, n, r, i) {
                void 0 !== r && function(t, e, n, r, i) {
                    if (!(r instanceof Array)) throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() requires its " + e + " option to be an array, but it was: " + ti(r));
                    for (var o = 0; o < r.length; ++o)
                        if (!i(r[o])) throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() requires all " + e + " elements to be " + n + ", but the value at index " + o + " was: " + ti(r[o]))
                }(t, e, n, r, i)
            }

            function Jr(t, e, n, r, i) {
                void 0 !== r && function(t, e, n, r, i) {
                    for (var o = [], a = 0, s = i; a < s.length; a++) {
                        var u = s[a];
                        if (u === r) return;
                        o.push(ti(u))
                    }
                    var c = ti(r);
                    throw new Lr(Pr.INVALID_ARGUMENT, "Invalid value " + c + " provided to function " + t + '() for option "' + n + '". Acceptable values: ' + o.join(", "))
                }(t, 0, n, r, i)
            }

            function $r(t, e, n, r) {
                if (!("object" === e ? Zr(r) : "non-empty string" === e ? "string" == typeof r && "" !== r : typeof r === e)) {
                    var i = ti(r);
                    throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() requires its " + n + " to be of type " + e + ", but it was: " + i)
                }
            }

            function Zr(t) {
                return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t))
            }

            function ti(t) {
                if (void 0 === t) return "undefined";
                if (null === t) return "null";
                if ("string" == typeof t) return 20 < t.length && (t = t.substring(0, 20) + "..."), JSON.stringify(t);
                if ("number" == typeof t || "boolean" == typeof t) return "" + t;
                if ("object" != typeof t) return "function" == typeof t ? "a function" : Rr("Unknown wrong type: " + typeof t);
                if (t instanceof Array) return "an array";
                var e = function(t) {
                    if (t.constructor) {
                        var e = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                        if (e && 1 < e.length) return e[1]
                    }
                    return null
                }(t);
                return e ? "a custom " + e + " object" : "an object"
            }

            function ei(t, e, n) {
                if (void 0 === n) throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() requires a valid " + ii(e) + " argument, but it was undefined.")
            }

            function ni(n, t, r) {
                Br(t, function(t, e) {
                    if (r.indexOf(t) < 0) throw new Lr(Pr.INVALID_ARGUMENT, "Unknown option '" + t + "' passed to function " + n + "(). Available options: " + r.join(", "))
                })
            }

            function ri(t, e, n, r) {
                var i = ti(r);
                return new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() requires its " + ii(n) + " argument to be a " + e + ", but it was: " + i)
            }

            function ii(t) {
                switch (t) {
                    case 1:
                        return "first";
                    case 2:
                        return "second";
                    case 3:
                        return "third";
                    default:
                        return t + "th"
                }
            }

            function oi(t, e) {
                return t + " " + e + (1 === t ? "" : "s")
            }
            var ai = function() {
                function t() {}
                return t.newId = function() {
                    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = "", n = 0; n < 20; n++) e += t.charAt(Math.floor(Math.random() * t.length));
                    return Mr(20 === e.length, "Invalid auto ID: " + e), e
                }, t
            }();

            function si(t, e) {
                return t < e ? -1 : e < t ? 1 : 0
            }

            function ui(t, e) {
                if (t.length !== e.length) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!t[n].isEqual(e[n])) return !1;
                return !0
            }

            function ci(t) {
                return t + "\0"
            }

            function hi() {
                if ("undefined" == typeof Uint8Array) throw new Lr(Pr.UNIMPLEMENTED, "Uint8Arrays are not available in this environment.")
            }

            function li() {
                if (!Or.getPlatform().base64Available) throw new Lr(Pr.UNIMPLEMENTED, "Blobs are unavailable in Firestore in this environment.")
            }
            var fi, pi, di, mi, yi = function() {
                    function e(t) {
                        li(), this._binaryString = t
                    }
                    return e.fromBase64String = function(t) {
                        Kr("Blob.fromBase64String", arguments, 1), Wr("Blob.fromBase64String", "string", 1, t), li();
                        try {
                            return new e(Or.getPlatform().atob(t))
                        } catch (t) {
                            throw new Lr(Pr.INVALID_ARGUMENT, "Failed to construct Blob from Base64 string: " + t)
                        }
                    }, e.fromUint8Array = function(t) {
                        if (Kr("Blob.fromUint8Array", arguments, 1), hi(), !(t instanceof Uint8Array)) throw ri("Blob.fromUint8Array", "Uint8Array", 1, t);
                        return new e(Array.prototype.map.call(t, function(t) {
                            return String.fromCharCode(t)
                        }).join(""))
                    }, e.prototype.toBase64 = function() {
                        return Kr("Blob.toBase64", arguments, 0), li(), Or.getPlatform().btoa(this._binaryString)
                    }, e.prototype.toUint8Array = function() {
                        Kr("Blob.toUint8Array", arguments, 0), hi();
                        for (var t = new Uint8Array(this._binaryString.length), e = 0; e < this._binaryString.length; e++) t[e] = this._binaryString.charCodeAt(e);
                        return t
                    }, e.prototype.toString = function() {
                        return "Blob(base64: " + this.toBase64() + ")"
                    }, e.prototype.isEqual = function(t) {
                        return this._binaryString === t._binaryString
                    }, e.prototype._compareTo = function(t) {
                        return si(this._binaryString, t._binaryString)
                    }, e
                }(),
                gi = xr(yi, "Use Blob.fromUint8Array() or Blob.fromBase64String() instead."),
                vi = function() {
                    function t(t, e) {
                        if (Kr("GeoPoint", arguments, 2), Wr("GeoPoint", "number", 1, t), Wr("GeoPoint", "number", 2, e), !isFinite(t) || t < -90 || 90 < t) throw new Lr(Pr.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
                        if (!isFinite(e) || e < -180 || 180 < e) throw new Lr(Pr.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
                        this._lat = t, this._long = e
                    }
                    return Object.defineProperty(t.prototype, "latitude", {
                        get: function() {
                            return this._lat
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "longitude", {
                        get: function() {
                            return this._long
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.isEqual = function(t) {
                        return this._lat === t._lat && this._long === t._long
                    }, t.prototype._compareTo = function(t) {
                        return si(this._lat, t._lat) || si(this._long, t._long)
                    }, t
                }(),
                bi = function() {
                    function n(t, e) {
                        if (this.seconds = t, (this.nanoseconds = e) < 0) throw new Lr(Pr.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
                        if (1e9 <= e) throw new Lr(Pr.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
                        if (t < -62135596800) throw new Lr(Pr.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
                        if (253402300800 <= t) throw new Lr(Pr.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t)
                    }
                    return n.now = function() {
                        return n.fromMillis(Date.now())
                    }, n.fromDate = function(t) {
                        return n.fromMillis(t.getTime())
                    }, n.fromMillis = function(t) {
                        var e = Math.floor(t / 1e3);
                        return new n(e, 1e6 * (t - 1e3 * e))
                    }, n.prototype.toDate = function() {
                        return new Date(this.toMillis())
                    }, n.prototype.toMillis = function() {
                        return 1e3 * this.seconds + this.nanoseconds / 1e6
                    }, n.prototype._compareTo = function(t) {
                        return this.seconds === t.seconds ? si(this.nanoseconds, t.nanoseconds) : si(this.seconds, t.seconds)
                    }, n.prototype.isEqual = function(t) {
                        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds
                    }, n.prototype.toString = function() {
                        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")"
                    }, n
                }(),
                wi = function(t, e, n, r, i) {
                    this.databaseId = t, this.persistenceKey = e, this.host = n, this.ssl = r, this.forceLongPolling = i
                },
                Ei = "(default)",
                Si = function() {
                    function e(t, e) {
                        this.projectId = t, this.database = e || Ei
                    }
                    return Object.defineProperty(e.prototype, "isDefaultDatabase", {
                        get: function() {
                            return this.database === Ei
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.isEqual = function(t) {
                        return t instanceof e && t.projectId === this.projectId && t.database === this.database
                    }, e.prototype.compareTo = function(t) {
                        return si(this.projectId, t.projectId) || si(this.database, t.database)
                    }, e
                }(),
                Ti = "__name__",
                Ii = function() {
                    function n(t, e, n) {
                        this.init(t, e, n)
                    }
                    return n.prototype.init = function(t, e, n) {
                        void 0 === e ? e = 0 : e > t.length && Rr("offset " + e + " out of range " + t.length), void 0 === n ? n = t.length - e : n > t.length - e && Rr("length " + n + " out of range " + (t.length - e)), this.segments = t, this.offset = e, this.len = n
                    }, n.prototype.construct = function(t, e, n) {
                        var r = Object.create(Object.getPrototypeOf(this));
                        return r.init(t, e, n), r
                    }, Object.defineProperty(n.prototype, "length", {
                        get: function() {
                            return this.len
                        },
                        enumerable: !0,
                        configurable: !0
                    }), n.prototype.isEqual = function(t) {
                        return 0 === n.comparator(this, t)
                    }, n.prototype.child = function(t) {
                        var e = this.segments.slice(this.offset, this.limit());
                        return t instanceof n ? t.forEach(function(t) {
                            e.push(t)
                        }) : "string" == typeof t ? e.push(t) : Rr("Unknown parameter type for Path.child(): " + t), this.construct(e)
                    }, n.prototype.limit = function() {
                        return this.offset + this.length
                    }, n.prototype.popFirst = function(t) {
                        return t = void 0 === t ? 1 : t, Mr(this.length >= t, "Can't call popFirst() with less segments"), this.construct(this.segments, this.offset + t, this.length - t)
                    }, n.prototype.popLast = function() {
                        return Mr(!this.isEmpty(), "Can't call popLast() on empty path"), this.construct(this.segments, this.offset, this.length - 1)
                    }, n.prototype.firstSegment = function() {
                        return Mr(!this.isEmpty(), "Can't call firstSegment() on empty path"), this.segments[this.offset]
                    }, n.prototype.lastSegment = function() {
                        return this.get(this.length - 1)
                    }, n.prototype.get = function(t) {
                        return Mr(t < this.length, "Index out of range"), this.segments[this.offset + t]
                    }, n.prototype.isEmpty = function() {
                        return 0 === this.length
                    }, n.prototype.isPrefixOf = function(t) {
                        if (t.length < this.length) return !1;
                        for (var e = 0; e < this.length; e++)
                            if (this.get(e) !== t.get(e)) return !1;
                        return !0
                    }, n.prototype.isImmediateParentOf = function(t) {
                        if (this.length + 1 !== t.length) return !1;
                        for (var e = 0; e < this.length; e++)
                            if (this.get(e) !== t.get(e)) return !1;
                        return !0
                    }, n.prototype.forEach = function(t) {
                        for (var e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e])
                    }, n.prototype.toArray = function() {
                        return this.segments.slice(this.offset, this.limit())
                    }, n.comparator = function(t, e) {
                        for (var n = Math.min(t.length, e.length), r = 0; r < n; r++) {
                            var i = t.get(r),
                                o = e.get(r);
                            if (i < o) return -1;
                            if (o < i) return 1
                        }
                        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0
                    }, n
                }(),
                Ci = function(t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this
                    }
                    return s(e, t), e.prototype.canonicalString = function() {
                        return this.toArray().join("/")
                    }, e.prototype.toString = function() {
                        return this.canonicalString()
                    }, e.fromString = function(t) {
                        if (0 <= t.indexOf("//")) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid path (" + t + "). Paths must not contain // in them.");
                        return new e(t.split("/").filter(function(t) {
                            return 0 < t.length
                        }))
                    }, e.EMPTY_PATH = new e([]), e
                }(Ii),
                Di = /^[_a-zA-Z][_a-zA-Z0-9]*$/,
                Ni = function(t) {
                    function u() {
                        return null !== t && t.apply(this, arguments) || this
                    }
                    return s(u, t), u.isValidIdentifier = function(t) {
                        return Di.test(t)
                    }, u.prototype.canonicalString = function() {
                        return this.toArray().map(function(t) {
                            return t = t.replace("\\", "\\\\").replace("`", "\\`"), u.isValidIdentifier(t) || (t = "`" + t + "`"), t
                        }).join(".")
                    }, u.prototype.toString = function() {
                        return this.canonicalString()
                    }, u.prototype.isKeyField = function() {
                        return 1 === this.length && this.get(0) === Ti
                    }, u.keyField = function() {
                        return new u([Ti])
                    }, u.fromServerFormat = function(t) {
                        for (var e = [], n = "", r = 0, i = function() {
                                if (0 === n.length) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
                                e.push(n), n = ""
                            }, o = !1; r < t.length;) {
                            var a = t[r];
                            if ("\\" === a) {
                                if (r + 1 === t.length) throw new Lr(Pr.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                                var s = t[r + 1];
                                if ("\\" !== s && "." !== s && "`" !== s) throw new Lr(Pr.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                                n += s, r += 2
                            } else "`" === a ? o = !o : "." !== a || o ? n += a : i(), r++
                        }
                        if (i(), o) throw new Lr(Pr.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
                        return new u(e)
                    }, u.EMPTY_PATH = new u([]), u
                }(Ii),
                Ai = function() {
                    function e(t) {
                        this.path = t, Mr(e.isDocumentKey(t), "Invalid DocumentKey with an odd number of segments: " + t.toArray().join("/"))
                    }
                    return e.prototype.hasCollectionId = function(t) {
                        return 2 <= this.path.length && this.path.get(this.path.length - 2) === t
                    }, e.prototype.isEqual = function(t) {
                        return null !== t && 0 === Ci.comparator(this.path, t.path)
                    }, e.prototype.toString = function() {
                        return this.path.toString()
                    }, e.comparator = function(t, e) {
                        return Ci.comparator(t.path, e.path)
                    }, e.isDocumentKey = function(t) {
                        return t.length % 2 == 0
                    }, e.fromSegments = function(t) {
                        return new e(new Ci(t.slice()))
                    }, e.fromPathString = function(t) {
                        return new e(Ci.fromString(t))
                    }, e.EMPTY = new e(new Ci([])), e
                }(),
                ki = function() {
                    function t(t, e) {
                        this.key = t, this.version = e
                    }
                    return t.compareByKey = function(t, e) {
                        return Ai.comparator(t.key, e.key)
                    }, t
                }(),
                Ri = function(a) {
                    function e(t, e, n, r, i) {
                        var o = a.call(this, t, e) || this;
                        return o.data = n, o.proto = i, o.hasLocalMutations = !!r.hasLocalMutations, o.hasCommittedMutations = !!r.hasCommittedMutations, o
                    }
                    return s(e, a), e.prototype.field = function(t) {
                        return this.data.field(t)
                    }, e.prototype.fieldValue = function(t) {
                        var e = this.field(t);
                        return e ? e.value() : void 0
                    }, e.prototype.value = function() {
                        return this.data.value()
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.data.isEqual(t.data) && this.hasLocalMutations === t.hasLocalMutations && this.hasCommittedMutations === t.hasCommittedMutations
                    }, e.prototype.toString = function() {
                        return "Document(" + this.key + ", " + this.version + ", " + this.data.toString() + ", {hasLocalMutations: " + this.hasLocalMutations + "}), {hasCommittedMutations: " + this.hasCommittedMutations + "})"
                    }, Object.defineProperty(e.prototype, "hasPendingWrites", {
                        get: function() {
                            return this.hasLocalMutations || this.hasCommittedMutations
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.compareByField = function(t, e, n) {
                        var r = e.field(t),
                            i = n.field(t);
                        return void 0 !== r && void 0 !== i ? r.compareTo(i) : Rr("Trying to compare documents on fields that don't exist")
                    }, e
                }(ki),
                Mi = function(i) {
                    function e(t, e, n) {
                        var r = i.call(this, t, e) || this;
                        return r.hasCommittedMutations = !(!n || !n.hasCommittedMutations), r
                    }
                    return s(e, i), e.prototype.toString = function() {
                        return "NoDocument(" + this.key + ", " + this.version + ")"
                    }, Object.defineProperty(e.prototype, "hasPendingWrites", {
                        get: function() {
                            return this.hasCommittedMutations
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.isEqual = function(t) {
                        return t instanceof e && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key)
                    }, e
                }(ki),
                Oi = function(n) {
                    function e(t, e) {
                        return n.call(this, t, e) || this
                    }
                    return s(e, n), e.prototype.toString = function() {
                        return "UnknownDocument(" + this.key + ", " + this.version + ")"
                    }, Object.defineProperty(e.prototype, "hasPendingWrites", {
                        get: function() {
                            return !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.isEqual = function(t) {
                        return t instanceof e && t.version.isEqual(this.version) && t.key.isEqual(this.key)
                    }, e
                }(ki),
                _i = function() {
                    function n(t, e) {
                        this.comparator = t, this.root = e || Li.EMPTY
                    }
                    return n.prototype.insert = function(t, e) {
                        return new n(this.comparator, this.root.insert(t, e, this.comparator).copy(null, null, Li.BLACK, null, null))
                    }, n.prototype.remove = function(t) {
                        return new n(this.comparator, this.root.remove(t, this.comparator).copy(null, null, Li.BLACK, null, null))
                    }, n.prototype.get = function(t) {
                        for (var e = this.root; !e.isEmpty();) {
                            var n = this.comparator(t, e.key);
                            if (0 === n) return e.value;
                            n < 0 ? e = e.left : 0 < n && (e = e.right)
                        }
                        return null
                    }, n.prototype.indexOf = function(t) {
                        for (var e = 0, n = this.root; !n.isEmpty();) {
                            var r = this.comparator(t, n.key);
                            if (0 === r) return e + n.left.size;
                            n = r < 0 ? n.left : (e += n.left.size + 1, n.right)
                        }
                        return -1
                    }, n.prototype.isEmpty = function() {
                        return this.root.isEmpty()
                    }, Object.defineProperty(n.prototype, "size", {
                        get: function() {
                            return this.root.size
                        },
                        enumerable: !0,
                        configurable: !0
                    }), n.prototype.minKey = function() {
                        return this.root.minKey()
                    }, n.prototype.maxKey = function() {
                        return this.root.maxKey()
                    }, n.prototype.inorderTraversal = function(t) {
                        return this.root.inorderTraversal(t)
                    }, n.prototype.forEach = function(n) {
                        this.inorderTraversal(function(t, e) {
                            return n(t, e), !1
                        })
                    }, n.prototype.toString = function() {
                        var n = [];
                        return this.inorderTraversal(function(t, e) {
                            return n.push(t + ":" + e), !1
                        }), "{" + n.join(", ") + "}"
                    }, n.prototype.reverseTraversal = function(t) {
                        return this.root.reverseTraversal(t)
                    }, n.prototype.getIterator = function() {
                        return new Pi(this.root, null, this.comparator, !1)
                    }, n.prototype.getIteratorFrom = function(t) {
                        return new Pi(this.root, t, this.comparator, !1)
                    }, n.prototype.getReverseIterator = function() {
                        return new Pi(this.root, null, this.comparator, !0)
                    }, n.prototype.getReverseIteratorFrom = function(t) {
                        return new Pi(this.root, t, this.comparator, !0)
                    }, n
                }(),
                Pi = function() {
                    function t(t, e, n, r) {
                        this.isReverse = r, this.nodeStack = [];
                        for (var i = 1; !t.isEmpty();)
                            if (i = e ? n(t.key, e) : 1, r && (i *= -1), i < 0) t = this.isReverse ? t.left : t.right;
                            else {
                                if (0 === i) {
                                    this.nodeStack.push(t);
                                    break
                                }
                                this.nodeStack.push(t), t = this.isReverse ? t.right : t.left
                            }
                    }
                    return t.prototype.getNext = function() {
                        Mr(0 < this.nodeStack.length, "getNext() called on iterator when hasNext() is false.");
                        var t = this.nodeStack.pop(),
                            e = {
                                key: t.key,
                                value: t.value
                            };
                        if (this.isReverse)
                            for (t = t.left; !t.isEmpty();) this.nodeStack.push(t), t = t.right;
                        else
                            for (t = t.right; !t.isEmpty();) this.nodeStack.push(t), t = t.left;
                        return e
                    }, t.prototype.hasNext = function() {
                        return 0 < this.nodeStack.length
                    }, t.prototype.peek = function() {
                        if (0 === this.nodeStack.length) return null;
                        var t = this.nodeStack[this.nodeStack.length - 1];
                        return {
                            key: t.key,
                            value: t.value
                        }
                    }, t
                }(),
                Li = function() {
                    function o(t, e, n, r, i) {
                        this.key = t, this.value = e, this.color = null != n ? n : o.RED, this.left = null != r ? r : o.EMPTY, this.right = null != i ? i : o.EMPTY, this.size = this.left.size + 1 + this.right.size
                    }
                    return o.prototype.copy = function(t, e, n, r, i) {
                        return new o(null != t ? t : this.key, null != e ? e : this.value, null != n ? n : this.color, null != r ? r : this.left, null != i ? i : this.right)
                    }, o.prototype.isEmpty = function() {
                        return !1
                    }, o.prototype.inorderTraversal = function(t) {
                        return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t)
                    }, o.prototype.reverseTraversal = function(t) {
                        return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t)
                    }, o.prototype.min = function() {
                        return this.left.isEmpty() ? this : this.left.min()
                    }, o.prototype.minKey = function() {
                        return this.min().key
                    }, o.prototype.maxKey = function() {
                        return this.right.isEmpty() ? this.key : this.right.maxKey()
                    }, o.prototype.insert = function(t, e, n) {
                        var r = this,
                            i = n(t, r.key);
                        return (r = i < 0 ? r.copy(null, null, null, r.left.insert(t, e, n), null) : 0 === i ? r.copy(null, e, null, null, null) : r.copy(null, null, null, null, r.right.insert(t, e, n))).fixUp()
                    }, o.prototype.removeMin = function() {
                        if (this.left.isEmpty()) return o.EMPTY;
                        var t = this;
                        return t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()), (t = t.copy(null, null, null, t.left.removeMin(), null)).fixUp()
                    }, o.prototype.remove = function(t, e) {
                        var n, r = this;
                        if (e(t, r.key) < 0) r.left.isEmpty() || r.left.isRed() || r.left.left.isRed() || (r = r.moveRedLeft()), r = r.copy(null, null, null, r.left.remove(t, e), null);
                        else {
                            if (r.left.isRed() && (r = r.rotateRight()), r.right.isEmpty() || r.right.isRed() || r.right.left.isRed() || (r = r.moveRedRight()), 0 === e(t, r.key)) {
                                if (r.right.isEmpty()) return o.EMPTY;
                                n = r.right.min(), r = r.copy(n.key, n.value, null, null, r.right.removeMin())
                            }
                            r = r.copy(null, null, null, null, r.right.remove(t, e))
                        }
                        return r.fixUp()
                    }, o.prototype.isRed = function() {
                        return this.color
                    }, o.prototype.fixUp = function() {
                        var t = this;
                        return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()), t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()), t.left.isRed() && t.right.isRed() && (t = t.colorFlip()), t
                    }, o.prototype.moveRedLeft = function() {
                        var t = this.colorFlip();
                        return t.right.left.isRed() && (t = (t = (t = t.copy(null, null, null, null, t.right.rotateRight())).rotateLeft()).colorFlip()), t
                    }, o.prototype.moveRedRight = function() {
                        var t = this.colorFlip();
                        return t.left.left.isRed() && (t = (t = t.rotateRight()).colorFlip()), t
                    }, o.prototype.rotateLeft = function() {
                        var t = this.copy(null, null, o.RED, null, this.right.left);
                        return this.right.copy(null, null, this.color, t, null)
                    }, o.prototype.rotateRight = function() {
                        var t = this.copy(null, null, o.RED, this.left.right, null);
                        return this.left.copy(null, null, this.color, null, t)
                    }, o.prototype.colorFlip = function() {
                        var t = this.left.copy(null, null, !this.left.color, null, null),
                            e = this.right.copy(null, null, !this.right.color, null, null);
                        return this.copy(null, null, !this.color, t, e)
                    }, o.prototype.checkMaxDepth = function() {
                        var t = this.check();
                        return Math.pow(2, t) <= this.size + 1
                    }, o.prototype.check = function() {
                        if (this.isRed() && this.left.isRed()) throw Rr("Red node has red child(" + this.key + "," + this.value + ")");
                        if (this.right.isRed()) throw Rr("Right child of (" + this.key + "," + this.value + ") is red");
                        var t = this.left.check();
                        if (t !== this.right.check()) throw Rr("Black depths differ");
                        return t + (this.isRed() ? 0 : 1)
                    }, o.EMPTY = null, o.RED = !0, o.BLACK = !1, o
                }(),
                xi = function() {
                    function t() {
                        this.size = 0
                    }
                    return t.prototype.copy = function(t, e, n, r, i) {
                        return this
                    }, t.prototype.insert = function(t, e, n) {
                        return new Li(t, e)
                    }, t.prototype.remove = function(t, e) {
                        return this
                    }, t.prototype.isEmpty = function() {
                        return !0
                    }, t.prototype.inorderTraversal = function(t) {
                        return !1
                    }, t.prototype.reverseTraversal = function(t) {
                        return !1
                    }, t.prototype.minKey = function() {
                        return null
                    }, t.prototype.maxKey = function() {
                        return null
                    }, t.prototype.isRed = function() {
                        return !1
                    }, t.prototype.checkMaxDepth = function() {
                        return !0
                    }, t.prototype.check = function() {
                        return 0
                    }, t
                }();
            Li.EMPTY = new xi, (pi = fi || (fi = {}))[pi.NullValue = 0] = "NullValue", pi[pi.BooleanValue = 1] = "BooleanValue", pi[pi.NumberValue = 2] = "NumberValue", pi[pi.TimestampValue = 3] = "TimestampValue", pi[pi.StringValue = 4] = "StringValue", pi[pi.BlobValue = 5] = "BlobValue", pi[pi.RefValue = 6] = "RefValue", pi[pi.GeoPointValue = 7] = "GeoPointValue", pi[pi.ArrayValue = 8] = "ArrayValue", pi[pi.ObjectValue = 9] = "ObjectValue", (mi = di || (di = {}))[mi.Default = 0] = "Default", mi[mi.Estimate = 1] = "Estimate", mi[mi.Previous = 2] = "Previous";
            var qi = function() {
                    function n(t, e) {
                        this.serverTimestampBehavior = t, this.timestampsInSnapshots = e
                    }
                    return n.fromSnapshotOptions = function(t, e) {
                        switch (t.serverTimestamps) {
                            case "estimate":
                                return new n(di.Estimate, e);
                            case "previous":
                                return new n(di.Previous, e);
                            case "none":
                            case void 0:
                                return new n(di.Default, e);
                            default:
                                return Rr("fromSnapshotOptions() called with invalid options.")
                        }
                    }, n
                }(),
                Fi = function() {
                    function t() {}
                    return t.prototype.toString = function() {
                        var t = this.value();
                        return null === t ? "null" : t.toString()
                    }, t.prototype.defaultCompareTo = function(t) {
                        return Mr(this.typeOrder !== t.typeOrder, "Default compareTo should not be used for values of same type."), si(this.typeOrder, t.typeOrder)
                    }, t
                }(),
                Vi = function(e) {
                    function n() {
                        var t = e.call(this) || this;
                        return t.typeOrder = fi.NullValue, t.internalValue = null, t
                    }
                    return s(n, e), n.prototype.value = function(t) {
                        return null
                    }, n.prototype.isEqual = function(t) {
                        return t instanceof n
                    }, n.prototype.compareTo = function(t) {
                        return t instanceof n ? 0 : this.defaultCompareTo(t)
                    }, n.INSTANCE = new n, n
                }(Fi),
                Bi = function(n) {
                    function e(t) {
                        var e = n.call(this) || this;
                        return e.internalValue = t, e.typeOrder = fi.BooleanValue, e
                    }
                    return s(e, n), e.prototype.value = function(t) {
                        return this.internalValue
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.internalValue === t.internalValue
                    }, e.prototype.compareTo = function(t) {
                        return t instanceof e ? si(this, t) : this.defaultCompareTo(t)
                    }, e.of = function(t) {
                        return t ? e.TRUE : e.FALSE
                    }, e.TRUE = new e(!0), e.FALSE = new e(!1), e
                }(Fi),
                Ui = function(n) {
                    function r(t) {
                        var e = n.call(this) || this;
                        return e.internalValue = t, e.typeOrder = fi.NumberValue, e
                    }
                    return s(r, n), r.prototype.value = function(t) {
                        return this.internalValue
                    }, r.prototype.compareTo = function(t) {
                        return t instanceof r ? (e = this.internalValue, n = t.internalValue, e < n ? -1 : n < e ? 1 : e === n ? 0 : isNaN(e) ? isNaN(n) ? 0 : -1 : 1) : this.defaultCompareTo(t);
                        var e, n
                    }, r
                }(Fi);

            function Qi(t, e) {
                return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e
            }
            var Ki = function(e) {
                    function n(t) {
                        return e.call(this, t) || this
                    }
                    return s(n, e), n.prototype.isEqual = function(t) {
                        return t instanceof n && Qi(this.internalValue, t.internalValue)
                    }, n
                }(Ui),
                ji = function(n) {
                    function e(t) {
                        var e = n.call(this, t) || this;
                        return e.internalValue = t, e
                    }
                    return s(e, n), e.prototype.isEqual = function(t) {
                        return t instanceof e && Qi(this.internalValue, t.internalValue)
                    }, e.NAN = new e(NaN), e.POSITIVE_INFINITY = new e(1 / 0), e.NEGATIVE_INFINITY = new e(-1 / 0), e
                }(Ui),
                Gi = function(n) {
                    function e(t) {
                        var e = n.call(this) || this;
                        return e.internalValue = t, e.typeOrder = fi.StringValue, e
                    }
                    return s(e, n), e.prototype.value = function(t) {
                        return this.internalValue
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.internalValue === t.internalValue
                    }, e.prototype.compareTo = function(t) {
                        return t instanceof e ? si(this.internalValue, t.internalValue) : this.defaultCompareTo(t)
                    }, e
                }(Fi),
                Wi = function(n) {
                    function e(t) {
                        var e = n.call(this) || this;
                        return e.internalValue = t, e.typeOrder = fi.TimestampValue, e
                    }
                    return s(e, n), e.prototype.value = function(t) {
                        return !t || t.timestampsInSnapshots ? this.internalValue : this.internalValue.toDate()
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.internalValue.isEqual(t.internalValue)
                    }, e.prototype.compareTo = function(t) {
                        return t instanceof e ? this.internalValue._compareTo(t.internalValue) : t instanceof zi ? -1 : this.defaultCompareTo(t)
                    }, e
                }(Fi),
                zi = function(r) {
                    function e(t, e) {
                        var n = r.call(this) || this;
                        return n.localWriteTime = t, n.previousValue = e, n.typeOrder = fi.TimestampValue, n
                    }
                    return s(e, r), e.prototype.value = function(t) {
                        return t && t.serverTimestampBehavior === di.Estimate ? new Wi(this.localWriteTime).value(t) : t && t.serverTimestampBehavior === di.Previous && this.previousValue ? this.previousValue.value(t) : null
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.localWriteTime.isEqual(t.localWriteTime)
                    }, e.prototype.compareTo = function(t) {
                        return t instanceof e ? this.localWriteTime._compareTo(t.localWriteTime) : t instanceof Wi ? 1 : this.defaultCompareTo(t)
                    }, e.prototype.toString = function() {
                        return "<ServerTimestamp localTime=" + this.localWriteTime.toString() + ">"
                    }, e
                }(Fi),
                Hi = function(n) {
                    function e(t) {
                        var e = n.call(this) || this;
                        return e.internalValue = t, e.typeOrder = fi.BlobValue, e
                    }
                    return s(e, n), e.prototype.value = function(t) {
                        return this.internalValue
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.internalValue.isEqual(t.internalValue)
                    }, e.prototype.compareTo = function(t) {
                        return t instanceof e ? this.internalValue._compareTo(t.internalValue) : this.defaultCompareTo(t)
                    }, e
                }(Fi),
                Yi = function(r) {
                    function n(t, e) {
                        var n = r.call(this) || this;
                        return n.databaseId = t, n.key = e, n.typeOrder = fi.RefValue, n
                    }
                    return s(n, r), n.prototype.value = function(t) {
                        return this.key
                    }, n.prototype.isEqual = function(t) {
                        return t instanceof n && (this.key.isEqual(t.key) && this.databaseId.isEqual(t.databaseId))
                    }, n.prototype.compareTo = function(t) {
                        if (t instanceof n) {
                            var e = this.databaseId.compareTo(t.databaseId);
                            return 0 !== e ? e : Ai.comparator(this.key, t.key)
                        }
                        return this.defaultCompareTo(t)
                    }, n
                }(Fi),
                Xi = function(n) {
                    function e(t) {
                        var e = n.call(this) || this;
                        return e.internalValue = t, e.typeOrder = fi.GeoPointValue, e
                    }
                    return s(e, n), e.prototype.value = function(t) {
                        return this.internalValue
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.internalValue.isEqual(t.internalValue)
                    }, e.prototype.compareTo = function(t) {
                        return t instanceof e ? this.internalValue._compareTo(t.internalValue) : this.defaultCompareTo(t)
                    }, e
                }(Fi),
                Ji = function(n) {
                    function a(t) {
                        var e = n.call(this) || this;
                        return e.internalValue = t, e.typeOrder = fi.ObjectValue, e
                    }
                    return s(a, n), a.prototype.value = function(n) {
                        var r = {};
                        return this.internalValue.inorderTraversal(function(t, e) {
                            r[t] = e.value(n)
                        }), r
                    }, a.prototype.forEach = function(t) {
                        this.internalValue.inorderTraversal(t)
                    }, a.prototype.isEqual = function(t) {
                        if (t instanceof a) {
                            for (var e = this.internalValue.getIterator(), n = t.internalValue.getIterator(); e.hasNext() && n.hasNext();) {
                                var r = e.getNext(),
                                    i = n.getNext();
                                if (r.key !== i.key || !r.value.isEqual(i.value)) return !1
                            }
                            return !e.hasNext() && !n.hasNext()
                        }
                        return !1
                    }, a.prototype.compareTo = function(t) {
                        if (t instanceof a) {
                            for (var e = this.internalValue.getIterator(), n = t.internalValue.getIterator(); e.hasNext() && n.hasNext();) {
                                var r = e.getNext(),
                                    i = n.getNext(),
                                    o = si(r.key, i.key) || r.value.compareTo(i.value);
                                if (o) return o
                            }
                            return si(e.hasNext(), n.hasNext())
                        }
                        return this.defaultCompareTo(t)
                    }, a.prototype.set = function(t, e) {
                        if (Mr(!t.isEmpty(), "Cannot set field for empty path on ObjectValue"), 1 === t.length) return this.setChild(t.firstSegment(), e);
                        var n = this.child(t.firstSegment());
                        n instanceof a || (n = a.EMPTY);
                        var r = n.set(t.popFirst(), e);
                        return this.setChild(t.firstSegment(), r)
                    }, a.prototype.delete = function(t) {
                        if (Mr(!t.isEmpty(), "Cannot delete field for empty path on ObjectValue"), 1 === t.length) return new a(this.internalValue.remove(t.firstSegment()));
                        var e = this.child(t.firstSegment());
                        if (e instanceof a) {
                            var n = e.delete(t.popFirst());
                            return new a(this.internalValue.insert(t.firstSegment(), n))
                        }
                        return this
                    }, a.prototype.contains = function(t) {
                        return void 0 !== this.field(t)
                    }, a.prototype.field = function(t) {
                        Mr(!t.isEmpty(), "Can't get field of empty path");
                        var e = this;
                        return t.forEach(function(t) {
                            e = e instanceof a && e.internalValue.get(t) || void 0
                        }), e
                    }, a.prototype.toString = function() {
                        return this.internalValue.toString()
                    }, a.prototype.child = function(t) {
                        return this.internalValue.get(t) || void 0
                    }, a.prototype.setChild = function(t, e) {
                        return new a(this.internalValue.insert(t, e))
                    }, a.EMPTY = new a(new _i(si)), a
                }(Fi),
                $i = function(n) {
                    function i(t) {
                        var e = n.call(this) || this;
                        return e.internalValue = t, e.typeOrder = fi.ArrayValue, e
                    }
                    return s(i, n), i.prototype.value = function(e) {
                        return this.internalValue.map(function(t) {
                            return t.value(e)
                        })
                    }, i.prototype.forEach = function(t) {
                        this.internalValue.forEach(t)
                    }, i.prototype.isEqual = function(t) {
                        if (t instanceof i) {
                            if (this.internalValue.length !== t.internalValue.length) return !1;
                            for (var e = 0; e < this.internalValue.length; e++)
                                if (!this.internalValue[e].isEqual(t.internalValue[e])) return !1;
                            return !0
                        }
                        return !1
                    }, i.prototype.compareTo = function(t) {
                        if (t instanceof i) {
                            for (var e = Math.min(this.internalValue.length, t.internalValue.length), n = 0; n < e; n++) {
                                var r = this.internalValue[n].compareTo(t.internalValue[n]);
                                if (r) return r
                            }
                            return si(this.internalValue.length, t.internalValue.length)
                        }
                        return this.defaultCompareTo(t)
                    }, i.prototype.toString = function() {
                        return "[" + this.internalValue.map(function(t) {
                            return t.toString()
                        }).join(",") + "]"
                    }, i
                }(Fi),
                Zi = Number,
                to = Zi.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1),
                eo = Zi.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1,
                no = Zi.isInteger || function(t) {
                    return "number" == typeof t && isFinite(t) && Math.floor(t) === t
                };

            function ro(t) {
                return null == t
            }

            function io(t) {
                return no(t) && t <= eo && to <= t
            }
            var oo, ao, so = function() {
                    function n(t, e, n, r, i, o, a) {
                        void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), void 0 === i && (i = null), void 0 === o && (o = null), void 0 === a && (a = null), this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = r, this.limit = i, this.startAt = o, this.endAt = a, this.memoizedCanonicalId = null, this.memoizedOrderBy = null, this.startAt && this.assertValidBound(this.startAt), this.endAt && this.assertValidBound(this.endAt)
                    }
                    return n.atPath = function(t) {
                        return new n(t)
                    }, Object.defineProperty(n.prototype, "orderBy", {
                        get: function() {
                            if (null === this.memoizedOrderBy) {
                                var t = this.getInequalityFilterField(),
                                    e = this.getFirstOrderByField();
                                if (null !== t && null === e) t.isKeyField() ? this.memoizedOrderBy = [go] : this.memoizedOrderBy = [new yo(t), go];
                                else {
                                    Mr(null === t || null !== e && t.isEqual(e), "First orderBy should match inequality field.");
                                    for (var n = !(this.memoizedOrderBy = []), r = 0, i = this.explicitOrderBy; r < i.length; r++) {
                                        var o = i[r];
                                        this.memoizedOrderBy.push(o), o.field.isKeyField() && (n = !0)
                                    }
                                    if (!n) {
                                        var a = 0 < this.explicitOrderBy.length ? this.explicitOrderBy[this.explicitOrderBy.length - 1].dir : po.ASCENDING;
                                        this.memoizedOrderBy.push(a === po.ASCENDING ? go : vo)
                                    }
                                }
                            }
                            return this.memoizedOrderBy
                        },
                        enumerable: !0,
                        configurable: !0
                    }), n.prototype.addFilter = function(t) {
                        Mr(null == this.getInequalityFilterField() || !(t instanceof ho) || !t.isInequality() || t.field.isEqual(this.getInequalityFilterField()), "Query must only have one inequality field."), Mr(!this.isDocumentQuery(), "No filtering allowed for document query");
                        var e = this.filters.concat([t]);
                        return new n(this.path, this.collectionGroup, this.explicitOrderBy.slice(), e, this.limit, this.startAt, this.endAt)
                    }, n.prototype.addOrderBy = function(t) {
                        Mr(!this.startAt && !this.endAt, "Bounds must be set after orderBy");
                        var e = this.explicitOrderBy.concat([t]);
                        return new n(this.path, this.collectionGroup, e, this.filters.slice(), this.limit, this.startAt, this.endAt)
                    }, n.prototype.withLimit = function(t) {
                        return new n(this.path, this.collectionGroup, this.explicitOrderBy.slice(), this.filters.slice(), t, this.startAt, this.endAt)
                    }, n.prototype.withStartAt = function(t) {
                        return new n(this.path, this.collectionGroup, this.explicitOrderBy.slice(), this.filters.slice(), this.limit, t, this.endAt)
                    }, n.prototype.withEndAt = function(t) {
                        return new n(this.path, this.collectionGroup, this.explicitOrderBy.slice(), this.filters.slice(), this.limit, this.startAt, t)
                    }, n.prototype.asCollectionQueryAtPath = function(t) {
                        return new n(t, null, this.explicitOrderBy.slice(), this.filters.slice(), this.limit, this.startAt, this.endAt)
                    }, n.prototype.canonicalId = function() {
                        if (null === this.memoizedCanonicalId) {
                            var t = this.path.canonicalString();
                            this.isCollectionGroupQuery() && (t += "|cg:" + this.collectionGroup), t += "|f:";
                            for (var e = 0, n = this.filters; e < n.length; e++) {
                                t += n[e].canonicalId(), t += ","
                            }
                            t += "|ob:";
                            for (var r = 0, i = this.orderBy; r < i.length; r++) {
                                t += i[r].canonicalId(), t += ","
                            }
                            ro(this.limit) || (t += "|l:", t += this.limit), this.startAt && (t += "|lb:", t += this.startAt.canonicalId()), this.endAt && (t += "|ub:", t += this.endAt.canonicalId()), this.memoizedCanonicalId = t
                        }
                        return this.memoizedCanonicalId
                    }, n.prototype.toString = function() {
                        var t = "Query(" + this.path.canonicalString();
                        return this.isCollectionGroupQuery() && (t += " collectionGroup=" + this.collectionGroup), 0 < this.filters.length && (t += ", filters: [" + this.filters.join(", ") + "]"), ro(this.limit) || (t += ", limit: " + this.limit), 0 < this.explicitOrderBy.length && (t += ", orderBy: [" + this.explicitOrderBy.join(", ") + "]"), this.startAt && (t += ", startAt: " + this.startAt.canonicalId()), this.endAt && (t += ", endAt: " + this.endAt.canonicalId()), t + ")"
                    }, n.prototype.isEqual = function(t) {
                        if (this.limit !== t.limit) return !1;
                        if (this.orderBy.length !== t.orderBy.length) return !1;
                        for (var e = 0; e < this.orderBy.length; e++)
                            if (!this.orderBy[e].isEqual(t.orderBy[e])) return !1;
                        if (this.filters.length !== t.filters.length) return !1;
                        for (e = 0; e < this.filters.length; e++)
                            if (!this.filters[e].isEqual(t.filters[e])) return !1;
                        return this.collectionGroup === t.collectionGroup && (!!this.path.isEqual(t.path) && (!(null !== this.startAt ? !this.startAt.isEqual(t.startAt) : null !== t.startAt) && (null !== this.endAt ? this.endAt.isEqual(t.endAt) : null === t.endAt)))
                    }, n.prototype.docComparator = function(t, e) {
                        for (var n = !1, r = 0, i = this.orderBy; r < i.length; r++) {
                            var o = i[r],
                                a = o.compare(t, e);
                            if (0 !== a) return a;
                            n = n || o.field.isKeyField()
                        }
                        return Mr(n, "orderBy used that doesn't compare on key field"), 0
                    }, n.prototype.matches = function(t) {
                        return this.matchesPathAndCollectionGroup(t) && this.matchesOrderBy(t) && this.matchesFilters(t) && this.matchesBounds(t)
                    }, n.prototype.hasLimit = function() {
                        return !ro(this.limit)
                    }, n.prototype.getFirstOrderByField = function() {
                        return 0 < this.explicitOrderBy.length ? this.explicitOrderBy[0].field : null
                    }, n.prototype.getInequalityFilterField = function() {
                        for (var t = 0, e = this.filters; t < e.length; t++) {
                            var n = e[t];
                            if (n instanceof ho && n.isInequality()) return n.field
                        }
                        return null
                    }, n.prototype.hasArrayContainsFilter = function() {
                        return void 0 !== this.filters.find(function(t) {
                            return t instanceof ho && t.op === co.ARRAY_CONTAINS
                        })
                    }, n.prototype.isDocumentQuery = function() {
                        return Ai.isDocumentKey(this.path) && null === this.collectionGroup && 0 === this.filters.length
                    }, n.prototype.isCollectionGroupQuery = function() {
                        return null !== this.collectionGroup
                    }, n.prototype.matchesPathAndCollectionGroup = function(t) {
                        var e = t.key.path;
                        return null !== this.collectionGroup ? t.key.hasCollectionId(this.collectionGroup) && this.path.isPrefixOf(e) : Ai.isDocumentKey(this.path) ? this.path.isEqual(e) : this.path.isImmediateParentOf(e)
                    }, n.prototype.matchesOrderBy = function(t) {
                        for (var e = 0, n = this.explicitOrderBy; e < n.length; e++) {
                            var r = n[e];
                            if (!r.field.isKeyField() && void 0 === t.field(r.field)) return !1
                        }
                        return !0
                    }, n.prototype.matchesFilters = function(t) {
                        for (var e = 0, n = this.filters; e < n.length; e++) {
                            if (!n[e].matches(t)) return !1
                        }
                        return !0
                    }, n.prototype.matchesBounds = function(t) {
                        return !(this.startAt && !this.startAt.sortsBeforeDocument(this.orderBy, t)) && (!this.endAt || !this.endAt.sortsBeforeDocument(this.orderBy, t))
                    }, n.prototype.assertValidBound = function(t) {
                        Mr(t.position.length <= this.orderBy.length, "Bound is longer than orderBy")
                    }, n
                }(),
                uo = function() {
                    function t() {}
                    return t.create = function(t, e, n) {
                        if (n.isEqual(Vi.INSTANCE)) {
                            if (e !== co.EQUAL) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. You can only perform equals comparisons on null.");
                            return new lo(t)
                        }
                        if (n.isEqual(ji.NAN)) {
                            if (e !== co.EQUAL) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. You can only perform equals comparisons on NaN.");
                            return new fo(t)
                        }
                        return new ho(t, e, n)
                    }, t
                }(),
                co = function() {
                    function e(t) {
                        this.name = t
                    }
                    return e.fromString = function(t) {
                        switch (t) {
                            case "<":
                                return e.LESS_THAN;
                            case "<=":
                                return e.LESS_THAN_OR_EQUAL;
                            case "==":
                                return e.EQUAL;
                            case ">=":
                                return e.GREATER_THAN_OR_EQUAL;
                            case ">":
                                return e.GREATER_THAN;
                            case "array-contains":
                                return e.ARRAY_CONTAINS;
                            default:
                                return Rr("Unknown relation: " + t)
                        }
                    }, e.prototype.toString = function() {
                        return this.name
                    }, e.prototype.isEqual = function(t) {
                        return this.name === t.name
                    }, e.LESS_THAN = new e("<"), e.LESS_THAN_OR_EQUAL = new e("<="), e.EQUAL = new e("=="), e.GREATER_THAN = new e(">"), e.GREATER_THAN_OR_EQUAL = new e(">="), e.ARRAY_CONTAINS = new e("array-contains"), e
                }(),
                ho = function(i) {
                    function e(t, e, n) {
                        var r = i.call(this) || this;
                        return r.field = t, r.op = e, r.value = n, r
                    }
                    return s(e, i), e.prototype.matches = function(t) {
                        if (this.field.isKeyField()) {
                            Mr(this.value instanceof Yi, "Comparing on key, but filter value not a RefValue"), Mr(this.op !== co.ARRAY_CONTAINS, "array-contains queries don't make sense on document keys.");
                            var e = this.value,
                                n = Ai.comparator(t.key, e.key);
                            return this.matchesComparison(n)
                        }
                        var r = t.field(this.field);
                        return void 0 !== r && this.matchesValue(r)
                    }, e.prototype.matchesValue = function(t) {
                        var e = this;
                        return this.op === co.ARRAY_CONTAINS ? t instanceof $i && void 0 !== t.internalValue.find(function(t) {
                            return t.isEqual(e.value)
                        }) : this.value.typeOrder === t.typeOrder && this.matchesComparison(t.compareTo(this.value))
                    }, e.prototype.matchesComparison = function(t) {
                        switch (this.op) {
                            case co.LESS_THAN:
                                return t < 0;
                            case co.LESS_THAN_OR_EQUAL:
                                return t <= 0;
                            case co.EQUAL:
                                return 0 === t;
                            case co.GREATER_THAN:
                                return 0 < t;
                            case co.GREATER_THAN_OR_EQUAL:
                                return 0 <= t;
                            default:
                                return Rr("Unknown relation op" + this.op)
                        }
                    }, e.prototype.isInequality = function() {
                        return this.op !== co.EQUAL && this.op !== co.ARRAY_CONTAINS
                    }, e.prototype.canonicalId = function() {
                        return this.field.canonicalString() + this.op.toString() + this.value.toString()
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && (this.op.isEqual(t.op) && this.field.isEqual(t.field) && this.value.isEqual(t.value))
                    }, e.prototype.toString = function() {
                        return this.field.canonicalString() + " " + this.op + " " + this.value.value()
                    }, e
                }(uo),
                lo = function(n) {
                    function e(t) {
                        var e = n.call(this) || this;
                        return e.field = t, e
                    }
                    return s(e, n), e.prototype.matches = function(t) {
                        var e = t.field(this.field);
                        return void 0 !== e && null === e.value()
                    }, e.prototype.canonicalId = function() {
                        return this.field.canonicalString() + " IS null"
                    }, e.prototype.toString = function() {
                        return this.field.canonicalString() + " IS null"
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.field.isEqual(t.field)
                    }, e
                }(uo),
                fo = function(n) {
                    function e(t) {
                        var e = n.call(this) || this;
                        return e.field = t, e
                    }
                    return s(e, n), e.prototype.matches = function(t) {
                        var e = t.field(this.field),
                            n = e && e.value();
                        return "number" == typeof n && isNaN(n)
                    }, e.prototype.canonicalId = function() {
                        return this.field.canonicalString() + " IS NaN"
                    }, e.prototype.toString = function() {
                        return this.field.canonicalString() + " IS NaN"
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.field.isEqual(t.field)
                    }, e
                }(uo),
                po = function() {
                    function t(t) {
                        this.name = t
                    }
                    return t.prototype.toString = function() {
                        return this.name
                    }, t.ASCENDING = new t("asc"), t.DESCENDING = new t("desc"), t
                }(),
                mo = function() {
                    function t(t, e) {
                        this.position = t, this.before = e
                    }
                    return t.prototype.canonicalId = function() {
                        for (var t = this.before ? "b:" : "a:", e = 0, n = this.position; e < n.length; e++) {
                            t += n[e].toString()
                        }
                        return t
                    }, t.prototype.sortsBeforeDocument = function(t, e) {
                        Mr(this.position.length <= t.length, "Bound has more components than query's orderBy");
                        for (var n = 0, r = 0; r < this.position.length; r++) {
                            var i = t[r],
                                o = this.position[r];
                            if (i.field.isKeyField()) Mr(o instanceof Yi, "Bound has a non-key value where the key path is being used."), n = Ai.comparator(o.key, e.key);
                            else {
                                var a = e.field(i.field);
                                Mr(void 0 !== a, "Field should exist since document matched the orderBy already."), n = o.compareTo(a)
                            }
                            if (i.dir === po.DESCENDING && (n *= -1), 0 !== n) break
                        }
                        return this.before ? n <= 0 : n < 0
                    }, t.prototype.isEqual = function(t) {
                        if (null === t) return !1;
                        if (this.before !== t.before || this.position.length !== t.position.length) return !1;
                        for (var e = 0; e < this.position.length; e++) {
                            var n = this.position[e],
                                r = t.position[e];
                            return n.isEqual(r)
                        }
                        return !0
                    }, t
                }(),
                yo = function() {
                    function t(t, e) {
                        this.field = t, void 0 === e && (e = po.ASCENDING), this.dir = e, this.isKeyOrderBy = t.isKeyField()
                    }
                    return t.prototype.compare = function(t, e) {
                        var n = this.isKeyOrderBy ? Ri.compareByKey(t, e) : Ri.compareByField(this.field, t, e);
                        switch (this.dir) {
                            case po.ASCENDING:
                                return n;
                            case po.DESCENDING:
                                return -1 * n;
                            default:
                                return Rr("Unknown direction: " + this.dir)
                        }
                    }, t.prototype.canonicalId = function() {
                        return this.field.canonicalString() + this.dir.toString()
                    }, t.prototype.toString = function() {
                        return this.field.canonicalString() + " (" + this.dir + ")"
                    }, t.prototype.isEqual = function(t) {
                        return this.dir === t.dir && this.field.isEqual(t.field)
                    }, t
                }(),
                go = new yo(Ni.keyField(), po.ASCENDING),
                vo = new yo(Ni.keyField(), po.DESCENDING),
                bo = function() {
                    function n(t) {
                        this.timestamp = t
                    }
                    return n.fromMicroseconds = function(t) {
                        var e = Math.floor(t / 1e6);
                        return new n(new bi(e, t % 1e6 * 1e3))
                    }, n.fromTimestamp = function(t) {
                        return new n(t)
                    }, n.forDeletedDoc = function() {
                        return n.MIN
                    }, n.prototype.compareTo = function(t) {
                        return this.timestamp._compareTo(t.timestamp)
                    }, n.prototype.isEqual = function(t) {
                        return this.timestamp.isEqual(t.timestamp)
                    }, n.prototype.toMicroseconds = function() {
                        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
                    }, n.prototype.toString = function() {
                        return "SnapshotVersion(" + this.timestamp.toString() + ")"
                    }, n.prototype.toTimestamp = function() {
                        return this.timestamp
                    }, n.MIN = new n(new bi(0, 0)), n
                }();
            (ao = oo || (oo = {}))[ao.Listen = 0] = "Listen", ao[ao.ExistenceFilterMismatch = 1] = "ExistenceFilterMismatch", ao[ao.LimboResolution = 2] = "LimboResolution";
            var wo, Eo, So = function() {
                    function e(t, e, n, r, i, o) {
                        void 0 === i && (i = bo.MIN), void 0 === o && (o = _r()), this.query = t, this.targetId = e, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, this.resumeToken = o
                    }
                    return e.prototype.copy = function(t) {
                        return new e(this.query, this.targetId, this.purpose, void 0 === t.sequenceNumber ? this.sequenceNumber : t.sequenceNumber, void 0 === t.snapshotVersion ? this.snapshotVersion : t.snapshotVersion, void 0 === t.resumeToken ? this.resumeToken : t.resumeToken)
                    }, e.prototype.isEqual = function(t) {
                        return this.targetId === t.targetId && this.purpose === t.purpose && this.sequenceNumber === t.sequenceNumber && this.snapshotVersion.isEqual(t.snapshotVersion) && this.resumeToken === t.resumeToken && this.query.isEqual(t.query)
                    }, e
                }(),
                To = function() {
                    function o(t) {
                        this.comparator = t, this.data = new _i(this.comparator)
                    }
                    return o.fromMapKeys = function(t) {
                        var e = new o(t.comparator);
                        return t.forEach(function(t) {
                            e = e.add(t)
                        }), e
                    }, o.prototype.has = function(t) {
                        return null !== this.data.get(t)
                    }, o.prototype.first = function() {
                        return this.data.minKey()
                    }, o.prototype.last = function() {
                        return this.data.maxKey()
                    }, Object.defineProperty(o.prototype, "size", {
                        get: function() {
                            return this.data.size
                        },
                        enumerable: !0,
                        configurable: !0
                    }), o.prototype.indexOf = function(t) {
                        return this.data.indexOf(t)
                    }, o.prototype.forEach = function(n) {
                        this.data.inorderTraversal(function(t, e) {
                            return n(t), !1
                        })
                    }, o.prototype.forEachInRange = function(t, e) {
                        for (var n = this.data.getIteratorFrom(t[0]); n.hasNext();) {
                            var r = n.getNext();
                            if (0 <= this.comparator(r.key, t[1])) return;
                            e(r.key)
                        }
                    }, o.prototype.forEachWhile = function(t, e) {
                        var n;
                        for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext();) {
                            if (!t(n.getNext().key)) return
                        }
                    }, o.prototype.firstAfterOrEqual = function(t) {
                        var e = this.data.getIteratorFrom(t);
                        return e.hasNext() ? e.getNext().key : null
                    }, o.prototype.getIterator = function() {
                        return new Io(this.data.getIterator())
                    }, o.prototype.getIteratorFrom = function(t) {
                        return new Io(this.data.getIteratorFrom(t))
                    }, o.prototype.add = function(t) {
                        return this.copy(this.data.remove(t).insert(t, !0))
                    }, o.prototype.delete = function(t) {
                        return this.has(t) ? this.copy(this.data.remove(t)) : this
                    }, o.prototype.isEmpty = function() {
                        return this.data.isEmpty()
                    }, o.prototype.unionWith = function(t) {
                        var e = this;
                        return t.forEach(function(t) {
                            e = e.add(t)
                        }), e
                    }, o.prototype.isEqual = function(t) {
                        if (!(t instanceof o)) return !1;
                        if (this.size !== t.size) return !1;
                        for (var e = this.data.getIterator(), n = t.data.getIterator(); e.hasNext();) {
                            var r = e.getNext().key,
                                i = n.getNext().key;
                            if (0 !== this.comparator(r, i)) return !1
                        }
                        return !0
                    }, o.prototype.toArray = function() {
                        var e = [];
                        return this.forEach(function(t) {
                            e.push(t)
                        }), e
                    }, o.prototype.toString = function() {
                        var e = [];
                        return this.forEach(function(t) {
                            return e.push(t)
                        }), "SortedSet(" + e.toString() + ")"
                    }, o.prototype.copy = function(t) {
                        var e = new o(this.comparator);
                        return e.data = t, e
                    }, o
                }(),
                Io = function() {
                    function t(t) {
                        this.iter = t
                    }
                    return t.prototype.getNext = function() {
                        return this.iter.getNext().key
                    }, t.prototype.hasNext = function() {
                        return this.iter.hasNext()
                    }, t
                }(),
                Co = function() {
                    function n(t) {
                        this.fields = t
                    }
                    return n.fromSet = function(t) {
                        return new n(t)
                    }, n.fromArray = function(t) {
                        var e = new To(Ni.comparator);
                        return t.forEach(function(t) {
                            return e = e.add(t)
                        }), new n(e)
                    }, n.prototype.covers = function(e) {
                        var n = !1;
                        return this.fields.forEach(function(t) {
                            t.isPrefixOf(e) && (n = !0)
                        }), n
                    }, n.prototype.applyTo = function(n) {
                        var r = Ji.EMPTY;
                        return this.fields.forEach(function(t) {
                            if (t.isEmpty()) return n;
                            var e = n.field(t);
                            void 0 !== e && (r = r.set(t, e))
                        }), r
                    }, n.prototype.isEqual = function(t) {
                        return this.fields.isEqual(t.fields)
                    }, n
                }(),
                Do = function() {
                    function t(t, e) {
                        this.field = t, this.transform = e
                    }
                    return Object.defineProperty(t.prototype, "isIdempotent", {
                        get: function() {
                            return this.transform.isIdempotent
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.isEqual = function(t) {
                        return this.field.isEqual(t.field) && this.transform.isEqual(t.transform)
                    }, t
                }(),
                No = function(t, e) {
                    this.version = t, this.transformResults = e
                };
            (Eo = wo || (wo = {}))[Eo.Set = 0] = "Set", Eo[Eo.Patch = 1] = "Patch", Eo[Eo.Transform = 2] = "Transform", Eo[Eo.Delete = 3] = "Delete";
            var Ao = function() {
                    function e(t, e) {
                        this.updateTime = t, this.exists = e, Mr(void 0 === t || void 0 === e, 'Precondition can specify "exists" or "updateTime" but not both')
                    }
                    return e.exists = function(t) {
                        return new e(void 0, t)
                    }, e.updateTime = function(t) {
                        return new e(t)
                    }, Object.defineProperty(e.prototype, "isNone", {
                        get: function() {
                            return void 0 === this.updateTime && void 0 === this.exists
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.isValidFor = function(t) {
                        return void 0 !== this.updateTime ? t instanceof Ri && t.version.isEqual(this.updateTime) : void 0 !== this.exists ? this.exists === t instanceof Ri : (Mr(this.isNone, "Precondition should be empty"), !0)
                    }, e.prototype.isEqual = function(t) {
                        return e = this.updateTime, n = t.updateTime, (null != e ? !(!n || !e.isEqual(n)) : e === n) && this.exists === t.exists;
                        var e, n
                    }, e.NONE = new e, e
                }(),
                ko = function() {
                    function t() {}
                    return t.prototype.verifyKeyMatches = function(t) {
                        null != t && Mr(t.key.isEqual(this.key), "Can only apply a mutation to a document with the same key")
                    }, t.getPostMutationVersion = function(t) {
                        return t instanceof Ri ? t.version : bo.MIN
                    }, t
                }(),
                Ro = function(i) {
                    function e(t, e, n) {
                        var r = i.call(this) || this;
                        return r.key = t, r.value = e, r.precondition = n, r.type = wo.Set, r
                    }
                    return s(e, i), e.prototype.applyToRemoteDocument = function(t, e) {
                        this.verifyKeyMatches(t), Mr(null == e.transformResults, "Transform results received by SetMutation.");
                        var n = e.version;
                        return new Ri(this.key, n, this.value, {
                            hasCommittedMutations: !0
                        })
                    }, e.prototype.applyToLocalView = function(t, e, n) {
                        if (this.verifyKeyMatches(t), !this.precondition.isValidFor(t)) return t;
                        var r = ko.getPostMutationVersion(t);
                        return new Ri(this.key, r, this.value, {
                            hasLocalMutations: !0
                        })
                    }, Object.defineProperty(e.prototype, "isIdempotent", {
                        get: function() {
                            return !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "fieldMask", {
                        get: function() {
                            return null
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.isEqual = function(t) {
                        return t instanceof e && this.key.isEqual(t.key) && this.value.isEqual(t.value) && this.precondition.isEqual(t.precondition)
                    }, e
                }(ko),
                Mo = function(o) {
                    function e(t, e, n, r) {
                        var i = o.call(this) || this;
                        return i.key = t, i.data = e, i.fieldMask = n, i.precondition = r, i.type = wo.Patch, i
                    }
                    return s(e, o), e.prototype.applyToRemoteDocument = function(t, e) {
                        if (this.verifyKeyMatches(t), Mr(null == e.transformResults, "Transform results received by PatchMutation."), !this.precondition.isValidFor(t)) return new Oi(this.key, e.version);
                        var n = this.patchDocument(t);
                        return new Ri(this.key, e.version, n, {
                            hasCommittedMutations: !0
                        })
                    }, e.prototype.applyToLocalView = function(t, e, n) {
                        if (this.verifyKeyMatches(t), !this.precondition.isValidFor(t)) return t;
                        var r = ko.getPostMutationVersion(t),
                            i = this.patchDocument(t);
                        return new Ri(this.key, r, i, {
                            hasLocalMutations: !0
                        })
                    }, Object.defineProperty(e.prototype, "isIdempotent", {
                        get: function() {
                            return !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.isEqual = function(t) {
                        return t instanceof e && this.key.isEqual(t.key) && this.fieldMask.isEqual(t.fieldMask) && this.precondition.isEqual(t.precondition)
                    }, e.prototype.patchDocument = function(t) {
                        var e;
                        return e = t instanceof Ri ? t.data : Ji.EMPTY, this.patchObject(e)
                    }, e.prototype.patchObject = function(n) {
                        var r = this;
                        return this.fieldMask.fields.forEach(function(t) {
                            if (!t.isEmpty()) {
                                var e = r.data.field(t);
                                n = void 0 !== e ? n.set(t, e) : n.delete(t)
                            }
                        }), n
                    }, e
                }(ko),
                Oo = function(r) {
                    function e(t, e) {
                        var n = r.call(this) || this;
                        return n.key = t, n.fieldTransforms = e, n.type = wo.Transform, n.precondition = Ao.exists(!0), n
                    }
                    return s(e, r), e.prototype.applyToRemoteDocument = function(t, e) {
                        if (this.verifyKeyMatches(t), Mr(null != e.transformResults, "Transform results missing for TransformMutation."), !this.precondition.isValidFor(t)) return new Oi(this.key, e.version);
                        var n = this.requireDocument(t),
                            r = this.serverTransformResults(t, e.transformResults),
                            i = e.version,
                            o = this.transformObject(n.data, r);
                        return new Ri(this.key, i, o, {
                            hasCommittedMutations: !0
                        })
                    }, e.prototype.applyToLocalView = function(t, e, n) {
                        if (this.verifyKeyMatches(t), !this.precondition.isValidFor(t)) return t;
                        var r = this.requireDocument(t),
                            i = this.localTransformResults(n, e),
                            o = this.transformObject(r.data, i);
                        return new Ri(this.key, r.version, o, {
                            hasLocalMutations: !0
                        })
                    }, Object.defineProperty(e.prototype, "isIdempotent", {
                        get: function() {
                            for (var t = 0, e = this.fieldTransforms; t < e.length; t++) {
                                if (!e[t].isIdempotent) return !1
                            }
                            return !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "fieldMask", {
                        get: function() {
                            var e = new To(Ni.comparator);
                            return this.fieldTransforms.forEach(function(t) {
                                return e = e.add(t.field)
                            }), new Co(e)
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.isEqual = function(t) {
                        return t instanceof e && this.key.isEqual(t.key) && ui(this.fieldTransforms, t.fieldTransforms) && this.precondition.isEqual(t.precondition)
                    }, e.prototype.requireDocument = function(t) {
                        Mr(t instanceof Ri, "Unknown MaybeDocument type " + t);
                        var e = t;
                        return Mr(e.key.isEqual(this.key), "Can only transform a document with the same key"), e
                    }, e.prototype.serverTransformResults = function(t, e) {
                        var n = [];
                        Mr(this.fieldTransforms.length === e.length, "server transform result count (" + e.length + ") should match field transform count (" + this.fieldTransforms.length + ")");
                        for (var r = 0; r < e.length; r++) {
                            var i = this.fieldTransforms[r],
                                o = i.transform,
                                a = null;
                            t instanceof Ri && (a = t.field(i.field) || null), n.push(o.applyToRemoteDocument(a, e[r]))
                        }
                        return n
                    }, e.prototype.localTransformResults = function(t, e) {
                        for (var n = [], r = 0, i = this.fieldTransforms; r < i.length; r++) {
                            var o = i[r],
                                a = o.transform,
                                s = null;
                            e instanceof Ri && (s = e.field(o.field) || null), n.push(a.applyToLocalView(s, t))
                        }
                        return n
                    }, e.prototype.transformObject = function(t, e) {
                        Mr(e.length === this.fieldTransforms.length, "TransformResults length mismatch.");
                        for (var n = 0; n < this.fieldTransforms.length; n++) {
                            var r = this.fieldTransforms[n].field;
                            t = t.set(r, e[n])
                        }
                        return t
                    }, e
                }(ko),
                _o = function(r) {
                    function e(t, e) {
                        var n = r.call(this) || this;
                        return n.key = t, n.precondition = e, n.type = wo.Delete, n
                    }
                    return s(e, r), e.prototype.applyToRemoteDocument = function(t, e) {
                        return this.verifyKeyMatches(t), Mr(null == e.transformResults, "Transform results received by DeleteMutation."), new Mi(this.key, e.version, {
                            hasCommittedMutations: !0
                        })
                    }, e.prototype.applyToLocalView = function(t, e, n) {
                        return this.verifyKeyMatches(t), this.precondition.isValidFor(t) ? (t && Mr(t.key.isEqual(this.key), "Can only apply mutation to document with same key"), new Mi(this.key, bo.forDeletedDoc())) : t
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.key.isEqual(t.key) && this.precondition.isEqual(t.precondition)
                    }, Object.defineProperty(e.prototype, "isIdempotent", {
                        get: function() {
                            return !0
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "fieldMask", {
                        get: function() {
                            return null
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e
                }(ko),
                Po = function() {
                    function e() {
                        this.isIdempotent = !0
                    }
                    return e.prototype.applyToLocalView = function(t, e) {
                        return new zi(e, t)
                    }, e.prototype.applyToRemoteDocument = function(t, e) {
                        return e
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e
                    }, e.instance = new e, e
                }(),
                Lo = function() {
                    function e(t) {
                        this.elements = t, this.isIdempotent = !0
                    }
                    return e.prototype.applyToLocalView = function(t, e) {
                        return this.apply(t)
                    }, e.prototype.applyToRemoteDocument = function(t, e) {
                        return this.apply(t)
                    }, e.prototype.apply = function(t) {
                        for (var n = Fo(t), e = function(e) {
                                n.find(function(t) {
                                    return t.isEqual(e)
                                }) || n.push(e)
                            }, r = 0, i = this.elements; r < i.length; r++) {
                            e(i[r])
                        }
                        return new $i(n)
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && ui(t.elements, this.elements)
                    }, e
                }(),
                xo = function() {
                    function e(t) {
                        this.elements = t, this.isIdempotent = !0
                    }
                    return e.prototype.applyToLocalView = function(t, e) {
                        return this.apply(t)
                    }, e.prototype.applyToRemoteDocument = function(t, e) {
                        return this.apply(t)
                    }, e.prototype.apply = function(t) {
                        for (var n = Fo(t), e = function(e) {
                                n = n.filter(function(t) {
                                    return !t.isEqual(e)
                                })
                            }, r = 0, i = this.elements; r < i.length; r++) {
                            e(i[r])
                        }
                        return new $i(n)
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && ui(t.elements, this.elements)
                    }, e
                }(),
                qo = function() {
                    function e(t) {
                        this.operand = t, this.isIdempotent = !1
                    }
                    return e.prototype.applyToLocalView = function(t, e) {
                        if (t instanceof Ki && this.operand instanceof Ki) {
                            var n = t.internalValue + this.operand.internalValue;
                            return new Ki(n)
                        }
                        if (t instanceof Ui) {
                            n = t.internalValue + this.operand.internalValue;
                            return new ji(n)
                        }
                        return this.operand
                    }, e.prototype.applyToRemoteDocument = function(t, e) {
                        return Mr(null !== e, "Didn't receive transformResult for NUMERIC_ADD transform"), e
                    }, e.prototype.isEqual = function(t) {
                        return t instanceof e && this.operand.isEqual(t.operand)
                    }, e
                }();

            function Fo(t) {
                return t instanceof $i ? t.internalValue.slice() : []
            }
            var Vo, Bo, Uo = function() {
                function t(t) {
                    this.count = t
                }
                return t.prototype.isEqual = function(t) {
                    return t && t.count === this.count
                }, t
            }();

            function Qo(t) {
                switch (t) {
                    case Pr.OK:
                        return Rr("Treated status OK as error");
                    case Pr.CANCELLED:
                    case Pr.UNKNOWN:
                    case Pr.DEADLINE_EXCEEDED:
                    case Pr.RESOURCE_EXHAUSTED:
                    case Pr.INTERNAL:
                    case Pr.UNAVAILABLE:
                    case Pr.UNAUTHENTICATED:
                        return !1;
                    case Pr.INVALID_ARGUMENT:
                    case Pr.NOT_FOUND:
                    case Pr.ALREADY_EXISTS:
                    case Pr.PERMISSION_DENIED:
                    case Pr.FAILED_PRECONDITION:
                    case Pr.ABORTED:
                    case Pr.OUT_OF_RANGE:
                    case Pr.UNIMPLEMENTED:
                    case Pr.DATA_LOSS:
                        return !0;
                    default:
                        return Rr("Unknown status code: " + t)
                }
            }

            function Ko(t) {
                if (void 0 === t) return Ar("GRPC error has no .code"), Pr.UNKNOWN;
                switch (t) {
                    case Vo.OK:
                        return Pr.OK;
                    case Vo.CANCELLED:
                        return Pr.CANCELLED;
                    case Vo.UNKNOWN:
                        return Pr.UNKNOWN;
                    case Vo.DEADLINE_EXCEEDED:
                        return Pr.DEADLINE_EXCEEDED;
                    case Vo.RESOURCE_EXHAUSTED:
                        return Pr.RESOURCE_EXHAUSTED;
                    case Vo.INTERNAL:
                        return Pr.INTERNAL;
                    case Vo.UNAVAILABLE:
                        return Pr.UNAVAILABLE;
                    case Vo.UNAUTHENTICATED:
                        return Pr.UNAUTHENTICATED;
                    case Vo.INVALID_ARGUMENT:
                        return Pr.INVALID_ARGUMENT;
                    case Vo.NOT_FOUND:
                        return Pr.NOT_FOUND;
                    case Vo.ALREADY_EXISTS:
                        return Pr.ALREADY_EXISTS;
                    case Vo.PERMISSION_DENIED:
                        return Pr.PERMISSION_DENIED;
                    case Vo.FAILED_PRECONDITION:
                        return Pr.FAILED_PRECONDITION;
                    case Vo.ABORTED:
                        return Pr.ABORTED;
                    case Vo.OUT_OF_RANGE:
                        return Pr.OUT_OF_RANGE;
                    case Vo.UNIMPLEMENTED:
                        return Pr.UNIMPLEMENTED;
                    case Vo.DATA_LOSS:
                        return Pr.DATA_LOSS;
                    default:
                        return Rr("Unknown status code: " + t)
                }
            }(Bo = Vo || (Vo = {}))[Bo.OK = 0] = "OK", Bo[Bo.CANCELLED = 1] = "CANCELLED", Bo[Bo.UNKNOWN = 2] = "UNKNOWN", Bo[Bo.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", Bo[Bo.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Bo[Bo.NOT_FOUND = 5] = "NOT_FOUND", Bo[Bo.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Bo[Bo.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", Bo[Bo.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Bo[Bo.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", Bo[Bo.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Bo[Bo.ABORTED = 10] = "ABORTED", Bo[Bo.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Bo[Bo.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", Bo[Bo.INTERNAL = 13] = "INTERNAL", Bo[Bo.UNAVAILABLE = 14] = "UNAVAILABLE", Bo[Bo.DATA_LOSS = 15] = "DATA_LOSS";
            var jo = new _i(Ai.comparator);

            function Go() {
                return jo
            }

            function Wo() {
                return Go()
            }
            var zo = new _i(Ai.comparator);

            function Ho() {
                return zo
            }
            var Yo = new _i(Ai.comparator);

            function Xo() {
                return Yo
            }
            var Jo = new To(Ai.comparator);

            function $o() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                for (var n = Jo, r = 0, i = t; r < i.length; r++) {
                    var o = i[r];
                    n = n.add(o)
                }
                return n
            }
            var Zo = new To(si);

            function ta() {
                return Zo
            }
            var ea, na, ra, ia, oa = function() {
                function o(n) {
                    this.comparator = n ? function(t, e) {
                        return n(t, e) || Ai.comparator(t.key, e.key)
                    } : function(t, e) {
                        return Ai.comparator(t.key, e.key)
                    }, this.keyedMap = Ho(), this.sortedSet = new _i(this.comparator)
                }
                return o.emptySet = function(t) {
                    return new o(t.comparator)
                }, o.prototype.has = function(t) {
                    return null != this.keyedMap.get(t)
                }, o.prototype.get = function(t) {
                    return this.keyedMap.get(t)
                }, o.prototype.first = function() {
                    return this.sortedSet.minKey()
                }, o.prototype.last = function() {
                    return this.sortedSet.maxKey()
                }, o.prototype.isEmpty = function() {
                    return this.sortedSet.isEmpty()
                }, o.prototype.indexOf = function(t) {
                    var e = this.keyedMap.get(t);
                    return e ? this.sortedSet.indexOf(e) : -1
                }, Object.defineProperty(o.prototype, "size", {
                    get: function() {
                        return this.sortedSet.size
                    },
                    enumerable: !0,
                    configurable: !0
                }), o.prototype.forEach = function(n) {
                    this.sortedSet.inorderTraversal(function(t, e) {
                        return n(t), !1
                    })
                }, o.prototype.add = function(t) {
                    var e = this.delete(t.key);
                    return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null))
                }, o.prototype.delete = function(t) {
                    var e = this.get(t);
                    return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this
                }, o.prototype.isEqual = function(t) {
                    if (!(t instanceof o)) return !1;
                    if (this.size !== t.size) return !1;
                    for (var e = this.sortedSet.getIterator(), n = t.sortedSet.getIterator(); e.hasNext();) {
                        var r = e.getNext().key,
                            i = n.getNext().key;
                        if (!r.isEqual(i)) return !1
                    }
                    return !0
                }, o.prototype.toString = function() {
                    var e = [];
                    return this.forEach(function(t) {
                        e.push(t.toString())
                    }), 0 === e.length ? "DocumentSet ()" : "DocumentSet (\n  " + e.join("  \n") + "\n)"
                }, o.prototype.copy = function(t, e) {
                    var n = new o;
                    return n.comparator = this.comparator, n.keyedMap = t, n.sortedSet = e, n
                }, o
            }();
            (na = ea || (ea = {}))[na.Added = 0] = "Added", na[na.Removed = 1] = "Removed", na[na.Modified = 2] = "Modified", na[na.Metadata = 3] = "Metadata", (ia = ra || (ra = {}))[ia.Local = 0] = "Local", ia[ia.Synced = 1] = "Synced";
            var aa, sa, ua = function() {
                    function t() {
                        this.changeMap = new _i(Ai.comparator)
                    }
                    return t.prototype.track = function(t) {
                        var e = t.doc.key,
                            n = this.changeMap.get(e);
                        n ? t.type !== ea.Added && n.type === ea.Metadata ? this.changeMap = this.changeMap.insert(e, t) : t.type === ea.Metadata && n.type !== ea.Removed ? this.changeMap = this.changeMap.insert(e, {
                            type: n.type,
                            doc: t.doc
                        }) : t.type === ea.Modified && n.type === ea.Modified ? this.changeMap = this.changeMap.insert(e, {
                            type: ea.Modified,
                            doc: t.doc
                        }) : t.type === ea.Modified && n.type === ea.Added ? this.changeMap = this.changeMap.insert(e, {
                            type: ea.Added,
                            doc: t.doc
                        }) : t.type === ea.Removed && n.type === ea.Added ? this.changeMap = this.changeMap.remove(e) : t.type === ea.Removed && n.type === ea.Modified ? this.changeMap = this.changeMap.insert(e, {
                            type: ea.Removed,
                            doc: n.doc
                        }) : t.type === ea.Added && n.type === ea.Removed ? this.changeMap = this.changeMap.insert(e, {
                            type: ea.Modified,
                            doc: t.doc
                        }) : Rr("unsupported combination of changes: " + JSON.stringify(t) + " after " + JSON.stringify(n)) : this.changeMap = this.changeMap.insert(e, t)
                    }, t.prototype.getChanges = function() {
                        var n = [];
                        return this.changeMap.inorderTraversal(function(t, e) {
                            n.push(e)
                        }), n
                    }, t
                }(),
                ca = function() {
                    function o(t, e, n, r, i, o, a, s) {
                        this.query = t, this.docs = e, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, this.fromCache = o, this.syncStateChanged = a, this.excludesMetadataChanges = s
                    }
                    return o.fromInitialDocuments = function(t, e, n, r) {
                        var i = [];
                        return e.forEach(function(t) {
                            i.push({
                                type: ea.Added,
                                doc: t
                            })
                        }), new o(t, e, oa.emptySet(e), i, n, r, !0, !1)
                    }, Object.defineProperty(o.prototype, "hasPendingWrites", {
                        get: function() {
                            return !this.mutatedKeys.isEmpty()
                        },
                        enumerable: !0,
                        configurable: !0
                    }), o.prototype.isEqual = function(t) {
                        if (!(this.fromCache === t.fromCache && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && this.query.isEqual(t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
                        var e = this.docChanges,
                            n = t.docChanges;
                        if (e.length !== n.length) return !1;
                        for (var r = 0; r < e.length; r++)
                            if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
                        return !0
                    }, o
                }(),
                ha = function() {
                    function i(t, e, n, r, i) {
                        this.snapshotVersion = t, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = r, this.resolvedLimboDocuments = i
                    }
                    return i.createSynthesizedRemoteEventForCurrentChange = function(t, e) {
                        var n, r = ((n = {})[t] = la.createSynthesizedTargetChangeForCurrentChange(t, e), n);
                        return new i(bo.MIN, r, ta(), Go(), $o())
                    }, i
                }(),
                la = function() {
                    function n(t, e, n, r, i) {
                        this.resumeToken = t, this.current = e, this.addedDocuments = n, this.modifiedDocuments = r, this.removedDocuments = i
                    }
                    return n.createSynthesizedTargetChangeForCurrentChange = function(t, e) {
                        return new n(_r(), e, $o(), $o(), $o())
                    }, n
                }(),
                fa = function(t, e, n, r) {
                    this.updatedTargetIds = t, this.removedTargetIds = e, this.key = n, this.newDoc = r
                },
                pa = function(t, e) {
                    this.targetId = t, this.existenceFilter = e
                };
            (sa = aa || (aa = {}))[sa.NoChange = 0] = "NoChange", sa[sa.Added = 1] = "Added", sa[sa.Removed = 2] = "Removed", sa[sa.Current = 3] = "Current", sa[sa.Reset = 4] = "Reset";
            var da = function(t, e, n, r) {
                    void 0 === n && (n = _r()), void 0 === r && (r = null), this.state = t, this.targetIds = e, this.resumeToken = n, this.cause = r
                },
                ma = function() {
                    function t() {
                        this.pendingResponses = 0, this.documentChanges = va(), this._resumeToken = _r(), this._current = !1, this._hasPendingChanges = !0
                    }
                    return Object.defineProperty(t.prototype, "current", {
                        get: function() {
                            return this._current
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "resumeToken", {
                        get: function() {
                            return this._resumeToken
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "isPending", {
                        get: function() {
                            return 0 !== this.pendingResponses
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "hasPendingChanges", {
                        get: function() {
                            return this._hasPendingChanges
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.updateResumeToken = function(t) {
                        0 < t.length && (this._hasPendingChanges = !0, this._resumeToken = t)
                    }, t.prototype.toTargetChange = function() {
                        var n = $o(),
                            r = $o(),
                            i = $o();
                        return this.documentChanges.forEach(function(t, e) {
                            switch (e) {
                                case ea.Added:
                                    n = n.add(t);
                                    break;
                                case ea.Modified:
                                    r = r.add(t);
                                    break;
                                case ea.Removed:
                                    i = i.add(t);
                                    break;
                                default:
                                    Rr("Encountered invalid change type: " + e)
                            }
                        }), new la(this._resumeToken, this._current, n, r, i)
                    }, t.prototype.clearPendingChanges = function() {
                        this._hasPendingChanges = !1, this.documentChanges = va()
                    }, t.prototype.addDocumentChange = function(t, e) {
                        this._hasPendingChanges = !0, this.documentChanges = this.documentChanges.insert(t, e)
                    }, t.prototype.removeDocumentChange = function(t) {
                        this._hasPendingChanges = !0, this.documentChanges = this.documentChanges.remove(t)
                    }, t.prototype.recordPendingTargetRequest = function() {
                        this.pendingResponses += 1
                    }, t.prototype.recordTargetResponse = function() {
                        this.pendingResponses -= 1
                    }, t.prototype.markCurrent = function() {
                        this._hasPendingChanges = !0, this._current = !0
                    }, t
                }(),
                ya = function() {
                    function t(t) {
                        this.metadataProvider = t, this.targetStates = {}, this.pendingDocumentUpdates = Go(), this.pendingDocumentTargetMapping = ga(), this.pendingTargetResets = new To(si)
                    }
                    return t.prototype.handleDocumentChange = function(t) {
                        for (var e = 0, n = t.updatedTargetIds; e < n.length; e++) {
                            var r = n[e];
                            t.newDoc instanceof Ri ? this.addDocumentToTarget(r, t.newDoc) : t.newDoc instanceof Mi && this.removeDocumentFromTarget(r, t.key, t.newDoc)
                        }
                        for (var i = 0, o = t.removedTargetIds; i < o.length; i++) {
                            r = o[i];
                            this.removeDocumentFromTarget(r, t.key, t.newDoc)
                        }
                    }, t.prototype.handleTargetChange = function(n) {
                        var r = this;
                        this.forEachTarget(n, function(t) {
                            var e = r.ensureTargetState(t);
                            switch (n.state) {
                                case aa.NoChange:
                                    r.isActiveTarget(t) && e.updateResumeToken(n.resumeToken);
                                    break;
                                case aa.Added:
                                    e.recordTargetResponse(), e.isPending || e.clearPendingChanges(), e.updateResumeToken(n.resumeToken);
                                    break;
                                case aa.Removed:
                                    e.recordTargetResponse(), e.isPending || r.removeTarget(t), Mr(!n.cause, "WatchChangeAggregator does not handle errored targets");
                                    break;
                                case aa.Current:
                                    r.isActiveTarget(t) && (e.markCurrent(), e.updateResumeToken(n.resumeToken));
                                    break;
                                case aa.Reset:
                                    r.isActiveTarget(t) && (r.resetTarget(t), e.updateResumeToken(n.resumeToken));
                                    break;
                                default:
                                    Rr("Unknown target watch change state: " + n.state)
                            }
                        })
                    }, t.prototype.forEachTarget = function(t, e) {
                        0 < t.targetIds.length ? t.targetIds.forEach(e) : Vr(this.targetStates, e)
                    }, t.prototype.handleExistenceFilter = function(t) {
                        var e = t.targetId,
                            n = t.existenceFilter.count,
                            r = this.queryDataForActiveTarget(e);
                        if (r) {
                            var i = r.query;
                            if (i.isDocumentQuery())
                                if (0 === n) {
                                    var o = new Ai(i.path);
                                    this.removeDocumentFromTarget(e, o, new Mi(o, bo.forDeletedDoc()))
                                } else Mr(1 === n, "Single document existence filter with count: " + n);
                            else this.getCurrentDocumentCountForTarget(e) !== n && (this.resetTarget(e), this.pendingTargetResets = this.pendingTargetResets.add(e))
                        }
                    }, t.prototype.createRemoteEvent = function(i) {
                        var o = this,
                            a = {};
                        Vr(this.targetStates, function(t, e) {
                            var n = o.queryDataForActiveTarget(t);
                            if (n) {
                                if (e.current && n.query.isDocumentQuery()) {
                                    var r = new Ai(n.query.path);
                                    null !== o.pendingDocumentUpdates.get(r) || o.targetContainsDocument(t, r) || o.removeDocumentFromTarget(t, r, new Mi(r, i))
                                }
                                e.hasPendingChanges && (a[t] = e.toTargetChange(), e.clearPendingChanges())
                            }
                        });
                        var r = $o();
                        this.pendingDocumentTargetMapping.forEach(function(t, e) {
                            var n = !0;
                            e.forEachWhile(function(t) {
                                var e = o.queryDataForActiveTarget(t);
                                return !e || e.purpose === oo.LimboResolution || (n = !1)
                            }), n && (r = r.add(t))
                        });
                        var t = new ha(i, a, this.pendingTargetResets, this.pendingDocumentUpdates, r);
                        return this.pendingDocumentUpdates = Go(), this.pendingDocumentTargetMapping = ga(), this.pendingTargetResets = new To(si), t
                    }, t.prototype.addDocumentToTarget = function(t, e) {
                        if (this.isActiveTarget(t)) {
                            var n = this.targetContainsDocument(t, e.key) ? ea.Modified : ea.Added;
                            this.ensureTargetState(t).addDocumentChange(e.key, n), this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(e.key, e), this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(e.key, this.ensureDocumentTargetMapping(e.key).add(t))
                        }
                    }, t.prototype.removeDocumentFromTarget = function(t, e, n) {
                        if (this.isActiveTarget(t)) {
                            var r = this.ensureTargetState(t);
                            this.targetContainsDocument(t, e) ? r.addDocumentChange(e, ea.Removed) : r.removeDocumentChange(e), this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(e, this.ensureDocumentTargetMapping(e).delete(t)), n && (this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(e, n))
                        }
                    }, t.prototype.removeTarget = function(t) {
                        delete this.targetStates[t]
                    }, t.prototype.getCurrentDocumentCountForTarget = function(t) {
                        var e = this.ensureTargetState(t).toTargetChange();
                        return this.metadataProvider.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size
                    }, t.prototype.recordPendingTargetRequest = function(t) {
                        this.ensureTargetState(t).recordPendingTargetRequest()
                    }, t.prototype.ensureTargetState = function(t) {
                        return this.targetStates[t] || (this.targetStates[t] = new ma), this.targetStates[t]
                    }, t.prototype.ensureDocumentTargetMapping = function(t) {
                        var e = this.pendingDocumentTargetMapping.get(t);
                        return e || (e = new To(si), this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(t, e)), e
                    }, t.prototype.isActiveTarget = function(t) {
                        return null !== this.queryDataForActiveTarget(t)
                    }, t.prototype.queryDataForActiveTarget = function(t) {
                        var e = this.targetStates[t];
                        return e && e.isPending ? null : this.metadataProvider.getQueryDataForTarget(t)
                    }, t.prototype.resetTarget = function(e) {
                        var n = this;
                        Mr(!this.targetStates[e].isPending, "Should only reset active targets"), this.targetStates[e] = new ma, this.metadataProvider.getRemoteKeysForTarget(e).forEach(function(t) {
                            n.removeDocumentFromTarget(e, t, null)
                        })
                    }, t.prototype.targetContainsDocument = function(t, e) {
                        return this.metadataProvider.getRemoteKeysForTarget(t).has(e)
                    }, t
                }();

            function ga() {
                return new _i(Ai.comparator)
            }

            function va() {
                return new _i(Ai.comparator)
            }
            var ba, wa, Ea = ((ba = {})[po.ASCENDING.name] = "ASCENDING", ba[po.DESCENDING.name] = "DESCENDING", ba),
                Sa = ((wa = {})[co.LESS_THAN.name] = "LESS_THAN", wa[co.LESS_THAN_OR_EQUAL.name] = "LESS_THAN_OR_EQUAL", wa[co.GREATER_THAN.name] = "GREATER_THAN", wa[co.GREATER_THAN_OR_EQUAL.name] = "GREATER_THAN_OR_EQUAL", wa[co.EQUAL.name] = "EQUAL", wa[co.ARRAY_CONTAINS.name] = "ARRAY_CONTAINS", wa),
                Ta = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

            function Ia(t, e) {
                Mr(!ro(t), e + " is missing")
            }

            function Ca(t) {
                return "number" == typeof t ? t : "string" == typeof t ? Number(t) : Rr("can't parse " + t)
            }
            var Da = function() {
                function t(t, e) {
                    this.databaseId = t, this.options = e
                }
                return t.prototype.emptyByteString = function() {
                    return this.options.useProto3Json ? "" : new Uint8Array(0)
                }, t.prototype.unsafeCastProtoByteString = function(t) {
                    return t
                }, t.prototype.fromRpcStatus = function(t) {
                    var e = void 0 === t.code ? Pr.UNKNOWN : Ko(t.code);
                    return new Lr(e, t.message || "")
                }, t.prototype.toInt32Value = function(t) {
                    return ro(t) ? void 0 : {
                        value: t
                    }
                }, t.prototype.fromInt32Value = function(t) {
                    var e;
                    return ro(e = "object" == typeof t ? t.value : t) ? null : e
                }, t.prototype.toTimestamp = function(t) {
                    return {
                        seconds: t.seconds,
                        nanos: t.nanoseconds
                    }
                }, t.prototype.fromTimestamp = function(t) {
                    if ("string" == typeof t) return this.fromIso8601String(t);
                    Mr(!!t, "Cannot deserialize null or undefined timestamp.");
                    var e = Ca(t.seconds || "0"),
                        n = t.nanos || 0;
                    return new bi(e, n)
                }, t.prototype.fromIso8601String = function(t) {
                    var e = 0,
                        n = Ta.exec(t);
                    if (Mr(!!n, "invalid timestamp: " + t), n[1]) {
                        var r = n[1];
                        r = (r + "000000000").substr(0, 9), e = Number(r)
                    }
                    var i = new Date(t),
                        o = Math.floor(i.getTime() / 1e3);
                    return new bi(o, e)
                }, t.prototype.toBytes = function(t) {
                    return this.options.useProto3Json ? t.toBase64() : this.unsafeCastProtoByteString(t.toUint8Array())
                }, t.prototype.fromBlob = function(t) {
                    return "string" == typeof t ? (Mr(this.options.useProto3Json, "Expected bytes to be passed in as Uint8Array, but got a string instead."), yi.fromBase64String(t)) : (Mr(!this.options.useProto3Json, "Expected bytes to be passed in as string, but got something else instead."), yi.fromUint8Array(t))
                }, t.prototype.toVersion = function(t) {
                    return this.toTimestamp(t.toTimestamp())
                }, t.prototype.fromVersion = function(t) {
                    return Mr(!!t, "Trying to deserialize version that isn't set"), bo.fromTimestamp(this.fromTimestamp(t))
                }, t.prototype.toResourceName = function(t, e) {
                    return this.fullyQualifiedPrefixPath(t).child("documents").child(e).canonicalString()
                }, t.prototype.fromResourceName = function(t) {
                    var e = Ci.fromString(t);
                    return Mr(this.isValidResourceName(e), "Tried to deserialize invalid key " + e.toString()), e
                }, t.prototype.toName = function(t) {
                    return this.toResourceName(this.databaseId, t.path)
                }, t.prototype.fromName = function(t) {
                    var e = this.fromResourceName(t);
                    return Mr(e.get(1) === this.databaseId.projectId, "Tried to deserialize key from different project: " + e.get(1) + " vs " + this.databaseId.projectId), Mr(!e.get(3) && !this.databaseId.database || e.get(3) === this.databaseId.database, "Tried to deserialize key from different database: " + e.get(3) + " vs " + this.databaseId.database), new Ai(this.extractLocalPathFromResourceName(e))
                }, t.prototype.toQueryPath = function(t) {
                    return this.toResourceName(this.databaseId, t)
                }, t.prototype.fromQueryPath = function(t) {
                    var e = this.fromResourceName(t);
                    return 4 === e.length ? Ci.EMPTY_PATH : this.extractLocalPathFromResourceName(e)
                }, Object.defineProperty(t.prototype, "encodedDatabaseId", {
                    get: function() {
                        return new Ci(["projects", this.databaseId.projectId, "databases", this.databaseId.database]).canonicalString()
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.fullyQualifiedPrefixPath = function(t) {
                    return new Ci(["projects", t.projectId, "databases", t.database])
                }, t.prototype.extractLocalPathFromResourceName = function(t) {
                    return Mr(4 < t.length && "documents" === t.get(4), "tried to deserialize invalid key " + t.toString()), t.popFirst(5)
                }, t.prototype.isValidResourceName = function(t) {
                    return 4 <= t.length && "projects" === t.get(0) && "databases" === t.get(2)
                }, t.prototype.toValue = function(t) {
                    if (t instanceof Vi) return {
                        nullValue: "NULL_VALUE"
                    };
                    if (t instanceof Bi) return {
                        booleanValue: t.value()
                    };
                    if (t instanceof Ki) return {
                        integerValue: "" + t.value()
                    };
                    if (t instanceof ji) {
                        var e = t.value();
                        if (this.options.useProto3Json) {
                            if (isNaN(e)) return {
                                doubleValue: "NaN"
                            };
                            if (e === 1 / 0) return {
                                doubleValue: "Infinity"
                            };
                            if (e === -1 / 0) return {
                                doubleValue: "-Infinity"
                            }
                        }
                        return {
                            doubleValue: t.value()
                        }
                    }
                    return t instanceof Gi ? {
                        stringValue: t.value()
                    } : t instanceof Ji ? {
                        mapValue: this.toMapValue(t)
                    } : t instanceof $i ? {
                        arrayValue: this.toArrayValue(t)
                    } : t instanceof Wi ? {
                        timestampValue: this.toTimestamp(t.internalValue)
                    } : t instanceof Xi ? {
                        geoPointValue: {
                            latitude: t.value().latitude,
                            longitude: t.value().longitude
                        }
                    } : t instanceof Hi ? {
                        bytesValue: this.toBytes(t.value())
                    } : t instanceof Yi ? {
                        referenceValue: this.toResourceName(t.databaseId, t.key.path)
                    } : Rr("Unknown FieldValue " + JSON.stringify(t))
                }, t.prototype.fromValue = function(t) {
                    var e = this,
                        n = t.value_type;
                    if (Na(t, n, "nullValue")) return Vi.INSTANCE;
                    if (Na(t, n, "booleanValue")) return Bi.of(t.booleanValue);
                    if (Na(t, n, "integerValue")) return new Ki(Ca(t.integerValue));
                    if (Na(t, n, "doubleValue")) {
                        if (this.options.useProto3Json) {
                            if ("NaN" === t.doubleValue) return ji.NAN;
                            if ("Infinity" === t.doubleValue) return ji.POSITIVE_INFINITY;
                            if ("-Infinity" === t.doubleValue) return ji.NEGATIVE_INFINITY
                        }
                        return new ji(t.doubleValue)
                    }
                    if (Na(t, n, "stringValue")) return new Gi(t.stringValue);
                    if (Na(t, n, "mapValue")) return this.fromFields(t.mapValue.fields || {});
                    if (Na(t, n, "arrayValue")) {
                        Ia(t.arrayValue, "arrayValue");
                        var r = t.arrayValue.values || [];
                        return new $i(r.map(function(t) {
                            return e.fromValue(t)
                        }))
                    }
                    if (Na(t, n, "timestampValue")) return Ia(t.timestampValue, "timestampValue"), new Wi(this.fromTimestamp(t.timestampValue));
                    if (Na(t, n, "geoPointValue")) {
                        Ia(t.geoPointValue, "geoPointValue");
                        var i = t.geoPointValue.latitude || 0,
                            o = t.geoPointValue.longitude || 0;
                        return new Xi(new vi(i, o))
                    }
                    if (Na(t, n, "bytesValue")) {
                        Ia(t.bytesValue, "bytesValue");
                        var a = this.fromBlob(t.bytesValue);
                        return new Hi(a)
                    }
                    if (Na(t, n, "referenceValue")) {
                        Ia(t.referenceValue, "referenceValue");
                        var s = this.fromResourceName(t.referenceValue),
                            u = new Si(s.get(1), s.get(3)),
                            c = new Ai(this.extractLocalPathFromResourceName(s));
                        return new Yi(u, c)
                    }
                    return Rr("Unknown Value proto " + JSON.stringify(t))
                }, t.prototype.toMutationDocument = function(t, e) {
                    return {
                        name: this.toName(t),
                        fields: this.toFields(e)
                    }
                }, t.prototype.toDocument = function(t) {
                    return Mr(!t.hasLocalMutations, "Can't serialize documents with mutations."), {
                        name: this.toName(t.key),
                        fields: this.toFields(t.data),
                        updateTime: this.toTimestamp(t.version.toTimestamp())
                    }
                }, t.prototype.fromDocument = function(t, e) {
                    return new Ri(this.fromName(t.name), this.fromVersion(t.updateTime), this.fromFields(t.fields || {}), {
                        hasCommittedMutations: !!e
                    })
                }, t.prototype.toFields = function(t) {
                    var n = this,
                        r = {};
                    return t.forEach(function(t, e) {
                        r[t] = n.toValue(e)
                    }), r
                }, t.prototype.fromFields = function(t) {
                    var n = this,
                        e = t,
                        r = Ji.EMPTY;
                    return Br(e, function(t, e) {
                        r = r.set(new Ni([t]), n.fromValue(e))
                    }), r
                }, t.prototype.toMapValue = function(t) {
                    return {
                        fields: this.toFields(t)
                    }
                }, t.prototype.toArrayValue = function(t) {
                    var e = this,
                        n = [];
                    return t.forEach(function(t) {
                        n.push(e.toValue(t))
                    }), {
                        values: n
                    }
                }, t.prototype.fromFound = function(t) {
                    Mr(!!t.found, "Tried to deserialize a found document from a missing document."), Ia(t.found.name, "doc.found.name"), Ia(t.found.updateTime, "doc.found.updateTime");
                    var e = this.fromName(t.found.name),
                        n = this.fromVersion(t.found.updateTime),
                        r = this.fromFields(t.found.fields || {});
                    return new Ri(e, n, r, {}, t.found)
                }, t.prototype.fromMissing = function(t) {
                    Mr(!!t.missing, "Tried to deserialize a missing document from a found document."), Mr(!!t.readTime, "Tried to deserialize a missing document without a read time.");
                    var e = this.fromName(t.missing),
                        n = this.fromVersion(t.readTime);
                    return new Mi(e, n)
                }, t.prototype.fromMaybeDocument = function(t) {
                    var e = t.result;
                    return Na(t, e, "found") ? this.fromFound(t) : Na(t, e, "missing") ? this.fromMissing(t) : Rr("invalid batch get response: " + JSON.stringify(t))
                }, t.prototype.toWatchTargetChangeState = function(t) {
                    switch (t) {
                        case aa.Added:
                            return "ADD";
                        case aa.Current:
                            return "CURRENT";
                        case aa.NoChange:
                            return "NO_CHANGE";
                        case aa.Removed:
                            return "REMOVE";
                        case aa.Reset:
                            return "RESET";
                        default:
                            return Rr("Unknown WatchTargetChangeState: " + t)
                    }
                }, t.prototype.toTestWatchChange = function(t) {
                    if (t instanceof pa) return {
                        filter: {
                            count: t.existenceFilter.count,
                            targetId: t.targetId
                        }
                    };
                    if (t instanceof fa) {
                        if (t.newDoc instanceof Ri) {
                            var e = t.newDoc;
                            return {
                                documentChange: {
                                    document: {
                                        name: this.toName(e.key),
                                        fields: this.toFields(e.data),
                                        updateTime: this.toVersion(e.version)
                                    },
                                    targetIds: t.updatedTargetIds,
                                    removedTargetIds: t.removedTargetIds
                                }
                            }
                        }
                        if (t.newDoc instanceof Mi) {
                            e = t.newDoc;
                            return {
                                documentDelete: {
                                    document: this.toName(e.key),
                                    readTime: this.toVersion(e.version),
                                    removedTargetIds: t.removedTargetIds
                                }
                            }
                        }
                        if (null === t.newDoc) return {
                            documentRemove: {
                                document: this.toName(t.key),
                                removedTargetIds: t.removedTargetIds
                            }
                        }
                    }
                    if (t instanceof da) {
                        var n = void 0;
                        return t.cause && (n = {
                            code: function(t) {
                                if (void 0 === t) return Vo.OK;
                                switch (t) {
                                    case Pr.OK:
                                        return Vo.OK;
                                    case Pr.CANCELLED:
                                        return Vo.CANCELLED;
                                    case Pr.UNKNOWN:
                                        return Vo.UNKNOWN;
                                    case Pr.DEADLINE_EXCEEDED:
                                        return Vo.DEADLINE_EXCEEDED;
                                    case Pr.RESOURCE_EXHAUSTED:
                                        return Vo.RESOURCE_EXHAUSTED;
                                    case Pr.INTERNAL:
                                        return Vo.INTERNAL;
                                    case Pr.UNAVAILABLE:
                                        return Vo.UNAVAILABLE;
                                    case Pr.UNAUTHENTICATED:
                                        return Vo.UNAUTHENTICATED;
                                    case Pr.INVALID_ARGUMENT:
                                        return Vo.INVALID_ARGUMENT;
                                    case Pr.NOT_FOUND:
                                        return Vo.NOT_FOUND;
                                    case Pr.ALREADY_EXISTS:
                                        return Vo.ALREADY_EXISTS;
                                    case Pr.PERMISSION_DENIED:
                                        return Vo.PERMISSION_DENIED;
                                    case Pr.FAILED_PRECONDITION:
                                        return Vo.FAILED_PRECONDITION;
                                    case Pr.ABORTED:
                                        return Vo.ABORTED;
                                    case Pr.OUT_OF_RANGE:
                                        return Vo.OUT_OF_RANGE;
                                    case Pr.UNIMPLEMENTED:
                                        return Vo.UNIMPLEMENTED;
                                    case Pr.DATA_LOSS:
                                        return Vo.DATA_LOSS;
                                    default:
                                        return Rr("Unknown status code: " + t)
                                }
                            }(t.cause.code),
                            message: t.cause.message
                        }), {
                            targetChange: {
                                targetChangeType: this.toWatchTargetChangeState(t.state),
                                targetIds: t.targetIds,
                                resumeToken: this.unsafeCastProtoByteString(t.resumeToken),
                                cause: n
                            }
                        }
                    }
                    return Rr("Unrecognized watch change: " + JSON.stringify(t))
                }, t.prototype.fromWatchChange = function(t) {
                    var e, n = t.response_type;
                    if (Na(t, n, "targetChange")) {
                        Ia(t.targetChange, "targetChange");
                        var r = this.fromWatchTargetChangeState(t.targetChange.targetChangeType || "NO_CHANGE"),
                            i = t.targetChange.targetIds || [],
                            o = t.targetChange.resumeToken || this.emptyByteString(),
                            a = t.targetChange.cause,
                            s = a && this.fromRpcStatus(a);
                        e = new da(r, i, o, s || null)
                    } else if (Na(t, n, "documentChange")) {
                        Ia(t.documentChange, "documentChange"), Ia(t.documentChange.document, "documentChange.name"), Ia(t.documentChange.document.name, "documentChange.document.name"), Ia(t.documentChange.document.updateTime, "documentChange.document.updateTime");
                        var u = t.documentChange,
                            c = this.fromName(u.document.name),
                            h = this.fromVersion(u.document.updateTime),
                            l = this.fromFields(u.document.fields || {}),
                            f = new Ri(c, h, l, {}, u.document),
                            p = u.targetIds || [],
                            d = u.removedTargetIds || [];
                        e = new fa(p, d, f.key, f)
                    } else if (Na(t, n, "documentDelete")) {
                        Ia(t.documentDelete, "documentDelete"), Ia(t.documentDelete.document, "documentDelete.document");
                        var m = t.documentDelete;
                        c = this.fromName(m.document), h = m.readTime ? this.fromVersion(m.readTime) : bo.forDeletedDoc(), f = new Mi(c, h), d = m.removedTargetIds || [];
                        e = new fa([], d, f.key, f)
                    } else if (Na(t, n, "documentRemove")) {
                        Ia(t.documentRemove, "documentRemove"), Ia(t.documentRemove.document, "documentRemove");
                        var y = t.documentRemove;
                        c = this.fromName(y.document), d = y.removedTargetIds || [];
                        e = new fa([], d, c, null)
                    } else {
                        if (!Na(t, n, "filter")) return Rr("Unknown change type " + JSON.stringify(t));
                        Ia(t.filter, "filter"), Ia(t.filter.targetId, "filter.targetId");
                        var g = t.filter,
                            v = g.count || 0,
                            b = new Uo(v),
                            w = g.targetId;
                        e = new pa(w, b)
                    }
                    return e
                }, t.prototype.fromWatchTargetChangeState = function(t) {
                    return "NO_CHANGE" === t ? aa.NoChange : "ADD" === t ? aa.Added : "REMOVE" === t ? aa.Removed : "CURRENT" === t ? aa.Current : "RESET" === t ? aa.Reset : Rr("Got unexpected TargetChange.state: " + t)
                }, t.prototype.versionFromListenResponse = function(t) {
                    if (!Na(t, t.response_type, "targetChange")) return bo.MIN;
                    var e = t.targetChange;
                    return e.targetIds && e.targetIds.length ? bo.MIN : e.readTime ? this.fromVersion(e.readTime) : bo.MIN
                }, t.prototype.toMutation = function(t) {
                    var e, n = this;
                    if (t instanceof Ro) e = {
                        update: this.toMutationDocument(t.key, t.value)
                    };
                    else if (t instanceof _o) e = {
                        delete: this.toName(t.key)
                    };
                    else if (t instanceof Mo) e = {
                        update: this.toMutationDocument(t.key, t.data),
                        updateMask: this.toDocumentMask(t.fieldMask)
                    };
                    else {
                        if (!(t instanceof Oo)) return Rr("Unknown mutation type " + t.type);
                        e = {
                            transform: {
                                document: this.toName(t.key),
                                fieldTransforms: t.fieldTransforms.map(function(t) {
                                    return n.toFieldTransform(t)
                                })
                            }
                        }
                    }
                    return t.precondition.isNone || (e.currentDocument = this.toPrecondition(t.precondition)), e
                }, t.prototype.fromMutation = function(t) {
                    var e = this,
                        n = t.currentDocument ? this.fromPrecondition(t.currentDocument) : Ao.NONE;
                    if (t.update) {
                        Ia(t.update.name, "name");
                        var r = this.fromName(t.update.name),
                            i = this.fromFields(t.update.fields || {});
                        if (t.updateMask) {
                            var o = this.fromDocumentMask(t.updateMask);
                            return new Mo(r, i, o, n)
                        }
                        return new Ro(r, i, n)
                    }
                    if (t.delete) {
                        r = this.fromName(t.delete);
                        return new _o(r, n)
                    }
                    if (t.transform) {
                        r = this.fromName(t.transform.document);
                        var a = t.transform.fieldTransforms.map(function(t) {
                            return e.fromFieldTransform(t)
                        });
                        return Mr(!0 === n.exists, 'Transforms only support precondition "exists == true"'), new Oo(r, a)
                    }
                    return Rr("unknown mutation proto: " + JSON.stringify(t))
                }, t.prototype.toPrecondition = function(t) {
                    return Mr(!t.isNone, "Can't serialize an empty precondition"), void 0 !== t.updateTime ? {
                        updateTime: this.toVersion(t.updateTime)
                    } : void 0 !== t.exists ? {
                        exists: t.exists
                    } : Rr("Unknown precondition")
                }, t.prototype.fromPrecondition = function(t) {
                    return void 0 !== t.updateTime ? Ao.updateTime(this.fromVersion(t.updateTime)) : void 0 !== t.exists ? Ao.exists(t.exists) : Ao.NONE
                }, t.prototype.fromWriteResult = function(t, e) {
                    var n = this,
                        r = t.updateTime ? this.fromVersion(t.updateTime) : this.fromVersion(e),
                        i = null;
                    return t.transformResults && 0 < t.transformResults.length && (i = t.transformResults.map(function(t) {
                        return n.fromValue(t)
                    })), new No(r, i)
                }, t.prototype.fromWriteResults = function(t, e) {
                    var n = this;
                    return t && 0 < t.length ? (Mr(void 0 !== e, "Received a write result without a commit time"), t.map(function(t) {
                        return n.fromWriteResult(t, e)
                    })) : []
                }, t.prototype.toFieldTransform = function(t) {
                    var e = this,
                        n = t.transform;
                    if (n instanceof Po) return {
                        fieldPath: t.field.canonicalString(),
                        setToServerValue: "REQUEST_TIME"
                    };
                    if (n instanceof Lo) return {
                        fieldPath: t.field.canonicalString(),
                        appendMissingElements: {
                            values: n.elements.map(function(t) {
                                return e.toValue(t)
                            })
                        }
                    };
                    if (n instanceof xo) return {
                        fieldPath: t.field.canonicalString(),
                        removeAllFromArray: {
                            values: n.elements.map(function(t) {
                                return e.toValue(t)
                            })
                        }
                    };
                    if (n instanceof qo) return {
                        fieldPath: t.field.canonicalString(),
                        increment: this.toValue(n.operand)
                    };
                    throw Rr("Unknown transform: " + t.transform)
                }, t.prototype.fromFieldTransform = function(t) {
                    var e = this,
                        n = t.transform_type,
                        r = null;
                    if (Na(t, n, "setToServerValue")) Mr("REQUEST_TIME" === t.setToServerValue, "Unknown server value transform proto: " + JSON.stringify(t)), r = Po.instance;
                    else if (Na(t, n, "appendMissingElements")) {
                        var i = t.appendMissingElements.values || [];
                        r = new Lo(i.map(function(t) {
                            return e.fromValue(t)
                        }))
                    } else if (Na(t, n, "removeAllFromArray")) {
                        i = t.removeAllFromArray.values || [];
                        r = new xo(i.map(function(t) {
                            return e.fromValue(t)
                        }))
                    } else if (Na(t, n, "increment")) {
                        var o = this.fromValue(t.increment);
                        Mr(o instanceof Ui, "NUMERIC_ADD transform requires a NumberValue"), r = new qo(o)
                    } else Rr("Unknown transform proto: " + JSON.stringify(t));
                    var a = Ni.fromServerFormat(t.fieldPath);
                    return new Do(a, r)
                }, t.prototype.toDocumentsTarget = function(t) {
                    return {
                        documents: [this.toQueryPath(t.path)]
                    }
                }, t.prototype.fromDocumentsTarget = function(t) {
                    var e = t.documents.length;
                    Mr(1 === e, "DocumentsTarget contained other than 1 document: " + e);
                    var n = t.documents[0];
                    return so.atPath(this.fromQueryPath(n))
                }, t.prototype.toQueryTarget = function(t) {
                    var e = {
                            structuredQuery: {}
                        },
                        n = t.path;
                    null !== t.collectionGroup ? (Mr(n.length % 2 == 0, "Collection Group queries should be within a document path or root."), e.parent = this.toQueryPath(n), e.structuredQuery.from = [{
                        collectionId: t.collectionGroup,
                        allDescendants: !0
                    }]) : (Mr(n.length % 2 != 0, "Document queries with filters are not supported."), e.parent = this.toQueryPath(n.popLast()), e.structuredQuery.from = [{
                        collectionId: n.lastSegment()
                    }]);
                    var r = this.toFilter(t.filters);
                    r && (e.structuredQuery.where = r);
                    var i = this.toOrder(t.orderBy);
                    i && (e.structuredQuery.orderBy = i);
                    var o = this.toInt32Value(t.limit);
                    return void 0 !== o && (e.structuredQuery.limit = o), t.startAt && (e.structuredQuery.startAt = this.toCursor(t.startAt)), t.endAt && (e.structuredQuery.endAt = this.toCursor(t.endAt)), e
                }, t.prototype.fromQueryTarget = function(t) {
                    var e = this.fromQueryPath(t.parent),
                        n = t.structuredQuery,
                        r = n.from ? n.from.length : 0,
                        i = null;
                    if (0 < r) {
                        Mr(1 === r, "StructuredQuery.from with more than one collection is not supported.");
                        var o = n.from[0];
                        o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId)
                    }
                    var a = [];
                    n.where && (a = this.fromFilter(n.where));
                    var s = [];
                    n.orderBy && (s = this.fromOrder(n.orderBy));
                    var u = null;
                    n.limit && (u = this.fromInt32Value(n.limit));
                    var c = null;
                    n.startAt && (c = this.fromCursor(n.startAt));
                    var h = null;
                    return n.endAt && (h = this.fromCursor(n.endAt)), new so(e, i, s, a, u, c, h)
                }, t.prototype.toListenRequestLabels = function(t) {
                    var e = this.toLabel(t.purpose);
                    return null == e ? null : {
                        "goog-listen-tags": e
                    }
                }, t.prototype.toLabel = function(t) {
                    switch (t) {
                        case oo.Listen:
                            return null;
                        case oo.ExistenceFilterMismatch:
                            return "existence-filter-mismatch";
                        case oo.LimboResolution:
                            return "limbo-document";
                        default:
                            return Rr("Unrecognized query purpose: " + t)
                    }
                }, t.prototype.toTarget = function(t) {
                    var e, n = t.query;
                    return (e = n.isDocumentQuery() ? {
                        documents: this.toDocumentsTarget(n)
                    } : {
                        query: this.toQueryTarget(n)
                    }).targetId = t.targetId, 0 < t.resumeToken.length && (e.resumeToken = this.unsafeCastProtoByteString(t.resumeToken)), e
                }, t.prototype.toFilter = function(t) {
                    var e = this;
                    if (0 !== t.length) {
                        var n = t.map(function(t) {
                            return t instanceof ho ? e.toRelationFilter(t) : e.toUnaryFilter(t)
                        });
                        return 1 === n.length ? n[0] : {
                            compositeFilter: {
                                op: "AND",
                                filters: n
                            }
                        }
                    }
                }, t.prototype.fromFilter = function(t) {
                    var e = this;
                    return t ? void 0 !== t.unaryFilter ? [this.fromUnaryFilter(t)] : void 0 !== t.fieldFilter ? [this.fromRelationFilter(t)] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map(function(t) {
                        return e.fromFilter(t)
                    }).reduce(function(t, e) {
                        return t.concat(e)
                    }) : Rr("Unknown filter: " + JSON.stringify(t)) : []
                }, t.prototype.toOrder = function(t) {
                    var e = this;
                    if (0 !== t.length) return t.map(function(t) {
                        return e.toPropertyOrder(t)
                    })
                }, t.prototype.fromOrder = function(t) {
                    var e = this;
                    return t.map(function(t) {
                        return e.fromPropertyOrder(t)
                    })
                }, t.prototype.toCursor = function(t) {
                    var e = this;
                    return {
                        before: t.before,
                        values: t.position.map(function(t) {
                            return e.toValue(t)
                        })
                    }
                }, t.prototype.fromCursor = function(t) {
                    var e = this,
                        n = !!t.before,
                        r = t.values.map(function(t) {
                            return e.fromValue(t)
                        });
                    return new mo(r, n)
                }, t.prototype.toDirection = function(t) {
                    return Ea[t.name]
                }, t.prototype.fromDirection = function(t) {
                    switch (t) {
                        case "ASCENDING":
                            return po.ASCENDING;
                        case "DESCENDING":
                            return po.DESCENDING;
                        default:
                            return
                    }
                }, t.prototype.toOperatorName = function(t) {
                    return Sa[t.name]
                }, t.prototype.fromOperatorName = function(t) {
                    switch (t) {
                        case "EQUAL":
                            return co.EQUAL;
                        case "GREATER_THAN":
                            return co.GREATER_THAN;
                        case "GREATER_THAN_OR_EQUAL":
                            return co.GREATER_THAN_OR_EQUAL;
                        case "LESS_THAN":
                            return co.LESS_THAN;
                        case "LESS_THAN_OR_EQUAL":
                            return co.LESS_THAN_OR_EQUAL;
                        case "ARRAY_CONTAINS":
                            return co.ARRAY_CONTAINS;
                        case "OPERATOR_UNSPECIFIED":
                            return Rr("Unspecified relation");
                        default:
                            return Rr("Unknown relation")
                    }
                }, t.prototype.toFieldPathReference = function(t) {
                    return {
                        fieldPath: t.canonicalString()
                    }
                }, t.prototype.fromFieldPathReference = function(t) {
                    return Ni.fromServerFormat(t.fieldPath)
                }, t.prototype.toPropertyOrder = function(t) {
                    return {
                        field: this.toFieldPathReference(t.field),
                        direction: this.toDirection(t.dir)
                    }
                }, t.prototype.fromPropertyOrder = function(t) {
                    return new yo(this.fromFieldPathReference(t.field), this.fromDirection(t.direction))
                }, t.prototype.toRelationFilter = function(t) {
                    return t instanceof ho ? {
                        fieldFilter: {
                            field: this.toFieldPathReference(t.field),
                            op: this.toOperatorName(t.op),
                            value: this.toValue(t.value)
                        }
                    } : Rr("Unrecognized filter: " + JSON.stringify(t))
                }, t.prototype.fromRelationFilter = function(t) {
                    return new ho(this.fromFieldPathReference(t.fieldFilter.field), this.fromOperatorName(t.fieldFilter.op), this.fromValue(t.fieldFilter.value))
                }, t.prototype.toUnaryFilter = function(t) {
                    return t instanceof fo ? {
                        unaryFilter: {
                            field: this.toFieldPathReference(t.field),
                            op: "IS_NAN"
                        }
                    } : t instanceof lo ? {
                        unaryFilter: {
                            field: this.toFieldPathReference(t.field),
                            op: "IS_NULL"
                        }
                    } : Rr("Unrecognized filter: " + JSON.stringify(t))
                }, t.prototype.fromUnaryFilter = function(t) {
                    switch (t.unaryFilter.op) {
                        case "IS_NAN":
                            var e = this.fromFieldPathReference(t.unaryFilter.field);
                            return new fo(e);
                        case "IS_NULL":
                            var n = this.fromFieldPathReference(t.unaryFilter.field);
                            return new lo(n);
                        case "OPERATOR_UNSPECIFIED":
                            return Rr("Unspecified filter");
                        default:
                            return Rr("Unknown filter")
                    }
                }, t.prototype.toDocumentMask = function(t) {
                    var e = [];
                    return t.fields.forEach(function(t) {
                        return e.push(t.canonicalString())
                    }), {
                        fieldPaths: e
                    }
                }, t.prototype.fromDocumentMask = function(t) {
                    var e = (t.fieldPaths || []).map(function(t) {
                        return Ni.fromServerFormat(t)
                    });
                    return Co.fromArray(e)
                }, t
            }();

            function Na(t, e, n) {
                return e === n || !e && n in t
            }
            var Aa = function() {
                    function t(t) {
                        this.sendFn = t.sendFn, this.closeFn = t.closeFn
                    }
                    return t.prototype.onOpen = function(t) {
                        Mr(!this.wrappedOnOpen, "Called onOpen on stream twice!"), this.wrappedOnOpen = t
                    }, t.prototype.onClose = function(t) {
                        Mr(!this.wrappedOnClose, "Called onClose on stream twice!"), this.wrappedOnClose = t
                    }, t.prototype.onMessage = function(t) {
                        Mr(!this.wrappedOnMessage, "Called onMessage on stream twice!"), this.wrappedOnMessage = t
                    }, t.prototype.close = function() {
                        this.closeFn()
                    }, t.prototype.send = function(t) {
                        this.sendFn(t)
                    }, t.prototype.callOnOpen = function() {
                        Mr(void 0 !== this.wrappedOnOpen, "Cannot call onOpen because no callback was set"), this.wrappedOnOpen()
                    }, t.prototype.callOnClose = function(t) {
                        Mr(void 0 !== this.wrappedOnClose, "Cannot call onClose because no callback was set"), this.wrappedOnClose(t)
                    }, t.prototype.callOnMessage = function(t) {
                        Mr(void 0 !== this.wrappedOnMessage, "Cannot call onMessage because no callback was set"), this.wrappedOnMessage(t)
                    }, t
                }(),
                ka = "Connection",
                Ra = {
                    BatchGetDocuments: "batchGet",
                    Commit: "commit"
                },
                Ma = "gl-js/ fire/" + Tr,
                Oa = function() {
                    function t(t) {
                        this.databaseId = t.databaseId;
                        var e = t.ssl ? "https" : "http";
                        this.baseUrl = e + "://" + t.host, this.forceLongPolling = t.forceLongPolling
                    }
                    return t.prototype.modifyHeadersForRequest = function(t, e) {
                        if (e)
                            for (var n in e.authHeaders) e.authHeaders.hasOwnProperty(n) && (t[n] = e.authHeaders[n]);
                        t["X-Goog-Api-Client"] = Ma
                    }, t.prototype.invokeRPC = function(o, a, s) {
                        var u = this,
                            c = this.makeUrl(o);
                        return new Promise(function(n, r) {
                            var i = new gr;
                            i.listenOnce(mr.COMPLETE, function() {
                                try {
                                    switch (i.getLastErrorCode()) {
                                        case dr.NO_ERROR:
                                            var t = i.getResponseJson();
                                            Nr(ka, "XHR received:", JSON.stringify(t)), n(t);
                                            break;
                                        case dr.TIMEOUT:
                                            Nr(ka, 'RPC "' + o + '" timed out'), r(new Lr(Pr.DEADLINE_EXCEEDED, "Request time out"));
                                            break;
                                        case dr.HTTP_ERROR:
                                            var e = i.getStatus();
                                            Nr(ka, 'RPC "' + o + '" failed with status:', e, "response text:", i.getResponseText()), 0 < e ? r(new Lr(function(t) {
                                                switch (t) {
                                                    case 200:
                                                        return Pr.OK;
                                                    case 400:
                                                        return Pr.INVALID_ARGUMENT;
                                                    case 401:
                                                        return Pr.UNAUTHENTICATED;
                                                    case 403:
                                                        return Pr.PERMISSION_DENIED;
                                                    case 404:
                                                        return Pr.NOT_FOUND;
                                                    case 409:
                                                        return Pr.ABORTED;
                                                    case 416:
                                                        return Pr.OUT_OF_RANGE;
                                                    case 429:
                                                        return Pr.RESOURCE_EXHAUSTED;
                                                    case 499:
                                                        return Pr.CANCELLED;
                                                    case 500:
                                                        return Pr.UNKNOWN;
                                                    case 501:
                                                        return Pr.UNIMPLEMENTED;
                                                    case 503:
                                                        return Pr.UNAVAILABLE;
                                                    case 504:
                                                        return Pr.DEADLINE_EXCEEDED;
                                                    default:
                                                        return 200 <= t && t < 300 ? Pr.OK : 400 <= t && t < 500 ? Pr.FAILED_PRECONDITION : 500 <= t && t < 600 ? Pr.INTERNAL : Pr.UNKNOWN
                                                }
                                            }(e), "Server responded with status " + i.getStatusText())) : (Nr(ka, 'RPC "' + o + '" failed'), r(new Lr(Pr.UNAVAILABLE, "Connection failed.")));
                                            break;
                                        default:
                                            Rr('RPC "' + o + '" failed with unanticipated webchannel error ' + i.getLastErrorCode() + ": " + i.getLastError() + ", giving up.")
                                    }
                                } finally {
                                    Nr(ka, 'RPC "' + o + '" completed.')
                                }
                            });
                            var t = JSON.stringify(a);
                            Nr(ka, "XHR sending: ", c + " " + t);
                            var e = {
                                "Content-Type": "text/plain"
                            };
                            u.modifyHeadersForRequest(e, s), i.send(c, "POST", t, e, 15)
                        })
                    }, t.prototype.invokeStreamingRPC = function(t, e, n) {
                        return this.invokeRPC(t, e, n)
                    }, t.prototype.openStream = function(t, e) {
                        var n = [this.baseUrl, "/", "google.firestore.v1.Firestore", "/", t, "/channel"],
                            r = pr(),
                            i = {
                                backgroundChannelTest: !0,
                                httpSessionIdParam: "gsessionid",
                                initMessageHeaders: {},
                                messageUrlParams: {
                                    database: "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database
                                },
                                sendRawJson: !0,
                                supportsCrossDomainXhr: !0,
                                internalChannelParams: {
                                    forwardChannelRequestTimeoutMs: 6e5
                                },
                                forceLongPolling: this.forceLongPolling
                            };
                        this.modifyHeadersForRequest(i.initMessageHeaders, e), "object" == typeof navigator && "ReactNative" === navigator.product || (i.httpHeadersOverwriteParam = "$httpHeaders");
                        var o = n.join("");
                        Nr(ka, "Creating WebChannel: " + o + " " + i);
                        var a = r.createWebChannel(o, i),
                            s = !1,
                            u = !1,
                            c = new Aa({
                                sendFn: function(t) {
                                    u ? Nr(ka, "Not sending because WebChannel is closed:", t) : (s || (Nr(ka, "Opening WebChannel transport."), a.open(), s = !0), Nr(ka, "WebChannel sending:", t), a.send(t))
                                },
                                closeFn: function() {
                                    return a.close()
                                }
                            }),
                            h = function(t, e) {
                                a.listen(t, function(t) {
                                    try {
                                        e(t)
                                    } catch (t) {
                                        setTimeout(function() {
                                            throw t
                                        }, 0)
                                    }
                                })
                            };
                        return h(yr.EventType.OPEN, function() {
                            u || Nr(ka, "WebChannel transport opened.")
                        }), h(yr.EventType.CLOSE, function() {
                            u || (u = !0, Nr(ka, "WebChannel transport closed"), c.callOnClose())
                        }), h(yr.EventType.ERROR, function(t) {
                            u || (u = !0, Nr(ka, "WebChannel transport errored:", t), c.callOnClose(new Lr(Pr.UNAVAILABLE, "The operation could not be completed")))
                        }), h(yr.EventType.MESSAGE, function(t) {
                            if (!u) {
                                var e = t.data[0];
                                Mr(!!e, "Got a webchannel message without data.");
                                var n = e.error || e[0] && e[0].error;
                                if (n) {
                                    Nr(ka, "WebChannel received error:", n);
                                    var r = n.status,
                                        i = function(t) {
                                            var e = Vo[t];
                                            if (void 0 !== e) return Ko(e)
                                        }(r),
                                        o = n.message;
                                    void 0 === i && (i = Pr.INTERNAL, o = "Unknown error status: " + r + " with message " + n.message), u = !0, c.callOnClose(new Lr(i, o)), a.close()
                                } else Nr(ka, "WebChannel received:", e), c.callOnMessage(e)
                            }
                        }), setTimeout(function() {
                            c.callOnOpen()
                        }, 0), c
                    }, t.prototype.makeUrl = function(t) {
                        var e = Ra[t];
                        Mr(void 0 !== e, "Unknown REST mapping for: " + t);
                        var n = [this.baseUrl, "/", "v1"];
                        return n.push("/projects/"), n.push(this.databaseId.projectId), n.push("/databases/"), n.push(this.databaseId.database), n.push("/documents"), n.push(":"), n.push(e), n.join("")
                    }, t
                }(),
                _a = function() {
                    function t() {
                        this.emptyByteString = "", this.base64Available = "undefined" != typeof atob
                    }
                    return Object.defineProperty(t.prototype, "document", {
                        get: function() {
                            return "undefined" != typeof document ? document : null
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "window", {
                        get: function() {
                            return "undefined" != typeof window ? window : null
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.loadConnection = function(t) {
                        return Promise.resolve(new Oa(t))
                    }, t.prototype.newSerializer = function(t) {
                        return new Da(t, {
                            useProto3Json: !0
                        })
                    }, t.prototype.formatJSON = function(t) {
                        return JSON.stringify(t)
                    }, t.prototype.atob = function(t) {
                        return atob(t)
                    }, t.prototype.btoa = function(t) {
                        return btoa(t)
                    }, t
                }();
            Or.setPlatform(new _a);
            var Pa, La, xa = function() {
                    function t(t, e) {
                        var n = this;
                        this.previousValue = t, e && (e.sequenceNumberHandler = function(t) {
                            return n.setPreviousValue(t)
                        }, this.writeNewSequenceNumber = function(t) {
                            return e.writeSequenceNumber(t)
                        })
                    }
                    return t.prototype.setPreviousValue = function(t) {
                        return this.previousValue = Math.max(t, this.previousValue), this.previousValue
                    }, t.prototype.next = function() {
                        var t = ++this.previousValue;
                        return this.writeNewSequenceNumber && this.writeNewSequenceNumber(t), t
                    }, t.INVALID = -1, t
                }(),
                qa = function() {
                    var n = this;
                    this.promise = new Promise(function(t, e) {
                        n.resolve = t, n.reject = e
                    })
                };
            (La = Pa || (Pa = {})).All = "all", La.ListenStreamIdle = "listen_stream_idle", La.ListenStreamConnectionBackoff = "listen_stream_connection_backoff", La.WriteStreamIdle = "write_stream_idle", La.WriteStreamConnectionBackoff = "write_stream_connection_backoff", La.OnlineStateTimeout = "online_state_timeout", La.ClientMetadataRefresh = "client_metadata_refresh", La.LruGarbageCollection = "lru_garbage_collection";
            var Fa = function() {
                    function a(t, e, n, r, i) {
                        this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new qa, this.then = this.deferred.promise.then.bind(this.deferred.promise), this.catch = this.deferred.promise.catch.bind(this.deferred.promise), this.deferred.promise.catch(function(t) {})
                    }
                    return a.createAndSchedule = function(t, e, n, r, i) {
                        var o = new a(t, e, Date.now() + n, r, i);
                        return o.start(n), o
                    }, a.prototype.start = function(t) {
                        var e = this;
                        this.timerHandle = setTimeout(function() {
                            return e.handleDelayElapsed()
                        }, t)
                    }, a.prototype.skipDelay = function() {
                        return this.handleDelayElapsed()
                    }, a.prototype.cancel = function(t) {
                        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new Lr(Pr.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))))
                    }, a.prototype.handleDelayElapsed = function() {
                        var e = this;
                        this.asyncQueue.enqueueAndForget(function() {
                            return null !== e.timerHandle ? (e.clearTimeout(), e.op().then(function(t) {
                                return e.deferred.resolve(t)
                            })) : Promise.resolve()
                        })
                    }, a.prototype.clearTimeout = function() {
                        null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null)
                    }, a
                }(),
                Va = function() {
                    function t() {
                        this.tail = Promise.resolve(), this.delayedOperations = [], this.operationInProgress = !1
                    }
                    return t.prototype.enqueueAndForget = function(t) {
                        this.enqueue(t)
                    }, t.prototype.enqueue = function(t) {
                        var n = this;
                        this.verifyNotFailed();
                        var e = this.tail.then(function() {
                            return n.operationInProgress = !0, t().catch(function(t) {
                                n.failure = t, n.operationInProgress = !1;
                                var e = t.stack || t.message || "";
                                throw Ar("INTERNAL UNHANDLED ERROR: ", e), e.indexOf("Firestore Test Simulated Error") < 0 && setTimeout(function() {
                                    throw t
                                }, 0), t
                            }).then(function(t) {
                                return n.operationInProgress = !1, t
                            })
                        });
                        return this.tail = e
                    }, t.prototype.enqueueAfterDelay = function(t, e, n) {
                        var r = this;
                        this.verifyNotFailed(), Mr(0 <= e, "Attempted to schedule an operation with a negative delay of " + e), Mr(!this.containsDelayedOperation(t), "Attempted to schedule multiple operations with timer id " + t + ".");
                        var i = Fa.createAndSchedule(this, t, e, n, function(t) {
                            return r.removeDelayedOperation(t)
                        });
                        return this.delayedOperations.push(i), i
                    }, t.prototype.verifyNotFailed = function() {
                        this.failure && Rr("AsyncQueue is already failed: " + (this.failure.stack || this.failure.message))
                    }, t.prototype.verifyOperationInProgress = function() {
                        Mr(this.operationInProgress, "verifyOpInProgress() called when no op in progress on this queue.")
                    }, t.prototype.drain = function() {
                        return this.enqueue(function() {
                            return Promise.resolve()
                        })
                    }, t.prototype.containsDelayedOperation = function(t) {
                        for (var e = 0, n = this.delayedOperations; e < n.length; e++) {
                            if (n[e].timerId === t) return !0
                        }
                        return !1
                    }, t.prototype.runDelayedOperationsEarly = function(r) {
                        var i = this;
                        return this.drain().then(function() {
                            Mr(r === Pa.All || i.containsDelayedOperation(r), "Attempted to drain to missing operation " + r), i.delayedOperations.sort(function(t, e) {
                                return t.targetTimeMs - e.targetTimeMs
                            });
                            for (var t = 0, e = i.delayedOperations; t < e.length; t++) {
                                var n = e[t];
                                if (n.skipDelay(), r !== Pa.All && n.timerId === r) break
                            }
                            return i.drain()
                        })
                    }, t.prototype.removeDelayedOperation = function(t) {
                        var e = this.delayedOperations.indexOf(t);
                        Mr(0 <= e, "Delayed operation not found."), this.delayedOperations.splice(e, 1)
                    }, t
                }(),
                Ba = "",
                Ua = "",
                Qa = "",
                Ka = "";

            function ja(t) {
                for (var e = "", n = 0; n < t.length; n++) 0 < e.length && (e = Wa(e)), e = Ga(t.get(n), e);
                return Wa(e)
            }

            function Ga(t, e) {
                for (var n = e, r = t.length, i = 0; i < r; i++) {
                    var o = t.charAt(i);
                    switch (o) {
                        case "\0":
                            n += Ba + Qa;
                            break;
                        case Ba:
                            n += Ba + Ka;
                            break;
                        default:
                            n += o
                    }
                }
                return n
            }

            function Wa(t) {
                return t + Ba + Ua
            }

            function za(t) {
                var e = t.length;
                if (Mr(2 <= e, "Invalid path " + t), 2 === e) return Mr(t.charAt(0) === Ba && t.charAt(1) === Ua, "Non-empty path " + t + " had length 2"), Ci.EMPTY_PATH;
                for (var n = e - 2, r = [], i = "", o = 0; o < e;) {
                    var a = t.indexOf(Ba, o);
                    switch ((a < 0 || n < a) && Rr('Invalid encoded resource path: "' + t + '"'), t.charAt(a + 1)) {
                        case Ua:
                            var s = t.substring(o, a),
                                u = void 0;
                            0 === i.length ? u = s : (u = i += s, i = ""), r.push(u);
                            break;
                        case Qa:
                            i += t.substring(o, a), i += "\0";
                            break;
                        case Ka:
                            i += t.substring(o, a + 1);
                            break;
                        default:
                            Rr('Invalid encoded resource path: "' + t + '"')
                    }
                    o = a + 2
                }
                return new Ci(r)
            }
            var Ha = function() {
                    function t(t, e, n, r) {
                        this.batchId = t, this.localWriteTime = e, this.baseMutations = n, Mr(0 < (this.mutations = r).length, "Cannot create an empty mutation batch")
                    }
                    return t.prototype.applyToRemoteDocument = function(t, e, n) {
                        e && Mr(e.key.isEqual(t), "applyToRemoteDocument: key " + t + " should match maybeDoc key\n        " + e.key);
                        var r = n.mutationResults;
                        Mr(r.length === this.mutations.length, "Mismatch between mutations length\n      (" + this.mutations.length + ") and mutation results length\n      (" + r.length + ").");
                        for (var i = 0; i < this.mutations.length; i++) {
                            var o = this.mutations[i];
                            if (o.key.isEqual(t)) {
                                var a = r[i];
                                e = o.applyToRemoteDocument(e, a)
                            }
                        }
                        return e
                    }, t.prototype.applyToLocalView = function(t, e) {
                        e && Mr(e.key.isEqual(t), "applyToLocalDocument: key " + t + " should match maybeDoc key\n        " + e.key);
                        for (var n = 0, r = this.baseMutations; n < r.length; n++) {
                            (s = r[n]).key.isEqual(t) && (e = s.applyToLocalView(e, e, this.localWriteTime))
                        }
                        for (var i = e, o = 0, a = this.mutations; o < a.length; o++) {
                            var s;
                            (s = a[o]).key.isEqual(t) && (e = s.applyToLocalView(e, i, this.localWriteTime))
                        }
                        return e
                    }, t.prototype.applyToLocalDocumentSet = function(n) {
                        var r = this,
                            i = n;
                        return this.mutations.forEach(function(t) {
                            var e = r.applyToLocalView(t.key, n.get(t.key));
                            e && (i = i.insert(t.key, e))
                        }), i
                    }, t.prototype.keys = function() {
                        return this.mutations.reduce(function(t, e) {
                            return t.add(e.key)
                        }, $o())
                    }, t.prototype.isEqual = function(t) {
                        return this.batchId === t.batchId && ui(this.mutations, t.mutations) && ui(this.baseMutations, t.baseMutations)
                    }, t
                }(),
                Ya = function() {
                    function s(t, e, n, r, i) {
                        this.batch = t, this.commitVersion = e, this.mutationResults = n, this.streamToken = r, this.docVersions = i
                    }
                    return s.from = function(t, e, n, r) {
                        Mr(t.mutations.length === n.length, "Mutations sent " + t.mutations.length + " must equal results received " + n.length);
                        for (var i = Xo(), o = t.mutations, a = 0; a < o.length; a++) i = i.insert(o[a].key, n[a].version);
                        return new s(t, e, n, r, i)
                    }, s
                }(),
                Xa = function() {
                    function a(t) {
                        var e = this;
                        this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = !1, this.callbackAttached = !1, t(function(t) {
                            e.isDone = !0, e.result = t, e.nextCallback && e.nextCallback(t)
                        }, function(t) {
                            e.isDone = !0, e.error = t, e.catchCallback && e.catchCallback(t)
                        })
                    }
                    return a.prototype.catch = function(t) {
                        return this.next(void 0, t)
                    }, a.prototype.next = function(r, i) {
                        var o = this;
                        return this.callbackAttached && Rr("Called next() or catch() twice for PersistencePromise"), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(i, this.error) : this.wrapSuccess(r, this.result) : new a(function(e, n) {
                            o.nextCallback = function(t) {
                                o.wrapSuccess(r, t).next(e, n)
                            }, o.catchCallback = function(t) {
                                o.wrapFailure(i, t).next(e, n)
                            }
                        })
                    }, a.prototype.toPromise = function() {
                        var n = this;
                        return new Promise(function(t, e) {
                            n.next(t, e)
                        })
                    }, a.prototype.wrapUserFunction = function(t) {
                        try {
                            var e = t();
                            return e instanceof a ? e : a.resolve(e)
                        } catch (t) {
                            return a.reject(t)
                        }
                    }, a.prototype.wrapSuccess = function(t, e) {
                        return t ? this.wrapUserFunction(function() {
                            return t(e)
                        }) : a.resolve(e)
                    }, a.prototype.wrapFailure = function(t, e) {
                        return t ? this.wrapUserFunction(function() {
                            return t(e)
                        }) : a.reject(e)
                    }, a.resolve = function(n) {
                        return new a(function(t, e) {
                            t(n)
                        })
                    }, a.reject = function(n) {
                        return new a(function(t, e) {
                            e(n)
                        })
                    }, a.waitFor = function(t) {
                        return new a(function(e, n) {
                            var r = 0,
                                i = 0,
                                o = !1;
                            t.forEach(function(t) {
                                ++r, t.next(function() {
                                    ++i, o && i === r && e()
                                }, function(t) {
                                    return n(t)
                                })
                            }), o = !0, i === r && e()
                        })
                    }, a.or = function(t) {
                        for (var n = a.resolve(!1), e = function(e) {
                                n = n.next(function(t) {
                                    return t ? a.resolve(t) : e()
                                })
                            }, r = 0, i = t; r < i.length; r++) {
                            e(i[r])
                        }
                        return n
                    }, a.forEach = function(t, n) {
                        var r = this,
                            i = [];
                        return t.forEach(function(t, e) {
                            i.push(n.call(r, t, e))
                        }), this.waitFor(i)
                    }, a
                }(),
                Ja = function() {
                    function i(t, e, n, r) {
                        this.userId = t, this.serializer = e, this.indexManager = n, this.referenceDelegate = r, this.documentKeysByBatchId = {}
                    }
                    return i.forUser = function(t, e, n, r) {
                        return Mr("" !== t.uid, "UserID must not be an empty string."), new i(t.isAuthenticated() ? t.uid : "", e, n, r)
                    }, i.prototype.checkEmpty = function(t) {
                        var r = !0,
                            e = IDBKeyRange.bound([this.userId, Number.NEGATIVE_INFINITY], [this.userId, Number.POSITIVE_INFINITY]);
                        return es(t).iterate({
                            index: Ls.userMutationsIndex,
                            range: e
                        }, function(t, e, n) {
                            r = !1, n.done()
                        }).next(function() {
                            return r
                        })
                    }, i.prototype.acknowledgeBatch = function(e, t, n) {
                        return this.getMutationQueueMetadata(e).next(function(t) {
                            return t.lastStreamToken = ts(n), rs(e).put(t)
                        })
                    }, i.prototype.getLastStreamToken = function(t) {
                        return this.getMutationQueueMetadata(t).next(function(t) {
                            return t.lastStreamToken
                        })
                    }, i.prototype.setLastStreamToken = function(e, n) {
                        return this.getMutationQueueMetadata(e).next(function(t) {
                            return t.lastStreamToken = ts(n), rs(e).put(t)
                        })
                    }, i.prototype.addMutationBatch = function(u, c, h, l) {
                        var f = this,
                            p = ns(u),
                            d = es(u);
                        return d.add({}).next(function(t) {
                            Mr("number" == typeof t, "Auto-generated key is not a number");
                            var e = new Ha(t, c, h, l),
                                n = f.serializer.toDbMutationBatch(f.userId, e);
                            f.documentKeysByBatchId[t] = e.keys();
                            for (var r = [], i = 0, o = l; i < o.length; i++) {
                                var a = o[i],
                                    s = xs.key(f.userId, a.key.path, t);
                                r.push(d.put(n)), r.push(p.put(s, xs.PLACEHOLDER)), r.push(f.indexManager.addToCollectionParentIndex(u, a.key.path.popLast()))
                            }
                            return Xa.waitFor(r).next(function() {
                                return e
                            })
                        })
                    }, i.prototype.lookupMutationBatch = function(t, e) {
                        var n = this;
                        return es(t).get(e).next(function(t) {
                            return t ? (Mr(t.userId === n.userId, "Unexpected user '" + t.userId + "' for mutation batch " + e), n.serializer.fromDbMutationBatch(t)) : null
                        })
                    }, i.prototype.lookupMutationKeys = function(t, n) {
                        var r = this;
                        return this.documentKeysByBatchId[n] ? Xa.resolve(this.documentKeysByBatchId[n]) : this.lookupMutationBatch(t, n).next(function(t) {
                            if (t) {
                                var e = t.keys();
                                return r.documentKeysByBatchId[n] = e
                            }
                            return null
                        })
                    }, i.prototype.getNextMutationBatchAfterBatchId = function(n, o) {
                        var a = this;
                        return this.getMutationQueueMetadata(n).next(function(t) {
                            var r = o + 1,
                                e = IDBKeyRange.lowerBound([a.userId, r]),
                                i = null;
                            return es(n).iterate({
                                index: Ls.userMutationsIndex,
                                range: e
                            }, function(t, e, n) {
                                e.userId === a.userId && (Mr(e.batchId >= r, "Should have found mutation after " + r), i = a.serializer.fromDbMutationBatch(e)), n.done()
                            }).next(function() {
                                return i
                            })
                        })
                    }, i.prototype.getAllMutationBatches = function(t) {
                        var e = this,
                            n = IDBKeyRange.bound([this.userId, -1], [this.userId, Number.POSITIVE_INFINITY]);
                        return es(t).loadAll(Ls.userMutationsIndex, n).next(function(t) {
                            return t.map(function(t) {
                                return e.serializer.fromDbMutationBatch(t)
                            })
                        })
                    }, i.prototype.getAllMutationBatchesAffectingDocumentKey = function(s, u) {
                        var c = this,
                            t = xs.prefixForPath(this.userId, u.path),
                            e = IDBKeyRange.lowerBound(t),
                            h = [];
                        return ns(s).iterate({
                            range: e
                        }, function(e, t, n) {
                            var r = e[0],
                                i = e[1],
                                o = e[2],
                                a = za(i);
                            if (r === c.userId && u.path.isEqual(a)) return es(s).get(o).next(function(t) {
                                if (!t) throw Rr("Dangling document-mutation reference found: " + e + " which points to " + o);
                                Mr(t.userId === c.userId, "Unexpected user '" + t.userId + "' for mutation batch " + o), h.push(c.serializer.fromDbMutationBatch(t))
                            });
                            n.done()
                        }).next(function() {
                            return h
                        })
                    }, i.prototype.getAllMutationBatchesAffectingDocumentKeys = function(r, t) {
                        var u = this,
                            c = new To(si),
                            i = [];
                        return t.forEach(function(s) {
                            var t = xs.prefixForPath(u.userId, s.path),
                                e = IDBKeyRange.lowerBound(t),
                                n = ns(r).iterate({
                                    range: e
                                }, function(t, e, n) {
                                    var r = t[0],
                                        i = t[1],
                                        o = t[2],
                                        a = za(i);
                                    r === u.userId && s.path.isEqual(a) ? c = c.add(o) : n.done()
                                });
                            i.push(n)
                        }), Xa.waitFor(i).next(function() {
                            return u.lookupMutationBatches(r, c)
                        })
                    }, i.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
                        var s = this;
                        Mr(!e.isDocumentQuery(), "Document queries shouldn't go down this path"), Mr(!e.isCollectionGroupQuery(), "CollectionGroup queries should be handled in LocalDocumentsView");
                        var u = e.path,
                            c = u.length + 1,
                            n = xs.prefixForPath(this.userId, u),
                            r = IDBKeyRange.lowerBound(n),
                            h = new To(si);
                        return ns(t).iterate({
                            range: r
                        }, function(t, e, n) {
                            var r = t[0],
                                i = t[1],
                                o = t[2],
                                a = za(i);
                            r === s.userId && u.isPrefixOf(a) ? a.length === c && (h = h.add(o)) : n.done()
                        }).next(function() {
                            return s.lookupMutationBatches(t, h)
                        })
                    }, i.prototype.lookupMutationBatches = function(t, e) {
                        var n = this,
                            r = [],
                            i = [];
                        return e.forEach(function(e) {
                            i.push(es(t).get(e).next(function(t) {
                                if (null === t) throw Rr("Dangling document-mutation reference found, which points to " + e);
                                Mr(t.userId === n.userId, "Unexpected user '" + t.userId + "' for mutation batch " + e), r.push(n.serializer.fromDbMutationBatch(t))
                            }))
                        }), Xa.waitFor(i).next(function() {
                            return r
                        })
                    }, i.prototype.removeMutationBatch = function(e, n) {
                        var r = this;
                        return Za(e.simpleDbTransaction, this.userId, n).next(function(t) {
                            return r.removeCachedMutationKeys(n.batchId), Xa.forEach(t, function(t) {
                                return r.referenceDelegate.removeMutationReference(e, t)
                            })
                        })
                    }, i.prototype.removeCachedMutationKeys = function(t) {
                        delete this.documentKeysByBatchId[t]
                    }, i.prototype.performConsistencyCheck = function(n) {
                        var o = this;
                        return this.checkEmpty(n).next(function(t) {
                            if (!t) return Xa.resolve();
                            var e = IDBKeyRange.lowerBound(xs.prefixForUser(o.userId)),
                                i = [];
                            return ns(n).iterate({
                                range: e
                            }, function(t, e, n) {
                                if (t[0] === o.userId) {
                                    var r = za(t[1]);
                                    i.push(r)
                                } else n.done()
                            }).next(function() {
                                Mr(0 === i.length, "Document leak -- detected dangling mutation references when queue is empty. Dangling keys: " + i.map(function(t) {
                                    return t.canonicalString()
                                }))
                            })
                        })
                    }, i.prototype.containsKey = function(t, e) {
                        return $a(t, this.userId, e)
                    }, i.prototype.getMutationQueueMetadata = function(t) {
                        var e = this;
                        return rs(t).get(this.userId).next(function(t) {
                            return t || new Ps(e.userId, -1, "")
                        })
                    }, i
                }();

            function $a(t, o, e) {
                var n = xs.prefixForPath(o, e.path),
                    a = n[1],
                    r = IDBKeyRange.lowerBound(n),
                    s = !1;
                return ns(t).iterate({
                    range: r,
                    keysOnly: !0
                }, function(t, e, n) {
                    var r = t[0],
                        i = t[1];
                    t[2];
                    r === o && i === a && (s = !0), n.done()
                }).next(function() {
                    return s
                })
            }

            function Za(t, e, n) {
                var r = t.store(Ls.store),
                    i = t.store(xs.store),
                    o = [],
                    a = IDBKeyRange.only(n.batchId),
                    s = 0,
                    u = r.iterate({
                        range: a
                    }, function(t, e, n) {
                        return s++, n.delete()
                    });
                o.push(u.next(function() {
                    Mr(1 === s, "Dangling document-mutation reference found: Missing batch " + n.batchId)
                }));
                for (var c = [], h = 0, l = n.mutations; h < l.length; h++) {
                    var f = l[h],
                        p = xs.key(e, f.key.path, n.batchId);
                    o.push(i.delete(p)), c.push(f.key)
                }
                return Xa.waitFor(o).next(function() {
                    return c
                })
            }

            function ts(t) {
                return t instanceof Uint8Array ? (Mr("YES" === process.env.USE_MOCK_PERSISTENCE, "Persisting non-string stream tokens is only supported with mock persistence."), t.toString()) : t
            }

            function es(t) {
                return uu.getStore(t, Ls.store)
            }

            function ns(t) {
                return uu.getStore(t, xs.store)
            }

            function rs(t) {
                return uu.getStore(t, Ps.store)
            }
            var is, os;
            (os = is || (is = {}))[os.QueryCache = 0] = "QueryCache", os[os.SyncEngine = 1] = "SyncEngine";
            var as = function() {
                    function t(t, e) {
                        Mr((1 & (this.generatorId = t)) === t, "Generator ID " + t + " contains more than 1 reserved bits"), this.seek(void 0 !== e ? e : this.generatorId)
                    }
                    return t.prototype.next = function() {
                        var t = this.nextId;
                        return this.nextId += 2, t
                    }, t.prototype.after = function(t) {
                        return this.seek(t + 2), this.next()
                    }, t.prototype.seek = function(t) {
                        Mr((1 & t) === this.generatorId, "Cannot supply target ID from different generator ID"), this.nextId = t
                    }, t.forQueryCache = function() {
                        return new t(is.QueryCache, 2)
                    }, t.forSyncEngine = function() {
                        return new t(is.SyncEngine)
                    }, t
                }(),
                ss = "SimpleDb",
                us = function() {
                    function s(t) {
                        this.db = t
                    }
                    return s.openOrCreate = function(o, t, a) {
                        return Mr(s.isAvailable(), "IndexedDB not supported in current environment."), Nr(ss, "Opening database:", o), new Xa(function(n, r) {
                            var i = window.indexedDB.open(o, t);
                            i.onsuccess = function(t) {
                                var e = t.target.result;
                                n(new s(e))
                            }, i.onblocked = function() {
                                r(new Lr(Pr.FAILED_PRECONDITION, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))
                            }, i.onerror = function(t) {
                                var e = t.target.error;
                                "VersionError" === e.name ? r(new Lr(Pr.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : r(e)
                            }, i.onupgradeneeded = function(t) {
                                Nr(ss, 'Database "' + o + '" requires upgrade from version:', t.oldVersion);
                                var e = t.target.result,
                                    n = new hs(i.transaction);
                                a.createOrUpgrade(e, n, t.oldVersion, Rs).next(function() {
                                    Nr(ss, "Database upgrade to version " + Rs + " complete")
                                })
                            }
                        }).toPromise()
                    }, s.delete = function(t) {
                        return Nr(ss, "Removing database:", t), fs(window.indexedDB.deleteDatabase(t)).toPromise()
                    }, s.isAvailable = function() {
                        if ("undefined" == typeof window || null == window.indexedDB) return !1;
                        if (void 0 === window.navigator) return "YES" === process.env.USE_MOCK_PERSISTENCE;
                        var t = window.navigator.userAgent,
                            e = s.getIOSVersion(t),
                            n = 0 < e && e < 10,
                            r = s.getAndroidVersion(t),
                            i = 0 < r && r < 4.5;
                        return !(0 < t.indexOf("MSIE ") || 0 < t.indexOf("Trident/") || 0 < t.indexOf("Edge/") || n || i)
                    }, s.getStore = function(t, e) {
                        return t.store(e)
                    }, s.getIOSVersion = function(t) {
                        var e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
                            n = e ? e[1].split("_")[0] : "-1";
                        return Number(n)
                    }, s.getAndroidVersion = function(t) {
                        var e = t.match(/Android ([\d.]+)/i),
                            n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
                        return Number(n)
                    }, s.prototype.runTransaction = function(t, e, n) {
                        var r = hs.open(this.db, t, e),
                            i = n(r).catch(function(t) {
                                return r.abort(t), Xa.reject(t)
                            }).toPromise();
                        return i.catch(function() {}), r.completionPromise.then(function() {
                            return i
                        })
                    }, s.prototype.close = function() {
                        this.db.close()
                    }, s
                }(),
                cs = function() {
                    function t(t) {
                        this.dbCursor = t, this.shouldStop = !1, this.nextKey = null
                    }
                    return Object.defineProperty(t.prototype, "isDone", {
                        get: function() {
                            return this.shouldStop
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "skipToKey", {
                        get: function() {
                            return this.nextKey
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "cursor", {
                        set: function(t) {
                            this.dbCursor = t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.done = function() {
                        this.shouldStop = !0
                    }, t.prototype.skip = function(t) {
                        this.nextKey = t
                    }, t.prototype.delete = function() {
                        return fs(this.dbCursor.delete())
                    }, t
                }(),
                hs = function() {
                    function r(t) {
                        var e = this;
                        this.transaction = t, this.aborted = !1, this.completionDeferred = new qa, this.transaction.oncomplete = function() {
                            e.completionDeferred.resolve()
                        }, this.transaction.onabort = function() {
                            t.error ? e.completionDeferred.reject(t.error) : e.completionDeferred.resolve()
                        }, this.transaction.onerror = function(t) {
                            e.completionDeferred.reject(t.target.error)
                        }
                    }
                    return r.open = function(t, e, n) {
                        return new r(t.transaction(n, e))
                    }, Object.defineProperty(r.prototype, "completionPromise", {
                        get: function() {
                            return this.completionDeferred.promise
                        },
                        enumerable: !0,
                        configurable: !0
                    }), r.prototype.abort = function(t) {
                        t && this.completionDeferred.reject(t), this.aborted || (Nr(ss, "Aborting transaction:", t ? t.message : "Client-initiated abort"), this.aborted = !0, this.transaction.abort())
                    }, r.prototype.store = function(t) {
                        var e = this.transaction.objectStore(t);
                        return Mr(!!e, "Object store not part of transaction: " + t), new ls(e)
                    }, r
                }(),
                ls = function() {
                    function t(t) {
                        this.store = t
                    }
                    return t.prototype.put = function(t, e) {
                        return fs(void 0 !== e ? (Nr(ss, "PUT", this.store.name, t, e), this.store.put(e, t)) : (Nr(ss, "PUT", this.store.name, "<auto-key>", t), this.store.put(t)))
                    }, t.prototype.add = function(t) {
                        return Nr(ss, "ADD", this.store.name, t, t), fs(this.store.add(t))
                    }, t.prototype.get = function(e) {
                        var n = this;
                        return fs(this.store.get(e)).next(function(t) {
                            return void 0 === t && (t = null), Nr(ss, "GET", n.store.name, e, t), t
                        })
                    }, t.prototype.delete = function(t) {
                        return Nr(ss, "DELETE", this.store.name, t), fs(this.store.delete(t))
                    }, t.prototype.count = function() {
                        return Nr(ss, "COUNT", this.store.name), fs(this.store.count())
                    }, t.prototype.loadAll = function(t, e) {
                        var n = this.cursor(this.options(t, e)),
                            r = [];
                        return this.iterateCursor(n, function(t, e) {
                            r.push(e)
                        }).next(function() {
                            return r
                        })
                    }, t.prototype.deleteAll = function(t, e) {
                        Nr(ss, "DELETE ALL", this.store.name);
                        var n = this.options(t, e);
                        n.keysOnly = !1;
                        var r = this.cursor(n);
                        return this.iterateCursor(r, function(t, e, n) {
                            return n.delete()
                        })
                    }, t.prototype.iterate = function(t, e) {
                        var n;
                        e ? n = t : (n = {}, e = t);
                        var r = this.cursor(n);
                        return this.iterateCursor(r, e)
                    }, t.prototype.iterateSerial = function(r) {
                        var t = this.cursor({});
                        return new Xa(function(n, e) {
                            t.onerror = function(t) {
                                e(t.target.error)
                            }, t.onsuccess = function(t) {
                                var e = t.target.result;
                                e ? r(e.primaryKey, e.value).next(function(t) {
                                    t ? e.continue() : n()
                                }) : n()
                            }
                        })
                    }, t.prototype.iterateCursor = function(t, a) {
                        var s = [];
                        return new Xa(function(o, e) {
                            t.onerror = function(t) {
                                e(t.target.error)
                            }, t.onsuccess = function(t) {
                                var e = t.target.result;
                                if (e) {
                                    var n = new cs(e),
                                        r = a(e.primaryKey, e.value, n);
                                    if (r instanceof Xa) {
                                        var i = r.catch(function(t) {
                                            return n.done(), Xa.reject(t)
                                        });
                                        s.push(i)
                                    }
                                    n.isDone ? o() : null === n.skipToKey ? e.continue() : e.continue(n.skipToKey)
                                } else o()
                            }
                        }).next(function() {
                            return Xa.waitFor(s)
                        })
                    }, t.prototype.options = function(t, e) {
                        var n = void 0;
                        return void 0 !== t && ("string" == typeof t ? n = t : (Mr(void 0 === e, "3rd argument must not be defined if 2nd is a range."), e = t)), {
                            index: n,
                            range: e
                        }
                    }, t.prototype.cursor = function(t) {
                        var e = "next";
                        if (t.reverse && (e = "prev"), t.index) {
                            var n = this.store.index(t.index);
                            return t.keysOnly ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e)
                        }
                        return this.store.openCursor(t.range, e)
                    }, t
                }();

            function fs(t) {
                return new Xa(function(n, e) {
                    t.onsuccess = function(t) {
                        var e = t.target.result;
                        n(e)
                    }, t.onerror = function(t) {
                        e(t.target.error)
                    }
                })
            }
            var ps = function() {
                function t(t, e) {
                    this.referenceDelegate = t, this.serializer = e, this.targetIdGenerator = as.forQueryCache()
                }
                return t.prototype.allocateTargetId = function(e) {
                    var n = this;
                    return this.retrieveMetadata(e).next(function(t) {
                        return t.highestTargetId = n.targetIdGenerator.after(t.highestTargetId), n.saveMetadata(e, t).next(function() {
                            return t.highestTargetId
                        })
                    })
                }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
                    return this.retrieveMetadata(t).next(function(t) {
                        return bo.fromTimestamp(new bi(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds))
                    })
                }, t.prototype.getHighestSequenceNumber = function(t) {
                    return ys(t.simpleDbTransaction)
                }, t.prototype.setTargetsMetadata = function(e, n, r) {
                    var i = this;
                    return this.retrieveMetadata(e).next(function(t) {
                        return t.highestListenSequenceNumber = n, r && (t.lastRemoteSnapshotVersion = r.toTimestamp()), n > t.highestListenSequenceNumber && (t.highestListenSequenceNumber = n), i.saveMetadata(e, t)
                    })
                }, t.prototype.addQueryData = function(e, n) {
                    var r = this;
                    return this.saveQueryData(e, n).next(function() {
                        return r.retrieveMetadata(e).next(function(t) {
                            return t.targetCount += 1, r.updateMetadataFromQueryData(n, t), r.saveMetadata(e, t)
                        })
                    })
                }, t.prototype.updateQueryData = function(t, e) {
                    return this.saveQueryData(t, e)
                }, t.prototype.removeQueryData = function(e, t) {
                    var n = this;
                    return this.removeMatchingKeysForTargetId(e, t.targetId).next(function() {
                        return ds(e).delete(t.targetId)
                    }).next(function() {
                        return n.retrieveMetadata(e)
                    }).next(function(t) {
                        return Mr(0 < t.targetCount, "Removing from an empty query cache"), t.targetCount -= 1, n.saveMetadata(e, t)
                    })
                }, t.prototype.removeTargets = function(r, i, o) {
                    var a = this,
                        s = 0,
                        u = [];
                    return ds(r).iterate(function(t, e) {
                        var n = a.serializer.fromDbTarget(e);
                        n.sequenceNumber <= i && void 0 === o[n.targetId] && (s++, u.push(a.removeQueryData(r, n)))
                    }).next(function() {
                        return Xa.waitFor(u)
                    }).next(function() {
                        return s
                    })
                }, t.prototype.forEachTarget = function(t, r) {
                    var i = this;
                    return ds(t).iterate(function(t, e) {
                        var n = i.serializer.fromDbTarget(e);
                        r(n)
                    })
                }, t.prototype.retrieveMetadata = function(t) {
                    return ms(t.simpleDbTransaction)
                }, t.prototype.saveMetadata = function(t, e) {
                    return (n = t, uu.getStore(n, Ks.store)).put(Ks.key, e);
                    var n
                }, t.prototype.saveQueryData = function(t, e) {
                    return ds(t).put(this.serializer.toDbTarget(e))
                }, t.prototype.updateMetadataFromQueryData = function(t, e) {
                    var n = !1;
                    return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, n = !0), n
                }, t.prototype.getQueryCount = function(t) {
                    return this.retrieveMetadata(t).next(function(t) {
                        return t.targetCount
                    })
                }, t.prototype.getQueryData = function(t, i) {
                    var o = this,
                        e = i.canonicalId(),
                        n = IDBKeyRange.bound([e, Number.NEGATIVE_INFINITY], [e, Number.POSITIVE_INFINITY]),
                        a = null;
                    return ds(t).iterate({
                        range: n,
                        index: Us.queryTargetsIndexName
                    }, function(t, e, n) {
                        var r = o.serializer.fromDbTarget(e);
                        i.isEqual(r.query) && (a = r, n.done())
                    }).next(function() {
                        return a
                    })
                }, t.prototype.addMatchingKeys = function(n, t, r) {
                    var i = this,
                        o = [],
                        a = gs(n);
                    return t.forEach(function(t) {
                        var e = ja(t.path);
                        o.push(a.put(new Qs(r, e))), o.push(i.referenceDelegate.addReference(n, t))
                    }), Xa.waitFor(o)
                }, t.prototype.removeMatchingKeys = function(n, t, r) {
                    var i = this,
                        o = gs(n);
                    return Xa.forEach(t, function(t) {
                        var e = ja(t.path);
                        return Xa.waitFor([o.delete([r, e]), i.referenceDelegate.removeReference(n, t)])
                    })
                }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
                    var n = gs(t),
                        r = IDBKeyRange.bound([e], [e + 1], !1, !0);
                    return n.delete(r)
                }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
                    var n = IDBKeyRange.bound([e], [e + 1], !1, !0),
                        r = gs(t),
                        o = $o();
                    return r.iterate({
                        range: n,
                        keysOnly: !0
                    }, function(t, e, n) {
                        var r = za(t[1]),
                            i = new Ai(r);
                        o = o.add(i)
                    }).next(function() {
                        return o
                    })
                }, t.prototype.containsKey = function(t, e) {
                    var n = ja(e.path),
                        r = IDBKeyRange.bound([n], [ci(n)], !1, !0),
                        i = 0;
                    return gs(t).iterate({
                        index: Qs.documentTargetsIndex,
                        keysOnly: !0,
                        range: r
                    }, function(t, e, n) {
                        var r = t[0];
                        t[1];
                        0 !== r && (i++, n.done())
                    }).next(function() {
                        return 0 < i
                    })
                }, t.prototype.getQueryDataForTarget = function(t, e) {
                    var n = this;
                    return ds(t).get(e).next(function(t) {
                        return t ? n.serializer.fromDbTarget(t) : null
                    })
                }, t
            }();

            function ds(t) {
                return uu.getStore(t, Us.store)
            }

            function ms(t) {
                return us.getStore(t, Ks.store).get(Ks.key).next(function(t) {
                    return Mr(null !== t, "Missing metadata row."), t
                })
            }

            function ys(t) {
                return ms(t).next(function(t) {
                    return t.highestListenSequenceNumber
                })
            }

            function gs(t) {
                return uu.getStore(t, Qs.store)
            }
            var vs = function() {
                    function t(t) {
                        this.mapKeyFn = t, this.inner = {}
                    }
                    return t.prototype.get = function(t) {
                        var e = this.mapKeyFn(t),
                            n = this.inner[e];
                        if (void 0 !== n)
                            for (var r = 0, i = n; r < i.length; r++) {
                                var o = i[r],
                                    a = o[0],
                                    s = o[1];
                                if (a.isEqual(t)) return s
                            }
                    }, t.prototype.has = function(t) {
                        return void 0 !== this.get(t)
                    }, t.prototype.set = function(t, e) {
                        var n = this.mapKeyFn(t),
                            r = this.inner[n];
                        if (void 0 !== r) {
                            for (var i = 0; i < r.length; i++)
                                if (r[i][0].isEqual(t)) return void(r[i] = [t, e]);
                            r.push([t, e])
                        } else this.inner[n] = [
                            [t, e]
                        ]
                    }, t.prototype.delete = function(t) {
                        var e = this.mapKeyFn(t),
                            n = this.inner[e];
                        if (void 0 === n) return !1;
                        for (var r = 0; r < n.length; r++)
                            if (n[r][0].isEqual(t)) return 1 === n.length ? delete this.inner[e] : n.splice(r, 1), !0;
                        return !1
                    }, t.prototype.forEach = function(s) {
                        Br(this.inner, function(t, e) {
                            for (var n = 0, r = e; n < r.length; n++) {
                                var i = r[n],
                                    o = i[0],
                                    a = i[1];
                                s(o, a)
                            }
                        })
                    }, t.prototype.isEmpty = function() {
                        return Ur(this.inner)
                    }, t
                }(),
                bs = function() {
                    function t() {
                        this.changes = Go(), this.documentSizes = new vs(function(t) {
                            return t.toString()
                        })
                    }
                    return t.prototype.addEntry = function(t) {
                        var e = this.assertChanges();
                        this.changes = e.insert(t.key, t)
                    }, t.prototype.getEntry = function(t, e) {
                        var n = this,
                            r = this.assertChanges().get(e);
                        return r ? Xa.resolve(r) : this.getFromCache(t, e).next(function(t) {
                            return null === t ? (n.documentSizes.set(e, 0), null) : (n.documentSizes.set(e, t.size), t.maybeDocument)
                        })
                    }, t.prototype.getEntries = function(t, e) {
                        var n = this;
                        return this.getAllFromCache(t, e).next(function(t) {
                            var e = t.maybeDocuments;
                            return t.sizeMap.forEach(function(t, e) {
                                n.documentSizes.set(t, e)
                            }), e
                        })
                    }, t.prototype.apply = function(t) {
                        var e = this.applyChanges(t);
                        return this.changes = null, e
                    }, t.prototype.assertChanges = function() {
                        return Mr(null !== this.changes, "Changes have already been applied."), this.changes
                    }, t
                }(),
                ws = "The remote document changelog no longer contains all changes for all local query views. It may be necessary to rebuild these views.",
                Es = function() {
                    function t(t, e, n) {
                        this.serializer = t, this.indexManager = e, this.keepDocumentChangeLog = n, this._lastProcessedDocumentChangeId = 0
                    }
                    return Object.defineProperty(t.prototype, "lastProcessedDocumentChangeId", {
                        get: function() {
                            return this._lastProcessedDocumentChangeId
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.start = function(t) {
                        var e = us.getStore(t, Ws.store);
                        return this.synchronizeLastDocumentChangeId(e)
                    }, t.prototype.addEntries = function(t, e, n) {
                        var r = [];
                        if (0 < e.length) {
                            for (var i = Is(t), o = $o(), a = 0, s = e; a < s.length; a++) {
                                var u = s[a],
                                    c = u.key,
                                    h = u.doc;
                                r.push(i.put(Ds(c), h)), o = o.add(c), r.push(this.indexManager.addToCollectionParentIndex(t, c.path.popLast()))
                            }
                            this.keepDocumentChangeLog && r.push(Cs(t).put({
                                changes: this.serializer.toDbResourcePaths(o)
                            })), r.push(this.updateSize(t, n))
                        }
                        return Xa.waitFor(r)
                    }, t.prototype.removeEntry = function(t, e) {
                        var n = Is(t),
                            r = Ds(e);
                        return n.get(r).next(function(t) {
                            return t ? n.delete(r).next(function() {
                                return Ns(t)
                            }) : Xa.resolve(0)
                        })
                    }, t.prototype.getEntry = function(t, e) {
                        var n = this;
                        return Is(t).get(Ds(e)).next(function(t) {
                            return t ? n.serializer.fromDbRemoteDocument(t) : null
                        })
                    }, t.prototype.getSizedEntry = function(t, e) {
                        var n = this;
                        return Is(t).get(Ds(e)).next(function(t) {
                            return t ? {
                                maybeDocument: n.serializer.fromDbRemoteDocument(t),
                                size: Ns(t)
                            } : null
                        })
                    }, t.prototype.getEntries = function(t, e) {
                        var n = this,
                            r = Wo();
                        return this.forEachDbEntry(t, e, function(t, e) {
                            r = e ? r.insert(t, n.serializer.fromDbRemoteDocument(e)) : r.insert(t, null)
                        }).next(function() {
                            return r
                        })
                    }, t.prototype.getSizedEntries = function(t, e) {
                        var n = this,
                            r = Wo(),
                            i = new _i(Ai.comparator);
                        return this.forEachDbEntry(t, e, function(t, e) {
                            i = e ? (r = r.insert(t, n.serializer.fromDbRemoteDocument(e)), i.insert(t, Ns(e))) : (r = r.insert(t, null), i.insert(t, 0))
                        }).next(function() {
                            return {
                                maybeDocuments: r,
                                sizeMap: i
                            }
                        })
                    }, t.prototype.forEachDbEntry = function(t, e, i) {
                        if (e.isEmpty()) return Xa.resolve();
                        var n = IDBKeyRange.bound(e.first().path.toArray(), e.last().path.toArray()),
                            o = e.getIterator(),
                            a = o.getNext();
                        return Is(t).iterate({
                            range: n
                        }, function(t, e, n) {
                            for (var r = Ai.fromSegments(t); a && Ai.comparator(a, r) < 0;) i(a, null), a = o.getNext();
                            a && a.isEqual(r) && (i(a, e), a = o.hasNext() ? o.getNext() : null), a ? n.skip(a.path.toArray()) : n.done()
                        }).next(function() {
                            for (; a;) i(a, null), a = o.hasNext() ? o.getNext() : null
                        })
                    }, t.prototype.getDocumentsMatchingQuery = function(t, i) {
                        var o = this;
                        Mr(!i.isCollectionGroupQuery(), "CollectionGroup queries should be handled in LocalDocumentsView");
                        var a = Ho(),
                            s = i.path.length + 1,
                            e = i.path.toArray(),
                            n = IDBKeyRange.lowerBound(e);
                        return Is(t).iterate({
                            range: n
                        }, function(t, e, n) {
                            if (t.length === s) {
                                var r = o.serializer.fromDbRemoteDocument(e);
                                i.path.isPrefixOf(r.key.path) ? r instanceof Ri && i.matches(r) && (a = a.insert(r.key, r)) : n.done()
                            }
                        }).next(function() {
                            return a
                        })
                    }, t.prototype.getNewDocumentChanges = function(e) {
                        var r = this;
                        Mr(this.keepDocumentChangeLog, "Can only call getNewDocumentChanges() when document change log is enabled");
                        var n = $o(),
                            i = Go(),
                            t = IDBKeyRange.lowerBound(this._lastProcessedDocumentChangeId + 1),
                            o = !0,
                            a = Cs(e);
                        return a.iterate({
                            range: t
                        }, function(t, e) {
                            if (o && (o = !1, r._lastProcessedDocumentChangeId + 1 !== e.id)) return r.synchronizeLastDocumentChangeId(a).next(function() {
                                return Xa.reject(new Lr(Pr.DATA_LOSS, ws))
                            });
                            n = n.unionWith(r.serializer.fromDbResourcePaths(e.changes)), r._lastProcessedDocumentChangeId = e.id
                        }).next(function() {
                            var t = [];
                            return n.forEach(function(n) {
                                t.push(r.getEntry(e, n).next(function(t) {
                                    var e = t || new Mi(n, bo.forDeletedDoc());
                                    i = i.insert(n, e)
                                }))
                            }), Xa.waitFor(t)
                        }).next(function() {
                            return i
                        })
                    }, t.prototype.removeDocumentChangesThroughChangeId = function(t, e) {
                        var n = IDBKeyRange.upperBound(e);
                        return Cs(t).delete(n)
                    }, t.prototype.synchronizeLastDocumentChangeId = function(t) {
                        var r = this;
                        return this._lastProcessedDocumentChangeId = 0, t.iterate({
                            keysOnly: !0,
                            reverse: !0
                        }, function(t, e, n) {
                            r._lastProcessedDocumentChangeId = t, n.done()
                        })
                    }, t.prototype.newChangeBuffer = function() {
                        return new Ts(this)
                    }, t.prototype.getSize = function(t) {
                        return this.getMetadata(t).next(function(t) {
                            return t.byteSize
                        })
                    }, t.prototype.getMetadata = function(t) {
                        return Ss(t).get(Bs.key).next(function(t) {
                            return Mr(!!t, "Missing document cache metadata"), t
                        })
                    }, t.prototype.setMetadata = function(t, e) {
                        return Ss(t).put(Bs.key, e)
                    }, t.prototype.updateSize = function(e, n) {
                        var r = this;
                        return this.getMetadata(e).next(function(t) {
                            return t.byteSize += n, r.setMetadata(e, t)
                        })
                    }, t
                }();

            function Ss(t) {
                return uu.getStore(t, Bs.store)
            }
            var Ts = function(n) {
                function t(t) {
                    var e = n.call(this) || this;
                    return e.documentCache = t, e
                }
                return s(t, n), t.prototype.applyChanges = function(t) {
                    var o = this,
                        e = this.assertChanges(),
                        a = 0,
                        s = [];
                    return e.forEach(function(t, e) {
                        var n = o.documentCache.serializer.toDbRemoteDocument(e),
                            r = o.documentSizes.get(t);
                        Mr(void 0 !== r, "Attempting to change document " + t.toString() + " without having read it first");
                        var i = Ns(n);
                        a += i - r, s.push({
                            key: t,
                            doc: n
                        })
                    }), this.documentCache.addEntries(t, s, a)
                }, t.prototype.getFromCache = function(t, e) {
                    return this.documentCache.getSizedEntry(t, e)
                }, t.prototype.getAllFromCache = function(t, e) {
                    return this.documentCache.getSizedEntries(t, e)
                }, t
            }(bs);

            function Is(t) {
                return uu.getStore(t, Vs.store)
            }

            function Cs(t) {
                return uu.getStore(t, Ws.store)
            }

            function Ds(t) {
                return t.path.toArray()
            }

            function Ns(t) {
                var e;
                if (t.document) e = t.document;
                else if (t.unknownDocument) e = t.unknownDocument;
                else {
                    if (!t.noDocument) throw Rr("Unknown remote document type");
                    e = t.noDocument
                }
                return JSON.stringify(e).length
            }
            var As = function() {
                    function t() {
                        this.collectionParentIndex = new ks
                    }
                    return t.prototype.addToCollectionParentIndex = function(t, e) {
                        return this.collectionParentIndex.add(e), Xa.resolve()
                    }, t.prototype.getCollectionParents = function(t, e) {
                        return Xa.resolve(this.collectionParentIndex.getEntries(e))
                    }, t
                }(),
                ks = function() {
                    function t() {
                        this.index = {}
                    }
                    return t.prototype.add = function(t) {
                        Mr(t.length % 2 == 1, "Expected a collection path.");
                        var e = t.lastSegment(),
                            n = t.popLast(),
                            r = this.index[e] || new To(Ci.comparator),
                            i = !r.has(n);
                        return this.index[e] = r.add(n), i
                    }, t.prototype.getEntries = function(t) {
                        return (this.index[t] || new To(Ci.comparator)).toArray()
                    }, t
                }(),
                Rs = 8,
                Ms = function() {
                    function t(t) {
                        this.serializer = t
                    }
                    return t.prototype.createOrUpgrade = function(t, n, e, r) {
                        var i, o = this;
                        Mr(e < r && 0 <= e && r <= Rs, "Unexpected schema upgrade from v" + e + " to v{toVersion}."), e < 1 && 1 <= r && (t.createObjectStore(_s.store), (i = t).createObjectStore(Ps.store, {
                            keyPath: Ps.keyPath
                        }), i.createObjectStore(Ls.store, {
                            keyPath: Ls.keyPath,
                            autoIncrement: !0
                        }).createIndex(Ls.userMutationsIndex, Ls.userMutationsKeyPath, {
                            unique: !0
                        }), i.createObjectStore(xs.store), Gs(t), t.createObjectStore(Vs.store));
                        var a, s = Xa.resolve();
                        return e < 3 && 3 <= r && (0 !== e && ((a = t).deleteObjectStore(Qs.store), a.deleteObjectStore(Us.store), a.deleteObjectStore(Ks.store), Gs(t)), s = s.next(function() {
                            return t = n.store(Ks.store), e = new Ks(0, 0, bo.MIN.toTimestamp(), 0), t.put(Ks.key, e);
                            var t, e
                        })), e < 4 && 4 <= r && (0 !== e && (s = s.next(function() {
                            return i = t, (o = n).store(Ls.store).loadAll().next(function(t) {
                                i.deleteObjectStore(Ls.store);
                                var e = i.createObjectStore(Ls.store, {
                                    keyPath: Ls.keyPath,
                                    autoIncrement: !0
                                });
                                e.createIndex(Ls.userMutationsIndex, Ls.userMutationsKeyPath, {
                                    unique: !0
                                });
                                var n = o.store(Ls.store),
                                    r = t.map(function(t) {
                                        return n.put(t)
                                    });
                                return Xa.waitFor(r)
                            });
                            var i, o
                        })), s = s.next(function() {
                            t.createObjectStore(zs.store, {
                                keyPath: zs.keyPath
                            }), t.createObjectStore(Ws.store, {
                                keyPath: "id",
                                autoIncrement: !0
                            })
                        })), e < 5 && 5 <= r && (s = s.next(function() {
                            return o.removeAcknowledgedMutations(n)
                        })), e < 6 && 6 <= r && (s = s.next(function() {
                            return t.createObjectStore(Bs.store), o.addDocumentGlobal(n)
                        })), e < 7 && 7 <= r && (s = s.next(function() {
                            return o.ensureSequenceNumbers(n)
                        })), e < 8 && 8 <= r && (s = s.next(function() {
                            return o.createCollectionParentIndex(t, n)
                        })), s
                    }, t.prototype.addDocumentGlobal = function(e) {
                        var n = 0;
                        return e.store(Vs.store).iterate(function(t, e) {
                            n += Ns(e)
                        }).next(function() {
                            var t = new Bs(n);
                            return e.store(Bs.store).put(Bs.key, t)
                        })
                    }, t.prototype.removeAcknowledgedMutations = function(r) {
                        var i = this,
                            t = r.store(Ps.store),
                            e = r.store(Ls.store);
                        return t.loadAll().next(function(t) {
                            return Xa.forEach(t, function(n) {
                                var t = IDBKeyRange.bound([n.userId, -1], [n.userId, n.lastAcknowledgedBatchId]);
                                return e.loadAll(Ls.userMutationsIndex, t).next(function(t) {
                                    return Xa.forEach(t, function(t) {
                                        Mr(t.userId === n.userId, "Cannot process batch " + t.batchId + " from unexpected user");
                                        var e = i.serializer.fromDbMutationBatch(t);
                                        return Za(r, n.userId, e).next(function() {})
                                    })
                                })
                            })
                        })
                    }, t.prototype.ensureSequenceNumbers = function(t) {
                        var a = t.store(Qs.store),
                            e = t.store(Vs.store);
                        return ys(t).next(function(i) {
                            var o = [];
                            return e.iterate(function(t, e) {
                                var n = new Ci(t),
                                    r = [0, ja(n)];
                                o.push(a.get(r).next(function(t) {
                                    return t ? Xa.resolve() : (e = n, a.put(new Qs(0, ja(e), i)));
                                    var e
                                }))
                            }).next(function() {
                                return Xa.waitFor(o)
                            })
                        })
                    }, t.prototype.createCollectionParentIndex = function(t, e) {
                        t.createObjectStore(js.store, {
                            keyPath: js.keyPath
                        });
                        var r = e.store(js.store),
                            i = new ks,
                            o = function(t) {
                                if (i.add(t)) {
                                    var e = t.lastSegment(),
                                        n = t.popLast();
                                    return r.put({
                                        collectionId: e,
                                        parent: ja(n)
                                    })
                                }
                            };
                        return e.store(Vs.store).iterate({
                            keysOnly: !0
                        }, function(t, e) {
                            var n = new Ci(t);
                            return o(n.popLast())
                        }).next(function() {
                            return e.store(xs.store).iterate({
                                keysOnly: !0
                            }, function(t, e) {
                                t[0];
                                var n = t[1],
                                    r = (t[2], za(n));
                                return o(r.popLast())
                            })
                        })
                    }, t
                }();
            var Os = function(t, e) {
                    this.seconds = t, this.nanoseconds = e
                },
                _s = function() {
                    function t(t, e, n) {
                        this.ownerId = t, this.allowTabSynchronization = e, this.leaseTimestampMs = n
                    }
                    return t.store = "owner", t.key = "owner", t
                }();
            var Ps = function() {
                    function t(t, e, n) {
                        this.userId = t, this.lastAcknowledgedBatchId = e, this.lastStreamToken = n
                    }
                    return t.store = "mutationQueues", t.keyPath = "userId", t
                }(),
                Ls = function() {
                    function t(t, e, n, r, i) {
                        this.userId = t, this.batchId = e, this.localWriteTimeMs = n, this.baseMutations = r, this.mutations = i
                    }
                    return t.store = "mutations", t.keyPath = "batchId", t.userMutationsIndex = "userMutationsIndex", t.userMutationsKeyPath = ["userId", "batchId"], t
                }();
            var xs = function() {
                function t() {}
                return t.prefixForUser = function(t) {
                    return [t]
                }, t.prefixForPath = function(t, e) {
                    return [t, ja(e)]
                }, t.key = function(t, e, n) {
                    return [t, ja(e), n]
                }, t.store = "documentMutations", t.PLACEHOLDER = new t, t
            }();
            var qs = function(t, e) {
                    this.path = t, this.readTime = e
                },
                Fs = function(t, e) {
                    this.path = t, this.version = e
                },
                Vs = function() {
                    function t(t, e, n, r) {
                        this.unknownDocument = t, this.noDocument = e, this.document = n, this.hasCommittedMutations = r
                    }
                    return t.store = "remoteDocuments", t
                }(),
                Bs = function() {
                    function t(t) {
                        this.byteSize = t
                    }
                    return t.store = "remoteDocumentGlobal", t.key = "remoteDocumentGlobalKey", t
                }();
            var Us = function() {
                    function t(t, e, n, r, i, o) {
                        this.targetId = t, this.canonicalId = e, this.readTime = n, this.resumeToken = r, this.lastListenSequenceNumber = i, this.query = o
                    }
                    return t.store = "targets", t.keyPath = "targetId", t.queryTargetsIndexName = "queryTargetsIndex", t.queryTargetsKeyPath = ["canonicalId", "targetId"], t
                }(),
                Qs = function() {
                    function t(t, e, n) {
                        this.targetId = t, this.path = e, Mr(0 === t == (void 0 !== (this.sequenceNumber = n)), "A target-document row must either have targetId == 0 and a defined sequence number, or a non-zero targetId and no sequence number")
                    }
                    return t.store = "targetDocuments", t.keyPath = ["targetId", "path"], t.documentTargetsIndex = "documentTargetsIndex", t.documentTargetsKeyPath = ["path", "targetId"], t
                }(),
                Ks = function() {
                    function t(t, e, n, r) {
                        this.highestTargetId = t, this.highestListenSequenceNumber = e, this.lastRemoteSnapshotVersion = n, this.targetCount = r
                    }
                    return t.key = "targetGlobalKey", t.store = "targetGlobal", t
                }(),
                js = function() {
                    function t(t, e) {
                        this.collectionId = t, this.parent = e
                    }
                    return t.store = "collectionParents", t.keyPath = ["collectionId", "parent"], t
                }();

            function Gs(t) {
                t.createObjectStore(Qs.store, {
                    keyPath: Qs.keyPath
                }).createIndex(Qs.documentTargetsIndex, Qs.documentTargetsKeyPath, {
                    unique: !0
                }), t.createObjectStore(Us.store, {
                    keyPath: Us.keyPath
                }).createIndex(Us.queryTargetsIndexName, Us.queryTargetsKeyPath, {
                    unique: !0
                }), t.createObjectStore(Ks.store)
            }
            var Ws = function() {
                function t(t) {
                    this.changes = t
                }
                return t.store = "remoteDocumentChanges", t.keyPath = "id", t
            }();
            var zs = function() {
                function t(t, e, n, r, i) {
                    this.clientId = t, this.updateTimeMs = e, this.networkEnabled = n, this.inForeground = r, this.lastProcessedDocumentChangeId = i
                }
                return t.store = "clientMetadata", t.keyPath = "clientId", t
            }();
            var Hs = [Ps.store, Ls.store, xs.store, Vs.store, Us.store, _s.store, Ks.store, Qs.store].concat([zs.store, Ws.store]).concat([Bs.store]).concat([js.store]),
                Ys = function() {
                    function t() {
                        this.collectionParentsCache = new ks
                    }
                    return t.prototype.addToCollectionParentIndex = function(t, e) {
                        if (Mr(e.length % 2 == 1, "Expected a collection path."), this.collectionParentsCache.add(e)) {
                            Mr(1 <= e.length, "Invalid collection path.");
                            var n = e.lastSegment(),
                                r = e.popLast();
                            return Xs(t).put({
                                collectionId: n,
                                parent: ja(r)
                            })
                        }
                        return Xa.resolve()
                    }, t.prototype.getCollectionParents = function(t, i) {
                        var o = [],
                            e = IDBKeyRange.bound([i, ""], [ci(i), ""], !1, !0);
                        return Xs(t).loadAll(e).next(function(t) {
                            for (var e = 0, n = t; e < n.length; e++) {
                                var r = n[e];
                                if (r.collectionId !== i) break;
                                o.push(za(r.parent))
                            }
                            return o
                        })
                    }, t
                }();

            function Xs(t) {
                return uu.getStore(t, js.store)
            }
            var Js = function() {
                function t(t) {
                    this.remoteSerializer = t
                }
                return t.prototype.fromDbRemoteDocument = function(t) {
                    if (t.document) return this.remoteSerializer.fromDocument(t.document, !!t.hasCommittedMutations);
                    if (t.noDocument) {
                        var e = Ai.fromSegments(t.noDocument.path),
                            n = this.fromDbTimestamp(t.noDocument.readTime);
                        return new Mi(e, n, {
                            hasCommittedMutations: !!t.hasCommittedMutations
                        })
                    }
                    if (t.unknownDocument) {
                        e = Ai.fromSegments(t.unknownDocument.path), n = this.fromDbTimestamp(t.unknownDocument.version);
                        return new Oi(e, n)
                    }
                    return Rr("Unexpected DbRemoteDocument")
                }, t.prototype.toDbRemoteDocument = function(t) {
                    if (t instanceof Ri) {
                        var e = t.proto ? t.proto : this.remoteSerializer.toDocument(t),
                            n = t.hasCommittedMutations;
                        return new Vs(null, null, e, n)
                    }
                    if (t instanceof Mi) {
                        var r = t.key.path.toArray(),
                            i = this.toDbTimestamp(t.version);
                        n = t.hasCommittedMutations;
                        return new Vs(null, new qs(r, i), null, n)
                    }
                    if (t instanceof Oi) {
                        r = t.key.path.toArray(), i = this.toDbTimestamp(t.version);
                        return new Vs(new Fs(r, i), null, null, !0)
                    }
                    return Rr("Unexpected MaybeDocumment")
                }, t.prototype.toDbTimestamp = function(t) {
                    var e = t.toTimestamp();
                    return new Os(e.seconds, e.nanoseconds)
                }, t.prototype.fromDbTimestamp = function(t) {
                    var e = new bi(t.seconds, t.nanoseconds);
                    return bo.fromTimestamp(e)
                }, t.prototype.toDbMutationBatch = function(t, e) {
                    var n = this,
                        r = e.baseMutations.map(function(t) {
                            return n.remoteSerializer.toMutation(t)
                        }),
                        i = e.mutations.map(function(t) {
                            return n.remoteSerializer.toMutation(t)
                        });
                    return new Ls(t, e.batchId, e.localWriteTime.toMillis(), r, i)
                }, t.prototype.fromDbMutationBatch = function(t) {
                    var e = this,
                        n = (t.baseMutations || []).map(function(t) {
                            return e.remoteSerializer.fromMutation(t)
                        }),
                        r = t.mutations.map(function(t) {
                            return e.remoteSerializer.fromMutation(t)
                        }),
                        i = bi.fromMillis(t.localWriteTimeMs);
                    return new Ha(t.batchId, i, n, r)
                }, t.prototype.toDbResourcePaths = function(t) {
                    var e = [];
                    return t.forEach(function(t) {
                        e.push(ja(t.path))
                    }), e
                }, t.prototype.fromDbResourcePaths = function(t) {
                    for (var e = $o(), n = 0, r = t; n < r.length; n++) {
                        var i = r[n];
                        e = e.add(new Ai(za(i)))
                    }
                    return e
                }, t.prototype.fromDbTarget = function(t) {
                    var e, n = this.fromDbTimestamp(t.readTime);
                    return e = void 0 !== t.query.documents ? this.remoteSerializer.fromDocumentsTarget(t.query) : this.remoteSerializer.fromQueryTarget(t.query), new So(e, t.targetId, oo.Listen, t.lastListenSequenceNumber, n, t.resumeToken)
                }, t.prototype.toDbTarget = function(t) {
                    Mr(oo.Listen === t.purpose, "Only queries with purpose " + oo.Listen + " may be stored, got " + t.purpose);
                    var e, n, r = this.toDbTimestamp(t.snapshotVersion);
                    return e = t.query.isDocumentQuery() ? this.remoteSerializer.toDocumentsTarget(t.query) : this.remoteSerializer.toQueryTarget(t.query), n = t.resumeToken instanceof Uint8Array ? (Mr("YES" === process.env.USE_MOCK_PERSISTENCE, "Persisting non-string stream tokens is only supported with mock persistence ."), t.resumeToken.toString()) : t.resumeToken, new Us(t.targetId, t.query.canonicalId(), r, n, t.sequenceNumber, e)
                }, t
            }();

            function $s(t, e) {
                var n = t[0],
                    r = t[1],
                    i = e[0],
                    o = e[1],
                    a = si(n, i);
                return 0 === a ? si(r, o) : a
            }
            var Zs = function() {
                    function t(t) {
                        this.maxElements = t, this.buffer = new To($s), this.previousIndex = 0
                    }
                    return t.prototype.nextIndex = function() {
                        return ++this.previousIndex
                    }, t.prototype.addElement = function(t) {
                        var e = [t, this.nextIndex()];
                        if (this.buffer.size < this.maxElements) this.buffer = this.buffer.add(e);
                        else {
                            var n = this.buffer.last();
                            $s(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e))
                        }
                    }, Object.defineProperty(t.prototype, "maxValue", {
                        get: function() {
                            return this.buffer.last()[0]
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t
                }(),
                tu = {
                    didRun: !1,
                    sequenceNumbersCollected: 0,
                    targetsRemoved: 0,
                    documentsRemoved: 0
                },
                eu = function() {
                    function e(t, e, n) {
                        this.cacheSizeCollectionThreshold = t, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n
                    }
                    return e.withCacheSize = function(t) {
                        return new e(t, e.DEFAULT_COLLECTION_PERCENTILE, e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)
                    }, e.COLLECTION_DISABLED = -1, e.MINIMUM_CACHE_SIZE_BYTES = 1048576, e.DEFAULT = new e(e.DEFAULT_CACHE_SIZE_BYTES = 41943040, e.DEFAULT_COLLECTION_PERCENTILE = 10, e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3), e.DISABLED = new e(e.COLLECTION_DISABLED, 0, 0), e
                }(),
                nu = function() {
                    function t(t, e, n) {
                        this.garbageCollector = t, this.asyncQueue = e, this.localStore = n, this.gcTask = null
                    }
                    return t.prototype.start = function() {
                        Mr(null === this.gcTask, "Cannot start an already started LruScheduler"), this.garbageCollector.params.cacheSizeCollectionThreshold !== eu.COLLECTION_DISABLED && this.scheduleGC()
                    }, t.prototype.stop = function() {
                        this.gcTask && (this.gcTask.cancel(), this.gcTask = null)
                    }, Object.defineProperty(t.prototype, "started", {
                        get: function() {
                            return null !== this.gcTask
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.scheduleGC = function() {
                        var t = this;
                        Mr(null === this.gcTask, "Cannot schedule GC while a task is pending");
                        var e = this.hasRun ? 3e5 : 6e4;
                        Nr("LruGarbageCollector", "Garbage collection scheduled in " + e + "ms"), this.gcTask = this.asyncQueue.enqueueAfterDelay(Pa.LruGarbageCollection, e, function() {
                            return t.gcTask = null, t.hasRun = !0, t.localStore.collectGarbage(t.garbageCollector).then(function() {
                                return t.scheduleGC()
                            }).catch(cu)
                        })
                    }, t
                }(),
                ru = function() {
                    function t(t, e) {
                        this.delegate = t, this.params = e
                    }
                    return t.prototype.calculateTargetCount = function(t, e) {
                        return this.delegate.getSequenceNumberCount(t).next(function(t) {
                            return Math.floor(e / 100 * t)
                        })
                    }, t.prototype.nthSequenceNumber = function(t, e) {
                        var n = this;
                        if (0 === e) return Xa.resolve(xa.INVALID);
                        var r = new Zs(e);
                        return this.delegate.forEachTarget(t, function(t) {
                            return r.addElement(t.sequenceNumber)
                        }).next(function() {
                            return n.delegate.forEachOrphanedDocumentSequenceNumber(t, function(t) {
                                return r.addElement(t)
                            })
                        }).next(function() {
                            return r.maxValue
                        })
                    }, t.prototype.removeTargets = function(t, e, n) {
                        return this.delegate.removeTargets(t, e, n)
                    }, t.prototype.removeOrphanedDocuments = function(t, e) {
                        return this.delegate.removeOrphanedDocuments(t, e)
                    }, t.prototype.collect = function(e, n) {
                        var r = this;
                        return this.params.cacheSizeCollectionThreshold === eu.COLLECTION_DISABLED ? (Nr("LruGarbageCollector", "Garbage collection skipped; disabled"), Xa.resolve(tu)) : this.getCacheSize(e).next(function(t) {
                            return t < r.params.cacheSizeCollectionThreshold ? (Nr("LruGarbageCollector", "Garbage collection skipped; Cache size " + t + " is lower than threshold " + r.params.cacheSizeCollectionThreshold), tu) : r.runGarbageCollection(e, n)
                        })
                    }, t.prototype.getCacheSize = function(t) {
                        return this.delegate.getCacheSize(t)
                    }, t.prototype.runGarbageCollection = function(e, n) {
                        var r, i, o, a, s, u, c, h, l = this;
                        return a = Date.now(), this.calculateTargetCount(e, this.params.percentileToCollect).next(function(t) {
                            return i = t > l.params.maximumSequenceNumbersToCollect ? (Nr("LruGarbageCollector", "Capping sequence numbers to collect down to the maximum of " + l.params.maximumSequenceNumbersToCollect + " from " + t), l.params.maximumSequenceNumbersToCollect) : t, s = Date.now(), l.nthSequenceNumber(e, i)
                        }).next(function(t) {
                            return r = t, u = Date.now(), l.removeTargets(e, r, n)
                        }).next(function(t) {
                            return o = t, c = Date.now(), l.removeOrphanedDocuments(e, r)
                        }).next(function(t) {
                            (h = Date.now(), Cr() <= wr.DEBUG) && Nr("LruGarbageCollector", "LRU Garbage Collection\n\tCounted targets in " + (s - a) + "ms\n\tDetermined least recently used " + i + " in " + (u - s) + "ms\n\tRemoved " + o + " targets in " + (c - u) + "ms\n\tRemoved " + t + " documents in " + (h - c) + "ms\nTotal Duration: " + (h - a) + "ms");
                            return Xa.resolve({
                                didRun: !0,
                                sequenceNumbersCollected: i,
                                targetsRemoved: o,
                                documentsRemoved: t
                            })
                        })
                    }, t
                }(),
                iu = "IndexedDbPersistence",
                ou = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",
                au = "Another tab has exclusive access to the persistence layer. To allow shared access, make sure to invoke `enablePersistence()` with `experimentalTabSynchronization:true` in all tabs.",
                su = function(r) {
                    function t(t, e) {
                        var n = r.call(this) || this;
                        return n.simpleDbTransaction = t, n.currentSequenceNumber = e, n
                    }
                    return s(t, r), t
                }(function() {}),
                uu = function() {
                    function c(t, e, n, r, i, o, a) {
                        if (this.persistenceKey = t, this.clientId = e, this.queue = r, this.multiClientParams = a, this._started = !1, this.isPrimary = !1, this.networkEnabled = !0, this.inForeground = !1, this.lastGarbageCollectionTime = Number.NEGATIVE_INFINITY, this.primaryStateListener = function(t) {
                                return Promise.resolve()
                            }, !c.isAvailable()) throw new Lr(Pr.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
                        if (this.referenceDelegate = new fu(this, o), this.dbName = t + c.MAIN_DATABASE, this.serializer = new Js(i), this.document = n.document, this.allowTabSynchronization = void 0 !== a, this.queryCache = new ps(this.referenceDelegate, this.serializer), this.indexManager = new Ys, this.remoteDocumentCache = new Es(this.serializer, this.indexManager, this.allowTabSynchronization), !n.window || !n.window.localStorage) throw new Lr(Pr.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
                        this.window = n.window, this.webStorage = this.window.localStorage
                    }
                    return c.getStore = function(t, e) {
                        if (t instanceof su) return us.getStore(t.simpleDbTransaction, e);
                        throw Rr("IndexedDbPersistence must use instances of IndexedDbTransaction")
                    }, c.createIndexedDbPersistence = function(n, r, i, o, a, s) {
                        return h(this, void 0, void 0, function() {
                            var e;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return [4, (e = new c(n, r, i, o, a, s)).start()];
                                    case 1:
                                        return t.sent(), [2, e]
                                }
                            })
                        })
                    }, c.createMultiClientIndexedDbPersistence = function(n, r, i, o, a, s, u) {
                        return h(this, void 0, void 0, function() {
                            var e;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return [4, (e = new c(n, r, i, o, a, s, u)).start()];
                                    case 1:
                                        return t.sent(), [2, e]
                                }
                            })
                        })
                    }, c.prototype.start = function() {
                        var n = this;
                        return Mr(!this.started, "IndexedDbPersistence double-started!"), Mr(null !== this.window, "Expected 'window' to be defined"), us.openOrCreate(this.dbName, Rs, new Ms(this.serializer)).then(function(t) {
                            return n.simpleDb = t, n.updateClientMetadataAndTryBecomePrimary()
                        }).then(function() {
                            return n.attachVisibilityHandler(), n.attachWindowUnloadHook(), n.scheduleClientMetadataAndPrimaryLeaseRefreshes(), n.startRemoteDocumentCache()
                        }).then(function() {
                            return n.simpleDb.runTransaction("readonly", [Ks.store], function(t) {
                                return ys(t).next(function(t) {
                                    var e = n.multiClientParams ? n.multiClientParams.sequenceNumberSyncer : void 0;
                                    n.listenSequence = new xa(t, e)
                                })
                            })
                        }).then(function() {
                            n._started = !0
                        }).catch(function(t) {
                            return n.simpleDb && n.simpleDb.close(), Promise.reject(t)
                        })
                    }, c.prototype.startRemoteDocumentCache = function() {
                        var e = this;
                        return this.simpleDb.runTransaction("readonly", Hs, function(t) {
                            return e.remoteDocumentCache.start(t)
                        })
                    }, c.prototype.setPrimaryStateListener = function(n) {
                        var t = this;
                        return this.primaryStateListener = function(e) {
                            return h(t, void 0, void 0, function() {
                                return p(this, function(t) {
                                    return this.started ? [2, n(e)] : [2]
                                })
                            })
                        }, n(this.isPrimary)
                    }, c.prototype.setNetworkEnabled = function(t) {
                        var e = this;
                        this.networkEnabled !== t && (this.networkEnabled = t, this.queue.enqueueAndForget(function() {
                            return h(e, void 0, void 0, function() {
                                return p(this, function(t) {
                                    switch (t.label) {
                                        case 0:
                                            return this.started ? [4, this.updateClientMetadataAndTryBecomePrimary()] : [3, 2];
                                        case 1:
                                            t.sent(), t.label = 2;
                                        case 2:
                                            return [2]
                                    }
                                })
                            })
                        }))
                    }, c.prototype.updateClientMetadataAndTryBecomePrimary = function() {
                        var r = this;
                        return this.simpleDb.runTransaction("readwrite", Hs, function(n) {
                            return lu(n).put(new zs(r.clientId, Date.now(), r.networkEnabled, r.inForeground, r.remoteDocumentCache.lastProcessedDocumentChangeId)).next(function() {
                                if (r.isPrimary) return r.verifyPrimaryLease(n).next(function(t) {
                                    t || (r.isPrimary = !1, r.queue.enqueueAndForget(function() {
                                        return r.primaryStateListener(!1)
                                    }))
                                })
                            }).next(function() {
                                return r.canActAsPrimary(n)
                            }).next(function(t) {
                                var e = r.isPrimary;
                                return r.isPrimary = t, e !== r.isPrimary && r.queue.enqueueAndForget(function() {
                                    return r.primaryStateListener(r.isPrimary)
                                }), e && !r.isPrimary ? r.releasePrimaryLeaseIfHeld(n) : r.isPrimary ? r.acquireOrExtendPrimaryLease(n) : void 0
                            })
                        })
                    }, c.prototype.verifyPrimaryLease = function(t) {
                        var e = this;
                        return hu(t).get(_s.key).next(function(t) {
                            return Xa.resolve(e.isLocalClient(t))
                        })
                    }, c.prototype.removeClientMetadata = function(t) {
                        return lu(t).delete(this.clientId)
                    }, c.prototype.maybeGarbageCollectMultiClientState = function() {
                        return h(this, void 0, void 0, function() {
                            var r, i, o = this;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return !this.isPrimary || this.isWithinAge(this.lastGarbageCollectionTime, 18e5) ? [3, 2] : (this.lastGarbageCollectionTime = Date.now(), i = [], [4, this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", function(n) {
                                            var e = c.getStore(n, zs.store);
                                            return e.loadAll().next(function(t) {
                                                r = o.filterActiveClients(t, 18e5), i = t.filter(function(t) {
                                                    return -1 === r.indexOf(t)
                                                })
                                            }).next(function() {
                                                return Xa.forEach(i, function(t) {
                                                    return e.delete(t.clientId)
                                                })
                                            }).next(function() {
                                                if (0 < (r = r.filter(function(t) {
                                                        return t.clientId !== o.clientId
                                                    })).length) {
                                                    var t = r.map(function(t) {
                                                            return t.lastProcessedDocumentChangeId || 0
                                                        }),
                                                        e = Math.min.apply(Math, t);
                                                    return o.remoteDocumentCache.removeDocumentChangesThroughChangeId(n, e)
                                                }
                                            })
                                        })]);
                                    case 1:
                                        t.sent(), i.forEach(function(t) {
                                            o.window.localStorage.removeItem(o.zombiedClientLocalStorageKey(t.clientId))
                                        }), t.label = 2;
                                    case 2:
                                        return [2]
                                }
                            })
                        })
                    }, c.prototype.scheduleClientMetadataAndPrimaryLeaseRefreshes = function() {
                        var t = this;
                        this.clientMetadataRefresher = this.queue.enqueueAfterDelay(Pa.ClientMetadataRefresh, 4e3, function() {
                            return t.updateClientMetadataAndTryBecomePrimary().then(function() {
                                return t.maybeGarbageCollectMultiClientState()
                            }).then(function() {
                                return t.scheduleClientMetadataAndPrimaryLeaseRefreshes()
                            })
                        })
                    }, c.prototype.isLocalClient = function(t) {
                        return !!t && t.ownerId === this.clientId
                    }, c.prototype.canActAsPrimary = function(e) {
                        var i = this;
                        return hu(e).get(_s.key).next(function(t) {
                            if (null !== t && i.isWithinAge(t.leaseTimestampMs, 5e3) && !i.isClientZombied(t.ownerId)) {
                                if (i.isLocalClient(t) && i.networkEnabled) return !0;
                                if (!i.isLocalClient(t)) {
                                    if (!t.allowTabSynchronization) throw new Lr(Pr.FAILED_PRECONDITION, au);
                                    return !1
                                }
                            }
                            return !(!i.networkEnabled || !i.inForeground) || lu(e).loadAll().next(function(t) {
                                return void 0 === i.filterActiveClients(t, 5e3).find(function(t) {
                                    if (i.clientId !== t.clientId) {
                                        var e = !i.networkEnabled && t.networkEnabled,
                                            n = !i.inForeground && t.inForeground,
                                            r = i.networkEnabled === t.networkEnabled;
                                        if (e || n && r) return !0
                                    }
                                    return !1
                                })
                            })
                        }).next(function(t) {
                            return i.isPrimary !== t && Nr(iu, "Client " + (t ? "is" : "is not") + " eligible for a primary lease."), t
                        })
                    }, c.prototype.shutdown = function() {
                        return h(this, void 0, void 0, function() {
                            var e = this;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this._started = !1, this.markClientZombied(), this.clientMetadataRefresher && this.clientMetadataRefresher.cancel(), this.detachVisibilityHandler(), this.detachWindowUnloadHook(), [4, this.simpleDb.runTransaction("readwrite", [_s.store, zs.store], function(t) {
                                            return e.releasePrimaryLeaseIfHeld(t).next(function() {
                                                return e.removeClientMetadata(t)
                                            })
                                        })];
                                    case 1:
                                        return t.sent(), this.simpleDb.close(), this.removeClientZombiedEntry(), [2]
                                }
                            })
                        })
                    }, c.prototype.filterActiveClients = function(t, e) {
                        var n = this;
                        return t.filter(function(t) {
                            return n.isWithinAge(t.updateTimeMs, e) && !n.isClientZombied(t.clientId)
                        })
                    }, c.prototype.getActiveClients = function() {
                        var e = this;
                        return this.simpleDb.runTransaction("readonly", [zs.store], function(t) {
                            return lu(t).loadAll().next(function(t) {
                                return e.filterActiveClients(t, 18e5).map(function(t) {
                                    return t.clientId
                                })
                            })
                        })
                    }, c.clearPersistence = function(n) {
                        return h(this, void 0, void 0, function() {
                            var e;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return c.isAvailable() ? (e = n + c.MAIN_DATABASE, [4, us.delete(e)]) : [2, Promise.resolve()];
                                    case 1:
                                        return t.sent(), [2]
                                }
                            })
                        })
                    }, Object.defineProperty(c.prototype, "started", {
                        get: function() {
                            return this._started
                        },
                        enumerable: !0,
                        configurable: !0
                    }), c.prototype.getMutationQueue = function(t) {
                        return Mr(this.started, "Cannot initialize MutationQueue before persistence is started."), Ja.forUser(t, this.serializer, this.indexManager, this.referenceDelegate)
                    }, c.prototype.getQueryCache = function() {
                        return Mr(this.started, "Cannot initialize QueryCache before persistence is started."), this.queryCache
                    }, c.prototype.getRemoteDocumentCache = function() {
                        return Mr(this.started, "Cannot initialize RemoteDocumentCache before persistence is started."), this.remoteDocumentCache
                    }, c.prototype.getIndexManager = function() {
                        return Mr(this.started, "Cannot initialize IndexManager before persistence is started."), this.indexManager
                    }, c.prototype.runTransaction = function(n, t, r) {
                        var i = this;
                        return Nr(iu, "Starting transaction:", n), this.simpleDb.runTransaction("readonly" === t ? "readonly" : "readwrite", Hs, function(e) {
                            return "readwrite-primary" === t ? i.verifyPrimaryLease(e).next(function(t) {
                                if (!t) throw Ar("Failed to obtain primary lease for action '" + n + "'."), i.isPrimary = !1, i.queue.enqueueAndForget(function() {
                                    return i.primaryStateListener(!1)
                                }), new Lr(Pr.FAILED_PRECONDITION, ou);
                                return r(new su(e, i.listenSequence.next()))
                            }).next(function(t) {
                                return i.acquireOrExtendPrimaryLease(e).next(function() {
                                    return t
                                })
                            }) : i.verifyAllowTabSynchronization(e).next(function() {
                                return r(new su(e, i.listenSequence.next()))
                            })
                        })
                    }, c.prototype.verifyAllowTabSynchronization = function(t) {
                        var e = this;
                        return hu(t).get(_s.key).next(function(t) {
                            if (null !== t && e.isWithinAge(t.leaseTimestampMs, 5e3) && !e.isClientZombied(t.ownerId) && !e.isLocalClient(t) && !t.allowTabSynchronization) throw new Lr(Pr.FAILED_PRECONDITION, au)
                        })
                    }, c.prototype.acquireOrExtendPrimaryLease = function(t) {
                        var e = new _s(this.clientId, this.allowTabSynchronization, Date.now());
                        return hu(t).put(_s.key, e)
                    }, c.isAvailable = function() {
                        return us.isAvailable()
                    }, c.buildStoragePrefix = function(t) {
                        var e = t.databaseId.projectId;
                        return t.databaseId.isDefaultDatabase || (e += "." + t.databaseId.database), "firestore/" + t.persistenceKey + "/" + e + "/"
                    }, c.prototype.releasePrimaryLeaseIfHeld = function(t) {
                        var e = this,
                            n = hu(t);
                        return n.get(_s.key).next(function(t) {
                            return e.isLocalClient(t) ? (Nr(iu, "Releasing primary lease."), n.delete(_s.key)) : Xa.resolve()
                        })
                    }, c.prototype.isWithinAge = function(t, e) {
                        var n = Date.now();
                        return !(t < n - e) && (!(n < t) || (Ar("Detected an update time that is in the future: " + t + " > " + n), !1))
                    }, c.prototype.attachVisibilityHandler = function() {
                        var t = this;
                        null !== this.document && "function" == typeof this.document.addEventListener && (this.documentVisibilityHandler = function() {
                            t.queue.enqueueAndForget(function() {
                                return t.inForeground = "visible" === t.document.visibilityState, t.updateClientMetadataAndTryBecomePrimary()
                            })
                        }, this.document.addEventListener("visibilitychange", this.documentVisibilityHandler), this.inForeground = "visible" === this.document.visibilityState)
                    }, c.prototype.detachVisibilityHandler = function() {
                        this.documentVisibilityHandler && (Mr(null !== this.document && "function" == typeof this.document.addEventListener, "Expected 'document.addEventListener' to be a function"), this.document.removeEventListener("visibilitychange", this.documentVisibilityHandler), this.documentVisibilityHandler = null)
                    }, c.prototype.attachWindowUnloadHook = function() {
                        var t = this;
                        "function" == typeof this.window.addEventListener && (this.windowUnloadHandler = function() {
                            t.markClientZombied(), t.queue.enqueueAndForget(function() {
                                return t.shutdown()
                            })
                        }, this.window.addEventListener("unload", this.windowUnloadHandler))
                    }, c.prototype.detachWindowUnloadHook = function() {
                        this.windowUnloadHandler && (Mr("function" == typeof this.window.removeEventListener, "Expected 'window.removeEventListener' to be a function"), this.window.removeEventListener("unload", this.windowUnloadHandler), this.windowUnloadHandler = null)
                    }, c.prototype.isClientZombied = function(t) {
                        try {
                            var e = null !== this.webStorage.getItem(this.zombiedClientLocalStorageKey(t));
                            return Nr(iu, "Client '" + t + "' " + (e ? "is" : "is not") + " zombied in LocalStorage"), e
                        } catch (t) {
                            return Ar(iu, "Failed to get zombied client id.", t), !1
                        }
                    }, c.prototype.markClientZombied = function() {
                        try {
                            this.webStorage.setItem(this.zombiedClientLocalStorageKey(this.clientId), String(Date.now()))
                        } catch (t) {
                            Ar("Failed to set zombie client id.", t)
                        }
                    }, c.prototype.removeClientZombiedEntry = function() {
                        try {
                            this.webStorage.removeItem(this.zombiedClientLocalStorageKey(this.clientId))
                        } catch (t) {}
                    }, c.prototype.zombiedClientLocalStorageKey = function(t) {
                        return "firestore_zombie_" + this.persistenceKey + "_" + t
                    }, c.MAIN_DATABASE = "main", c
                }();

            function cu(n) {
                return h(this, void 0, void 0, function() {
                    return p(this, function(t) {
                        if ((e = n).code !== Pr.FAILED_PRECONDITION || e.message !== ou) throw n;
                        var e;
                        return Nr(iu, "Unexpectedly lost primary lease"), [2]
                    })
                })
            }

            function hu(t) {
                return t.store(_s.store)
            }

            function lu(t) {
                return t.store(zs.store)
            }
            var fu = function() {
                function t(t, e) {
                    this.db = t, this.garbageCollector = new ru(this, e)
                }
                return t.prototype.getSequenceNumberCount = function(t) {
                    var n = this.orphanedDocmentCount(t);
                    return this.db.getQueryCache().getQueryCount(t).next(function(e) {
                        return n.next(function(t) {
                            return e + t
                        })
                    })
                }, t.prototype.orphanedDocmentCount = function(t) {
                    var e = 0;
                    return this.forEachOrphanedDocumentSequenceNumber(t, function(t) {
                        e++
                    }).next(function() {
                        return e
                    })
                }, t.prototype.forEachTarget = function(t, e) {
                    return this.db.getQueryCache().forEachTarget(t, e)
                }, t.prototype.forEachOrphanedDocumentSequenceNumber = function(t, n) {
                    return this.forEachOrphanedDocument(t, function(t, e) {
                        return n(e)
                    })
                }, t.prototype.setInMemoryPins = function(t) {
                    this.inMemoryPins = t
                }, t.prototype.addReference = function(t, e) {
                    return pu(t, e)
                }, t.prototype.removeReference = function(t, e) {
                    return pu(t, e)
                }, t.prototype.removeTargets = function(t, e, n) {
                    return this.db.getQueryCache().removeTargets(t, e, n)
                }, t.prototype.removeMutationReference = function(t, e) {
                    return pu(t, e)
                }, t.prototype.isPinned = function(t, e) {
                    return this.inMemoryPins.containsKey(e) ? Xa.resolve(!0) : (r = e, i = !1, rs(n = t).iterateSerial(function(t) {
                        return $a(n, t, r).next(function(t) {
                            return t && (i = !0), Xa.resolve(!t)
                        })
                    }).next(function() {
                        return i
                    }));
                    var n, r, i
                }, t.prototype.removeOrphanedDocuments = function(r, i) {
                    var o = this,
                        a = 0,
                        s = 0,
                        u = [];
                    return this.forEachOrphanedDocument(r, function(e, t) {
                        if (t <= i) {
                            var n = o.isPinned(r, e).next(function(t) {
                                if (!t) return a++, o.removeOrphanedDocument(r, e).next(function(t) {
                                    s += t
                                })
                            });
                            u.push(n)
                        }
                    }).next(function() {
                        return Xa.waitFor(u)
                    }).next(function() {
                        return o.db.getRemoteDocumentCache().updateSize(r, -s)
                    }).next(function() {
                        return a
                    })
                }, t.prototype.removeOrphanedDocument = function(t, e) {
                    var n, r = 0,
                        i = this.db.getRemoteDocumentCache();
                    return Xa.waitFor([gs(t).delete((n = e, [0, ja(n.path)])), i.removeEntry(t, e).next(function(t) {
                        r += t
                    })]).next(function() {
                        return r
                    })
                }, t.prototype.removeTarget = function(t, e) {
                    var n = e.copy({
                        sequenceNumber: t.currentSequenceNumber
                    });
                    return this.db.getQueryCache().updateQueryData(t, n)
                }, t.prototype.updateLimboDocument = function(t, e) {
                    return pu(t, e)
                }, t.prototype.forEachOrphanedDocument = function(t, o) {
                    var a, e = gs(t),
                        s = xa.INVALID;
                    return e.iterate({
                        index: Qs.documentTargetsIndex
                    }, function(t, e) {
                        var n = t[0],
                            r = (t[1], e.path),
                            i = e.sequenceNumber;
                        0 === n ? (s !== xa.INVALID && o(new Ai(za(a)), s), s = i, a = r) : s = xa.INVALID
                    }).next(function() {
                        s !== xa.INVALID && o(new Ai(za(a)), s)
                    })
                }, t.prototype.getCacheSize = function(t) {
                    return this.db.getRemoteDocumentCache().getSize(t)
                }, t
            }();

            function pu(t, e) {
                return gs(t).put((n = e, r = t.currentSequenceNumber, new Qs(0, ja(n.path), r)));
                var n, r
            }
            var du = function() {
                    function t(t, e, n) {
                        this.remoteDocumentCache = t, this.mutationQueue = e, this.indexManager = n
                    }
                    return t.prototype.getDocument = function(e, n) {
                        var r = this;
                        return this.mutationQueue.getAllMutationBatchesAffectingDocumentKey(e, n).next(function(t) {
                            return r.getDocumentInternal(e, n, t)
                        })
                    }, t.prototype.getDocumentInternal = function(t, r, i) {
                        return this.remoteDocumentCache.getEntry(t, r).next(function(t) {
                            for (var e = 0, n = i; e < n.length; e++) {
                                t = n[e].applyToLocalView(r, t)
                            }
                            return t
                        })
                    }, t.prototype.applyLocalMutationsToDocuments = function(t, e, i) {
                        var o = Wo();
                        return e.forEach(function(t, e) {
                            for (var n = 0, r = i; n < r.length; n++) {
                                e = r[n].applyToLocalView(t, e)
                            }
                            o = o.insert(t, e)
                        }), o
                    }, t.prototype.getDocuments = function(e, t) {
                        var n = this;
                        return this.remoteDocumentCache.getEntries(e, t).next(function(t) {
                            return n.getLocalViewOfDocuments(e, t)
                        })
                    }, t.prototype.getLocalViewOfDocuments = function(r, i) {
                        var o = this;
                        return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(r, i).next(function(t) {
                            var e = o.applyLocalMutationsToDocuments(r, i, t),
                                n = Go();
                            return e.forEach(function(t, e) {
                                e || (e = new Mi(t, bo.forDeletedDoc())), n = n.insert(t, e)
                            }), n
                        })
                    }, t.prototype.getDocumentsMatchingQuery = function(t, e) {
                        return e.isDocumentQuery() ? this.getDocumentsMatchingDocumentQuery(t, e.path) : e.isCollectionGroupQuery() ? this.getDocumentsMatchingCollectionGroupQuery(t, e) : this.getDocumentsMatchingCollectionQuery(t, e)
                    }, t.prototype.getDocumentsMatchingDocumentQuery = function(t, e) {
                        return this.getDocument(t, new Ai(e)).next(function(t) {
                            var e = Ho();
                            return t instanceof Ri && (e = e.insert(t.key, t)), e
                        })
                    }, t.prototype.getDocumentsMatchingCollectionGroupQuery = function(n, r) {
                        var i = this;
                        Mr(r.path.isEmpty(), "Currently we only support collection group queries at the root.");
                        var o = r.collectionGroup,
                            a = Ho();
                        return this.indexManager.getCollectionParents(n, o).next(function(t) {
                            return Xa.forEach(t, function(t) {
                                var e = r.asCollectionQueryAtPath(t.child(o));
                                return i.getDocumentsMatchingCollectionQuery(n, e).next(function(t) {
                                    t.forEach(function(t, e) {
                                        a = a.insert(t, e)
                                    })
                                })
                            }).next(function() {
                                return a
                            })
                        })
                    }, t.prototype.getDocumentsMatchingCollectionQuery = function(e, h) {
                        var l, n = this;
                        return this.remoteDocumentCache.getDocumentsMatchingQuery(e, h).next(function(t) {
                            return l = t, n.mutationQueue.getAllMutationBatchesAffectingQuery(e, h)
                        }).next(function(t) {
                            for (var e = 0, n = t; e < n.length; e++)
                                for (var r = n[e], i = 0, o = r.mutations; i < o.length; i++) {
                                    var a = o[i],
                                        s = a.key;
                                    if (h.path.isImmediateParentOf(s.path)) {
                                        var u = l.get(s),
                                            c = a.applyToLocalView(u, u, r.localWriteTime);
                                        l = c instanceof Ri ? l.insert(s, c) : l.remove(s)
                                    }
                                }
                        }).next(function() {
                            return l.forEach(function(t, e) {
                                h.matches(e) || (l = l.remove(t))
                            }), l
                        })
                    }, t
                }(),
                mu = function() {
                    function t() {
                        this.refsByKey = new To(yu.compareByKey), this.refsByTarget = new To(yu.compareByTargetId)
                    }
                    return t.prototype.isEmpty = function() {
                        return this.refsByKey.isEmpty()
                    }, t.prototype.addReference = function(t, e) {
                        var n = new yu(t, e);
                        this.refsByKey = this.refsByKey.add(n), this.refsByTarget = this.refsByTarget.add(n)
                    }, t.prototype.addReferences = function(t, e) {
                        var n = this;
                        t.forEach(function(t) {
                            return n.addReference(t, e)
                        })
                    }, t.prototype.removeReference = function(t, e) {
                        this.removeRef(new yu(t, e))
                    }, t.prototype.removeReferences = function(t, e) {
                        var n = this;
                        t.forEach(function(t) {
                            return n.removeReference(t, e)
                        })
                    }, t.prototype.removeReferencesForId = function(t) {
                        var e = this,
                            n = Ai.EMPTY,
                            r = new yu(n, t),
                            i = new yu(n, t + 1),
                            o = [];
                        return this.refsByTarget.forEachInRange([r, i], function(t) {
                            e.removeRef(t), o.push(t.key)
                        }), o
                    }, t.prototype.removeAllReferences = function() {
                        var e = this;
                        this.refsByKey.forEach(function(t) {
                            return e.removeRef(t)
                        })
                    }, t.prototype.removeRef = function(t) {
                        this.refsByKey = this.refsByKey.delete(t), this.refsByTarget = this.refsByTarget.delete(t)
                    }, t.prototype.referencesForId = function(t) {
                        var e = Ai.EMPTY,
                            n = new yu(e, t),
                            r = new yu(e, t + 1),
                            i = $o();
                        return this.refsByTarget.forEachInRange([n, r], function(t) {
                            i = i.add(t.key)
                        }), i
                    }, t.prototype.containsKey = function(t) {
                        var e = new yu(t, 0),
                            n = this.refsByKey.firstAfterOrEqual(e);
                        return null !== n && t.isEqual(n.key)
                    }, t
                }(),
                yu = function() {
                    function t(t, e) {
                        this.key = t, this.targetOrBatchId = e
                    }
                    return t.compareByKey = function(t, e) {
                        return Ai.comparator(t.key, e.key) || si(t.targetOrBatchId, e.targetOrBatchId)
                    }, t.compareByTargetId = function(t, e) {
                        return si(t.targetOrBatchId, e.targetOrBatchId) || Ai.comparator(t.key, e.key)
                    }, t
                }(),
                gu = function() {
                    function l(t, e) {
                        this.persistence = t, this.localViewReferences = new mu, this.queryDataByTarget = {}, Mr(t.started, "LocalStore was passed an unstarted persistence implementation"), this.persistence.referenceDelegate.setInMemoryPins(this.localViewReferences), this.mutationQueue = t.getMutationQueue(e), this.remoteDocuments = t.getRemoteDocumentCache(), this.queryCache = t.getQueryCache(), this.localDocuments = new du(this.remoteDocuments, this.mutationQueue, this.persistence.getIndexManager())
                    }
                    return l.prototype.handleUserChange = function(e) {
                        var y = this;
                        return this.persistence.runTransaction("Handle user change", "readonly", function(d) {
                            var m;
                            return y.mutationQueue.getAllMutationBatches(d).next(function(t) {
                                return m = t, y.mutationQueue = y.persistence.getMutationQueue(e), y.localDocuments = new du(y.remoteDocuments, y.mutationQueue, y.persistence.getIndexManager()), y.mutationQueue.getAllMutationBatches(d)
                            }).next(function(t) {
                                for (var e = [], n = [], r = $o(), i = 0, o = m; i < o.length; i++) {
                                    var a = o[i];
                                    e.push(a.batchId);
                                    for (var s = 0, u = a.mutations; s < u.length; s++) {
                                        var c = u[s];
                                        r = r.add(c.key)
                                    }
                                }
                                for (var h = 0, l = t; h < l.length; h++) {
                                    a = l[h];
                                    n.push(a.batchId);
                                    for (var f = 0, p = a.mutations; f < p.length; f++) {
                                        c = p[f];
                                        r = r.add(c.key)
                                    }
                                }
                                return y.localDocuments.getDocuments(d, r).next(function(t) {
                                    return {
                                        affectedDocuments: t,
                                        removedBatchIds: e,
                                        addedBatchIds: n
                                    }
                                })
                            })
                        })
                    }, l.prototype.localWrite = function(c) {
                        var h = this,
                            l = bi.now(),
                            t = c.reduce(function(t, e) {
                                return t.add(e.key)
                            }, $o());
                        return this.persistence.runTransaction("Locally write mutations", "readwrite", function(u) {
                            return h.localDocuments.getDocuments(u, t).next(function(n) {
                                for (var t = [], e = 0, r = c; e < r.length; e++) {
                                    var i = r[e],
                                        o = n.get(i.key);
                                    if (!i.isIdempotent) {
                                        var a = i.fieldMask;
                                        if (a) {
                                            var s = o instanceof Ri ? a.applyTo(o.data) : Ji.EMPTY;
                                            t.push(new Mo(i.key, s, a, Ao.exists(!0)))
                                        }
                                    }
                                }
                                return h.mutationQueue.addMutationBatch(u, l, t, c).next(function(t) {
                                    var e = t.applyToLocalDocumentSet(n);
                                    return {
                                        batchId: t.batchId,
                                        changes: e
                                    }
                                })
                            })
                        })
                    }, l.prototype.lookupMutationDocuments = function(t) {
                        var n = this;
                        return this.persistence.runTransaction("Lookup mutation documents", "readonly", function(e) {
                            return n.mutationQueue.lookupMutationKeys(e, t).next(function(t) {
                                return t ? n.localDocuments.getDocuments(e, t) : Xa.resolve(null)
                            })
                        })
                    }, l.prototype.acknowledgeBatch = function(r) {
                        var i = this;
                        return this.persistence.runTransaction("Acknowledge batch", "readwrite-primary", function(t) {
                            var e = r.batch.keys(),
                                n = i.remoteDocuments.newChangeBuffer();
                            return i.mutationQueue.acknowledgeBatch(t, r.batch, r.streamToken).next(function() {
                                return i.applyWriteToRemoteDocuments(t, r, n)
                            }).next(function() {
                                return n.apply(t)
                            }).next(function() {
                                return i.mutationQueue.performConsistencyCheck(t)
                            }).next(function() {
                                return i.localDocuments.getDocuments(t, e)
                            })
                        })
                    }, l.prototype.rejectBatch = function(t) {
                        var r = this;
                        return this.persistence.runTransaction("Reject batch", "readwrite-primary", function(e) {
                            var n;
                            return r.mutationQueue.lookupMutationBatch(e, t).next(function(t) {
                                return Mr(null !== t, "Attempt to reject nonexistent batch!"), n = t.keys(), r.mutationQueue.removeMutationBatch(e, t)
                            }).next(function() {
                                return r.mutationQueue.performConsistencyCheck(e)
                            }).next(function() {
                                return r.localDocuments.getDocuments(e, n)
                            })
                        })
                    }, l.prototype.getLastStreamToken = function() {
                        var e = this;
                        return this.persistence.runTransaction("Get last stream token", "readonly", function(t) {
                            return e.mutationQueue.getLastStreamToken(t)
                        })
                    }, l.prototype.setLastStreamToken = function(e) {
                        var n = this;
                        return this.persistence.runTransaction("Set last stream token", "readwrite-primary", function(t) {
                            return n.mutationQueue.setLastStreamToken(t, e)
                        })
                    }, l.prototype.getLastRemoteSnapshotVersion = function() {
                        var e = this;
                        return this.persistence.runTransaction("Get last remote snapshot version", "readonly", function(t) {
                            return e.queryCache.getLastRemoteSnapshotVersion(t)
                        })
                    }, l.prototype.applyRemoteEvent = function(u) {
                        var c = this,
                            h = this.remoteDocuments.newChangeBuffer();
                        return this.persistence.runTransaction("Apply remote event", "readwrite-primary", function(o) {
                            var a = [],
                                s = $o();
                            Vr(u.targetChanges, function(t, e) {
                                var n = c.queryDataByTarget[t];
                                if (n) {
                                    e.addedDocuments.forEach(function(t) {
                                        s = s.add(t)
                                    }), e.modifiedDocuments.forEach(function(t) {
                                        s = s.add(t)
                                    }), a.push(c.queryCache.removeMatchingKeys(o, e.removedDocuments, t).next(function() {
                                        return c.queryCache.addMatchingKeys(o, e.addedDocuments, t)
                                    }));
                                    var r = e.resumeToken;
                                    if (0 < r.length) {
                                        var i = n;
                                        n = n.copy({
                                            resumeToken: r,
                                            snapshotVersion: u.snapshotVersion
                                        }), c.queryDataByTarget[t] = n, l.shouldPersistQueryData(i, n, e) && a.push(c.queryCache.updateQueryData(o, n))
                                    }
                                }
                            });
                            var i = Go(),
                                n = $o();
                            u.documentUpdates.forEach(function(t, e) {
                                n = n.add(t)
                            }), a.push(h.getEntries(o, n).next(function(r) {
                                u.documentUpdates.forEach(function(t, e) {
                                    var n = r.get(t);
                                    null == n || e.version.isEqual(bo.MIN) || s.has(e.key) && !n.hasPendingWrites || 0 <= e.version.compareTo(n.version) ? (h.addEntry(e), i = i.insert(t, e)) : Nr("LocalStore", "Ignoring outdated watch update for ", t, ". Current version:", n.version, " Watch version:", e.version), u.resolvedLimboDocuments.has(t) && a.push(c.persistence.referenceDelegate.updateLimboDocument(o, t))
                                })
                            }));
                            var e = u.snapshotVersion;
                            if (!e.isEqual(bo.MIN)) {
                                var t = c.queryCache.getLastRemoteSnapshotVersion(o).next(function(t) {
                                    return Mr(0 <= e.compareTo(t), "Watch stream reverted to previous snapshot?? " + e + " < " + t), c.queryCache.setTargetsMetadata(o, o.currentSequenceNumber, e)
                                });
                                a.push(t)
                            }
                            return Xa.waitFor(a).next(function() {
                                return h.apply(o)
                            }).next(function() {
                                return c.localDocuments.getLocalViewOfDocuments(o, i)
                            })
                        })
                    }, l.shouldPersistQueryData = function(t, e, n) {
                        return 0 !== e.resumeToken.length && (0 === t.resumeToken.length || (e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= this.RESUME_TOKEN_MAX_AGE_MICROS || 0 < n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size))
                    }, l.prototype.notifyLocalViewChanges = function(t) {
                        var n = this;
                        return this.persistence.runTransaction("notifyLocalViewChanges", "readwrite", function(e) {
                            return Xa.forEach(t, function(t) {
                                return n.localViewReferences.addReferences(t.addedKeys, t.targetId), n.localViewReferences.removeReferences(t.removedKeys, t.targetId), Xa.forEach(t.removedKeys, function(t) {
                                    return n.persistence.referenceDelegate.removeReference(e, t)
                                })
                            })
                        })
                    }, l.prototype.nextMutationBatch = function(e) {
                        var n = this;
                        return this.persistence.runTransaction("Get next mutation batch", "readonly", function(t) {
                            return void 0 === e && (e = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(t, e)
                        })
                    }, l.prototype.readDocument = function(e) {
                        var n = this;
                        return this.persistence.runTransaction("read document", "readonly", function(t) {
                            return n.localDocuments.getDocument(t, e)
                        })
                    }, l.prototype.allocateQuery = function(r) {
                        var i = this;
                        return this.persistence.runTransaction("Allocate query", "readwrite", function(e) {
                            var n;
                            return i.queryCache.getQueryData(e, r).next(function(t) {
                                return t ? (n = t, Xa.resolve()) : i.queryCache.allocateTargetId(e).next(function(t) {
                                    return n = new So(r, t, oo.Listen, e.currentSequenceNumber), i.queryCache.addQueryData(e, n)
                                })
                            }).next(function() {
                                return Mr(!i.queryDataByTarget[n.targetId], "Tried to allocate an already allocated query: " + r), i.queryDataByTarget[n.targetId] = n
                            })
                        })
                    }, l.prototype.releaseQuery = function(o, a) {
                        var s = this,
                            t = a ? "readwrite" : "readwrite-primary";
                        return this.persistence.runTransaction("Release query", t, function(i) {
                            return s.queryCache.getQueryData(i, o).next(function(t) {
                                Mr(null != t, "Tried to release nonexistent query: " + o);
                                var e = t.targetId,
                                    n = s.queryDataByTarget[e],
                                    r = s.localViewReferences.removeReferencesForId(e);
                                return delete s.queryDataByTarget[e], a ? Xa.resolve() : Xa.forEach(r, function(t) {
                                    return s.persistence.referenceDelegate.removeReference(i, t)
                                }).next(function() {
                                    return s.persistence.referenceDelegate.removeTarget(i, n)
                                })
                            })
                        })
                    }, l.prototype.executeQuery = function(e) {
                        var n = this;
                        return this.persistence.runTransaction("Execute query", "readonly", function(t) {
                            return n.localDocuments.getDocumentsMatchingQuery(t, e)
                        })
                    }, l.prototype.remoteDocumentKeys = function(e) {
                        var n = this;
                        return this.persistence.runTransaction("Remote document keys", "readonly", function(t) {
                            return n.queryCache.getMatchingKeysForTargetId(t, e)
                        })
                    }, l.prototype.getActiveClients = function() {
                        return this.persistence.getActiveClients()
                    }, l.prototype.removeCachedMutationBatchMetadata = function(t) {
                        this.mutationQueue.removeCachedMutationKeys(t)
                    }, l.prototype.setNetworkEnabled = function(t) {
                        this.persistence.setNetworkEnabled(t)
                    }, l.prototype.applyWriteToRemoteDocuments = function(t, i, o) {
                        var e = this,
                            a = i.batch,
                            n = a.keys(),
                            s = Xa.resolve();
                        return n.forEach(function(r) {
                            s = s.next(function() {
                                return o.getEntry(t, r)
                            }).next(function(t) {
                                var e = t,
                                    n = i.docVersions.get(r);
                                Mr(null !== n, "ackVersions should contain every doc in the write."), (!e || e.version.compareTo(n) < 0) && ((e = a.applyToRemoteDocument(r, e, i)) ? o.addEntry(e) : Mr(!t, "Mutation batch " + a + " applied to document " + t + " resulted in null"))
                            })
                        }), s.next(function() {
                            return e.mutationQueue.removeMutationBatch(t, a)
                        })
                    }, l.prototype.collectGarbage = function(e) {
                        var n = this;
                        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", function(t) {
                            return e.collect(t, n.queryDataByTarget)
                        })
                    }, l.prototype.getQueryForTarget = function(e) {
                        var n = this;
                        return this.queryDataByTarget[e] ? Promise.resolve(this.queryDataByTarget[e].query) : this.persistence.runTransaction("Get query data", "readonly", function(t) {
                            return n.queryCache.getQueryDataForTarget(t, e).next(function(t) {
                                return t ? t.query : null
                            })
                        })
                    }, l.prototype.getNewDocumentChanges = function() {
                        var e = this;
                        return this.persistence.runTransaction("Get new document changes", "readonly", function(t) {
                            return e.remoteDocuments.getNewDocumentChanges(t)
                        })
                    }, l.RESUME_TOKEN_MAX_AGE_MICROS = 3e8, l
                }(),
                vu = function() {
                    function t(t, e) {
                        this.indexManager = t, this.referenceDelegate = e, this.mutationQueue = [], this.nextBatchId = 1, this.lastStreamToken = _r(), this.batchesByDocumentKey = new To(yu.compareByKey)
                    }
                    return t.prototype.checkEmpty = function(t) {
                        return Xa.resolve(0 === this.mutationQueue.length)
                    }, t.prototype.acknowledgeBatch = function(t, e, n) {
                        var r = e.batchId,
                            i = this.indexOfExistingBatchId(r, "acknowledged");
                        Mr(0 === i, "Can only acknowledge the first batch in the mutation queue");
                        var o = this.mutationQueue[i];
                        return Mr(r === o.batchId, "Queue ordering failure: expected batch " + r + ", got batch " + o.batchId), this.lastStreamToken = n, Xa.resolve()
                    }, t.prototype.getLastStreamToken = function(t) {
                        return Xa.resolve(this.lastStreamToken)
                    }, t.prototype.setLastStreamToken = function(t, e) {
                        return this.lastStreamToken = e, Xa.resolve()
                    }, t.prototype.addMutationBatch = function(t, e, n, r) {
                        Mr(0 !== r.length, "Mutation batches should not be empty");
                        var i = this.nextBatchId;
                        (this.nextBatchId++, 0 < this.mutationQueue.length) && Mr(this.mutationQueue[this.mutationQueue.length - 1].batchId < i, "Mutation batchIDs must be monotonically increasing order");
                        var o = new Ha(i, e, n, r);
                        this.mutationQueue.push(o);
                        for (var a = 0, s = r; a < s.length; a++) {
                            var u = s[a];
                            this.batchesByDocumentKey = this.batchesByDocumentKey.add(new yu(u.key, i)), this.indexManager.addToCollectionParentIndex(t, u.key.path.popLast())
                        }
                        return Xa.resolve(o)
                    }, t.prototype.lookupMutationBatch = function(t, e) {
                        return Xa.resolve(this.findMutationBatch(e))
                    }, t.prototype.lookupMutationKeys = function(t, e) {
                        var n = this.findMutationBatch(e);
                        return Mr(null != n, "Failed to find local mutation batch."), Xa.resolve(n.keys())
                    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
                        var n = e + 1,
                            r = this.indexOfBatchId(n),
                            i = r < 0 ? 0 : r;
                        return Xa.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null)
                    }, t.prototype.getAllMutationBatches = function(t) {
                        return Xa.resolve(this.mutationQueue.slice())
                    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, n) {
                        var r = this,
                            e = new yu(n, 0),
                            i = new yu(n, Number.POSITIVE_INFINITY),
                            o = [];
                        return this.batchesByDocumentKey.forEachInRange([e, i], function(t) {
                            Mr(n.isEqual(t.key), "Should only iterate over a single key's batches");
                            var e = r.findMutationBatch(t.targetOrBatchId);
                            Mr(null !== e, "Batches in the index must exist in the main table"), o.push(e)
                        }), Xa.resolve(o)
                    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
                        var r = this,
                            i = new To(si);
                        return e.forEach(function(e) {
                            var t = new yu(e, 0),
                                n = new yu(e, Number.POSITIVE_INFINITY);
                            r.batchesByDocumentKey.forEachInRange([t, n], function(t) {
                                Mr(e.isEqual(t.key), "For each key, should only iterate over a single key's batches"), i = i.add(t.targetOrBatchId)
                            })
                        }), Xa.resolve(this.findMutationBatches(i))
                    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
                        Mr(!e.isCollectionGroupQuery(), "CollectionGroup queries should be handled in LocalDocumentsView");
                        var n = e.path,
                            r = n.length + 1,
                            i = n;
                        Ai.isDocumentKey(i) || (i = i.child(""));
                        var o = new yu(new Ai(i), 0),
                            a = new To(si);
                        return this.batchesByDocumentKey.forEachWhile(function(t) {
                            var e = t.key.path;
                            return !!n.isPrefixOf(e) && (e.length === r && (a = a.add(t.targetOrBatchId)), !0)
                        }, o), Xa.resolve(this.findMutationBatches(a))
                    }, t.prototype.findMutationBatches = function(t) {
                        var n = this,
                            r = [];
                        return t.forEach(function(t) {
                            var e = n.findMutationBatch(t);
                            null !== e && r.push(e)
                        }), r
                    }, t.prototype.removeMutationBatch = function(n, r) {
                        var i = this;
                        Mr(0 === this.indexOfExistingBatchId(r.batchId, "removed"), "Can only remove the first entry of the mutation queue"), this.mutationQueue.shift();
                        var o = this.batchesByDocumentKey;
                        return Xa.forEach(r.mutations, function(t) {
                            var e = new yu(t.key, r.batchId);
                            return o = o.delete(e), i.referenceDelegate.removeMutationReference(n, t.key)
                        }).next(function() {
                            i.batchesByDocumentKey = o
                        })
                    }, t.prototype.removeCachedMutationKeys = function(t) {}, t.prototype.containsKey = function(t, e) {
                        var n = new yu(e, 0),
                            r = this.batchesByDocumentKey.firstAfterOrEqual(n);
                        return Xa.resolve(e.isEqual(r && r.key))
                    }, t.prototype.performConsistencyCheck = function(t) {
                        return 0 === this.mutationQueue.length && Mr(this.batchesByDocumentKey.isEmpty(), "Document leak -- detected dangling mutation references when queue is empty."), Xa.resolve()
                    }, t.prototype.indexOfExistingBatchId = function(t, e) {
                        var n = this.indexOfBatchId(t);
                        return Mr(0 <= n && n < this.mutationQueue.length, "Batches must exist to be " + e), n
                    }, t.prototype.indexOfBatchId = function(t) {
                        return 0 === this.mutationQueue.length ? 0 : t - this.mutationQueue[0].batchId
                    }, t.prototype.findMutationBatch = function(t) {
                        var e = this.indexOfBatchId(t);
                        if (e < 0 || e >= this.mutationQueue.length) return null;
                        var n = this.mutationQueue[e];
                        return Mr(n.batchId === t, "If found batch must match"), n
                    }, t
                }(),
                bu = function() {
                    function t(t) {
                        this.persistence = t, this.queries = new vs(function(t) {
                            return t.canonicalId()
                        }), this.lastRemoteSnapshotVersion = bo.MIN, this.highestTargetId = 0, this.highestSequenceNumber = 0, this.references = new mu, this.targetCount = 0, this.targetIdGenerator = as.forQueryCache()
                    }
                    return t.prototype.getTargetCount = function(t) {
                        return Xa.resolve(this.targetCount)
                    }, t.prototype.forEachTarget = function(t, n) {
                        return this.queries.forEach(function(t, e) {
                            return n(e)
                        }), Xa.resolve()
                    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
                        return Xa.resolve(this.lastRemoteSnapshotVersion)
                    }, t.prototype.getHighestSequenceNumber = function(t) {
                        return Xa.resolve(this.highestSequenceNumber)
                    }, t.prototype.allocateTargetId = function(t) {
                        var e = this.targetIdGenerator.after(this.highestTargetId);
                        return this.highestTargetId = e, Xa.resolve(e)
                    }, t.prototype.setTargetsMetadata = function(t, e, n) {
                        return n && (this.lastRemoteSnapshotVersion = n), e > this.highestSequenceNumber && (this.highestSequenceNumber = e), Xa.resolve()
                    }, t.prototype.saveQueryData = function(t) {
                        this.queries.set(t.query, t);
                        var e = t.targetId;
                        e > this.highestTargetId && (this.highestTargetId = e), t.sequenceNumber > this.highestSequenceNumber && (this.highestSequenceNumber = t.sequenceNumber)
                    }, t.prototype.addQueryData = function(t, e) {
                        return Mr(!this.queries.has(e.query), "Adding a query that already exists"), this.saveQueryData(e), this.targetCount += 1, Xa.resolve()
                    }, t.prototype.updateQueryData = function(t, e) {
                        return Mr(this.queries.has(e.query), "Updating a non-existent query"), this.saveQueryData(e), Xa.resolve()
                    }, t.prototype.removeQueryData = function(t, e) {
                        return Mr(0 < this.targetCount, "Removing a target from an empty cache"), Mr(this.queries.has(e.query), "Removing a non-existent target from the cache"), this.queries.delete(e.query), this.references.removeReferencesForId(e.targetId), this.targetCount -= 1, Xa.resolve()
                    }, t.prototype.removeTargets = function(n, r, i) {
                        var o = this,
                            a = 0,
                            s = [];
                        return this.queries.forEach(function(t, e) {
                            e.sequenceNumber <= r && !i[e.targetId] && (o.queries.delete(t), s.push(o.removeMatchingKeysForTargetId(n, e.targetId)), a++)
                        }), Xa.waitFor(s).next(function() {
                            return a
                        })
                    }, t.prototype.getQueryCount = function(t) {
                        return Xa.resolve(this.targetCount)
                    }, t.prototype.getQueryData = function(t, e) {
                        var n = this.queries.get(e) || null;
                        return Xa.resolve(n)
                    }, t.prototype.getQueryDataForTarget = function(t, e) {
                        return Rr("Not yet implemented.")
                    }, t.prototype.addMatchingKeys = function(e, t, n) {
                        this.references.addReferences(t, n);
                        var r = this.persistence.referenceDelegate,
                            i = [];
                        return r && t.forEach(function(t) {
                            i.push(r.addReference(e, t))
                        }), Xa.waitFor(i)
                    }, t.prototype.removeMatchingKeys = function(e, t, n) {
                        this.references.removeReferences(t, n);
                        var r = this.persistence.referenceDelegate,
                            i = [];
                        return r && t.forEach(function(t) {
                            i.push(r.removeReference(e, t))
                        }), Xa.waitFor(i)
                    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
                        return this.references.removeReferencesForId(e), Xa.resolve()
                    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
                        var n = this.references.referencesForId(e);
                        return Xa.resolve(n)
                    }, t.prototype.containsKey = function(t, e) {
                        return Xa.resolve(this.references.containsKey(e))
                    }, t
                }();
            var wu, Eu, Su = function() {
                    function t(t, e) {
                        this.indexManager = t, this.sizer = e, this.docs = new _i(Ai.comparator), this.newDocumentChanges = $o(), this.size = 0
                    }
                    return t.prototype.addEntries = function(t, e, n) {
                        for (var r = [], i = 0, o = e; i < o.length; i++) {
                            var a = o[i],
                                s = a.maybeDocument.key;
                            this.docs = this.docs.insert(s, a), this.newDocumentChanges = this.newDocumentChanges.add(s), r.push(this.indexManager.addToCollectionParentIndex(t, s.path.popLast()))
                        }
                        return this.size += n, Xa.waitFor(r)
                    }, t.prototype.removeEntry = function(t, e) {
                        var n = this.docs.get(e);
                        return n ? (this.docs = this.docs.remove(e), this.size -= n.size, Xa.resolve(n.size)) : Xa.resolve(0)
                    }, t.prototype.getEntry = function(t, e) {
                        var n = this.docs.get(e);
                        return Xa.resolve(n ? n.maybeDocument : null)
                    }, t.prototype.getSizedEntry = function(t, e) {
                        return Xa.resolve(this.docs.get(e))
                    }, t.prototype.getEntries = function(t, e) {
                        var n = this,
                            r = Wo();
                        return e.forEach(function(t) {
                            var e = n.docs.get(t);
                            r = r.insert(t, e ? e.maybeDocument : null)
                        }), Xa.resolve(r)
                    }, t.prototype.getSizedEntries = function(t, e) {
                        var n = this,
                            r = Wo(),
                            i = new _i(Ai.comparator);
                        return e.forEach(function(t) {
                            var e = n.docs.get(t);
                            r = r.insert(t, e ? e.maybeDocument : null), i = i.insert(t, e ? e.size : 0)
                        }), Xa.resolve({
                            maybeDocuments: r,
                            sizeMap: i
                        })
                    }, t.prototype.getDocumentsMatchingQuery = function(t, e) {
                        Mr(!e.isCollectionGroupQuery(), "CollectionGroup queries should be handled in LocalDocumentsView");
                        for (var n = Ho(), r = new Ai(e.path.child("")), i = this.docs.getIteratorFrom(r); i.hasNext();) {
                            var o = i.getNext(),
                                a = o.key,
                                s = o.value.maybeDocument;
                            if (!e.path.isPrefixOf(a.path)) break;
                            s instanceof Ri && e.matches(s) && (n = n.insert(s.key, s))
                        }
                        return Xa.resolve(n)
                    }, t.prototype.forEachDocumentKey = function(t, e) {
                        return Xa.forEach(this.docs, function(t) {
                            return e(t)
                        })
                    }, t.prototype.getNewDocumentChanges = function(t) {
                        var r = this,
                            i = Go();
                        return this.newDocumentChanges.forEach(function(t) {
                            var e = r.docs.get(t),
                                n = e ? e.maybeDocument : new Mi(t, bo.forDeletedDoc());
                            i = i.insert(t, n)
                        }), this.newDocumentChanges = $o(), Xa.resolve(i)
                    }, t.prototype.newChangeBuffer = function() {
                        return new Tu(this.sizer, this)
                    }, t.prototype.getSize = function(t) {
                        return Xa.resolve(this.size)
                    }, t
                }(),
                Tu = function(r) {
                    function t(t, e) {
                        var n = r.call(this) || this;
                        return n.sizer = t, n.documentCache = e, n
                    }
                    return s(t, r), t.prototype.applyChanges = function(t) {
                        var i = this,
                            e = this.assertChanges(),
                            o = 0,
                            a = [];
                        return e.forEach(function(t, e) {
                            var n = i.documentSizes.get(t);
                            Mr(void 0 !== n, "Attempting to change document " + t.toString() + " without having read it first");
                            var r = i.sizer(e);
                            o += r - n, a.push({
                                maybeDocument: e,
                                size: r
                            })
                        }), this.documentCache.addEntries(t, a, o)
                    }, t.prototype.getFromCache = function(t, e) {
                        return this.documentCache.getSizedEntry(t, e)
                    }, t.prototype.getAllFromCache = function(t, e) {
                        return this.documentCache.getSizedEntries(t, e)
                    }, t
                }(bs),
                Iu = function() {
                    function r(t, e) {
                        var n = this;
                        this.clientId = t, this.mutationQueues = {}, this.listenSequence = new xa(0), this._started = !1, this._started = !0, this.referenceDelegate = e(this), this.queryCache = new bu(this);
                        this.indexManager = new As, this.remoteDocumentCache = new Su(this.indexManager, function(t) {
                            return n.referenceDelegate.documentSize(t)
                        })
                    }
                    return r.createLruPersistence = function(t, e, n) {
                        return new r(t, function(t) {
                            return new Nu(t, new Js(e), n)
                        })
                    }, r.createEagerPersistence = function(t) {
                        return new r(t, function(t) {
                            return new Du(t)
                        })
                    }, r.prototype.shutdown = function() {
                        return this._started = !1, Promise.resolve()
                    }, Object.defineProperty(r.prototype, "started", {
                        get: function() {
                            return this._started
                        },
                        enumerable: !0,
                        configurable: !0
                    }), r.prototype.getActiveClients = function() {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                return [2, [this.clientId]]
                            })
                        })
                    }, r.prototype.setPrimaryStateListener = function(t) {
                        return t(!0)
                    }, r.prototype.setNetworkEnabled = function(t) {}, r.prototype.getIndexManager = function() {
                        return this.indexManager
                    }, r.prototype.getMutationQueue = function(t) {
                        var e = this.mutationQueues[t.toKey()];
                        return e || (e = new vu(this.indexManager, this.referenceDelegate), this.mutationQueues[t.toKey()] = e), e
                    }, r.prototype.getQueryCache = function() {
                        return this.queryCache
                    }, r.prototype.getRemoteDocumentCache = function() {
                        return this.remoteDocumentCache
                    }, r.prototype.runTransaction = function(t, e, n) {
                        var r = this;
                        Nr("MemoryPersistence", "Starting transaction:", t);
                        var i = new Cu(this.listenSequence.next());
                        return this.referenceDelegate.onTransactionStarted(), n(i).next(function(t) {
                            return r.referenceDelegate.onTransactionCommitted(i).next(function() {
                                return t
                            })
                        }).toPromise()
                    }, r.prototype.mutationQueuesContainKey = function(e, n) {
                        return Xa.or((t = this.mutationQueues, r = [], Br(t, function(t, e) {
                            return r.push(e)
                        }), r).map(function(t) {
                            return function() {
                                return t.containsKey(e, n)
                            }
                        }));
                        var t, r
                    }, r
                }(),
                Cu = function(t) {
                    this.currentSequenceNumber = t
                },
                Du = function() {
                    function t(t) {
                        this.persistence = t
                    }
                    return t.prototype.setInMemoryPins = function(t) {
                        this.inMemoryPins = t
                    }, t.prototype.addReference = function(t, e) {
                        return this.orphanedDocuments.delete(e), Xa.resolve()
                    }, t.prototype.removeReference = function(t, e) {
                        return this.orphanedDocuments.add(e), Xa.resolve()
                    }, t.prototype.removeMutationReference = function(t, e) {
                        return this.orphanedDocuments.add(e), Xa.resolve()
                    }, t.prototype.removeTarget = function(t, e) {
                        var n = this,
                            r = this.persistence.getQueryCache();
                        return r.getMatchingKeysForTargetId(t, e.targetId).next(function(t) {
                            t.forEach(function(t) {
                                return n.orphanedDocuments.add(t)
                            })
                        }).next(function() {
                            return r.removeQueryData(t, e)
                        })
                    }, t.prototype.onTransactionStarted = function() {
                        this.orphanedDocuments = new Set
                    }, t.prototype.onTransactionCommitted = function(n) {
                        var t = this,
                            r = this.persistence.getRemoteDocumentCache();
                        return Xa.forEach(this.orphanedDocuments, function(e) {
                            return t.isReferenced(n, e).next(function(t) {
                                return t ? Xa.resolve() : r.removeEntry(n, e).next(function() {})
                            })
                        })
                    }, t.prototype.updateLimboDocument = function(t, e) {
                        var n = this;
                        return this.isReferenced(t, e).next(function(t) {
                            t ? n.orphanedDocuments.delete(e) : n.orphanedDocuments.add(e)
                        })
                    }, t.prototype.documentSize = function(t) {
                        return 0
                    }, t.prototype.isReferenced = function(t, e) {
                        var n = this;
                        return Xa.or([function() {
                            return n.persistence.getQueryCache().containsKey(t, e)
                        }, function() {
                            return n.persistence.mutationQueuesContainKey(t, e)
                        }, function() {
                            return Xa.resolve(n.inMemoryPins.containsKey(e))
                        }])
                    }, t
                }(),
                Nu = function() {
                    function t(t, e, n) {
                        this.persistence = t, this.serializer = e, this.orphanedSequenceNumbers = new vs(function(t) {
                            return ja(t.path)
                        }), this.garbageCollector = new ru(this, n)
                    }
                    return t.prototype.onTransactionStarted = function() {}, t.prototype.onTransactionCommitted = function(t) {
                        return Xa.resolve()
                    }, t.prototype.forEachTarget = function(t, e) {
                        return this.persistence.getQueryCache().forEachTarget(t, e)
                    }, t.prototype.getSequenceNumberCount = function(t) {
                        var n = this.orphanedDocumentCount(t);
                        return this.persistence.getQueryCache().getTargetCount(t).next(function(e) {
                            return n.next(function(t) {
                                return e + t
                            })
                        })
                    }, t.prototype.orphanedDocumentCount = function(t) {
                        var e = 0;
                        return this.forEachOrphanedDocumentSequenceNumber(t, function(t) {
                            e++
                        }).next(function() {
                            return e
                        })
                    }, t.prototype.forEachOrphanedDocumentSequenceNumber = function(n, r) {
                        var i = this;
                        return Xa.forEach(this.orphanedSequenceNumbers, function(t, e) {
                            return i.isPinned(n, t, e).next(function(t) {
                                return t ? Xa.resolve() : r(e)
                            })
                        })
                    }, t.prototype.setInMemoryPins = function(t) {
                        this.inMemoryPins = t
                    }, t.prototype.removeTargets = function(t, e, n) {
                        return this.persistence.getQueryCache().removeTargets(t, e, n)
                    }, t.prototype.removeOrphanedDocuments = function(n, t) {
                        var r = this,
                            i = 0,
                            o = this.persistence.getRemoteDocumentCache();
                        return o.forEachDocumentKey(n, function(e) {
                            return r.isPinned(n, e, t).next(function(t) {
                                return t ? Xa.resolve() : (i++, o.removeEntry(n, e).next())
                            })
                        }).next(function() {
                            return i
                        })
                    }, t.prototype.removeMutationReference = function(t, e) {
                        return this.orphanedSequenceNumbers.set(e, t.currentSequenceNumber), Xa.resolve()
                    }, t.prototype.removeTarget = function(t, e) {
                        var n = e.copy({
                            sequenceNumber: t.currentSequenceNumber
                        });
                        return this.persistence.getQueryCache().updateQueryData(t, n)
                    }, t.prototype.addReference = function(t, e) {
                        return this.orphanedSequenceNumbers.set(e, t.currentSequenceNumber), Xa.resolve()
                    }, t.prototype.removeReference = function(t, e) {
                        return this.orphanedSequenceNumbers.set(e, t.currentSequenceNumber), Xa.resolve()
                    }, t.prototype.updateLimboDocument = function(t, e) {
                        return this.orphanedSequenceNumbers.set(e, t.currentSequenceNumber), Xa.resolve()
                    }, t.prototype.documentSize = function(t) {
                        var e, n = this.serializer.toDbRemoteDocument(t);
                        if (n.document) e = n.document;
                        else if (n.unknownDocument) e = n.unknownDocument;
                        else {
                            if (!n.noDocument) throw Rr("Unknown remote document type");
                            e = n.noDocument
                        }
                        return JSON.stringify(e).length
                    }, t.prototype.isPinned = function(t, e, n) {
                        var r = this;
                        return Xa.or([function() {
                            return r.persistence.mutationQueuesContainKey(t, e)
                        }, function() {
                            return Xa.resolve(r.inMemoryPins.containsKey(e))
                        }, function() {
                            return r.persistence.getQueryCache().containsKey(t, e)
                        }, function() {
                            var t = r.orphanedSequenceNumbers.get(e);
                            return Xa.resolve(void 0 !== t && n < t)
                        }])
                    }, t.prototype.getCacheSize = function(t) {
                        return this.persistence.getRemoteDocumentCache().getSize(t)
                    }, t
                }(),
                Au = function() {
                    function t(t, e, n, r, i) {
                        this.queue = t, this.timerId = e, this.initialDelayMs = n, this.backoffFactor = r, this.maxDelayMs = i, this.timerPromise = null, this.lastAttemptTime = Date.now(), this.reset()
                    }
                    return t.prototype.reset = function() {
                        this.currentBaseMs = 0
                    }, t.prototype.resetToMax = function() {
                        this.currentBaseMs = this.maxDelayMs
                    }, t.prototype.backoffAndRun = function(t) {
                        var e = this;
                        this.cancel();
                        var n = Math.floor(this.currentBaseMs + this.jitterDelayMs()),
                            r = Math.max(0, Date.now() - this.lastAttemptTime),
                            i = Math.max(0, n - r);
                        0 < this.currentBaseMs && Nr("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.currentBaseMs + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), this.timerPromise = this.queue.enqueueAfterDelay(this.timerId, i, function() {
                            return e.lastAttemptTime = Date.now(), t()
                        }), this.currentBaseMs *= this.backoffFactor, this.currentBaseMs < this.initialDelayMs && (this.currentBaseMs = this.initialDelayMs), this.currentBaseMs > this.maxDelayMs && (this.currentBaseMs = this.maxDelayMs)
                    }, t.prototype.cancel = function() {
                        null !== this.timerPromise && (this.timerPromise.cancel(), this.timerPromise = null)
                    }, t.prototype.jitterDelayMs = function() {
                        return (Math.random() - .5) * this.currentBaseMs
                    }, t
                }(),
                ku = "PersistentStream";
            (Eu = wu || (wu = {}))[Eu.Initial = 0] = "Initial", Eu[Eu.Starting = 1] = "Starting", Eu[Eu.Open = 2] = "Open", Eu[Eu.Error = 3] = "Error", Eu[Eu.Backoff = 4] = "Backoff";
            var Ru, Mu, Ou, _u, Pu = function() {
                    function t(t, e, n, r, i, o) {
                        this.queue = t, this.idleTimerId = n, this.connection = r, this.credentialsProvider = i, this.listener = o, this.state = wu.Initial, this.closeCount = 0, this.idleTimer = null, this.stream = null, this.backoff = new Au(t, e, 1e3, 1.5, 6e4)
                    }
                    return t.prototype.isStarted = function() {
                        return this.state === wu.Starting || this.state === wu.Open || this.state === wu.Backoff
                    }, t.prototype.isOpen = function() {
                        return this.state === wu.Open
                    }, t.prototype.start = function() {
                        this.state !== wu.Error ? (Mr(this.state === wu.Initial, "Already started"), this.auth()) : this.performBackoff()
                    }, t.prototype.stop = function() {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.isStarted() ? [4, this.close(wu.Initial)] : [3, 2];
                                    case 1:
                                        t.sent(), t.label = 2;
                                    case 2:
                                        return [2]
                                }
                            })
                        })
                    }, t.prototype.inhibitBackoff = function() {
                        Mr(!this.isStarted(), "Can only inhibit backoff in a stopped state"), this.state = wu.Initial, this.backoff.reset()
                    }, t.prototype.markIdle = function() {
                        var t = this;
                        this.isOpen() && null === this.idleTimer && (this.idleTimer = this.queue.enqueueAfterDelay(this.idleTimerId, 6e4, function() {
                            return t.handleIdleCloseTimer()
                        }))
                    }, t.prototype.sendRequest = function(t) {
                        this.cancelIdleCheck(), this.stream.send(t)
                    }, t.prototype.handleIdleCloseTimer = function() {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                return this.isOpen() ? [2, this.close(wu.Initial)] : [2]
                            })
                        })
                    }, t.prototype.cancelIdleCheck = function() {
                        this.idleTimer && (this.idleTimer.cancel(), this.idleTimer = null)
                    }, t.prototype.close = function(e, n) {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return Mr(this.isStarted(), "Only started streams should be closed."), Mr(e === wu.Error || ro(n), "Can't provide an error when not in an error state."), this.cancelIdleCheck(), this.backoff.cancel(), this.closeCount++, e !== wu.Error ? this.backoff.reset() : n && n.code === Pr.RESOURCE_EXHAUSTED ? (Ar(n.toString()), Ar("Using maximum backoff delay to prevent overloading the backend."), this.backoff.resetToMax()) : n && n.code === Pr.UNAUTHENTICATED && this.credentialsProvider.invalidateToken(), null !== this.stream && (this.tearDown(), this.stream.close(), this.stream = null), this.state = e, [4, this.listener.onClose(n)];
                                    case 1:
                                        return t.sent(), [2]
                                }
                            })
                        })
                    }, t.prototype.tearDown = function() {}, t.prototype.auth = function() {
                        var n = this;
                        Mr(this.state === wu.Initial, "Must be in initial state to auth"), this.state = wu.Starting;
                        var t = this.getCloseGuardedDispatcher(this.closeCount),
                            e = this.closeCount;
                        this.credentialsProvider.getToken().then(function(t) {
                            n.closeCount === e && n.startStream(t)
                        }, function(e) {
                            t(function() {
                                var t = new Lr(Pr.UNKNOWN, "Fetching auth token failed: " + e.message);
                                return n.handleStreamClose(t)
                            })
                        })
                    }, t.prototype.startStream = function(t) {
                        var e = this;
                        Mr(this.state === wu.Starting, "Trying to start stream in a non-starting state");
                        var n = this.getCloseGuardedDispatcher(this.closeCount);
                        this.stream = this.startRpc(t), this.stream.onOpen(function() {
                            n(function() {
                                return Mr(e.state === wu.Starting, "Expected stream to be in state Starting, but was " + e.state), e.state = wu.Open, e.listener.onOpen()
                            })
                        }), this.stream.onClose(function(t) {
                            n(function() {
                                return e.handleStreamClose(t)
                            })
                        }), this.stream.onMessage(function(t) {
                            n(function() {
                                return e.onMessage(t)
                            })
                        })
                    }, t.prototype.performBackoff = function() {
                        var t = this;
                        Mr(this.state === wu.Error, "Should only perform backoff when in Error state"), this.state = wu.Backoff, this.backoff.backoffAndRun(function() {
                            return h(t, void 0, void 0, function() {
                                return p(this, function(t) {
                                    return Mr(this.state === wu.Backoff, "Backoff elapsed but state is now: " + this.state), this.state = wu.Initial, this.start(), Mr(this.isStarted(), "PersistentStream should have started"), [2]
                                })
                            })
                        })
                    }, t.prototype.handleStreamClose = function(t) {
                        return Mr(this.isStarted(), "Can't handle server close on non-started stream"), Nr(ku, "close with error: " + t), this.stream = null, this.close(wu.Error, t)
                    }, t.prototype.getCloseGuardedDispatcher = function(e) {
                        var n = this;
                        return function(t) {
                            n.queue.enqueueAndForget(function() {
                                return n.closeCount === e ? t() : (Nr(ku, "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve())
                            })
                        }
                    }, t
                }(),
                Lu = function(a) {
                    function t(t, e, n, r, i) {
                        var o = a.call(this, t, Pa.ListenStreamConnectionBackoff, Pa.ListenStreamIdle, e, n, i) || this;
                        return o.serializer = r, o
                    }
                    return s(t, a), t.prototype.startRpc = function(t) {
                        return this.connection.openStream("Listen", t)
                    }, t.prototype.onMessage = function(t) {
                        this.backoff.reset();
                        var e = this.serializer.fromWatchChange(t),
                            n = this.serializer.versionFromListenResponse(t);
                        return this.listener.onWatchChange(e, n)
                    }, t.prototype.watch = function(t) {
                        var e = {};
                        e.database = this.serializer.encodedDatabaseId, e.addTarget = this.serializer.toTarget(t);
                        var n = this.serializer.toListenRequestLabels(t);
                        n && (e.labels = n), this.sendRequest(e)
                    }, t.prototype.unwatch = function(t) {
                        var e = {};
                        e.database = this.serializer.encodedDatabaseId, e.removeTarget = t, this.sendRequest(e)
                    }, t
                }(Pu),
                xu = function(a) {
                    function t(t, e, n, r, i) {
                        var o = a.call(this, t, Pa.WriteStreamConnectionBackoff, Pa.WriteStreamIdle, e, n, i) || this;
                        return o.serializer = r, o.handshakeComplete_ = !1, o
                    }
                    return s(t, a), Object.defineProperty(t.prototype, "handshakeComplete", {
                        get: function() {
                            return this.handshakeComplete_
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.start = function() {
                        this.handshakeComplete_ = !1, a.prototype.start.call(this)
                    }, t.prototype.tearDown = function() {
                        this.handshakeComplete_ && this.writeMutations([])
                    }, t.prototype.startRpc = function(t) {
                        return this.connection.openStream("Write", t)
                    }, t.prototype.onMessage = function(t) {
                        if (Mr(!!t.streamToken, "Got a write response without a stream token"), this.lastStreamToken = t.streamToken, this.handshakeComplete_) {
                            this.backoff.reset();
                            var e = this.serializer.fromWriteResults(t.writeResults, t.commitTime),
                                n = this.serializer.fromVersion(t.commitTime);
                            return this.listener.onMutationResult(n, e)
                        }
                        return Mr(!t.writeResults || 0 === t.writeResults.length, "Got mutation results for handshake"), this.handshakeComplete_ = !0, this.listener.onHandshakeComplete()
                    }, t.prototype.writeHandshake = function() {
                        Mr(this.isOpen(), "Writing handshake requires an opened stream"), Mr(!this.handshakeComplete_, "Handshake already completed");
                        var t = {};
                        t.database = this.serializer.encodedDatabaseId, this.sendRequest(t)
                    }, t.prototype.writeMutations = function(t) {
                        var e = this;
                        Mr(this.isOpen(), "Writing mutations requires an opened stream"), Mr(this.handshakeComplete_, "Handshake must be complete before writing mutations"), Mr(0 < this.lastStreamToken.length, "Trying to write mutation without a token");
                        var n = {
                            streamToken: this.lastStreamToken,
                            writes: t.map(function(t) {
                                return e.serializer.toMutation(t)
                            })
                        };
                        this.sendRequest(n)
                    }, t
                }(Pu),
                qu = function() {
                    function t(t, e, n, r) {
                        this.queue = t, this.connection = e, this.credentials = n, this.serializer = r
                    }
                    return t.prototype.newPersistentWriteStream = function(t) {
                        return new xu(this.queue, this.connection, this.credentials, this.serializer, t)
                    }, t.prototype.newPersistentWatchStream = function(t) {
                        return new Lu(this.queue, this.connection, this.credentials, this.serializer, t)
                    }, t.prototype.commit = function(t) {
                        var e = this,
                            n = {
                                database: this.serializer.encodedDatabaseId,
                                writes: t.map(function(t) {
                                    return e.serializer.toMutation(t)
                                })
                            };
                        return this.invokeRPC("Commit", n).then(function(t) {
                            return e.serializer.fromWriteResults(t.writeResults, t.commitTime)
                        })
                    }, t.prototype.lookup = function(e) {
                        var i = this,
                            t = {
                                database: this.serializer.encodedDatabaseId,
                                documents: e.map(function(t) {
                                    return i.serializer.toName(t)
                                })
                            };
                        return this.invokeStreamingRPC("BatchGetDocuments", t).then(function(t) {
                            var n = Go();
                            t.forEach(function(t) {
                                var e = i.serializer.fromMaybeDocument(t);
                                n = n.insert(e.key, e)
                            });
                            var r = [];
                            return e.forEach(function(t) {
                                var e = n.get(t);
                                Mr(!!e, "Missing entity in write response for " + t), r.push(e)
                            }), r
                        })
                    }, t.prototype.invokeRPC = function(e, n) {
                        var r = this;
                        return this.credentials.getToken().then(function(t) {
                            return r.connection.invokeRPC(e, n, t)
                        }).catch(function(t) {
                            throw t.code === Pr.UNAUTHENTICATED && r.credentials.invalidateToken(), t
                        })
                    }, t.prototype.invokeStreamingRPC = function(e, n) {
                        var r = this;
                        return this.credentials.getToken().then(function(t) {
                            return r.connection.invokeStreamingRPC(e, n, t)
                        }).catch(function(t) {
                            throw t.code === Pr.UNAUTHENTICATED && r.credentials.invalidateToken(), t
                        })
                    }, t
                }(),
                Fu = function() {
                    function t(t) {
                        this.datastore = t, this.readVersions = Xo(), this.mutations = [], this.committed = !1
                    }
                    return t.prototype.recordVersion = function(t) {
                        var e;
                        if (t instanceof Ri) e = t.version;
                        else {
                            if (!(t instanceof Mi)) throw Rr("Document in a transaction was a " + t.constructor.name);
                            e = bo.forDeletedDoc()
                        }
                        var n = this.readVersions.get(t.key);
                        if (null !== n) {
                            if (!e.isEqual(n)) throw new Lr(Pr.ABORTED, "Document version changed between two reads.")
                        } else this.readVersions = this.readVersions.insert(t.key, e)
                    }, t.prototype.lookup = function(t) {
                        var e = this;
                        return this.committed ? Promise.reject("Transaction has already completed.") : 0 < this.mutations.length ? Promise.reject("Transactions lookups are invalid after writes.") : this.datastore.lookup(t).then(function(t) {
                            return t.forEach(function(t) {
                                t instanceof Mi || t instanceof Ri ? e.recordVersion(t) : Rr("Document in a transaction was a " + t.constructor.name)
                            }), t
                        })
                    }, t.prototype.write = function(t) {
                        if (this.committed) throw new Lr(Pr.FAILED_PRECONDITION, "Transaction has already completed.");
                        this.mutations = this.mutations.concat(t)
                    }, t.prototype.precondition = function(t) {
                        var e = this.readVersions.get(t);
                        return e ? Ao.updateTime(e) : Ao.NONE
                    }, t.prototype.preconditionForUpdate = function(t) {
                        var e = this.readVersions.get(t);
                        if (e && e.isEqual(bo.forDeletedDoc())) throw new Lr(Pr.FAILED_PRECONDITION, "Can't update a document that doesn't exist.");
                        return e ? Ao.updateTime(e) : Ao.exists(!0)
                    }, t.prototype.set = function(t, e) {
                        this.write(e.toMutations(t, this.precondition(t)))
                    }, t.prototype.update = function(t, e) {
                        this.write(e.toMutations(t, this.preconditionForUpdate(t)))
                    }, t.prototype.delete = function(t) {
                        this.write([new _o(t, this.precondition(t))]), this.readVersions = this.readVersions.insert(t, bo.forDeletedDoc())
                    }, t.prototype.commit = function() {
                        var t = this,
                            e = this.readVersions;
                        return this.mutations.forEach(function(t) {
                            e = e.remove(t.key)
                        }), e.isEmpty() ? this.datastore.commit(this.mutations).then(function() {
                            t.committed = !0
                        }) : Promise.reject(Error("Every document read in a transaction must also be written."))
                    }, t
                }();
            (Mu = Ru || (Ru = {}))[Mu.Unknown = 0] = "Unknown", Mu[Mu.Online = 1] = "Online", Mu[Mu.Offline = 2] = "Offline", (_u = Ou || (Ou = {}))[_u.RemoteStore = 0] = "RemoteStore", _u[_u.SharedClientState = 1] = "SharedClientState";
            var Vu = function() {
                    function t(t, e) {
                        this.asyncQueue = t, this.onlineStateHandler = e, this.state = Ru.Unknown, this.watchStreamFailures = 0, this.onlineStateTimer = null, this.shouldWarnClientIsOffline = !0
                    }
                    return t.prototype.handleWatchStreamStart = function() {
                        var t = this;
                        0 === this.watchStreamFailures && (this.setAndBroadcast(Ru.Unknown), Mr(null === this.onlineStateTimer, "onlineStateTimer shouldn't be started yet"), this.onlineStateTimer = this.asyncQueue.enqueueAfterDelay(Pa.OnlineStateTimeout, 1e4, function() {
                            return t.onlineStateTimer = null, Mr(t.state === Ru.Unknown, "Timer should be canceled if we transitioned to a different state."), t.logClientOfflineWarningIfNecessary("Backend didn't respond within 10 seconds."), t.setAndBroadcast(Ru.Offline), Promise.resolve()
                        }))
                    }, t.prototype.handleWatchStreamFailure = function(t) {
                        this.state === Ru.Online ? (this.setAndBroadcast(Ru.Unknown), Mr(0 === this.watchStreamFailures, "watchStreamFailures must be 0"), Mr(null === this.onlineStateTimer, "onlineStateTimer must be null")) : (this.watchStreamFailures++, 1 <= this.watchStreamFailures && (this.clearOnlineStateTimer(), this.logClientOfflineWarningIfNecessary("Connection failed 1 times. Most recent error: " + t.toString()), this.setAndBroadcast(Ru.Offline)))
                    }, t.prototype.set = function(t) {
                        this.clearOnlineStateTimer(), this.watchStreamFailures = 0, t === Ru.Online && (this.shouldWarnClientIsOffline = !1), this.setAndBroadcast(t)
                    }, t.prototype.setAndBroadcast = function(t) {
                        t !== this.state && (this.state = t, this.onlineStateHandler(t))
                    }, t.prototype.logClientOfflineWarningIfNecessary = function(t) {
                        var e = "Could not reach Cloud Firestore backend. " + t + "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
                        this.shouldWarnClientIsOffline ? (Ar(e), this.shouldWarnClientIsOffline = !1) : Nr("OnlineStateTracker", e)
                    }, t.prototype.clearOnlineStateTimer = function() {
                        null !== this.onlineStateTimer && (this.onlineStateTimer.cancel(), this.onlineStateTimer = null)
                    }, t
                }(),
                Bu = "RemoteStore",
                Uu = function() {
                    function t(t, e, n, r) {
                        this.localStore = t, this.datastore = e, this.writePipeline = [], this.listenTargets = {}, this.watchChangeAggregator = null, this.networkEnabled = !1, this.isPrimary = !1, this.onlineStateTracker = new Vu(n, r), this.watchStream = this.datastore.newPersistentWatchStream({
                            onOpen: this.onWatchStreamOpen.bind(this),
                            onClose: this.onWatchStreamClose.bind(this),
                            onWatchChange: this.onWatchStreamChange.bind(this)
                        }), this.writeStream = this.datastore.newPersistentWriteStream({
                            onOpen: this.onWriteStreamOpen.bind(this),
                            onClose: this.onWriteStreamClose.bind(this),
                            onHandshakeComplete: this.onWriteHandshakeComplete.bind(this),
                            onMutationResult: this.onMutationResult.bind(this)
                        })
                    }
                    return t.prototype.start = function() {
                        return this.enableNetwork()
                    }, t.prototype.enableNetwork = function() {
                        return h(this, void 0, void 0, function() {
                            var e;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.networkEnabled = !0, this.canUseNetwork() ? (e = this.writeStream, [4, this.localStore.getLastStreamToken()]) : [3, 3];
                                    case 1:
                                        return e.lastStreamToken = t.sent(), this.shouldStartWatchStream() ? this.startWatchStream() : this.onlineStateTracker.set(Ru.Unknown), [4, this.fillWritePipeline()];
                                    case 2:
                                        t.sent(), t.label = 3;
                                    case 3:
                                        return [2]
                                }
                            })
                        })
                    }, t.prototype.disableNetwork = function() {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.networkEnabled = !1, [4, this.disableNetworkInternal()];
                                    case 1:
                                        return t.sent(), this.onlineStateTracker.set(Ru.Offline), [2]
                                }
                            })
                        })
                    }, t.prototype.disableNetworkInternal = function() {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return [4, this.writeStream.stop()];
                                    case 1:
                                        return t.sent(), [4, this.watchStream.stop()];
                                    case 2:
                                        return t.sent(), 0 < this.writePipeline.length && (Nr(Bu, "Stopping write stream with " + this.writePipeline.length + " pending writes"), this.writePipeline = []), this.cleanUpWatchStreamState(), [2]
                                }
                            })
                        })
                    }, t.prototype.shutdown = function() {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return Nr(Bu, "RemoteStore shutting down."), this.networkEnabled = !1, [4, this.disableNetworkInternal()];
                                    case 1:
                                        return t.sent(), this.onlineStateTracker.set(Ru.Unknown), [2]
                                }
                            })
                        })
                    }, t.prototype.listen = function(t) {
                        Mr(!qr(this.listenTargets, t.targetId), "listen called with duplicate targetId!"), this.listenTargets[t.targetId] = t, this.shouldStartWatchStream() ? this.startWatchStream() : this.watchStream.isOpen() && this.sendWatchRequest(t)
                    }, t.prototype.unlisten = function(t) {
                        Mr(qr(this.listenTargets, t), "unlisten called without assigned target ID!"), delete this.listenTargets[t], this.watchStream.isOpen() && this.sendUnwatchRequest(t), Ur(this.listenTargets) && (this.watchStream.isOpen() ? this.watchStream.markIdle() : this.canUseNetwork() && this.onlineStateTracker.set(Ru.Unknown))
                    }, t.prototype.getQueryDataForTarget = function(t) {
                        return this.listenTargets[t] || null
                    }, t.prototype.getRemoteKeysForTarget = function(t) {
                        return this.syncEngine.getRemoteKeysForTarget(t)
                    }, t.prototype.sendWatchRequest = function(t) {
                        this.watchChangeAggregator.recordPendingTargetRequest(t.targetId), this.watchStream.watch(t)
                    }, t.prototype.sendUnwatchRequest = function(t) {
                        this.watchChangeAggregator.recordPendingTargetRequest(t), this.watchStream.unwatch(t)
                    }, t.prototype.startWatchStream = function() {
                        Mr(this.shouldStartWatchStream(), "startWatchStream() called when shouldStartWatchStream() is false."), this.watchChangeAggregator = new ya(this), this.watchStream.start(), this.onlineStateTracker.handleWatchStreamStart()
                    }, t.prototype.shouldStartWatchStream = function() {
                        return this.canUseNetwork() && !this.watchStream.isStarted() && !Ur(this.listenTargets)
                    }, t.prototype.canUseNetwork = function() {
                        return this.isPrimary && this.networkEnabled
                    }, t.prototype.cleanUpWatchStreamState = function() {
                        this.watchChangeAggregator = null
                    }, t.prototype.onWatchStreamOpen = function() {
                        return h(this, void 0, void 0, function() {
                            var n = this;
                            return p(this, function(t) {
                                return Vr(this.listenTargets, function(t, e) {
                                    n.sendWatchRequest(e)
                                }), [2]
                            })
                        })
                    }, t.prototype.onWatchStreamClose = function(e) {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                return void 0 === e && Mr(!this.shouldStartWatchStream(), "Watch stream was stopped gracefully while still needed."), this.cleanUpWatchStreamState(), this.shouldStartWatchStream() ? (this.onlineStateTracker.handleWatchStreamFailure(e), this.startWatchStream()) : this.onlineStateTracker.set(Ru.Unknown), [2]
                            })
                        })
                    }, t.prototype.onWatchStreamChange = function(n, r) {
                        return h(this, void 0, void 0, function() {
                            var e;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.onlineStateTracker.set(Ru.Online), n instanceof da && n.state === aa.Removed && n.cause ? [2, this.handleTargetError(n)] : (n instanceof fa ? this.watchChangeAggregator.handleDocumentChange(n) : n instanceof pa ? this.watchChangeAggregator.handleExistenceFilter(n) : (Mr(n instanceof da, "Expected watchChange to be an instance of WatchTargetChange"), this.watchChangeAggregator.handleTargetChange(n)), r.isEqual(bo.MIN) ? [3, 3] : [4, this.localStore.getLastRemoteSnapshotVersion()]);
                                    case 1:
                                        return e = t.sent(), 0 <= r.compareTo(e) ? [4, this.raiseWatchSnapshot(r)] : [3, 3];
                                    case 2:
                                        t.sent(), t.label = 3;
                                    case 3:
                                        return [2]
                                }
                            })
                        })
                    }, t.prototype.raiseWatchSnapshot = function(r) {
                        var i = this;
                        Mr(!r.isEqual(bo.MIN), "Can't raise event for unknown SnapshotVersion");
                        var t = this.watchChangeAggregator.createRemoteEvent(r);
                        return Vr(t.targetChanges, function(t, e) {
                            if (0 < e.resumeToken.length) {
                                var n = i.listenTargets[t];
                                n && (i.listenTargets[t] = n.copy({
                                    resumeToken: e.resumeToken,
                                    snapshotVersion: r
                                }))
                            }
                        }), t.targetMismatches.forEach(function(t) {
                            var e = i.listenTargets[t];
                            if (e) {
                                i.listenTargets[t] = e.copy({
                                    resumeToken: _r()
                                }), i.sendUnwatchRequest(t);
                                var n = new So(e.query, t, oo.ExistenceFilterMismatch, e.sequenceNumber);
                                i.sendWatchRequest(n)
                            }
                        }), this.syncEngine.applyRemoteEvent(t)
                    }, t.prototype.handleTargetError = function(t) {
                        var n = this;
                        Mr(!!t.cause, "Handling target error without a cause");
                        var r = t.cause,
                            i = Promise.resolve();
                        return t.targetIds.forEach(function(e) {
                            i = i.then(function() {
                                return h(n, void 0, void 0, function() {
                                    return p(this, function(t) {
                                        return qr(this.listenTargets, e) ? (delete this.listenTargets[e], this.watchChangeAggregator.removeTarget(e), [2, this.syncEngine.rejectListen(e, r)]) : [2]
                                    })
                                })
                            })
                        }), i
                    }, t.prototype.fillWritePipeline = function() {
                        return h(this, void 0, void 0, function() {
                            var e, n;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.canAddToWritePipeline() ? (e = 0 < this.writePipeline.length ? this.writePipeline[this.writePipeline.length - 1].batchId : -1, [4, this.localStore.nextMutationBatch(e)]) : [3, 4];
                                    case 1:
                                        return null !== (n = t.sent()) ? [3, 2] : (0 === this.writePipeline.length && this.writeStream.markIdle(), [3, 4]);
                                    case 2:
                                        return this.addToWritePipeline(n), [4, this.fillWritePipeline()];
                                    case 3:
                                        t.sent(), t.label = 4;
                                    case 4:
                                        return this.shouldStartWriteStream() && this.startWriteStream(), [2]
                                }
                            })
                        })
                    }, t.prototype.canAddToWritePipeline = function() {
                        return this.canUseNetwork() && this.writePipeline.length < 10
                    }, t.prototype.outstandingWrites = function() {
                        return this.writePipeline.length
                    }, t.prototype.addToWritePipeline = function(t) {
                        Mr(this.canAddToWritePipeline(), "addToWritePipeline called when pipeline is full"), this.writePipeline.push(t), this.writeStream.isOpen() && this.writeStream.handshakeComplete && this.writeStream.writeMutations(t.mutations)
                    }, t.prototype.shouldStartWriteStream = function() {
                        return this.canUseNetwork() && !this.writeStream.isStarted() && 0 < this.writePipeline.length
                    }, t.prototype.startWriteStream = function() {
                        Mr(this.shouldStartWriteStream(), "startWriteStream() called when shouldStartWriteStream() is false."), this.writeStream.start()
                    }, t.prototype.onWriteStreamOpen = function() {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                return this.writeStream.writeHandshake(), [2]
                            })
                        })
                    }, t.prototype.onWriteHandshakeComplete = function() {
                        var r = this;
                        return this.localStore.setLastStreamToken(this.writeStream.lastStreamToken).then(function() {
                            for (var t = 0, e = r.writePipeline; t < e.length; t++) {
                                var n = e[t];
                                r.writeStream.writeMutations(n.mutations)
                            }
                        }).catch(cu)
                    }, t.prototype.onMutationResult = function(t, e) {
                        var n = this;
                        Mr(0 < this.writePipeline.length, "Got result for empty write pipeline");
                        var r = this.writePipeline.shift(),
                            i = Ya.from(r, t, e, this.writeStream.lastStreamToken);
                        return this.syncEngine.applySuccessfulWrite(i).then(function() {
                            return n.fillWritePipeline()
                        })
                    }, t.prototype.onWriteStreamClose = function(n) {
                        return h(this, void 0, void 0, function() {
                            var e = this;
                            return p(this, function(t) {
                                return void 0 === n && Mr(!this.shouldStartWriteStream(), "Write stream was stopped gracefully while still needed."), n && 0 < this.writePipeline.length ? (void 0, [2, (this.writeStream.handshakeComplete ? this.handleWriteError(n) : this.handleHandshakeError(n)).then(function() {
                                    e.shouldStartWriteStream() && e.startWriteStream()
                                })]) : [2]
                            })
                        })
                    }, t.prototype.handleHandshakeError = function(e) {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                return Qo(e.code) ? (Nr(Bu, "RemoteStore error before completed handshake; resetting stream token: ", this.writeStream.lastStreamToken), this.writeStream.lastStreamToken = _r(), [2, this.localStore.setLastStreamToken(_r()).catch(cu)]) : [2]
                            })
                        })
                    }, t.prototype.handleWriteError = function(i) {
                        return h(this, void 0, void 0, function() {
                            var n, r = this;
                            return p(this, function(t) {
                                return Qo(e = i.code) && e !== Pr.ABORTED ? (n = this.writePipeline.shift(), this.writeStream.inhibitBackoff(), [2, this.syncEngine.rejectFailedWrite(n.batchId, i).then(function() {
                                    return r.fillWritePipeline()
                                })]) : [2];
                                var e
                            })
                        })
                    }, t.prototype.createTransaction = function() {
                        return new Fu(this.datastore)
                    }, t.prototype.handleCredentialChange = function() {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.canUseNetwork() ? (Nr(Bu, "RemoteStore restarting streams for new credential"), this.networkEnabled = !1, [4, this.disableNetworkInternal()]) : [3, 3];
                                    case 1:
                                        return t.sent(), this.onlineStateTracker.set(Ru.Unknown), [4, this.enableNetwork()];
                                    case 2:
                                        t.sent(), t.label = 3;
                                    case 3:
                                        return [2]
                                }
                            })
                        })
                    }, t.prototype.applyPrimaryState = function(e) {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return (this.isPrimary = e) && this.networkEnabled ? [4, this.enableNetwork()] : [3, 2];
                                    case 1:
                                        return t.sent(), [3, 4];
                                    case 2:
                                        return e ? [3, 4] : [4, this.disableNetworkInternal()];
                                    case 3:
                                        t.sent(), this.onlineStateTracker.set(Ru.Unknown), t.label = 4;
                                    case 4:
                                        return [2]
                                }
                            })
                        })
                    }, t
                }(),
                Qu = function() {
                    this.listeners = []
                },
                Ku = function() {
                    function t(t) {
                        this.syncEngine = t, this.queries = new vs(function(t) {
                            return t.canonicalId()
                        }), this.onlineState = Ru.Unknown, this.syncEngine.subscribe(this)
                    }
                    return t.prototype.listen = function(t) {
                        var e = t.query,
                            n = !1,
                            r = this.queries.get(e);
                        return r || (n = !0, r = new Qu, this.queries.set(e, r)), r.listeners.push(t), t.applyOnlineStateChange(this.onlineState), r.viewSnap && t.onViewSnapshot(r.viewSnap), n ? this.syncEngine.listen(e).then(function(t) {
                            return r.targetId = t
                        }) : Promise.resolve(r.targetId)
                    }, t.prototype.unlisten = function(o) {
                        return h(this, void 0, void 0, function() {
                            var e, n, r, i;
                            return p(this, function(t) {
                                return e = o.query, n = !1, (r = this.queries.get(e)) && 0 <= (i = r.listeners.indexOf(o)) && (r.listeners.splice(i, 1), n = 0 === r.listeners.length), n ? (this.queries.delete(e), [2, this.syncEngine.unlisten(e)]) : [2]
                            })
                        })
                    }, t.prototype.onWatchChange = function(t) {
                        for (var e = 0, n = t; e < n.length; e++) {
                            var r = n[e],
                                i = r.query,
                                o = this.queries.get(i);
                            if (o) {
                                for (var a = 0, s = o.listeners; a < s.length; a++) {
                                    s[a].onViewSnapshot(r)
                                }
                                o.viewSnap = r
                            }
                        }
                    }, t.prototype.onWatchError = function(t, e) {
                        var n = this.queries.get(t);
                        if (n)
                            for (var r = 0, i = n.listeners; r < i.length; r++) {
                                i[r].onError(e)
                            }
                        this.queries.delete(t)
                    }, t.prototype.onOnlineStateChange = function(i) {
                        this.onlineState = i, this.queries.forEach(function(t, e) {
                            for (var n = 0, r = e.listeners; n < r.length; n++) {
                                r[n].applyOnlineStateChange(i)
                            }
                        })
                    }, t
                }(),
                ju = function() {
                    function t(t, e, n) {
                        this.query = t, this.queryObserver = e, this.raisedInitialEvent = !1, this.onlineState = Ru.Unknown, this.options = n || {}
                    }
                    return t.prototype.onViewSnapshot = function(t) {
                        if (Mr(0 < t.docChanges.length || t.syncStateChanged, "We got a new snapshot with no changes?"), !this.options.includeMetadataChanges) {
                            for (var e = [], n = 0, r = t.docChanges; n < r.length; n++) {
                                var i = r[n];
                                i.type !== ea.Metadata && e.push(i)
                            }
                            t = new ca(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, !0)
                        }
                        this.raisedInitialEvent ? this.shouldRaiseEvent(t) && this.queryObserver.next(t) : this.shouldRaiseInitialEvent(t, this.onlineState) && this.raiseInitialEvent(t), this.snap = t
                    }, t.prototype.onError = function(t) {
                        this.queryObserver.error(t)
                    }, t.prototype.applyOnlineStateChange = function(t) {
                        this.onlineState = t, this.snap && !this.raisedInitialEvent && this.shouldRaiseInitialEvent(this.snap, t) && this.raiseInitialEvent(this.snap)
                    }, t.prototype.shouldRaiseInitialEvent = function(t, e) {
                        if (Mr(!this.raisedInitialEvent, "Determining whether to raise first event but already had first event"), !t.fromCache) return !0;
                        var n = e !== Ru.Offline;
                        return this.options.waitForSyncWhenOnline && n ? (Mr(t.fromCache, "Waiting for sync, but snapshot is not from cache"), !1) : !t.docs.isEmpty() || e === Ru.Offline
                    }, t.prototype.shouldRaiseEvent = function(t) {
                        if (0 < t.docChanges.length) return !0;
                        var e = this.snap && this.snap.hasPendingWrites !== t.hasPendingWrites;
                        return !(!t.syncStateChanged && !e) && !0 === this.options.includeMetadataChanges
                    }, t.prototype.raiseInitialEvent = function(t) {
                        Mr(!this.raisedInitialEvent, "Trying to raise initial events for second time"), t = ca.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache), this.raisedInitialEvent = !0, this.queryObserver.next(t)
                    }, t
                }(),
                Gu = function() {
                    function s(t, e, n) {
                        this.targetId = t, this.addedKeys = e, this.removedKeys = n
                    }
                    return s.fromSnapshot = function(t, e) {
                        for (var n = $o(), r = $o(), i = 0, o = e.docChanges; i < o.length; i++) {
                            var a = o[i];
                            switch (a.type) {
                                case ea.Added:
                                    n = n.add(a.doc.key);
                                    break;
                                case ea.Removed:
                                    r = r.add(a.doc.key)
                            }
                        }
                        return new s(t, n, r)
                    }, s
                }(),
                Wu = function(t) {
                    this.key = t
                },
                zu = function(t) {
                    this.key = t
                },
                Hu = function() {
                    function t(t, e) {
                        this.query = t, this._syncedDocuments = e, this.syncState = null, this.current = !1, this.limboDocuments = $o(), this.mutatedKeys = $o(), this.documentSet = new oa(t.docComparator.bind(t))
                    }
                    return Object.defineProperty(t.prototype, "syncedDocuments", {
                        get: function() {
                            return this._syncedDocuments
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.computeDocChanges = function(t, e) {
                        var s = this,
                            u = e ? e.changeSet : new ua,
                            c = e ? e.documentSet : this.documentSet,
                            h = e ? e.mutatedKeys : this.mutatedKeys,
                            l = c,
                            f = !1,
                            p = this.query.hasLimit() && c.size === this.query.limit ? c.last() : null;
                        if (t.inorderTraversal(function(t, e) {
                                var n = c.get(t),
                                    r = e instanceof Ri ? e : null;
                                r && (Mr(t.isEqual(r.key), "Mismatching keys found in document changes: " + t + " != " + r.key), r = s.query.matches(r) ? r : null);
                                var i = !!n && s.mutatedKeys.has(n.key),
                                    o = !!r && (r.hasLocalMutations || s.mutatedKeys.has(r.key) && r.hasCommittedMutations),
                                    a = !1;
                                n && r ? n.data.isEqual(r.data) ? i !== o && (u.track({
                                    type: ea.Metadata,
                                    doc: r
                                }), a = !0) : s.shouldWaitForSyncedDocument(n, r) || (u.track({
                                    type: ea.Modified,
                                    doc: r
                                }), a = !0, p && 0 < s.query.docComparator(r, p) && (f = !0)) : !n && r ? (u.track({
                                    type: ea.Added,
                                    doc: r
                                }), a = !0) : n && !r && (u.track({
                                    type: ea.Removed,
                                    doc: n
                                }), a = !0, p && (f = !0));
                                a && (h = r ? (l = l.add(r), o ? h.add(t) : h.delete(t)) : (l = l.delete(t), h.delete(t)))
                            }), this.query.hasLimit())
                            for (; l.size > this.query.limit;) {
                                var n = l.last();
                                l = l.delete(n.key), h = h.delete(n.key), u.track({
                                    type: ea.Removed,
                                    doc: n
                                })
                            }
                        return Mr(!f || !e, "View was refilled using docs that themselves needed refilling."), {
                            documentSet: l,
                            changeSet: u,
                            needsRefill: f,
                            mutatedKeys: h
                        }
                    }, t.prototype.shouldWaitForSyncedDocument = function(t, e) {
                        return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations
                    }, t.prototype.applyChanges = function(t, e, n) {
                        var o = this;
                        Mr(!t.needsRefill, "Cannot apply changes that need a refill");
                        var r = this.documentSet;
                        this.documentSet = t.documentSet, this.mutatedKeys = t.mutatedKeys;
                        var i = t.changeSet.getChanges();
                        i.sort(function(t, e) {
                            return n = t.type, r = e.type, (i = function(t) {
                                switch (t) {
                                    case ea.Added:
                                        return 1;
                                    case ea.Modified:
                                    case ea.Metadata:
                                        return 2;
                                    case ea.Removed:
                                        return 0;
                                    default:
                                        return Rr("Unknown ChangeType: " + t)
                                }
                            })(n) - i(r) || o.query.docComparator(t.doc, e.doc);
                            var n, r, i
                        }), this.applyTargetChange(n);
                        var a = e ? this.updateLimboDocuments() : [],
                            s = 0 === this.limboDocuments.size && this.current ? ra.Synced : ra.Local,
                            u = s !== this.syncState;
                        return this.syncState = s, 0 !== i.length || u ? {
                            snapshot: new ca(this.query, t.documentSet, r, i, t.mutatedKeys, s === ra.Local, u, !1),
                            limboChanges: a
                        } : {
                            limboChanges: a
                        }
                    }, t.prototype.applyOnlineStateChange = function(t) {
                        return this.current && t === Ru.Offline ? (this.current = !1, this.applyChanges({
                            documentSet: this.documentSet,
                            changeSet: new ua,
                            mutatedKeys: this.mutatedKeys,
                            needsRefill: !1
                        }, !1)) : {
                            limboChanges: []
                        }
                    }, t.prototype.shouldBeInLimbo = function(t) {
                        return !this._syncedDocuments.has(t) && (!!this.documentSet.has(t) && !this.documentSet.get(t).hasLocalMutations)
                    }, t.prototype.applyTargetChange = function(t) {
                        var e = this;
                        t && (t.addedDocuments.forEach(function(t) {
                            return e._syncedDocuments = e._syncedDocuments.add(t)
                        }), t.modifiedDocuments.forEach(function(t) {
                            return Mr(e._syncedDocuments.has(t), "Modified document " + t + " not found in view.")
                        }), t.removedDocuments.forEach(function(t) {
                            return e._syncedDocuments = e._syncedDocuments.delete(t)
                        }), this.current = t.current)
                    }, t.prototype.updateLimboDocuments = function() {
                        var e = this;
                        if (!this.current) return [];
                        var n = this.limboDocuments;
                        this.limboDocuments = $o(), this.documentSet.forEach(function(t) {
                            e.shouldBeInLimbo(t.key) && (e.limboDocuments = e.limboDocuments.add(t.key))
                        });
                        var r = [];
                        return n.forEach(function(t) {
                            e.limboDocuments.has(t) || r.push(new zu(t))
                        }), this.limboDocuments.forEach(function(t) {
                            n.has(t) || r.push(new Wu(t))
                        }), r
                    }, t.prototype.synchronizeWithPersistedState = function(t, e) {
                        this._syncedDocuments = e, this.limboDocuments = $o();
                        var n = this.computeDocChanges(t);
                        return this.applyChanges(n, !0)
                    }, t.prototype.computeInitialSnapshot = function() {
                        return ca.fromInitialDocuments(this.query, this.documentSet, this.mutatedKeys, this.syncState === ra.Local)
                    }, t
                }();
            var Yu = "SyncEngine",
                Xu = function(t, e, n) {
                    this.query = t, this.targetId = e, this.view = n
                },
                Ju = function(t) {
                    this.key = t
                },
                $u = function() {
                    function t(t, e, n, r) {
                        this.localStore = t, this.remoteStore = e, this.sharedClientState = n, this.currentUser = r, this.syncEngineListener = null, this.queryViewsByQuery = new vs(function(t) {
                            return t.canonicalId()
                        }), this.queryViewsByTarget = {}, this.limboTargetsByKey = new _i(Ai.comparator), this.limboResolutionsByTarget = {}, this.limboDocumentRefs = new mu, this.mutationUserCallbacks = {}, this.limboTargetIdGenerator = as.forSyncEngine(), this.isPrimary = void 0, this.onlineState = Ru.Unknown
                    }
                    return Object.defineProperty(t.prototype, "isPrimaryClient", {
                        get: function() {
                            return !0 === this.isPrimary
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.subscribe = function(t) {
                        Mr(null !== t, "SyncEngine listener cannot be null"), Mr(null === this.syncEngineListener, "SyncEngine already has a subscriber."), this.syncEngineListener = t
                    }, t.prototype.listen = function(a) {
                        return h(this, void 0, void 0, function() {
                            var e, n, r, i, o;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.assertSubscribed("listen()"), (r = this.queryViewsByQuery.get(a)) ? (e = r.targetId, this.sharedClientState.addLocalQueryTarget(e), n = r.view.computeInitialSnapshot(), [3, 4]) : [3, 1];
                                    case 1:
                                        return [4, this.localStore.allocateQuery(a)];
                                    case 2:
                                        return i = t.sent(), o = this.sharedClientState.addLocalQueryTarget(i.targetId), e = i.targetId, [4, this.initializeViewAndComputeSnapshot(i, "current" === o)];
                                    case 3:
                                        n = t.sent(), this.isPrimary && this.remoteStore.listen(i), t.label = 4;
                                    case 4:
                                        return this.syncEngineListener.onWatchChange([n]), [2, e]
                                }
                            })
                        })
                    }, t.prototype.initializeViewAndComputeSnapshot = function(s, u) {
                        var c = this,
                            h = s.query;
                        return this.localStore.executeQuery(h).then(function(a) {
                            return c.localStore.remoteDocumentKeys(s.targetId).then(function(t) {
                                var e = new Hu(h, t),
                                    n = e.computeDocChanges(a),
                                    r = la.createSynthesizedTargetChangeForCurrentChange(s.targetId, u && c.onlineState !== Ru.Offline),
                                    i = e.applyChanges(n, !0 === c.isPrimary, r);
                                Mr(0 === i.limboChanges.length, "View returned limbo docs before target ack from the server."), Mr(!!i.snapshot, "applyChanges for new view should always return a snapshot");
                                var o = new Xu(h, s.targetId, e);
                                return c.queryViewsByQuery.set(h, o), c.queryViewsByTarget[s.targetId] = o, i.snapshot
                            })
                        })
                    }, t.prototype.synchronizeViewAndComputeSnapshot = function(i) {
                        var t = this;
                        return this.localStore.executeQuery(i.query).then(function(r) {
                            return t.localStore.remoteDocumentKeys(i.targetId).then(function(n) {
                                return h(t, void 0, void 0, function() {
                                    var e;
                                    return p(this, function(t) {
                                        return e = i.view.synchronizeWithPersistedState(r, n), this.isPrimary && this.updateTrackedLimbos(i.targetId, e.limboChanges), [2, e]
                                    })
                                })
                            })
                        })
                    }, t.prototype.unlisten = function(r) {
                        return h(this, void 0, void 0, function() {
                            var e, n = this;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.assertSubscribed("unlisten()"), Mr(!!(e = this.queryViewsByQuery.get(r)), "Trying to unlisten on query not found:" + r), this.isPrimary ? (this.sharedClientState.removeLocalQueryTarget(e.targetId), this.sharedClientState.isActiveQueryTarget(e.targetId) ? [3, 2] : [4, this.localStore.releaseQuery(r, !1).then(function() {
                                            n.sharedClientState.clearQueryState(e.targetId), n.remoteStore.unlisten(e.targetId), n.removeAndCleanupQuery(e)
                                        }).catch(cu)]) : [3, 3];
                                    case 1:
                                        t.sent(), t.label = 2;
                                    case 2:
                                        return [3, 5];
                                    case 3:
                                        return this.removeAndCleanupQuery(e), [4, this.localStore.releaseQuery(r, !0)];
                                    case 4:
                                        t.sent(), t.label = 5;
                                    case 5:
                                        return [2]
                                }
                            })
                        })
                    }, t.prototype.write = function(t, e) {
                        var n = this;
                        return this.assertSubscribed("write()"), this.localStore.localWrite(t).then(function(t) {
                            return n.sharedClientState.addPendingMutation(t.batchId), n.addMutationCallback(t.batchId, e), n.emitNewSnapsAndNotifyLocalStore(t.changes)
                        }).then(function() {
                            return n.remoteStore.fillWritePipeline()
                        })
                    }, t.prototype.wrapUpdateFunctionError = function(t) {
                        return t
                    }, t.prototype.runTransaction = function(e, n) {
                        var r = this;
                        void 0 === n && (n = 5), Mr(0 <= n, "Got negative number of retries for transaction.");
                        var i = this.remoteStore.createTransaction();
                        return function() {
                            try {
                                var t = e(i);
                                return !ro(t) && t.catch && t.then ? t.catch(function(t) {
                                    return Promise.reject(r.wrapUpdateFunctionError(t))
                                }) : Promise.reject(Error("Transaction callback must return a Promise"))
                            } catch (t) {
                                return Promise.reject(r.wrapUpdateFunctionError(t))
                            }
                        }().then(function(t) {
                            return i.commit().then(function() {
                                return t
                            }).catch(function(t) {
                                return 0 === n ? Promise.reject(t) : r.runTransaction(e, n - 1)
                            })
                        })
                    }, t.prototype.applyRemoteEvent = function(e) {
                        var r = this;
                        return this.assertSubscribed("applyRemoteEvent()"), this.localStore.applyRemoteEvent(e).then(function(t) {
                            return Br(e.targetChanges, function(t, e) {
                                var n = r.limboResolutionsByTarget[t];
                                n && (Mr(e.addedDocuments.size + e.modifiedDocuments.size + e.removedDocuments.size <= 1, "Limbo resolution for single document contains multiple changes."), 0 < e.addedDocuments.size ? n.receivedDocument = !0 : 0 < e.modifiedDocuments.size ? Mr(n.receivedDocument, "Received change for limbo target document without add.") : 0 < e.removedDocuments.size && (Mr(n.receivedDocument, "Received remove for limbo target document without add."), n.receivedDocument = !1))
                            }), r.emitNewSnapsAndNotifyLocalStore(t, e)
                        }).catch(cu)
                    }, t.prototype.applyOnlineStateChange = function(r, t) {
                        if (this.isPrimary && t === Ou.RemoteStore || !this.isPrimary && t === Ou.SharedClientState) {
                            var i = [];
                            this.queryViewsByQuery.forEach(function(t, e) {
                                var n = e.view.applyOnlineStateChange(r);
                                Mr(0 === n.limboChanges.length, "OnlineState should not affect limbo documents."), n.snapshot && i.push(n.snapshot)
                            }), this.syncEngineListener.onOnlineStateChange(r), this.syncEngineListener.onWatchChange(i), this.onlineState = r, this.isPrimary && this.sharedClientState.setOnlineState(r)
                        }
                    }, t.prototype.rejectListen = function(u, c) {
                        return h(this, void 0, void 0, function() {
                            var e, n, r, i, o, a, s = this;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.assertSubscribed("rejectListens()"), this.sharedClientState.updateQueryState(u, "rejected", c), e = this.limboResolutionsByTarget[u], (n = e && e.key) ? (this.limboTargetsByKey = this.limboTargetsByKey.remove(n), delete this.limboResolutionsByTarget[u], r = (r = new _i(Ai.comparator)).insert(n, new Mi(n, bo.forDeletedDoc())), i = $o().add(n), o = new ha(bo.MIN, {}, new To(si), r, i), [2, this.applyRemoteEvent(o)]) : [3, 1];
                                    case 1:
                                        return Mr(!!(a = this.queryViewsByTarget[u]), "Unknown targetId: " + u), [4, this.localStore.releaseQuery(a.query, !1).then(function() {
                                            return s.removeAndCleanupQuery(a)
                                        }).catch(cu)];
                                    case 2:
                                        t.sent(), this.syncEngineListener.onWatchError(a.query, c), t.label = 3;
                                    case 3:
                                        return [2]
                                }
                            })
                        })
                    }, t.prototype.applyBatchState = function(n, r, i) {
                        return h(this, void 0, void 0, function() {
                            var e;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return this.assertSubscribed("applyBatchState()"), [4, this.localStore.lookupMutationDocuments(n)];
                                    case 1:
                                        return null === (e = t.sent()) ? (Nr(Yu, "Cannot apply mutation batch with id: " + n), [2]) : "pending" !== r ? [3, 3] : [4, this.remoteStore.fillWritePipeline()];
                                    case 2:
                                        return t.sent(), [3, 4];
                                    case 3:
                                        "acknowledged" === r || "rejected" === r ? (this.processUserCallback(n, i || null), this.localStore.removeCachedMutationBatchMetadata(n)) : Rr("Unknown batchState: " + r), t.label = 4;
                                    case 4:
                                        return [4, this.emitNewSnapsAndNotifyLocalStore(e)];
                                    case 5:
                                        return t.sent(), [2]
                                }
                            })
                        })
                    }, t.prototype.applySuccessfulWrite = function(t) {
                        var e = this;
                        this.assertSubscribed("applySuccessfulWrite()");
                        var n = t.batch.batchId;
                        return this.processUserCallback(n, null), this.localStore.acknowledgeBatch(t).then(function(t) {
                            return e.sharedClientState.updateMutationState(n, "acknowledged"), e.emitNewSnapsAndNotifyLocalStore(t)
                        }).catch(cu)
                    }, t.prototype.rejectFailedWrite = function(e, n) {
                        var r = this;
                        return this.assertSubscribed("rejectFailedWrite()"), this.processUserCallback(e, n), this.localStore.rejectBatch(e).then(function(t) {
                            return r.sharedClientState.updateMutationState(e, "rejected", n), r.emitNewSnapsAndNotifyLocalStore(t)
                        }).catch(cu)
                    }, t.prototype.addMutationCallback = function(t, e) {
                        var n = this.mutationUserCallbacks[this.currentUser.toKey()];
                        n || (n = new _i(si)), n = n.insert(t, e), this.mutationUserCallbacks[this.currentUser.toKey()] = n
                    }, t.prototype.processUserCallback = function(t, e) {
                        var n = this.mutationUserCallbacks[this.currentUser.toKey()];
                        if (n) {
                            var r = n.get(t);
                            r && (Mr(t === n.minKey(), "Mutation callbacks processed out-of-order?"), e ? r.reject(e) : r.resolve(), n = n.remove(t)), this.mutationUserCallbacks[this.currentUser.toKey()] = n
                        }
                    }, t.prototype.removeAndCleanupQuery = function(t) {
                        var e = this;
                        if (this.sharedClientState.removeLocalQueryTarget(t.targetId), this.queryViewsByQuery.delete(t.query), delete this.queryViewsByTarget[t.targetId], this.isPrimary) {
                            var n = this.limboDocumentRefs.referencesForId(t.targetId);
                            this.limboDocumentRefs.removeReferencesForId(t.targetId), n.forEach(function(t) {
                                e.limboDocumentRefs.containsKey(t) || e.removeLimboTarget(t)
                            })
                        }
                    }, t.prototype.removeLimboTarget = function(t) {
                        var e = this.limboTargetsByKey.get(t);
                        null !== e && (this.remoteStore.unlisten(e), this.limboTargetsByKey = this.limboTargetsByKey.remove(t), delete this.limboResolutionsByTarget[e])
                    }, t.prototype.updateTrackedLimbos = function(t, e) {
                        for (var n = 0, r = e; n < r.length; n++) {
                            var i = r[n];
                            if (i instanceof Wu) this.limboDocumentRefs.addReference(i.key, t), this.trackLimboChange(i);
                            else if (i instanceof zu) {
                                Nr(Yu, "Document no longer in limbo: " + i.key), this.limboDocumentRefs.removeReference(i.key, t), this.limboDocumentRefs.containsKey(i.key) || this.removeLimboTarget(i.key)
                            } else Rr("Unknown limbo change: " + JSON.stringify(i))
                        }
                    }, t.prototype.trackLimboChange = function(t) {
                        var e = t.key;
                        if (!this.limboTargetsByKey.get(e)) {
                            Nr(Yu, "New document in limbo: " + e);
                            var n = this.limboTargetIdGenerator.next(),
                                r = so.atPath(e.path);
                            this.limboResolutionsByTarget[n] = new Ju(e), this.remoteStore.listen(new So(r, n, oo.LimboResolution, xa.INVALID)), this.limboTargetsByKey = this.limboTargetsByKey.insert(e, n)
                        }
                    }, t.prototype.currentLimboDocs = function() {
                        return this.limboTargetsByKey
                    }, t.prototype.emitNewSnapsAndNotifyLocalStore = function(n, u) {
                        return h(this, void 0, void 0, function() {
                            var o, a, e, s = this;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return o = [], a = [], e = [], this.queryViewsByQuery.forEach(function(t, i) {
                                            e.push(Promise.resolve().then(function() {
                                                var e = i.view.computeDocChanges(n);
                                                return e.needsRefill ? s.localStore.executeQuery(i.query).then(function(t) {
                                                    return i.view.computeDocChanges(t, e)
                                                }) : e
                                            }).then(function(t) {
                                                var e = u && u.targetChanges[i.targetId],
                                                    n = i.view.applyChanges(t, !0 === s.isPrimary, e);
                                                if (s.updateTrackedLimbos(i.targetId, n.limboChanges), n.snapshot) {
                                                    s.isPrimary && s.sharedClientState.updateQueryState(i.targetId, n.snapshot.fromCache ? "not-current" : "current"), o.push(n.snapshot);
                                                    var r = Gu.fromSnapshot(i.targetId, n.snapshot);
                                                    a.push(r)
                                                }
                                            }))
                                        }), [4, Promise.all(e)];
                                    case 1:
                                        return t.sent(), this.syncEngineListener.onWatchChange(o), [4, this.localStore.notifyLocalViewChanges(a)];
                                    case 2:
                                        return t.sent(), [2]
                                }
                            })
                        })
                    }, t.prototype.assertSubscribed = function(t) {
                        Mr(null !== this.syncEngineListener, "Trying to call " + t + " before calling subscribe().")
                    }, t.prototype.handleCredentialChange = function(r) {
                        return h(this, void 0, void 0, function() {
                            var e, n;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return e = !this.currentUser.isEqual(r), this.currentUser = r, e ? [4, this.localStore.handleUserChange(r)] : [3, 3];
                                    case 1:
                                        return n = t.sent(), this.sharedClientState.handleUserChange(r, n.removedBatchIds, n.addedBatchIds), [4, this.emitNewSnapsAndNotifyLocalStore(n.affectedDocuments)];
                                    case 2:
                                        t.sent(), t.label = 3;
                                    case 3:
                                        return [4, this.remoteStore.handleCredentialChange()];
                                    case 4:
                                        return t.sent(), [2]
                                }
                            })
                        })
                    }, t.prototype.applyPrimaryState = function(c) {
                        return h(this, void 0, void 0, function() {
                            var e, n, r, i, o, a, s, u = this;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return !0 !== c || !0 === this.isPrimary ? [3, 3] : (this.isPrimary = !0, [4, this.remoteStore.applyPrimaryState(!0)]);
                                    case 1:
                                        return t.sent(), e = this.sharedClientState.getAllActiveQueryTargets(), [4, this.synchronizeQueryViewsAndRaiseSnapshots(e.toArray())];
                                    case 2:
                                        for (n = t.sent(), r = 0, i = n; r < i.length; r++) o = i[r], this.remoteStore.listen(o);
                                        return [3, 7];
                                    case 3:
                                        return !1 !== c || !1 === this.isPrimary ? [3, 7] : (this.isPrimary = !1, a = [], s = Promise.resolve(), Vr(this.queryViewsByTarget, function(t, e) {
                                            u.sharedClientState.isLocalQueryTarget(t) ? a.push(t) : s = s.then(function() {
                                                return u.unlisten(e.query)
                                            }), u.remoteStore.unlisten(e.targetId)
                                        }), [4, s]);
                                    case 4:
                                        return t.sent(), [4, this.synchronizeQueryViewsAndRaiseSnapshots(a)];
                                    case 5:
                                        return t.sent(), this.resetLimboDocuments(), [4, this.remoteStore.applyPrimaryState(!1)];
                                    case 6:
                                        t.sent(), t.label = 7;
                                    case 7:
                                        return [2]
                                }
                            })
                        })
                    }, t.prototype.resetLimboDocuments = function() {
                        var e = this;
                        Vr(this.limboResolutionsByTarget, function(t) {
                            e.remoteStore.unlisten(t)
                        }), this.limboDocumentRefs.removeAllReferences(), this.limboResolutionsByTarget = [], this.limboTargetsByKey = new _i(Ai.comparator)
                    }, t.prototype.synchronizeQueryViewsAndRaiseSnapshots = function(t) {
                        for (var e = this, n = Promise.resolve(), a = [], s = [], r = function(o) {
                                n = n.then(function() {
                                    return h(e, void 0, void 0, function() {
                                        var e, n, r, i;
                                        return p(this, function(t) {
                                            switch (t.label) {
                                                case 0:
                                                    return (n = this.queryViewsByTarget[o]) ? [4, this.localStore.releaseQuery(n.query, !0)] : [3, 4];
                                                case 1:
                                                    return t.sent(), [4, this.localStore.allocateQuery(n.query)];
                                                case 2:
                                                    return e = t.sent(), [4, this.synchronizeViewAndComputeSnapshot(n)];
                                                case 3:
                                                    return (r = t.sent()).snapshot && s.push(r.snapshot), [3, 8];
                                                case 4:
                                                    return Mr(!0 === this.isPrimary, "A secondary tab should never have an active query without an active view."), [4, this.localStore.getQueryForTarget(o)];
                                                case 5:
                                                    return Mr(!!(i = t.sent()), "Query data for target " + o + " not found"), [4, this.localStore.allocateQuery(i)];
                                                case 6:
                                                    return e = t.sent(), [4, this.initializeViewAndComputeSnapshot(e, !1)];
                                                case 7:
                                                    t.sent(), t.label = 8;
                                                case 8:
                                                    return a.push(e), [2]
                                            }
                                        })
                                    })
                                })
                            }, i = 0, o = t; i < o.length; i++) {
                            r(o[i])
                        }
                        return n.then(function() {
                            return e.syncEngineListener.onWatchChange(s), a
                        })
                    }, t.prototype.getActiveClients = function() {
                        return this.localStore.getActiveClients()
                    }, t.prototype.applyTargetState = function(r, o, n) {
                        return h(this, void 0, void 0, function() {
                            var e, i = this;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        if (this.isPrimary) return Nr(Yu, "Ignoring unexpected query state notification."), [2];
                                        if (!this.queryViewsByTarget[r]) return [3, 5];
                                        switch (o) {
                                            case "current":
                                            case "not-current":
                                                return [3, 1];
                                            case "rejected":
                                                return [3, 2]
                                        }
                                        return [3, 4];
                                    case 1:
                                        return [2, this.localStore.getNewDocumentChanges().then(function(n) {
                                            return h(i, void 0, void 0, function() {
                                                var e;
                                                return p(this, function(t) {
                                                    switch (t.label) {
                                                        case 0:
                                                            return e = ha.createSynthesizedRemoteEventForCurrentChange(r, "current" === o), [4, this.emitNewSnapsAndNotifyLocalStore(n, e)];
                                                        case 1:
                                                            return t.sent(), [2]
                                                    }
                                                })
                                            })
                                        }, function(r) {
                                            return h(i, void 0, void 0, function() {
                                                var n;
                                                return p(this, function(t) {
                                                    switch (t.label) {
                                                        case 0:
                                                            return (e = r).code !== Pr.DATA_LOSS || e.message !== ws ? [3, 2] : (n = [], Vr(this.queryViewsByTarget, function(t) {
                                                                return n.push(t)
                                                            }), [4, this.synchronizeQueryViewsAndRaiseSnapshots(n)]);
                                                        case 1:
                                                            return t.sent(), [3, 3];
                                                        case 2:
                                                            throw r;
                                                        case 3:
                                                            return [2]
                                                    }
                                                    var e
                                                })
                                            })
                                        })];
                                    case 2:
                                        return e = this.queryViewsByTarget[r], this.removeAndCleanupQuery(e), [4, this.localStore.releaseQuery(e.query, !0)];
                                    case 3:
                                        return t.sent(), this.syncEngineListener.onWatchError(e.query, n), [3, 5];
                                    case 4:
                                        Rr("Unexpected target state: " + o), t.label = 5;
                                    case 5:
                                        return [2]
                                }
                            })
                        })
                    }, t.prototype.applyActiveTargetsChange = function(l, f) {
                        return h(this, void 0, void 0, function() {
                            var e, n, r, i, o, a, s, u, c, h = this;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        if (!this.isPrimary) return [2];
                                        e = 0, n = l, t.label = 1;
                                    case 1:
                                        return e < n.length ? (c = n[e], Mr(!this.queryViewsByTarget[c], "Trying to add an already active target"), [4, this.localStore.getQueryForTarget(c)]) : [3, 6];
                                    case 2:
                                        return Mr(!!(r = t.sent()), "Query data for active target " + c + " not found"), [4, this.localStore.allocateQuery(r)];
                                    case 3:
                                        return i = t.sent(), [4, this.initializeViewAndComputeSnapshot(i, !1)];
                                    case 4:
                                        t.sent(), this.remoteStore.listen(i), t.label = 5;
                                    case 5:
                                        return e++, [3, 1];
                                    case 6:
                                        o = function(e) {
                                            var n;
                                            return p(this, function(t) {
                                                switch (t.label) {
                                                    case 0:
                                                        return (n = a.queryViewsByTarget[e]) ? [4, a.localStore.releaseQuery(n.query, !1).then(function() {
                                                            h.remoteStore.unlisten(e), h.removeAndCleanupQuery(n)
                                                        }).catch(cu)] : [3, 2];
                                                    case 1:
                                                        t.sent(), t.label = 2;
                                                    case 2:
                                                        return [2]
                                                }
                                            })
                                        }, a = this, s = 0, u = f, t.label = 7;
                                    case 7:
                                        return s < u.length ? (c = u[s], [5, o(c)]) : [3, 10];
                                    case 8:
                                        t.sent(), t.label = 9;
                                    case 9:
                                        return s++, [3, 7];
                                    case 10:
                                        return [2]
                                }
                            })
                        })
                    }, t.prototype.enableNetwork = function() {
                        return this.localStore.setNetworkEnabled(!0), this.remoteStore.enableNetwork()
                    }, t.prototype.disableNetwork = function() {
                        return this.localStore.setNetworkEnabled(!1), this.remoteStore.disableNetwork()
                    }, t.prototype.getRemoteKeysForTarget = function(t) {
                        var e = this.limboResolutionsByTarget[t];
                        return e && e.receivedDocument ? $o().add(e.key) : this.queryViewsByTarget[t] ? this.queryViewsByTarget[t].view.syncedDocuments : $o()
                    }, t
                }(),
                Zu = function() {
                    function t(t) {
                        this.uid = t
                    }
                    return t.prototype.isAuthenticated = function() {
                        return null != this.uid
                    }, t.prototype.toKey = function() {
                        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user"
                    }, t.prototype.isEqual = function(t) {
                        return t.uid === this.uid
                    }, t.UNAUTHENTICATED = new t(null), t.GOOGLE_CREDENTIALS = new t("google-credentials-uid"), t.FIRST_PARTY = new t("first-party-uid"), t
                }(),
                tc = "SharedClientState",
                ec = "firestore_clients",
                nc = "firestore_mutations",
                rc = "firestore_targets",
                ic = function() {
                    function a(t, e, n, r) {
                        this.user = t, this.batchId = e, this.state = n, Mr(void 0 !== (this.error = r) == ("rejected" === n), "MutationMetadata must contain an error iff state is 'rejected'")
                    }
                    return a.fromWebStorageEntry = function(t, e, n) {
                        var r = JSON.parse(n),
                            i = "object" == typeof r && -1 !== ["pending", "acknowledged", "rejected"].indexOf(r.state) && (void 0 === r.error || "object" == typeof r.error),
                            o = void 0;
                        return i && r.error && (i = "string" == typeof r.error.message && "string" == typeof r.error.code) && (o = new Lr(r.error.code, r.error.message)), i ? new a(t, e, r.state, o) : (Ar(tc, "Failed to parse mutation state for ID '" + e + "': " + n), null)
                    }, a.prototype.toWebStorageJSON = function() {
                        var t = {
                            state: this.state,
                            updateTimeMs: Date.now()
                        };
                        return this.error && (t.error = {
                            code: this.error.code,
                            message: this.error.message
                        }), JSON.stringify(t)
                    }, a
                }(),
                oc = function() {
                    function o(t, e, n) {
                        this.targetId = t, this.state = e, Mr(void 0 !== (this.error = n) == ("rejected" === e), "QueryTargetMetadata must contain an error iff state is 'rejected'")
                    }
                    return o.fromWebStorageEntry = function(t, e) {
                        var n = JSON.parse(e),
                            r = "object" == typeof n && -1 !== ["not-current", "current", "rejected"].indexOf(n.state) && (void 0 === n.error || "object" == typeof n.error),
                            i = void 0;
                        return r && n.error && (r = "string" == typeof n.error.message && "string" == typeof n.error.code) && (i = new Lr(n.error.code, n.error.message)), r ? new o(t, n.state, i) : (Ar(tc, "Failed to parse target state for ID '" + t + "': " + e), null)
                    }, o.prototype.toWebStorageJSON = function() {
                        var t = {
                            state: this.state,
                            updateTimeMs: Date.now()
                        };
                        return this.error && (t.error = {
                            code: this.error.code,
                            message: this.error.message
                        }), JSON.stringify(t)
                    }, o
                }(),
                ac = function() {
                    function a(t, e) {
                        this.clientId = t, this.activeTargetIds = e
                    }
                    return a.fromWebStorageEntry = function(t, e) {
                        for (var n = JSON.parse(e), r = "object" == typeof n && n.activeTargetIds instanceof Array, i = ta(), o = 0; r && o < n.activeTargetIds.length; ++o) r = io(n.activeTargetIds[o]), i = i.add(n.activeTargetIds[o]);
                        return r ? new a(t, i) : (Ar(tc, "Failed to parse client data for instance '" + t + "': " + e), null)
                    }, a
                }(),
                sc = function() {
                    function n(t, e) {
                        this.clientId = t, this.onlineState = e
                    }
                    return n.fromWebStorageEntry = function(t) {
                        var e = JSON.parse(t);
                        return "object" == typeof e && void 0 !== Ru[e.onlineState] && "string" == typeof e.clientId ? new n(e.clientId, Ru[e.onlineState]) : (Ar(tc, "Failed to parse online state: " + t), null)
                    }, n
                }(),
                uc = function() {
                    function t() {
                        this.activeTargetIds = ta()
                    }
                    return t.prototype.addQueryTarget = function(t) {
                        Mr(!this.activeTargetIds.has(t), "Target with ID '" + t + "' already active."), this.activeTargetIds = this.activeTargetIds.add(t)
                    }, t.prototype.removeQueryTarget = function(t) {
                        this.activeTargetIds = this.activeTargetIds.delete(t)
                    }, t.prototype.toWebStorageJSON = function() {
                        var t = {
                            activeTargetIds: this.activeTargetIds.toArray(),
                            updateTimeMs: Date.now()
                        };
                        return JSON.stringify(t)
                    }, t
                }(),
                cc = function() {
                    function a(t, e, n, r, i) {
                        if (this.queue = t, this.platform = e, this.persistenceKey = n, this.localClientId = r, this.syncEngine = null, this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.activeClients = {}, this.storageListener = this.handleWebStorageEvent.bind(this), this.started = !1, this.earlyEvents = [], !a.isAvailable(this.platform)) throw new Lr(Pr.UNIMPLEMENTED, "LocalStorage is not available on this platform.");
                        var o = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                        this.storage = this.platform.window.localStorage, this.currentUser = i, this.localClientStorageKey = this.toWebStorageClientStateKey(this.localClientId), this.sequenceNumberKey = "firestore_sequence_number_" + n, this.activeClients[this.localClientId] = new uc, this.clientStateKeyRe = new RegExp("^" + ec + "_" + o + "_([^_]*)$"), this.mutationBatchKeyRe = new RegExp("^" + nc + "_" + o + "_(\\d+)(?:_(.*))?$"), this.queryTargetKeyRe = new RegExp("^" + rc + "_" + o + "_(\\d+)$"), this.onlineStateKey = "firestore_online_state_" + n, this.platform.window.addEventListener("storage", this.storageListener)
                    }
                    return a.isAvailable = function(t) {
                        return !(!t.window || null == t.window.localStorage)
                    }, a.prototype.start = function() {
                        return h(this, void 0, void 0, function() {
                            var e, n, r, i, o, a, s, u, c, h, l, f = this;
                            return p(this, function(t) {
                                switch (t.label) {
                                    case 0:
                                        return Mr(!this.started, "WebStorageSharedClientState already started"), Mr(null !== this.syncEngine, "syncEngine property must be set before calling start()"), Mr(null !== this.onlineStateHandler, "onlineStateHandler property must be set before calling start()"), [4, this.syncEngine.getActiveClients()];
                                    case 1:
                                        for (e = t.sent(), n = 0, r = e; n < r.length; n++)(i = r[n]) !== this.localClientId && (o = this.getItem(this.toWebStorageClientStateKey(i))) && (a = ac.fromWebStorageEntry(i, o)) && (this.activeClients[a.clientId] = a);
                                        for (this.persistClientState(), (s = this.storage.getItem(this.onlineStateKey)) && (u = this.fromWebStorageOnlineState(s)) && this.handleOnlineStateEvent(u), c = 0, h = this.earlyEvents; c < h.length; c++) l = h[c], this.handleWebStorageEvent(l);
                                        return this.earlyEvents = [], this.platform.window.addEventListener("unload", function() {
                                            return f.shutdown()
                                        }), this.started = !0, [2]
                                }
                            })
                        })
                    }, a.prototype.writeSequenceNumber = function(t) {
                        this.setItem(this.sequenceNumberKey, JSON.stringify(t))
                    }, a.prototype.getAllActiveQueryTargets = function() {
                        var n = ta();
                        return Br(this.activeClients, function(t, e) {
                            n = n.unionWith(e.activeTargetIds)
                        }), n
                    }, a.prototype.isActiveQueryTarget = function(t) {
                        for (var e in this.activeClients)
                            if (this.activeClients.hasOwnProperty(e) && this.activeClients[e].activeTargetIds.has(t)) return !0;
                        return !1
                    }, a.prototype.addPendingMutation = function(t) {
                        this.persistMutationState(t, "pending")
                    }, a.prototype.updateMutationState = function(t, e, n) {
                        this.persistMutationState(t, e, n), this.removeMutationState(t)
                    }, a.prototype.addLocalQueryTarget = function(t) {
                        var e = "not-current";
                        if (this.isActiveQueryTarget(t)) {
                            var n = this.storage.getItem(this.toWebStorageQueryTargetMetadataKey(t));
                            if (n) {
                                var r = oc.fromWebStorageEntry(t, n);
                                r && (e = r.state)
                            }
                        }
                        return this.localClientState.addQueryTarget(t), this.persistClientState(), e
                    }, a.prototype.removeLocalQueryTarget = function(t) {
                        this.localClientState.removeQueryTarget(t), this.persistClientState()
                    }, a.prototype.isLocalQueryTarget = function(t) {
                        return this.localClientState.activeTargetIds.has(t)
                    }, a.prototype.clearQueryState = function(t) {
                        this.removeItem(this.toWebStorageQueryTargetMetadataKey(t))
                    }, a.prototype.updateQueryState = function(t, e, n) {
                        this.persistQueryTargetState(t, e, n)
                    }, a.prototype.handleUserChange = function(t, e, n) {
                        var r = this;
                        e.forEach(function(t) {
                            r.removeMutationState(t)
                        }), this.currentUser = t, n.forEach(function(t) {
                            r.addPendingMutation(t)
                        })
                    }, a.prototype.setOnlineState = function(t) {
                        this.persistOnlineState(t)
                    }, a.prototype.shutdown = function() {
                        this.started && (this.platform.window.removeEventListener("storage", this.storageListener), this.removeItem(this.localClientStorageKey), this.started = !1)
                    }, a.prototype.getItem = function(t) {
                        var e = this.storage.getItem(t);
                        return Nr(tc, "READ", t, e), e
                    }, a.prototype.setItem = function(t, e) {
                        Nr(tc, "SET", t, e), this.storage.setItem(t, e)
                    }, a.prototype.removeItem = function(t) {
                        Nr(tc, "REMOVE", t), this.storage.removeItem(t)
                    }, a.prototype.handleWebStorageEvent = function(s) {
                        var t = this;
                        if (s.storageArea === this.storage) {
                            if (Nr(tc, "EVENT", s.key, s.newValue), s.key === this.localClientStorageKey) return void Ar("Received WebStorage notification for local change. Another client might have garbage-collected our state");
                            this.queue.enqueueAndForget(function() {
                                return h(t, void 0, void 0, function() {
                                    var e, n, r, i, o, a;
                                    return p(this, function(t) {
                                        if (!this.started) return this.earlyEvents.push(s), [2];
                                        if (null === s.key) return [2];
                                        if (this.clientStateKeyRe.test(s.key)) {
                                            if (null == s.newValue) return n = this.fromWebStorageClientStateKey(s.key), [2, this.handleClientStateEvent(n, null)];
                                            if (e = this.fromWebStorageClientState(s.key, s.newValue)) return [2, this.handleClientStateEvent(e.clientId, e)]
                                        } else if (this.mutationBatchKeyRe.test(s.key)) {
                                            if (null !== s.newValue && (r = this.fromWebStorageMutationMetadata(s.key, s.newValue))) return [2, this.handleMutationBatchEvent(r)]
                                        } else if (this.queryTargetKeyRe.test(s.key)) {
                                            if (null !== s.newValue && (i = this.fromWebStorageQueryTargetMetadata(s.key, s.newValue))) return [2, this.handleQueryTargetEvent(i)]
                                        } else if (s.key === this.onlineStateKey) {
                                            if (null !== s.newValue && (o = this.fromWebStorageOnlineState(s.newValue))) return [2, this.handleOnlineStateEvent(o)]
                                        } else s.key === this.sequenceNumberKey && (Mr(!!this.sequenceNumberHandler, "Missing sequenceNumberHandler"), (a = function(t) {
                                            var e = xa.INVALID;
                                            if (null != t) try {
                                                var n = JSON.parse(t);
                                                Mr("number" == typeof n, "Found non-numeric sequence number"), e = n
                                            } catch (t) {
                                                Ar(tc, "Failed to read sequence number from WebStorage", t)
                                            }
                                            return e
                                        }(s.newValue)) !== xa.INVALID && this.sequenceNumberHandler(a));
                                        return [2]
                                    })
                                })
                            })
                        }
                    }, Object.defineProperty(a.prototype, "localClientState", {
                        get: function() {
                            return this.activeClients[this.localClientId]
                        },
                        enumerable: !0,
                        configurable: !0
                    }), a.prototype.persistClientState = function() {
                        this.setItem(this.localClientStorageKey, this.localClientState.toWebStorageJSON())
                    }, a.prototype.persistMutationState = function(t, e, n) {
                        var r = new ic(this.currentUser, t, e, n),
                            i = this.toWebStorageMutationBatchKey(t);
                        this.setItem(i, r.toWebStorageJSON())
                    }, a.prototype.removeMutationState = function(t) {
                        var e = this.toWebStorageMutationBatchKey(t);
                        this.removeItem(e)
                    }, a.prototype.persistOnlineState = function(t) {
                        var e = {
                            clientId: this.localClientId,
                            onlineState: Ru[t]
                        };
                        this.storage.setItem(this.onlineStateKey, JSON.stringify(e))
                    }, a.prototype.persistQueryTargetState = function(t, e, n) {
                        var r = this.toWebStorageQueryTargetMetadataKey(t),
                            i = new oc(t, e, n);
                        this.setItem(r, i.toWebStorageJSON())
                    }, a.prototype.toWebStorageClientStateKey = function(t) {
                        return Mr(-1 === t.indexOf("_"), "Client key cannot contain '_', but was '" + t + "'"), ec + "_" + this.persistenceKey + "_" + t
                    }, a.prototype.toWebStorageQueryTargetMetadataKey = function(t) {
                        return rc + "_" + this.persistenceKey + "_" + t
                    }, a.prototype.toWebStorageMutationBatchKey = function(t) {
                        var e = nc + "_" + this.persistenceKey + "_" + t;
                        return this.currentUser.isAuthenticated() && (e += "_" + this.currentUser.uid), e
                    }, a.prototype.fromWebStorageClientStateKey = function(t) {
                        var e = this.clientStateKeyRe.exec(t);
                        return e ? e[1] : null
                    }, a.prototype.fromWebStorageClientState = function(t, e) {
                        var n = this.fromWebStorageClientStateKey(t);
                        return Mr(null !== n, "Cannot parse client state key '" + t + "'"), ac.fromWebStorageEntry(n, e)
                    }, a.prototype.fromWebStorageMutationMetadata = function(t, e) {
                        var n = this.mutationBatchKeyRe.exec(t);
                        Mr(null !== n, "Cannot parse mutation batch key '" + t + "'");
                        var r = Number(n[1]),
                            i = void 0 !== n[2] ? n[2] : null;
                        return ic.fromWebStorageEntry(new Zu(i), r, e)
                    }, a.prototype.fromWebStorageQueryTargetMetadata = function(t, e) {
                        var n = this.queryTargetKeyRe.exec(t);
                        Mr(null !== n, "Cannot parse query target key '" + t + "'");
                        var r = Number(n[1]);
                        return oc.fromWebStorageEntry(r, e)
                    }, a.prototype.fromWebStorageOnlineState = function(t) {
                        return sc.fromWebStorageEntry(t)
                    }, a.prototype.handleMutationBatchEvent = function(e) {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                return e.user.uid !== this.currentUser.uid ? (Nr(tc, "Ignoring mutation for non-active user " + e.user.uid), [2]) : [2, this.syncEngine.applyBatchState(e.batchId, e.state, e.error)]
                            })
                        })
                    }, a.prototype.handleQueryTargetEvent = function(t) {
                        return this.syncEngine.applyTargetState(t.targetId, t.state, t.error)
                    }, a.prototype.handleClientStateEvent = function(t, e) {
                        var n = this,
                            r = this.getAllActiveQueryTargets();
                        e ? this.activeClients[t] = e : delete this.activeClients[t];
                        var i = this.getAllActiveQueryTargets(),
                            o = [],
                            a = [];
                        return i.forEach(function(e) {
                            return h(n, void 0, void 0, function() {
                                return p(this, function(t) {
                                    return r.has(e) || o.push(e), [2]
                                })
                            })
                        }), r.forEach(function(e) {
                            return h(n, void 0, void 0, function() {
                                return p(this, function(t) {
                                    return i.has(e) || a.push(e), [2]
                                })
                            })
                        }), this.syncEngine.applyActiveTargetsChange(o, a)
                    }, a.prototype.handleOnlineStateEvent = function(t) {
                        this.activeClients[t.clientId] && this.onlineStateHandler(t.onlineState)
                    }, a
                }();
            var hc = function() {
                    function t() {
                        this.localState = new uc, this.queryState = {}, this.syncEngine = null, this.onlineStateHandler = null, this.sequenceNumberHandler = null
                    }
                    return t.prototype.addPendingMutation = function(t) {}, t.prototype.updateMutationState = function(t, e, n) {}, t.prototype.addLocalQueryTarget = function(t) {
                        return this.localState.addQueryTarget(t), this.queryState[t] || "not-current"
                    }, t.prototype.updateQueryState = function(t, e, n) {
                        this.queryState[t] = e
                    }, t.prototype.removeLocalQueryTarget = function(t) {
                        this.localState.removeQueryTarget(t)
                    }, t.prototype.isLocalQueryTarget = function(t) {
                        return this.localState.activeTargetIds.has(t)
                    }, t.prototype.clearQueryState = function(t) {
                        delete this.queryState[t]
                    }, t.prototype.getAllActiveQueryTargets = function() {
                        return this.localState.activeTargetIds
                    }, t.prototype.isActiveQueryTarget = function(t) {
                        return this.localState.activeTargetIds.has(t)
                    }, t.prototype.start = function() {
                        return this.localState = new uc, Promise.resolve()
                    }, t.prototype.handleUserChange = function(t, e, n) {}, t.prototype.setOnlineState = function(t) {}, t.prototype.shutdown = function() {}, t.prototype.writeSequenceNumber = function(t) {}, t
                }(),
                lc = "FirestoreClient",
                fc = function() {
                    function t(t, e) {
                        this.cacheSizeBytes = t, this.experimentalTabSynchronization = e
                    }
                    return t.prototype.lruParams = function() {
                        return eu.withCacheSize(this.cacheSizeBytes)
                    }, t
                }(),
                pc = function() {},
                dc = function() {
                    function t(t, e, n, r) {
                        this.platform = t, this.databaseInfo = e, this.credentials = n, this.asyncQueue = r, this.clientId = ai.newId(), this.isShutdown = !1
                    }
                    return t.prototype.start = function(t) {
                        var n = this;
                        this.verifyNotShutdown();
                        var r = new qa,
                            i = new qa,
                            o = !1;
                        return this.credentials.setChangeListener(function(e) {
                            o ? n.asyncQueue.enqueueAndForget(function() {
                                return n.handleCredentialChange(e)
                            }) : (o = !0, n.initializePersistence(t, i, e).then(function(t) {
                                return n.initializeRest(e, t)
                            }).then(r.resolve, r.reject))
                        }), this.asyncQueue.enqueueAndForget(function() {
                            return r.promise
                        }), i.promise
                    }, t.prototype.enableNetwork = function() {
                        var t = this;
                        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function() {
                            return t.syncEngine.enableNetwork()
                        })
                    }, t.prototype.initializePersistence = function(t, e, n) {
                        var r = this;
                        return t instanceof fc ? this.startIndexedDbPersistence(n, t).then(function(t) {
                            return e.resolve(), t
                        }).catch(function(t) {
                            if (e.reject(t), !r.canFallback(t)) throw t;
                            return console.warn("Error enabling offline storage. Falling back to storage disabled: " + t), r.startMemoryPersistence()
                        }) : (e.resolve(), this.startMemoryPersistence())
                    }, t.prototype.canFallback = function(t) {
                        return t instanceof Lr ? t.code === Pr.FAILED_PRECONDITION || t.code === Pr.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || (22 === t.code || 20 === t.code)
                    }, t.prototype.verifyNotShutdown = function() {
                        if (this.isShutdown) throw new Lr(Pr.FAILED_PRECONDITION, "The client has already been shutdown.")
                    }, t.prototype.startIndexedDbPersistence = function(r, i) {
                        var t = this,
                            o = uu.buildStoragePrefix(this.databaseInfo),
                            a = new Da(this.databaseInfo.databaseId, {
                                useProto3Json: !0
                            });
                        return Promise.resolve().then(function() {
                            return h(t, void 0, void 0, function() {
                                var e, n;
                                return p(this, function(t) {
                                    switch (t.label) {
                                        case 0:
                                            if (i.experimentalTabSynchronization && !cc.isAvailable(this.platform)) throw new Lr(Pr.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
                                            return n = i.lruParams(), i.experimentalTabSynchronization ? (this.sharedClientState = new cc(this.asyncQueue, this.platform, o, this.clientId, r), [4, uu.createMultiClientIndexedDbPersistence(o, this.clientId, this.platform, this.asyncQueue, a, n, {
                                                sequenceNumberSyncer: this.sharedClientState
                                            })]) : [3, 2];
                                        case 1:
                                            return e = t.sent(), [3, 4];
                                        case 2:
                                            return this.sharedClientState = new hc, [4, uu.createIndexedDbPersistence(o, this.clientId, this.platform, this.asyncQueue, a, n)];
                                        case 3:
                                            e = t.sent(), t.label = 4;
                                        case 4:
                                            return [2, (this.persistence = e).referenceDelegate.garbageCollector]
                                    }
                                })
                            })
                        })
                    }, t.prototype.startMemoryPersistence = function() {
                        return this.persistence = Iu.createEagerPersistence(this.clientId), this.sharedClientState = new hc, Promise.resolve(null)
                    }, t.prototype.initializeRest = function(s, u) {
                        var t = this;
                        return Nr(lc, "Initializing. user=", s.uid), this.platform.loadConnection(this.databaseInfo).then(function(a) {
                            return h(t, void 0, void 0, function() {
                                var e, n, r, i, o = this;
                                return p(this, function(t) {
                                    switch (t.label) {
                                        case 0:
                                            return this.localStore = new gu(this.persistence, s), u && (this.lruScheduler = new nu(u, this.asyncQueue, this.localStore)), e = this.platform.newSerializer(this.databaseInfo.databaseId), n = new qu(this.asyncQueue, a, this.credentials, e), r = function(t) {
                                                return o.syncEngine.applyOnlineStateChange(t, Ou.RemoteStore)
                                            }, i = function(t) {
                                                return o.syncEngine.applyOnlineStateChange(t, Ou.SharedClientState)
                                            }, this.remoteStore = new Uu(this.localStore, n, this.asyncQueue, r), this.syncEngine = new $u(this.localStore, this.remoteStore, this.sharedClientState, s), this.sharedClientState.onlineStateHandler = i, this.remoteStore.syncEngine = this.syncEngine, this.sharedClientState.syncEngine = this.syncEngine, this.eventMgr = new Ku(this.syncEngine), [4, this.sharedClientState.start()];
                                        case 1:
                                            return t.sent(), [4, this.remoteStore.start()];
                                        case 2:
                                            return t.sent(), [4, this.persistence.setPrimaryStateListener(function(e) {
                                                return h(o, void 0, void 0, function() {
                                                    return p(this, function(t) {
                                                        switch (t.label) {
                                                            case 0:
                                                                return [4, this.syncEngine.applyPrimaryState(e)];
                                                            case 1:
                                                                return t.sent(), this.lruScheduler && (e && !this.lruScheduler.started ? this.lruScheduler.start() : e || this.lruScheduler.stop()), [2]
                                                        }
                                                    })
                                                })
                                            })];
                                        case 3:
                                            return t.sent(), [2]
                                    }
                                })
                            })
                        })
                    }, t.prototype.handleCredentialChange = function(t) {
                        return this.asyncQueue.verifyOperationInProgress(), Nr(lc, "Credential Changed. Current user: " + t.uid), this.syncEngine.handleCredentialChange(t)
                    }, t.prototype.disableNetwork = function() {
                        var t = this;
                        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function() {
                            return t.syncEngine.disableNetwork()
                        })
                    }, t.prototype.shutdown = function() {
                        var t = this;
                        return !0 === this.isShutdown ? Promise.resolve() : this.asyncQueue.enqueue(function() {
                            return h(t, void 0, void 0, function() {
                                return p(this, function(t) {
                                    switch (t.label) {
                                        case 0:
                                            return this.lruScheduler && this.lruScheduler.stop(), [4, this.remoteStore.shutdown()];
                                        case 1:
                                            return t.sent(), [4, this.sharedClientState.shutdown()];
                                        case 2:
                                            return t.sent(), [4, this.persistence.shutdown()];
                                        case 3:
                                            return t.sent(), this.credentials.removeChangeListener(), this.isShutdown = !0, [2]
                                    }
                                })
                            })
                        })
                    }, t.prototype.listen = function(t, e, n) {
                        var r = this;
                        this.verifyNotShutdown();
                        var i = new ju(t, e, n);
                        return this.asyncQueue.enqueueAndForget(function() {
                            return r.eventMgr.listen(i)
                        }), i
                    }, t.prototype.unlisten = function(t) {
                        var e = this;
                        this.verifyNotShutdown(), this.asyncQueue.enqueueAndForget(function() {
                            return e.eventMgr.unlisten(t)
                        })
                    }, t.prototype.getDocumentFromLocalCache = function(t) {
                        var e = this;
                        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function() {
                            return e.localStore.readDocument(t)
                        }).then(function(t) {
                            if (t instanceof Ri) return t;
                            if (t instanceof Mi) return null;
                            throw new Lr(Pr.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)")
                        })
                    }, t.prototype.getDocumentsFromLocalCache = function(i) {
                        var t = this;
                        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function() {
                            return t.localStore.executeQuery(i)
                        }).then(function(t) {
                            var e = $o(),
                                n = new Hu(i, e),
                                r = n.computeDocChanges(t);
                            return n.applyChanges(r, !1).snapshot
                        })
                    }, t.prototype.write = function(t) {
                        var e = this;
                        this.verifyNotShutdown();
                        var n = new qa;
                        return this.asyncQueue.enqueueAndForget(function() {
                            return e.syncEngine.write(t, n)
                        }), n.promise
                    }, t.prototype.databaseId = function() {
                        return this.databaseInfo.databaseId
                    }, t.prototype.transaction = function(t) {
                        var e = this;
                        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function() {
                            return h(e, void 0, void 0, function() {
                                return p(this, function(t) {
                                    return [2]
                                })
                            })
                        }).then(function() {
                            return e.syncEngine.runTransaction(t)
                        })
                    }, t
                }(),
                mc = function() {
                    function t(t) {
                        this.observer = t, this.muted = !1
                    }
                    return t.prototype.next = function(t) {
                        this.scheduleEvent(this.observer.next, t)
                    }, t.prototype.error = function(t) {
                        this.scheduleEvent(this.observer.error, t)
                    }, t.prototype.mute = function() {
                        this.muted = !0
                    }, t.prototype.scheduleEvent = function(t, e) {
                        var n = this;
                        this.muted || setTimeout(function() {
                            n.muted || t(e)
                        }, 0)
                    }, t
                }(),
                yc = function() {
                    function e() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        ! function(t, e, n, r) {
                            if (!(e instanceof Array) || e.length < r) throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() requires its " + n + " argument to be an array with at least " + oi(r, "element") + ".")
                        }("FieldPath", t, "fieldNames", 1);
                        for (var n = 0; n < t.length; ++n)
                            if (Wr("FieldPath", "string", n, t[n]), 0 === t[n].length) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
                        this._internalPath = new Ni(t)
                    }
                    return e.documentId = function() {
                        return e._DOCUMENT_ID
                    }, e.prototype.isEqual = function(t) {
                        if (!(t instanceof e)) throw ri("isEqual", "FieldPath", 1, t);
                        return this._internalPath.isEqual(t._internalPath)
                    }, e._DOCUMENT_ID = new e(Ni.keyField().canonicalString()), e
                }(),
                gc = new RegExp("[~\\*/\\[\\]]");
            var vc = function(t, e) {
                    this.user = e, this.type = "OAuth", this.authHeaders = {
                        Authorization: "Bearer " + t
                    }
                },
                bc = function() {
                    function t() {
                        this.changeListener = null
                    }
                    return t.prototype.getToken = function() {
                        return Promise.resolve(null)
                    }, t.prototype.invalidateToken = function() {}, t.prototype.setChangeListener = function(t) {
                        Mr(!this.changeListener, "Can only call setChangeListener() once."), (this.changeListener = t)(Zu.UNAUTHENTICATED)
                    }, t.prototype.removeChangeListener = function() {
                        Mr(null !== this.changeListener, "removeChangeListener() when no listener registered"), this.changeListener = null
                    }, t
                }(),
                wc = function() {
                    function t(t) {
                        var e = this;
                        this.app = t, this.tokenListener = null, this.tokenCounter = 0, this.changeListener = null, this.forceRefresh = !1, this.tokenListener = function() {
                            e.tokenCounter++, e.currentUser = e.getUser(), e.changeListener && e.changeListener(e.currentUser)
                        }, this.tokenCounter = 0, this.app.INTERNAL.addAuthTokenListener(this.tokenListener)
                    }
                    return t.prototype.getToken = function() {
                        var e = this;
                        Mr(null != this.tokenListener, "getToken cannot be called after listener removed.");
                        var n = this.tokenCounter,
                            t = this.forceRefresh;
                        return this.forceRefresh = !1, this.app.INTERNAL.getToken(t).then(function(t) {
                            if (e.tokenCounter !== n) throw new Lr(Pr.ABORTED, "getToken aborted due to token change.");
                            return t ? (Mr("string" == typeof t.accessToken, "Invalid tokenData returned from getToken():" + t), new vc(t.accessToken, e.currentUser)) : null
                        })
                    }, t.prototype.invalidateToken = function() {
                        this.forceRefresh = !0
                    }, t.prototype.setChangeListener = function(t) {
                        Mr(!this.changeListener, "Can only call setChangeListener() once."), this.changeListener = t, this.currentUser && t(this.currentUser)
                    }, t.prototype.removeChangeListener = function() {
                        Mr(null != this.tokenListener, "removeChangeListener() called twice"), Mr(null !== this.changeListener, "removeChangeListener() called when no listener registered"), this.app.INTERNAL.removeAuthTokenListener(this.tokenListener), this.tokenListener = null, this.changeListener = null
                    }, t.prototype.getUser = function() {
                        var t = this.app.INTERNAL.getUid();
                        return Mr(null === t || "string" == typeof t, "Received invalid UID: " + t), new Zu(t)
                    }, t
                }(),
                Ec = function() {
                    function t(t, e) {
                        this.gapi = t, this.sessionIndex = e, this.type = "FirstParty", this.user = Zu.FIRST_PARTY
                    }
                    return Object.defineProperty(t.prototype, "authHeaders", {
                        get: function() {
                            var t = {
                                    "X-Goog-AuthUser": this.sessionIndex
                                },
                                e = this.gapi.auth.getAuthHeaderValueForFirstParty([]);
                            return e && (t.Authorization = e), t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t
                }(),
                Sc = function() {
                    function t(t, e) {
                        this.gapi = t, this.sessionIndex = e
                    }
                    return t.prototype.getToken = function() {
                        return Promise.resolve(new Ec(this.gapi, this.sessionIndex))
                    }, t.prototype.setChangeListener = function(t) {
                        t(Zu.FIRST_PARTY)
                    }, t.prototype.removeChangeListener = function() {}, t.prototype.invalidateToken = function() {}, t
                }();

            function Tc(t) {
                return function(t, e) {
                    if ("object" != typeof t || null === t) return !1;
                    for (var n = t, r = 0, i = e; r < i.length; r++) {
                        var o = i[r];
                        if (o in n && "function" == typeof n[o]) return !0
                    }
                    return !1
                }(t, ["next", "error", "complete"])
            }
            var Ic, Cc, Dc = function() {
                    function t(t) {
                        this._methodName = t
                    }
                    return t.delete = function() {
                        return Qr("FieldValue.delete", arguments), Nc.instance
                    }, t.serverTimestamp = function() {
                        return Qr("FieldValue.serverTimestamp", arguments), Ac.instance
                    }, t.arrayUnion = function() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        return jr("FieldValue.arrayUnion", arguments, 1), new kc(t)
                    }, t.arrayRemove = function() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        return jr("FieldValue.arrayRemove", arguments, 1), new Rc(t)
                    }, t.increment = function(t) {
                        return Wr("FieldValue.increment", "number", 1, t), Kr("FieldValue.increment", arguments, 1), new Mc(t)
                    }, t.prototype.isEqual = function(t) {
                        return this === t
                    }, t
                }(),
                Nc = function(t) {
                    function e() {
                        return t.call(this, "FieldValue.delete") || this
                    }
                    return s(e, t), e.instance = new e, e
                }(Dc),
                Ac = function(t) {
                    function e() {
                        return t.call(this, "FieldValue.serverTimestamp") || this
                    }
                    return s(e, t), e.instance = new e, e
                }(Dc),
                kc = function(n) {
                    function t(t) {
                        var e = n.call(this, "FieldValue.arrayUnion") || this;
                        return e._elements = t, e
                    }
                    return s(t, n), t
                }(Dc),
                Rc = function(n) {
                    function t(t) {
                        var e = n.call(this, "FieldValue.arrayRemove") || this;
                        return e._elements = t, e
                    }
                    return s(t, n), t
                }(Dc),
                Mc = function(n) {
                    function t(t) {
                        var e = n.call(this, "FieldValue.increment") || this;
                        return e._operand = t, e
                    }
                    return s(t, n), t
                }(Dc),
                Oc = xr(Dc, "Use FieldValue.<field>() instead."),
                _c = /^__.*__$/,
                Pc = function() {
                    function t(t, e, n) {
                        this.data = t, this.fieldMask = e, this.fieldTransforms = n
                    }
                    return t.prototype.toMutations = function(t, e) {
                        var n = [];
                        return null !== this.fieldMask ? n.push(new Mo(t, this.data, this.fieldMask, e)) : n.push(new Ro(t, this.data, e)), 0 < this.fieldTransforms.length && n.push(new Oo(t, this.fieldTransforms)), n
                    }, t
                }(),
                Lc = function() {
                    function t(t, e, n) {
                        this.data = t, this.fieldMask = e, this.fieldTransforms = n
                    }
                    return t.prototype.toMutations = function(t, e) {
                        var n = [new Mo(t, this.data, this.fieldMask, e)];
                        return 0 < this.fieldTransforms.length && n.push(new Oo(t, this.fieldTransforms)), n
                    }, t
                }();

            function xc(t) {
                switch (t) {
                    case Ic.Set:
                    case Ic.MergeSet:
                    case Ic.Update:
                        return !0;
                    case Ic.Argument:
                        return !1;
                    default:
                        throw Rr("Unexpected case for UserDataSource: " + t)
                }
            }(Cc = Ic || (Ic = {}))[Cc.Set = 0] = "Set", Cc[Cc.Update = 1] = "Update", Cc[Cc.MergeSet = 2] = "MergeSet", Cc[Cc.Argument = 3] = "Argument";
            var qc = function() {
                    function r(t, e, n, r, i, o) {
                        this.dataSource = t, this.methodName = e, this.path = n, this.arrayElement = r, void 0 === i && this.validatePath(), this.arrayElement = void 0 !== r && r, this.fieldTransforms = i || [], this.fieldMask = o || []
                    }
                    return r.prototype.childContextForField = function(t) {
                        var e = null == this.path ? null : this.path.child(t),
                            n = new r(this.dataSource, this.methodName, e, !1, this.fieldTransforms, this.fieldMask);
                        return n.validatePathSegment(t), n
                    }, r.prototype.childContextForFieldPath = function(t) {
                        var e = null == this.path ? null : this.path.child(t),
                            n = new r(this.dataSource, this.methodName, e, !1, this.fieldTransforms, this.fieldMask);
                        return n.validatePath(), n
                    }, r.prototype.childContextForArray = function(t) {
                        return new r(this.dataSource, this.methodName, null, !0, this.fieldTransforms, this.fieldMask)
                    }, r.prototype.createError = function(t) {
                        var e = null === this.path || this.path.isEmpty() ? "" : " (found in field " + this.path.toString() + ")";
                        return new Lr(Pr.INVALID_ARGUMENT, "Function " + this.methodName + "() called with invalid data. " + t + e)
                    }, r.prototype.contains = function(e) {
                        return void 0 !== this.fieldMask.find(function(t) {
                            return e.isPrefixOf(t)
                        }) || void 0 !== this.fieldTransforms.find(function(t) {
                            return e.isPrefixOf(t.field)
                        })
                    }, r.prototype.validatePath = function() {
                        if (null !== this.path)
                            for (var t = 0; t < this.path.length; t++) this.validatePathSegment(this.path.get(t))
                    }, r.prototype.validatePathSegment = function(t) {
                        if (xc(this.dataSource) && _c.test(t)) throw this.createError("Document fields cannot begin and end with __")
                    }, r
                }(),
                Fc = function(t, e) {
                    this.databaseId = t, this.key = e
                },
                Vc = function() {
                    function t(t) {
                        this.preConverter = t
                    }
                    return t.prototype.parseSetData = function(t, e) {
                        var n = new qc(Ic.Set, t, Ni.EMPTY_PATH);
                        Uc("Data must be an object, but it was:", n, e);
                        var r = this.parseData(e, n);
                        return new Pc(r, null, n.fieldTransforms)
                    }, t.prototype.parseMergeData = function(t, e, n) {
                        var r = new qc(Ic.MergeSet, t, Ni.EMPTY_PATH);
                        Uc("Data must be an object, but it was:", r, e);
                        var i, o, a = this.parseData(e, r);
                        if (n) {
                            for (var s = new To(Ni.comparator), u = 0, c = n; u < c.length; u++) {
                                var h = c[u],
                                    l = void 0;
                                if (h instanceof yc) l = h._internalPath;
                                else {
                                    if ("string" != typeof h) throw Rr("Expected stringOrFieldPath to be a string or a FieldPath");
                                    l = Kc(t, h)
                                }
                                if (!r.contains(l)) throw new Lr(Pr.INVALID_ARGUMENT, "Field '" + l + "' is specified in your field mask but missing from your input data.");
                                s = s.add(l)
                            }
                            i = Co.fromSet(s), o = r.fieldTransforms.filter(function(t) {
                                return i.covers(t.field)
                            })
                        } else i = Co.fromArray(r.fieldMask), o = r.fieldTransforms;
                        return new Pc(a, i, o)
                    }, t.prototype.parseUpdateData = function(o, t) {
                        var a = this,
                            s = new qc(Ic.Update, o, Ni.EMPTY_PATH);
                        Uc("Data must be an object, but it was:", s, t);
                        var u = new To(Ni.comparator),
                            c = Ji.EMPTY;
                        Br(t, function(t, e) {
                            var n = Kc(o, t),
                                r = s.childContextForFieldPath(n);
                            if ((e = a.runPreConverter(e, r)) instanceof Nc) u = u.add(n);
                            else {
                                var i = a.parseData(e, r);
                                null != i && (u = u.add(n), c = c.set(n, i))
                            }
                        });
                        var e = Co.fromSet(u);
                        return new Lc(c, e, s.fieldTransforms)
                    }, t.prototype.parseUpdateVarargs = function(t, e, n, r) {
                        var i = new qc(Ic.Update, t, Ni.EMPTY_PATH),
                            o = [Qc(t, e)],
                            a = [n];
                        if (r.length % 2 != 0) throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() needs to be called with an even number of arguments that alternate between field names and values.");
                        for (var s = 0; s < r.length; s += 2) o.push(Qc(t, r[s])), a.push(r[s + 1]);
                        var u = new To(Ni.comparator),
                            c = Ji.EMPTY;
                        for (s = 0; s < o.length; ++s) {
                            var h = o[s],
                                l = i.childContextForFieldPath(h),
                                f = this.runPreConverter(a[s], l);
                            if (f instanceof Nc) u = u.add(h);
                            else {
                                var p = this.parseData(f, l);
                                null != p && (u = u.add(h), c = c.set(h, p))
                            }
                        }
                        var d = Co.fromSet(u);
                        return new Lc(c, d, i.fieldTransforms)
                    }, t.prototype.parseQueryValue = function(t, e) {
                        var n = new qc(Ic.Argument, t, Ni.EMPTY_PATH),
                            r = this.parseData(e, n);
                        return Mr(null != r, "Parsed data should not be null."), Mr(0 === n.fieldTransforms.length, "Field transforms should have been disallowed."), r
                    }, t.prototype.runPreConverter = function(t, e) {
                        try {
                            return this.preConverter(t)
                        } catch (t) {
                            var n = jc(t);
                            throw e.createError(n)
                        }
                    }, t.prototype.parseData = function(t, e) {
                        if (Bc(t = this.runPreConverter(t, e))) return Uc("Unsupported field value:", e, t), this.parseObject(t, e);
                        if (t instanceof Dc) return this.parseSentinelFieldValue(t, e), null;
                        if (e.path && e.fieldMask.push(e.path), t instanceof Array) {
                            if (e.arrayElement) throw e.createError("Nested arrays are not supported");
                            return this.parseArray(t, e)
                        }
                        return this.parseScalarValue(t, e)
                    }, t.prototype.parseObject = function(t, r) {
                        var i = this,
                            o = new _i(si);
                        return Ur(t) ? r.path && 0 < r.path.length && r.fieldMask.push(r.path) : Br(t, function(t, e) {
                            var n = i.parseData(e, r.childContextForField(t));
                            null != n && (o = o.insert(t, n))
                        }), new Ji(o)
                    }, t.prototype.parseArray = function(t, e) {
                        for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
                            var a = o[i],
                                s = this.parseData(a, e.childContextForArray(r));
                            null == s && (s = Vi.INSTANCE), n.push(s), r++
                        }
                        return new $i(n)
                    }, t.prototype.parseSentinelFieldValue = function(t, e) {
                        if (!xc(e.dataSource)) throw e.createError(t._methodName + "() can only be used with update() and set()");
                        if (null === e.path) throw e.createError(t._methodName + "() is not currently supported inside arrays");
                        if (t instanceof Nc) {
                            if (e.dataSource !== Ic.MergeSet) throw e.dataSource === Ic.Update ? (Mr(0 < e.path.length, "FieldValue.delete() at the top level should have already been handled."), e.createError("FieldValue.delete() can only appear at the top level of your update data")) : e.createError("FieldValue.delete() cannot be used with set() unless you pass {merge:true}");
                            e.fieldMask.push(e.path)
                        } else if (t instanceof Ac) e.fieldTransforms.push(new Do(e.path, Po.instance));
                        else if (t instanceof kc) {
                            var n = this.parseArrayTransformElements(t._methodName, t._elements),
                                r = new Lo(n);
                            e.fieldTransforms.push(new Do(e.path, r))
                        } else if (t instanceof Rc) {
                            n = this.parseArrayTransformElements(t._methodName, t._elements);
                            var i = new xo(n);
                            e.fieldTransforms.push(new Do(e.path, i))
                        } else if (t instanceof Mc) {
                            var o = this.parseQueryValue("FieldValue.increment", t._operand),
                                a = new qo(o);
                            e.fieldTransforms.push(new Do(e.path, a))
                        } else Rr("Unknown FieldValue type: " + t)
                    }, t.prototype.parseScalarValue = function(t, e) {
                        if (null === t) return Vi.INSTANCE;
                        if ("number" == typeof t) return io(t) ? new Ki(t) : new ji(t);
                        if ("boolean" == typeof t) return Bi.of(t);
                        if ("string" == typeof t) return new Gi(t);
                        if (t instanceof Date) return new Wi(bi.fromDate(t));
                        if (t instanceof bi) return new Wi(new bi(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3)));
                        if (t instanceof vi) return new Xi(t);
                        if (t instanceof yi) return new Hi(t);
                        if (t instanceof Fc) return new Yi(t.databaseId, t.key);
                        throw e.createError("Unsupported field value: " + ti(t))
                    }, t.prototype.parseArrayTransformElements = function(r, t) {
                        var i = this;
                        return t.map(function(t, e) {
                            var n = new qc(Ic.Argument, r, Ni.EMPTY_PATH);
                            return i.parseData(t, n.childContextForArray(e))
                        })
                    }, t
                }();

            function Bc(t) {
                return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof bi || t instanceof vi || t instanceof yi || t instanceof Fc || t instanceof Dc)
            }

            function Uc(t, e, n) {
                if (!Bc(n) || !Zr(n)) {
                    var r = ti(n);
                    throw "an object" === r ? e.createError(t + " a custom object") : e.createError(t + " " + r)
                }
            }

            function Qc(t, e) {
                if (e instanceof yc) return e._internalPath;
                if ("string" == typeof e) return Kc(t, e);
                throw new Lr(Pr.INVALID_ARGUMENT, "Function " + t + "() called with invalid data. Field path arguments must be of type string or FieldPath.")
            }

            function Kc(e, t) {
                try {
                    return function(e) {
                        if (0 <= e.search(gc)) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid field path (" + e + "). Paths must not contain '~', '*', '/', '[', or ']'");
                        try {
                            return new(yc.bind.apply(yc, [void 0].concat(e.split("."))))
                        } catch (t) {
                            throw new Lr(Pr.INVALID_ARGUMENT, "Invalid field path (" + e + "). Paths must not be empty, begin with '.', end with '.', or contain '..'")
                        }
                    }(t)._internalPath
                } catch (t) {
                    var n = jc(t);
                    throw new Lr(Pr.INVALID_ARGUMENT, "Function " + e + "() called with invalid data. " + n)
                }
            }

            function jc(t) {
                return t instanceof Error ? t.message : t.toString()
            }
            var Gc = eu.COLLECTION_DISABLED,
                Wc = function() {
                    function t(t) {
                        if (void 0 === t.host) {
                            if (void 0 !== t.ssl) throw new Lr(Pr.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
                            this.host = "firestore.googleapis.com", this.ssl = !0
                        } else Hr("settings", "non-empty string", "host", t.host), this.host = t.host, Yr("settings", "boolean", "ssl", t.ssl), this.ssl = Fr(t.ssl, !0);
                        if (ni("settings", t, ["host", "ssl", "credentials", "timestampsInSnapshots", "cacheSizeBytes", "experimentalForceLongPolling"]), Yr("settings", "object", "credentials", t.credentials), this.credentials = t.credentials, Yr("settings", "boolean", "timestampsInSnapshots", t.timestampsInSnapshots), !0 === t.timestampsInSnapshots ? Ar("\n  The timestampsInSnapshots setting now defaults to true and you no\n  longer need to explicitly set it. In a future release, the setting\n  will be removed entirely and so it is recommended that you remove it\n  from your firestore.settings() call now.") : !1 === t.timestampsInSnapshots && Ar("\n  The timestampsInSnapshots setting will soon be removed. YOU MUST UPDATE\n  YOUR CODE.\n\n  To hide this warning, stop using the timestampsInSnapshots setting in your\n  firestore.settings({ ... }) call.\n\n  Once you remove the setting, Timestamps stored in Cloud Firestore will be\n  read back as Firebase Timestamp objects instead of as system Date objects.\n  So you will also need to update code expecting a Date to instead expect a\n  Timestamp. For example:\n\n  // Old:\n  const date = snapshot.get('created_at');\n  // New:\n  const timestamp = snapshot.get('created_at'); const date =\n  timestamp.toDate();\n\n  Please audit all existing usages of Date when you enable the new\n  behavior."), this.timestampsInSnapshots = Fr(t.timestampsInSnapshots, !0), Yr("settings", "number", "cacheSizeBytes", t.cacheSizeBytes), void 0 === t.cacheSizeBytes) this.cacheSizeBytes = eu.DEFAULT_CACHE_SIZE_BYTES;
                        else {
                            if (t.cacheSizeBytes !== Gc && t.cacheSizeBytes < eu.MINIMUM_CACHE_SIZE_BYTES) throw new Lr(Pr.INVALID_ARGUMENT, "cacheSizeBytes must be at least " + eu.MINIMUM_CACHE_SIZE_BYTES);
                            this.cacheSizeBytes = t.cacheSizeBytes
                        }
                        Yr("settings", "boolean", "experimentalForceLongPolling", t.experimentalForceLongPolling), this.forceLongPolling = void 0 !== t.experimentalForceLongPolling && t.experimentalForceLongPolling
                    }
                    return t.prototype.isEqual = function(t) {
                        return this.host === t.host && this.ssl === t.ssl && this.timestampsInSnapshots === t.timestampsInSnapshots && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.forceLongPolling === t.forceLongPolling
                    }, t
                }(),
                zc = function() {},
                Hc = function() {
                    function o(t) {
                        var e = this;
                        this._queue = new Va, this.INTERNAL = {
                            delete: function() {
                                return h(e, void 0, void 0, function() {
                                    return p(this, function(t) {
                                        switch (t.label) {
                                            case 0:
                                                return this.ensureClientConfigured(), [4, this._firestoreClient.shutdown()];
                                            case 1:
                                                return t.sent(), this.clientRunning = !1, [2]
                                        }
                                    })
                                })
                            }
                        }, this.clientRunning = !1;
                        var n = new zc;
                        if ("object" == typeof t.options) {
                            var r = t;
                            n.firebaseApp = r, n.databaseId = o.databaseIdFromApp(r), n.persistenceKey = n.firebaseApp.name, n.credentials = new wc(r)
                        } else {
                            var i = t;
                            if (!i.projectId) throw new Lr(Pr.INVALID_ARGUMENT, "Must provide projectId");
                            n.databaseId = new Si(i.projectId, i.database), n.persistenceKey = "[DEFAULT]", n.credentials = new bc
                        }
                        n.settings = new Wc({}), this._config = n, this._databaseId = n.databaseId
                    }
                    return o.prototype.settings = function(t) {
                        if (Kr("Firestore.settings", arguments, 1), Wr("Firestore.settings", "object", 1, t), qr(t, "persistence")) throw new Lr(Pr.INVALID_ARGUMENT, '"persistence" is now specified with a separate call to firestore.enablePersistence().');
                        var e = new Wc(t);
                        if (this._firestoreClient && !this._config.settings.isEqual(e)) throw new Lr(Pr.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only call settings() before calling any other methods on a Firestore object.");
                        void 0 !== (this._config.settings = e).credentials && (this._config.credentials = function(t) {
                            if (!t) return new bc;
                            switch (t.type) {
                                case "gapi":
                                    var e = t.client;
                                    return Mr(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty), "unexpected gapi interface"), new Sc(e, t.sessionIndex || "0");
                                case "provider":
                                    return t.client;
                                default:
                                    throw new Lr(Pr.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type")
                            }
                        }(e.credentials))
                    }, o.prototype.enableNetwork = function() {
                        return this.ensureClientConfigured(), this._firestoreClient.enableNetwork()
                    }, o.prototype.disableNetwork = function() {
                        return this.ensureClientConfigured(), this._firestoreClient.disableNetwork()
                    }, o.prototype.enablePersistence = function(t) {
                        if (this._firestoreClient) throw new Lr(Pr.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only call enablePersistence() before calling any other methods on a Firestore object.");
                        return this.configureClient(new fc(this._config.settings.cacheSizeBytes, void 0 !== t && Fr(t.experimentalTabSynchronization, !1)))
                    }, o.prototype._clearPersistence = function() {
                        if (this.clientRunning) throw new Lr(Pr.FAILED_PRECONDITION, "Persistence cannot be cleared while the client is running");
                        var t = uu.buildStoragePrefix(this.makeDatabaseInfo());
                        return uu.clearPersistence(t)
                    }, o.prototype.ensureClientConfigured = function() {
                        return this._firestoreClient || this.configureClient(new pc), this._firestoreClient
                    }, o.prototype.makeDatabaseInfo = function() {
                        return new wi(this._config.databaseId, this._config.persistenceKey, this._config.settings.host, this._config.settings.ssl, this._config.settings.forceLongPolling)
                    }, o.prototype.configureClient = function(t) {
                        var r = this;
                        Mr(!!this._config.settings.host, "FirestoreSettings.host cannot be falsey"), Mr(!this._firestoreClient, "configureClient() called multiple times"), this.clientRunning = !0;
                        var e = this.makeDatabaseInfo();
                        return this._dataConverter = new Vc(function(t) {
                            if (t instanceof Jc) {
                                var e = r._config.databaseId,
                                    n = t.firestore._config.databaseId;
                                if (!n.isEqual(e)) throw new Lr(Pr.INVALID_ARGUMENT, "Document reference is for database " + n.projectId + "/" + n.database + " but should be for database " + e.projectId + "/" + e.database);
                                return new Fc(r._config.databaseId, t._key)
                            }
                            return t
                        }), this._firestoreClient = new dc(Or.getPlatform(), e, this._config.credentials, this._queue), this._firestoreClient.start(t)
                    }, o.databaseIdFromApp = function(t) {
                        var e = t.options;
                        if (!qr(e, "projectId")) throw new Lr(Pr.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
                        var n = e.projectId;
                        if (!n || "string" != typeof n) throw new Lr(Pr.INVALID_ARGUMENT, "projectId must be a string in FirebaseApp.options");
                        return new Si(n)
                    }, Object.defineProperty(o.prototype, "app", {
                        get: function() {
                            if (!this._config.firebaseApp) throw new Lr(Pr.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
                            return this._config.firebaseApp
                        },
                        enumerable: !0,
                        configurable: !0
                    }), o.prototype.collection = function(t) {
                        return Kr("Firestore.collection", arguments, 1), Wr("Firestore.collection", "non-empty string", 1, t), this.ensureClientConfigured(), new rh(Ci.fromString(t), this)
                    }, o.prototype.doc = function(t) {
                        return Kr("Firestore.doc", arguments, 1), Wr("Firestore.doc", "non-empty string", 1, t), this.ensureClientConfigured(), Jc.forPath(Ci.fromString(t), this)
                    }, o.prototype._collectionGroup = function(t) {
                        if (Kr("Firestore.collectionGroup", arguments, 1), Wr("Firestore.collectionGroup", "non-empty string", 1, t), 0 <= t.indexOf("/")) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid collection ID '" + t + "' passed to function Firestore.collectionGroup(). Collection IDs must not contain '/'.");
                        return this.ensureClientConfigured(), new eh(new so(Ci.EMPTY_PATH, t), this)
                    }, o.prototype.runTransaction = function(e) {
                        var n = this;
                        return Kr("Firestore.runTransaction", arguments, 1), Wr("Firestore.runTransaction", "function", 1, e), this.ensureClientConfigured().transaction(function(t) {
                            return e(new Yc(n, t))
                        })
                    }, o.prototype.batch = function() {
                        return this.ensureClientConfigured(), new Xc(this)
                    }, Object.defineProperty(o, "logLevel", {
                        get: function() {
                            switch (Cr()) {
                                case wr.DEBUG:
                                    return "debug";
                                case wr.ERROR:
                                    return "error";
                                case wr.SILENT:
                                    return "silent";
                                default:
                                    return Rr("Unknown log level: " + Cr())
                            }
                        },
                        enumerable: !0,
                        configurable: !0
                    }), o.setLogLevel = function(t) {
                        switch (Kr("Firestore.setLogLevel", arguments, 1), Wr("Firestore.setLogLevel", "non-empty string", 1, t), t) {
                            case "debug":
                                Dr(wr.DEBUG);
                                break;
                            case "error":
                                Dr(wr.ERROR);
                                break;
                            case "silent":
                                Dr(wr.SILENT);
                                break;
                            default:
                                throw new Lr(Pr.INVALID_ARGUMENT, "Invalid log level: " + t)
                        }
                    }, o.prototype._areTimestampsInSnapshotsEnabled = function() {
                        return this._config.settings.timestampsInSnapshots
                    }, o
                }(),
                Yc = function() {
                    function t(t, e) {
                        this._firestore = t, this._transaction = e
                    }
                    return t.prototype.get = function(t) {
                        var n = this;
                        Kr("Transaction.get", arguments, 1);
                        var r = sh("Transaction.get", t, this._firestore);
                        return this._transaction.lookup([r._key]).then(function(t) {
                            if (!t || 1 !== t.length) return Rr("Mismatch in docs returned from document lookup.");
                            var e = t[0];
                            if (e instanceof Mi) return new Zc(n._firestore, r._key, null, !1, !1);
                            if (e instanceof Ri) return new Zc(n._firestore, r._key, e, !1, !1);
                            throw Rr("BatchGetDocumentsRequest returned unexpected document type: " + e.constructor.name)
                        })
                    }, t.prototype.set = function(t, e, n) {
                        Gr("Transaction.set", arguments, 2, 3);
                        var r = sh("Transaction.set", t, this._firestore),
                            i = (n = ih("Transaction.set", n)).merge || n.mergeFields ? this._firestore._dataConverter.parseMergeData("Transaction.set", e, n.mergeFields) : this._firestore._dataConverter.parseSetData("Transaction.set", e);
                        return this._transaction.set(r._key, i), this
                    }, t.prototype.update = function(t, e, n) {
                        for (var r, i, o = [], a = 3; a < arguments.length; a++) o[a - 3] = arguments[a];
                        return i = "string" == typeof e || e instanceof yc ? (jr("Transaction.update", arguments, 3), r = sh("Transaction.update", t, this._firestore), this._firestore._dataConverter.parseUpdateVarargs("Transaction.update", e, n, o)) : (Kr("Transaction.update", arguments, 2), r = sh("Transaction.update", t, this._firestore), this._firestore._dataConverter.parseUpdateData("Transaction.update", e)), this._transaction.update(r._key, i), this
                    }, t.prototype.delete = function(t) {
                        Kr("Transaction.delete", arguments, 1);
                        var e = sh("Transaction.delete", t, this._firestore);
                        return this._transaction.delete(e._key), this
                    }, t
                }(),
                Xc = function() {
                    function t(t) {
                        this._firestore = t, this._mutations = [], this._committed = !1
                    }
                    return t.prototype.set = function(t, e, n) {
                        Gr("WriteBatch.set", arguments, 2, 3), this.verifyNotCommitted();
                        var r = sh("WriteBatch.set", t, this._firestore),
                            i = (n = ih("WriteBatch.set", n)).merge || n.mergeFields ? this._firestore._dataConverter.parseMergeData("WriteBatch.set", e, n.mergeFields) : this._firestore._dataConverter.parseSetData("WriteBatch.set", e);
                        return this._mutations = this._mutations.concat(i.toMutations(r._key, Ao.NONE)), this
                    }, t.prototype.update = function(t, e, n) {
                        for (var r, i, o = [], a = 3; a < arguments.length; a++) o[a - 3] = arguments[a];
                        return this.verifyNotCommitted(), i = "string" == typeof e || e instanceof yc ? (jr("WriteBatch.update", arguments, 3), r = sh("WriteBatch.update", t, this._firestore), this._firestore._dataConverter.parseUpdateVarargs("WriteBatch.update", e, n, o)) : (Kr("WriteBatch.update", arguments, 2), r = sh("WriteBatch.update", t, this._firestore), this._firestore._dataConverter.parseUpdateData("WriteBatch.update", e)), this._mutations = this._mutations.concat(i.toMutations(r._key, Ao.exists(!0))), this
                    }, t.prototype.delete = function(t) {
                        Kr("WriteBatch.delete", arguments, 1), this.verifyNotCommitted();
                        var e = sh("WriteBatch.delete", t, this._firestore);
                        return this._mutations = this._mutations.concat(new _o(e._key, Ao.NONE)), this
                    }, t.prototype.commit = function() {
                        return h(this, void 0, void 0, function() {
                            return p(this, function(t) {
                                return this.verifyNotCommitted(), this._committed = !0, 0 < this._mutations.length ? [2, this._firestore.ensureClientConfigured().write(this._mutations)] : [2]
                            })
                        })
                    }, t.prototype.verifyNotCommitted = function() {
                        if (this._committed) throw new Lr(Pr.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.")
                    }, t
                }(),
                Jc = function() {
                    function n(t, e) {
                        this._key = t, this.firestore = e, this._firestoreClient = this.firestore.ensureClientConfigured()
                    }
                    return n.forPath = function(t, e) {
                        if (t.length % 2 != 0) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + t.canonicalString() + " has " + t.length);
                        return new n(new Ai(t), e)
                    }, Object.defineProperty(n.prototype, "id", {
                        get: function() {
                            return this._key.path.lastSegment()
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(n.prototype, "parent", {
                        get: function() {
                            return new rh(this._key.path.popLast(), this.firestore)
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(n.prototype, "path", {
                        get: function() {
                            return this._key.path.canonicalString()
                        },
                        enumerable: !0,
                        configurable: !0
                    }), n.prototype.collection = function(t) {
                        if (Kr("DocumentReference.collection", arguments, 1), Wr("DocumentReference.collection", "non-empty string", 1, t), !t) throw new Lr(Pr.INVALID_ARGUMENT, "Must provide a non-empty collection name to collection()");
                        var e = Ci.fromString(t);
                        return new rh(this._key.path.child(e), this.firestore)
                    }, n.prototype.isEqual = function(t) {
                        if (!(t instanceof n)) throw ri("isEqual", "DocumentReference", 1, t);
                        return this.firestore === t.firestore && this._key.isEqual(t._key)
                    }, n.prototype.set = function(t, e) {
                        Gr("DocumentReference.set", arguments, 1, 2);
                        var n = (e = ih("DocumentReference.set", e)).merge || e.mergeFields ? this.firestore._dataConverter.parseMergeData("DocumentReference.set", t, e.mergeFields) : this.firestore._dataConverter.parseSetData("DocumentReference.set", t);
                        return this._firestoreClient.write(n.toMutations(this._key, Ao.NONE))
                    }, n.prototype.update = function(t, e) {
                        for (var n, r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
                        return n = "string" == typeof t || t instanceof yc ? (jr("DocumentReference.update", arguments, 2), this.firestore._dataConverter.parseUpdateVarargs("DocumentReference.update", t, e, r)) : (Kr("DocumentReference.update", arguments, 1), this.firestore._dataConverter.parseUpdateData("DocumentReference.update", t)), this._firestoreClient.write(n.toMutations(this._key, Ao.exists(!0)))
                    }, n.prototype.delete = function() {
                        return Kr("DocumentReference.delete", arguments, 0), this._firestoreClient.write([new _o(this._key, Ao.NONE)])
                    }, n.prototype.onSnapshot = function() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        Gr("DocumentReference.onSnapshot", arguments, 1, 4);
                        var n, r = {
                                includeMetadataChanges: !1
                            },
                            i = 0;
                        "object" != typeof t[i] || Tc(t[i]) || (ni("DocumentReference.onSnapshot", r = t[i], ["includeMetadataChanges"]), Yr("DocumentReference.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), i++);
                        var o = {
                            includeMetadataChanges: r.includeMetadataChanges
                        };
                        return n = Tc(t[i]) ? t[i] : (Wr("DocumentReference.onSnapshot", "function", i, t[i]), zr("DocumentReference.onSnapshot", "function", i + 1, t[i + 1]), zr("DocumentReference.onSnapshot", "function", i + 2, t[i + 2]), {
                            next: t[i],
                            error: t[i + 1],
                            complete: t[i + 2]
                        }), this.onSnapshotInternal(o, n)
                    }, n.prototype.onSnapshotInternal = function(t, n) {
                        var r = this,
                            e = function(t) {
                                console.error("Uncaught Error in onSnapshot:", t)
                            };
                        n.error && (e = n.error.bind(n));
                        var i = new mc({
                                next: function(t) {
                                    if (n.next) {
                                        Mr(t.docs.size <= 1, "Too many documents returned on a document query");
                                        var e = t.docs.get(r._key);
                                        n.next(new Zc(r.firestore, r._key, e, t.fromCache, t.hasPendingWrites))
                                    }
                                },
                                error: e
                            }),
                            o = this._firestoreClient.listen(so.atPath(this._key.path), i, t);
                        return function() {
                            i.mute(), r._firestoreClient.unlisten(o)
                        }
                    }, n.prototype.get = function(n) {
                        var r = this;
                        return Gr("DocumentReference.get", arguments, 0, 1), ah("DocumentReference.get", n), new Promise(function(e, t) {
                            n && "cache" === n.source ? r.firestore.ensureClientConfigured().getDocumentFromLocalCache(r._key).then(function(t) {
                                e(new Zc(r.firestore, r._key, t, !0, t instanceof Ri && t.hasLocalMutations))
                            }, t) : r.getViaSnapshotListener(e, t, n)
                        })
                    }, n.prototype.getViaSnapshotListener = function(e, n, r) {
                        var i = this.onSnapshotInternal({
                            includeMetadataChanges: !0,
                            waitForSyncWhenOnline: !0
                        }, {
                            next: function(t) {
                                i(), !t.exists && t.metadata.fromCache ? n(new Lr(Pr.UNAVAILABLE, "Failed to get document because the client is offline.")) : t.exists && t.metadata.fromCache && r && "server" === r.source ? n(new Lr(Pr.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : e(t)
                            },
                            error: n
                        })
                    }, n
                }(),
                $c = function() {
                    function t(t, e) {
                        this.hasPendingWrites = t, this.fromCache = e
                    }
                    return t.prototype.isEqual = function(t) {
                        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache
                    }, t
                }(),
                Zc = function() {
                    function e(t, e, n, r, i) {
                        this._firestore = t, this._key = e, this._document = n, this._fromCache = r, this._hasPendingWrites = i
                    }
                    return e.prototype.data = function(t) {
                        return Gr("DocumentSnapshot.data", arguments, 0, 1), t = oh("DocumentSnapshot.data", t), this._document ? this.convertObject(this._document.data, qi.fromSnapshotOptions(t, this._firestore._areTimestampsInSnapshotsEnabled())) : void 0
                    }, e.prototype.get = function(t, e) {
                        if (Gr("DocumentSnapshot.get", arguments, 1, 2), e = oh("DocumentSnapshot.get", e), this._document) {
                            var n = this._document.data.field(Qc("DocumentSnapshot.get", t));
                            if (void 0 !== n) return this.convertValue(n, qi.fromSnapshotOptions(e, this._firestore._areTimestampsInSnapshotsEnabled()))
                        }
                    }, Object.defineProperty(e.prototype, "id", {
                        get: function() {
                            return this._key.path.lastSegment()
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "ref", {
                        get: function() {
                            return new Jc(this._key, this._firestore)
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "exists", {
                        get: function() {
                            return null !== this._document
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "metadata", {
                        get: function() {
                            return new $c(this._hasPendingWrites, this._fromCache)
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.isEqual = function(t) {
                        if (!(t instanceof e)) throw ri("isEqual", "DocumentSnapshot", 1, t);
                        return this._firestore === t._firestore && this._fromCache === t._fromCache && this._key.isEqual(t._key) && (null === this._document ? null === t._document : this._document.isEqual(t._document))
                    }, e.prototype.convertObject = function(t, n) {
                        var r = this,
                            i = {};
                        return t.forEach(function(t, e) {
                            i[t] = r.convertValue(e, n)
                        }), i
                    }, e.prototype.convertValue = function(t, e) {
                        if (t instanceof Ji) return this.convertObject(t, e);
                        if (t instanceof $i) return this.convertArray(t, e);
                        if (t instanceof Yi) {
                            var n = t.value(e),
                                r = this._firestore.ensureClientConfigured().databaseId();
                            return t.databaseId.isEqual(r) || Ar("Document " + this._key.path + " contains a document reference within a different database (" + t.databaseId.projectId + "/" + t.databaseId.database + ") which is not supported. It will be treated as a reference in the current database (" + r.projectId + "/" + r.database + ") instead."), new Jc(n, this._firestore)
                        }
                        return t.value(e)
                    }, e.prototype.convertArray = function(t, e) {
                        var n = this;
                        return t.internalValue.map(function(t) {
                            return n.convertValue(t, e)
                        })
                    }, e
                }(),
                th = function(o) {
                    function t(t, e, n, r, i) {
                        return o.call(this, t, e, n, r, i) || this
                    }
                    return s(t, o), t.prototype.data = function(t) {
                        var e = o.prototype.data.call(this, t);
                        return Mr("object" == typeof e, "Document in a QueryDocumentSnapshot should exist"), e
                    }, t
                }(Zc),
                eh = function() {
                    function c(t, e) {
                        this._query = t, this.firestore = e
                    }
                    return c.prototype.where = function(t, e, n) {
                        Kr("Query.where", arguments, 3), ei("Query.where", 3, n);
                        var r;
                        ! function(t, e, n, r) {
                            if (!e.some(function(t) {
                                    return t === r
                                })) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid value " + ti(r) + " provided to function " + t + "() for its " + ii(n) + " argument. Acceptable values: " + e.join(", "))
                        }("Query.where", ["<", "<=", "==", ">=", ">", "array-contains"], 2, e);
                        var i = Qc("Query.where", t),
                            o = co.fromString(e);
                        if (i.isKeyField()) {
                            if (o === co.ARRAY_CONTAINS) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid Query. You can't perform array-contains queries on FieldPath.documentId() since document IDs are not arrays.");
                            if ("string" == typeof n) {
                                if ("" === n) throw new Lr(Pr.INVALID_ARGUMENT, "Function Query.where() requires its third parameter to be a valid document ID if the first parameter is FieldPath.documentId(), but it was an empty string.");
                                if (!this._query.isCollectionGroupQuery() && -1 !== n.indexOf("/")) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid third parameter to Query.where(). When querying a collection by FieldPath.documentId(), the value provided must be a plain document ID, but '" + n + "' contains a slash.");
                                var a = this._query.path.child(Ci.fromString(n));
                                if (!Ai.isDocumentKey(a)) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid third parameter to Query.where(). When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" + a + "' is not because it has an odd number of segments (" + a.length + ").");
                                r = new Yi(this.firestore._databaseId, new Ai(a))
                            } else {
                                if (!(n instanceof Jc)) throw new Lr(Pr.INVALID_ARGUMENT, "Function Query.where() requires its third parameter to be a string or a DocumentReference if the first parameter is FieldPath.documentId(), but it was: " + ti(n) + ".");
                                var s = n;
                                r = new Yi(this.firestore._databaseId, s._key)
                            }
                        } else r = this.firestore._dataConverter.parseQueryValue("Query.where", n);
                        var u = uo.create(i, o, r);
                        return this.validateNewFilter(u), new c(this._query.addFilter(u), this.firestore)
                    }, c.prototype.orderBy = function(t, e) {
                        var n;
                        if (Gr("Query.orderBy", arguments, 1, 2), zr("Query.orderBy", "non-empty string", 2, e), void 0 === e || "asc" === e) n = po.ASCENDING;
                        else {
                            if ("desc" !== e) throw new Lr(Pr.INVALID_ARGUMENT, "Function Query.orderBy() has unknown direction '" + e + "', expected 'asc' or 'desc'.");
                            n = po.DESCENDING
                        }
                        if (null !== this._query.startAt) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. You must not call Query.startAt() or Query.startAfter() before calling Query.orderBy().");
                        if (null !== this._query.endAt) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. You must not call Query.endAt() or Query.endBefore() before calling Query.orderBy().");
                        var r = Qc("Query.orderBy", t),
                            i = new yo(r, n);
                        return this.validateNewOrderBy(i), new c(this._query.addOrderBy(i), this.firestore)
                    }, c.prototype.limit = function(t) {
                        if (Kr("Query.limit", arguments, 1), Wr("Query.limit", "number", 1, t), t <= 0) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid Query. Query limit (" + t + ") is invalid. Limit must be positive.");
                        return new c(this._query.withLimit(t), this.firestore)
                    }, c.prototype.startAt = function(t) {
                        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                        jr("Query.startAt", arguments, 1);
                        var r = this.boundFromDocOrFields("Query.startAt", t, e, !0);
                        return new c(this._query.withStartAt(r), this.firestore)
                    }, c.prototype.startAfter = function(t) {
                        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                        jr("Query.startAfter", arguments, 1);
                        var r = this.boundFromDocOrFields("Query.startAfter", t, e, !1);
                        return new c(this._query.withStartAt(r), this.firestore)
                    }, c.prototype.endBefore = function(t) {
                        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                        jr("Query.endBefore", arguments, 1);
                        var r = this.boundFromDocOrFields("Query.endBefore", t, e, !0);
                        return new c(this._query.withEndAt(r), this.firestore)
                    }, c.prototype.endAt = function(t) {
                        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                        jr("Query.endAt", arguments, 1);
                        var r = this.boundFromDocOrFields("Query.endAt", t, e, !1);
                        return new c(this._query.withEndAt(r), this.firestore)
                    }, c.prototype.isEqual = function(t) {
                        if (!(t instanceof c)) throw ri("isEqual", "Query", 1, t);
                        return this.firestore === t.firestore && this._query.isEqual(t._query)
                    }, c.prototype.boundFromDocOrFields = function(t, e, n, r) {
                        if (ei(t, 1, e), e instanceof Zc) {
                            if (0 < n.length) throw new Lr(Pr.INVALID_ARGUMENT, "Too many arguments provided to " + t + "().");
                            var i = e;
                            if (!i.exists) throw new Lr(Pr.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + t + "().");
                            return this.boundFromDocument(t, i._document, r)
                        }
                        var o = [e].concat(n);
                        return this.boundFromFields(t, o, r)
                    }, c.prototype.boundFromDocument = function(t, e, n) {
                        for (var r = [], i = 0, o = this._query.orderBy; i < o.length; i++) {
                            var a = o[i];
                            if (a.field.isKeyField()) r.push(new Yi(this.firestore._databaseId, e.key));
                            else {
                                var s = e.field(a.field);
                                if (s instanceof zi) throw new Lr(Pr.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + a.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                                if (void 0 === s) {
                                    var u = a.field.canonicalString();
                                    throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + u + "' (used as the orderBy) does not exist.")
                                }
                                r.push(s)
                            }
                        }
                        return new mo(r, n)
                    }, c.prototype.boundFromFields = function(t, e, n) {
                        var r = this._query.explicitOrderBy;
                        if (e.length > r.length) throw new Lr(Pr.INVALID_ARGUMENT, "Too many arguments provided to " + t + "(). The number of arguments must be less than or equal to the number of Query.orderBy() clauses");
                        for (var i = [], o = 0; o < e.length; o++) {
                            var a = e[o];
                            if (r[o].field.isKeyField()) {
                                if ("string" != typeof a) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + t + "(), but got a " + typeof a);
                                if (!this._query.isCollectionGroupQuery() && -1 !== a.indexOf("/")) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to " + t + "() must be a plain document ID, but '" + a + "' contains a slash.");
                                var s = this._query.path.child(Ci.fromString(a));
                                if (!Ai.isDocumentKey(s)) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to " + t + "() must result in a valid document path, but '" + s + "' is not because it contains an odd number of segments.");
                                var u = new Ai(s);
                                i.push(new Yi(this.firestore._databaseId, u))
                            } else {
                                var c = this.firestore._dataConverter.parseQueryValue(t, a);
                                i.push(c)
                            }
                        }
                        return new mo(i, n)
                    }, c.prototype.onSnapshot = function() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        Gr("Query.onSnapshot", arguments, 1, 4);
                        var n, r = {},
                            i = 0;
                        return "object" != typeof t[i] || Tc(t[i]) || (ni("Query.onSnapshot", r = t[i], ["includeMetadataChanges"]), Yr("Query.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), i++), n = Tc(t[i]) ? t[i] : (Wr("Query.onSnapshot", "function", i, t[i]), zr("Query.onSnapshot", "function", i + 1, t[i + 1]), zr("Query.onSnapshot", "function", i + 2, t[i + 2]), {
                            next: t[i],
                            error: t[i + 1],
                            complete: t[i + 2]
                        }), this.onSnapshotInternal(r, n)
                    }, c.prototype.onSnapshotInternal = function(t, e) {
                        var n = this,
                            r = function(t) {
                                console.error("Uncaught Error in onSnapshot:", t)
                            };
                        e.error && (r = e.error.bind(e));
                        var i = new mc({
                                next: function(t) {
                                    e.next && e.next(new nh(n.firestore, n._query, t))
                                },
                                error: r
                            }),
                            o = this.firestore.ensureClientConfigured(),
                            a = o.listen(this._query, i, t);
                        return function() {
                            i.mute(), o.unlisten(a)
                        }
                    }, c.prototype.get = function(n) {
                        var r = this;
                        return Gr("Query.get", arguments, 0, 1), ah("Query.get", n), new Promise(function(e, t) {
                            n && "cache" === n.source ? r.firestore.ensureClientConfigured().getDocumentsFromLocalCache(r._query).then(function(t) {
                                e(new nh(r.firestore, r._query, t))
                            }, t) : r.getViaSnapshotListener(e, t, n)
                        })
                    }, c.prototype.getViaSnapshotListener = function(e, n, r) {
                        var i = this.onSnapshotInternal({
                            includeMetadataChanges: !0,
                            waitForSyncWhenOnline: !0
                        }, {
                            next: function(t) {
                                i(), t.metadata.fromCache && r && "server" === r.source ? n(new Lr(Pr.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : e(t)
                            },
                            error: n
                        })
                    }, c.prototype.validateNewFilter = function(t) {
                        if (t instanceof ho)
                            if (t.isInequality()) {
                                var e = this._query.getInequalityFilterField();
                                if (null !== e && !e.isEqual(t.field)) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '" + e.toString() + "' and '" + t.field.toString() + "'");
                                var n = this._query.getFirstOrderByField();
                                null !== n && this.validateOrderByAndInequalityMatch(t.field, n)
                            } else if (t.op === co.ARRAY_CONTAINS && this._query.hasArrayContainsFilter()) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. Queries only support a single array-contains filter.")
                    }, c.prototype.validateNewOrderBy = function(t) {
                        if (null === this._query.getFirstOrderByField()) {
                            var e = this._query.getInequalityFilterField();
                            null !== e && this.validateOrderByAndInequalityMatch(e, t.field)
                        }
                    }, c.prototype.validateOrderByAndInequalityMatch = function(t, e) {
                        if (!e.isEqual(t)) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '" + t.toString() + "' and so you must also use '" + t.toString() + "' as your first Query.orderBy(), but your first Query.orderBy() is on field '" + e.toString() + "' instead.")
                    }, c
                }(),
                nh = function() {
                    function e(t, e, n) {
                        this._firestore = t, this._originalQuery = e, this._snapshot = n, this._cachedChanges = null, this._cachedChangesIncludeMetadataChanges = null, this.metadata = new $c(n.hasPendingWrites, n.fromCache)
                    }
                    return Object.defineProperty(e.prototype, "docs", {
                        get: function() {
                            var e = [];
                            return this.forEach(function(t) {
                                return e.push(t)
                            }), e
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "empty", {
                        get: function() {
                            return this._snapshot.docs.isEmpty()
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(e.prototype, "size", {
                        get: function() {
                            return this._snapshot.docs.size
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.forEach = function(e, n) {
                        var r = this;
                        Gr("QuerySnapshot.forEach", arguments, 1, 2), Wr("QuerySnapshot.forEach", "function", 1, e), this._snapshot.docs.forEach(function(t) {
                            e.call(n, r.convertToDocumentImpl(t))
                        })
                    }, Object.defineProperty(e.prototype, "query", {
                        get: function() {
                            return new eh(this._originalQuery, this._firestore)
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.docChanges = function(t) {
                        t && (ni("QuerySnapshot.docChanges", t, ["includeMetadataChanges"]), Yr("QuerySnapshot.docChanges", "boolean", "includeMetadataChanges", t.includeMetadataChanges));
                        var e = !(!t || !t.includeMetadataChanges);
                        if (e && this._snapshot.excludesMetadataChanges) throw new Lr(Pr.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
                        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = function(i, e, o) {
                            {
                                if (o.oldDocs.isEmpty()) {
                                    var n, r = 0;
                                    return o.docChanges.map(function(t) {
                                        var e = new th(i, t.doc.key, t.doc, o.fromCache, o.mutatedKeys.has(t.doc.key));
                                        return Mr(t.type === ea.Added, "Invalid event type for first snapshot"), Mr(!n || o.query.docComparator(n, t.doc) < 0, "Got added events in wrong order"), n = t.doc, {
                                            type: "added",
                                            doc: e,
                                            oldIndex: -1,
                                            newIndex: r++
                                        }
                                    })
                                }
                                var a = o.oldDocs;
                                return o.docChanges.filter(function(t) {
                                    return e || t.type !== ea.Metadata
                                }).map(function(t) {
                                    var e = new th(i, t.doc.key, t.doc, o.fromCache, o.mutatedKeys.has(t.doc.key)),
                                        n = -1,
                                        r = -1;
                                    return t.type !== ea.Added && (Mr(0 <= (n = a.indexOf(t.doc.key)), "Index for document not found"), a = a.delete(t.doc.key)), t.type !== ea.Removed && (a = a.add(t.doc), r = a.indexOf(t.doc.key)), {
                                        type: function(t) {
                                            switch (t) {
                                                case ea.Added:
                                                    return "added";
                                                case ea.Modified:
                                                case ea.Metadata:
                                                    return "modified";
                                                case ea.Removed:
                                                    return "removed";
                                                default:
                                                    return Rr("Unknown change type: " + t)
                                            }
                                        }(t.type),
                                        doc: e,
                                        oldIndex: n,
                                        newIndex: r
                                    }
                                })
                            }
                        }(this._firestore, e, this._snapshot), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges
                    }, e.prototype.isEqual = function(t) {
                        if (!(t instanceof e)) throw ri("isEqual", "QuerySnapshot", 1, t);
                        return this._firestore === t._firestore && this._originalQuery.isEqual(t._originalQuery) && this._snapshot.isEqual(t._snapshot)
                    }, e.prototype.convertToDocumentImpl = function(t) {
                        return new th(this._firestore, t.key, t, this.metadata.fromCache, this._snapshot.mutatedKeys.has(t.key))
                    }, e
                }();
            ["length", "forEach", "map"].concat("undefined" != typeof Symbol ? [Symbol.iterator] : []).forEach(function(t) {
                try {
                    Object.defineProperty(nh.prototype.docChanges, t, {
                        get: function() {
                            return function() {
                                throw new Lr(Pr.INVALID_ARGUMENT, 'QuerySnapshot.docChanges has been changed from a property into a method, so usages like "querySnapshot.docChanges" should become "querySnapshot.docChanges()"')
                            }()
                        }
                    })
                } catch (t) {}
            });
            var rh = function(r) {
                function t(t, e) {
                    var n = r.call(this, so.atPath(t), e) || this;
                    if (t.length % 2 != 1) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + t.canonicalString() + " has " + t.length);
                    return n
                }
                return s(t, r), Object.defineProperty(t.prototype, "id", {
                    get: function() {
                        return this._query.path.lastSegment()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "parent", {
                    get: function() {
                        var t = this._query.path.popLast();
                        return t.isEmpty() ? null : new Jc(new Ai(t), this.firestore)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "path", {
                    get: function() {
                        return this._query.path.canonicalString()
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.doc = function(t) {
                    if (Gr("CollectionReference.doc", arguments, 0, 1), 0 === arguments.length && (t = ai.newId()), Wr("CollectionReference.doc", "non-empty string", 1, t), "" === t) throw new Lr(Pr.INVALID_ARGUMENT, "Document path must be a non-empty string");
                    var e = Ci.fromString(t);
                    return Jc.forPath(this._query.path.child(e), this.firestore)
                }, t.prototype.add = function(t) {
                    Kr("CollectionReference.add", arguments, 1), Wr("CollectionReference.add", "object", 1, t);
                    var e = this.doc();
                    return e.set(t).then(function() {
                        return e
                    })
                }, t
            }(eh);

            function ih(t, e) {
                if (void 0 === e) return {
                    merge: !1
                };
                if (ni(t, e, ["merge", "mergeFields"]), Yr(t, "boolean", "merge", e.merge), Xr(t, "mergeFields", "a string or a FieldPath", e.mergeFields, function(t) {
                        return "string" == typeof t || t instanceof yc
                    }), void 0 !== e.mergeFields && void 0 !== e.merge) throw new Lr(Pr.INVALID_ARGUMENT, "Invalid options passed to function " + t + '(): You cannot specify both "merge" and "mergeFields".');
                return e
            }

            function oh(t, e) {
                return void 0 === e ? {} : (ni(t, e, ["serverTimestamps"]), Jr(t, 0, "serverTimestamps", e.serverTimestamps, ["estimate", "previous", "none"]), e)
            }

            function ah(t, e) {
                zr(t, "object", 1, e), e && (ni(t, e, ["source"]), Jr(t, 0, "source", e.source, ["default", "server", "cache"]))
            }

            function sh(t, e, n) {
                if (e instanceof Jc) {
                    if (e.firestore !== n) throw new Lr(Pr.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
                    return e
                }
                throw ri(t, "DocumentReference", 1, e)
            }
            var uh = xr(Hc, "Use firebase.firestore() instead."),
                ch = xr(Yc, "Use firebase.firestore().runTransaction() instead."),
                hh = xr(Xc, "Use firebase.firestore().batch() instead."),
                lh = xr(Jc, "Use firebase.firestore().doc() instead."),
                fh = xr(Zc),
                ph = xr(th),
                dh = xr(eh),
                mh = xr(nh),
                yh = xr(rh, "Use firebase.firestore().collection() instead."),
                gh = {
                    Firestore: uh,
                    GeoPoint: vi,
                    Timestamp: bi,
                    Blob: gi,
                    Transaction: ch,
                    WriteBatch: hh,
                    DocumentReference: lh,
                    DocumentSnapshot: fh,
                    Query: dh,
                    QueryDocumentSnapshot: ph,
                    QuerySnapshot: mh,
                    CollectionReference: yh,
                    FieldPath: yc,
                    FieldValue: Oc,
                    setLogLevel: Hc.setLogLevel,
                    CACHE_SIZE_UNLIMITED: Gc
                };

            function vh(t) {
                t.INTERNAL.registerService("firestore", function(t) {
                    return new Hc(t)
                }, function(t) {
                    Mr(t && "object" == typeof t, "shallowCopy() expects object parameter.");
                    var e = {};
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e
                }(gh))
            }
            vh(bh)
        }).apply(this, arguments)
    } catch (t) {
        throw console.error(t), new Error("Cannot instantiate firebase-firestore - be sure to load firebase-app.js first.")
    }
});

// Initialize firebase

firebase.initializeApp({
 apiKey: 'AIzaSyCmah-52hH-wXEZVoutMB7A9SY3sES5mT0',
 authDomain: 'attackpoint-plus.firebaseapp.com',
 projectId: 'attackpoint-plus'
});

var db = firebase.firestore();

// Extension Installed Event

chrome.runtime.onInstalled.addListener(function() {
  const init_options = ["compact"];
  chrome.storage.sync.set({options: init_options}, function() {
    console.log("Welcome to Attackpoint Plus!");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.attackpoint.org'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// Message Event

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.command == 'request_discussion_likes'){
    db.collection('discussion_likes').doc(request.page).get().then(function(doc){
      if(doc.exists){
        sendResponse({data: JSON.stringify(doc.data().messages)})
      }
      else{
        sendResponse({data: 'none'})
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
  }
  if(request.command == 'write_discussion_likes'){
    let messages = JSON.parse(request.data);
    let messagePage = request.page;
    db.collection("discussion_likes").doc(messagePage).set({
      messages
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }
  if(request.command == 'request_training_likes'){
    db.collection('training_likes').doc(request.page).get().then(function(doc){
      if(doc.exists){
        sendResponse({data: JSON.stringify(doc.data().trainings)});
      }
      else{
        sendResponse({data: 'none'});
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
  }
  if(request.command == 'write_training_likes'){
    let trainings = JSON.parse(request.data);
    let log = request.page;
    db.collection("training_likes").doc(log).set({
      trainings
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }
  return true;
})
