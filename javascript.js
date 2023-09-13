const menutoggle = ()=> document.body.classList.toggle('open')



// document.addEventListener('DOMContentLoaded', function () {
//     const navLinks = document.querySelectorAll('nav ul li a');

//     navLinks.forEach(function (link) {
//         link.addEventListener('click', function (e) {
//             e.preventDefault();

//             const targetId = this.getAttribute('href').substring(1);
//             const targetSection = document.getElementById(targetId);

//             if (targetSection) {
//                 window.scrollTo({
//                     top: targetSection.offsetTop,
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });
// });
