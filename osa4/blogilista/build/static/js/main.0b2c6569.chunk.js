(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{16:function(e,t,n){e.exports=n(40)},21:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(15),u=n.n(l),o=(n(21),n(1)),c=n.n(o),i=n(4),s=n(2),m=r.a.forwardRef((function(e,t){var n=Object(a.useState)(!1),l=Object(s.a)(n,2),u=l[0],o=l[1],c={display:u?"none":""},i={display:u?"":"none"},m=function(){o(!u)};return Object(a.useImperativeHandle)(t,(function(){return{toggleVisibility:m}})),r.a.createElement("div",null,r.a.createElement("div",{style:c},r.a.createElement("button",{onClick:m},e.buttonLabel)),r.a.createElement("div",{style:i},e.children,r.a.createElement("button",{onClick:m},e.closingButtonLabel)))}));m.displayName="Togglable";var d=m,f=n(5),p=n.n(f),b=null,g={getAll:function(){return p.a.get("/api/blogs").then((function(e){return e.data}))},create:function(){var e=Object(i.a)(c.a.mark((function e(t){var n,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:b}},e.next=3,p.a.post("/api/blogs",t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(e,t){return p.a.put("".concat("/api/blogs","/").concat(e),t).then((function(e){return e.data}))},remove:function(){var e=Object(i.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:b}},e.next=3,p.a.delete("".concat("/api/blogs","/").concat(t),n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setToken:function(e){b="bearer ".concat(e)}},v=function(e){var t=e.blog,n=e.user,l=e.deleteBlog;console.log(n),console.log(t);var u=Object(a.useRef)(),o=Object(a.useState)([]),m=Object(s.a)(o,2),f=m[0],p=m[1],b=function(){var e=Object(i.a)(c.a.mark((function e(n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.confirm("Are you sure you want to delete "+t.title+" by "+t.author)&&l(t.id);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{style:{paddingTop:10,paddingLeft:2,border:"solid",borderWidth:1,marginBottom:5}},r.a.createElement("div",{className:"visibleWhenNotToggled"},t.title," ",t.author),r.a.createElement(d,{buttonLabel:"view",closingButtonLabel:"hide",ref:u},t.url,r.a.createElement("br",null),"likes ",t.likes," ",r.a.createElement("button",{className:"like",onClick:function(){var e={user:t.user.id,likes:t.likes+1,author:t.author,title:t.title,url:t.url};console.log(t.id,t),g.update(t.id,e).then((function(e){p(f.concat(e))})),window.location.reload(!1)}},"like"),r.a.createElement("br",null),t.user.name,r.a.createElement((function(){return n.username===t.user.username?r.a.createElement("button",{onClick:b},"delete"):null}),null)))},h=function(e){var t=e.errorMessage,n=e.message;return null!==t?r.a.createElement("div",{className:"error"},t):null!==n?r.a.createElement("div",{className:"success"},n):null},E=function(e){var t=e.handleSubmit,n=e.handleUsernameChange,a=e.handlePasswordChange,l=e.username,u=e.password;return r.a.createElement("div",null,r.a.createElement("h2",null,"Login"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"username",r.a.createElement("input",{value:l,onChange:n})),r.a.createElement("div",null,"password",r.a.createElement("input",{type:"password",value:u,onChange:a})),r.a.createElement("button",{type:"submit"},"login")))},w=function(e){var t=e.createBlog,n=Object(a.useState)(""),l=Object(s.a)(n,2),u=l[0],o=l[1],m=Object(a.useState)(""),d=Object(s.a)(m,2),f=d[0],p=d[1],b=Object(a.useState)(""),g=Object(s.a)(b,2),v=g[0],h=g[1],E=function(){var e=Object(i.a)(c.a.mark((function e(n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),t({title:u,author:f,url:v}),o(""),p(""),h("");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("form",{onSubmit:E},r.a.createElement("div",null,"Title: ",r.a.createElement("input",{value:u,onChange:function(e){o(e.target.value)}})),r.a.createElement("div",null,"Author: ",r.a.createElement("input",{value:f,onChange:function(e){p(e.target.value)}})),r.a.createElement("div",null,"Url: ",r.a.createElement("input",{value:v,onChange:function(e){h(e.target.value)}})),r.a.createElement("button",{type:"submit"},"create"))},O={login:function(){var e=Object(i.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},j=function(){var e=Object(a.useRef)(),t=Object(a.useState)([]),n=Object(s.a)(t,2),l=n[0],u=n[1],o=Object(a.useState)(""),m=Object(s.a)(o,2),f=m[0],p=m[1],b=Object(a.useState)(""),j=Object(s.a)(b,2),k=j[0],y=j[1],S=Object(a.useState)(null),x=Object(s.a)(S,2),C=x[0],B=x[1],N=Object(a.useState)(null),T=Object(s.a)(N,2),A=T[0],L=T[1],U=Object(a.useState)(null),I=Object(s.a)(U,2),J=I[0],R=I[1];Object(a.useEffect)((function(){g.getAll().then((function(e){return u(e)}))}),[]),Object(a.useEffect)((function(){var e=window.localStorage.getItem("loggedBlogAppUser");if(e){var t=JSON.parse(e);B(t),g.setToken(t.token)}}),[]);var z=function(t){e.current.toggleVisibility(),g.create(t).then((function(e){u(l.concat(e)),R("New blog added: "+e.title+" by "+e.author),setTimeout((function(){R(null)}),5e3)})).catch=function(){L("something went wrong"),setTimeout((function(){L(null)}),5e3)}},D=function(){var e=Object(i.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log("logging in with ",f,k),e.prev=2,e.next=5,O.login({username:f,password:k});case 5:n=e.sent,window.localStorage.setItem("loggedBlogAppUser",JSON.stringify(n)),g.setToken(n.token),B(n),p(""),y(""),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),L("wrong username or password"),setTimeout((function(){L(null)}),5e3);case 17:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=Object(i.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.localStorage.removeItem("loggedBlogAppUser"),B(null);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(i.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.remove(t);case 2:n=l.filter((function(e){return e.id!==t})),u(n),R("Blog deleted!");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(h,{message:J,errorMessage:A}),r.a.createElement("h2",null,"blogs"),null!==C&&r.a.createElement("div",null,r.a.createElement("p",null,C.name," logged in "),r.a.createElement("button",{type:"submit",onClick:M},"logout")),null!==C&&r.a.createElement("div",null,r.a.createElement(d,{buttonLabel:"add blog",closingButtonLabel:"cancel",ref:e},r.a.createElement(w,{createBlog:z}))),null===C&&r.a.createElement("div",null,r.a.createElement(E,{username:f,password:k,handleUsernameChange:function(e){var t=e.target;return p(t.value)},handlePasswordChange:function(e){var t=e.target;return y(t.value)},handleSubmit:D})),null!==C&&(l.sort((function(e,t){return t.likes-e.likes})),r.a.createElement("div",null,l.map((function(e){return r.a.createElement(v,{key:e.id,blog:e,user:C,deleteBlog:P,className:"blog"})})))))};u.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.0b2c6569.chunk.js.map