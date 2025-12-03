// DARK/LIGHT MODE
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light";
    toggle.textContent = html.dataset.theme === "light" ? "🌙" : "☀️";
});

// TYPING EFFECT
const typing = document.querySelector(".typing");
const roles = ["Web Developer", "ML Enthusiast", "Java Programmer", "Learner"];
let i = 0, j = 0, deleting = false;
function type() {
    const text = roles[i];
    typing.textContent = deleting ? text.slice(0,j--) : text.slice(0,j++);
    if (!deleting && j===text.length){ deleting=true; setTimeout(type,800); return; }
    if (deleting && j===0){ deleting=false; i=(i+1)%roles.length; }
    setTimeout(type, deleting?60:90);
}
type();

// FADE-IN SECTIONS
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("show"); });
}, { threshold: 0.2 });
document.querySelectorAll(".section").forEach(sec=>observer.observe(sec));

// PROJECT FILTER
document.querySelectorAll(".filter").forEach(btn=>{
    btn.addEventListener("click", ()=>{
        document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        document.querySelectorAll(".project").forEach(p => p.style.display = (filter==="all"||p.dataset.category===filter)?"block":"none");
    });
});

// BACK TO TOP
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", ()=> topBtn.style.display = scrollY>500?"block":"none");
topBtn.addEventListener("click", ()=> window.scrollTo({top:0,behavior:"smooth"}));

// RESUME DOWNLOAD CHECK
const resumeBtn = document.getElementById("resumeBtn");
const resumeStatus = document.getElementById("resumeStatus");
fetch("resume.pdf",{method:"HEAD"})
    .then(res=>{ if(!res.ok) throw new Error(); resumeStatus.textContent=""; })
    .catch(()=>{ resumeBtn.removeAttribute("download"); resumeBtn.classList.add("btn-disabled"); resumeStatus.textContent=" (Resume not found)"; });
