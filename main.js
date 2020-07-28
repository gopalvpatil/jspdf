window.create_zip = function() {
    var pdf = new jsPDF('p', 'pt', 'a4');
    addHtml(document.getElementById('tables').outerHTML, pdf).then(function(){
        var zip = new JSZip();
      zip.file("zipped.pdf", pdf.output());
      zip.generateAsync({
        type: "blob"
      })
        .then(function(content) {
        saveAs(content, "example.zip");
      });
    });
  }
  
  window.create_pdf = function() {
    var pdf = new jsPDF('p', 'pt', 'a4');
    addHtml(document.getElementById('tables').outerHTML, pdf).then(function(){
        pdf.save('original.pdf');
    });
  }
  
  
  function addHtml(html, doc) {
    var canvas = doc.canvas;
    canvas.pdf = doc;
  
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
    var div = document.createElement('div');
    div.setAttribute('style','position:fixed;left:15px; top:15px; display: none');
    div.setAttribute('id', 'hidden_div_123');
    document.body.insertBefore(div, document.body.firstChild);
    div.insertAdjacentHTML('beforeend', html);
    
    // Replace spaces with non-breaking space (nbsp)
    var tags = div.getElementsByTagName('*');
    for(var i = 0; i < tags.length; i++){
      if (tags[i].children.length == 0 && tags[i].innerHTML.length > 0) {
        tags[i].innerHTML = tags[i].innerHTML.replace(/ /gm, '&nbsp;');
      }
    }
  
    return html2canvas(div.firstChild, {canvas : canvas, onclone: _onclone}).then(function(canvas) {
      if (div) {
        div.parentElement.removeChild(div);
      }
    });
  
    function _onclone(clone) {
      $(clone.getElementById('hidden_div_123')).show();
    }
  }