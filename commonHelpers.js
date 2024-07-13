import{a as m,i,S as v}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const w="44791015-436dd02a5fc0b5187e9b97af9",b="https://pixabay.com/api/";async function f(s,r){const t=`${b}?key=${w}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=15`;try{const e=(await m.get(t)).data;if(e.hits.length===0)throw new Error("No images found");return e}catch(n){throw console.error("Error fetching images:",n),i.error({title:"Error",message:"Sorry, there was an error fetching images. Please try again!"}),n}}function h(){y.innerHTML=""}function p(s){h();let r="";s.forEach(t=>{const n=`
      <div class="card">
        <a href="${t.largeImageURL}" class="gallery-item">
          <div class="card-img-top">
            <img src="${t.webformatURL}" alt="${t.tags}">
          </div>
        </a>
        <div class="card-text">
          <p>Likes: ${t.likes}</p>
          <p>Views: ${t.views}</p>
          <p>Comments: ${t.comments}</p>
          <p>Downloads: ${t.downloads}</p>
        </div>
      </div>`;r+=n}),y.insertAdjacentHTML("beforeend",r)}const E=document.querySelector(".button-js"),y=document.querySelector(".js-div"),L=document.querySelector(".search-js"),c=document.querySelector(".load-more");let g,a=1,d="",u=0;E.addEventListener("click",$);async function $(s){s.preventDefault();const r=L.value.trim();if(a=1,r===""){i.warning({title:"Warning",message:"Please enter a search term"});return}d=r;try{const t=await f(d,a);u=t.totalHits,h(),p(t.hits),t.hits.length<15||a*15>=u?(c.style.display="none",i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):c.style.display="block",g=new v(".gallery-item",{captionsData:"alt",captionDelay:250})}catch(t){console.error("Error fetching and rendering images:",t)}}c.addEventListener("click",async()=>{a+=1;try{const s=await f(d,a);p(s.hits),a*15>=u&&(c.style.display="none",i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}));const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),g.refresh()}catch(s){console.error("Error fetching and rendering images:",s)}});
//# sourceMappingURL=commonHelpers.js.map
