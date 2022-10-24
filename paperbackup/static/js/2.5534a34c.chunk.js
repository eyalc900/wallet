(this["webpackJsonpambire-wallet"]=this["webpackJsonpambire-wallet"]||[]).push([[2],{1334:function(e,t,r){(function(t){var n=r(1335),i=r(615),o=function(){};function a(e){return e.startsWith("int[")?"int256"+e.slice(3):"int"===e?"int256":e.startsWith("uint[")?"uint256"+e.slice(4):"uint"===e?"uint256":e.startsWith("fixed[")?"fixed128x128"+e.slice(5):"fixed"===e?"fixed128x128":e.startsWith("ufixed[")?"ufixed128x128"+e.slice(6):"ufixed"===e?"ufixed128x128":e}function s(e){return parseInt(/^\D+(\d+)$/.exec(e)[1],10)}function f(e){var t=/^\D+(\d+)x(\d+)$/.exec(e);return[parseInt(t[1],10),parseInt(t[2],10)]}function u(e){var t=e.match(/(.*)\[(.*?)\]$/);return t?""===t[2]?"dynamic":parseInt(t[2],10):null}function c(e){var t=typeof e;if("string"===t)return n.isHexPrefixed(e)?new i(n.stripHexPrefix(e),16):new i(e,10);if("number"===t)return new i(e);if(e.toArray)return e;throw new Error("Argument is not a number")}function l(e){var t=/^(\w+)\((.*)\)$/.exec(e);if(3!==t.length)throw new Error("Invalid method signature");var r=/^(.+)\):\((.+)$/.exec(t[2]);if(null!==r&&3===r.length)return{method:t[1],args:r[1].split(","),retargs:r[2].split(",")};var n=t[2].split(",");return 1===n.length&&""===n[0]&&(n=[]),{method:t[1],args:n}}function d(e,r){var o,a,l,h;if("address"===e)return d("uint160",c(r));if("bool"===e)return d("uint8",r?1:0);if("string"===e)return d("bytes",t.from(r,"utf8"));if(g(e)){if("undefined"===typeof r.length)throw new Error("Not an array?");if("dynamic"!==(o=u(e))&&0!==o&&r.length>o)throw new Error("Elements exceed array size: "+o);for(h in l=[],e=e.slice(0,e.lastIndexOf("[")),"string"===typeof r&&(r=JSON.parse(r)),r)l.push(d(e,r[h]));if("dynamic"===o){var p=d("uint256",r.length);l.unshift(p)}return t.concat(l)}if("bytes"===e)return r=t.from(r),l=t.concat([d("uint256",r.length),r]),r.length%32!==0&&(l=t.concat([l,n.zeros(32-r.length%32)])),l;if(e.startsWith("bytes")){if((o=s(e))<1||o>32)throw new Error("Invalid bytes<N> width: "+o);return n.setLengthRight(r,32)}if(e.startsWith("uint")){if((o=s(e))%8||o<8||o>256)throw new Error("Invalid uint<N> width: "+o);if((a=c(r)).bitLength()>o)throw new Error("Supplied uint exceeds width: "+o+" vs "+a.bitLength());if(a<0)throw new Error("Supplied uint is negative");return a.toArrayLike(t,"be",32)}if(e.startsWith("int")){if((o=s(e))%8||o<8||o>256)throw new Error("Invalid int<N> width: "+o);if((a=c(r)).bitLength()>o)throw new Error("Supplied int exceeds width: "+o+" vs "+a.bitLength());return a.toTwos(256).toArrayLike(t,"be",32)}if(e.startsWith("ufixed")){if(o=f(e),(a=c(r))<0)throw new Error("Supplied ufixed is negative");return d("uint256",a.mul(new i(2).pow(new i(o[1]))))}if(e.startsWith("fixed"))return o=f(e),d("int256",c(r).mul(new i(2).pow(new i(o[1]))));throw new Error("Unsupported or invalid type: "+e)}function h(e,r,n){var o,a,s,f;if("string"===typeof e&&(e=p(e)),"address"===e.name)return h(e.rawType,r,n).toArrayLike(t,"be",20).toString("hex");if("bool"===e.name)return h(e.rawType,r,n).toString()===new i(1).toString();if("string"===e.name){var u=h(e.rawType,r,n);return t.from(u,"utf8").toString()}if(e.isArray){for(s=[],o=e.size,"dynamic"===e.size&&(n=h("uint256",r,n).toNumber(),o=h("uint256",r,n).toNumber(),n+=32),f=0;f<o;f++){var c=h(e.subArray,r,n);s.push(c),n+=e.subArray.memoryUsage}return s}if("bytes"===e.name)return n=h("uint256",r,n).toNumber(),o=h("uint256",r,n).toNumber(),r.slice(n+32,n+32+o);if(e.name.startsWith("bytes"))return r.slice(n,n+e.size);if(e.name.startsWith("uint")){if((a=new i(r.slice(n,n+32),16,"be")).bitLength()>e.size)throw new Error("Decoded int exceeds width: "+e.size+" vs "+a.bitLength());return a}if(e.name.startsWith("int")){if((a=new i(r.slice(n,n+32),16,"be").fromTwos(256)).bitLength()>e.size)throw new Error("Decoded uint exceeds width: "+e.size+" vs "+a.bitLength());return a}if(e.name.startsWith("ufixed")){if(o=new i(2).pow(new i(e.size[1])),!(a=h("uint256",r,n)).mod(o).isZero())throw new Error("Decimals not supported yet");return a.div(o)}if(e.name.startsWith("fixed")){if(o=new i(2).pow(new i(e.size[1])),!(a=h("int256",r,n)).mod(o).isZero())throw new Error("Decimals not supported yet");return a.div(o)}throw new Error("Unsupported or invalid type: "+e.name)}function p(e){var t,r,n;if(g(e)){t=u(e);var i=e.slice(0,e.lastIndexOf("["));return i=p(i),r={isArray:!0,name:e,size:t,memoryUsage:"dynamic"===t?32:i.memoryUsage*t,subArray:i}}switch(e){case"address":n="uint160";break;case"bool":n="uint8";break;case"string":n="bytes"}if(r={rawType:n,name:e,memoryUsage:32},e.startsWith("bytes")&&"bytes"!==e||e.startsWith("uint")||e.startsWith("int")?r.size=s(e):(e.startsWith("ufixed")||e.startsWith("fixed"))&&(r.size=f(e)),e.startsWith("bytes")&&"bytes"!==e&&(r.size<1||r.size>32))throw new Error("Invalid bytes<N> width: "+r.size);if((e.startsWith("uint")||e.startsWith("int"))&&(r.size%8||r.size<8||r.size>256))throw new Error("Invalid int/uint<N> width: "+r.size);return r}function y(e){return"string"===e||"bytes"===e||"dynamic"===u(e)}function g(e){return e.lastIndexOf("]")===e.length-1}function v(e,t){return e.startsWith("address")||e.startsWith("bytes")?"0x"+t.toString("hex"):t.toString()}o.eventID=function(e,r){var i=e+"("+r.map(a).join(",")+")";return n.keccak256(t.from(i))},o.methodID=function(e,t){return o.eventID(e,t).slice(0,4)},o.rawEncode=function(e,r){var n=[],i=[],o=0;e.forEach((function(e){if(g(e)){var t=u(e);o+="dynamic"!==t?32*t:32}else o+=32}));for(var s=0;s<e.length;s++){var f=a(e[s]),c=d(f,r[s]);y(f)?(n.push(d("uint256",o)),i.push(c),o+=c.length):n.push(c)}return t.concat(n.concat(i))},o.rawDecode=function(e,r){var n=[];r=t.from(r);for(var i=0,o=0;o<e.length;o++){var s=p(a(e[o])),f=h(s,r,i);i+=s.memoryUsage,n.push(f)}return n},o.simpleEncode=function(e){var r=Array.prototype.slice.call(arguments).slice(1),n=l(e);if(r.length!==n.args.length)throw new Error("Argument count mismatch");return t.concat([o.methodID(n.method,n.args),o.rawEncode(n.args,r)])},o.simpleDecode=function(e,t){var r=l(e);if(!r.retargs)throw new Error("No return values in method");return o.rawDecode(r.retargs,t)},o.stringify=function(e,t){var r=[];for(var n in e){var i=e[n],o=t[n];o=/^[^\[]+\[.*\]$/.test(i)?o.map((function(e){return v(i,e)})).join(", "):v(i,o),r.push(o)}return r},o.solidityHexValue=function(e,r,i){var a,f;if(g(e)){var l=e.replace(/\[.*?\]/,"");if(!g(l)){var d=u(e);if("dynamic"!==d&&0!==d&&r.length>d)throw new Error("Elements exceed array size: "+d)}var h=r.map((function(e){return o.solidityHexValue(l,e,256)}));return t.concat(h)}if("bytes"===e)return r;if("string"===e)return t.from(r,"utf8");if("bool"===e){i=i||8;var p=Array(i/4).join("0");return t.from(r?p+"1":p+"0","hex")}if("address"===e){var y=20;return i&&(y=i/8),n.setLengthLeft(r,y)}if(e.startsWith("bytes")){if((a=s(e))<1||a>32)throw new Error("Invalid bytes<N> width: "+a);return n.setLengthRight(r,a)}if(e.startsWith("uint")){if((a=s(e))%8||a<8||a>256)throw new Error("Invalid uint<N> width: "+a);if((f=c(r)).bitLength()>a)throw new Error("Supplied uint exceeds width: "+a+" vs "+f.bitLength());return i=i||a,f.toArrayLike(t,"be",i/8)}if(e.startsWith("int")){if((a=s(e))%8||a<8||a>256)throw new Error("Invalid int<N> width: "+a);if((f=c(r)).bitLength()>a)throw new Error("Supplied int exceeds width: "+a+" vs "+f.bitLength());return i=i||a,f.toTwos(a).toArrayLike(t,"be",i/8)}throw new Error("Unsupported or invalid type: "+e)},o.solidityPack=function(e,r){if(e.length!==r.length)throw new Error("Number of types are not matching the values");for(var n=[],i=0;i<e.length;i++){var s=a(e[i]),f=r[i];n.push(o.solidityHexValue(s,f,null))}return t.concat(n)},o.soliditySHA3=function(e,t){return n.keccak256(o.solidityPack(e,t))},o.soliditySHA256=function(e,t){return n.sha256(o.solidityPack(e,t))},o.solidityRIPEMD160=function(e,t){return n.ripemd160(o.solidityPack(e,t),!0)},o.fromSerpent=function(e){for(var t,r=[],n=0;n<e.length;n++){var i=e[n];if("s"===i)r.push("bytes");else if("b"===i){for(var o="bytes",a=n+1;a<e.length&&((t=e[a])>="0"&&t<="9");)o+=e[a]-"0",a++;n=a-1,r.push(o)}else if("i"===i)r.push("int256");else{if("a"!==i)throw new Error("Unsupported or invalid type: "+i);r.push("int256[]")}}return r},o.toSerpent=function(e){for(var t=[],r=0;r<e.length;r++){var n=e[r];if("bytes"===n)t.push("s");else if(n.startsWith("bytes"))t.push("b"+s(n));else if("int256"===n)t.push("i");else{if("int256[]"!==n)throw new Error("Unsupported or invalid type: "+n);t.push("a")}}return t.join("")},e.exports=o}).call(this,r(25).Buffer)},1335:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||t.hasOwnProperty(r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),t.secp256k1=t.rlp=t.BN=void 0;var o=r(770);t.secp256k1=o;var a=r(629),s=r(615);t.BN=s;var f=r(359);t.rlp=f,Object.assign(t,a),i(r(1338),t),i(r(1339),t),i(r(771),t),i(r(1340),t),i(r(677),t),i(r(1341),t)},1336:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=r(615),i=new(0,r(230).ec)("secp256k1"),o=i.curve;t.privateKeyExport=function(e,t){void 0===t&&(t=!0);var r=new n(e);if(r.ucmp(o.n)>=0)throw new Error("couldn't export to DER format");var s=i.g.mul(r);return a(s.getX(),s.getY(),t)},t.privateKeyModInverse=function(t){var r=new n(t);if(r.ucmp(o.n)>=0||r.isZero())throw new Error("private key range is invalid");return r.invm(o.n).toArrayLike(e,"be",32)},t.signatureImport=function(t){var r=new n(t.r);r.ucmp(o.n)>=0&&(r=new n(0));var i=new n(t.s);return i.ucmp(o.n)>=0&&(i=new n(0)),e.concat([r.toArrayLike(e,"be",32),i.toArrayLike(e,"be",32)])},t.ecdhUnsafe=function(e,t,r){void 0===r&&(r=!0);var s=i.keyFromPublic(e),f=new n(t);if(f.ucmp(o.n)>=0||f.isZero())throw new Error("scalar was invalid (zero or overflow)");var u=s.pub.mul(f);return a(u.getX(),u.getY(),r)};var a=function(t,r,n){var i;return n?((i=e.alloc(33))[0]=r.isOdd()?3:2,t.toArrayLike(e,"be",32).copy(i,1)):((i=e.alloc(65))[0]=4,t.toArrayLike(e,"be",32).copy(i,1),r.toArrayLike(e,"be",32).copy(i,33)),i}}).call(this,r(25).Buffer)},1337:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=e.from([48,129,211,2,1,1,4,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,129,133,48,129,130,2,1,1,48,44,6,7,42,134,72,206,61,1,1,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,255,252,47,48,6,4,1,0,4,1,7,4,33,2,121,190,102,126,249,220,187,172,85,160,98,149,206,135,11,7,2,155,252,219,45,206,40,217,89,242,129,91,22,248,23,152,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,186,174,220,230,175,72,160,59,191,210,94,140,208,54,65,65,2,1,1,161,36,3,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),n=e.from([48,130,1,19,2,1,1,4,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,129,165,48,129,162,2,1,1,48,44,6,7,42,134,72,206,61,1,1,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,255,255,252,47,48,6,4,1,0,4,1,7,4,65,4,121,190,102,126,249,220,187,172,85,160,98,149,206,135,11,7,2,155,252,219,45,206,40,217,89,242,129,91,22,248,23,152,72,58,218,119,38,163,196,101,93,164,251,252,14,17,8,168,253,23,180,72,166,133,84,25,156,71,208,143,251,16,212,184,2,33,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,254,186,174,220,230,175,72,160,59,191,210,94,140,208,54,65,65,2,1,1,161,68,3,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);t.privateKeyExport=function(t,i,o){void 0===o&&(o=!0);var a=e.from(o?r:n);return t.copy(a,o?8:9),i.copy(a,o?181:214),a},t.privateKeyImport=function(e){var t=e.length,r=0;if(t<r+1||48!==e[r])return null;if(t<(r+=1)+1||!(128&e[r]))return null;var n=127&e[r];if(n<1||n>2)return null;if(t<(r+=1)+n)return null;var i=e[r+n-1]|(n>1?e[r+n-2]<<8:0);return t<(r+=n)+i||t<r+3||2!==e[r]||1!==e[r+1]||1!==e[r+2]||t<(r+=3)+2||4!==e[r]||e[r+1]>32||t<r+2+e[r+1]?null:e.slice(r+2,r+2+e[r+1])},t.signatureImportLax=function(t){var r=e.alloc(32,0),n=e.alloc(32,0),i=t.length,o=0;if(48!==t[o++])return null;var a=t[o++];if(128&a&&(o+=a-128)>i)return null;if(2!==t[o++])return null;var s=t[o++];if(128&s){if(o+(a=s-128)>i)return null;for(;a>0&&0===t[o];o+=1,a-=1);for(s=0;a>0;o+=1,a-=1)s=(s<<8)+t[o]}if(s>i-o)return null;var f=o;if(o+=s,2!==t[o++])return null;var u=t[o++];if(128&u){if(o+(a=u-128)>i)return null;for(;a>0&&0===t[o];o+=1,a-=1);for(u=0;a>0;o+=1,a-=1)u=(u<<8)+t[o]}if(u>i-o)return null;var c=o;for(o+=u;s>0&&0===t[f];s-=1,f+=1);if(s>32)return null;var l=t.slice(f,f+s);for(l.copy(r,32-l.length);u>0&&0===t[c];u-=1,c+=1);if(u>32)return null;var d=t.slice(c,c+u);return d.copy(n,32-d.length),{r:r,s:n}}}).call(this,r(25).Buffer)},1338:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.KECCAK256_RLP=t.KECCAK256_RLP_S=t.KECCAK256_RLP_ARRAY=t.KECCAK256_RLP_ARRAY_S=t.KECCAK256_NULL=t.KECCAK256_NULL_S=t.TWO_POW256=t.MAX_INTEGER=void 0;var n=r(615);t.MAX_INTEGER=new n("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",16),t.TWO_POW256=new n("10000000000000000000000000000000000000000000000000000000000000000",16),t.KECCAK256_NULL_S="c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",t.KECCAK256_NULL=e.from(t.KECCAK256_NULL_S,"hex"),t.KECCAK256_RLP_ARRAY_S="1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",t.KECCAK256_RLP_ARRAY=e.from(t.KECCAK256_RLP_ARRAY_S,"hex"),t.KECCAK256_RLP_S="56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",t.KECCAK256_RLP=e.from(t.KECCAK256_RLP_S,"hex")}).call(this,r(25).Buffer)},1339:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.importPublic=t.privateToPublic=t.privateToAddress=t.publicToAddress=t.pubToAddress=t.isValidPublic=t.isValidPrivate=t.isPrecompiled=t.generateAddress2=t.generateAddress=t.isValidChecksumAddress=t.toChecksumAddress=t.isZeroAddress=t.isValidAddress=t.zeroAddress=void 0;var n=r(183),i=r(629),o=r(770),a=r(615),s=r(677),f=r(771);t.zeroAddress=function(){var e=s.zeros(20);return s.bufferToHex(e)},t.isValidAddress=function(e){return/^0x[0-9a-fA-F]{40}$/.test(e)},t.isZeroAddress=function(e){return t.zeroAddress()===s.addHexPrefix(e)},t.toChecksumAddress=function(e,t){e=i.stripHexPrefix(e).toLowerCase();for(var r=void 0!==t?t.toString()+"0x":"",n=f.keccak(r+e).toString("hex"),o="0x",a=0;a<e.length;a++)parseInt(n[a],16)>=8?o+=e[a].toUpperCase():o+=e[a];return o},t.isValidChecksumAddress=function(e,r){return t.isValidAddress(e)&&t.toChecksumAddress(e,r)===e},t.generateAddress=function(t,r){t=s.toBuffer(t);var n=new a(r);return n.isZero()?f.rlphash([t,null]).slice(-20):f.rlphash([t,e.from(n.toArray())]).slice(-20)},t.generateAddress2=function(t,r,i){var o=s.toBuffer(t),a=s.toBuffer(r),u=s.toBuffer(i);return n(20===o.length),n(32===a.length),f.keccak256(e.concat([e.from("ff","hex"),o,a,f.keccak256(u)])).slice(-20)},t.isPrecompiled=function(e){var t=s.unpad(e);return 1===t.length&&t[0]>=1&&t[0]<=8},t.isValidPrivate=function(e){return o.privateKeyVerify(e)},t.isValidPublic=function(t,r){return void 0===r&&(r=!1),64===t.length?o.publicKeyVerify(e.concat([e.from([4]),t])):!!r&&o.publicKeyVerify(t)},t.pubToAddress=function(e,t){return void 0===t&&(t=!1),e=s.toBuffer(e),t&&64!==e.length&&(e=o.publicKeyConvert(e,!1).slice(1)),n(64===e.length),f.keccak(e).slice(-20)},t.publicToAddress=t.pubToAddress,t.privateToAddress=function(e){return t.publicToAddress(t.privateToPublic(e))},t.privateToPublic=function(e){return e=s.toBuffer(e),o.publicKeyCreate(e,!1).slice(1)},t.importPublic=function(e){return 64!==(e=s.toBuffer(e)).length&&(e=o.publicKeyConvert(e,!1).slice(1)),e}}).call(this,r(25).Buffer)},1340:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.hashPersonalMessage=t.isValidSignature=t.fromRpcSig=t.toRpcSig=t.ecrecover=t.ecsign=void 0;var n=r(770),i=r(615),o=r(677),a=r(771);function s(e,t){return t?e-(2*t+35):e-27}function f(e){return 0===e||1===e}t.ecsign=function(e,t,r){var i=n.sign(e,t),o=i.recovery;return{r:i.signature.slice(0,32),s:i.signature.slice(32,64),v:r?o+(2*r+35):o+27}},t.ecrecover=function(t,r,i,a,u){var c=e.concat([o.setLength(i,32),o.setLength(a,32)],64),l=s(r,u);if(!f(l))throw new Error("Invalid signature v value");var d=n.recover(t,c,l);return n.publicKeyConvert(d,!1).slice(1)},t.toRpcSig=function(t,r,n,i){if(!f(s(t,i)))throw new Error("Invalid signature v value");return o.bufferToHex(e.concat([o.setLengthLeft(r,32),o.setLengthLeft(n,32),o.toBuffer(t)]))},t.fromRpcSig=function(e){var t=o.toBuffer(e);if(65!==t.length)throw new Error("Invalid signature length");var r=t[64];return r<27&&(r+=27),{v:r,r:t.slice(0,32),s:t.slice(32,64)}},t.isValidSignature=function(e,t,r,n,o){void 0===n&&(n=!0);var a=new i("7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0",16),u=new i("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",16);if(32!==t.length||32!==r.length)return!1;if(!f(s(e,o)))return!1;var c=new i(t),l=new i(r);return!(c.isZero()||c.gt(u)||l.isZero()||l.gt(u))&&(!n||1!==l.cmp(a))},t.hashPersonalMessage=function(t){var r=e.from("\x19Ethereum Signed Message:\n"+t.length.toString(),"utf-8");return a.keccak(e.concat([r,t]))}}).call(this,r(25).Buffer)},1341:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.defineProperties=void 0;var n=r(183),i=r(629),o=r(359),a=r(677);t.defineProperties=function(t,r,s){if(t.raw=[],t._fields=[],t.toJSON=function(e){if(void 0===e&&(e=!1),e){var r={};return t._fields.forEach((function(e){r[e]="0x"+t[e].toString("hex")})),r}return a.baToJSON(t.raw)},t.serialize=function(){return o.encode(t.raw)},r.forEach((function(r,i){function o(){return t.raw[i]}function s(o){"00"!==(o=a.toBuffer(o)).toString("hex")||r.allowZero||(o=e.allocUnsafe(0)),r.allowLess&&r.length?(o=a.stripZeros(o),n(r.length>=o.length,"The field "+r.name+" must not have more "+r.length+" bytes")):r.allowZero&&0===o.length||!r.length||n(r.length===o.length,"The field "+r.name+" must have byte length of "+r.length),t.raw[i]=o}t._fields.push(r.name),Object.defineProperty(t,r.name,{enumerable:!0,configurable:!0,get:o,set:s}),r.default&&(t[r.name]=r.default),r.alias&&Object.defineProperty(t,r.alias,{enumerable:!1,configurable:!0,set:s,get:o})})),s)if("string"===typeof s&&(s=e.from(i.stripHexPrefix(s),"hex")),e.isBuffer(s)&&(s=o.decode(s)),Array.isArray(s)){if(s.length>t._fields.length)throw new Error("wrong number of fields in data");s.forEach((function(e,r){t[t._fields[r]]=a.toBuffer(e)}))}else{if("object"!==typeof s)throw new Error("invalid data");var f=Object.keys(s);r.forEach((function(e){-1!==f.indexOf(e.name)&&(t[e.name]=s[e.name]),-1!==f.indexOf(e.alias)&&(t[e.alias]=s[e.alias])}))}}}).call(this,r(25).Buffer)},1398:function(e,t,r){(function(t){var n=r(769),i=r(88).keccak256,o=r(720);function a(e){return this.leader=o.Address(e.leader),this.follower=o.Address(e.follower),this.guardian=o.Address(e.guardian),this.tokenAddr=o.Address(e.tokenAddr),this.nonce=o.Bytes32(e.nonce),Object.freeze(this),this}a.prototype.hash=function(){return t.from(i.arrayBuffer(n.rawEncode(["address","address","address","address","bytes32"],[this.leader,this.follower,this.guardian,this.tokenAddr,this.nonce])))},a.prototype.hashHex=function(){return"0x".concat(this.hash().toString("hex"))},a.prototype.toSolidityTuple=function(){return[this.leader,this.follower,this.guardian,this.tokenAddr,this.nonce]},a.prototype.hashToSign=function(e,t){return a.getSignableStateRoot(e,this.hashHex(),t)},a.prototype.hashToSignHex=function(e,t){return"0x".concat(this.hashToSign(e,t).toString("hex"))},a.prototype.getResumeSignableMessage=function(e){return t.from(i.arrayBuffer(n.solidityPack(["string","bytes32","uint256"],["resume",this.hashHex(),e])))},a.prototype.getResumeSignableMessageHex=function(e){return"0x".concat(this.getResumeSignableMessage(e).toString("hex"))},a.getSignableStateRoot=function(e,r,o){return t.from(i.arrayBuffer(n.rawEncode(["address","bytes32","bytes32"],[e,r,o])))},a.getBalanceLeaf=function(e,r){return t.from(i.arrayBuffer(n.rawEncode(["address","uint256"],[e,r])))},a.getSpenderBalanceLeaf=function(e,r){return t.from(i.arrayBuffer(n.rawEncode(["address","string","uint256"],[e,"spender",r])))},e.exports={Channel:a,ChannelState:{Challenged:"115792089237316195423570985008687907853269984665640564039457584007913129639935",Active:"0"}}}).call(this,r(25).Buffer)},1399:function(e,t,r){var n=r(720);function i(e){return this.channel=e.channel,this.balanceTreeAmount=n.Uint256(e.balanceTreeAmount),this.stateRoot=n.Bytes32(e.stateRoot),this.sigLeader=n.Bytes32Array(e.sigLeader,3),this.sigFollower=n.Bytes32Array(e.sigFollower,3),this.proof=n.Bytes32Array(e.proof,-1),Object.freeze(this),this}i.prototype.toSolidityTuple=function(){return[this.channel.toSolidityTuple(),"0x".concat(this.balanceTreeAmount.toString(16)),this.stateRoot,this.sigLeader,this.sigFollower,this.proof]},e.exports={Withdraw:i}},1400:function(e,t,r){var n=r(78),i=r(133),o=r(25).Buffer,a=r(88).keccak256;function s(e,t){if(!t)return e;if(!e)return t;var r=o.concat([e,t].sort(o.compare));return o.from(a.arrayBuffer(r))}function f(e){if(0===e.length)return[[o.from("")]];var t=[];for(t.push(e);t[t.length-1].length>1;)t.push(u(t[t.length-1]));return t}function u(e){return e.reduce((function(e,t,r,n){return r%2===0&&e.push(s(t,n[r+1])),e}),[])}var c=function(){"use strict";function e(t){if(n(this,e),!t.every((function(e){return 32===e.length&&o.isBuffer(e)})))throw new Error("elements must be 32 byte buffers");var r,i={elements:(r=t,r.filter((function(e,t){return r.findIndex((function(t){return t.equals(e)}))===t})))};Object.assign(this,i),this.elements.sort(o.compare);var a={layers:f(this.elements)};Object.assign(this,a)}return i(e,[{key:"getRoot",value:function(){if(!this.root){var e={root:this.layers[this.layers.length-1][0]};Object.assign(this,e)}return this.root}},{key:"verify",value:function(e,t){return this.getRoot().equals(e.reduce((function(e,t){return s(e,t)}),t))}},{key:"proof",value:function(e){var t=this.elements.findIndex((function(t){return t.equals(e)}));if(-1===t)throw new Error("element not found in merkle tree");return this.layers.reduce((function(e,r){var n=function(e,t){var r=e%2?e-1:e+1;return r<t.length?t[r]:null}(t,r);return n&&e.push(n),t=Math.floor(t/2),e}),[])}}]),e}();e.exports=c},1401:function(e,t){e.exports=function(e){var t=e.startsWith("0x")?e.slice(2):e,r="0x".concat(t.substring(0,64)),n="0x".concat(t.substring(64,128)),i=parseInt(t.substring(128,130),16);return i<27&&(i+=27),["0x02".concat(i.toString(16),"000000000000000000000000000000000000000000000000000000000000"),r,n]}},1402:function(e,t,r){(function(t){var n=r(769),i=r(88).keccak256,o=r(720);function a(e){return this.owner=o.Address(e.owner),this.shares=o.Uint256(e.shares),this.unlocksAt=o.Uint256(e.unlocksAt),Object.freeze(this),this}a.prototype.hash=function(){var e=n.rawEncode(["address","uint256","uint256"],[this.owner,this.shares,this.unlocksAt]);return t.from(i.arrayBuffer(e))},a.prototype.hashHex=function(){return"0x".concat(this.hash().toString("hex"))},e.exports={UnbondCommitment:a}}).call(this,r(25).Buffer)},1403:function(e,t,r){var n=r(55).utils,i=n.keccak256,o=n.defaultAbiCoder,a=n.toUtf8Bytes,s=n.solidityPack,f=i(a("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"));function u(e,t,r){return i(o.encode(["bytes32","bytes32","bytes32","uint256","address"],[i(a("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")),i(a(e)),i(a("1")),r,t]))}e.exports={getDomainSeparator:u,getApprovalDigest:function(e,t,r,n){var a=u(e.name,e.address,e.chainId);return i(s(["bytes1","bytes1","bytes32","bytes32"],["0x19","0x01",a,i(o.encode(["bytes32","address","address","uint256","uint256","uint256"],[f,t.owner,t.spender,t.value,r,n]))]))}}},607:function(e){e.exports=JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]')},616:function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return a}));var n=r(0);function i(e){return Object(n.a)({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 19l-7-7 7-7"}}]})(e)}function o(e){return Object(n.a)({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 5l7 7-7 7"}}]})(e)}function a(e){return Object(n.a)({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"}}]})(e)}},677:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.baToJSON=t.addHexPrefix=t.toUnsigned=t.fromSigned=t.bufferToHex=t.bufferToInt=t.toBuffer=t.stripZeros=t.unpad=t.setLengthRight=t.setLength=t.setLengthLeft=t.zeros=void 0;var n=r(629),i=r(615);t.zeros=function(t){return e.allocUnsafe(t).fill(0)},t.setLengthLeft=function(e,r,n){void 0===n&&(n=!1);var i=t.zeros(r);return e=t.toBuffer(e),n?e.length<r?(e.copy(i),i):e.slice(0,r):e.length<r?(e.copy(i,r-e.length),i):e.slice(-r)},t.setLength=t.setLengthLeft,t.setLengthRight=function(e,r){return t.setLength(e,r,!0)},t.unpad=function(e){for(var t=(e=n.stripHexPrefix(e))[0];e.length>0&&"0"===t.toString();)t=(e=e.slice(1))[0];return e},t.stripZeros=t.unpad,t.toBuffer=function(t){if(!e.isBuffer(t))if(Array.isArray(t))t=e.from(t);else if("string"===typeof t){if(!n.isHexString(t))throw new Error("Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: "+t);t=e.from(n.padToEven(n.stripHexPrefix(t)),"hex")}else if("number"===typeof t)t=n.intToBuffer(t);else if(null===t||void 0===t)t=e.allocUnsafe(0);else if(i.isBN(t))t=t.toArrayLike(e);else{if(!t.toArray)throw new Error("invalid type");t=e.from(t.toArray())}return t},t.bufferToInt=function(e){return new i(t.toBuffer(e)).toNumber()},t.bufferToHex=function(e){return"0x"+(e=t.toBuffer(e)).toString("hex")},t.fromSigned=function(e){return new i(e).fromTwos(256)},t.toUnsigned=function(t){return e.from(t.toTwos(256).toArray())},t.addHexPrefix=function(e){return"string"!==typeof e||n.isHexPrefixed(e)?e:"0x"+e},t.baToJSON=function(r){if(e.isBuffer(r))return"0x"+r.toString("hex");if(r instanceof Array){for(var n=[],i=0;i<r.length;i++)n.push(t.baToJSON(r[i]));return n}}}).call(this,r(25).Buffer)},719:function(e,t,r){var n=r(656),i=r(1398),o=r(1399),a=r(1400),s=r(1401),f=r(1402),u=r(1403),c=r(922);e.exports=n(n(n(n(n(n({},i),o),f),u),c),{},{MerkleTree:a,splitSig:s})},769:function(e,t,r){e.exports=r(1334)},770:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.ecdhUnsafe=t.ecdh=t.recover=t.verify=t.sign=t.signatureImportLax=t.signatureImport=t.signatureExport=t.signatureNormalize=t.publicKeyCombine=t.publicKeyTweakMul=t.publicKeyTweakAdd=t.publicKeyVerify=t.publicKeyConvert=t.publicKeyCreate=t.privateKeyTweakMul=t.privateKeyTweakAdd=t.privateKeyModInverse=t.privateKeyNegate=t.privateKeyImport=t.privateKeyExport=t.privateKeyVerify=void 0;var n=r(227),i=r(1336),o=r(1337);t.privateKeyVerify=function(e){return 32===e.length&&n.privateKeyVerify(Uint8Array.from(e))},t.privateKeyExport=function(e,t){if(32!==e.length)throw new RangeError("private key length is invalid");var r=i.privateKeyExport(e,t);return o.privateKeyExport(e,r,t)},t.privateKeyImport=function(e){if(null!==(e=o.privateKeyImport(e))&&32===e.length&&t.privateKeyVerify(e))return e;throw new Error("couldn't import from DER format")},t.privateKeyNegate=function(t){return e.from(n.privateKeyNegate(Uint8Array.from(t)))},t.privateKeyModInverse=function(t){if(32!==t.length)throw new Error("private key length is invalid");return e.from(i.privateKeyModInverse(Uint8Array.from(t)))},t.privateKeyTweakAdd=function(t,r){return e.from(n.privateKeyTweakAdd(Uint8Array.from(t),r))},t.privateKeyTweakMul=function(t,r){return e.from(n.privateKeyTweakMul(Uint8Array.from(t),Uint8Array.from(r)))},t.publicKeyCreate=function(t,r){return e.from(n.publicKeyCreate(Uint8Array.from(t),r))},t.publicKeyConvert=function(t,r){return e.from(n.publicKeyConvert(Uint8Array.from(t),r))},t.publicKeyVerify=function(e){return(33===e.length||65===e.length)&&n.publicKeyVerify(Uint8Array.from(e))},t.publicKeyTweakAdd=function(t,r,i){return e.from(n.publicKeyTweakAdd(Uint8Array.from(t),Uint8Array.from(r),i))},t.publicKeyTweakMul=function(t,r,i){return e.from(n.publicKeyTweakMul(Uint8Array.from(t),Uint8Array.from(r),i))},t.publicKeyCombine=function(t,r){var i=[];return t.forEach((function(e){i.push(Uint8Array.from(e))})),e.from(n.publicKeyCombine(i,r))},t.signatureNormalize=function(t){return e.from(n.signatureNormalize(Uint8Array.from(t)))},t.signatureExport=function(t){return e.from(n.signatureExport(Uint8Array.from(t)))},t.signatureImport=function(t){return e.from(n.signatureImport(Uint8Array.from(t)))},t.signatureImportLax=function(e){if(0===e.length)throw new RangeError("signature length is invalid");var t=o.signatureImportLax(e);if(null===t)throw new Error("couldn't parse DER signature");return i.signatureImport(t)},t.sign=function(t,r,i){if(null===i)throw new TypeError("options should be an Object");var o=void 0;if(i){if(o={},null===i.data)throw new TypeError("options.data should be a Buffer");if(i.data){if(32!=i.data.length)throw new RangeError("options.data length is invalid");o.data=new Uint8Array(i.data)}if(null===i.noncefn)throw new TypeError("options.noncefn should be a Function");i.noncefn&&(o.noncefn=function(t,r,n,o,a){var s=null!=n?e.from(n):null,f=null!=o?e.from(o):null,u=e.from("");return i.noncefn&&(u=i.noncefn(e.from(t),e.from(r),s,f,a)),new Uint8Array(u)})}var a=n.ecdsaSign(Uint8Array.from(t),Uint8Array.from(r),o);return{signature:e.from(a.signature),recovery:a.recid}},t.verify=function(e,t,r){return n.ecdsaVerify(Uint8Array.from(t),Uint8Array.from(e),r)},t.recover=function(t,r,i,o){return e.from(n.ecdsaRecover(Uint8Array.from(r),i,Uint8Array.from(t),o))},t.ecdh=function(t,r){return e.from(n.ecdh(Uint8Array.from(t),Uint8Array.from(r),{}))},t.ecdhUnsafe=function(t,r,n){if(33!==t.length&&65!==t.length)throw new RangeError("public key length is invalid");if(32!==r.length)throw new RangeError("private key length is invalid");return e.from(i.ecdhUnsafe(Uint8Array.from(t),Uint8Array.from(r),n))}}).call(this,r(25).Buffer)},771:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.rlphash=t.ripemd160=t.sha256=t.keccak256=t.keccak=void 0;var n=r(362),i=n.keccak224,o=n.keccak384,a=n.keccak256,s=n.keccak512,f=r(360),u=r(629),c=r(359),l=r(677);t.keccak=function(t,r){switch(void 0===r&&(r=256),t="string"!==typeof t||u.isHexString(t)?l.toBuffer(t):e.from(t,"utf8"),r||(r=256),r){case 224:return i(t);case 256:return a(t);case 384:return o(t);case 512:return s(t);default:throw new Error("Invald algorithm: keccak"+r)}},t.keccak256=function(e){return t.keccak(e)},t.sha256=function(e){return e=l.toBuffer(e),f("sha256").update(e).digest()},t.ripemd160=function(e,t){e=l.toBuffer(e);var r=f("rmd160").update(e).digest();return!0===t?l.setLength(r,32):r},t.rlphash=function(e){return t.keccak(c.encode(e))}}).call(this,r(25).Buffer)}}]);
//# sourceMappingURL=2.5534a34c.chunk.js.map