/** 异步加载广告
*   Date:   2013-08-04
*   Author: fdipzone
*   Ver:    1.0
*/
var ADLoader = (function(){

    var _ads = [],     // 广告集合
        _step = 300,   // 广告加载间隔
        _async = true, // 是否异步加载
        _loaded = 0;   // 已经加载的广告数

    
    /** loadAd 循环加载广告
    * @param int c 第几个广告
    */
    function loadAD(c){
        if(_loaded>=_ads.length){
            return ;
        }

        if($('#'+_ads[c].domId).length>0){ // 判断dom是否存在

            if(_async){ // 异步执行

                crapLoader.loadScript(getScript(_ads[c]), _ads[c].domId, {
                    success: function(){
                        completeAd();
                    }
                });

            }else{ // 将同步加载的广告显示

                var ad_container = $('#'+_ads[c].domId+'_container');
                ad_container.find('embed').attr('wmode','transparent').end().find('object').each(function(k, v){
                    v.wmode = 'transparent'; // 将flash变透明
                });
                $('#'+_ads[c].domId)[0].appendChild(ad_container[0]);
                ad_container.show();

                completeAd();

            }

        }else{ // dom不存在
            completeAd();
        }
    }

    /** 加载完广告后处理 */
    function completeAd(){
        _loaded ++;
        setTimeout(function(){
            loadAD(_loaded);
        }, _step);
    }

    /** 获取广告
    * @param Array ad 广告参数
    */
    function getScript(ad){
        var ret = null;

        switch(ad.type){
            case 'openx':  // openx code ad
                ret = 'data:text/javascript;base64,' + ad.zoneId + 'dmFyIG0zX3UgPSAobG9jYXRpb24ucHJvdG9jb2w9PSdodHRwczonPydodHRwczovL2Fkcy5ubWcuY29tLmhrL3d3dy9kZWxpdmVyeS9hanMucGhwJzonaHR0cDovL2Fkcy5ubWcuY29tLmhrL3d3dy9kZWxpdmVyeS9hanMucGhwJyk7CnZhciBtM19yID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjk5OTk5OTk5OTk5KTsKaWYgKCFkb2N1bWVudC5NQVhfdXNlZCkgZG9jdW1lbnQuTUFYX3VzZWQgPSAnLCc7CmRvY3VtZW50LndyaXRlICgiPHNjciIrImlwdCB0eXBlPSd0ZXh0L2phdmFzY3JpcHQnIHNyYz0nIittM191KTsKZG9jdW1lbnQud3JpdGUgKCI/em9uZWlkPSIgKyB6b25laWQpOwpkb2N1bWVudC53cml0ZSAoJyZhbXA7Y2I9JyArIG0zX3IpOwppZiAoZG9jdW1lbnQuTUFYX3VzZWQgIT0gJywnKSBkb2N1bWVudC53cml0ZSAoIiZhbXA7ZXhjbHVkZT0iICsgZG9jdW1lbnQuTUFYX3VzZWQpOwpkb2N1bWVudC53cml0ZSAoZG9jdW1lbnQuY2hhcnNldCA/ICcmYW1wO2NoYXJzZXQ9Jytkb2N1bWVudC5jaGFyc2V0IDogKGRvY3VtZW50LmNoYXJhY3RlclNldCA/ICcmYW1wO2NoYXJzZXQ9Jytkb2N1bWVudC5jaGFyYWN0ZXJTZXQgOiAnJykpOwpkb2N1bWVudC53cml0ZSAoIiZhbXA7bG9jPSIgKyBlc2NhcGUod2luZG93LmxvY2F0aW9uKSk7CmlmIChkb2N1bWVudC5yZWZlcnJlcikgZG9jdW1lbnQud3JpdGUgKCImYW1wO3JlZmVyZXI9IiArIGVzY2FwZShkb2N1bWVudC5yZWZlcnJlcikpOwppZiAoZG9jdW1lbnQuY29udGV4dCkgZG9jdW1lbnQud3JpdGUgKCImY29udGV4dD0iICsgZXNjYXBlKGRvY3VtZW50LmNvbnRleHQpKTsKaWYgKGRvY3VtZW50Lm1tbV9mbykgZG9jdW1lbnQud3JpdGUgKCImYW1wO21tbV9mbz0xIik7CmRvY3VtZW50LndyaXRlICgiJz48XC9zY3IiKyJpcHQ+Iik7';
                break;

            case 'url': // url ad
                ret = ad.url;
                break;
        }

        return ret;
    }

    /** 同步加载广告
    * @param Array ad 广告参数
    */
    function writeAd(ad){
        switch(ad.type){
            case 'openx':
                var m3_u = (location.protocol=='https:'?'https://ads.nmg.com.hk/www/delivery/ajs.php':'http://ads.nmg.com.hk/www/delivery/ajs.php');
                var m3_r = Math.floor(Math.random()*99999999999);
                if (!document.MAX_used) document.MAX_used = ',';
                document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
                document.write ("?zoneid=" + ad.zoneId);
                document.write ('&amp;cb=' + m3_r);
                if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
                document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
                document.write ("&amp;loc=" + escape(window.location));
                if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
                if (document.context) document.write ("&context=" + escape(document.context));
                if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
                document.write ("'><\/scr"+"ipt>");
                break;

            case 'url':
                document.write('<script type="text/javascript" src="' + ad.url + '"></script>');
                break;
        }
    }


    obj = {

        /** 加载广告
        * @param Array   ads   广告集合
        * @param int     step  广告加载间隔
        * @param boolean async true:异步加载 false:同步加载
        */
        load: function(ads, step, async){
            _ads = ads;

            if(typeof(step)!='undefined'){
                _step = step;
            }

            if(typeof(async)!='undefined'){
                _async = async;
            }

            loadAD(_loaded);
        },

        /** 预加载广告
        * @param object ad 广告
        */
        preload: function(ad){
            if($('#'+ad.domId).length>0){   // 判断dom是否存在
                writeAd(ad);
            }
        }

    }

    return obj;

}());


/* crapLoader */
var crapLoader = (function() {
    
    var isHijacked = false,
        queue = [],
        inputBuffer = [],
        writeBuffer = {},
        loading = 0,
        elementCache = {},
        returnedElements = [],
        splitScriptsRegex = /(<script[\s\S]*?<\/script>)/gim,
        globalOptions = {
            autoRelease: true,
            parallel: true,
            debug: false
        },
        defaultOptions = {
            charset: undefined,
            success: undefined,
            func: undefined,
            src: undefined,
            timeout: 3000
        },publ,
        head = document.getElementsByTagName("head")[0] || document.documentElement,
        support = {
            scriptOnloadTriggeredAccurately: false,
            splitWithCapturingParentheses: ("abc".split(/(b)/)[1]==="b")
        };


    
    function checkQueue () {
        if(queue.length) {
            loadScript( queue.shift() );
        } else if(loading === 0 && globalOptions.autoRelease) {
            debug("Queue is empty. Auto-releasing.");
            publ.release();
        }
    }

    function checkWriteBuffer (obj) {
        var buffer = writeBuffer[obj.domId],
            returnedEl;

        if(buffer && buffer.length) {
            writeHtml( buffer.shift(), obj );

        } else {
            while (returnedElements.length > 0) {
                returnedEl = returnedElements.pop();
                var id = returnedEl.id;
                var elInDoc = getElementById(id);
                if (!elInDoc) { continue; }
                var parent = elInDoc.parentNode;
                elInDoc.id = id + "__tmp";
                parent.insertBefore(returnedEl, elInDoc);
                parent.removeChild(elInDoc);
            }
            finished(obj);
        }
    }

    function debug (message, obj) {
        if(!globalOptions.debug || !window.console) { return; }
        var objExtra = "";
        if(obj) {
            objExtra = "#"+obj.domId+" ";
            var depth = obj.depth;
            while(depth--) { objExtra += "    "; }
        }
        console.log("crapLoader " + objExtra + message);
    }

    function extend (t, s) {
        var k;
        if(!s) { return t; }
        for(k in s) {
            t[k] = s[k];
        }
        return t;
    }

    function finished (obj) {
        if(obj.success && typeof obj.success === "function") {
            obj.success.call( document.getElementById(obj.domId) );
        }

        checkQueue();
    }

    function flush (obj) {
        var domId = obj.domId,
           outputFromScript,
           htmlPartArray;

        outputFromScript = stripNoScript( inputBuffer.join("") );
        inputBuffer = [];

        htmlPartArray = separateScriptsFromHtml( outputFromScript );

        if(!writeBuffer[domId]) {
            writeBuffer[domId] = htmlPartArray;
        } else {
            Array.prototype.unshift.apply(writeBuffer[domId], htmlPartArray);
        }
        checkWriteBuffer(obj);
    }

    function getCachedElById (domId) {
        return elementCache[domId] || (elementCache[domId] = document.getElementById(domId));
    }

    function getElementById (domId) {
        return ( publ.orgGetElementById.call ?
            publ.orgGetElementById.call(document, domId) :
            publ.orgGetElementById(domId) );
    }

    function getElementByIdReplacement (domId) {
        var el = getElementById(domId),
            html, frag, div, found;

        function traverseForElById(domId, el) {
            var children = el.children, i, l, child;
            if(children && children.length) {
                for(i=0,l=children.length; i<l; i++) {
                    child = children[i];
                    if(child.id && child.id === domId) { return child; }
                    if(child.children && child.children.length) {
                        var tmp = traverseForElById(domId, child);
                        if (tmp) return tmp;
                    }
                }
            }
        }

        function searchForAlreadyReturnedEl(domId) {
            var i, l, returnedEl;
            for(i=0,l=returnedElements.length; i<l; i++) {
                returnedEl = returnedElements[i];
                if(returnedEl.id === domId) { return returnedEl; }
            }
        }

        if(el) { return el; }

        if (returnedElements.length) {
            found = searchForAlreadyReturnedEl(domId);
            if (found) {
                return found;
            }
        }

        if(inputBuffer.length) {
            html = inputBuffer.join("");
            frag = document.createDocumentFragment();
            div = document.createElement("div");
            div.innerHTML = html;
            frag.appendChild(div);
            found = traverseForElById(domId, div);
            if (found) {
                returnedElements.push(found);
            }
            return found;
        }
    }

    var globalEval = (function () {
        return (window.execScript ? function(code, language) {
            window.execScript(code, language || "JavaScript");
        } : function(code, language) {
            if(language && !/^javascript/i.test(language)) { return; }
            window.eval.call(window, code);
        });
    }());

    function isScript (html) {
        return html.toLowerCase().indexOf("<script") === 0;
    }

    function runFunc (obj) {
        obj.func();
        obj.depth++;
        flush(obj);
    }

    function loadScript (obj) {
        loading++;
        // async loading code from jQuery
        var script = document.createElement("script");
        if(obj.type) { script.type = obj.type; }
        if(obj.charset) { script.charset = obj.charset; }
        if(obj.language) { script.language = obj.language; }

        logScript(obj);

        var done = false;
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function() {
            loading--;
            script.loaded = true;
            if ( !done && (!this.readyState ||
                    this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;
                script.onload = script.onreadystatechange = null;
                debug("onload " + obj.src, obj);
                flush(obj);
            }
        };

        script.loaded = false;
        script.src = obj.src;
        obj.depth++;

        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        // This arises when a base node is used (#2709 and #4378).
        head.insertBefore( script, head.firstChild );
        setTimeout(function() {
            if(!script.loaded) { throw new Error("SCRIPT NOT LOADED: " + script.src); }
        }, obj.timeout);
    }

    function logScript (obj, code, lang) {
        debug((code ?
            "Inline " + lang + ": " + code.replace("\n", " ").substr(0, 30) + "..." :
            "Inject " + obj.src), obj);
    }

    function separateScriptsFromHtml (htmlStr) {
        return split(htmlStr, splitScriptsRegex);
    }

    function split (str, regexp) {
        var match, prevIndex=0, tmp, result = [], i, l;

        if(support.splitWithCapturingParentheses) {
            tmp = str.split(regexp);
        } else {
            // Cross browser split technique from Steven Levithan
            // http://blog.stevenlevithan.com/archives/cross-browser-split
            tmp = [];
            while(match = regexp.exec(str)) {
                if(match.index > prevIndex) {
                    result.push(str.slice(prevIndex, match.index));
                }

                if(match.length > 1 && match.index < str.length) {
                    Array.prototype.push.apply(tmp, match.slice(1));
                }

                prevIndex = regexp.lastIndex;
            }

            if(prevIndex < str.length) {
                tmp.push(str.slice(prevIndex));
            }

        }

        for(i=0, l=tmp.length; i<l; i=i+1) {
            if(tmp[i]!=="") { result.push(tmp[i]); }
        }

        return result;
    }

    function stripNoScript (html) {
        return html.replace(/<noscript>[\s\S]*?<\/noscript>/ig, "");
    }

    function trim (str) {
        if(!str) { return str; }
        return str.replace(/^\s*|\s*$/gi, "");
    }

    function writeHtml (html, obj) {
        if( isScript(html) ) {
            var dummy = document.createElement("div");
            dummy.innerHTML = "dummy<div>" + html + "</div>"; // trick for IE
            var script = dummy.children[0].children[0];
            var lang = script.getAttribute("language") || "javascript";
            if(script.src) {
                obj.src = script.src;
                obj.charset = script.charset;
                obj.language = lang;
                obj.type = script.type;
                loadScript(obj);
            } else {
                var code = trim( script.text );
                if(code) {
                    logScript( obj, code, lang);
                    globalEval( code, lang);
                }
                flush(obj);
            }
        } else {
            var container = getCachedElById(obj.domId);
            if(!container) {
                throw new Error("crapLoader: Unable to inject html. Element with id '" + obj.domId + "' does not exist");
            }

            html = trim(html); // newline before <object> cause weird effects in IE
            if(html) {
                container.innerHTML += html;
            }
            checkWriteBuffer(obj);
        }
    }

    function writeReplacement (str) {
        inputBuffer.push(str);
        debug("write: " + str);
    }

    function openReplacement () {
        // document.open() just returns the document when called from a blocking script:
        // http://www.whatwg.org/specs/web-apps/current-work/#dom-document-open
        return document;
    }

    function closeReplacement () {
        // document.close() does nothing when called from a blocking script:
        // http://www.whatwg.org/specs/web-apps/current-work/#dom-document-close
    }

    publ = {
        hijack: function(options) {
            if(isHijacked) { return; }
            isHijacked = true;
            extend(globalOptions, options);
            if(globalOptions.parallel && !support.scriptOnloadTriggeredAccurately) {
                globalOptions.parallel = false;
                debug("Browsers onload is not reliable. Disabling parallel loading.");
            }

            document.write = document.writeln = writeReplacement;
            document.open = openReplacement;
            document.close = closeReplacement;
            document.getElementById = getElementByIdReplacement;
        },

        release: function() {
            if(!isHijacked) { return; }
            isHijacked = false;
            document.write = this.orgWrite;
            document.writeln = this.orgWriteLn;
            document.open = this.orgOpen;
            document.close = this.orgClose;
            document.getElementById = this.orgGetElementById;
            elementCache = {};
        },

        handle: function(options) {
            if(!isHijacked) {
                debug("Not in hijacked mode. Auto-hijacking.");
                this.hijack();
            }
            var defaultOptsCopy = extend({}, defaultOptions);
            var obj = extend(defaultOptsCopy, options);
            obj.depth = 0;

            if (!obj.domId) {
                obj.domId = "craploader_" + new Date().getTime();
                var span = document.createElement("span");
                span.id = obj.domId;
                document.body.appendChild(span);
            }

            if (options.func) {
                runFunc(obj);
                return;
            }

            if(globalOptions.parallel) {
                setTimeout(function() {
                    loadScript(obj);
                }, 1);
            } else {
                queue.push(obj);
                setTimeout(function() {
                    if(loading === 0) {
                        checkQueue();
                    }
                }, 1);
            }
        },

        loadScript: function(src, domId, options) {
            if (typeof domId !== "string") {
                options = domId;
                domId = undefined;
            }
            this.handle(extend({
                src:    src,
                domId:  domId
            }, options));
        },

        runFunc: function(func, domId, options) {
            if (typeof domId !== "string") {
                options = domId;
                domId = undefined;
            }
            this.handle( extend({
                domId:  domId,
                func:     func
            }, options) );
        },

        orgGetElementById   : document.getElementById,
        orgWrite            : document.write,
        orgWriteLn          : document.writeln,
        orgOpen             : document.open,
        orgClose            : document.close,
        _olt                : 1,
        _oltCallback        : function() {
            support.scriptOnloadTriggeredAccurately = (publ._olt===2);
        }
    };

    return publ;
}());