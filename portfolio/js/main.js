const keywordRegex = /\%[a-zA-Z09_]+\%/g;

var EventBus = new Vue()

var previewApp = new Vue({
    el: '#item-preview',
    data: {
        visible: false,
        payload: {},
        selectedItem: 0,
        loadingVideo: false,
        language: 'en',
        defaultImageUrl: "images/backgrounds/01.webp",
        content: {
            en: {
                LOADING: 'Loading...'
            },
            es: {
                LOADING: 'Cargando...'
            }
        }
    },
    created() {
        window.addEventListener('keydown', (e) => {

            if (!this.visible)
                return

            if (e.key == 'Escape') {
                this.visible = false
            }

            if ((e.keyCode || e.which) == 39) {
                this.nextElement()
            }
            if ((e.keyCode || e.which) == 37) {
                this.prevElement()
            }

            if ((e.keyCode || e.which) == 38) {
                e.preventDefault()
            }
            if ((e.keyCode || e.which) == 40) {
                e.preventDefault()
            }
        });
    },
    mounted() {
        EventBus.$on('open-preview', (payload) => {
            this.olp(payload)
        })

        EventBus.$on('update-language', (lang) => {
            this.language = lang
        })
    },
    methods: {
        olp: function (context) {
            this.payload = context
            this.visible = true
            this.selectedItem = 0

            this.updateVideoLoading()

            document.documentElement.style.overflow = 'hidden'
            document.body.scroll = "no"
        },
        updateVideoLoading: function () {
            if (this.payload.gallery[this.selectedItem].video) {
                this.loadingVideo = true
            }
        },
        close: function (context) {
            this.visible = false

            document.documentElement.style.overflow = 'auto'
            document.body.scroll = "yes"
            let stateObj = {};
            history.replaceState(stateObj, null, 'index.html');
        },
        nextElement: function () {
            if (this.selectedItem < this.payload.gallery.length - 1) {
                this.selectedItem++
            } else {
                this.selectedItem = 0
            }
            this.updateVideoLoading()
        },
        prevElement: function () {
            if (this.selectedItem > 0) {
                this.selectedItem--
            } else {
                this.selectedItem = this.payload.gallery.length - 1
            }
            this.updateVideoLoading()
        },

        iframeLoaded: function () {
            this.loadingVideo = false;
        }
    }
})

var videoSection = new Vue({
    el: '#video-section',
    data: {
        language: 'en',
        content: {
            es: {
                TITLE: 'Vídeos'
            },
            en: {
                TITLE: 'Videos',
            }
        },
        videos: [
            //'https://www.youtube-nocookie.com/embed/RXnKnn1vSXU',
            'https://www.youtube-nocookie.com/embed/935Y_EXmv5Q',
            'https://www.youtube-nocookie.com/embed/rJN2akh4OCY',
            'https://www.youtube-nocookie.com/embed/Y9rKDw6bKXY',
            //'https://www.youtube-nocookie.com/embed/L36aRfMXzq4',
        ]
    },
    created() {

        EventBus.$on('update-language', (lang) => {
            this.language = lang
        })
    }
})

var galleryApp = new Vue({
    el: '#gallery',
    emits: ['open-preview'],
    data: {
        language: 'en',
        items: [
            {
                requiresFull:false,
                name: 'Wrande',
                image: 'images/wrande/kSzfct.gif',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://myselfxd.itch.io/wrande" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Solo Dev ',
                        roles: 'Programmer C#',
                        body: `Survive waves of monsters that escaped from a laboratory, small enemies are faster than big enemies.
                        <br>
                        <br><strong>Controls:</strong>
                        <br>
                        <br><span class="blue-color">Keyboard</span>
                        <ul>
                        <li>WASD -  Move</li>
                        <li>Mouse - Aim</li>
                        <li>Left click - Left weapon</li>
                        <li>Right click - Right weapon</li>
                        <li>R - Reset/Retry</li>
                        </ul>
                        <br>

                        <span class="blue-color">Gamepad</span>
                        <br>
                        <br>
                        
                        <li>Left stick - Move</li>
                        <li>Right stick - Aim</li>
                        <li>Left trigger - Left  weapon</li>
                        <li>Right trigger - Right weapon</li>
                        <li>Select  - Reset/Retry</li>`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Proyecto en solitario ',
                        roles: 'Programador C#',
                        body: `Sobrevive a oleadas de monstruos que escaparon de un laboratorio, los enemigos chicos son más rápidos que los grandes
                        <br>
                        <br><strong>Controles:</strong>
                        <br>
                        <br><span class="blue-color">Teclado</span>
                        <ul>
                        <li>WASD -  Mover</li>
                        <li>Mouse - Apuntar</li>
                        <li>Clic Izq - Arma Izquierda</li>
                        <li>Clic Der - Arma Derecha</li>
                        <li>R - Reiniciar/Reintentar</li>
                        </ul>
                        <br>

                        <span class="blue-color">Gamepad</span>
                        <br>
                        <br>
                        
                        <li>Palanca Izq - Mover</li>
                        <li>Palanca Der - Apunta</li>
                        <li>Gatillo Izq - Arma Izquierda/li>
                        <li>Gatillo Der - Arma Derecha</li>
                        <li>Select  - Reiniciar/Reintentar</li>.`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2022',
                technologies: ['Unity'],
                gallery: [
                    { video: false, url: 'images/wrande/kSzfct.gif' },
                    { video: false, url: 'images/wrande/qBb1gn.png' },
                    { video: false, url: 'images/wrande/dw4dz+.png' },
                    { video: false, url: 'images/wrande/qBb1gn.png' }
                ]
            },
            {
                requiresFull:false,
                name: 'uTabletop',
                image: 'images/utabletop/utabletop2.png',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://abrahamxd53.github.io/downloads/uTabletop.zip" class="btn btn-secondary big-button">%DOWNLOAD_PC%</a><br>
                        <div class="space-block-small"></div>
                        <a href="https://abrahamxd53.github.io/downloads/uTabletop.apk" class="btn btn-primary big-button">%DOWNLOAD_ANDROID%</a>
                        `,
                content: {
                    en: {
                        part: 'Solo Dev ',
                        roles: 'Programmer C#',
                        body: `Play your favorite boardgames with your friends, up-to 8 players online. Available languages: English, Spanish, Portuguese.<br><br>Crossplatform:<br>
                        <ul><li>Web (Chrome, Opera, Edge)</li><li>Android</li><li>Windows</li>`,
                        download_pc: 'Download (Windows)',
                        download_android: 'Download (Android)'
                    },
                    es: {
                        part: 'Proyecto en solitario ',
                        roles: 'Programador C#',
                        body: `Juega tus favoritos juegos de mesa con hasta 8 jugadores en línea. Idiomas disponibles: Ingles, Español, Portugues.<br><br>Compatible con las siguientes plataformas<br>
                        <ul><li>Web (Chrome, Opera, Edge)</li><li>Android</li><li>Windows</li>`,
                        download_pc: 'Descargar (Windows)',
                        download_android: 'Descargar (Android)',
                    },
                },
                rawBody: '',
                date: '2021',
                technologies: ['Unity', 'Photon 2', 'Webserver'],
                gallery: [
                    { video: false, url: 'images/utabletop/utabletop2.png' },
                    { video: false, url: 'images/utabletop/297384934_477548227057228_2439296579233793083_n.jpg' },
                    { video: false, url: 'images/utabletop/297233204_551717480069482_6271595084088326293_n.jpg' },
                    { video: false, url: 'images/utabletop/297384934_477548227057228_2439296579233793083_n.jpg' },
                    { video: false, url: 'images/utabletop/utabletop6.png' },
                    { video: false, url: 'images/utabletop/utabletop5.png' }
                ]
            },
            {
                requiresFull:false,
                name: 'Brainfuck 2D',
                image: 'images/brainfuck/vAP2fg.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://myselfxd.itch.io/brainfuck-2d" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Solo Dev ',
                        roles: 'Programmer C#',
                        body: `Brainfuck is an esoteric programming language created in 1993 by Urban Müller.<br><br>
                        Now its expanded with a memory matrix and texture mode  where you can draw pixel art with 256 color levels.<br> Two new instructions   ^   (move pointer Up) and v (move pointer Down).`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Proyecto en solitario ',
                        roles: 'Programador C#',
                        body: `Brainfuck es un lenguaje de programación esotérico  creado en 1993 por Urban Müller.<br><br>
                        Ahora con una expansión, matriz de memoria y modo textura donde podrás dibujar pixel art con 256 niveles de color.<br>
                        Dos nuevas instrucciones (^) Mover puntero arriba, (v) Mover puntero abajo.`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2021',
                technologies: ['Unity', 'Brainfuck'],
                gallery: [
                    { video: false, url: 'images/brainfuck/vAP2fg.webp' },
                    { video: false, url: 'images/brainfuck/DD3E+5.webp' },
                    { video: false, url: 'images/brainfuck/KhZS2Q.webp' },
                    { video: false, url: 'images/brainfuck/sFlBcb.webp' }
                ]
            },
            {
                requiresFull:false,
                name: 'Grand Michi Auto',
                image: 'images/gma/gma.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://ggj.s3.amazonaws.com/games/2021/01/64741/exec/KEnRo/g.m.a_pc_and_android.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Meowltiplayer! a game about finding a mischievous cat.<br>Up to five online players<br><br>Android and Windows cross platform.<br><br>Grand Michi Auto`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `Miaultiplayer! un juego sobre encontrar un gato travieso.<br>Hasta 5 jugadores en linea.<br>Disponible para jugar entre plataformas Android y Windows.<br><br>Grand Michi Auto `,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2021',
                technologies: ['Unity', '48 Hours', 'Magica Voxel'],
                gallery: [
                    { video: false, url: 'images/gma/gma_1_31_2021_3_48_24_pm.webp' },
                    { video: false, url: 'images/gma/game.webp' },
                    { video: false, url: 'images/gma/game_over.webp' },
                ]
            },
            {
                requiresFull:false,
                name: 'Baking Crew',
                image: 'images/baking_crew/baking-crew.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://myselfxd.itch.io/baking-crew" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Solo Dev ',
                        roles: 'Programmer C#, 3D Modeler',
                        body: `Welcome to your new kitchen!<br><br>
                        Help the baker to make delicious cookies.<br>
                        Match all the cookies before time runs out.<br>
                        Join the baking crew and unlock new levels with more cookies.`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Proyecto en solitario ',
                        roles: 'Programador C#, Modelador 3D',
                        body: `¡Bienvenido a tu nueva cocina!<br><br>
                        Ayuda al repostero a hornear galletas deliciosas.<br>
                        Junta galletas hasta completar todas antes que el tiempo termine.<br>
                        Únete a la banda de reposteros y desbloquea niveles con más galletas.`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2021',
                technologies: ['Unity', 'Game Jam', 'Magica Voxel'],
                gallery: [
                    { video: true, url: 'https://www.youtube-nocookie.com/embed/-KKmB0qEoJQ' },
                    { video: false, url: 'images/baking_crew/F5LxAU.webp' },
                    { video: false, url: 'images/baking_crew/h6PLKO.webp' },
                    { video: false, url: 'images/baking_crew/s11CAg.webp' },
                ]
            },
            {
                requiresFull:false,
                name: 'Derm Farm',
                image: 'images/derm_farm/derm-farm.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Take care of your sking while growing your own farm.<br>
                        AR Game with hand traking.<br><br>
                        Derm Farm is a game about your skin. Grow amazing crops on your skin and reap the rewards of being fresh.<br>`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `Cuida tu piel mientras creces los cultivos de tu propia granja.<br>
                        Juego de RA con seguimiento de manos.<br><br>
                        Derm Farm es un juego sobre tu piel. Crece cultivos asombrosos en tu piel y recive los premios de tener una piel fresca.`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2020',
                technologies: ['Unity', 'AR'],
                gallery: [
                    { video: false, url: 'images/derm_farm/derm-farm_1.webp' },
                    { video: false, url: 'images/derm_farm/derm-farm_2.webp' },
                    { video: false, url: 'images/derm_farm/derm-farm_3.webp' }
                ]
            },
            {
                requiresFull:false,
                name: 'Fast Fuga',
                image: 'images/fast_fuga/Fast_Fuga-min.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://zhemo17.itch.io/fast-fuga" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Composer',
                        body: `After delivering a delicius food in a misterious laboratory, you'll need to escape before your health runs out<br>
                        Get all required key to unlock the door<br>
                        Blue circles are sefe zones, you health won't be affected there.`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Compositor',
                        body: `Como repartidor, te ha tocado una entrega en un peligroso laboratorio, escapa antes de que se termine tu vida.<br>
                        Recolecta las llaves para desbloquear la salida.<br>
                        Los circulos azules son zonas seguras, ahi tu salud no se verá afectada.`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2020',
                technologies: ['Unity', 'Game Jam'],
                gallery: [
                    { video: false, url: 'images/fast_fuga/Fast_Fuga-min.webp' },
                    { video: false, url: 'images/fast_fuga/Fast_Fuga1-min.webp' },
                    { video: false, url: 'images/fast_fuga/Fast_Fuga2-min.webp' },
                    { video: false, url: 'images/fast_fuga/Fast_Fuga3-min.webp' }
                ]
            },
            {
                requiresFull:false,
                name: 'J-Force',
                image: 'images/j_force/j_force.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://drive.google.com/file/d/1xnNef0TMvbdatM3fWw_auFZbVK0kEHWZ/view?usp=sharing" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Co-operative multiplayer where you have to fix/repair the different machines in order to survive.
                        <br>Coordination and communication will be required!`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `Juego cooperativo multijugador donde tendras que reparar las diferentes maquinas para poder sobrevivir<br>
                        ¡La coordinación y la comunicación lo es todo!`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2020',
                technologies: ['Unity', '48 Hours', 'Multiplayer', 'Split-screen'],
                gallery: [
                    { video: false, url: 'images/j_force/j_force.webp' },
                    { video: false, url: 'images/j_force/j_force1.webp' },
                    { video: false, url: 'images/j_force/j_force2.webp' },
                    { video: false, url: 'images/j_force/j_force3.webp' },
                    { video: false, url: 'images/j_force/j_force4.webp' },
                    { video: false, url: 'images/j_force/j_force5.webp' }
                ]
            },
            {
                requiresFull:false,
                name: 'Jumping Crew',
                image: 'images/jumping_crew/feature.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://play.google.com/store/apps/details?id=com.smokedgames.jumpingcrew" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Solo dev ',
                        roles: 'Programmer C#',
                        body: `Join into the jumping crew!<br>
                        Share adventures with Jimmy and Ritta (more characters will join the crew soon).<br>
                        Get upgrades with in game currency.`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Proyecto en solitario ',
                        roles: 'Programador C#',
                        body: `¡Únete al jumping crew!<br>
                        Comparte aventuras con Jimmy y Ritta (mas personajes se uniran a la pandilla pronto).<br>
                        Adquiere mejoras para tu personaje recolectando monedas en el juego.`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2019',
                technologies: ['Unity', 'Android'],
                gallery: [
                    { video: false, url: 'images/jumping_crew/jumping_crew1.webp' },
                    { video: false, url: 'images/jumping_crew/jumping_crew2.webp' },
                    { video: false, url: 'images/jumping_crew/jumping_crew3.webp' }
                ]
            },
            {
                requiresFull:false,
                name: 'Sprite to 3D',
                image: 'images/sprite_to_3d/animatedpreview.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://myselfxd.itch.io/sprite-to-3d" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Solo dev ',
                        roles: 'Programmer C#',
                        body: `It's a tool that will let you generate 3D models using one image, It works perfectly with pixel art.<br>
                        <br><b>Features:</b>
                        <ul>
                            <li>Export to <b>Obj</b> (Wavefront)</li>
                            <li>Split texture and generate one model by tile.</li>
                            <li>Split texture based on Alpha channel or choose a color</li>
                            <li>Debug mode (Generate only outlines)</li>
                            <li>Set generated 3d model anchor.</li>
                            <li>Customize 3d model depth.</li>
                        </ul>
                        `,
                        download: 'Get it here!'
                    },
                    es: {
                        part: 'Proyecto en solitario ',
                        roles: 'Programmer C#',
                        body: `Es una herremiente que te permitira crear modelos 3d utilizando una imagen, funciona perfectamente con pizel art.<br>
                        <br><b>Caracteristicas:</b>
                        <ul>
                            <li>Exporta en formato <b>Obj</b> (Wavefront)</li>
                            <li>Recorta la textura en mosaicos y genera un modelo por cada cada mosaico</li>
                            <li>Delimita la figura de tu sprite con un color, puede ser transparencia</li>
                            <li>Modo de solo bordes.</li>
                            <li>Establece el origen de los modelos.</li>
                            <li>Añade profundidad a esas texturas.</li>
                        </ul>
                        `,
                        download: '¡Obtenlo aquí!'
                    },
                },
                rawBody: '',
                date: '2019',
                technologies: ['Unity', 'Windows', 'MacOS', 'WinForms', 'OpenGL'],
                gallery: [
                    { video: true, url: 'https://www.youtube-nocookie.com/embed/FVKr4gYC_T4' },
                    { video: false, url: 'images/sprite_to_3d/s23d2.webp' },
                    { video: false, url: 'images/sprite_to_3d/s23d3.webp' },
                    { video: false, url: 'images/sprite_to_3d/s23d4.webp' },
                    { video: false, url: 'images/sprite_to_3d/s23d5.webp' },
                    { video: false, url: 'images/sprite_to_3d/s23d6.webp' }
                ]
            },
            {
                requiresFull:false,
                name: 'House House Revolution',
                image: 'images/house_house_revolution/House_House_Revolution7-min.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://ggj.s3.amazonaws.com/games/2019/01/64741/exec/JyDQg/hhr.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Welcome to the world in 2008, when the houses were abandoned due to the high mortage rates. Your house is now abandoned and needs to compete with others to get a family and become their home.
                        <br><br><b>Controls</b>:
                        <ul>
                            <li><p><b>Keyboard</b>
                                <br>Move: WASD/Arryws
                                <br>Run/Action: Space
                                <br>Reset: R
                                <br>Fire: X/M
                            </p></li>

                            <li><p><b>Gamepad</b>
                                <br>Move: Left joystick
                                <br>Run/Action: A
                                <br>Reset: B
                                <br>Fire: X
                            </p></li>
                        `,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `Bienvenido al mundo en el año 2008, cuando las casas han sido abandonadas por la crisis economica. Tu casa ahora esta abandonada y necesitara competir contra otras para poder ser el hagar de una nueva familia.
                        <br><br><b>Controles</b>:
                        <ul>
                            <li><p><b>Teclado</b>
                                <br>Mover: WASD/Flechas
                                <br>Correr/Acción: Espacio
                                <br>Reiniciar: R
                                <br>Disparar: X/M
                            </p></li>

                            <li><p><b>Mando de juego</b>
                                <br>Mover: Palanca izquierda
                                <br>Correr/Acción: A
                                <br>Reiniciar: B
                                <br>Disparar: X
                            </p></li>`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2019',
                technologies: ['Unity', '48 Hours', 'Multiplayer', 'Split-screen'],
                gallery: [
                    { video: false, url: 'images/house_house_revolution/House_House_Revolution7-min.webp' },
                    { video: false, url: 'images/house_house_revolution/titlescreen_15-min.webp' },
                    { video: false, url: 'images/house_house_revolution/House_House_Revolution1-min.webp' },
                    { video: false, url: 'images/house_house_revolution/House_House_Revolution2-min.webp' },
                    { video: false, url: 'images/house_house_revolution/House_House_Revolution4-min.webp' },
                    { video: false, url: 'images/house_house_revolution/House_House_Revolution5-min.webp' }
                ]
            },
            {
                requiresFull:true,
                name: 'One Last Bullet',
                image: 'images/olb.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://abrahamxd53.github.io/elcactus" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Try to get the hight score, made in a jam updated later, you can see an updated version in the videos section.<br>`,
                        download: 'Play it here!'
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `Trata de obtener la puntuación mas alta, hecho en una jam actualizado un tiempo despues, puede ver una versión actualizada en la sección de videos.<br>`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2018',
                technologies: ['Unity', 'Android'],
                gallery: [
                    { video: false, url: 'images/olb.webp' },
                    { video: true, url: 'https://abrahamxd53.github.io/elcactus/' },
                ]
            },
            {
                requiresFull:false,
                name: 'Terminus',
                image: 'images/terminus/terminus-login.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="terminus.smokedgames.com" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Solo dev ',
                        roles: 'Programmer PHP, JS, MySQL',
                        body: `Add leaderboards, achievements and cloud data storage to your games.<br>
                        It's a good tool to get started with cloud services.
                        This is Terminus, a tool with the power of the cloud for your games.<br>
                        You can create JSON tables, read, save and delete data, with custom scripts.`,
                        download: 'Start here!'
                    },
                    es: {
                        part: 'Proyecto en solitario ',
                        roles: 'Programador PHP, JS, MySQL',
                        body: `Agrega tablas de puntuaciones, logros y almacenamiento de datos en la nube a tus juegos.<br>
                        Buena herramienta para comenzar integrando servicios.<br>
                        Esto es Terminus, la herramienta con la cual podrás agregar el poder de la nube a tus juegos.<br>
                        Puedes crear tablas con datos JSON, Leer, Guardar y Borrar datos de las mismas, todo a través de scripts personalizados.<br>
                        <br>Cuenta de demostración:<br>
                        demo@smokedgames.com:<b>demo1234</b>
                        `,
                        download: '¡Comienza aquí!'
                    },
                },
                rawBody: '',
                date: '2018',
                technologies: ['PHP', 'Rebellion', 'Unity', 'MySQL', 'VueJS'],
                gallery: [
                    { video: false, url: 'images/terminus/terminus-login.webp' },
                    { video: false, url: 'images/terminus/terminus-leaderboards.webp' },
                    { video: false, url: 'images/terminus/terminus-welcome.webp' },
                    { video: false, url: 'images/terminus/terminus-scripts.webp' },
                    { video: false, url: 'images/terminus/terminus-unitysdk.webp' }
                ]
            },
            {
                requiresFull:false,
                name: 'Asada Game Engine',
                image: 'images/asada_game_engine/asada_engine.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>

                        <a href="https://github.com/AbrahamXD53/Asada" class="btn btn-secondary big-button">%DOWNLOAD%</a>
                        <div class="space-block-small"></div>
                        <a href="https://abrahamxd53.github.io/game" class="btn btn-primary big-button">PWA Demo</a><br>
                        `,
                content: {
                    en: {
                        part: 'Solo dev ',
                        roles: 'Programmer JS',
                        body: `This is a 2D oriented WebGL engine.
                        <br><br><b>Features</b>:
                        <ul>
                            <li>Sprites</li>
                            <li>Animated sprites</li>
                            <li>Fonts</li>
                            <li>Lights (Spot, Directional, Point)</li>
                            <li>Tiled maps</li>
                            <li>Layer system</li>
                            <li>Audio support</li>
                            <li>Touch and gamepads support</li>
                            <li>Cameras</li>
                            <li>Scenes</li>
                            <li>Particle system</li>
                            <li>2D Physics (Matterjs)</li>
                            <li>File loader</li>
                        </ul>

                        <br><b>Controls</b>:
                        <ul>
                            <li>A - D: Move big minion</li>
                            <li>SZXC: Move small minion</li>
                            <li>F: Screen-shake</li>
                        </ul>
                        `,
                        download: 'Try it here!'
                    },
                    es: {
                        part: 'Proyecto en solitario ',
                        roles: 'Programador JS',
                        body: `Este es un motor WebGL orientado al 2D.
                        <br><br><b>Caracteristicas</b>:
                        <ul>
                            <li>Sprites</li>
                            <li>Sprites animados</li>
                            <li>Fuentes</li>
                            <li>Luces (Punto, Direccional, Area)</li>
                            <li>Mapas de mozaicos</li>
                            <li>Sistema de capas</li>
                            <li>Soporte para audio</li>
                            <li>Soporte para controles tactiles</li>
                            <li>Camaras</li>
                            <li>Escenas</li>
                            <li>Sistemas de particulas</li>
                            <li>Fisicas 2D (Matterjs)</li>
                            <li>Administrador de archivos</li>
                        </ul>

                        <br><b>Controles</b>:
                        <ul>
                            <li>A - D: Mover al robot grande</li>
                            <li>SZXC: Mover al robot pequeño</li>
                            <li>F: Screen-shake!</li>
                        </ul>`,
                        download: '¡Pruebalo aquí!'
                    },
                },
                rawBody: '',
                date: '2018',
                technologies: ['WebGL', 'JS', 'GLSL'],
                gallery: [
                    { video: false, url: 'images/asada_game_engine/asada_engine.webp' },
                    { video: true, url: 'https://abrahamxd53.github.io/game/' },
                ]
            },
            {
                requiresFull:false,
                name: 'Abyssal Warriors',
                image: 'images/abyssal_warriors/abyssall.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://ggj.s3.amazonaws.com/games/2018/01/64741/exec/CHAWY/release.7z" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `A multiplayer experience.
                        <br>Play as a World War II Submarine and beat enemy ships and submarines searched by radio transmissions.
                        <br>Up to four player!
                        <br><br><b>Controls:</b>
                        <ul>
                            <li><p>Keyborad + Mouse:
                            <br>WASD: Move
                            <br>Mouse + Click: Activate Radio
                            <br>Space: Join/Select
                            <br>R: Restart Game
                            <br>A D: Change Character </p></li>
                            
                            <li><p>Gamepad: 
                            <br>Left joystick: Move 
                            <br>Right joystick: Activate Radio
                            <br>A: Join/Select 
                            <br>Left/Right: Change Character
                            </p></li>
                        </ul>`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `Una experiencia multijugador<br>
                        <br>Juega como un submarino y derrota a otros submarinos enemigos a los cuales deberas detectar y disparar.
                        <br>Hasta 4 jugadores
                        <br><br><b>Controls:</b>
                        <ul>
                            <li><p>Teclado + Ratón:
                            <br>WASD: Moverse
                            <br>Ratón + Clic: Activar Radio
                            <br>Espacio: Unirse/Aceptar
                            <br>R: Reiniciar el juego
                            <br>A D: Cambiar personaje </p></li>
                            
                            <li><p>Mando de juego: 
                            <br>Palanca Izquierda: Moverse 
                            <br>Palanca Derecha: Activar Radio
                            <br>A: Unirse/Aceptar 
                            <br>Izquierda/Derecha: Cambiar personaje
                            </b></li>
                        </ul>
                        `,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2018',
                technologies: ['Unity', '48 Hours', 'Multiplayer', 'Split-screen'],
                gallery: [
                    { video: false, url: 'images/abyssal_warriors/abyssall.webp' },
                    { video: false, url: 'images/abyssal_warriors/abyssal_warriors-min.webp' },
                    { video: false, url: 'images/abyssal_warriors/abyssal_warriors1-min.webp' },
                    { video: false, url: 'images/abyssal_warriors/abyssal_warriors2-min.webp' },
                    { video: false, url: 'images/abyssal_warriors/abyssal_warriors3-min.webp' },
                    { video: false, url: 'images/abyssal_warriors/abyssal_warriors4-min.webp' },
                ]
            },
            {
                requiresFull:false,
                name: 'Better than Nothing',
                image: 'images/better_than_nothing/better_than_nothing.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://ggj.s3.amazonaws.com/games/2017/01/22/2354/setup.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Have fun alone or with your friends exploring underground tombs and finding treasures!
                        <br><b>Instructions:</b> Join then select match (Coop or VS)
                        <br>Up to 4 players! 
                        <br><br><b>Controls:</b>
                        <ul>
                            <li><p>Keyborad + Mouse:
                            <br>WASD: Move
                            <br>Mouse + Click: Send Light
                            <br>Space: Join/Select
                            <br>A D: Change Character </p></li>
                            
                            <li><p>Gamepad: 
                            <br>Left joystick: Move 
                            <br>Right joystick: Send Light
                            <br>A: Join/Select 
                            <br>Left/Right: Change Character
                            </p></li>
                        </ul>
                        `,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `¡Diviertete solo o con amigos, explorando tumbas subterraneas y encontrando tesoros!
                        <br><b>Instrucciones:</b> Join then select match (Coop or VS)
                        <br>Up to 4 players! 
                        <br><br><b>Controles:</b>
                        <ul>
                            <li><p>Teclado + Ratón:
                            <br>WASD: Mover
                            <br>Ratón + Clic: Mandar Luz
                            <br>Espacio: Unirse/Seleccionar
                            <br>A D: Cambiar personaje</p></li>
                            
                            <li><p>Mando de juego: 
                            <br>Palanca izquierda: Mover
                            <br>Palanca derecha: Mandar Luz
                            <br>A: Unirse/Seleccionar
                            <br>Izquierda/Derecha: Cambiar personaje
                            </p></li>
                        </ul>`,
                        download: '¡Decárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2017',
                technologies: ['Unity', 'Android', 'Windows', 'Multiplayer', '48 Hours'],
                gallery: [
                    { video: false, url: 'images/better_than_nothing/better_than_nothing.webp' },
                    { video: false, url: 'images/better_than_nothing/better_than_nothing_a.webp' },
                    { video: false, url: 'images/better_than_nothing/better_than_nothing_b.webp' },
                    { video: false, url: 'images/better_than_nothing/better_than_nothing1.webp' },
                    { video: false, url: 'images/better_than_nothing/better_than_nothing2.webp' },
                    { video: false, url: 'images/better_than_nothing/better_than_nothing3.webp' },
                    { video: false, url: 'images/better_than_nothing/better_than_nothing4.webp' },
                    { video: false, url: 'images/better_than_nothing/better_than_nothing5.webp' },
                ]
            },
            {
                requiresFull:true,
                name: 'Gravity Dreams',
                image: 'images/gravity_dreams/gravity_dreams-min.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://abrahamxd53.github.io/downloads/GravityDreamsAndroid.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Dream about changing the universe.
                        <br>Add and remove planets as you wish to get the little ship to its destiny.`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Sueña con cambiar el universo.
                        <br>Crea y elimina planetas a tu gusto para llevar la pequeña nave a su destino.`,
                        download: '¡Descargalo aquí (Android)!'
                    },
                },
                rawBody: '',
                date: '2016',
                technologies: ['Unity', 'Prototype', 'Android', '24 Hours',],
                gallery: [
                    { video: false, url: 'images/gravity_dreams/gravity_dreams-min.webp' },
                    { video: false, url: 'images/gravity_dreams/gravity_dreams1-min.webp' },
                    { video: false, url: 'images/gravity_dreams/gravity_dreams2-min.webp' },
                    { video: false, url: 'images/gravity_dreams/gravity_dreams3-min.webp' }
                ]
            },
            {
                requiresFull:false,
                name: 'Run \'em over',
                image: 'images/run_em_over/155082-v3.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://abrahamxd53.github.io/downloads/Runemover.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Drive over as many pedestrians as you can in 1 minute, collect several power-ups and try to get the high score online.<br>
                        Made for Indies vs Gamers jam. <br>Connect with your game jolt account to register your high-scores online.`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Conduce sobre tantos peatones como puedas en un minuto, obten las distintas mejoras y trata de obtener la mejor puntuación en línea.
                        <br>Hecho para la jam de Idies vs Gamers.
                        <br>Conecta con tu cuenta de Gamejolt para registras tu puntuación en línea`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2015',
                technologies: ['Unity', 'Gamejolt', 'Game Jam'],
                gallery: [
                    { video: false, url: 'images/run_em_over/155082-v3.webp' },
                    { video: false, url: 'images/run_em_over/rmo.webp' },
                    { video: false, url: 'images/run_em_over/rmo1.webp' },
                    { video: false, url: 'images/run_em_over/rmo2.webp' },
                    { video: false, url: 'images/run_em_over/rmo3.webp' },
                    { video: false, url: 'images/run_em_over/rmo4.webp' },
                    { video: false, url: 'images/run_em_over/rmo5.webp' },
                ]
            },

            {
                requiresFull:true,
                name: 'Animal Mess',
                image: 'images/animal_mess/animalmess-min.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://ggj.s3.amazonaws.com/games/2015/01/27/0209/Game.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Three friends get lost in a forbiden zone controled by evil crocodiles. Try to escape before they catch you.
                        <br>Every character has its own skill, combine their skill to escape from the level
                        <br><br><b>Skills:</b>
                        <ul>
                            <li>Fish: (Pasive) Open doors</li>
                            <li>Rabitt: Lift charge</li>
                            <li>Cat: Place bait</li>
                        </ul>
                        <b>Controls:</b>
                        <ul>
                            <li>Tab: Change character</li>
                            <li>Click Left/Right: Change camera angle</li>
                            <li>Espacio: Start/Use skill</li>
                            <li>WASD: Move character</li>
                        </ul>`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `Todo comenzó una noche donde 3 amigos animales poco convencionales se unen para aventurarse a la zona que ha estado prohibida durante muchos años ya que una familia de cocodrilos se apoderaron de esa zona.
                        <br>Cada uno de estos animales poseen una habilidad con la que juntos podrán recuperar el lugar que les pertenece.
                        <br><br><b>Habilidades:</b>
                        <ul>
                            <li>Pez: (Pasiva) Abrir puertas</li>
                            <li>Conejo: Levantar carga</li>
                            <li>Gato: Plantar cebo</li>
                        </ul>
                        <b>Controles:</b>
                        <ul>
                            <li>Tab: Cambiar personaje</li>
                            <li>Clic izq/der: Cambiar angulo</li>
                            <li>Espacio: Comenzar/Utilizar habilidad</li>
                            <li>WASD: Mover personaje</li>
                        </ul>
                        `,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2015',
                technologies: ['Unity', '48 Hours'],
                gallery: [
                    { video: false, url: 'images/animal_mess/animalmess-min.webp' },
                    { video: false, url: 'images/animal_mess/animalmess1-min.webp' },
                    { video: false, url: 'images/animal_mess/animalmess2-min.webp' },
                    { video: false, url: 'images/animal_mess/animalmess3-min.webp' },
                    { video: false, url: 'images/animal_mess/animalmess4-min.webp' },
                ]
            },

            //Animal mess

            {
                requiresFull:true,
                name: 'A Simple Game',
                image: 'images/a_simple_game/simple_game.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://abrahamxd53.github.io/downloads/ASimpleGame.zip" class="btn btn-primary big-button">%DOWNLOAD_ANDROID%</a>
                        <div class="space-block-small"></div>
                        <a href="https://abrahamxd53.github.io/downloads/ASimpleGameAndroid.zip" class="btn btn-secondary big-button">%DOWNLOAD_PC%</a><br>
                        `,
                content: {
                    en: {
                        part: 'Solo dev ',
                        roles: 'Programmer C#',
                        body: `Compete against other players to capture all monsters.
                        <br>Cross-play, play with Android and PC, up to 32 players.
                        <br>Android touch controls`,
                        download_android: 'Android version here!',
                        download_pc: 'PC version here!'
                    },
                    es: {
                        part: 'Proyecto en solitario ',
                        roles: 'Programador C#',
                        body: `Compite contra otros jugadores por capturar todos los monstruos.
                        <br>Juego entre plataformas, juega con Android o PC con hasta 32 jugadores.
                        <br>Soporte de controles tactiles para Android`,
                        download_android: 'Juego para Android',
                        download_pc: 'Juego para PC'
                    },
                },
                rawBody: '',
                date: '2014',
                technologies: ['Unity', 'Android', 'Windows', 'Crossplay', 'Online'],
                gallery: [
                    { video: false, url: 'images/a_simple_game/simple_game.webp' },
                    { video: false, url: 'images/a_simple_game/simple_game1.webp' },
                    { video: false, url: 'images/a_simple_game/simple_game2.webp' },
                    { video: false, url: 'images/a_simple_game/simple_game3.webp' },
                    { video: false, url: 'images/a_simple_game/simple_game4.webp' }
                ]
            },
            {
                requiresFull:false,
                name: 'Fallen Robot',
                image: 'images/fallen_robot/FallenRobot-min.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://ggj.s3.amazonaws.com/games/2014/01/27/1440/FallenRobot.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `A robot crashed on a town called "Guevaria."
                        <br>Villagers are very kind with it ans start to ask to do some task when they are in trouble.
                        <br>Vallagers task after some time become jus caprices, so there is something that is telling the robot that it's doing evil things.
                        <br><br><b>Controls:</b>
                        <ul>
                            <li>E: Interact/Start</li>
                            <li>Mouse: Camera</li>
                            <li>WASD: Move</li>
                            <li>Space: Jump</li>
                        </ul>`
                        , download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como  ',
                        roles: 'Programador C#',
                        body: `Un robot llega de forma inesperada al pueblo llamado "Guevaria".
                        <br>Los aldeanos reciben calurosamente al robot y empiezan a recurrir a el cuando están en problemas.
                        <br>Los favores que los aldeanos le piden se van convirtiendo en caprichos, pero hay algo en el robot que le dice que lo que está haciendo está mal.
                        <br><br><b>Controles:</b>
                        <ul>
                            <li>E: Interactuar/Comenzar</li>
                            <li>Mouse: Camara</li>
                            <li>WASD: Mover</li>
                            <li>Espacio: Saltar</li>
                        </ul>`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2014',
                technologies: ['Unity', 'Windows', '48 Hours',],
                gallery: [
                    { video: false, url: 'images/fallen_robot/FallenRobot-min.webp' },
                    { video: false, url: 'images/fallen_robot/FallenRobot1-min.webp' },
                    { video: false, url: 'images/fallen_robot/FallenRobot2-min.webp' },
                    { video: false, url: 'images/fallen_robot/FallenRobot3-min.webp' },
                    { video: false, url: 'images/fallen_robot/FallenRobot4-min.webp' },
                    { video: false, url: 'images/fallen_robot/FallenRobot5-min.webp' },
                    { video: false, url: 'images/fallen_robot/FallenRobot6-min.webp' },
                ]
            },
            {
                requiresFull:false,
                name: 'Super Aventura Animal',
                image: 'images/super_aventura_animal/saa-min.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://abrahamxd53.github.io/downloads/SAA.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Follow Juanito and Juanita on an incredible adventure, in an increble world, take pictures of animals on each level, and run with you favorite animal to meet an ancient dragon.
                        <br<br><b>Controls:</b>
                        <ul>
                            <li>Mouse: Camera</li>
                            <li>T: Open Camera</li>
                            <li>Mouse Click: (Camera mode) Take picture</li>
                            <li>WASD: Move</li>
                            <li>Shift: Run</li>
                            <li>Space: Jump</li>
                        </ul>`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como  ',
                        roles: 'Programador C#',
                        body: `Acompaña a Juanito y Juanita en una increible aventura, en un mundo increible, toma fotos de los animales en cada nivel y corre con un aliado para conocer al antiguo dragón.
                        <br<br><b>Controles:</b>
                        <ul>
                            <li>Mouse: Cámara</li>
                            <li>T: Abrir Cámera</li>
                            <li>Mouse Clic: (Modo Cámara) Tomar foto</li>
                            <li>WASD: Mover</li>
                            <li>Shift: Correr</li>
                            <li>Espacio: Saltar</li>
                        </ul>`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2013',
                technologies: ['Unity', 'Windows'],
                gallery: [
                    { video: false, url: 'images/super_aventura_animal/saa-min.webp' },
                    { video: false, url: 'images/super_aventura_animal/saa1-min.webp' },
                    { video: false, url: 'images/super_aventura_animal/saa2-min.webp' },
                    { video: false, url: 'images/super_aventura_animal/saa3-min.webp' },
                    { video: false, url: 'images/super_aventura_animal/saa4-min.webp' },
                    { video: false, url: 'images/super_aventura_animal/saa5-min.webp' },
                    { video: false, url: 'images/super_aventura_animal/saa6-min.webp' },
                    { video: false, url: 'images/super_aventura_animal/saa7-min.webp' },
                    { video: false, url: 'images/super_aventura_animal/saa8-min.webp' },
                    { video: false, url: 'images/super_aventura_animal/saa9-min.webp' },
                ]
            },



            {
                requiresFull:true,
                name: 'Mi pobre corazoncito',
                image: 'images/my_poor_little_heart/mpc.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://abrahamxd53.github.io/downloads/MPCRelease.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Deffend your poor little heart before a it gets a heart attack!
                        <br>With your allies "Paka Pakapsules", thay will help you to stop the different diseases.
                        <br><br><b>Controls (Menu):</b>
                        <ul>
                            <li>A - D: Move</li>
                            <li>Space: Ok</li>
                            <li>Escape: Back</li>
                        </ul>`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `¡Defiende tu corazón antes de que te de un infarto!
                        <br>Claro, usa las pildoras "Paka Pakapsula", te ayudarán para defenderte de los "Tapa-arterias"
                        <br><br><b>Controles (Menú):</b>
                        <ul>
                            <li>A - D: Mover</li>
                            <li>Espacio: Aceptar</li>
                            <li>Escape: Atras</li>
                        </ul>`,
                        download: 'Download it here!'
                    },
                },
                rawBody: '',
                date: '2013',
                technologies: ['Unity', 'Windows', '48 Hours'],
                gallery: [
                    { video: false, url: 'images/my_poor_little_heart/mpc.webp' },
                    { video: false, url: 'images/my_poor_little_heart/mpc_team.webp' },
                    { video: false, url: 'images/my_poor_little_heart/mpc_1.webp' },
                    { video: false, url: 'images/my_poor_little_heart/mpc2.webp' },
                ]
            },

            {
                requiresFull:true,
                name: 'Shoot the Zombie',
                image: 'images/shoot_the_zombie/stz.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        <a href="https://abrahamxd53.github.io/downloads/STZ.zip" class="btn btn-primary big-button">%DOWNLOAD%</a>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Survive the zombie apocalypse, find all the weapons and destroy the boss.
                        <br><a href="https://www.microsoft.com/en-us/download/details.aspx?id=20914" >Requires XNA Framework Redistributable</a> 
                        <br><b>Requires a Xbox 360 gamepad to play, it may be a generic one.</b>
                        <br><br><b>Controls:</b>
                        <ul>
                            <li>Back + Start: Skip story</li>
                            <li>Left stick: Move</li>
                            <li>LB/RB: Change weapon</li>
                            <li>Right stick: Shot/Throw granade</li>
                            <li>Right trigger: Active grenade mode (Once you've collected grenades).</li>
                        </ul>`,
                        download: 'Download it here!'
                    },
                    es: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Sobrevive al apocalipsis zombie, encuentra las armas y destruye al jefe zombie.
                        <br><a href="https://www.microsoft.com/en-us/download/details.aspx?id=20914" >Requiere XNA Framework Redistributable</a> 
                        <br><b>Require un control de Xbox, puede ser genérico</b>
                        <br><br><b>Controles:</b>
                        <ul>
                            <li>Back + Start: Saltar historia</li>
                            <li>Palanca izquierda: Mover</li>
                            <li>LB/RB: Cambiar arma</li>
                            <li>Palanca derecha: Disparar/Aventar granada</li>
                            <li>Gatillo derecho + : Activa el modo granadas (Sí se recolecto antes)</li>
                        </ul>`,
                        download: '¡Descárgalo aquí!'
                    },
                },
                rawBody: '',
                date: '2012',
                technologies: ['XNA', 'Windows', 'Xbox 360', 'XBLA'],
                gallery: [
                    { video: false, url: 'images/shoot_the_zombie/stz.webp' },
                    { video: false, url: 'images/shoot_the_zombie/stz1.webp' },
                    { video: false, url: 'images/shoot_the_zombie/stz2.webp' },
                    { video: false, url: 'images/shoot_the_zombie/stz3.webp' }
                ]
            },

        ],
        content: {
            en: {
                MORE: 'More',
                TITLE: ' Projects with demos'
            },
            es: {
                MORE: 'Más',
                TITLE: ' Proyectos con demos'
            }
        }
    },
    mounted() {
        this.updateLanguage()

        EventBus.$on('update-language', (lang) => {
            this.language = lang
            this.updateLanguage()
        })

        let urlSearchParams = new URLSearchParams(window.location.search)
        let params = Object.fromEntries(urlSearchParams.entries())

        if (params.hasOwnProperty('gallery')) {
            let id = params['gallery']
            if (id >= 0 && id < this.items.length) {
                document.getElementById('g' + id).scrollTo();
                this.openPreview(this.items[id])
            }
        }

        if(params.hasOwnProperty('full')){
            this.items.forEach(element => {
                element.requiresFull = false;
            });
        }
    },
    methods: {
        updateLanguage: function () {

            for (const key in this.items) {
                if (this.items.hasOwnProperty(key)) {
                    this.items[key].rawBody = this.items[key].template
                    while (m = keywordRegex.exec(this.items[key].rawBody)) {
                        let keyName = m[0].substring(1, m[0].length - 1).toLowerCase()
                        this.items[key].rawBody = this.items[key].rawBody.replace(m[0], this.items[key].content[this.language][keyName])
                    }
                }
            }
        },
        openPreview: function (context, id = -1) {
            EventBus.$emit('open-preview', context)

            if (id >= 0) {
                let queryParams = new URLSearchParams(window.location.search)
                queryParams.set('gallery', id)
                history.replaceState(null, null, "?" + queryParams.toString())
            }
        }
    }
})

var proyectData = new Vue({
    el: '#gallery-simple',
    emits: ['open-preview'],
    data: {
        language: 'en',
        items: [
            {
                name: 'FEVR',
                image: 'images/fevr/FEVR.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `In an urban exploration you have lost your friend, now you have to find him and try to escape avoiding to get lost in this mysterious mansion, that will be waiting for your.`,
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `Durante una exploracion urbana a una vieja mansión has perdido a tu amigo, ahora deberas encontrarlo y evitar perderte en una antigua mansión que estará a la espera de que te descuides un poco.`,
                    },
                },
                rawBody: '',
                date: '2017',
                technologies: ['Unity', 'Windows', 'Oculus Rift'],
                gallery: [
                    { video: true, url: 'https://www.youtube-nocookie.com/embed/eLI3llXzirs' },
                    { video: false, url: 'images/fevr/FEVR.webp' },
                    { video: false, url: 'images/fevr/fevr_menu.webp' }
                ]
            },

            {
                name: 'GASH AR',
                image: 'images/gash_collectables/gash.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Unlock a new item every month!,
                        <br>Find your codes in your favorite products.
                        <br>Share your collection with other players or in social networks.`,
                    },
                    es: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `¡Desbloquea cada mes un nuevo artículo para tu colección!<br>
                        Encuentra los códigos en los empaques de tus productos favoritos.<br>
                        Comparte tu colección con otros jugadores o en tus redes sociales.`,
                    },
                },
                rawBody: '',
                date: '2017',
                technologies: ['Unity', 'Android', 'Vuforia', 'Back4App', 'Facebook SDK'],
                gallery: [
                    { video: false, url: 'images/gash_collectables/gash.webp' },
                    { video: false, url: 'images/gash_collectables/gash1.webp' },
                    { video: false, url: 'images/gash_collectables/gash2.webp' },
                    { video: false, url: 'images/gash_collectables/gash3.webp' },
                    { video: false, url: 'images/gash_collectables/gash4.webp' },
                    { video: false, url: 'images/gash_collectables/gash5.webp' },
                ]
            },

            {
                name: 'AR Showcase',
                image: 'images/ar_showcase/ajba_ar.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `AR Showcase with customizations (rotation, scale, position, color customizations).<br>
                        Torch-Light and custom markers avaliables.`
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programmer C#',
                        body: `Exhibición de RA con personalizaciones (rotación, escala, posición, variaciones de color).<br>
                        Linterna y marcadores personalizados disponibles para su uso en la appliación.`
                    },
                },
                rawBody: '',
                date: '2017',
                technologies: ['Unity', 'Android', 'Vuforia'],
                gallery: [
                    { video: false, url: 'images/ar_showcase/ajba_ar.webp' },
                    { video: false, url: 'images/ar_showcase/ajba_ar1.webp' },
                    { video: false, url: 'images/ar_showcase/ajba_ar2.webp' },
                    { video: false, url: 'images/ar_showcase/ajba_ar3.webp' },
                    { video: false, url: 'images/ar_showcase/ajba_ar4.webp' }
                ]
            },

            {
                name: 'Futbolopolis',
                image: 'images/futbolopolis/fubolopolis.webp',
                template: `<p class="justify">%PART% <span class="blue-color"><b>%ROLES%</b></span><br><br>
                            %BODY%
                        </p>
                        <div class="space-block"></div>
                        `,
                content: {
                    en: {
                        part: 'Participated as ',
                        roles: 'Programmer C#',
                        body: `Manage yout own soccer team and even better your own city!
                        <br>Compete against other players online.
                        <br>Manage your team, fire and hire new soccer players.
                        <br>Travel to new worlds with new abilities.`,
                    },
                    es: {
                        part: 'Participé como ',
                        roles: 'Programador C#',
                        body: `!Administra tu propio equipo de fútbol y mucho mejor administra tu propia ciudad!
                        <br>Compite contra otros jugadores en línea.
                        <br>Administra tu equipo, despide y contrata nuevos jugadores.
                        <br>Viaja hacia otros mundos con nuevas habilidades`,
                    },
                },
                rawBody: '',
                date: '2016',
                technologies: ['Unity', 'Android', 'Corona SDK'],
                gallery: [
                    { video: false, url: 'images/futbolopolis/fubolopolis.webp' },
                    { video: false, url: 'images/futbolopolis/screen-1.webp' },
                    { video: false, url: 'images/futbolopolis/screen-5.webp' },
                    { video: false, url: 'images/futbolopolis/screen-7.webp' }
                ]
            }
        ],
        content: {
            en: {
                MORE: 'More',
                TITLE: ' Projects without demos'
            },
            es: {
                MORE: 'Más',
                TITLE: ' Proyectos sin demos'
            }
        }
    },
    mounted() {
        this.updateLanguage()

        EventBus.$on('update-language', (lang) => {
            this.language = lang
            this.updateLanguage()
        })

        let urlSearchParams = new URLSearchParams(window.location.search)
        let params = Object.fromEntries(urlSearchParams.entries())

        if (params.hasOwnProperty('project')) {
            let id = params['project']
            if (id >= 0 && id < this.items.length) {
                document.getElementById('p' + id).scrollTo();
                this.openPreview(this.items[id])
            }
        }
    },
    methods: {
        updateLanguage: function () {

            for (const key in this.items) {
                if (this.items.hasOwnProperty(key)) {
                    this.items[key].rawBody = this.items[key].template
                    while (m = keywordRegex.exec(this.items[key].rawBody)) {
                        let keyName = m[0].substring(1, m[0].length - 1).toLowerCase()
                        this.items[key].rawBody = this.items[key].rawBody.replace(m[0], this.items[key].content[this.language][keyName])
                    }
                }
            }
        },
        openPreview: function (context, id) {
            EventBus.$emit('open-preview', context)

            if (id >= 0) {
                let queryParams = new URLSearchParams(window.location.search)
                queryParams.set('project', id)
                history.replaceState(null, null, "?" + queryParams.toString())
            }
        }
    }
})

var experienceApp = new Vue({
    el: '#work-experience',
    data: {
        language: 'en',
        content: {
            en: {
                CURRENT: 'Current',
                WORK_TITLE: 'Work Experience',
                JOBS: [
                    {
                        TITLE: 'Lead Game Developer - Bowhead Health',
                        START: 'Feb 2022',
                        END: false,
                        DESCRIPTION: `Game development, native mobile plugin development, fast prototype development.
                        <br>Third Party plugin integration (Firebase, Google Fit, Apple Health, Branch.io, Bytebrew)
                        <br><span class="work-skills">C#, Unity, Java, Swift, Metamask, ETH Blockchain</span><br>`
                    },
                    {
                        TITLE: 'Full Stack Developer - Gameloft',
                        START: 'Apr 2018',
                        END: 'Feb 2022',
                        DESCRIPTION: `Developed and implemented solutions for international game distribution.
                        <br>Subscriptions, on-deman content, payment validations.
                        <br><span class="work-skills">PHP, MySQL, JS, CSS, HTML</span><br>`
                    },
                    {
                        TITLE: 'Research & Development - Gameloft',
                        START: 'Sep 2017',
                        END: 'Apr 2018',
                        DESCRIPTION: `iOS Game support, including porting games from x86 to x64. <br>
                        Game bug fixes and update code base.
                        <br><span class="work-skills">C++, Objetive-C, GLSL</span><br>`
                    },
                    {
                        requiresFull:true,
                        TITLE: 'Back-end Developer - AORI Brand Media',
                        START: 'Sep 2016',
                        END: 'Sep 2017',
                        DESCRIPTION: `Built cross platform solutions for Android and iOS.<br>
                        Hybrid mobile app development.
                        <br><span class="work-skills">PHP, Laravel, MySQL, Ionic</span>`
                    }
                ]
            },
            es: {
                CURRENT: 'Actualidad',
                WORK_TITLE: 'Experiencia Laboral',
                JOBS: [
                    {
                        TITLE: 'Líder Desarrollador de Juegos - Bowhead Health',
                        START: 'Feb 2022',
                        END: false,
                        DESCRIPTION: `Desarrollo de juegos, Desarrollo de plugins nativos, desarrollo rápido de prototipos.
                        <br>Integración de herreamientas de terceros (Firebase, Google Fit, Apple Health, Branch.io, Bytebrew)
                        <br><span class="work-skills">C#, Unity, Java, Swift, Metamask, ETH Blockchain</span><br>`
                    },
                    {
                        TITLE: 'Desarrollador Full Stack - Gameloft',
                        START: 'Abr 2018',
                        END: 'Feb 2022',
                        DESCRIPTION: `Desarrollar e impementar soluciones para la distribución de juegos a nivel internacional.
                        <br>Suscripciones, contenido bajo demanda, validación de pagos.
                        <br><span class="work-skills">PHP, MySQL, JS, CSS, HTML</span><br>`
                    },
                    {
                        TITLE: 'Investigación y Desarrollo - Gameloft',
                        START: 'Sep 2017',
                        END: 'Abr 2018',
                        DESCRIPTION: `iOS soporte a juegos, incluido actualizar el código de plataformas x86 a x64.<br>
                        Corrección de errores y actualización del código base.
                        <br><span class="work-skills">C++, Objetive-C, GLSL</span><br>`
                    },
                    {
                        requiresFull:true,
                        TITLE: 'Desarollador Back-end - AORI Brand Media',
                        START: 'Sep 2016',
                        END: 'Sep 2017',
                        DESCRIPTION: `Desarrollo de soluciones multiplataforma para Android y iOS.<br>
                        Desarrollo de aplicaciones hibrídas.
                        <br><span class="work-skills">PHP, Laravel, MySQL, Ionic</span>`
                    }
                ]
            }
        }
    },
    created() {

        EventBus.$on('update-language', (lang) => {
            this.language = lang
        })
    },
    mounted(){
        let urlSearchParams = new URLSearchParams(window.location.search)
        let params = Object.fromEntries(urlSearchParams.entries())

        if(params.hasOwnProperty('full')){
            this.content['en']['JOBS'][3].requiresFull = false;
            this.content['es']['JOBS'][3].requiresFull = false;
        }
    }
})


var experienceApp = new Vue({
    el: '#education',
    data: {
        language: 'en',
        content: {
            en: {
                CURRENT: 'Current',
                EDUCATION_TITLE: 'Education',
                EDUCATION: [
                    {
                        TITLE: 'Bachelor\'s degree of Software Development Engineer',
                        START: 'Aug 2013',
                        END: 'Jul 2017',
                        DESCRIPTION: `CETI (Centro de Enseñanza Técnica Industrial).<br>`
                    },
                    {
                        TITLE: 'Technician degree of Software Development',
                        START: 'Aug 2009',
                        END: 'Jul 2013',
                        DESCRIPTION: `CETI (Centro de Enseñanza Técnica Industrial).<br>`
                    }
                ]
            },
            es: {
                CURRENT: 'Actualidad',
                EDUCATION_TITLE: 'Educación',
                EDUCATION: [
                    {
                        TITLE: 'Ing. en Desarrollo de Software',
                        START: 'Ago 2013',
                        END: 'Jul 2017',
                        DESCRIPTION: `CETI (Centro de Enseñanza Técnica Industrial).<br>`
                    },
                    {
                        TITLE: 'Tecnólogo en Informática y Computación',
                        START: 'Ago 2009',
                        END: 'Jul 2013',
                        DESCRIPTION: `CETI (Centro de Enseñanza Técnica Industrial).<br>`
                    }
                ]
            }
        }
    },
    created() {

        EventBus.$on('update-language', (lang) => {
            this.language = lang
        })
    }
})

var footerApp = new Vue({
    el: '#footer-app',
    data: {
        language: 'en',
        year: (new Date()).getFullYear(),
        content: {
            en: {
                BODY: `Mario character is property of Nintendo, all logos are property of their respective companies and its use in this page is merely illustrative.`
            },
            es: {
                BODY: `El personaje de Mario es propiedad de Nintendo, todo los logos y marcas son propiedad de sus respectivas compañias y su uso en este sitio es meramente ilustrativo.`
            }
        }
    },
    created() {

        EventBus.$on('update-language', (lang) => {
            this.language = lang
        })
    }
})


var profileApp = new Vue({
    el: '#profile',
    emits: ['update-language'],
    data: {
        language: 'en',
        theme: 'dark',
        content: {
            en: {
                OTHER_LANGUAJE: 'Español',
                DEV_TITLE: 'Lead Game Developer',
                BODY: `I love games and technology, I like to be part of games that make great experiences and
                memories in players around the world.`,
                LANGUAGES: 'Languages',
                SPANISH: 'Spanish',
                ENGLISH: 'English',
                SKILLS: 'Languages and tools',
                light: 'Dark',
                dark: 'Light'

            },
            es: {
                OTHER_LANGUAJE: 'English',
                DEV_TITLE: 'Líder Desarrollador de videojuegos',
                BODY: `Me encantan los juegos y la tecnología, me gusta ser parte de juegos que crean grandes experiencias y memorias para los jugadores del mundo.`,
                LANGUAGES: 'Idiomas',
                SPANISH: 'Español',
                ENGLISH: 'Inglés',
                SKILLS: 'Lenguajes y herramientas',
                light: 'Oscuro',
                dark: 'Claro'
            }
        },
        skills: [
            { name: 'Unity', class: 'devicon-unity-original', hovered: false },
            { name: 'C#', class: 'devicon-csharp-plain', hovered: false },
            { name: 'C++', class: 'devicon-cplusplus-plain', hovered: false },
            { name: 'JS', class: 'devicon-javascript-plain', hovered: false },
            { name: 'Vue.js', class: 'devicon-vuejs-plain', hovered: false },
            { name: 'CSS3', class: 'devicon-css3-plain', hovered: false },
            { name: 'PHP', class: 'devicon-php-plain', hovered: false },
            { name: 'Android', class: 'devicon-android-plain', hovered: false },
            { name: 'MySQL', class: 'devicon-mysql-plain', hovered: false },
            { name: 'Laravel', class: 'devicon-laravel-plain', hovered: false },
        ]
    },
    created() {
        EventBus.$on('update-language', (lang) => {
            this.language = lang
            localStorage.language = lang
        })
    },
    mounted() {
        if (localStorage.language) {
            if (localStorage.language == 'es' || localStorage.language == 'en') {
                EventBus.$emit('update-language', localStorage.language)
            }

        }
        if (localStorage.theme) {
            if (localStorage.theme == 'dark' || localStorage.theme == 'light') {
                this.setTheme(localStorage.theme);
            }
        }
    },
    methods:
    {
        changeLanguage: function () {
            if (this.language == 'es') {
                EventBus.$emit('update-language', 'en')
            }
            else {
                EventBus.$emit('update-language', 'es')
            }
        },
        setTheme: function (themeName) {
            this.theme = themeName;
            document.getElementById('dark').rel = 'stylesheet alternate';
            document.getElementById('light').rel = 'stylesheet alternate';
            document.getElementById(this.theme).rel = 'stylesheet';
        },
        changeTheme: function () {
            console.log(document.getElementById('dark'));
            document.getElementById(this.theme).rel = 'stylesheet alternate';
            this.theme = this.theme == 'dark' ? 'light' : 'dark';
            document.getElementById(this.theme).rel = 'stylesheet';
            localStorage.theme = this.theme;
        }
    }
})