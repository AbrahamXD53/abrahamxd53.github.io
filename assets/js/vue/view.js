var app;
const mixin = {
    data: {
        language: "en",
        langData: {
            en: {
                cool: "Abraham Ahumada",
                language: "Language",
                languagees: "Spanish",
                languageen: "English",
                aboutme: "About Me",
                gallery: "Gallery",
                beep: "Beep!",
                welcome:"Welcome to ",
                hello:"Hello! I'm just a guy who loves games and technology, I grew up playing games and I've lived great experiences, now I want to bring new ones, with a new generation of games and applications.",
                who:" Abraham's Portfolio",
                whatidotitle:"What I Do",
                whatido:"I make games, applications and great experiencies.",
                howidoit1:"To make games, mainly I use",
                howidoit2:"(C# or JavaScript), but I have knowledge in",
                howidoit3:"or Monogame, also I know ", 
                and:"and",
                aboutweb1:"I make webpages and rest APIs, using PHP",
                applications:"I've made Android and iOS hybrid applications with",
                degree1:"I have a Tecnologo degree in Informatics and Computing at CETI (2009-2013).",
                degree2:"I have a Engineer degree in Software Development at CETI (2013-2017).",
                hobbies:"I love space stuff and I like to play musical instruments.",
                meinwork:"I am a self-taught person, but I know when I need help, I am capable of work in teams and I can work under-pressure.",
                programminglangs:"Programming Languages",
                workexperience:"Work Experience",
                frameworksandtools:"As a Developer I have selected several tools and frameworks to make development process more comfortable and painless, so I could deliver better experiences in less time.",
                frameworksandtoolstitle:"Frameworks and Tools",
                languagesandos:"Communications are important with humans and computers... nothing better than could talk with both",
                languagesandostitle:"Languajes and OS",
                myworktitle:"My work",
                myworkdesc:"Check a Few Examples of my Work, there are happy animals and confused robots, my first public project and my last project in development.",
                mywork:"",
                lastcalltittle:"Wait! (Beep!)",
                lastcall:"Are you interested in my job? Lets talk about your proyects or ideas, I know we can build something amazing together. Hey! you must leave a message after the Beep!",
                name:"Name",
                message:"Message",
                sayhello:"Say Hello!",
                followme:"Follow me!",
                sayname:"Hello! What's your name?",
                saymail:"What's your email?",
                saywhatagain:"Tell me about your project, How can I help you?"

            },
            es: {
                cool: "Abraham Ahumada",
                language: "Idioma",
                languagees: "Español",
                languageen: "Inglés",
                aboutme: "Acerca de Mí",
                gallery: "Galeria",
                beep: "¡Hey!",
                welcome:"Bienvenido al ",
                hello:"¡Hola!, Solo soy un chico que le encantan los juegos, la musica y la tecnología, Crecí jugando grandes juegos, con los cuales he vivido grandes experiencias, ahora quiero traerles a las nuevas generaciones, grandes experiencias, a través de juegos y aplicaciones.",
                who:" Portafolio de Abraham",
                whatidotitle:"¿Qué es lo que hago?",
                whatido:"Creo grandes experiencias con juegos y aplicaciones",
                howidoit1:"Para hacer juegos, principalmente utilizo",
                howidoit2:"(C# o JavaScript), pero también tengo conocimiento en ",
                howidoit3:"o Monogame, asi como el manejo de ",
                and:"y",
                aboutweb1:"Realizo paginas Web y APIS Rest con PHP",
                applications:"He hecho algunas aplicaciones con ",
                degree1:"Tecnólogo en Informática y Computación, CETI (2009-2013).",
                degree2:"Ingeniero en Desarrollo de Software, CETI (2013,2017).",
                hobbies:"Me gustan las cosas sobre el espacio y toco algunos instrumentos musicales.",
                meinwork:"Soy autodidacta, pero sé cuando necesito ayuda, tengo la capacidad de adaptarme a codiciones difíciles o adversas.",
                programminglangs:"Principales lenguajes",
                workexperience:"Experiencial Laboral",
                frameworksandtools:"Durante el tiempo en el que he desarrollado, he aprendido a utilizar una serie de herramientas que facilitan y hacen mas comodo el dessarrollo.",
                frameworksandtoolstitle:"Herramientas y Frameworks",
                languagesandos:"La comunicación es importante, que mejor que poder comunicarse con personas y maquinas.",
                languagesandostitle:"Idiomas y Sistemas Operativos",
                myworktitle:"Mi trabajo",
                myworkdesc:"Desde súper animales hasta robots confundidos, puesdes ver mis proyectos en este enlace",
                mywork:"",
                lastcalltittle:"¡Hey! Espera",
                lastcall:"¿Te gusto mi trabajo? ¿Tienes algun proyecto que desarrollar?",
                name:"Nombre",
                message:"Mensaje",
                sayhello:"Dí Hola",
                followme:"¡Sigueme!",
                sayname:"¿Cuál es tu nombre?",
                saymail:"¿Cuál es tu e-mail?",
                saywhatagain:"Cuentame, ¿Cómo puedo ayudarte?"

            },
        }
    },
    create: function () {
        if (localStorage.getItem("language")!==undefined) {
            this.language = localStorage.getItem("language");
        } else {
            localStorage.setItem("language","en");
            this.language = localStorage.getItem("language");
        }
    },
    mounted: function () {
        if (localStorage.getItem("language")!==undefined) {
            this.language = localStorage.getItem("language");
        } else {
            localStorage.setItem("language","en");
            this.language = localStorage.getItem("language");
        }
    },
    methods: {
        changeLang: function (lang) {
            this.language = lang;
            localStorage.language = this.language;
            return false;
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    console.log("ready");
    app = new Vue({
        mixins: [mixin],
        el: '#app'

    });
    app = new Vue({mixins: [mixin],el: '#app-menu' });
    app = new Vue({mixins: [mixin],el: '#app-intro' });
    app = new Vue({mixins: [mixin],el: '#app-about-me' });
    app = new Vue({mixins: [mixin],el: '#app-tools-title' });
    app = new Vue({mixins: [mixin],el: '#app-tools' });
    app = new Vue({mixins: [mixin],el: '#app-experience' });
    app = new Vue({mixins: [mixin],el: '#app-languages-title' });
    app = new Vue({mixins: [mixin],el: '#app-languages' });
    app = new Vue({mixins: [mixin],el: '#app-work' });
    app = new Vue({mixins: [mixin],el: '#app-contact' });
    app = new Vue({mixins: [mixin],el: '#app-form' });
});
