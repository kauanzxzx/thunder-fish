/* ============================================================
   THUNDERFISH — EDIÇÃO HALLOWEEN
   Insere os morceguinhos e as abóboras no site.
   Para remover depois do Halloween, apague a linha
   <script src="js/halloween.js"></script> do index.html.
============================================================ */

(function(){

    const BAT_SVG = `
<svg class="hw-bat-svg" viewBox="-4 4 108 36" aria-hidden="true">
    <path class="hw-wing hw-wing-l" fill="currentColor"
        d="M50 22 C44 16 34 10 20 10 C12 10 5 14 0 20 Q8 19 10 26 Q15 21 22 25 Q26 20 33 26 Q38 22 44 30 L50 33 Z"/>
    <path class="hw-wing hw-wing-r" fill="currentColor"
        d="M50 22 C56 16 66 10 80 10 C88 10 95 14 100 20 Q92 19 90 26 Q85 21 78 25 Q74 20 67 26 Q62 22 56 30 L50 33 Z"/>
    <ellipse cx="50" cy="27" rx="4.6" ry="8" fill="currentColor"/>
    <path fill="currentColor" d="M45.5 23 L44.5 12 L48 16.5 L52 16.5 L55.5 12 L54.5 23 Q50 27 45.5 23 Z"/>
    <circle class="hw-bat-eye" cx="48.2" cy="19.6" r="1.05"/>
    <circle class="hw-bat-eye" cx="51.8" cy="19.6" r="1.05"/>
</svg>`;

    const PUMPKIN_SVG = `
<svg viewBox="0 0 64 60" aria-hidden="true">
    <defs>
        <radialGradient id="hwPk" cx="40%" cy="35%" r="70%">
            <stop offset="0" stop-color="#ffb14a"/>
            <stop offset=".6" stop-color="#ff7a1a"/>
            <stop offset="1" stop-color="#d4570a"/>
        </radialGradient>
    </defs>
    <path d="M31 12 C30 6 33 2 38 1 L39 4 C35 5 34 8 35 12 Z" fill="#4c7a2a"/>
    <path d="M36 9 C42 3 50 5 51 9 C46 8 41 9 37 12 Z" fill="#6aa63a"/>
    <ellipse cx="17" cy="35" rx="15" ry="20" fill="url(#hwPk)"/>
    <ellipse cx="47" cy="35" rx="15" ry="20" fill="url(#hwPk)"/>
    <ellipse cx="32" cy="35" rx="16" ry="22" fill="url(#hwPk)"/>
    <path d="M24 16 Q20 35 24 55 M40 16 Q44 35 40 55" fill="none" stroke="#c4520c" stroke-width="1.4" opacity=".55"/>
    <path class="pk-face" d="M18 30 L24 24 L28 31 Z M36 31 L40 24 L46 30 Z M29 37 L32 33 L35 37 Z
        M15 41 Q32 54 49 41 L45 43 L43 47 L39 44 L35 49 L32 45 L29 49 L25 44 L21 47 L19 43 Z"/>
</svg>`;

    function pumpkin(extraClass, size){
        const span = document.createElement("span");
        span.className = "hw-pumpkin" + (extraClass ? " " + extraClass : "");
        if(size) span.style.setProperty("--pk", size + "px");
        span.setAttribute("aria-hidden", "true");
        span.innerHTML = PUMPKIN_SVG;
        return span;
    }

    /* ---------- Morceguinhos voando (poucos, devagar) ---------- */

    const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if(!reduzMovimento){

        const sky = document.createElement("div");
        sky.className = "hw-sky";
        sky.setAttribute("aria-hidden", "true");

        const mobile = window.matchMedia("(max-width:700px)").matches;

        // top / tamanho / duração da travessia / atraso / sentido
        const bats = [
            { top:"18%", size:54, dur:32, delay:-4,  rev:false },
            { top:"42%", size:40, dur:40, delay:-22, rev:true  },
            { top:"64%", size:48, dur:36, delay:-12, rev:false },
            { top:"28%", size:36, dur:46, delay:-34, rev:true  },
            { top:"80%", size:44, dur:42, delay:-8,  rev:true  }
        ].slice(0, mobile ? 3 : 5);

        bats.forEach(function(b, i){
            const fly = document.createElement("div");
            fly.className = "hw-fly" + (b.rev ? " reverso" : "");
            fly.style.setProperty("--top", b.top);
            fly.style.setProperty("--size", (mobile ? Math.round(b.size * .8) : b.size) + "px");
            fly.style.setProperty("--dur", b.dur + "s");
            fly.style.setProperty("--delay", b.delay + "s");
            fly.style.setProperty("--bob", (2.8 + i * .45) + "s");
            fly.innerHTML = '<div class="hw-bob">' + BAT_SVG + '</div>';
            sky.appendChild(fly);
        });

        document.body.appendChild(sky);
    }

    /* ---------- Abóboras ---------- */

    // 1) Duas abóboras apoiadas no card da foto do hero
    const heroVisual = document.querySelector(".hero-visual");
    if(heroVisual){
        const grupo = document.createElement("div");
        grupo.className = "hw-hero-pumpkins";
        grupo.appendChild(pumpkin("", 52));
        grupo.appendChild(pumpkin("", 38));
        heroVisual.appendChild(grupo);
    }

    // 2) Abóbora pequena nos rótulos "Catálogo" e "Pronta Entrega"
    ["#barcos", "#pronta-entrega"].forEach(function(sel){
        const label = document.querySelector(sel + " .section-label");
        if(label) label.prepend(pumpkin("hw-label-pumpkin"));
    });

    // 3) Abóbora no canto do bloco de orçamento (CTA)
    const ctaTexto = document.querySelector(".cta-texto");
    if(ctaTexto) ctaTexto.appendChild(pumpkin("hw-cta-pumpkin"));

    // 4) Linha de "Feliz Halloween" no rodapé
    const footerBottom = document.querySelector(".footer-bottom");
    if(footerBottom){
        const linha = document.createElement("p");
        linha.className = "hw-footer-line";
        linha.appendChild(pumpkin());
        linha.appendChild(document.createTextNode("Feliz Halloween!"));
        linha.appendChild(pumpkin());
        footerBottom.prepend(linha);
    }

})();
