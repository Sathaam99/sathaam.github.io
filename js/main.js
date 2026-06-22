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
});
