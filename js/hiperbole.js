; (() => {
    const canvasContainer = document.querySelector("#canvas-container")
    const canvas = document.querySelector(".canvas-container__canvas")
    const centro = document.querySelector("#centro")
    const btnDibujar = document.querySelector("#btn-dibujar")
    const btnAbrirEn = document.querySelector("#btn-abrir-en")
    const radioX = document.querySelector("#radio_x")
    const radioY = document.querySelector("#radio_y")
    const angulo = document.querySelector("#angulo")
    // const radioR = document.querySelector("#radio_r")
    // const x = document.querySelector("#x")
    // const y = document.querySelector("#y")
    const color = document.querySelector("#color")

    const opciones = {
        "true": "horizontal",
        "false": "vertical"
    }

    let vertical = false


    //Escala para que se vea bien el dibujado
    const escala = 10

    const { clientWidth: ancho, clientHeight: alto } = canvasContainer
    const plano = canvas.getContext("2d")

    const pintarPunto = (x = 0, y = 0) => {
        plano.fillRect(x, y, 2, 2)
    }

    const limpiarCanvas = () => {
        canvas.width = ancho
    }

    const iniciarCanvas = (dibujoInicio = false) => {

        canvas.width = ancho;
        canvas.height = alto;

        plano.translate(canvas.width / 2, canvas.height / 2)
        plano.scale(1, -1)


        // para dibidir cuadrantes

        plano.moveTo(0, alto / 2);
        plano.lineTo(0, - (alto / 2));

        plano.moveTo(-ancho / 2, 0);
        plano.lineTo(ancho / 2, 0);

        plano.stroke();

        if (dibujoInicio) {

            //Figura inicial
            formulaGeneral(0, 0, 1, 1, 1, 2, 1)


            // document.querySelector("#maxX").textContent = Math.trunc((ancho / 2) / 10)
            // document.querySelector("#maxY").textContent = Math.trunc((alto / 2) / 10)
            // document.querySelector("#maxRX").textContent = Math.trunc((ancho / 2) / 10)
            // document.querySelector("#maxRY").textContent = Math.trunc((alto / 2) / 10)

        }




    }

    const iniciarRadios = () => {
        radioX.max = Math.trunc((ancho / escala))
        radioX.min = -Math.trunc((ancho / escala))
        radioX.value = 1
        radioX.previousElementSibling.firstElementChild.textContent = 1

        // radioR.max = Math.trunc((ancho / escala) / 2 / 2)
        // radioR.min = -Math.trunc((ancho / escala) / 2 / 2)
        // radioR.step = 1
        // radioR.value = 0
        // radioR.previousElementSibling.firstElementChild.textContent = 0

        x.min = Math.trunc(- (ancho / 2) / escala)
        x.max = Math.trunc((ancho / 2) / escala)
        x.value = 0

        radioY.max = Math.trunc((ancho / escala))
        radioY.min = -Math.trunc((ancho / escala))
        radioY.value = 1
        radioY.previousElementSibling.firstElementChild.textContent = 1

        y.min = Math.trunc(- (alto / 2) / escala)
        y.max = Math.trunc((alto / 2) / escala)
        y.value = 0
    }

    const raiz = (base, raiz) => {
        return Math.pow(base, raiz)
    }


    //Por defecto m y n son igual a 2, y el radio es igual a 1
    const formulaGeneral = (h, k, a, b, r = 1, m = 2, n = 2) => {

        plano.fillStyle = color.value

        // Se multiplica por escala solamente para la escala de dibujo
        h *= escala
        k *= escala
        a *= escala
        b *= escala


        let angl = angulo.value
        let radianes = angl * Math.PI / 180

        let coseno = Math.cos(radianes),
            seno = Math.sin(radianes)

        let inicio = Math.abs(a)
        // Cordenadas Y
        for (let x = -inicio; x <= inicio; x++) {
            const y = raiz((raiz(r, 2) - raiz(x, n) / a) * b, 1 / m)
            // console.log(y)

            console.log(radianes)
            let nX, nY

            nX = x * coseno - y * seno
            nY = x * seno + y * coseno

            pintarPunto(nX + h, nY + k)
            if (angl == 0 && m > n) {
                pintarPunto(nX + h, -nY + k)
            }

        }

        inicio = Math.abs(b)
        // Coordenadas X
        for (let y = -inicio; y <= inicio; y++) {

            const x = raiz((raiz(r, 2) - raiz(y, m) / b) * a, 1 / n)


            let nX, nY

            nX = x * coseno - y * seno
            nY = x * seno + y * coseno

            pintarPunto(nX + h, nY + k)
            if (angl == 0 && n > m) {
                pintarPunto(-nX + h, nY + k)
            }


        }
    }

    const reiniciar = (dibujarInicio = false) => {
        limpiarCanvas()
        iniciarCanvas(dibujarInicio)
    }

    const mostrarRadio = (radio) => {
        radio.previousElementSibling.firstElementChild.textContent = radio.value
        btnDibujar.click()
    }

    const cambiarCentro = () => {
        btnDibujar.click()
    }

    const cambiarRadio = (e) => {
        mostrarRadio(e.target)
    }

    addEventListener("DOMContentLoaded", () => {

        reiniciar(true)
        iniciarRadios()

        centro.addEventListener("submit", (e) => {
            e.preventDefault()

            reiniciar()

            const { x, y, radio_x, radio_y, radio_r } = e.target

            let h = x.value
            let k = y.value
            let a = radio_x.value
            let b = radio_y.value
            // let r = radio_r.value
            /* 
                Para cambiar los radios a y b para que se forme una
                hiperbole en el respectivo eje 
            */

            let m = vertical ? 2 : 1
            let n = vertical ? 1 : 2

            if (!h || !k) {
                return
            }

            formulaGeneral(h, k, a, b, 1, n, m)

        })

        radioX.addEventListener("input", cambiarRadio)

        radioY.addEventListener("input", cambiarRadio)

        // radioR.addEventListener("input", cambiarRadio)

        x.addEventListener("input", cambiarCentro)

        y.addEventListener("input", cambiarCentro)

        angulo.addEventListener("input", cambiarCentro)

        btnAbrirEn.addEventListener("click", ({ target: btn }) => {

            //Se invierte el valor para cambiar el eje de la hiperbole
            vertical = !vertical

            btn.innerText = `Abrir en ${opciones[vertical]}`

            btnDibujar.click()
            btn.blur()
        })

        color.addEventListener("input", () => {
            btnDibujar.click()
        })

    })
})()