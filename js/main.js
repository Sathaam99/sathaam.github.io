// Smooth scroll for internal nav links and reveal-on-scroll
document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1 && document.querySelector(href)){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.section, .card, .feature-card, .project-card, .hero-copy, .hero-photo-card');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>{ r.classList.add('reveal'); obs.observe(r); });

  // simple nav active state
  const navLinks = document.querySelectorAll('.site-nav a');
  const sections = Array.from(navLinks).map(l=> document.querySelector(l.getAttribute('href')) ).filter(Boolean);
  window.addEventListener('scroll', ()=>{
    let idx = sections.length-1;
    for(let i=0;i<sections.length;i++){
      if(sections[i].getBoundingClientRect().top > 80) { idx = Math.max(0,i-1); break; }
    }
    navLinks.forEach((ln,i)=> ln.classList.toggle('active', i===idx));
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  if(menuToggle && siteNav){
    menuToggle.addEventListener('click', ()=>{
      const open = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Scroll progress bar (small thin indicator)
  const prog = document.createElement('div');
  prog.id = 'scroll-progress';
  document.body.appendChild(prog);
  window.addEventListener('scroll', ()=>{
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h>0 ? (window.scrollY / h) * 100 : 0;
    prog.style.width = pct + '%';
  }, {passive:true});

  // Contact form submission (Formspree placeholder)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const endpoint = form.getAttribute('action');
      const data = new FormData(form);
      try{
        const res = await fetch(endpoint, {method:'POST', body: data, headers: {'Accept':'application/json'}});
        if(res.ok){
          status.textContent = 'Message sent — thank you!';
          form.reset();
        } else {
          status.textContent = 'Unable to send — please try mailto:';
        }
      } catch(err){
        status.textContent = 'Network error — try again later.';
      }
    });
  }
});
