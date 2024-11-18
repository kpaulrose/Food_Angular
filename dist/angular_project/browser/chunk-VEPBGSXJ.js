import{a as I}from"./chunk-RN3WWFMQ.js";import{A as g,B as H,D as _,E as w,F as y,H as S,M as O,P as a,e as l,g as h,h as c,k as x,l as C,m as n,n as M,o as p,p as s,q as i,r,s as v,u as F,y as d,z as f}from"./chunk-KR6MRNMF.js";function j(t,u){if(t&1&&(i(0,"a",3)(1,"div",4),v(2,"img",5),i(3,"div",6)(4,"h3"),d(5),r(),i(6,"p"),d(7),r(),i(8,"p"),d(9),r(),i(10,"p"),d(11),r()()()()),t&2){let o=u.$implicit;s("routerLink","/food/food-detail/"+o.id),n(2),s("src",o.imageUrl,x),n(3),f(o.name),n(2),f(o.price),n(2),g("",o.cookTime," minutes"),n(2),g("Stars: ",o.stars,"")}}function k(t,u){t&1&&(i(0,"div"),d(1,"Loading..."),r())}var E=(()=>{class t{constructor(o){this.foodService=o,this.foods=[],this.allFoods=[],this.itemsToShow=10}ngOnInit(){this.foodService.getFood().subscribe({next:o=>{this.allFoods=o,this.loadMoreFoods()},error:o=>{console.error("Error fetching food data:",o)},complete:()=>{console.log("Food data fetching complete.")}})}loadMoreFoods(){let o=this.allFoods.slice(this.foods.length,this.foods.length+this.itemsToShow);this.foods=[...this.foods,...o]}onWindowScroll(){let o=window.scrollY+window.innerHeight,e=document.documentElement.scrollHeight;o>=e-1&&this.loadMoreFoods()}static{this.\u0275fac=function(e){return new(e||t)(M(I))}}static{this.\u0275cmp=h({type:t,selectors:[["app-home-content"]],hostBindings:function(e,m){e&1&&F("scroll",function(){return m.onWindowScroll()},!1,C)},standalone:!0,features:[H],decls:3,vars:2,consts:[[1,"food-list"],["style","text-decoration:none; color:inherit","class","food-item",3,"routerLink",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"food-item",2,"text-decoration","none","color","inherit",3,"routerLink"],[1,"food"],["alt","food.imageUrl",3,"src"],[1,"food-image"]],template:function(e,m){e&1&&(i(0,"div",0),p(1,j,12,6,"a",1),r(),p(2,k,2,0,"div",2)),e&2&&(n(),s("ngForOf",m.foods),n(),s("ngIf",m.foods.length===0))},dependencies:[y,_,w,a,O,S],styles:[".food-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;padding:20px}.food-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;background-color:#f9f9f9;padding:15px;border:1px solid #ddd;border-radius:8px;width:280px;box-shadow:0 4px 8px #0000001a;transition:transform .3s}.food-item[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.food[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:250px;max-height:200px;border-radius:8px}.food-image[_ngcontent-%COMP%]{margin-top:10px;text-align:center}.food-image[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.2em;margin:5px 0}.food-image[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:3px 0;color:#555}"]})}}return t})();var L=[{path:"",component:E}],b=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=c({type:t})}static{this.\u0275inj=l({imports:[a.forChild(L),a]})}}return t})();var G=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=c({type:t})}static{this.\u0275inj=l({imports:[b]})}}return t})();export{G as HomeModule};
