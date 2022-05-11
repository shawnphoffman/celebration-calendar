/*! For license information please see 579.2831c624.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkcelebration_calendar=self.webpackChunkcelebration_calendar||[]).push([[579],{4579:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var r=t(2791),a=t(8367),i=t(6661),o=t(2110),s=t(1321),c=t(4196),l=t(5248),u=(0,l.Z)("div")({name:"Wrapper",class:"wepx1fx"}),d=(0,l.Z)("div")({name:"ActionWrapper",class:"arsx9nb"}),f=(0,l.Z)("div")({name:"ContentWrapper",class:"c7bcqzh"}),h=(0,l.Z)("div")({name:"Title",class:"t1isvk7d"}),p=(0,l.Z)("div")({name:"Details",class:"d1oft2hf"}),m=(0,l.Z)("div")({name:"Description",class:"d1prtrtk"}),v=(0,l.Z)("div")({name:"IconButton",class:"i1em5ujh",vars:{"i1em5ujh-0":[function(e){return e.pink?"var(--heart)":"inherit"}]}}),C=(0,l.Z)(a.Z)({name:"Button",class:"b1r73dk4"}),w=(0,l.Z)("span")({name:"Day",class:"d1snhuc2"}),j=(0,l.Z)("span")({name:"NoWrap",class:"n1x3n8vf"}),T=(0,l.Z)("a")({name:"EventLink",class:"eekcz9v"});t(7610);var E=t(184),x=(0,r.memo)((function(e){var n=e.event,t=(0,o.Q)(),a=t.addFavorite,i=t.removeFavorite,s=t.favorites,c=(0,r.useCallback)((function(){a(n)}),[a,n]),l=(0,r.useCallback)((function(){i(n)}),[n,i]);return(0,r.useMemo)((function(){return s.some((function(e){return e.id===n.id}))}),[n.id,s])?(0,E.jsx)(v,{onClick:l,pink:!0,title:"Remove Favorite",children:(0,E.jsx)("i",{className:"fa-solid fa-heart"})},"".concat(n.id,".heart-solid")):(0,E.jsx)(v,{onClick:c,title:"Add Favorite",pink:!0,children:(0,E.jsx)("i",{className:"fa-light fa-heart"})},"".concat(n.id,"-heart"))})),N=function(e){var n=e.event,t=e.onDismiss,o=(0,r.useCallback)((function(){i.j(s.Z.EventDownload)}),[]),l=(0,r.useMemo)((function(){return n?{title:n.summary,description:n.description,startTime:n.startAt,endTime:n.endAt,location:n.venue,url:n.url}:{}}),[n]);if(!n)return null;var N="event-".concat(n.id,".ics"),b={start:(0,c.mr)(n.startAt),end:(0,c.mr)(n.endAt)},k=a.Z.isSupported(),A=c.Ff[new Date(n.startAt).getDay()];return(0,E.jsxs)(u,{children:[(0,E.jsxs)(f,{children:[(0,E.jsx)(h,{children:n.summary}),(0,E.jsxs)(p,{children:[(0,E.jsxs)(j,{children:[n.venue,":"]}),!t&&(0,E.jsx)(w,{children:A}),(0,E.jsxs)(j,{children:["(",b.start," - ",b.end,")"]})]}),(0,E.jsx)(m,{children:n.description}),(0,E.jsxs)(T,{href:n.url,target:"_blank",rel:"noreferrer",children:["View details on the official site ",(0,E.jsx)("i",{className:"fa-solid fa-up-right-from-square"})]})]}),(0,E.jsxs)(d,{children:[t&&(0,E.jsx)(v,{onClick:t,children:(0,E.jsx)("i",{className:"fa-regular fa-close"})}),(0,E.jsx)(x,{event:n}),k?(0,E.jsx)("div",{onClickCapture:o,children:(0,E.jsx)(C,{filename:N,event:l,children:(0,E.jsx)("i",{className:"fa-light fa-calendar-arrow-down"})})}):null]})]})},b=(0,r.memo)(N)},8367:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(2791),a=function(e,n){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])},a(e,n)};var i=function(){return i=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var a in n=arguments[t])Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a]);return e},i.apply(this,arguments)};function o(e){return e<10?"0"+e:""+e}function s(e){var n=new Date(e);return[n.getUTCFullYear(),o(n.getUTCMonth()+1),o(n.getUTCDate()),"T",o(n.getUTCHours()),o(n.getUTCMinutes())+"00Z"].join("")}function c(){var e=window.navigator.userAgent,n=!!e.match(/iPad/i)||!!e.match(/iPhone/i),t=!!e.match(/WebKit/i);return n&&t&&!e.match(/CriOS/i)}var l=function(e){function n(n){var t=e.call(this,n)||this;return t.handleClick=function(e){e.preventDefault(),e.stopPropagation();var n=t.props,r=n.event,a=n.filename,i=n.rawContent,o=function(e,n,t){void 0===n&&(n=!1),void 0===t&&(t="");var r=[];if(!e||!e.startTime||!e.title)throw Error("Both startTime and title fields are mandatory");r.push("DTSTART:"+s(e.startTime)),r.push("SUMMARY:"+e.title),e.url&&r.push("URL:"+e.url),e.attendees&&e.attendees.forEach((function(e){var n=e.match(/^([^<]+)\s*<(.+)>/);if(n){var t=n[1],a=n[2];r.push(["ATTENDEE","CN="+t,"CUTYPE=INDIVIDUAL","PARTSTAT=NEEDS-ACTION","ROLE=REQ-PARTICIPANT","RSVP=TRUE:mailto:"+a].join(";"))}})),e.endTime&&r.push("DTEND:"+s(e.endTime)),e.description&&r.push("DESCRIPTION:"+e.description),e.location&&r.push("LOCATION:"+e.location),t&&r.push(t);var a=["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT",r.join("\n"),"END:VEVENT","END:VCALENDAR"].join("\n");return n?encodeURI("data:text/calendar;charset=utf8,"+a):a}(r,c(),i),l=new Blob([o],{type:"text/calendar;charset=utf-8"});t.isCrappyIE?window.navigator.msSaveOrOpenBlob(l,a):c()?window.open(o,"_blank"):function(e,n){var t=document.createElement("a");t.href=window.URL.createObjectURL(e),t.setAttribute("download",n),document.body.appendChild(t),t.click(),document.body.removeChild(t)}(l,a)},t.isCrappyIE=!("undefined"===typeof window||!window.navigator.msSaveOrOpenBlob||!window.Blob),t}return function(e,n){function t(){this.constructor=e}a(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}(n,e),n.prototype.render=function(){var e=this.props,n=e.children,t=e.href,a=e.className;return r.createElement("a",i({onClick:this.handleClick},{href:t,className:a}),n)},n.isSupported=function(){return!function(){var e=window.navigator.userAgent;return(!!e.match(/iPad/i)||!!e.match(/iPhone/i))&&!!e.match(/CriOS/i)}()},n.defaultProps={filename:"download.ics",href:"#add-to-calendar",rawContent:""},n}(r.Component)},7610:function(e,n,t){t.r(n),n.default={}}}]);
//# sourceMappingURL=579.2831c624.chunk.js.map