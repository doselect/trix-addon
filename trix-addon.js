/* Trix AddOn File */

// Configuring custom attributes
Trix.config.textAttributes.sup = { tagName: "sup", inheritable: true }
Trix.config.textAttributes.sub = { tagName: "sub", inheritable: true }
Trix.config.blockAttributes.subheading = { tagName: "h2", breakOnReturn : !0}

/*
  Trix Initialize fires when the <trix-editor> element is attached to
  the DOM and its editor object is ready for use.
*/
addEventListener('trix-initialize', function(event) {
  var element = event.target
  var editor = element.editor
  var toolbarElement = element.toolbarElement
  var groupElement = toolbarElement.querySelector(".button_group.text_tools")   // Text elements selector
  var blockElement = toolbarElement.querySelector(".button_group.block_tools")  // Block elements selector

  //Superscript Button Creation
  groupElement.insertAdjacentHTML("beforeend", '<button type="button" data-trix-attribute="sup" title="Superscript" tabindex="-1" class="icon superscript">Superscript</button>')

  // Subscript Button Creation
  groupElement.insertAdjacentHTML("beforeend", '<button type="button" data-trix-attribute="sub" title="Subscript" tabindex="-1" class="icon subscript">Subscript</button>')

  //Subheading Button Creation
  blockElement.childNodes[1].insertAdjacentHTML("afterend", '<button type="button" data-trix-attribute="subheading" title="SubHeading" tabindex="-1" class="icon subheading">SubHeading</button>')

  var selectedAttributes = new Set
  /*
    Updating the editor according to changes in editor content with
    custom attributes
   */
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
  /*
    enforce custom attributes in accordance to the change when other
    attribute is active
   */
  function enforceExclusiveAttributes () {
    if (editor.attributeIsActive("sup") && selectedAttributes.has("sub")) {
      editor.deactivateAttribute("sub")
      updateSelectedAttributes()
    } else if (editor.attributeIsActive("sub") && selectedAttributes.has("sup")) {
      editor.deactivateAttribute("sup")
      updateSelectedAttributes()
    } else if(editor.attributeIsActive("subheading")){
      updateSelectedAttributes()
    } else if(editor.attributeIsActive("separator")){
      updateSelectedAttributes()
    }

  }

  // Updating Attachment to the editor
  function updateAttachmentAttributes () {
    var attachment = event.attachment
    if (attachment.file) {
      var editor = event.target.editor
      var originalRange = editor.getSelectedRange()
      var attachmentRange = editor.getDocument().getRangeOfAttachment(attachment)

      editor.setSelectedRange(attachmentRange)
      editor.activateAttribute("caption", "<Insert Caption>")
      editor.setSelectedRange(originalRange)
    }
  }
  updateSelectedAttributes()
  element.addEventListener("trix-selection-change", updateSelectedAttributes)
  element.addEventListener("trix-change", enforceExclusiveAttributes)
  element.addEventListener("trix-attachment-add", updateAttachmentAttributes)
})