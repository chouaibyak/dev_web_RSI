function Executer() { 
    let html = document.getElementById('codehtml').value; 
    let css  = document.getElementById('codecss').value; 
    let js   = document.getElementById('codejs').value; 
            
    let contenu = ` 
        <!DOCTYPE html> 
        <html> 
        <head> 
            <style>${css}</style> 
        </head> 
        <body> 
            ${html} 
            <script>${js}<` + `/script> 
        </body> 
        </html> 
        `;
            
        let frame = document.getElementById('apercu'); 
        frame.contentDocument.open(); 
        frame.contentDocument.write(contenu); 
        frame.contentDocument.close(); 
}