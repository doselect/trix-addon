/* Trix AddOn File */

Trix.config.textAttributes.sup = { tagName: "sup", inheritable: true }
Trix.config.textAttributes.sub = { tagName: "sub", inheritable: true }
Trix.config.blockAttributes.subheading = { tagName: "h2", breakOnReturn : !0}


  addEventListener('trix-initialize', function(event) {
    var element = event.target
    var editor = element.editor
    var toolbarElement = element.toolbarElement
    var groupElement = toolbarElement.querySelector(".button_group.text_tools")
    var blockElement = toolbarElement.querySelector(".button_group.block_tools")
    //Superscript

    groupElement.insertAdjacentHTML("beforeend", '<button type="button" data-trix-attribute="sup" title="Superscript" tabindex="-1" class="icon superscript">Superscript</button>')

    // Subscript

    groupElement.insertAdjacentHTML("beforeend", '<button type="button" data-trix-attribute="sub" title="Subscript" tabindex="-1" class="icon subscript">Subscript</button>')

    //Subheading

    blockElement.insertAdjacentHTML("beforeend", '<button type="button" data-trix-attribute="subheading" title="SubHeading" tabindex="-1" class="icon subheading">SubHeading</button>')

    var selectedAttributes = new Set

    function updateSelectedAttributes () {
      selectedAttributes = new Set

      var selectedRange = editor.getSelectedRange()
      if (selectedRange[0] === selectedRange[1]) { selectedRange[1]++ }

      var selectedPieces = editor.getDocument().getDocumentAtRange(selectedRange).getPieces()
      selectedPieces.forEach(function (piece) {
        Object.keys(piece.getAttributes()).forEach(function (attribute) {
          selectedAttributes.add(attribute)
        })
      })
    }

    function enforceExclusiveAttributes () {
      if (editor.attributeIsActive("sup") && selectedAttributes.has("sub")) {
        editor.deactivateAttribute("sub")
        updateSelectedAttributes()
      } else if (editor.attributeIsActive("sub") && selectedAttributes.has("sup")) {
        editor.deactivateAttribute("sup")
        updateSelectedAttributes()
      } else if(editor.attributeIsActive("subheading")){
        updateSelectedAttributes()
      }

    }

    updateSelectedAttributes()
    element.addEventListener("trix-selection-change", updateSelectedAttributes)
    element.addEventListener("trix-change", enforceExclusiveAttributes)

  })