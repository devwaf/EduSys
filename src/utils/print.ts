let embed:HTMLEmbedElement
export function printPDF(path:string){
    embed = document.createElement("embed")
    // TODO bug pdf打印弹窗预览不了
    embed.src = path.replace(/\\/g,"/")
    embed.style.position = "fixed"
    embed.style.top = "0"
    embed.style.left = "0"
    embed.style.width = "100%"
    embed.style.height = "100vh"
    embed.style.zIndex = "999"
    document.body.appendChild(embed)

    window.addEventListener("beforeprint",beforeprint)
    window.addEventListener("afterprint",afterprint)
    window.print()
}

function beforeprint(){
    let app = document.getElementById("app")
    app.style.visibility = "hidden"
}

function afterprint(){
    let app = document.getElementById("app")
    app.style.visibility = "visible"
    if(embed){
        document.body.removeChild(embed)
    }
    embed = null
    window.removeEventListener("beforeprint",beforeprint)
    window.removeEventListener("afterprint",afterprint)
}