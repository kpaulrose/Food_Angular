import './polyfills.server.mjs';
import{a as z}from"./chunk-UJVJMW3E.mjs";import{A as O,F as y,Fa as m,G as f,H as i,I as o,J as h,K as I,L as b,M as u,N as w,O as S,P as r,Q as v,R as l,S as k,T as E,e as d,ia as q,j as M,ja as T,k as p,ka as g,m as _,n as C,x as P,z as c}from"./chunk-QXFP2ZB7.mjs";import"./chunk-VVCT4QZE.mjs";function N(n,x){if(n&1){let t=I();i(0,"div",10),h(1,"img",11),i(2,"div",12)(3,"span",13),r(4),o(),i(5,"span",14),r(6),o()(),i(7,"div",15)(8,"span",16),r(9),o(),i(10,"button",17),b("click",function(){let a=_(t).$implicit,s=u(2);return C(s.decreaseQuantity(a.food.id))}),r(11,"-"),o(),i(12,"span",16),r(13),o(),i(14,"button",17),b("click",function(){let a=_(t).$implicit,s=u(2);return C(s.increaseQuantity(a.food.id))}),r(15,"+"),o()()()}if(n&2){let t=x.$implicit;c(),w("alt",t.food.name),f("src",t.food.imageUrl,P),c(3),v(t.food.name),c(2),l("\u20AC ",t.food.price,""),c(3),l("\u20AC",t.price,""),c(4),v(t.quantity)}}function D(n,x){if(n&1&&(i(0,"div"),y(1,N,16,6,"div",9),o()),n&2){let t=u();c(),f("ngForOf",t.cartItems)}}function R(n,x){n&1&&(i(0,"p"),r(1,"Your cart is empty."),o())}var j=(()=>{class n{constructor(t){this.cartService=t,this.cartItems=[],this.cartService.getItem().subscribe(e=>this.cartItems=e)}decreaseQuantity(t){let e=this.cartItems.find(a=>a.id==t);e&&(e.quantity=e.quantity-1,e.quantity==0&&this.cartService.removeItem(e.id),this.cartService.updateQuantity(t,e.quantity))}increaseQuantity(t){let e=this.cartItems.find(a=>a.id==t);e&&(e.quantity=e.quantity+1,this.cartService.updateQuantity(t,e.quantity))}getTotalQuantity(){let t=0;return this.cartItems.forEach(e=>{t=t+e.quantity}),t}getTotalPrice(){let t=0;return this.cartItems.forEach(e=>{t=t+e.quantity*e.price}),t}static{this.\u0275fac=function(e){return new(e||n)(O(z))}}static{this.\u0275cmp=M({type:n,selectors:[["app-cart"]],standalone:!0,features:[k],decls:15,vars:4,consts:[["emptyCart",""],[1,"cart-container"],[1,"cart-items"],[4,"ngIf","ngIfElse"],[1,"payment"],[1,"items_total"],[1,"divider"],[1,"price-total"],[1,"checkout-button"],["class","cart-item",4,"ngFor","ngForOf"],[1,"cart-item"],[1,"food-image",3,"src","alt"],[1,"item-details"],[1,"item-name"],[1,"item-price"],[1,"quantity-control"],[1,"item-quantity"],[1,"quantity-button",3,"click"]],template:function(e,a){if(e&1&&(i(0,"div",1)(1,"div",2)(2,"h2"),r(3,"Your Cart"),o(),y(4,D,2,1,"div",3)(5,R,2,0,"ng-template",null,0,E),o(),i(7,"div",4)(8,"span",5),r(9),o(),h(10,"div",6),i(11,"span",7),r(12),o(),i(13,"button",8),r(14,"Go to Checkout"),o()()()),e&2){let s=S(6);c(4),f("ngIf",a.cartItems.length>0)("ngIfElse",s),c(5),l("Total Items: ",a.getTotalQuantity(),""),c(3),l("Total Price: \u20AC ",a.getTotalPrice(),"")}},dependencies:[m,g,q,T],styles:[".cart-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;margin:20px;gap:20px;align-items:flex-start}.cart-items[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:80%;font-family:Arial,sans-serif;padding:20px;border:1px solid #ddd;border-radius:8px;box-shadow:0 4px 8px #0000001a;background-color:#fff}.cart-items[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:24px;margin-bottom:20px;color:#333;text-align:center}.cart-item[_ngcontent-%COMP%]{display:flex;align-items:center;padding:15px 0;border-bottom:1px solid #eee}.cart-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.food-image[_ngcontent-%COMP%]{width:80px;height:80px;border-radius:8px;object-fit:cover;margin-right:15px}.item-details[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;justify-content:center}.item-name[_ngcontent-%COMP%]{font-weight:700;font-size:18px;color:#333}.item-price[_ngcontent-%COMP%]{font-size:16px;color:#666;margin-top:4px}.quantity-control[_ngcontent-%COMP%]{display:flex;align-items:center}.quantity-button[_ngcontent-%COMP%]{background-color:#4caf50;color:#fff;border:none;padding:6px 10px;cursor:pointer;font-size:18px;border-radius:5px;margin:10px;transition:background-color .3s ease}.quantity-button[_ngcontent-%COMP%]:hover{background-color:#45a049}.item-quantity[_ngcontent-%COMP%]{font-size:16px;color:#333;min-width:30px;text-align:center}.payment[_ngcontent-%COMP%]{border:1px solid #ddd;border-radius:12px;box-shadow:0 6px 12px #0000001a;background-color:#fff;font-size:18px;color:#333;width:30%;padding:20px;text-align:center;display:flex;flex-direction:column;justify-content:space-around;align-items:center;transition:transform .3s ease,box-shadow .3s ease}.payment[_ngcontent-%COMP%]:hover{transform:translateY(-5px);box-shadow:0 12px 20px #0003}.payment[_ngcontent-%COMP%]   .items_total[_ngcontent-%COMP%], .payment[_ngcontent-%COMP%]   .price-total[_ngcontent-%COMP%]{display:block;font-size:20px;font-weight:600;margin:10px 0}.payment[_ngcontent-%COMP%]   .price-total[_ngcontent-%COMP%]{color:#28a745;font-size:24px;font-weight:700}.payment[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]{width:80%;height:1px;background-color:#ddd;margin:15px 0}.checkout-button[_ngcontent-%COMP%]{background-color:#007bff;color:#fff;border:none;padding:10px 20px;font-size:18px;font-weight:700;border-radius:8px;cursor:pointer;transition:background-color .3s ease,transform .2s ease}.checkout-button[_ngcontent-%COMP%]:hover{background-color:#0056b3;transform:scale(1.05)}"]})}}return n})();var V=[{path:"",component:j}],F=(()=>{class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275mod=p({type:n})}static{this.\u0275inj=d({imports:[m.forChild(V),m]})}}return n})();var W=(()=>{class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275mod=p({type:n})}static{this.\u0275inj=d({imports:[g,F]})}}return n})();export{W as CartDetailsModule};
