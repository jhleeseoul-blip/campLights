(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/camp/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/camp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/camp/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://nhycdcpkkaegzcncuoif.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeWNkY3Bra2FlZ3pjbmN1b2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0ODA5MDAsImV4cCI6MjA4ODA1NjkwMH0.0cuw8_d-M5fje4NlCy5aPPDMUukOqe79ensoAJvbJog");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/camp/app/checkin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckinPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/camp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/camp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/camp/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/camp/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function CheckinPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const presetCityId = params.get('cityId');
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCity, setSelectedCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Load preset city
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckinPage.useEffect": ()=>{
            if (!presetCityId) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('cities').select('*').eq('id', presetCityId).single().then({
                "CheckinPage.useEffect": ({ data })=>{
                    if (data) setSelectedCity(data);
                }
            }["CheckinPage.useEffect"]);
        }
    }["CheckinPage.useEffect"], [
        presetCityId
    ]);
    // Search cities
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckinPage.useEffect": ()=>{
            if (!query.trim() || selectedCity) {
                setResults([]);
                return;
            }
            const timer = setTimeout({
                "CheckinPage.useEffect.timer": async ()=>{
                    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('cities').select('*').or(`name_en.ilike.%${query}%,name_local.ilike.%${query}%`).limit(8);
                    setResults(data ?? []);
                }
            }["CheckinPage.useEffect.timer"], 300);
            return ({
                "CheckinPage.useEffect": ()=>clearTimeout(timer)
            })["CheckinPage.useEffect"];
        }
    }["CheckinPage.useEffect"], [
        query,
        selectedCity
    ]);
    const handleSubmit = async ()=>{
        if (!selectedCity) {
            setError('Please select a city.');
            return;
        }
        if (message.length > 20) {
            setError('Message max 20 chars.');
            return;
        }
        setLoading(true);
        setError('');
        const res = await fetch('/api/checkin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city_id: selectedCity.id,
                message,
                lang: 'en'
            })
        });
        if (res.ok) {
            router.push(`/city/${selectedCity.id}`);
        } else {
            const json = await res.json().catch(()=>({}));
            setError(json.error ?? 'Failed. Try again.');
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page",
        style: {
            background: 'var(--bg)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inner",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "back-link",
                    onClick: ()=>router.push('/'),
                    children: "← Back to map"
                }, void 0, false, {
                    fileName: "[project]/camp/app/checkin/page.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "Check-in"
                }, void 0, false, {
                    fileName: "[project]/camp/app/checkin/page.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                selectedCity ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "selected-city",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "📍 ",
                                selectedCity.name_en,
                                selectedCity.name_local !== selectedCity.name_en ? ` · ${selectedCity.name_local}` : '',
                                " (",
                                selectedCity.country_code,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/camp/app/checkin/page.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setSelectedCity(null);
                                setQuery('');
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/camp/app/checkin/page.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/camp/app/checkin/page.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Search city"
                        }, void 0, false, {
                            fileName: "[project]/camp/app/checkin/page.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "search-wrap",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Tokyo, Paris, 서울…",
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/camp/app/checkin/page.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/camp/app/checkin/page.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this),
                        results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "search-results",
                            children: results.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "search-result-item",
                                    onClick: ()=>{
                                        setSelectedCity(c);
                                        setResults([]);
                                    },
                                    children: [
                                        c.name_en,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sub",
                                            children: [
                                                c.name_local,
                                                " · ",
                                                c.country_code,
                                                " · ",
                                                c.region
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/camp/app/checkin/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/camp/app/checkin/page.tsx",
                                    lineNumber: 93,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/camp/app/checkin/page.tsx",
                            lineNumber: 91,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    children: "Message (optional, max 20 chars)"
                }, void 0, false, {
                    fileName: "[project]/camp/app/checkin/page.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "msg-wrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Hello from here!",
                            value: message,
                            maxLength: 20,
                            onChange: (e)=>setMessage(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/camp/app/checkin/page.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "msg-counter",
                            children: [
                                message.length,
                                "/20"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/camp/app/checkin/page.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/camp/app/checkin/page.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "error-msg",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/camp/app/checkin/page.tsx",
                    lineNumber: 116,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "btn btn-primary",
                    style: {
                        width: '100%',
                        justifyContent: 'center',
                        padding: '12px'
                    },
                    onClick: handleSubmit,
                    disabled: loading || !selectedCity,
                    children: loading ? 'Checking in…' : '🏕 Check-in'
                }, void 0, false, {
                    fileName: "[project]/camp/app/checkin/page.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontSize: '0.75rem',
                        color: 'var(--muted)',
                        marginTop: 16,
                        lineHeight: 1.6
                    },
                    children: "No location tracking. Your check-in is anonymous and auto-deleted after 24 hours."
                }, void 0, false, {
                    fileName: "[project]/camp/app/checkin/page.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/camp/app/checkin/page.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/camp/app/checkin/page.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(CheckinPage, "NX12mXGbu8QKsHTZat6Zq8OZ5OQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$camp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = CheckinPage;
var _c;
__turbopack_context__.k.register(_c, "CheckinPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=camp_2bb5eacd._.js.map