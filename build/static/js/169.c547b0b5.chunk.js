(this.webpackJsonpdappslab=this.webpackJsonpdappslab||[]).push([[169],{926:function(a,t){!function(a){a.languages.http={"request-line":{pattern:/^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,inside:{property:/^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,"attr-name":/:\w+/}},"response-status":{pattern:/^HTTP\/1.[01] \d+.*/m,inside:{property:{pattern:/(^HTTP\/1.[01] )\d+.*/i,lookbehind:!0}}},"header-name":{pattern:/^[\w-]+:(?=.)/m,alias:"keyword"}};var t,e,p,n=a.languages,s={"application/javascript":n.javascript,"application/json":n.json||n.javascript,"application/xml":n.xml,"text/xml":n.xml,"text/html":n.html,"text/css":n.css},i={"application/json":!0,"application/xml":!0};for(var r in s)if(s[r]){t=t||{};var l=i[r]?(p=(e=r).replace(/^[a-z]+\//,""),"(?:"+e+"|\\w+/(?:[\\w.-]+\\+)+"+p+"(?![+\\w.-]))"):r;t[r.replace(/\//g,"-")]={pattern:RegExp("(content-type:\\s*"+l+"[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*","i"),lookbehind:!0,inside:s[r]}}t&&a.languages.insertBefore("http","header-name",t)}(Prism)}}]);
//# sourceMappingURL=169.c547b0b5.chunk.js.map