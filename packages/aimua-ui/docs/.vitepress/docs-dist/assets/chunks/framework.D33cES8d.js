/**
 * @vue/shared v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function bs(e, t) {
  const n = new Set(e.split(','))
  return t ? (s) => n.has(s.toLowerCase()) : (s) => n.has(s)
}
const ee = {},
  mt = [],
  xe = () => {},
  po = () => !1,
  Kt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  vs = (e) => e.startsWith('onUpdate:'),
  oe = Object.assign,
  ws = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  go = Object.prototype.hasOwnProperty,
  X = (e, t) => go.call(e, t),
  k = Array.isArray,
  yt = (e) => Cn(e) === '[object Map]',
  jr = (e) => Cn(e) === '[object Set]',
  K = (e) => typeof e == 'function',
  ne = (e) => typeof e == 'string',
  St = (e) => typeof e == 'symbol',
  Z = (e) => e !== null && typeof e == 'object',
  Vr = (e) => (Z(e) || K(e)) && K(e.then) && K(e.catch),
  Dr = Object.prototype.toString,
  Cn = (e) => Dr.call(e),
  mo = (e) => Cn(e).slice(8, -1),
  Ur = (e) => Cn(e) === '[object Object]',
  Es = (e) => ne(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  _t = bs(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  xn = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  yo = /-(\w)/g,
  Me = xn((e) => e.replace(yo, (t, n) => (n ? n.toUpperCase() : ''))),
  _o = /\B([A-Z])/g,
  ut = xn((e) => e.replace(_o, '-$1').toLowerCase()),
  Sn = xn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  cn = xn((e) => (e ? `on${Sn(e)}` : '')),
  Qe = (e, t) => !Object.is(e, t),
  Kn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  dn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  bo = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  },
  vo = (e) => {
    const t = ne(e) ? Number(e) : NaN
    return isNaN(t) ? e : t
  }
let qs
const kr = () =>
  qs ||
  (qs =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {})
function Cs(e) {
  if (k(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = ne(s) ? xo(s) : Cs(s)
      if (r) for (const i in r) t[i] = r[i]
    }
    return t
  } else if (ne(e) || Z(e)) return e
}
const wo = /;(?![^(]*\))/g,
  Eo = /:([^]+)/,
  Co = /\/\*[^]*?\*\//g
function xo(e) {
  const t = {}
  return (
    e
      .replace(Co, '')
      .split(wo)
      .forEach((n) => {
        if (n) {
          const s = n.split(Eo)
          s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
      }),
    t
  )
}
function xs(e) {
  let t = ''
  if (ne(e)) t = e
  else if (k(e))
    for (let n = 0; n < e.length; n++) {
      const s = xs(e[n])
      s && (t += s + ' ')
    }
  else if (Z(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const So = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  To = bs(So)
function Br(e) {
  return !!e || e === ''
}
const Va = (e) =>
    ne(e)
      ? e
      : e == null
      ? ''
      : k(e) || (Z(e) && (e.toString === Dr || !K(e.toString)))
      ? JSON.stringify(e, Kr, 2)
      : String(e),
  Kr = (e, t) =>
    t && t.__v_isRef
      ? Kr(e, t.value)
      : yt(t)
      ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r], i) => ((n[Wn(s, i) + ' =>'] = r), n), {}) }
      : jr(t)
      ? { [`Set(${t.size})`]: [...t.values()].map((n) => Wn(n)) }
      : St(t)
      ? Wn(t)
      : Z(t) && !k(t) && !Ur(t)
      ? String(t)
      : t,
  Wn = (e, t = '') => {
    var n
    return St(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  }
/**
 * @vue/reactivity v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let be
class Ao {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = be),
      !t && be && (this.index = (be.scopes || (be.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = be
      try {
        return (be = this), t()
      } finally {
        be = n
      }
    }
  }
  on() {
    be = this
  }
  off() {
    be = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, s
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop()
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]()
      if (this.scopes) for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop()
        r && r !== this && ((this.parent.scopes[this.index] = r), (r.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function Ro(e, t = be) {
  t && t.active && t.effects.push(e)
}
function Wr() {
  return be
}
function Oo(e) {
  be && be.cleanups.push(e)
}
let lt
class Ss {
  constructor(t, n, s, r) {
    ;(this.fn = t),
      (this.trigger = n),
      (this.scheduler = s),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 4),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      Ro(this, r)
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      ;(this._dirtyLevel = 1), ft()
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t]
        if (n.computed && (Io(n.computed), this._dirtyLevel >= 4)) break
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), dt()
    }
    return this._dirtyLevel >= 4
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn()
    let t = Xe,
      n = lt
    try {
      return (Xe = !0), (lt = this), this._runnings++, Gs(this), this.fn()
    } finally {
      zs(this), this._runnings--, (lt = n), (Xe = t)
    }
  }
  stop() {
    var t
    this.active && (Gs(this), zs(this), (t = this.onStop) == null || t.call(this), (this.active = !1))
  }
}
function Io(e) {
  return e.value
}
function Gs(e) {
  e._trackId++, (e._depsLength = 0)
}
function zs(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) qr(e.deps[t], e)
    e.deps.length = e._depsLength
  }
}
function qr(e, t) {
  const n = e.get(t)
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup())
}
let Xe = !0,
  os = 0
const Gr = []
function ft() {
  Gr.push(Xe), (Xe = !1)
}
function dt() {
  const e = Gr.pop()
  Xe = e === void 0 ? !0 : e
}
function Ts() {
  os++
}
function As() {
  for (os--; !os && ls.length; ) ls.shift()()
}
function zr(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId)
    const s = e.deps[e._depsLength]
    s !== t ? (s && qr(s, e), (e.deps[e._depsLength++] = t)) : e._depsLength++
  }
}
const ls = []
function Xr(e, t, n) {
  Ts()
  for (const s of e.keys()) {
    let r
    s._dirtyLevel < t &&
      (r ?? (r = e.get(s) === s._trackId)) &&
      (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0), (s._dirtyLevel = t)),
      s._shouldSchedule &&
        (r ?? (r = e.get(s) === s._trackId)) &&
        (s.trigger(),
        (!s._runnings || s.allowRecurse) &&
          s._dirtyLevel !== 2 &&
          ((s._shouldSchedule = !1), s.scheduler && ls.push(s.scheduler)))
  }
  As()
}
const Yr = (e, t) => {
    const n = new Map()
    return (n.cleanup = e), (n.computed = t), n
  },
  hn = new WeakMap(),
  ct = Symbol(''),
  cs = Symbol('')
function ye(e, t, n) {
  if (Xe && lt) {
    let s = hn.get(e)
    s || hn.set(e, (s = new Map()))
    let r = s.get(n)
    r || s.set(n, (r = Yr(() => s.delete(n)))), zr(lt, r)
  }
}
function He(e, t, n, s, r, i) {
  const o = hn.get(e)
  if (!o) return
  let l = []
  if (t === 'clear') l = [...o.values()]
  else if (n === 'length' && k(e)) {
    const c = Number(s)
    o.forEach((u, d) => {
      ;(d === 'length' || (!St(d) && d >= c)) && l.push(u)
    })
  } else
    switch ((n !== void 0 && l.push(o.get(n)), t)) {
      case 'add':
        k(e) ? Es(n) && l.push(o.get('length')) : (l.push(o.get(ct)), yt(e) && l.push(o.get(cs)))
        break
      case 'delete':
        k(e) || (l.push(o.get(ct)), yt(e) && l.push(o.get(cs)))
        break
      case 'set':
        yt(e) && l.push(o.get(ct))
        break
    }
  Ts()
  for (const c of l) c && Xr(c, 4)
  As()
}
function Lo(e, t) {
  var n
  return (n = hn.get(e)) == null ? void 0 : n.get(t)
}
const Po = bs('__proto__,__v_isRef,__isVue'),
  Jr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(St),
  ),
  Xs = Mo()
function Mo() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const s = Y(this)
        for (let i = 0, o = this.length; i < o; i++) ye(s, 'get', i + '')
        const r = s[t](...n)
        return r === -1 || r === !1 ? s[t](...n.map(Y)) : r
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        ft(), Ts()
        const s = Y(this)[t].apply(this, n)
        return As(), dt(), s
      }
    }),
    e
  )
}
function No(e) {
  const t = Y(this)
  return ye(t, 'has', e), t.hasOwnProperty(e)
}
class Qr {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._isShallow = n)
  }
  get(t, n, s) {
    const r = this._isReadonly,
      i = this._isShallow
    if (n === '__v_isReactive') return !r
    if (n === '__v_isReadonly') return r
    if (n === '__v_isShallow') return i
    if (n === '__v_raw')
      return s === (r ? (i ? Go : ni) : i ? ti : ei).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0
    const o = k(t)
    if (!r) {
      if (o && X(Xs, n)) return Reflect.get(Xs, n, s)
      if (n === 'hasOwnProperty') return No
    }
    const l = Reflect.get(t, n, s)
    return (St(n) ? Jr.has(n) : Po(n)) || (r || ye(t, 'get', n), i)
      ? l
      : he(l)
      ? o && Es(n)
        ? l
        : l.value
      : Z(l)
      ? r
        ? Rn(l)
        : An(l)
      : l
  }
}
class Zr extends Qr {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, s, r) {
    let i = t[n]
    if (!this._isShallow) {
      const c = Ct(i)
      if ((!pn(s) && !Ct(s) && ((i = Y(i)), (s = Y(s))), !k(t) && he(i) && !he(s))) return c ? !1 : ((i.value = s), !0)
    }
    const o = k(t) && Es(n) ? Number(n) < t.length : X(t, n),
      l = Reflect.set(t, n, s, r)
    return t === Y(r) && (o ? Qe(s, i) && He(t, 'set', n, s) : He(t, 'add', n, s)), l
  }
  deleteProperty(t, n) {
    const s = X(t, n)
    t[n]
    const r = Reflect.deleteProperty(t, n)
    return r && s && He(t, 'delete', n, void 0), r
  }
  has(t, n) {
    const s = Reflect.has(t, n)
    return (!St(n) || !Jr.has(n)) && ye(t, 'has', n), s
  }
  ownKeys(t) {
    return ye(t, 'iterate', k(t) ? 'length' : ct), Reflect.ownKeys(t)
  }
}
class Fo extends Qr {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const $o = new Zr(),
  Ho = new Fo(),
  jo = new Zr(!0),
  Rs = (e) => e,
  Tn = (e) => Reflect.getPrototypeOf(e)
function zt(e, t, n = !1, s = !1) {
  e = e.__v_raw
  const r = Y(e),
    i = Y(t)
  n || (Qe(t, i) && ye(r, 'get', t), ye(r, 'get', i))
  const { has: o } = Tn(r),
    l = s ? Rs : n ? Ls : Vt
  if (o.call(r, t)) return l(e.get(t))
  if (o.call(r, i)) return l(e.get(i))
  e !== r && e.get(t)
}
function Xt(e, t = !1) {
  const n = this.__v_raw,
    s = Y(n),
    r = Y(e)
  return t || (Qe(e, r) && ye(s, 'has', e), ye(s, 'has', r)), e === r ? n.has(e) : n.has(e) || n.has(r)
}
function Yt(e, t = !1) {
  return (e = e.__v_raw), !t && ye(Y(e), 'iterate', ct), Reflect.get(e, 'size', e)
}
function Ys(e) {
  e = Y(e)
  const t = Y(this)
  return Tn(t).has.call(t, e) || (t.add(e), He(t, 'add', e, e)), this
}
function Js(e, t) {
  t = Y(t)
  const n = Y(this),
    { has: s, get: r } = Tn(n)
  let i = s.call(n, e)
  i || ((e = Y(e)), (i = s.call(n, e)))
  const o = r.call(n, e)
  return n.set(e, t), i ? Qe(t, o) && He(n, 'set', e, t) : He(n, 'add', e, t), this
}
function Qs(e) {
  const t = Y(this),
    { has: n, get: s } = Tn(t)
  let r = n.call(t, e)
  r || ((e = Y(e)), (r = n.call(t, e))), s && s.call(t, e)
  const i = t.delete(e)
  return r && He(t, 'delete', e, void 0), i
}
function Zs() {
  const e = Y(this),
    t = e.size !== 0,
    n = e.clear()
  return t && He(e, 'clear', void 0, void 0), n
}
function Jt(e, t) {
  return function (s, r) {
    const i = this,
      o = i.__v_raw,
      l = Y(o),
      c = t ? Rs : e ? Ls : Vt
    return !e && ye(l, 'iterate', ct), o.forEach((u, d) => s.call(r, c(u), c(d), i))
  }
}
function Qt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      i = Y(r),
      o = yt(i),
      l = e === 'entries' || (e === Symbol.iterator && o),
      c = e === 'keys' && o,
      u = r[e](...s),
      d = n ? Rs : t ? Ls : Vt
    return (
      !t && ye(i, 'iterate', c ? cs : ct),
      {
        next() {
          const { value: h, done: m } = u.next()
          return m ? { value: h, done: m } : { value: l ? [d(h[0]), d(h[1])] : d(h), done: m }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function Ue(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function Vo() {
  const e = {
      get(i) {
        return zt(this, i)
      },
      get size() {
        return Yt(this)
      },
      has: Xt,
      add: Ys,
      set: Js,
      delete: Qs,
      clear: Zs,
      forEach: Jt(!1, !1),
    },
    t = {
      get(i) {
        return zt(this, i, !1, !0)
      },
      get size() {
        return Yt(this)
      },
      has: Xt,
      add: Ys,
      set: Js,
      delete: Qs,
      clear: Zs,
      forEach: Jt(!1, !0),
    },
    n = {
      get(i) {
        return zt(this, i, !0)
      },
      get size() {
        return Yt(this, !0)
      },
      has(i) {
        return Xt.call(this, i, !0)
      },
      add: Ue('add'),
      set: Ue('set'),
      delete: Ue('delete'),
      clear: Ue('clear'),
      forEach: Jt(!0, !1),
    },
    s = {
      get(i) {
        return zt(this, i, !0, !0)
      },
      get size() {
        return Yt(this, !0)
      },
      has(i) {
        return Xt.call(this, i, !0)
      },
      add: Ue('add'),
      set: Ue('set'),
      delete: Ue('delete'),
      clear: Ue('clear'),
      forEach: Jt(!0, !0),
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((i) => {
      ;(e[i] = Qt(i, !1, !1)), (n[i] = Qt(i, !0, !1)), (t[i] = Qt(i, !1, !0)), (s[i] = Qt(i, !0, !0))
    }),
    [e, n, t, s]
  )
}
const [Do, Uo, ko, Bo] = Vo()
function Os(e, t) {
  const n = t ? (e ? Bo : ko) : e ? Uo : Do
  return (s, r, i) =>
    r === '__v_isReactive'
      ? !e
      : r === '__v_isReadonly'
      ? e
      : r === '__v_raw'
      ? s
      : Reflect.get(X(n, r) && r in s ? n : s, r, i)
}
const Ko = { get: Os(!1, !1) },
  Wo = { get: Os(!1, !0) },
  qo = { get: Os(!0, !1) },
  ei = new WeakMap(),
  ti = new WeakMap(),
  ni = new WeakMap(),
  Go = new WeakMap()
function zo(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function Xo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : zo(mo(e))
}
function An(e) {
  return Ct(e) ? e : Is(e, !1, $o, Ko, ei)
}
function Yo(e) {
  return Is(e, !1, jo, Wo, ti)
}
function Rn(e) {
  return Is(e, !0, Ho, qo, ni)
}
function Is(e, t, n, s, r) {
  if (!Z(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const i = r.get(e)
  if (i) return i
  const o = Xo(e)
  if (o === 0) return e
  const l = new Proxy(e, o === 2 ? s : n)
  return r.set(e, l), l
}
function bt(e) {
  return Ct(e) ? bt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Ct(e) {
  return !!(e && e.__v_isReadonly)
}
function pn(e) {
  return !!(e && e.__v_isShallow)
}
function si(e) {
  return bt(e) || Ct(e)
}
function Y(e) {
  const t = e && e.__v_raw
  return t ? Y(t) : e
}
function Lt(e) {
  return Object.isExtensible(e) && dn(e, '__v_skip', !0), e
}
const Vt = (e) => (Z(e) ? An(e) : e),
  Ls = (e) => (Z(e) ? Rn(e) : e)
class ri {
  constructor(t, n, s, r) {
    ;(this.getter = t),
      (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new Ss(
        () => t(this._value),
        () => Pt(this, this.effect._dirtyLevel === 2 ? 2 : 3),
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s)
  }
  get value() {
    const t = Y(this)
    return (
      (!t._cacheable || t.effect.dirty) && Qe(t._value, (t._value = t.effect.run())) && Pt(t, 4),
      Ps(t),
      t.effect._dirtyLevel >= 2 && Pt(t, 2),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
  get _dirty() {
    return this.effect.dirty
  }
  set _dirty(t) {
    this.effect.dirty = t
  }
}
function Jo(e, t, n = !1) {
  let s, r
  const i = K(e)
  return i ? ((s = e), (r = xe)) : ((s = e.get), (r = e.set)), new ri(s, r, i || !r, n)
}
function Ps(e) {
  var t
  Xe &&
    lt &&
    ((e = Y(e)), zr(lt, (t = e.dep) != null ? t : (e.dep = Yr(() => (e.dep = void 0), e instanceof ri ? e : void 0))))
}
function Pt(e, t = 4, n) {
  e = Y(e)
  const s = e.dep
  s && Xr(s, t)
}
function he(e) {
  return !!(e && e.__v_isRef === !0)
}
function de(e) {
  return oi(e, !1)
}
function ii(e) {
  return oi(e, !0)
}
function oi(e, t) {
  return he(e) ? e : new Qo(e, t)
}
class Qo {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : Y(t)),
      (this._value = n ? t : Vt(t))
  }
  get value() {
    return Ps(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || pn(t) || Ct(t)
    ;(t = n ? t : Y(t)), Qe(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : Vt(t)), Pt(this, 4))
  }
}
function li(e) {
  return he(e) ? e.value : e
}
const Zo = {
  get: (e, t, n) => li(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t]
    return he(r) && !he(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s)
  },
}
function ci(e) {
  return bt(e) ? e : new Proxy(e, Zo)
}
class el {
  constructor(t) {
    ;(this.dep = void 0), (this.__v_isRef = !0)
    const { get: n, set: s } = t(
      () => Ps(this),
      () => Pt(this),
    )
    ;(this._get = n), (this._set = s)
  }
  get value() {
    return this._get()
  }
  set value(t) {
    this._set(t)
  }
}
function tl(e) {
  return new el(e)
}
class nl {
  constructor(t, n, s) {
    ;(this._object = t), (this._key = n), (this._defaultValue = s), (this.__v_isRef = !0)
  }
  get value() {
    const t = this._object[this._key]
    return t === void 0 ? this._defaultValue : t
  }
  set value(t) {
    this._object[this._key] = t
  }
  get dep() {
    return Lo(Y(this._object), this._key)
  }
}
class sl {
  constructor(t) {
    ;(this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0)
  }
  get value() {
    return this._getter()
  }
}
function rl(e, t, n) {
  return he(e) ? e : K(e) ? new sl(e) : Z(e) && arguments.length > 1 ? il(e, t, n) : de(e)
}
function il(e, t, n) {
  const s = e[t]
  return he(s) ? s : new nl(e, t, n)
}
/**
 * @vue/runtime-core v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Ye(e, t, n, s) {
  try {
    return s ? e(...s) : e()
  } catch (r) {
    On(r, t, n)
  }
}
function Se(e, t, n, s) {
  if (K(e)) {
    const i = Ye(e, t, n, s)
    return (
      i &&
        Vr(i) &&
        i.catch((o) => {
          On(o, t, n)
        }),
      i
    )
  }
  const r = []
  for (let i = 0; i < e.length; i++) r.push(Se(e[i], t, n, s))
  return r
}
function On(e, t, n, s = !0) {
  const r = t ? t.vnode : null
  if (t) {
    let i = t.parent
    const o = t.proxy,
      l = `https://vuejs.org/error-reference/#runtime-${n}`
    for (; i; ) {
      const u = i.ec
      if (u) {
        for (let d = 0; d < u.length; d++) if (u[d](e, o, l) === !1) return
      }
      i = i.parent
    }
    const c = t.appContext.config.errorHandler
    if (c) {
      Ye(c, null, 10, [e, o, l])
      return
    }
  }
  ol(e, n, r, s)
}
function ol(e, t, n, s = !0) {
  console.error(e)
}
let Dt = !1,
  as = !1
const fe = []
let Pe = 0
const vt = []
let We = null,
  rt = 0
const ai = Promise.resolve()
let Ms = null
function In(e) {
  const t = Ms || ai
  return e ? t.then(this ? e.bind(this) : e) : t
}
function ll(e) {
  let t = Pe + 1,
    n = fe.length
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = fe[s],
      i = Ut(r)
    i < e || (i === e && r.pre) ? (t = s + 1) : (n = s)
  }
  return t
}
function Ns(e) {
  ;(!fe.length || !fe.includes(e, Dt && e.allowRecurse ? Pe + 1 : Pe)) &&
    (e.id == null ? fe.push(e) : fe.splice(ll(e.id), 0, e), ui())
}
function ui() {
  !Dt && !as && ((as = !0), (Ms = ai.then(fi)))
}
function cl(e) {
  const t = fe.indexOf(e)
  t > Pe && fe.splice(t, 1)
}
function al(e) {
  k(e) ? vt.push(...e) : (!We || !We.includes(e, e.allowRecurse ? rt + 1 : rt)) && vt.push(e), ui()
}
function er(e, t, n = Dt ? Pe + 1 : 0) {
  for (; n < fe.length; n++) {
    const s = fe[n]
    if (s && s.pre) {
      if (e && s.id !== e.uid) continue
      fe.splice(n, 1), n--, s()
    }
  }
}
function gn(e) {
  if (vt.length) {
    const t = [...new Set(vt)].sort((n, s) => Ut(n) - Ut(s))
    if (((vt.length = 0), We)) {
      We.push(...t)
      return
    }
    for (We = t, rt = 0; rt < We.length; rt++) We[rt]()
    ;(We = null), (rt = 0)
  }
}
const Ut = (e) => (e.id == null ? 1 / 0 : e.id),
  ul = (e, t) => {
    const n = Ut(e) - Ut(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function fi(e) {
  ;(as = !1), (Dt = !0), fe.sort(ul)
  try {
    for (Pe = 0; Pe < fe.length; Pe++) {
      const t = fe[Pe]
      t && t.active !== !1 && Ye(t, null, 14)
    }
  } finally {
    ;(Pe = 0), (fe.length = 0), gn(), (Dt = !1), (Ms = null), (fe.length || vt.length) && fi()
  }
}
function fl(e, t, ...n) {
  if (e.isUnmounted) return
  const s = e.vnode.props || ee
  let r = n
  const i = t.startsWith('update:'),
    o = i && t.slice(7)
  if (o && o in s) {
    const d = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: h, trim: m } = s[d] || ee
    m && (r = n.map((w) => (ne(w) ? w.trim() : w))), h && (r = n.map(bo))
  }
  let l,
    c = s[(l = cn(t))] || s[(l = cn(Me(t)))]
  !c && i && (c = s[(l = cn(ut(t)))]), c && Se(c, e, 6, r)
  const u = s[l + 'Once']
  if (u) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;(e.emitted[l] = !0), Se(u, e, 6, r)
  }
}
function di(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e)
  if (r !== void 0) return r
  const i = e.emits
  let o = {},
    l = !1
  if (!K(e)) {
    const c = (u) => {
      const d = di(u, t, !0)
      d && ((l = !0), oe(o, d))
    }
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c)
  }
  return !i && !l
    ? (Z(e) && s.set(e, null), null)
    : (k(i) ? i.forEach((c) => (o[c] = null)) : oe(o, i), Z(e) && s.set(e, o), o)
}
function Ln(e, t) {
  return !e || !Kt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')), X(e, t[0].toLowerCase() + t.slice(1)) || X(e, ut(t)) || X(e, t))
}
let ie = null,
  Pn = null
function mn(e) {
  const t = ie
  return (ie = e), (Pn = (e && e.type.__scopeId) || null), t
}
function Da(e) {
  Pn = e
}
function Ua() {
  Pn = null
}
function dl(e, t = ie, n) {
  if (!t || e._n) return e
  const s = (...r) => {
    s._d && dr(-1)
    const i = mn(t)
    let o
    try {
      o = e(...r)
    } finally {
      mn(i), s._d && dr(1)
    }
    return o
  }
  return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function qn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: i,
    propsOptions: [o],
    slots: l,
    attrs: c,
    emit: u,
    render: d,
    renderCache: h,
    data: m,
    setupState: w,
    ctx: O,
    inheritAttrs: M,
  } = e
  let V, q
  const J = mn(e)
  try {
    if (n.shapeFlag & 4) {
      const y = r || s,
        P = y
      ;(V = Ae(d.call(P, y, h, i, w, m, O))), (q = c)
    } else {
      const y = t
      ;(V = Ae(y.length > 1 ? y(i, { attrs: c, slots: l, emit: u }) : y(i, null))), (q = t.props ? c : hl(c))
    }
  } catch (y) {
    ;($t.length = 0), On(y, e, 1), (V = ue(ve))
  }
  let g = V
  if (q && M !== !1) {
    const y = Object.keys(q),
      { shapeFlag: P } = g
    y.length && P & 7 && (o && y.some(vs) && (q = pl(q, o)), (g = Ze(g, q)))
  }
  return (
    n.dirs && ((g = Ze(g)), (g.dirs = g.dirs ? g.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (g.transition = n.transition),
    (V = g),
    mn(J),
    V
  )
}
const hl = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || Kt(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  pl = (e, t) => {
    const n = {}
    for (const s in e) (!vs(s) || !(s.slice(9) in t)) && (n[s] = e[s])
    return n
  }
function gl(e, t, n) {
  const { props: s, children: r, component: i } = e,
    { props: o, children: l, patchFlag: c } = t,
    u = i.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && c >= 0) {
    if (c & 1024) return !0
    if (c & 16) return s ? tr(s, o, u) : !!o
    if (c & 8) {
      const d = t.dynamicProps
      for (let h = 0; h < d.length; h++) {
        const m = d[h]
        if (o[m] !== s[m] && !Ln(u, m)) return !0
      }
    }
  } else return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? (o ? tr(s, o, u) : !0) : !!o
  return !1
}
function tr(e, t, n) {
  const s = Object.keys(t)
  if (s.length !== Object.keys(e).length) return !0
  for (let r = 0; r < s.length; r++) {
    const i = s[r]
    if (t[i] !== e[i] && !Ln(n, i)) return !0
  }
  return !1
}
function ml({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)) ((e = t.vnode).el = n), (t = t.parent)
    else break
  }
}
const Fs = 'components'
function ka(e, t) {
  return pi(Fs, e, !0, t) || e
}
const hi = Symbol.for('v-ndc')
function Ba(e) {
  return ne(e) ? pi(Fs, e, !1) || e : e || hi
}
function pi(e, t, n = !0, s = !1) {
  const r = ie || ae
  if (r) {
    const i = r.type
    if (e === Fs) {
      const l = dc(i, !1)
      if (l && (l === t || l === Me(t) || l === Sn(Me(t)))) return i
    }
    const o = nr(r[e] || i[e], t) || nr(r.appContext[e], t)
    return !o && s ? i : o
  }
}
function nr(e, t) {
  return e && (e[t] || e[Me(t)] || e[Sn(Me(t))])
}
const yl = (e) => e.__isSuspense
function gi(e, t) {
  t && t.pendingBranch ? (k(e) ? t.effects.push(...e) : t.effects.push(e)) : al(e)
}
const _l = Symbol.for('v-scx'),
  bl = () => Et(_l)
function mi(e, t) {
  return Mn(e, null, t)
}
function Ka(e, t) {
  return Mn(e, null, { flush: 'post' })
}
const Zt = {}
function je(e, t, n) {
  return Mn(e, t, n)
}
function Mn(e, t, { immediate: n, deep: s, flush: r, once: i, onTrack: o, onTrigger: l } = ee) {
  if (t && i) {
    const I = t
    t = (...D) => {
      I(...D), P()
    }
  }
  const c = ae,
    u = (I) => (s === !0 ? I : ot(I, s === !1 ? 1 : void 0))
  let d,
    h = !1,
    m = !1
  if (
    (he(e)
      ? ((d = () => e.value), (h = pn(e)))
      : bt(e)
      ? ((d = () => u(e)), (h = !0))
      : k(e)
      ? ((m = !0),
        (h = e.some((I) => bt(I) || pn(I))),
        (d = () =>
          e.map((I) => {
            if (he(I)) return I.value
            if (bt(I)) return u(I)
            if (K(I)) return Ye(I, c, 2)
          })))
      : K(e)
      ? t
        ? (d = () => Ye(e, c, 2))
        : (d = () => (w && w(), Se(e, c, 3, [O])))
      : (d = xe),
    t && s)
  ) {
    const I = d
    d = () => ot(I())
  }
  let w,
    O = (I) => {
      w = g.onStop = () => {
        Ye(I, c, 4), (w = g.onStop = void 0)
      }
    },
    M
  if (Vn)
    if (((O = xe), t ? n && Se(t, c, 3, [d(), m ? [] : void 0, O]) : d(), r === 'sync')) {
      const I = bl()
      M = I.__watcherHandles || (I.__watcherHandles = [])
    } else return xe
  let V = m ? new Array(e.length).fill(Zt) : Zt
  const q = () => {
    if (!(!g.active || !g.dirty))
      if (t) {
        const I = g.run()
        ;(s || h || (m ? I.some((D, R) => Qe(D, V[R])) : Qe(I, V))) &&
          (w && w(), Se(t, c, 3, [I, V === Zt ? void 0 : m && V[0] === Zt ? [] : V, O]), (V = I))
      } else g.run()
  }
  q.allowRecurse = !!t
  let J
  r === 'sync'
    ? (J = q)
    : r === 'post'
    ? (J = () => ge(q, c && c.suspense))
    : ((q.pre = !0), c && (q.id = c.uid), (J = () => Ns(q)))
  const g = new Ss(d, xe, J),
    y = Wr(),
    P = () => {
      g.stop(), y && ws(y.effects, g)
    }
  return t ? (n ? q() : (V = g.run())) : r === 'post' ? ge(g.run.bind(g), c && c.suspense) : g.run(), M && M.push(P), P
}
function vl(e, t, n) {
  const s = this.proxy,
    r = ne(e) ? (e.includes('.') ? yi(s, e) : () => s[e]) : e.bind(s, s)
  let i
  K(t) ? (i = t) : ((i = t.handler), (n = t))
  const o = Wt(this),
    l = Mn(r, i.bind(s), n)
  return o(), l
}
function yi(e, t) {
  const n = t.split('.')
  return () => {
    let s = e
    for (let r = 0; r < n.length && s; r++) s = s[n[r]]
    return s
  }
}
function ot(e, t, n = 0, s) {
  if (!Z(e) || e.__v_skip) return e
  if (t && t > 0) {
    if (n >= t) return e
    n++
  }
  if (((s = s || new Set()), s.has(e))) return e
  if ((s.add(e), he(e))) ot(e.value, t, n, s)
  else if (k(e)) for (let r = 0; r < e.length; r++) ot(e[r], t, n, s)
  else if (jr(e) || yt(e))
    e.forEach((r) => {
      ot(r, t, n, s)
    })
  else if (Ur(e)) for (const r in e) ot(e[r], t, n, s)
  return e
}
function Wa(e, t) {
  if (ie === null) return e
  const n = Dn(ie) || ie.proxy,
    s = e.dirs || (e.dirs = [])
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = ee] = t[r]
    i &&
      (K(i) && (i = { mounted: i, updated: i }),
      i.deep && ot(o),
      s.push({ dir: i, instance: n, value: o, oldValue: void 0, arg: l, modifiers: c }))
  }
  return e
}
function Le(e, t, n, s) {
  const r = e.dirs,
    i = t && t.dirs
  for (let o = 0; o < r.length; o++) {
    const l = r[o]
    i && (l.oldValue = i[o].value)
    let c = l.dir[s]
    c && (ft(), Se(c, n, 8, [e.el, l, e, t]), dt())
  }
}
const qe = Symbol('_leaveCb'),
  en = Symbol('_enterCb')
function wl() {
  const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() }
  return (
    Tt(() => {
      e.isMounted = !0
    }),
    Ci(() => {
      e.isUnmounting = !0
    }),
    e
  )
}
const we = [Function, Array],
  _i = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: we,
    onEnter: we,
    onAfterEnter: we,
    onEnterCancelled: we,
    onBeforeLeave: we,
    onLeave: we,
    onAfterLeave: we,
    onLeaveCancelled: we,
    onBeforeAppear: we,
    onAppear: we,
    onAfterAppear: we,
    onAppearCancelled: we,
  },
  El = {
    name: 'BaseTransition',
    props: _i,
    setup(e, { slots: t }) {
      const n = jn(),
        s = wl()
      return () => {
        const r = t.default && vi(t.default(), !0)
        if (!r || !r.length) return
        let i = r[0]
        if (r.length > 1) {
          for (const m of r)
            if (m.type !== ve) {
              i = m
              break
            }
        }
        const o = Y(e),
          { mode: l } = o
        if (s.isLeaving) return Gn(i)
        const c = sr(i)
        if (!c) return Gn(i)
        const u = us(c, o, s, n)
        fs(c, u)
        const d = n.subTree,
          h = d && sr(d)
        if (h && h.type !== ve && !it(c, h)) {
          const m = us(h, o, s, n)
          if ((fs(h, m), l === 'out-in'))
            return (
              (s.isLeaving = !0),
              (m.afterLeave = () => {
                ;(s.isLeaving = !1), n.update.active !== !1 && ((n.effect.dirty = !0), n.update())
              }),
              Gn(i)
            )
          l === 'in-out' &&
            c.type !== ve &&
            (m.delayLeave = (w, O, M) => {
              const V = bi(s, h)
              ;(V[String(h.key)] = h),
                (w[qe] = () => {
                  O(), (w[qe] = void 0), delete u.delayedLeave
                }),
                (u.delayedLeave = M)
            })
        }
        return i
      }
    },
  },
  Cl = El
function bi(e, t) {
  const { leavingVNodes: n } = e
  let s = n.get(t.type)
  return s || ((s = Object.create(null)), n.set(t.type, s)), s
}
function us(e, t, n, s) {
  const {
      appear: r,
      mode: i,
      persisted: o = !1,
      onBeforeEnter: l,
      onEnter: c,
      onAfterEnter: u,
      onEnterCancelled: d,
      onBeforeLeave: h,
      onLeave: m,
      onAfterLeave: w,
      onLeaveCancelled: O,
      onBeforeAppear: M,
      onAppear: V,
      onAfterAppear: q,
      onAppearCancelled: J,
    } = t,
    g = String(e.key),
    y = bi(n, e),
    P = (R, H) => {
      R && Se(R, s, 9, H)
    },
    I = (R, H) => {
      const E = H[1]
      P(R, H), k(R) ? R.every((U) => U.length <= 1) && E() : R.length <= 1 && E()
    },
    D = {
      mode: i,
      persisted: o,
      beforeEnter(R) {
        let H = l
        if (!n.isMounted)
          if (r) H = M || l
          else return
        R[qe] && R[qe](!0)
        const E = y[g]
        E && it(e, E) && E.el[qe] && E.el[qe](), P(H, [R])
      },
      enter(R) {
        let H = c,
          E = u,
          U = d
        if (!n.isMounted)
          if (r) (H = V || c), (E = q || u), (U = J || d)
          else return
        let S = !1
        const W = (R[en] = (re) => {
          S || ((S = !0), re ? P(U, [R]) : P(E, [R]), D.delayedLeave && D.delayedLeave(), (R[en] = void 0))
        })
        H ? I(H, [R, W]) : W()
      },
      leave(R, H) {
        const E = String(e.key)
        if ((R[en] && R[en](!0), n.isUnmounting)) return H()
        P(h, [R])
        let U = !1
        const S = (R[qe] = (W) => {
          U || ((U = !0), H(), W ? P(O, [R]) : P(w, [R]), (R[qe] = void 0), y[E] === e && delete y[E])
        })
        ;(y[E] = e), m ? I(m, [R, S]) : S()
      },
      clone(R) {
        return us(R, t, n, s)
      },
    }
  return D
}
function Gn(e) {
  if (Nn(e)) return (e = Ze(e)), (e.children = null), e
}
function sr(e) {
  return Nn(e) ? (e.children ? e.children[0] : void 0) : e
}
function fs(e, t) {
  e.shapeFlag & 6 && e.component
    ? fs(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t)
}
function vi(e, t = !1, n) {
  let s = [],
    r = 0
  for (let i = 0; i < e.length; i++) {
    let o = e[i]
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i)
    o.type === me
      ? (o.patchFlag & 128 && r++, (s = s.concat(vi(o.children, t, l))))
      : (t || o.type !== ve) && s.push(l != null ? Ze(o, { key: l }) : o)
  }
  if (r > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2
  return s
}
/*! #__NO_SIDE_EFFECTS__ */ function wi(e, t) {
  return K(e) ? (() => oe({ name: e.name }, t, { setup: e }))() : e
}
const wt = (e) => !!e.type.__asyncLoader,
  Nn = (e) => e.type.__isKeepAlive
function xl(e, t) {
  Ei(e, 'a', t)
}
function Sl(e, t) {
  Ei(e, 'da', t)
}
function Ei(e, t, n = ae) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n
      for (; r; ) {
        if (r.isDeactivated) return
        r = r.parent
      }
      return e()
    })
  if ((Fn(t, s, n), n)) {
    let r = n.parent
    for (; r && r.parent; ) Nn(r.parent.vnode) && Tl(s, t, n, r), (r = r.parent)
  }
}
function Tl(e, t, n, s) {
  const r = Fn(t, e, s, !0)
  $n(() => {
    ws(s[t], r)
  }, n)
}
function Fn(e, t, n = ae, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return
          ft()
          const l = Wt(n),
            c = Se(t, n, e, o)
          return l(), dt(), c
        })
    return s ? r.unshift(i) : r.push(i), i
  }
}
const De =
    (e) =>
    (t, n = ae) =>
      (!Vn || e === 'sp') && Fn(e, (...s) => t(...s), n),
  Al = De('bm'),
  Tt = De('m'),
  Rl = De('bu'),
  Ol = De('u'),
  Ci = De('bum'),
  $n = De('um'),
  Il = De('sp'),
  Ll = De('rtg'),
  Pl = De('rtc')
function Ml(e, t = ae) {
  Fn('ec', e, t)
}
function qa(e, t, n, s) {
  let r
  const i = n && n[s]
  if (k(e) || ne(e)) {
    r = new Array(e.length)
    for (let o = 0, l = e.length; o < l; o++) r[o] = t(e[o], o, void 0, i && i[o])
  } else if (typeof e == 'number') {
    r = new Array(e)
    for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, i && i[o])
  } else if (Z(e))
    if (e[Symbol.iterator]) r = Array.from(e, (o, l) => t(o, l, void 0, i && i[l]))
    else {
      const o = Object.keys(e)
      r = new Array(o.length)
      for (let l = 0, c = o.length; l < c; l++) {
        const u = o[l]
        r[l] = t(e[u], u, l, i && i[l])
      }
    }
  else r = []
  return n && (n[s] = r), r
}
function Ga(e, t, n = {}, s, r) {
  if (ie.isCE || (ie.parent && wt(ie.parent) && ie.parent.isCE))
    return t !== 'default' && (n.name = t), ue('slot', n, s && s())
  let i = e[t]
  i && i._c && (i._d = !1), $i()
  const o = i && xi(i(n)),
    l = ji(me, { key: n.key || (o && o.key) || `_${t}` }, o || (s ? s() : []), o && e._ === 1 ? 64 : -2)
  return !r && l.scopeId && (l.slotScopeIds = [l.scopeId + '-s']), i && i._c && (i._d = !0), l
}
function xi(e) {
  return e.some((t) => (bn(t) ? !(t.type === ve || (t.type === me && !xi(t.children))) : !0)) ? e : null
}
function za(e, t) {
  const n = {}
  for (const s in e) n[t && /[A-Z]/.test(s) ? `on:${s}` : cn(s)] = e[s]
  return n
}
const ds = (e) => (e ? (ki(e) ? Dn(e) || e.proxy : ds(e.parent)) : null),
  Mt = oe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ds(e.parent),
    $root: (e) => ds(e.root),
    $emit: (e) => e.emit,
    $options: (e) => $s(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        ;(e.effect.dirty = !0), Ns(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = In.bind(e.proxy)),
    $watch: (e) => vl.bind(e),
  }),
  zn = (e, t) => e !== ee && !e.__isScriptSetup && X(e, t),
  Nl = {
    get({ _: e }, t) {
      const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: c } = e
      let u
      if (t[0] !== '$') {
        const w = o[t]
        if (w !== void 0)
          switch (w) {
            case 1:
              return s[t]
            case 2:
              return r[t]
            case 4:
              return n[t]
            case 3:
              return i[t]
          }
        else {
          if (zn(s, t)) return (o[t] = 1), s[t]
          if (r !== ee && X(r, t)) return (o[t] = 2), r[t]
          if ((u = e.propsOptions[0]) && X(u, t)) return (o[t] = 3), i[t]
          if (n !== ee && X(n, t)) return (o[t] = 4), n[t]
          hs && (o[t] = 0)
        }
      }
      const d = Mt[t]
      let h, m
      if (d) return t === '$attrs' && ye(e, 'get', t), d(e)
      if ((h = l.__cssModules) && (h = h[t])) return h
      if (n !== ee && X(n, t)) return (o[t] = 4), n[t]
      if (((m = c.config.globalProperties), X(m, t))) return m[t]
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e
      return zn(r, t)
        ? ((r[t] = n), !0)
        : s !== ee && X(s, t)
        ? ((s[t] = n), !0)
        : X(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0)
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i } }, o) {
      let l
      return (
        !!n[o] ||
        (e !== ee && X(e, o)) ||
        zn(t, o) ||
        ((l = i[0]) && X(l, o)) ||
        X(s, o) ||
        X(Mt, o) ||
        X(r.config.globalProperties, o)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : X(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    },
  }
function Xa() {
  return Fl().slots
}
function Fl() {
  const e = jn()
  return e.setupContext || (e.setupContext = Ki(e))
}
function rr(e) {
  return k(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let hs = !0
function $l(e) {
  const t = $s(e),
    n = e.proxy,
    s = e.ctx
  ;(hs = !1), t.beforeCreate && ir(t.beforeCreate, e, 'bc')
  const {
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: c,
    inject: u,
    created: d,
    beforeMount: h,
    mounted: m,
    beforeUpdate: w,
    updated: O,
    activated: M,
    deactivated: V,
    beforeDestroy: q,
    beforeUnmount: J,
    destroyed: g,
    unmounted: y,
    render: P,
    renderTracked: I,
    renderTriggered: D,
    errorCaptured: R,
    serverPrefetch: H,
    expose: E,
    inheritAttrs: U,
    components: S,
    directives: W,
    filters: re,
  } = t
  if ((u && Hl(u, s, null), o))
    for (const z in o) {
      const F = o[z]
      K(F) && (s[z] = F.bind(n))
    }
  if (r) {
    const z = r.call(n, n)
    Z(z) && (e.data = An(z))
  }
  if (((hs = !0), i))
    for (const z in i) {
      const F = i[z],
        Fe = K(F) ? F.bind(n, n) : K(F.get) ? F.get.bind(n, n) : xe,
        qt = !K(F) && K(F.set) ? F.set.bind(n) : xe,
        et = se({ get: Fe, set: qt })
      Object.defineProperty(s, z, {
        enumerable: !0,
        configurable: !0,
        get: () => et.value,
        set: (Oe) => (et.value = Oe),
      })
    }
  if (l) for (const z in l) Si(l[z], s, n, z)
  if (c) {
    const z = K(c) ? c.call(n) : c
    Reflect.ownKeys(z).forEach((F) => {
      Bl(F, z[F])
    })
  }
  d && ir(d, e, 'c')
  function $(z, F) {
    k(F) ? F.forEach((Fe) => z(Fe.bind(n))) : F && z(F.bind(n))
  }
  if (
    ($(Al, h),
    $(Tt, m),
    $(Rl, w),
    $(Ol, O),
    $(xl, M),
    $(Sl, V),
    $(Ml, R),
    $(Pl, I),
    $(Ll, D),
    $(Ci, J),
    $($n, y),
    $(Il, H),
    k(E))
  )
    if (E.length) {
      const z = e.exposed || (e.exposed = {})
      E.forEach((F) => {
        Object.defineProperty(z, F, { get: () => n[F], set: (Fe) => (n[F] = Fe) })
      })
    } else e.exposed || (e.exposed = {})
  P && e.render === xe && (e.render = P),
    U != null && (e.inheritAttrs = U),
    S && (e.components = S),
    W && (e.directives = W)
}
function Hl(e, t, n = xe) {
  k(e) && (e = ps(e))
  for (const s in e) {
    const r = e[s]
    let i
    Z(r) ? ('default' in r ? (i = Et(r.from || s, r.default, !0)) : (i = Et(r.from || s))) : (i = Et(r)),
      he(i)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (o) => (i.value = o),
          })
        : (t[s] = i)
  }
}
function ir(e, t, n) {
  Se(k(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Si(e, t, n, s) {
  const r = s.includes('.') ? yi(n, s) : () => n[s]
  if (ne(e)) {
    const i = t[e]
    K(i) && je(r, i)
  } else if (K(e)) je(r, e.bind(n))
  else if (Z(e))
    if (k(e)) e.forEach((i) => Si(i, t, n, s))
    else {
      const i = K(e.handler) ? e.handler.bind(n) : t[e.handler]
      K(i) && je(r, i, e)
    }
}
function $s(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    l = i.get(t)
  let c
  return (
    l
      ? (c = l)
      : !r.length && !n && !s
      ? (c = t)
      : ((c = {}), r.length && r.forEach((u) => yn(c, u, o, !0)), yn(c, t, o)),
    Z(t) && i.set(t, c),
    c
  )
}
function yn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t
  i && yn(e, i, n, !0), r && r.forEach((o) => yn(e, o, n, !0))
  for (const o in t)
    if (!(s && o === 'expose')) {
      const l = jl[o] || (n && n[o])
      e[o] = l ? l(e[o], t[o]) : t[o]
    }
  return e
}
const jl = {
  data: or,
  props: lr,
  emits: lr,
  methods: It,
  computed: It,
  beforeCreate: pe,
  created: pe,
  beforeMount: pe,
  mounted: pe,
  beforeUpdate: pe,
  updated: pe,
  beforeDestroy: pe,
  beforeUnmount: pe,
  destroyed: pe,
  unmounted: pe,
  activated: pe,
  deactivated: pe,
  errorCaptured: pe,
  serverPrefetch: pe,
  components: It,
  directives: It,
  watch: Dl,
  provide: or,
  inject: Vl,
}
function or(e, t) {
  return t
    ? e
      ? function () {
          return oe(K(e) ? e.call(this, this) : e, K(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function Vl(e, t) {
  return It(ps(e), ps(t))
}
function ps(e) {
  if (k(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function It(e, t) {
  return e ? oe(Object.create(null), e, t) : t
}
function lr(e, t) {
  return e ? (k(e) && k(t) ? [...new Set([...e, ...t])] : oe(Object.create(null), rr(e), rr(t ?? {}))) : t
}
function Dl(e, t) {
  if (!e) return t
  if (!t) return e
  const n = oe(Object.create(null), e)
  for (const s in t) n[s] = pe(e[s], t[s])
  return n
}
function Ti() {
  return {
    app: null,
    config: {
      isNativeTag: po,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let Ul = 0
function kl(e, t) {
  return function (s, r = null) {
    K(s) || (s = oe({}, s)), r != null && !Z(r) && (r = null)
    const i = Ti(),
      o = new WeakSet()
    let l = !1
    const c = (i.app = {
      _uid: Ul++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: pc,
      get config() {
        return i.config
      },
      set config(u) {},
      use(u, ...d) {
        return o.has(u) || (u && K(u.install) ? (o.add(u), u.install(c, ...d)) : K(u) && (o.add(u), u(c, ...d))), c
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), c
      },
      component(u, d) {
        return d ? ((i.components[u] = d), c) : i.components[u]
      },
      directive(u, d) {
        return d ? ((i.directives[u] = d), c) : i.directives[u]
      },
      mount(u, d, h) {
        if (!l) {
          const m = ue(s, r)
          return (
            (m.appContext = i),
            h === !0 ? (h = 'svg') : h === !1 && (h = void 0),
            d && t ? t(m, u) : e(m, u, h),
            (l = !0),
            (c._container = u),
            (u.__vue_app__ = c),
            Dn(m.component) || m.component.proxy
          )
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__)
      },
      provide(u, d) {
        return (i.provides[u] = d), c
      },
      runWithContext(u) {
        const d = Nt
        Nt = c
        try {
          return u()
        } finally {
          Nt = d
        }
      },
    })
    return c
  }
}
let Nt = null
function Bl(e, t) {
  if (ae) {
    let n = ae.provides
    const s = ae.parent && ae.parent.provides
    s === n && (n = ae.provides = Object.create(s)), (n[e] = t)
  }
}
function Et(e, t, n = !1) {
  const s = ae || ie
  if (s || Nt) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : Nt._context.provides
    if (r && e in r) return r[e]
    if (arguments.length > 1) return n && K(t) ? t.call(s && s.proxy) : t
  }
}
function Kl(e, t, n, s = !1) {
  const r = {},
    i = {}
  dn(i, Hn, 1), (e.propsDefaults = Object.create(null)), Ai(e, t, r, i)
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0)
  n ? (e.props = s ? r : Yo(r)) : e.type.props ? (e.props = r) : (e.props = i), (e.attrs = i)
}
function Wl(e, t, n, s) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    l = Y(r),
    [c] = e.propsOptions
  let u = !1
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const d = e.vnode.dynamicProps
      for (let h = 0; h < d.length; h++) {
        let m = d[h]
        if (Ln(e.emitsOptions, m)) continue
        const w = t[m]
        if (c)
          if (X(i, m)) w !== i[m] && ((i[m] = w), (u = !0))
          else {
            const O = Me(m)
            r[O] = gs(c, l, O, w, e, !1)
          }
        else w !== i[m] && ((i[m] = w), (u = !0))
      }
    }
  } else {
    Ai(e, t, r, i) && (u = !0)
    let d
    for (const h in l)
      (!t || (!X(t, h) && ((d = ut(h)) === h || !X(t, d)))) &&
        (c ? n && (n[h] !== void 0 || n[d] !== void 0) && (r[h] = gs(c, l, h, void 0, e, !0)) : delete r[h])
    if (i !== l) for (const h in i) (!t || !X(t, h)) && (delete i[h], (u = !0))
  }
  u && He(e, 'set', '$attrs')
}
function Ai(e, t, n, s) {
  const [r, i] = e.propsOptions
  let o = !1,
    l
  if (t)
    for (let c in t) {
      if (_t(c)) continue
      const u = t[c]
      let d
      r && X(r, (d = Me(c)))
        ? !i || !i.includes(d)
          ? (n[d] = u)
          : ((l || (l = {}))[d] = u)
        : Ln(e.emitsOptions, c) || ((!(c in s) || u !== s[c]) && ((s[c] = u), (o = !0)))
    }
  if (i) {
    const c = Y(n),
      u = l || ee
    for (let d = 0; d < i.length; d++) {
      const h = i[d]
      n[h] = gs(r, c, h, u[h], e, !X(u, h))
    }
  }
  return o
}
function gs(e, t, n, s, r, i) {
  const o = e[n]
  if (o != null) {
    const l = X(o, 'default')
    if (l && s === void 0) {
      const c = o.default
      if (o.type !== Function && !o.skipFactory && K(c)) {
        const { propsDefaults: u } = r
        if (n in u) s = u[n]
        else {
          const d = Wt(r)
          ;(s = u[n] = c.call(null, t)), d()
        }
      } else s = c
    }
    o[0] && (i && !l ? (s = !1) : o[1] && (s === '' || s === ut(n)) && (s = !0))
  }
  return s
}
function Ri(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e)
  if (r) return r
  const i = e.props,
    o = {},
    l = []
  let c = !1
  if (!K(e)) {
    const d = (h) => {
      c = !0
      const [m, w] = Ri(h, t, !0)
      oe(o, m), w && l.push(...w)
    }
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d)
  }
  if (!i && !c) return Z(e) && s.set(e, mt), mt
  if (k(i))
    for (let d = 0; d < i.length; d++) {
      const h = Me(i[d])
      cr(h) && (o[h] = ee)
    }
  else if (i)
    for (const d in i) {
      const h = Me(d)
      if (cr(h)) {
        const m = i[d],
          w = (o[h] = k(m) || K(m) ? { type: m } : oe({}, m))
        if (w) {
          const O = fr(Boolean, w.type),
            M = fr(String, w.type)
          ;(w[0] = O > -1), (w[1] = M < 0 || O < M), (O > -1 || X(w, 'default')) && l.push(h)
        }
      }
    }
  const u = [o, l]
  return Z(e) && s.set(e, u), u
}
function cr(e) {
  return e[0] !== '$' && !_t(e)
}
function ar(e) {
  return e === null
    ? 'null'
    : typeof e == 'function'
    ? e.name || ''
    : (typeof e == 'object' && e.constructor && e.constructor.name) || ''
}
function ur(e, t) {
  return ar(e) === ar(t)
}
function fr(e, t) {
  return k(t) ? t.findIndex((n) => ur(n, e)) : K(t) && ur(t, e) ? 0 : -1
}
const Oi = (e) => e[0] === '_' || e === '$stable',
  Hs = (e) => (k(e) ? e.map(Ae) : [Ae(e)]),
  ql = (e, t, n) => {
    if (t._n) return t
    const s = dl((...r) => Hs(t(...r)), n)
    return (s._c = !1), s
  },
  Ii = (e, t, n) => {
    const s = e._ctx
    for (const r in e) {
      if (Oi(r)) continue
      const i = e[r]
      if (K(i)) t[r] = ql(r, i, s)
      else if (i != null) {
        const o = Hs(i)
        t[r] = () => o
      }
    }
  },
  Li = (e, t) => {
    const n = Hs(t)
    e.slots.default = () => n
  },
  Gl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = Y(t)), dn(t, '_', n)) : Ii(t, (e.slots = {}))
    } else (e.slots = {}), t && Li(e, t)
    dn(e.slots, Hn, 1)
  },
  zl = (e, t, n) => {
    const { vnode: s, slots: r } = e
    let i = !0,
      o = ee
    if (s.shapeFlag & 32) {
      const l = t._
      l ? (n && l === 1 ? (i = !1) : (oe(r, t), !n && l === 1 && delete r._)) : ((i = !t.$stable), Ii(t, r)), (o = t)
    } else t && (Li(e, t), (o = { default: 1 }))
    if (i) for (const l in r) !Oi(l) && o[l] == null && delete r[l]
  }
function _n(e, t, n, s, r = !1) {
  if (k(e)) {
    e.forEach((m, w) => _n(m, t && (k(t) ? t[w] : t), n, s, r))
    return
  }
  if (wt(s) && !r) return
  const i = s.shapeFlag & 4 ? Dn(s.component) || s.component.proxy : s.el,
    o = r ? null : i,
    { i: l, r: c } = e,
    u = t && t.r,
    d = l.refs === ee ? (l.refs = {}) : l.refs,
    h = l.setupState
  if ((u != null && u !== c && (ne(u) ? ((d[u] = null), X(h, u) && (h[u] = null)) : he(u) && (u.value = null)), K(c)))
    Ye(c, l, 12, [o, d])
  else {
    const m = ne(c),
      w = he(c)
    if (m || w) {
      const O = () => {
        if (e.f) {
          const M = m ? (X(h, c) ? h[c] : d[c]) : c.value
          r
            ? k(M) && ws(M, i)
            : k(M)
            ? M.includes(i) || M.push(i)
            : m
            ? ((d[c] = [i]), X(h, c) && (h[c] = d[c]))
            : ((c.value = [i]), e.k && (d[e.k] = c.value))
        } else m ? ((d[c] = o), X(h, c) && (h[c] = o)) : w && ((c.value = o), e.k && (d[e.k] = o))
      }
      o ? ((O.id = -1), ge(O, n)) : O()
    }
  }
}
let ke = !1
const Xl = (e) => e.namespaceURI.includes('svg') && e.tagName !== 'foreignObject',
  Yl = (e) => e.namespaceURI.includes('MathML'),
  tn = (e) => {
    if (Xl(e)) return 'svg'
    if (Yl(e)) return 'mathml'
  },
  nn = (e) => e.nodeType === 8
function Jl(e) {
  const {
      mt: t,
      p: n,
      o: { patchProp: s, createText: r, nextSibling: i, parentNode: o, remove: l, insert: c, createComment: u },
    } = e,
    d = (g, y) => {
      if (!y.hasChildNodes()) {
        n(null, g, y), gn(), (y._vnode = g)
        return
      }
      ;(ke = !1),
        h(y.firstChild, g, null, null, null),
        gn(),
        (y._vnode = g),
        ke && console.error('Hydration completed but contains mismatches.')
    },
    h = (g, y, P, I, D, R = !1) => {
      const H = nn(g) && g.data === '[',
        E = () => M(g, y, P, I, D, H),
        { type: U, ref: S, shapeFlag: W, patchFlag: re } = y
      let ce = g.nodeType
      ;(y.el = g), re === -2 && ((R = !1), (y.dynamicChildren = null))
      let $ = null
      switch (U) {
        case xt:
          ce !== 3
            ? y.children === ''
              ? (c((y.el = r('')), o(g), g), ($ = g))
              : ($ = E())
            : (g.data !== y.children && ((ke = !0), (g.data = y.children)), ($ = i(g)))
          break
        case ve:
          J(g) ? (($ = i(g)), q((y.el = g.content.firstChild), g, P)) : ce !== 8 || H ? ($ = E()) : ($ = i(g))
          break
        case Ft:
          if ((H && ((g = i(g)), (ce = g.nodeType)), ce === 1 || ce === 3)) {
            $ = g
            const z = !y.children.length
            for (let F = 0; F < y.staticCount; F++)
              z && (y.children += $.nodeType === 1 ? $.outerHTML : $.data),
                F === y.staticCount - 1 && (y.anchor = $),
                ($ = i($))
            return H ? i($) : $
          } else E()
          break
        case me:
          H ? ($ = O(g, y, P, I, D, R)) : ($ = E())
          break
        default:
          if (W & 1)
            (ce !== 1 || y.type.toLowerCase() !== g.tagName.toLowerCase()) && !J(g)
              ? ($ = E())
              : ($ = m(g, y, P, I, D, R))
          else if (W & 6) {
            y.slotScopeIds = D
            const z = o(g)
            if (
              (H ? ($ = V(g)) : nn(g) && g.data === 'teleport start' ? ($ = V(g, g.data, 'teleport end')) : ($ = i(g)),
              t(y, z, null, P, I, tn(z), R),
              wt(y))
            ) {
              let F
              H
                ? ((F = ue(me)), (F.anchor = $ ? $.previousSibling : z.lastChild))
                : (F = g.nodeType === 3 ? Ui('') : ue('div')),
                (F.el = g),
                (y.component.subTree = F)
            }
          } else
            W & 64
              ? ce !== 8
                ? ($ = E())
                : ($ = y.type.hydrate(g, y, P, I, D, R, e, w))
              : W & 128 && ($ = y.type.hydrate(g, y, P, I, tn(o(g)), D, R, e, h))
      }
      return S != null && _n(S, null, I, y), $
    },
    m = (g, y, P, I, D, R) => {
      R = R || !!y.dynamicChildren
      const { type: H, props: E, patchFlag: U, shapeFlag: S, dirs: W, transition: re } = y,
        ce = H === 'input' || H === 'option'
      if (ce || U !== -1) {
        W && Le(y, null, P, 'created')
        let $ = !1
        if (J(g)) {
          $ = Mi(I, re) && P && P.vnode.props && P.vnode.props.appear
          const F = g.content.firstChild
          $ && re.beforeEnter(F), q(F, g, P), (y.el = g = F)
        }
        if (S & 16 && !(E && (E.innerHTML || E.textContent))) {
          let F = w(g.firstChild, y, g, P, I, D, R)
          for (; F; ) {
            ke = !0
            const Fe = F
            ;(F = F.nextSibling), l(Fe)
          }
        } else S & 8 && g.textContent !== y.children && ((ke = !0), (g.textContent = y.children))
        if (E)
          if (ce || !R || U & 48)
            for (const F in E)
              ((ce && (F.endsWith('value') || F === 'indeterminate')) || (Kt(F) && !_t(F)) || F[0] === '.') &&
                s(g, F, null, E[F], void 0, void 0, P)
          else E.onClick && s(g, 'onClick', null, E.onClick, void 0, void 0, P)
        let z
        ;(z = E && E.onVnodeBeforeMount) && Ee(z, P, y),
          W && Le(y, null, P, 'beforeMount'),
          ((z = E && E.onVnodeMounted) || W || $) &&
            gi(() => {
              z && Ee(z, P, y), $ && re.enter(g), W && Le(y, null, P, 'mounted')
            }, I)
      }
      return g.nextSibling
    },
    w = (g, y, P, I, D, R, H) => {
      H = H || !!y.dynamicChildren
      const E = y.children,
        U = E.length
      for (let S = 0; S < U; S++) {
        const W = H ? E[S] : (E[S] = Ae(E[S]))
        if (g) g = h(g, W, I, D, R, H)
        else {
          if (W.type === xt && !W.children) continue
          ;(ke = !0), n(null, W, P, null, I, D, tn(P), R)
        }
      }
      return g
    },
    O = (g, y, P, I, D, R) => {
      const { slotScopeIds: H } = y
      H && (D = D ? D.concat(H) : H)
      const E = o(g),
        U = w(i(g), y, E, P, I, D, R)
      return U && nn(U) && U.data === ']' ? i((y.anchor = U)) : ((ke = !0), c((y.anchor = u(']')), E, U), U)
    },
    M = (g, y, P, I, D, R) => {
      if (((ke = !0), (y.el = null), R)) {
        const U = V(g)
        for (;;) {
          const S = i(g)
          if (S && S !== U) l(S)
          else break
        }
      }
      const H = i(g),
        E = o(g)
      return l(g), n(null, y, E, H, P, I, tn(E), D), H
    },
    V = (g, y = '[', P = ']') => {
      let I = 0
      for (; g; )
        if (((g = i(g)), g && nn(g) && (g.data === y && I++, g.data === P))) {
          if (I === 0) return i(g)
          I--
        }
      return g
    },
    q = (g, y, P) => {
      const I = y.parentNode
      I && I.replaceChild(g, y)
      let D = P
      for (; D; ) D.vnode.el === y && (D.vnode.el = D.subTree.el = g), (D = D.parent)
    },
    J = (g) => g.nodeType === 1 && g.tagName.toLowerCase() === 'template'
  return [d, h]
}
const ge = gi
function Ql(e) {
  return Pi(e)
}
function Zl(e) {
  return Pi(e, Jl)
}
function Pi(e, t) {
  const n = kr()
  n.__VUE__ = !0
  const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: l,
      createComment: c,
      setText: u,
      setElementText: d,
      parentNode: h,
      nextSibling: m,
      setScopeId: w = xe,
      insertStaticContent: O,
    } = e,
    M = (a, f, p, _ = null, b = null, x = null, A = void 0, C = null, T = !!f.dynamicChildren) => {
      if (a === f) return
      a && !it(a, f) && ((_ = Gt(a)), Oe(a, b, x, !0), (a = null)),
        f.patchFlag === -2 && ((T = !1), (f.dynamicChildren = null))
      const { type: v, ref: L, shapeFlag: j } = f
      switch (v) {
        case xt:
          V(a, f, p, _)
          break
        case ve:
          q(a, f, p, _)
          break
        case Ft:
          a == null && J(f, p, _, A)
          break
        case me:
          S(a, f, p, _, b, x, A, C, T)
          break
        default:
          j & 1
            ? P(a, f, p, _, b, x, A, C, T)
            : j & 6
            ? W(a, f, p, _, b, x, A, C, T)
            : (j & 64 || j & 128) && v.process(a, f, p, _, b, x, A, C, T, ht)
      }
      L != null && b && _n(L, a && a.ref, x, f || a, !f)
    },
    V = (a, f, p, _) => {
      if (a == null) s((f.el = l(f.children)), p, _)
      else {
        const b = (f.el = a.el)
        f.children !== a.children && u(b, f.children)
      }
    },
    q = (a, f, p, _) => {
      a == null ? s((f.el = c(f.children || '')), p, _) : (f.el = a.el)
    },
    J = (a, f, p, _) => {
      ;[a.el, a.anchor] = O(a.children, f, p, _, a.el, a.anchor)
    },
    g = ({ el: a, anchor: f }, p, _) => {
      let b
      for (; a && a !== f; ) (b = m(a)), s(a, p, _), (a = b)
      s(f, p, _)
    },
    y = ({ el: a, anchor: f }) => {
      let p
      for (; a && a !== f; ) (p = m(a)), r(a), (a = p)
      r(f)
    },
    P = (a, f, p, _, b, x, A, C, T) => {
      f.type === 'svg' ? (A = 'svg') : f.type === 'math' && (A = 'mathml'),
        a == null ? I(f, p, _, b, x, A, C, T) : H(a, f, b, x, A, C, T)
    },
    I = (a, f, p, _, b, x, A, C) => {
      let T, v
      const { props: L, shapeFlag: j, transition: N, dirs: B } = a
      if (
        ((T = a.el = o(a.type, x, L && L.is, L)),
        j & 8 ? d(T, a.children) : j & 16 && R(a.children, T, null, _, b, Xn(a, x), A, C),
        B && Le(a, null, _, 'created'),
        D(T, a, a.scopeId, A, _),
        L)
      ) {
        for (const Q in L) Q !== 'value' && !_t(Q) && i(T, Q, null, L[Q], x, a.children, _, b, $e)
        'value' in L && i(T, 'value', null, L.value, x), (v = L.onVnodeBeforeMount) && Ee(v, _, a)
      }
      B && Le(a, null, _, 'beforeMount')
      const G = Mi(b, N)
      G && N.beforeEnter(T),
        s(T, f, p),
        ((v = L && L.onVnodeMounted) || G || B) &&
          ge(() => {
            v && Ee(v, _, a), G && N.enter(T), B && Le(a, null, _, 'mounted')
          }, b)
    },
    D = (a, f, p, _, b) => {
      if ((p && w(a, p), _)) for (let x = 0; x < _.length; x++) w(a, _[x])
      if (b) {
        let x = b.subTree
        if (f === x) {
          const A = b.vnode
          D(a, A, A.scopeId, A.slotScopeIds, b.parent)
        }
      }
    },
    R = (a, f, p, _, b, x, A, C, T = 0) => {
      for (let v = T; v < a.length; v++) {
        const L = (a[v] = C ? Ge(a[v]) : Ae(a[v]))
        M(null, L, f, p, _, b, x, A, C)
      }
    },
    H = (a, f, p, _, b, x, A) => {
      const C = (f.el = a.el)
      let { patchFlag: T, dynamicChildren: v, dirs: L } = f
      T |= a.patchFlag & 16
      const j = a.props || ee,
        N = f.props || ee
      let B
      if (
        (p && tt(p, !1),
        (B = N.onVnodeBeforeUpdate) && Ee(B, p, f, a),
        L && Le(f, a, p, 'beforeUpdate'),
        p && tt(p, !0),
        v ? E(a.dynamicChildren, v, C, p, _, Xn(f, b), x) : A || F(a, f, C, null, p, _, Xn(f, b), x, !1),
        T > 0)
      ) {
        if (T & 16) U(C, f, j, N, p, _, b)
        else if (
          (T & 2 && j.class !== N.class && i(C, 'class', null, N.class, b),
          T & 4 && i(C, 'style', j.style, N.style, b),
          T & 8)
        ) {
          const G = f.dynamicProps
          for (let Q = 0; Q < G.length; Q++) {
            const te = G[Q],
              le = j[te],
              Te = N[te]
            ;(Te !== le || te === 'value') && i(C, te, le, Te, b, a.children, p, _, $e)
          }
        }
        T & 1 && a.children !== f.children && d(C, f.children)
      } else !A && v == null && U(C, f, j, N, p, _, b)
      ;((B = N.onVnodeUpdated) || L) &&
        ge(() => {
          B && Ee(B, p, f, a), L && Le(f, a, p, 'updated')
        }, _)
    },
    E = (a, f, p, _, b, x, A) => {
      for (let C = 0; C < f.length; C++) {
        const T = a[C],
          v = f[C],
          L = T.el && (T.type === me || !it(T, v) || T.shapeFlag & 70) ? h(T.el) : p
        M(T, v, L, null, _, b, x, A, !0)
      }
    },
    U = (a, f, p, _, b, x, A) => {
      if (p !== _) {
        if (p !== ee) for (const C in p) !_t(C) && !(C in _) && i(a, C, p[C], null, A, f.children, b, x, $e)
        for (const C in _) {
          if (_t(C)) continue
          const T = _[C],
            v = p[C]
          T !== v && C !== 'value' && i(a, C, v, T, A, f.children, b, x, $e)
        }
        'value' in _ && i(a, 'value', p.value, _.value, A)
      }
    },
    S = (a, f, p, _, b, x, A, C, T) => {
      const v = (f.el = a ? a.el : l('')),
        L = (f.anchor = a ? a.anchor : l(''))
      let { patchFlag: j, dynamicChildren: N, slotScopeIds: B } = f
      B && (C = C ? C.concat(B) : B),
        a == null
          ? (s(v, p, _), s(L, p, _), R(f.children || [], p, L, b, x, A, C, T))
          : j > 0 && j & 64 && N && a.dynamicChildren
          ? (E(a.dynamicChildren, N, p, b, x, A, C), (f.key != null || (b && f === b.subTree)) && Ni(a, f, !0))
          : F(a, f, p, L, b, x, A, C, T)
    },
    W = (a, f, p, _, b, x, A, C, T) => {
      ;(f.slotScopeIds = C),
        a == null ? (f.shapeFlag & 512 ? b.ctx.activate(f, p, _, A, T) : re(f, p, _, b, x, A, T)) : ce(a, f, T)
    },
    re = (a, f, p, _, b, x, A) => {
      const C = (a.component = cc(a, _, b))
      if ((Nn(a) && (C.ctx.renderer = ht), ac(C), C.asyncDep)) {
        if ((b && b.registerDep(C, $), !a.el)) {
          const T = (C.subTree = ue(ve))
          q(null, T, f, p)
        }
      } else $(C, a, f, p, b, x, A)
    },
    ce = (a, f, p) => {
      const _ = (f.component = a.component)
      if (gl(a, f, p))
        if (_.asyncDep && !_.asyncResolved) {
          z(_, f, p)
          return
        } else (_.next = f), cl(_.update), (_.effect.dirty = !0), _.update()
      else (f.el = a.el), (_.vnode = f)
    },
    $ = (a, f, p, _, b, x, A) => {
      const C = () => {
          if (a.isMounted) {
            let { next: L, bu: j, u: N, parent: B, vnode: G } = a
            {
              const pt = Fi(a)
              if (pt) {
                L && ((L.el = G.el), z(a, L, A)),
                  pt.asyncDep.then(() => {
                    a.isUnmounted || C()
                  })
                return
              }
            }
            let Q = L,
              te
            tt(a, !1),
              L ? ((L.el = G.el), z(a, L, A)) : (L = G),
              j && Kn(j),
              (te = L.props && L.props.onVnodeBeforeUpdate) && Ee(te, B, L, G),
              tt(a, !0)
            const le = qn(a),
              Te = a.subTree
            ;(a.subTree = le),
              M(Te, le, h(Te.el), Gt(Te), a, b, x),
              (L.el = le.el),
              Q === null && ml(a, le.el),
              N && ge(N, b),
              (te = L.props && L.props.onVnodeUpdated) && ge(() => Ee(te, B, L, G), b)
          } else {
            let L
            const { el: j, props: N } = f,
              { bm: B, m: G, parent: Q } = a,
              te = wt(f)
            if ((tt(a, !1), B && Kn(B), !te && (L = N && N.onVnodeBeforeMount) && Ee(L, Q, f), tt(a, !0), j && Bn)) {
              const le = () => {
                ;(a.subTree = qn(a)), Bn(j, a.subTree, a, b, null)
              }
              te ? f.type.__asyncLoader().then(() => !a.isUnmounted && le()) : le()
            } else {
              const le = (a.subTree = qn(a))
              M(null, le, p, _, a, b, x), (f.el = le.el)
            }
            if ((G && ge(G, b), !te && (L = N && N.onVnodeMounted))) {
              const le = f
              ge(() => Ee(L, Q, le), b)
            }
            ;(f.shapeFlag & 256 || (Q && wt(Q.vnode) && Q.vnode.shapeFlag & 256)) && a.a && ge(a.a, b),
              (a.isMounted = !0),
              (f = p = _ = null)
          }
        },
        T = (a.effect = new Ss(C, xe, () => Ns(v), a.scope)),
        v = (a.update = () => {
          T.dirty && T.run()
        })
      ;(v.id = a.uid), tt(a, !0), v()
    },
    z = (a, f, p) => {
      f.component = a
      const _ = a.vnode.props
      ;(a.vnode = f), (a.next = null), Wl(a, f.props, _, p), zl(a, f.children, p), ft(), er(a), dt()
    },
    F = (a, f, p, _, b, x, A, C, T = !1) => {
      const v = a && a.children,
        L = a ? a.shapeFlag : 0,
        j = f.children,
        { patchFlag: N, shapeFlag: B } = f
      if (N > 0) {
        if (N & 128) {
          qt(v, j, p, _, b, x, A, C, T)
          return
        } else if (N & 256) {
          Fe(v, j, p, _, b, x, A, C, T)
          return
        }
      }
      B & 8
        ? (L & 16 && $e(v, b, x), j !== v && d(p, j))
        : L & 16
        ? B & 16
          ? qt(v, j, p, _, b, x, A, C, T)
          : $e(v, b, x, !0)
        : (L & 8 && d(p, ''), B & 16 && R(j, p, _, b, x, A, C, T))
    },
    Fe = (a, f, p, _, b, x, A, C, T) => {
      ;(a = a || mt), (f = f || mt)
      const v = a.length,
        L = f.length,
        j = Math.min(v, L)
      let N
      for (N = 0; N < j; N++) {
        const B = (f[N] = T ? Ge(f[N]) : Ae(f[N]))
        M(a[N], B, p, null, b, x, A, C, T)
      }
      v > L ? $e(a, b, x, !0, !1, j) : R(f, p, _, b, x, A, C, T, j)
    },
    qt = (a, f, p, _, b, x, A, C, T) => {
      let v = 0
      const L = f.length
      let j = a.length - 1,
        N = L - 1
      for (; v <= j && v <= N; ) {
        const B = a[v],
          G = (f[v] = T ? Ge(f[v]) : Ae(f[v]))
        if (it(B, G)) M(B, G, p, null, b, x, A, C, T)
        else break
        v++
      }
      for (; v <= j && v <= N; ) {
        const B = a[j],
          G = (f[N] = T ? Ge(f[N]) : Ae(f[N]))
        if (it(B, G)) M(B, G, p, null, b, x, A, C, T)
        else break
        j--, N--
      }
      if (v > j) {
        if (v <= N) {
          const B = N + 1,
            G = B < L ? f[B].el : _
          for (; v <= N; ) M(null, (f[v] = T ? Ge(f[v]) : Ae(f[v])), p, G, b, x, A, C, T), v++
        }
      } else if (v > N) for (; v <= j; ) Oe(a[v], b, x, !0), v++
      else {
        const B = v,
          G = v,
          Q = new Map()
        for (v = G; v <= N; v++) {
          const _e = (f[v] = T ? Ge(f[v]) : Ae(f[v]))
          _e.key != null && Q.set(_e.key, v)
        }
        let te,
          le = 0
        const Te = N - G + 1
        let pt = !1,
          Bs = 0
        const At = new Array(Te)
        for (v = 0; v < Te; v++) At[v] = 0
        for (v = B; v <= j; v++) {
          const _e = a[v]
          if (le >= Te) {
            Oe(_e, b, x, !0)
            continue
          }
          let Ie
          if (_e.key != null) Ie = Q.get(_e.key)
          else
            for (te = G; te <= N; te++)
              if (At[te - G] === 0 && it(_e, f[te])) {
                Ie = te
                break
              }
          Ie === void 0
            ? Oe(_e, b, x, !0)
            : ((At[Ie - G] = v + 1), Ie >= Bs ? (Bs = Ie) : (pt = !0), M(_e, f[Ie], p, null, b, x, A, C, T), le++)
        }
        const Ks = pt ? ec(At) : mt
        for (te = Ks.length - 1, v = Te - 1; v >= 0; v--) {
          const _e = G + v,
            Ie = f[_e],
            Ws = _e + 1 < L ? f[_e + 1].el : _
          At[v] === 0 ? M(null, Ie, p, Ws, b, x, A, C, T) : pt && (te < 0 || v !== Ks[te] ? et(Ie, p, Ws, 2) : te--)
        }
      }
    },
    et = (a, f, p, _, b = null) => {
      const { el: x, type: A, transition: C, children: T, shapeFlag: v } = a
      if (v & 6) {
        et(a.component.subTree, f, p, _)
        return
      }
      if (v & 128) {
        a.suspense.move(f, p, _)
        return
      }
      if (v & 64) {
        A.move(a, f, p, ht)
        return
      }
      if (A === me) {
        s(x, f, p)
        for (let j = 0; j < T.length; j++) et(T[j], f, p, _)
        s(a.anchor, f, p)
        return
      }
      if (A === Ft) {
        g(a, f, p)
        return
      }
      if (_ !== 2 && v & 1 && C)
        if (_ === 0) C.beforeEnter(x), s(x, f, p), ge(() => C.enter(x), b)
        else {
          const { leave: j, delayLeave: N, afterLeave: B } = C,
            G = () => s(x, f, p),
            Q = () => {
              j(x, () => {
                G(), B && B()
              })
            }
          N ? N(x, G, Q) : Q()
        }
      else s(x, f, p)
    },
    Oe = (a, f, p, _ = !1, b = !1) => {
      const { type: x, props: A, ref: C, children: T, dynamicChildren: v, shapeFlag: L, patchFlag: j, dirs: N } = a
      if ((C != null && _n(C, null, p, a, !0), L & 256)) {
        f.ctx.deactivate(a)
        return
      }
      const B = L & 1 && N,
        G = !wt(a)
      let Q
      if ((G && (Q = A && A.onVnodeBeforeUnmount) && Ee(Q, f, a), L & 6)) ho(a.component, p, _)
      else {
        if (L & 128) {
          a.suspense.unmount(p, _)
          return
        }
        B && Le(a, null, f, 'beforeUnmount'),
          L & 64
            ? a.type.remove(a, f, p, b, ht, _)
            : v && (x !== me || (j > 0 && j & 64))
            ? $e(v, f, p, !1, !0)
            : ((x === me && j & 384) || (!b && L & 16)) && $e(T, f, p),
          _ && Us(a)
      }
      ;((G && (Q = A && A.onVnodeUnmounted)) || B) &&
        ge(() => {
          Q && Ee(Q, f, a), B && Le(a, null, f, 'unmounted')
        }, p)
    },
    Us = (a) => {
      const { type: f, el: p, anchor: _, transition: b } = a
      if (f === me) {
        fo(p, _)
        return
      }
      if (f === Ft) {
        y(a)
        return
      }
      const x = () => {
        r(p), b && !b.persisted && b.afterLeave && b.afterLeave()
      }
      if (a.shapeFlag & 1 && b && !b.persisted) {
        const { leave: A, delayLeave: C } = b,
          T = () => A(p, x)
        C ? C(a.el, x, T) : T()
      } else x()
    },
    fo = (a, f) => {
      let p
      for (; a !== f; ) (p = m(a)), r(a), (a = p)
      r(f)
    },
    ho = (a, f, p) => {
      const { bum: _, scope: b, update: x, subTree: A, um: C } = a
      _ && Kn(_),
        b.stop(),
        x && ((x.active = !1), Oe(A, a, f, p)),
        C && ge(C, f),
        ge(() => {
          a.isUnmounted = !0
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve())
    },
    $e = (a, f, p, _ = !1, b = !1, x = 0) => {
      for (let A = x; A < a.length; A++) Oe(a[A], f, p, _, b)
    },
    Gt = (a) =>
      a.shapeFlag & 6 ? Gt(a.component.subTree) : a.shapeFlag & 128 ? a.suspense.next() : m(a.anchor || a.el)
  let Un = !1
  const ks = (a, f, p) => {
      a == null ? f._vnode && Oe(f._vnode, null, null, !0) : M(f._vnode || null, a, f, null, null, null, p),
        Un || ((Un = !0), er(), gn(), (Un = !1)),
        (f._vnode = a)
    },
    ht = { p: M, um: Oe, m: et, r: Us, mt: re, mc: R, pc: F, pbc: E, n: Gt, o: e }
  let kn, Bn
  return t && ([kn, Bn] = t(ht)), { render: ks, hydrate: kn, createApp: kl(ks, kn) }
}
function Xn({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
    ? void 0
    : n
}
function tt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function Mi(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function Ni(e, t, n = !1) {
  const s = e.children,
    r = t.children
  if (k(s) && k(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i]
      let l = r[i]
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = r[i] = Ge(r[i])), (l.el = o.el)), n || Ni(o, l)),
        l.type === xt && (l.el = o.el)
    }
}
function ec(e) {
  const t = e.slice(),
    n = [0]
  let s, r, i, o, l
  const c = e.length
  for (s = 0; s < c; s++) {
    const u = e[s]
    if (u !== 0) {
      if (((r = n[n.length - 1]), e[r] < u)) {
        ;(t[s] = r), n.push(s)
        continue
      }
      for (i = 0, o = n.length - 1; i < o; ) (l = (i + o) >> 1), e[n[l]] < u ? (i = l + 1) : (o = l)
      u < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s))
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o])
  return n
}
function Fi(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : Fi(t)
}
const tc = (e) => e.__isTeleport,
  me = Symbol.for('v-fgt'),
  xt = Symbol.for('v-txt'),
  ve = Symbol.for('v-cmt'),
  Ft = Symbol.for('v-stc'),
  $t = []
let Re = null
function $i(e = !1) {
  $t.push((Re = e ? null : []))
}
function nc() {
  $t.pop(), (Re = $t[$t.length - 1] || null)
}
let kt = 1
function dr(e) {
  kt += e
}
function Hi(e) {
  return (e.dynamicChildren = kt > 0 ? Re || mt : null), nc(), kt > 0 && Re && Re.push(e), e
}
function Ya(e, t, n, s, r, i) {
  return Hi(Di(e, t, n, s, r, i, !0))
}
function ji(e, t, n, s, r) {
  return Hi(ue(e, t, n, s, r, !0))
}
function bn(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function it(e, t) {
  return e.type === t.type && e.key === t.key
}
const Hn = '__vInternal',
  Vi = ({ key: e }) => e ?? null,
  an = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null ? (ne(e) || he(e) || K(e) ? { i: ie, r: e, k: t, f: !!n } : e) : null
  )
function Di(e, t = null, n = null, s = 0, r = null, i = e === me ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Vi(t),
    ref: t && an(t),
    scopeId: Pn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ie,
  }
  return (
    l ? (js(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= ne(n) ? 8 : 16),
    kt > 0 && !o && Re && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && Re.push(c),
    c
  )
}
const ue = sc
function sc(e, t = null, n = null, s = 0, r = null, i = !1) {
  if (((!e || e === hi) && (e = ve), bn(e))) {
    const l = Ze(e, t, !0)
    return (
      n && js(l, n),
      kt > 0 && !i && Re && (l.shapeFlag & 6 ? (Re[Re.indexOf(e)] = l) : Re.push(l)),
      (l.patchFlag |= -2),
      l
    )
  }
  if ((hc(e) && (e = e.__vccOpts), t)) {
    t = rc(t)
    let { class: l, style: c } = t
    l && !ne(l) && (t.class = xs(l)), Z(c) && (si(c) && !k(c) && (c = oe({}, c)), (t.style = Cs(c)))
  }
  const o = ne(e) ? 1 : yl(e) ? 128 : tc(e) ? 64 : Z(e) ? 4 : K(e) ? 2 : 0
  return Di(e, t, n, s, r, o, i, !0)
}
function rc(e) {
  return e ? (si(e) || Hn in e ? oe({}, e) : e) : null
}
function Ze(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: i, children: o } = e,
    l = t ? ic(s || {}, t) : s
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Vi(l),
    ref: t && t.ref ? (n && r ? (k(r) ? r.concat(an(t)) : [r, an(t)]) : an(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== me ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ze(e.ssContent),
    ssFallback: e.ssFallback && Ze(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  }
}
function Ui(e = ' ', t = 0) {
  return ue(xt, null, e, t)
}
function Ja(e, t) {
  const n = ue(Ft, null, e)
  return (n.staticCount = t), n
}
function Qa(e = '', t = !1) {
  return t ? ($i(), ji(ve, null, e)) : ue(ve, null, e)
}
function Ae(e) {
  return e == null || typeof e == 'boolean'
    ? ue(ve)
    : k(e)
    ? ue(me, null, e.slice())
    : typeof e == 'object'
    ? Ge(e)
    : ue(xt, null, String(e))
}
function Ge(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ze(e)
}
function js(e, t) {
  let n = 0
  const { shapeFlag: s } = e
  if (t == null) t = null
  else if (k(t)) n = 16
  else if (typeof t == 'object')
    if (s & 65) {
      const r = t.default
      r && (r._c && (r._d = !1), js(e, r()), r._c && (r._d = !0))
      return
    } else {
      n = 32
      const r = t._
      !r && !(Hn in t)
        ? (t._ctx = ie)
        : r === 3 && ie && (ie.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    K(t) ? ((t = { default: t, _ctx: ie }), (n = 32)) : ((t = String(t)), s & 64 ? ((n = 16), (t = [Ui(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function ic(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const s = e[n]
    for (const r in s)
      if (r === 'class') t.class !== s.class && (t.class = xs([t.class, s.class]))
      else if (r === 'style') t.style = Cs([t.style, s.style])
      else if (Kt(r)) {
        const i = t[r],
          o = s[r]
        o && i !== o && !(k(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o)
      } else r !== '' && (t[r] = s[r])
  }
  return t
}
function Ee(e, t, n, s = null) {
  Se(e, t, 7, [n, s])
}
const oc = Ti()
let lc = 0
function cc(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || oc,
    i = {
      uid: lc++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ao(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ri(s, r),
      emitsOptions: di(s, r),
      emit: null,
      emitted: null,
      propsDefaults: ee,
      inheritAttrs: s.inheritAttrs,
      ctx: ee,
      data: ee,
      props: ee,
      attrs: ee,
      slots: ee,
      refs: ee,
      setupState: ee,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (i.ctx = { _: i }), (i.root = t ? t.root : i), (i.emit = fl.bind(null, i)), e.ce && e.ce(i), i
}
let ae = null
const jn = () => ae || ie
let vn, ms
{
  const e = kr(),
    t = (n, s) => {
      let r
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (i) => {
          r.length > 1 ? r.forEach((o) => o(i)) : r[0](i)
        }
      )
    }
  ;(vn = t('__VUE_INSTANCE_SETTERS__', (n) => (ae = n))), (ms = t('__VUE_SSR_SETTERS__', (n) => (Vn = n)))
}
const Wt = (e) => {
    const t = ae
    return (
      vn(e),
      e.scope.on(),
      () => {
        e.scope.off(), vn(t)
      }
    )
  },
  hr = () => {
    ae && ae.scope.off(), vn(null)
  }
function ki(e) {
  return e.vnode.shapeFlag & 4
}
let Vn = !1
function ac(e, t = !1) {
  t && ms(t)
  const { props: n, children: s } = e.vnode,
    r = ki(e)
  Kl(e, n, r, t), Gl(e, s)
  const i = r ? uc(e, t) : void 0
  return t && ms(!1), i
}
function uc(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = Lt(new Proxy(e.ctx, Nl)))
  const { setup: s } = n
  if (s) {
    const r = (e.setupContext = s.length > 1 ? Ki(e) : null),
      i = Wt(e)
    ft()
    const o = Ye(s, e, 0, [e.props, r])
    if ((dt(), i(), Vr(o))) {
      if ((o.then(hr, hr), t))
        return o
          .then((l) => {
            pr(e, l, t)
          })
          .catch((l) => {
            On(l, e, 0)
          })
      e.asyncDep = o
    } else pr(e, o, t)
  } else Bi(e, t)
}
function pr(e, t, n) {
  K(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : Z(t) && (e.setupState = ci(t)), Bi(e, n)
}
let gr
function Bi(e, t, n) {
  const s = e.type
  if (!e.render) {
    if (!t && gr && !s.render) {
      const r = s.template || $s(e).template
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = s,
          u = oe(oe({ isCustomElement: i, delimiters: l }, o), c)
        s.render = gr(r, u)
      }
    }
    e.render = s.render || xe
  }
  {
    const r = Wt(e)
    ft()
    try {
      $l(e)
    } finally {
      dt(), r()
    }
  }
}
function fc(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return ye(e, 'get', '$attrs'), t[n]
      },
    }))
  )
}
function Ki(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return {
    get attrs() {
      return fc(e)
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  }
}
function Dn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(ci(Lt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in Mt) return Mt[n](e)
        },
        has(t, n) {
          return n in t || n in Mt
        },
      }))
    )
}
function dc(e, t = !0) {
  return K(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function hc(e) {
  return K(e) && '__vccOpts' in e
}
const se = (e, t) => Jo(e, t, Vn)
function ys(e, t, n) {
  const s = arguments.length
  return s === 2
    ? Z(t) && !k(t)
      ? bn(t)
        ? ue(e, null, [t])
        : ue(e, t)
      : ue(e, null, t)
    : (s > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : s === 3 && bn(n) && (n = [n]), ue(e, t, n))
}
const pc = '3.4.21'
/**
 * @vue/runtime-dom v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const gc = 'http://www.w3.org/2000/svg',
  mc = 'http://www.w3.org/1998/Math/MathML',
  ze = typeof document < 'u' ? document : null,
  mr = ze && ze.createElement('template'),
  yc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, s) => {
      const r =
        t === 'svg'
          ? ze.createElementNS(gc, e)
          : t === 'mathml'
          ? ze.createElementNS(mc, e)
          : ze.createElement(e, n ? { is: n } : void 0)
      return e === 'select' && s && s.multiple != null && r.setAttribute('multiple', s.multiple), r
    },
    createText: (e) => ze.createTextNode(e),
    createComment: (e) => ze.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => ze.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild
      if (r && (r === i || r.nextSibling))
        for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); );
      else {
        mr.innerHTML = s === 'svg' ? `<svg>${e}</svg>` : s === 'mathml' ? `<math>${e}</math>` : e
        const l = mr.content
        if (s === 'svg' || s === 'mathml') {
          const c = l.firstChild
          for (; c.firstChild; ) l.appendChild(c.firstChild)
          l.removeChild(c)
        }
        t.insertBefore(l, n)
      }
      return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    },
  },
  Be = 'transition',
  Rt = 'animation',
  Bt = Symbol('_vtc'),
  Wi = (e, { slots: t }) => ys(Cl, _c(e), t)
Wi.displayName = 'Transition'
const qi = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
}
Wi.props = oe({}, _i, qi)
const nt = (e, t = []) => {
    k(e) ? e.forEach((n) => n(...t)) : e && e(...t)
  },
  yr = (e) => (e ? (k(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1)
function _c(e) {
  const t = {}
  for (const S in e) S in qi || (t[S] = e[S])
  if (e.css === !1) return t
  const {
      name: n = 'v',
      type: s,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: c = i,
      appearActiveClass: u = o,
      appearToClass: d = l,
      leaveFromClass: h = `${n}-leave-from`,
      leaveActiveClass: m = `${n}-leave-active`,
      leaveToClass: w = `${n}-leave-to`,
    } = e,
    O = bc(r),
    M = O && O[0],
    V = O && O[1],
    {
      onBeforeEnter: q,
      onEnter: J,
      onEnterCancelled: g,
      onLeave: y,
      onLeaveCancelled: P,
      onBeforeAppear: I = q,
      onAppear: D = J,
      onAppearCancelled: R = g,
    } = t,
    H = (S, W, re) => {
      st(S, W ? d : l), st(S, W ? u : o), re && re()
    },
    E = (S, W) => {
      ;(S._isLeaving = !1), st(S, h), st(S, w), st(S, m), W && W()
    },
    U = (S) => (W, re) => {
      const ce = S ? D : J,
        $ = () => H(W, S, re)
      nt(ce, [W, $]),
        _r(() => {
          st(W, S ? c : i), Ke(W, S ? d : l), yr(ce) || br(W, s, M, $)
        })
    }
  return oe(t, {
    onBeforeEnter(S) {
      nt(q, [S]), Ke(S, i), Ke(S, o)
    },
    onBeforeAppear(S) {
      nt(I, [S]), Ke(S, c), Ke(S, u)
    },
    onEnter: U(!1),
    onAppear: U(!0),
    onLeave(S, W) {
      S._isLeaving = !0
      const re = () => E(S, W)
      Ke(S, h),
        Ec(),
        Ke(S, m),
        _r(() => {
          S._isLeaving && (st(S, h), Ke(S, w), yr(y) || br(S, s, V, re))
        }),
        nt(y, [S, re])
    },
    onEnterCancelled(S) {
      H(S, !1), nt(g, [S])
    },
    onAppearCancelled(S) {
      H(S, !0), nt(R, [S])
    },
    onLeaveCancelled(S) {
      E(S), nt(P, [S])
    },
  })
}
function bc(e) {
  if (e == null) return null
  if (Z(e)) return [Yn(e.enter), Yn(e.leave)]
  {
    const t = Yn(e)
    return [t, t]
  }
}
function Yn(e) {
  return vo(e)
}
function Ke(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Bt] || (e[Bt] = new Set())).add(t)
}
function st(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s))
  const n = e[Bt]
  n && (n.delete(t), n.size || (e[Bt] = void 0))
}
function _r(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e)
  })
}
let vc = 0
function br(e, t, n, s) {
  const r = (e._endId = ++vc),
    i = () => {
      r === e._endId && s()
    }
  if (n) return setTimeout(i, n)
  const { type: o, timeout: l, propCount: c } = wc(e, t)
  if (!o) return s()
  const u = o + 'end'
  let d = 0
  const h = () => {
      e.removeEventListener(u, m), i()
    },
    m = (w) => {
      w.target === e && ++d >= c && h()
    }
  setTimeout(() => {
    d < c && h()
  }, l + 1),
    e.addEventListener(u, m)
}
function wc(e, t) {
  const n = window.getComputedStyle(e),
    s = (O) => (n[O] || '').split(', '),
    r = s(`${Be}Delay`),
    i = s(`${Be}Duration`),
    o = vr(r, i),
    l = s(`${Rt}Delay`),
    c = s(`${Rt}Duration`),
    u = vr(l, c)
  let d = null,
    h = 0,
    m = 0
  t === Be
    ? o > 0 && ((d = Be), (h = o), (m = i.length))
    : t === Rt
    ? u > 0 && ((d = Rt), (h = u), (m = c.length))
    : ((h = Math.max(o, u)), (d = h > 0 ? (o > u ? Be : Rt) : null), (m = d ? (d === Be ? i.length : c.length) : 0))
  const w = d === Be && /\b(transform|all)(,|$)/.test(s(`${Be}Property`).toString())
  return { type: d, timeout: h, propCount: m, hasTransform: w }
}
function vr(e, t) {
  for (; e.length < t.length; ) e = e.concat(e)
  return Math.max(...t.map((n, s) => wr(n) + wr(e[s])))
}
function wr(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3
}
function Ec() {
  return document.body.offsetHeight
}
function Cc(e, t, n) {
  const s = e[Bt]
  s && (t = (t ? [t, ...s] : [...s]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t)
}
const wn = Symbol('_vod'),
  Gi = Symbol('_vsh'),
  Za = {
    beforeMount(e, { value: t }, { transition: n }) {
      ;(e[wn] = e.style.display === 'none' ? '' : e.style.display), n && t ? n.beforeEnter(e) : Ot(e, t)
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e)
    },
    updated(e, { value: t, oldValue: n }, { transition: s }) {
      !t != !n &&
        (s
          ? t
            ? (s.beforeEnter(e), Ot(e, !0), s.enter(e))
            : s.leave(e, () => {
                Ot(e, !1)
              })
          : Ot(e, t))
    },
    beforeUnmount(e, { value: t }) {
      Ot(e, t)
    },
  }
function Ot(e, t) {
  ;(e.style.display = t ? e[wn] : 'none'), (e[Gi] = !t)
}
const xc = Symbol(''),
  Sc = /(^|;)\s*display\s*:/
function Tc(e, t, n) {
  const s = e.style,
    r = ne(n)
  let i = !1
  if (n && !r) {
    if (t)
      if (ne(t))
        for (const o of t.split(';')) {
          const l = o.slice(0, o.indexOf(':')).trim()
          n[l] == null && un(s, l, '')
        }
      else for (const o in t) n[o] == null && un(s, o, '')
    for (const o in n) o === 'display' && (i = !0), un(s, o, n[o])
  } else if (r) {
    if (t !== n) {
      const o = s[xc]
      o && (n += ';' + o), (s.cssText = n), (i = Sc.test(n))
    }
  } else t && e.removeAttribute('style')
  wn in e && ((e[wn] = i ? s.display : ''), e[Gi] && (s.display = 'none'))
}
const Er = /\s*!important$/
function un(e, t, n) {
  if (k(n)) n.forEach((s) => un(e, t, s))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const s = Ac(e, t)
    Er.test(n) ? e.setProperty(ut(s), n.replace(Er, ''), 'important') : (e[s] = n)
  }
}
const Cr = ['Webkit', 'Moz', 'ms'],
  Jn = {}
function Ac(e, t) {
  const n = Jn[t]
  if (n) return n
  let s = Me(t)
  if (s !== 'filter' && s in e) return (Jn[t] = s)
  s = Sn(s)
  for (let r = 0; r < Cr.length; r++) {
    const i = Cr[r] + s
    if (i in e) return (Jn[t] = i)
  }
  return t
}
const xr = 'http://www.w3.org/1999/xlink'
function Rc(e, t, n, s, r) {
  if (s && t.startsWith('xlink:'))
    n == null ? e.removeAttributeNS(xr, t.slice(6, t.length)) : e.setAttributeNS(xr, t, n)
  else {
    const i = To(t)
    n == null || (i && !Br(n)) ? e.removeAttribute(t) : e.setAttribute(t, i ? '' : n)
  }
}
function Oc(e, t, n, s, r, i, o) {
  if (t === 'innerHTML' || t === 'textContent') {
    s && o(s, r, i), (e[t] = n ?? '')
    return
  }
  const l = e.tagName
  if (t === 'value' && l !== 'PROGRESS' && !l.includes('-')) {
    const u = l === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      d = n ?? ''
    ;(u !== d || !('_value' in e)) && (e.value = d), n == null && e.removeAttribute(t), (e._value = n)
    return
  }
  let c = !1
  if (n === '' || n == null) {
    const u = typeof e[t]
    u === 'boolean'
      ? (n = Br(n))
      : n == null && u === 'string'
      ? ((n = ''), (c = !0))
      : u === 'number' && ((n = 0), (c = !0))
  }
  try {
    e[t] = n
  } catch {}
  c && e.removeAttribute(t)
}
function Ic(e, t, n, s) {
  e.addEventListener(t, n, s)
}
function Lc(e, t, n, s) {
  e.removeEventListener(t, n, s)
}
const Sr = Symbol('_vei')
function Pc(e, t, n, s, r = null) {
  const i = e[Sr] || (e[Sr] = {}),
    o = i[t]
  if (s && o) o.value = s
  else {
    const [l, c] = Mc(t)
    if (s) {
      const u = (i[t] = $c(s, r))
      Ic(e, l, u, c)
    } else o && (Lc(e, l, o, c), (i[t] = void 0))
  }
}
const Tr = /(?:Once|Passive|Capture)$/
function Mc(e) {
  let t
  if (Tr.test(e)) {
    t = {}
    let s
    for (; (s = e.match(Tr)); ) (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : ut(e.slice(2)), t]
}
let Qn = 0
const Nc = Promise.resolve(),
  Fc = () => Qn || (Nc.then(() => (Qn = 0)), (Qn = Date.now()))
function $c(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now()
    else if (s._vts <= n.attached) return
    Se(Hc(s, n.value), t, 5, [s])
  }
  return (n.value = e), (n.attached = Fc()), n
}
function Hc(e, t) {
  if (k(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    )
  } else return t
}
const Ar = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
  jc = (e, t, n, s, r, i, o, l, c) => {
    const u = r === 'svg'
    t === 'class'
      ? Cc(e, s, u)
      : t === 'style'
      ? Tc(e, n, s)
      : Kt(t)
      ? vs(t) || Pc(e, t, n, s, o)
      : (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : Vc(e, t, s, u))
      ? Oc(e, t, s, i, o, l, c)
      : (t === 'true-value' ? (e._trueValue = s) : t === 'false-value' && (e._falseValue = s), Rc(e, t, s, u))
  }
function Vc(e, t, n, s) {
  if (s) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && Ar(t) && K(n)))
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1
  if (t === 'width' || t === 'height') {
    const r = e.tagName
    if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE') return !1
  }
  return Ar(t) && ne(n) ? !1 : t in e
}
const Dc = ['ctrl', 'shift', 'alt', 'meta'],
  Uc = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => Dc.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  eu = (e, t) => {
    const n = e._withMods || (e._withMods = {}),
      s = t.join('.')
    return (
      n[s] ||
      (n[s] = (r, ...i) => {
        for (let o = 0; o < t.length; o++) {
          const l = Uc[t[o]]
          if (l && l(r, t)) return
        }
        return e(r, ...i)
      })
    )
  },
  kc = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace',
  },
  tu = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      s = t.join('.')
    return (
      n[s] ||
      (n[s] = (r) => {
        if (!('key' in r)) return
        const i = ut(r.key)
        if (t.some((o) => o === i || kc[o] === i)) return e(r)
      })
    )
  },
  zi = oe({ patchProp: jc }, yc)
let Ht,
  Rr = !1
function Bc() {
  return Ht || (Ht = Ql(zi))
}
function Kc() {
  return (Ht = Rr ? Ht : Zl(zi)), (Rr = !0), Ht
}
const nu = (...e) => {
    const t = Bc().createApp(...e),
      { mount: n } = t
    return (
      (t.mount = (s) => {
        const r = Yi(s)
        if (!r) return
        const i = t._component
        !K(i) && !i.render && !i.template && (i.template = r.innerHTML), (r.innerHTML = '')
        const o = n(r, !1, Xi(r))
        return r instanceof Element && (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')), o
      }),
      t
    )
  },
  su = (...e) => {
    const t = Kc().createApp(...e),
      { mount: n } = t
    return (
      (t.mount = (s) => {
        const r = Yi(s)
        if (r) return n(r, !0, Xi(r))
      }),
      t
    )
  }
function Xi(e) {
  if (e instanceof SVGElement) return 'svg'
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml'
}
function Yi(e) {
  return ne(e) ? document.querySelector(e) : e
}
const ru = (e, t) => {
    const n = e.__vccOpts || e
    for (const [s, r] of t) n[s] = r
    return n
  },
  Wc = 'modulepreload',
  qc = function (e) {
    return '/' + e
  },
  Or = {},
  iu = function (t, n, s) {
    let r = Promise.resolve()
    if (n && n.length > 0) {
      const i = document.getElementsByTagName('link')
      r = Promise.all(
        n.map((o) => {
          if (((o = qc(o)), o in Or)) return
          Or[o] = !0
          const l = o.endsWith('.css'),
            c = l ? '[rel="stylesheet"]' : ''
          if (!!s)
            for (let h = i.length - 1; h >= 0; h--) {
              const m = i[h]
              if (m.href === o && (!l || m.rel === 'stylesheet')) return
            }
          else if (document.querySelector(`link[href="${o}"]${c}`)) return
          const d = document.createElement('link')
          if (
            ((d.rel = l ? 'stylesheet' : Wc),
            l || ((d.as = 'script'), (d.crossOrigin = '')),
            (d.href = o),
            document.head.appendChild(d),
            l)
          )
            return new Promise((h, m) => {
              d.addEventListener('load', h),
                d.addEventListener('error', () => m(new Error(`Unable to preload CSS for ${o}`)))
            })
        }),
      )
    }
    return r
      .then(() => t())
      .catch((i) => {
        const o = new Event('vite:preloadError', { cancelable: !0 })
        if (((o.payload = i), window.dispatchEvent(o), !o.defaultPrevented)) throw i
      })
  },
  Gc = window.__VP_SITE_DATA__
function Vs(e) {
  return Wr() ? (Oo(e), !0) : !1
}
function Je(e) {
  return typeof e == 'function' ? e() : li(e)
}
const Ji = typeof window < 'u' && typeof document < 'u'
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope
const zc = Object.prototype.toString,
  Xc = (e) => zc.call(e) === '[object Object]',
  jt = () => {},
  _s = Yc()
function Yc() {
  var e, t
  return (
    Ji &&
    ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) &&
    (/iP(ad|hone|od)/.test(window.navigator.userAgent) ||
      (((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 &&
        /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent)))
  )
}
function Jc(e, t) {
  function n(...s) {
    return new Promise((r, i) => {
      Promise.resolve(e(() => t.apply(this, s), { fn: t, thisArg: this, args: s }))
        .then(r)
        .catch(i)
    })
  }
  return n
}
const Qi = (e) => e()
function Qc(e = Qi) {
  const t = de(!0)
  function n() {
    t.value = !1
  }
  function s() {
    t.value = !0
  }
  const r = (...i) => {
    t.value && e(...i)
  }
  return { isActive: Rn(t), pause: n, resume: s, eventFilter: r }
}
function Zc(e) {
  return e || jn()
}
function Zi(...e) {
  if (e.length !== 1) return rl(...e)
  const t = e[0]
  return typeof t == 'function' ? Rn(tl(() => ({ get: t, set: jt }))) : de(t)
}
function ea(e, t, n = {}) {
  const { eventFilter: s = Qi, ...r } = n
  return je(e, Jc(s, t), r)
}
function ta(e, t, n = {}) {
  const { eventFilter: s, ...r } = n,
    { eventFilter: i, pause: o, resume: l, isActive: c } = Qc(s)
  return { stop: ea(e, t, { ...r, eventFilter: i }), pause: o, resume: l, isActive: c }
}
function Ds(e, t = !0, n) {
  Zc() ? Tt(e, n) : t ? e() : In(e)
}
function gt(e) {
  var t
  const n = Je(e)
  return (t = n == null ? void 0 : n.$el) != null ? t : n
}
const Ne = Ji ? window : void 0
function Ve(...e) {
  let t, n, s, r
  if ((typeof e[0] == 'string' || Array.isArray(e[0]) ? (([n, s, r] = e), (t = Ne)) : ([t, n, s, r] = e), !t)) return jt
  Array.isArray(n) || (n = [n]), Array.isArray(s) || (s = [s])
  const i = [],
    o = () => {
      i.forEach((d) => d()), (i.length = 0)
    },
    l = (d, h, m, w) => (d.addEventListener(h, m, w), () => d.removeEventListener(h, m, w)),
    c = je(
      () => [gt(t), Je(r)],
      ([d, h]) => {
        if ((o(), !d)) return
        const m = Xc(h) ? { ...h } : h
        i.push(...n.flatMap((w) => s.map((O) => l(d, w, O, m))))
      },
      { immediate: !0, flush: 'post' },
    ),
    u = () => {
      c(), o()
    }
  return Vs(u), u
}
let Ir = !1
function ou(e, t, n = {}) {
  const { window: s = Ne, ignore: r = [], capture: i = !0, detectIframe: o = !1 } = n
  if (!s) return jt
  _s &&
    !Ir &&
    ((Ir = !0),
    Array.from(s.document.body.children).forEach((m) => m.addEventListener('click', jt)),
    s.document.documentElement.addEventListener('click', jt))
  let l = !0
  const c = (m) =>
      r.some((w) => {
        if (typeof w == 'string')
          return Array.from(s.document.querySelectorAll(w)).some((O) => O === m.target || m.composedPath().includes(O))
        {
          const O = gt(w)
          return O && (m.target === O || m.composedPath().includes(O))
        }
      }),
    d = [
      Ve(
        s,
        'click',
        (m) => {
          const w = gt(e)
          if (!(!w || w === m.target || m.composedPath().includes(w))) {
            if ((m.detail === 0 && (l = !c(m)), !l)) {
              l = !0
              return
            }
            t(m)
          }
        },
        { passive: !0, capture: i },
      ),
      Ve(
        s,
        'pointerdown',
        (m) => {
          const w = gt(e)
          l = !c(m) && !!(w && !m.composedPath().includes(w))
        },
        { passive: !0 },
      ),
      o &&
        Ve(s, 'blur', (m) => {
          setTimeout(() => {
            var w
            const O = gt(e)
            ;((w = s.document.activeElement) == null ? void 0 : w.tagName) === 'IFRAME' &&
              !(O != null && O.contains(s.document.activeElement)) &&
              t(m)
          }, 0)
        }),
    ].filter(Boolean)
  return () => d.forEach((m) => m())
}
function na(e) {
  return typeof e == 'function'
    ? e
    : typeof e == 'string'
    ? (t) => t.key === e
    : Array.isArray(e)
    ? (t) => e.includes(t.key)
    : () => !0
}
function lu(...e) {
  let t,
    n,
    s = {}
  e.length === 3
    ? ((t = e[0]), (n = e[1]), (s = e[2]))
    : e.length === 2
    ? typeof e[1] == 'object'
      ? ((t = !0), (n = e[0]), (s = e[1]))
      : ((t = e[0]), (n = e[1]))
    : ((t = !0), (n = e[0]))
  const { target: r = Ne, eventName: i = 'keydown', passive: o = !1, dedupe: l = !1 } = s,
    c = na(t)
  return Ve(
    r,
    i,
    (d) => {
      ;(d.repeat && Je(l)) || (c(d) && n(d))
    },
    o,
  )
}
function sa() {
  const e = de(!1),
    t = jn()
  return (
    t &&
      Tt(() => {
        e.value = !0
      }, t),
    e
  )
}
function ra(e) {
  const t = sa()
  return se(() => (t.value, !!e()))
}
function eo(e, t = {}) {
  const { window: n = Ne } = t,
    s = ra(() => n && 'matchMedia' in n && typeof n.matchMedia == 'function')
  let r
  const i = de(!1),
    o = (u) => {
      i.value = u.matches
    },
    l = () => {
      r && ('removeEventListener' in r ? r.removeEventListener('change', o) : r.removeListener(o))
    },
    c = mi(() => {
      s.value &&
        (l(),
        (r = n.matchMedia(Je(e))),
        'addEventListener' in r ? r.addEventListener('change', o) : r.addListener(o),
        (i.value = r.matches))
    })
  return (
    Vs(() => {
      c(), l(), (r = void 0)
    }),
    i
  )
}
const sn =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {},
  rn = '__vueuse_ssr_handlers__',
  ia = oa()
function oa() {
  return rn in sn || (sn[rn] = sn[rn] || {}), sn[rn]
}
function to(e, t) {
  return ia[e] || t
}
function la(e) {
  return e == null
    ? 'any'
    : e instanceof Set
    ? 'set'
    : e instanceof Map
    ? 'map'
    : e instanceof Date
    ? 'date'
    : typeof e == 'boolean'
    ? 'boolean'
    : typeof e == 'string'
    ? 'string'
    : typeof e == 'object'
    ? 'object'
    : Number.isNaN(e)
    ? 'any'
    : 'number'
}
const ca = {
    boolean: { read: (e) => e === 'true', write: (e) => String(e) },
    object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) },
    number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) },
    any: { read: (e) => e, write: (e) => String(e) },
    string: { read: (e) => e, write: (e) => String(e) },
    map: { read: (e) => new Map(JSON.parse(e)), write: (e) => JSON.stringify(Array.from(e.entries())) },
    set: { read: (e) => new Set(JSON.parse(e)), write: (e) => JSON.stringify(Array.from(e)) },
    date: { read: (e) => new Date(e), write: (e) => e.toISOString() },
  },
  Lr = 'vueuse-storage'
function aa(e, t, n, s = {}) {
  var r
  const {
      flush: i = 'pre',
      deep: o = !0,
      listenToStorageChanges: l = !0,
      writeDefaults: c = !0,
      mergeDefaults: u = !1,
      shallow: d,
      window: h = Ne,
      eventFilter: m,
      onError: w = (E) => {
        console.error(E)
      },
      initOnMounted: O,
    } = s,
    M = (d ? ii : de)(typeof t == 'function' ? t() : t)
  if (!n)
    try {
      n = to('getDefaultStorage', () => {
        var E
        return (E = Ne) == null ? void 0 : E.localStorage
      })()
    } catch (E) {
      w(E)
    }
  if (!n) return M
  const V = Je(t),
    q = la(V),
    J = (r = s.serializer) != null ? r : ca[q],
    { pause: g, resume: y } = ta(M, () => I(M.value), { flush: i, deep: o, eventFilter: m })
  h &&
    l &&
    Ds(() => {
      Ve(h, 'storage', R), Ve(h, Lr, H), O && R()
    }),
    O || R()
  function P(E, U) {
    h && h.dispatchEvent(new CustomEvent(Lr, { detail: { key: e, oldValue: E, newValue: U, storageArea: n } }))
  }
  function I(E) {
    try {
      const U = n.getItem(e)
      if (E == null) P(U, null), n.removeItem(e)
      else {
        const S = J.write(E)
        U !== S && (n.setItem(e, S), P(U, S))
      }
    } catch (U) {
      w(U)
    }
  }
  function D(E) {
    const U = E ? E.newValue : n.getItem(e)
    if (U == null) return c && V != null && n.setItem(e, J.write(V)), V
    if (!E && u) {
      const S = J.read(U)
      return typeof u == 'function' ? u(S, V) : q === 'object' && !Array.isArray(S) ? { ...V, ...S } : S
    } else return typeof U != 'string' ? U : J.read(U)
  }
  function R(E) {
    if (!(E && E.storageArea !== n)) {
      if (E && E.key == null) {
        M.value = V
        return
      }
      if (!(E && E.key !== e)) {
        g()
        try {
          ;(E == null ? void 0 : E.newValue) !== J.write(M.value) && (M.value = D(E))
        } catch (U) {
          w(U)
        } finally {
          E ? In(y) : y()
        }
      }
    }
  }
  function H(E) {
    R(E.detail)
  }
  return M
}
function no(e) {
  return eo('(prefers-color-scheme: dark)', e)
}
function ua(e = {}) {
  const {
      selector: t = 'html',
      attribute: n = 'class',
      initialValue: s = 'auto',
      window: r = Ne,
      storage: i,
      storageKey: o = 'vueuse-color-scheme',
      listenToStorageChanges: l = !0,
      storageRef: c,
      emitAuto: u,
      disableTransition: d = !0,
    } = e,
    h = { auto: '', light: 'light', dark: 'dark', ...(e.modes || {}) },
    m = no({ window: r }),
    w = se(() => (m.value ? 'dark' : 'light')),
    O = c || (o == null ? Zi(s) : aa(o, s, i, { window: r, listenToStorageChanges: l })),
    M = se(() => (O.value === 'auto' ? w.value : O.value)),
    V = to('updateHTMLAttrs', (y, P, I) => {
      const D = typeof y == 'string' ? (r == null ? void 0 : r.document.querySelector(y)) : gt(y)
      if (!D) return
      let R
      if (d) {
        R = r.document.createElement('style')
        const H =
          '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
        R.appendChild(document.createTextNode(H)), r.document.head.appendChild(R)
      }
      if (P === 'class') {
        const H = I.split(/\s/g)
        Object.values(h)
          .flatMap((E) => (E || '').split(/\s/g))
          .filter(Boolean)
          .forEach((E) => {
            H.includes(E) ? D.classList.add(E) : D.classList.remove(E)
          })
      } else D.setAttribute(P, I)
      d && (r.getComputedStyle(R).opacity, document.head.removeChild(R))
    })
  function q(y) {
    var P
    V(t, n, (P = h[y]) != null ? P : y)
  }
  function J(y) {
    e.onChanged ? e.onChanged(y, q) : q(y)
  }
  je(M, J, { flush: 'post', immediate: !0 }), Ds(() => J(M.value))
  const g = se({
    get() {
      return u ? O.value : M.value
    },
    set(y) {
      O.value = y
    },
  })
  try {
    return Object.assign(g, { store: O, system: w, state: M })
  } catch {
    return g
  }
}
function fa(e = {}) {
  const { valueDark: t = 'dark', valueLight: n = '', window: s = Ne } = e,
    r = ua({
      ...e,
      onChanged: (l, c) => {
        var u
        e.onChanged ? (u = e.onChanged) == null || u.call(e, l === 'dark', c, l) : c(l)
      },
      modes: { dark: t, light: n },
    }),
    i = se(() => (r.system ? r.system.value : no({ window: s }).value ? 'dark' : 'light'))
  return se({
    get() {
      return r.value === 'dark'
    },
    set(l) {
      const c = l ? 'dark' : 'light'
      i.value === c ? (r.value = 'auto') : (r.value = c)
    },
  })
}
function Zn(e) {
  return typeof Window < 'u' && e instanceof Window
    ? e.document.documentElement
    : typeof Document < 'u' && e instanceof Document
    ? e.documentElement
    : e
}
function so(e) {
  const t = window.getComputedStyle(e)
  if (
    t.overflowX === 'scroll' ||
    t.overflowY === 'scroll' ||
    (t.overflowX === 'auto' && e.clientWidth < e.scrollWidth) ||
    (t.overflowY === 'auto' && e.clientHeight < e.scrollHeight)
  )
    return !0
  {
    const n = e.parentNode
    return !n || n.tagName === 'BODY' ? !1 : so(n)
  }
}
function da(e) {
  const t = e || window.event,
    n = t.target
  return so(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1)
}
const on = new WeakMap()
function cu(e, t = !1) {
  const n = de(t)
  let s = null
  je(
    Zi(e),
    (o) => {
      const l = Zn(Je(o))
      if (l) {
        const c = l
        on.get(c) || on.set(c, c.style.overflow), n.value && (c.style.overflow = 'hidden')
      }
    },
    { immediate: !0 },
  )
  const r = () => {
      const o = Zn(Je(e))
      !o ||
        n.value ||
        (_s &&
          (s = Ve(
            o,
            'touchmove',
            (l) => {
              da(l)
            },
            { passive: !1 },
          )),
        (o.style.overflow = 'hidden'),
        (n.value = !0))
    },
    i = () => {
      var o
      const l = Zn(Je(e))
      !l ||
        !n.value ||
        (_s && (s == null || s()), (l.style.overflow = (o = on.get(l)) != null ? o : ''), on.delete(l), (n.value = !1))
    }
  return (
    Vs(i),
    se({
      get() {
        return n.value
      },
      set(o) {
        o ? r() : i()
      },
    })
  )
}
function au(e = {}) {
  const { window: t = Ne, behavior: n = 'auto' } = e
  if (!t) return { x: de(0), y: de(0) }
  const s = de(t.scrollX),
    r = de(t.scrollY),
    i = se({
      get() {
        return s.value
      },
      set(l) {
        scrollTo({ left: l, behavior: n })
      },
    }),
    o = se({
      get() {
        return r.value
      },
      set(l) {
        scrollTo({ top: l, behavior: n })
      },
    })
  return (
    Ve(
      t,
      'scroll',
      () => {
        ;(s.value = t.scrollX), (r.value = t.scrollY)
      },
      { capture: !1, passive: !0 },
    ),
    { x: i, y: o }
  )
}
function uu(e = {}) {
  const {
      window: t = Ne,
      initialWidth: n = Number.POSITIVE_INFINITY,
      initialHeight: s = Number.POSITIVE_INFINITY,
      listenOrientation: r = !0,
      includeScrollbar: i = !0,
    } = e,
    o = de(n),
    l = de(s),
    c = () => {
      t &&
        (i
          ? ((o.value = t.innerWidth), (l.value = t.innerHeight))
          : ((o.value = t.document.documentElement.clientWidth), (l.value = t.document.documentElement.clientHeight)))
    }
  if ((c(), Ds(c), Ve('resize', c, { passive: !0 }), r)) {
    const u = eo('(orientation: portrait)')
    je(u, () => c())
  }
  return { width: o, height: l }
}
var es = { BASE_URL: '/', MODE: 'production', DEV: !1, PROD: !0, SSR: !1 },
  ts = {}
const ro = /^(?:[a-z]+:|\/\/)/i,
  ha = 'vitepress-theme-appearance',
  pa = /#.*$/,
  ga = /[?#].*$/,
  ma = /(?:(^|\/)index)?\.(?:md|html)$/,
  Ce = typeof document < 'u',
  io = {
    relativePath: '',
    filePath: '',
    title: '404',
    description: 'Not Found',
    headers: [],
    frontmatter: { sidebar: !1, layout: 'page' },
    lastUpdated: 0,
    isNotFound: !0,
  }
function ya(e, t, n = !1) {
  if (t === void 0) return !1
  if (((e = Pr(`/${e}`)), n)) return new RegExp(t).test(e)
  if (Pr(t) !== e) return !1
  const s = t.match(pa)
  return s ? (Ce ? location.hash : '') === s[0] : !0
}
function Pr(e) {
  return decodeURI(e).replace(ga, '').replace(ma, '$1')
}
function _a(e) {
  return ro.test(e)
}
function ba(e, t) {
  var s, r, i, o, l, c, u
  const n = Object.keys(e.locales).find((d) => d !== 'root' && !_a(d) && ya(t, `/${d}/`, !0)) || 'root'
  return Object.assign({}, e, {
    localeIndex: n,
    lang: ((s = e.locales[n]) == null ? void 0 : s.lang) ?? e.lang,
    dir: ((r = e.locales[n]) == null ? void 0 : r.dir) ?? e.dir,
    title: ((i = e.locales[n]) == null ? void 0 : i.title) ?? e.title,
    titleTemplate: ((o = e.locales[n]) == null ? void 0 : o.titleTemplate) ?? e.titleTemplate,
    description: ((l = e.locales[n]) == null ? void 0 : l.description) ?? e.description,
    head: lo(e.head, ((c = e.locales[n]) == null ? void 0 : c.head) ?? []),
    themeConfig: { ...e.themeConfig, ...((u = e.locales[n]) == null ? void 0 : u.themeConfig) },
  })
}
function oo(e, t) {
  const n = t.title || e.title,
    s = t.titleTemplate ?? e.titleTemplate
  if (typeof s == 'string' && s.includes(':title')) return s.replace(/:title/g, n)
  const r = va(e.title, s)
  return n === r.slice(3) ? n : `${n}${r}`
}
function va(e, t) {
  return t === !1 ? '' : t === !0 || t === void 0 ? ` | ${e}` : e === t ? '' : ` | ${t}`
}
function wa(e, t) {
  const [n, s] = t
  if (n !== 'meta') return !1
  const r = Object.entries(s)[0]
  return r == null ? !1 : e.some(([i, o]) => i === n && o[r[0]] === r[1])
}
function lo(e, t) {
  return [...e.filter((n) => !wa(t, n)), ...t]
}
const Ea = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
  Ca = /^[a-z]:/i
function Mr(e) {
  const t = Ca.exec(e),
    n = t ? t[0] : ''
  return (
    n +
    e
      .slice(n.length)
      .replace(Ea, '_')
      .replace(/(^|\/)_+(?=[^/]*$)/, '$1')
  )
}
const ns = new Set()
function xa(e) {
  if (ns.size === 0) {
    const n =
      (typeof process == 'object' && (ts == null ? void 0 : ts.VITE_EXTRA_EXTENSIONS)) ||
      (es == null ? void 0 : es.VITE_EXTRA_EXTENSIONS) ||
      ''
    ;(
      '3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,yaml,yml,zip' +
      (n && typeof n == 'string' ? ',' + n : '')
    )
      .split(',')
      .forEach((s) => ns.add(s))
  }
  const t = e.split('.').pop()
  return t == null || !ns.has(t.toLowerCase())
}
const Sa = Symbol(),
  at = ii(Gc)
function fu(e) {
  const t = se(() => ba(at.value, e.data.relativePath)),
    n = t.value.appearance,
    s =
      n === 'force-dark'
        ? de(!0)
        : n
        ? fa({
            storageKey: ha,
            initialValue: () => (typeof n == 'string' ? n : 'auto'),
            ...(typeof n == 'object' ? n : {}),
          })
        : de(!1)
  return {
    site: t,
    theme: se(() => t.value.themeConfig),
    page: se(() => e.data),
    frontmatter: se(() => e.data.frontmatter),
    params: se(() => e.data.params),
    lang: se(() => t.value.lang),
    dir: se(() => e.data.frontmatter.dir || t.value.dir),
    localeIndex: se(() => t.value.localeIndex || 'root'),
    title: se(() => oo(t.value, e.data)),
    description: se(() => e.data.description || t.value.description),
    isDark: s,
  }
}
function Ta() {
  const e = Et(Sa)
  if (!e) throw new Error('vitepress data not properly injected in app')
  return e
}
function Aa(e, t) {
  return `${e}${t}`.replace(/\/+/g, '/')
}
function Nr(e) {
  return ro.test(e) || !e.startsWith('/') ? e : Aa(at.value.base, e)
}
function Ra(e) {
  let t = e.replace(/\.html$/, '')
  if (((t = decodeURIComponent(t)), (t = t.replace(/\/$/, '/index')), Ce)) {
    const n = '/'
    t = Mr(t.slice(n.length).replace(/\//g, '_') || 'index') + '.md'
    let s = __VP_HASH_MAP__[t.toLowerCase()]
    if (
      (s ||
        ((t = t.endsWith('_index.md') ? t.slice(0, -9) + '.md' : t.slice(0, -3) + '_index.md'),
        (s = __VP_HASH_MAP__[t.toLowerCase()])),
      !s)
    )
      return null
    t = `${n}assets/${t}.${s}.js`
  } else t = `./${Mr(t.slice(1).replace(/\//g, '_'))}.md.js`
  return t
}
let fn = []
function du(e) {
  fn.push(e),
    $n(() => {
      fn = fn.filter((t) => t !== e)
    })
}
function Oa() {
  let e = at.value.scrollOffset,
    t = 0,
    n = 24
  if ((typeof e == 'object' && 'padding' in e && ((n = e.padding), (e = e.selector)), typeof e == 'number')) t = e
  else if (typeof e == 'string') t = Fr(e, n)
  else if (Array.isArray(e))
    for (const s of e) {
      const r = Fr(s, n)
      if (r) {
        t = r
        break
      }
    }
  return t
}
function Fr(e, t) {
  const n = document.querySelector(e)
  if (!n) return 0
  const s = n.getBoundingClientRect().bottom
  return s < 0 ? 0 : s + t
}
const Ia = Symbol(),
  co = 'http://a.com',
  La = () => ({ path: '/', component: null, data: io })
function hu(e, t) {
  const n = An(La()),
    s = { route: n, go: r }
  async function r(l = Ce ? location.href : '/') {
    var c, u
    ;(l = En(l)),
      (await ((c = s.onBeforeRouteChange) == null ? void 0 : c.call(s, l))) !== !1 &&
        (Hr(l), await o(l), await ((u = s.onAfterRouteChanged) == null ? void 0 : u.call(s, l)))
  }
  let i = null
  async function o(l, c = 0, u = !1) {
    var m
    if ((await ((m = s.onBeforePageLoad) == null ? void 0 : m.call(s, l))) === !1) return
    const d = new URL(l, co),
      h = (i = d.pathname)
    try {
      let w = await e(h)
      if (!w) throw new Error(`Page not found: ${h}`)
      if (i === h) {
        i = null
        const { default: O, __pageData: M } = w
        if (!O) throw new Error(`Invalid route component: ${O}`)
        ;(n.path = Ce ? h : Nr(h)),
          (n.component = Lt(O)),
          (n.data = Lt(M)),
          Ce &&
            In(() => {
              let V = at.value.base + M.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1')
              if (
                (!at.value.cleanUrls && !V.endsWith('/') && (V += '.html'),
                V !== d.pathname && ((d.pathname = V), (l = V + d.search + d.hash), history.replaceState(null, '', l)),
                d.hash && !c)
              ) {
                let q = null
                try {
                  q = document.getElementById(decodeURIComponent(d.hash).slice(1))
                } catch (J) {
                  console.warn(J)
                }
                if (q) {
                  $r(q, d.hash)
                  return
                }
              }
              window.scrollTo(0, c)
            })
      }
    } catch (w) {
      if ((!/fetch|Page not found/.test(w.message) && !/^\/404(\.html|\/)?$/.test(l) && console.error(w), !u))
        try {
          const O = await fetch(at.value.base + 'hashmap.json')
          ;(window.__VP_HASH_MAP__ = await O.json()), await o(l, c, !0)
          return
        } catch {}
      i === h && ((i = null), (n.path = Ce ? h : Nr(h)), (n.component = t ? Lt(t) : null), (n.data = io))
    }
  }
  return (
    Ce &&
      (window.addEventListener(
        'click',
        (l) => {
          if (l.target.closest('button')) return
          const u = l.target.closest('a')
          if (u && !u.closest('.vp-raw') && (u instanceof SVGElement || !u.download)) {
            const { target: d } = u,
              {
                href: h,
                origin: m,
                pathname: w,
                hash: O,
                search: M,
              } = new URL(u.href instanceof SVGAnimatedString ? u.href.animVal : u.href, u.baseURI),
              V = window.location
            !l.ctrlKey &&
              !l.shiftKey &&
              !l.altKey &&
              !l.metaKey &&
              !d &&
              m === V.origin &&
              xa(w) &&
              (l.preventDefault(),
              w === V.pathname && M === V.search
                ? (O !== V.hash && (history.pushState(null, '', O), window.dispatchEvent(new Event('hashchange'))),
                  O ? $r(u, O, u.classList.contains('header-anchor')) : (Hr(h), window.scrollTo(0, 0)))
                : r(h))
          }
        },
        { capture: !0 },
      ),
      window.addEventListener('popstate', async (l) => {
        var c
        await o(En(location.href), (l.state && l.state.scrollPosition) || 0),
          (c = s.onAfterRouteChanged) == null || c.call(s, location.href)
      }),
      window.addEventListener('hashchange', (l) => {
        l.preventDefault()
      })),
    s
  )
}
function Pa() {
  const e = Et(Ia)
  if (!e) throw new Error('useRouter() is called without provider.')
  return e
}
function ao() {
  return Pa().route
}
function $r(e, t, n = !1) {
  let s = null
  try {
    s = e.classList.contains('header-anchor') ? e : document.getElementById(decodeURIComponent(t).slice(1))
  } catch (r) {
    console.warn(r)
  }
  if (s) {
    let r = function () {
      !n || Math.abs(o - window.scrollY) > window.innerHeight
        ? window.scrollTo(0, o)
        : window.scrollTo({ left: 0, top: o, behavior: 'smooth' })
    }
    const i = parseInt(window.getComputedStyle(s).paddingTop, 10),
      o = window.scrollY + s.getBoundingClientRect().top - Oa() + i
    requestAnimationFrame(r)
  }
}
function Hr(e) {
  Ce &&
    En(e) !== En(location.href) &&
    (history.replaceState({ scrollPosition: window.scrollY }, document.title), history.pushState(null, '', e))
}
function En(e) {
  const t = new URL(e, co)
  return (
    (t.pathname = t.pathname.replace(/(^|\/)index(\.html)?$/, '$1')),
    at.value.cleanUrls
      ? (t.pathname = t.pathname.replace(/\.html$/, ''))
      : !t.pathname.endsWith('/') && !t.pathname.endsWith('.html') && (t.pathname += '.html'),
    t.pathname + t.search + t.hash
  )
}
const ss = () => fn.forEach((e) => e()),
  pu = wi({
    name: 'VitePressContent',
    props: { as: { type: [Object, String], default: 'div' } },
    setup(e) {
      const t = ao(),
        { site: n } = Ta()
      return () =>
        ys(e.as, n.value.contentProps ?? { style: { position: 'relative' } }, [
          t.component
            ? ys(t.component, { onVnodeMounted: ss, onVnodeUpdated: ss, onVnodeUnmounted: ss })
            : '404 Page Not Found',
        ])
    },
  }),
  gu = wi({
    setup(e, { slots: t }) {
      const n = de(!1)
      return (
        Tt(() => {
          n.value = !0
        }),
        () => (n.value && t.default ? t.default() : null)
      )
    },
  })
function mu() {
  Ce &&
    window.addEventListener('click', (e) => {
      var n
      const t = e.target
      if (t.matches('.vp-code-group input')) {
        const s = (n = t.parentElement) == null ? void 0 : n.parentElement
        if (!s) return
        const r = Array.from(s.querySelectorAll('input')).indexOf(t)
        if (r < 0) return
        const i = s.querySelector('.blocks')
        if (!i) return
        const o = Array.from(i.children).find((u) => u.classList.contains('active'))
        if (!o) return
        const l = i.children[r]
        if (!l || o === l) return
        o.classList.remove('active'), l.classList.add('active')
        const c = s == null ? void 0 : s.querySelector(`label[for="${t.id}"]`)
        c == null || c.scrollIntoView({ block: 'nearest' })
      }
    })
}
function yu() {
  if (Ce) {
    const e = new WeakMap()
    window.addEventListener('click', (t) => {
      var s
      const n = t.target
      if (n.matches('div[class*="language-"] > button.copy')) {
        const r = n.parentElement,
          i = (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling
        if (!r || !i) return
        const o = /language-(shellscript|shell|bash|sh|zsh)/.test(r.className),
          l = ['.vp-copy-ignore', '.diff.remove'],
          c = i.cloneNode(!0)
        c.querySelectorAll(l.join(',')).forEach((d) => d.remove())
        let u = c.textContent || ''
        o && (u = u.replace(/^ *(\$|>) /gm, '').trim()),
          Ma(u).then(() => {
            n.classList.add('copied'), clearTimeout(e.get(n))
            const d = setTimeout(() => {
              n.classList.remove('copied'), n.blur(), e.delete(n)
            }, 2e3)
            e.set(n, d)
          })
      }
    })
  }
}
async function Ma(e) {
  try {
    return navigator.clipboard.writeText(e)
  } catch {
    const t = document.createElement('textarea'),
      n = document.activeElement
    ;(t.value = e),
      t.setAttribute('readonly', ''),
      (t.style.contain = 'strict'),
      (t.style.position = 'absolute'),
      (t.style.left = '-9999px'),
      (t.style.fontSize = '12pt')
    const s = document.getSelection(),
      r = s ? s.rangeCount > 0 && s.getRangeAt(0) : null
    document.body.appendChild(t),
      t.select(),
      (t.selectionStart = 0),
      (t.selectionEnd = e.length),
      document.execCommand('copy'),
      document.body.removeChild(t),
      r && (s.removeAllRanges(), s.addRange(r)),
      n && n.focus()
  }
}
function _u(e, t) {
  let n = !0,
    s = []
  const r = (i) => {
    if (n) {
      ;(n = !1),
        i.forEach((l) => {
          const c = rs(l)
          for (const u of document.head.children)
            if (u.isEqualNode(c)) {
              s.push(u)
              return
            }
        })
      return
    }
    const o = i.map(rs)
    s.forEach((l, c) => {
      const u = o.findIndex((d) => (d == null ? void 0 : d.isEqualNode(l ?? null)))
      u !== -1 ? delete o[u] : (l == null || l.remove(), delete s[c])
    }),
      o.forEach((l) => l && document.head.appendChild(l)),
      (s = [...s, ...o].filter(Boolean))
  }
  mi(() => {
    const i = e.data,
      o = t.value,
      l = i && i.description,
      c = (i && i.frontmatter.head) || [],
      u = oo(o, i)
    u !== document.title && (document.title = u)
    const d = l || o.description
    let h = document.querySelector('meta[name=description]')
    h
      ? h.getAttribute('content') !== d && h.setAttribute('content', d)
      : rs(['meta', { name: 'description', content: d }]),
      r(lo(o.head, Fa(c)))
  })
}
function rs([e, t, n]) {
  const s = document.createElement(e)
  for (const r in t) s.setAttribute(r, t[r])
  return n && (s.innerHTML = n), e === 'script' && !t.async && (s.async = !1), s
}
function Na(e) {
  return e[0] === 'meta' && e[1] && e[1].name === 'description'
}
function Fa(e) {
  return e.filter((t) => !Na(t))
}
const is = new Set(),
  uo = () => document.createElement('link'),
  $a = (e) => {
    const t = uo()
    ;(t.rel = 'prefetch'), (t.href = e), document.head.appendChild(t)
  },
  Ha = (e) => {
    const t = new XMLHttpRequest()
    t.open('GET', e, (t.withCredentials = !0)), t.send()
  }
let ln
const ja = Ce && (ln = uo()) && ln.relList && ln.relList.supports && ln.relList.supports('prefetch') ? $a : Ha
function bu() {
  if (!Ce || !window.IntersectionObserver) return
  let e
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType))) return
  const t = window.requestIdleCallback || setTimeout
  let n = null
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((i) => {
        i.forEach((o) => {
          if (o.isIntersecting) {
            const l = o.target
            n.unobserve(l)
            const { pathname: c } = l
            if (!is.has(c)) {
              is.add(c)
              const u = Ra(c)
              u && ja(u)
            }
          }
        })
      })),
      t(() => {
        document.querySelectorAll('#app a').forEach((i) => {
          const { hostname: o, pathname: l } = new URL(
              i.href instanceof SVGAnimatedString ? i.href.animVal : i.href,
              i.baseURI,
            ),
            c = l.match(/\.\w+$/)
          ;(c && c[0] !== '.html') ||
            (i.target !== '_blank' && o === location.hostname && (l !== location.pathname ? n.observe(i) : is.add(l)))
        })
      })
  }
  Tt(s)
  const r = ao()
  je(() => r.path, s),
    $n(() => {
      n && n.disconnect()
    })
}
export {
  tu as $,
  $n as A,
  Ka as B,
  Ol as C,
  Oa as D,
  ka as E,
  me as F,
  qa as G,
  ii as H,
  du as I,
  ue as J,
  Ba as K,
  ro as L,
  ao as M,
  ic as N,
  Et as O,
  uu as P,
  Cs as Q,
  ou as R,
  lu as S,
  Wi as T,
  In as U,
  au as V,
  Rn as W,
  cu as X,
  Bl as Y,
  za as Z,
  ru as _,
  Ui as a,
  eu as a0,
  Xa as a1,
  nu as a2,
  Ja as a3,
  Wa as a4,
  Za as a5,
  _u as a6,
  Ia as a7,
  fu as a8,
  Sa as a9,
  pu as aa,
  gu as ab,
  at as ac,
  su as ad,
  hu as ae,
  Ra as af,
  iu as ag,
  bu as ah,
  yu as ai,
  mu as aj,
  ys as ak,
  ji as b,
  Ya as c,
  wi as d,
  Qa as e,
  xa as f,
  Nr as g,
  de as h,
  _a as i,
  Ce as j,
  se as k,
  Tt as l,
  Di as m,
  xs as n,
  $i as o,
  li as p,
  Da as q,
  Ga as r,
  Ua as s,
  Va as t,
  Ta as u,
  ya as v,
  dl as w,
  eo as x,
  je as y,
  mi as z,
}
